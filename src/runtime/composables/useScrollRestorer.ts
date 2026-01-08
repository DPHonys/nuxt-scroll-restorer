import { useNuxtApp, useRoute, useRuntimeConfig } from '#app'
import {
  useMutationObserver,
  useTimeoutFn,
  useWindowScroll,
  useEventListener,
  watchThrottled,
} from '@vueuse/core'
import { defu } from 'defu'
import { ref, getCurrentInstance, onUnmounted } from 'vue'

import {
  getKey,
  MEMOIZATION_INTERVAL,
  SAFARI_WORKAROUND_THRESHOLD,
} from '../utils/constants'
import {
  getState,
  getScrollFromState,
  getTimestamp,
  getIsNavigatingHistory,
  isRecord,
} from '../utils/historyState'
import { logger } from '../utils/logger'
import type {
  ScrollPos,
  ScrollRestorerOptions,
  HistoryState,
} from '../utils/types'
import '../utils/types' // NuxtApp augmentation side-effect

export function useScrollRestorer(options: ScrollRestorerOptions = {}) {
  const nuxtApp = useNuxtApp()
  const route = useRoute()
  const runtimeConfig = useRuntimeConfig()

  const { lazyTimeout, scrollBehavior, anchorBehavior, anchorOffset, debug } = defu(
    options,
    runtimeConfig.public.scrollRestorer
  )

  if (debug) {
    logger.enable()
  }
  const { x: scrollX, y: scrollY } = useWindowScroll()

  const isSafariWorkaroundAllowed = ref(false)
  const pendingRestore = ref<ScrollPos | null>(null)
  const pendingAnchor = ref<string | null>(null)
  const retryTimeoutId = ref<ReturnType<typeof setTimeout>>()
  const mutationObserverStop = ref<(() => void) | null>(null)
  const enabled = ref(true)
  let unregisterPageFinish: (() => void) | undefined

  function saveScrollPosition(pos?: ScrollPos) {
    if (!enabled.value) return

    const [x, y] = pos ?? [scrollX.value, scrollY.value]
    const normX = Math.max(x, 0)
    const normY = Math.max(y, 0)

    const state = getState() ?? {}
    window.history.replaceState(
      {
        ...state,
        [getKey('x')]: normX,
        [getKey('y')]: normY,
        [getKey('memo_timestamp')]: Date.now(),
      },
      ''
    )
    logger.debug(`Saved scroll position: ${normX}, ${normY}`)
  }

  function getSavedPosition(): ScrollPos | null {
    return getScrollFromState(getState())
  }

  function clearSavedPosition() {
    const state = getState()
    if (!state) return

    // Set values to undefined instead of deleting
    window.history.replaceState(
      {
        ...state,
        [getKey('x')]: undefined,
        [getKey('y')]: undefined,
        [getKey('memo_timestamp')]: undefined,
      },
      ''
    )
    logger.debug('Cleared saved scroll position')
  }

  function scrollToTop(behavior?: ScrollBehavior) {
    cancelPendingRestore()
    clearSavedPosition()
    window.scrollTo({ top: 0, left: 0, behavior: behavior ?? scrollBehavior })
    logger.debug('Scrolled to top')
  }

  function disable() {
    enabled.value = false
    cancelPendingRestore()
    logger.debug('Scroll restoration disabled')
  }

  function enable() {
    enabled.value = true
    logger.debug('Scroll restoration enabled')
  }

  function isEnabled(): boolean {
    return enabled.value
  }

  function cancelPendingRestore() {
    pendingRestore.value = null
    pendingAnchor.value = null
    if (retryTimeoutId.value) {
      clearTimeout(retryTimeoutId.value)
      retryTimeoutId.value = undefined
    }
  }

  function tryScrollTo(x: number, y: number): boolean {
    const documentHeight = document.documentElement.scrollHeight
    const viewportHeight = window.innerHeight
    const maxScrollY = documentHeight - viewportHeight

    if (y <= maxScrollY + 10) {
      window.scrollTo({ left: x, top: y, behavior: scrollBehavior })
      logger.debug(
        `Scroll restored to ${x}, ${y}. Document height: ${documentHeight}`
      )
      return true
    }
    return false
  }

  function getAnchorOffset(): number {
    if (typeof anchorOffset === 'function') {
      return anchorOffset()
    }
    return anchorOffset ?? 0
  }

  function scrollToAnchor(hash: string): boolean {
    const id = hash.replace(/^#/, '')
    if (!id) return false

    const element =
      document.getElementById(id) || document.querySelector(`[name="${id}"]`)
    if (element) {
      const offset = getAnchorOffset()
      if (offset === 0) {
        element.scrollIntoView({ behavior: anchorBehavior })
      } else {
        const elementPosition = element.getBoundingClientRect().top + window.scrollY
        const offsetPosition = elementPosition - offset
        window.scrollTo({ top: offsetPosition, behavior: anchorBehavior })
      }
      logger.debug(`Scrolled to anchor: #${id}${offset ? ` with offset ${offset}px` : ''}`)
      return true
    }
    return false
  }

  function waitForAnchor(hash: string): Promise<boolean> {
    return new Promise((resolve) => {
      // Try immediately first
      if (scrollToAnchor(hash)) {
        resolve(true)
        return
      }

      const id = hash.replace(/^#/, '')
      if (!id) {
        resolve(false)
        return
      }

      pendingAnchor.value = hash
      logger.debug(`Waiting for anchor: #${id}`)

      const { start: startTimeout, stop: stopTimeout } = useTimeoutFn(() => {
        cleanup()
        logger.debug(`Anchor timeout reached for #${id}`)
        resolve(false)
      }, lazyTimeout)

      const { stop: stopObserver } = useMutationObserver(
        document.body,
        () => {
          if (scrollToAnchor(hash)) {
            cleanup()
            resolve(true)
          }
        },
        {
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: ['id', 'name'],
        }
      )

      const cleanup = () => {
        stopTimeout()
        stopObserver()
        pendingAnchor.value = null
      }

      startTimeout()
    })
  }

  function restoreScrollFromState(state: HistoryState) {
    const scroll = getScrollFromState(state)
    if (!scroll) return

    const [x, y] = scroll
    logger.debug(`Restoring scroll from state: ${x}, ${y}`)

    if (tryScrollTo(x, y)) {
      cancelPendingRestore()
      return
    }

    // Document not tall enough yet, queue for retry via MutationObserver
    logger.debug(`Document not tall enough for scroll ${y}. Queuing for retry.`)
    pendingRestore.value = scroll

    retryTimeoutId.value = setTimeout(() => {
      if (pendingRestore.value) {
        const [px, py] = pendingRestore.value
        window.scrollTo({ left: px, top: py, behavior: scrollBehavior })
        logger.debug(`Gave up waiting, forced scroll to ${px}, ${py}`)
        cancelPendingRestore()
      }
    }, lazyTimeout)
  }

  function attemptPendingRestore() {
    if (!pendingRestore.value) return

    const [x, y] = pendingRestore.value
    if (tryScrollTo(x, y)) {
      logger.debug('Pending scroll restoration successful')
      cancelPendingRestore()
    }
  }

  // Safari bug: resets scroll to 0,0 after popstate even with scrollRestoration='manual'
  function workaroundSafariBug(x: number, y: number): boolean {
    const state = getState()

    if (x === 0 && y === 0 && isSafariWorkaroundAllowed.value) {
      const popstateTimestamp = getTimestamp('popstate_timestamp', state)
      const isWorkaroundAllowed =
        popstateTimestamp !== null &&
        Date.now() - popstateTimestamp < SAFARI_WORKAROUND_THRESHOLD
      const isNavHistory = getIsNavigatingHistory(state)

      if (isWorkaroundAllowed && isNavHistory) {
        logger.debug('Safari workaround: reverting scroll reset')
        restoreScrollFromState(state)
        isSafariWorkaroundAllowed.value = false
        return true
      }
    }
    return false
  }

  function handlePopState(event: PopStateEvent) {
    logger.debug('Popstate triggered')
    cancelPendingRestore()

    isSafariWorkaroundAllowed.value = true
    const state = (isRecord(event.state) ? event.state : null) ?? {}
    window.history.replaceState(
      {
        ...state,
        [getKey('is_navigating_history')]: 1,
        [getKey('popstate_timestamp')]: Date.now(),
      },
      ''
    )
  }

  function handlePageFinish() {
    if (!enabled.value) return

    logger.debug('page:finish triggered')
    const state = getState()
    const hash = route.hash

    // Handle anchor navigation first
    if (hash) {
      waitForAnchor(hash).then((found) => {
        if (!found && getIsNavigatingHistory(state)) {
          // Anchor not found, fall back to saved position
          restoreScrollFromState(state)
        }
      })
      return
    }

    // Handle back/forward navigation
    if (state && getIsNavigatingHistory(state)) {
      restoreScrollFromState(state)

      // Clear navigation flag
      window.history.replaceState(
        {
          ...state,
          [getKey('is_navigating_history')]: false,
        },
        ''
      )
    } else {
      // Fresh navigation - scroll to top
      window.scrollTo({ top: 0, left: 0, behavior: scrollBehavior })
    }
  }

  function cleanup() {
    cleanupPopstate?.()
    stopScrollWatch?.()
    cancelPendingRestore()
    unregisterPageFinish?.()
    mutationObserverStop.value?.()
    nuxtApp._scrollRestorerInitialized = false
    logger.debug('Scroll restorer destroyed')
  }

  let cleanupPopstate: (() => void) | undefined
  let stopScrollWatch: (() => void) | undefined

  // Client-side initialization (singleton)
  if (import.meta.client) {
    if (nuxtApp._scrollRestorerInitialized) {
      logger.debug('Already initialized, skipping')
      return {
        saveScrollPosition,
        scrollToAnchor,
        waitForAnchor,
        cancelPendingRestore,
        getSavedPosition,
        clearSavedPosition,
        scrollToTop,
        disable,
        enable,
        isEnabled,
      }
    }
    nuxtApp._scrollRestorerInitialized = true
    window.history.scrollRestoration = 'manual'

    cleanupPopstate = useEventListener(window, 'popstate', handlePopState, {
      passive: true,
    })

    stopScrollWatch = watchThrottled(
      () => [scrollX.value, scrollY.value] as ScrollPos,
      ([x, y]) => {
        if (!enabled.value) return

        // Check for Safari bug first
        if (!workaroundSafariBug(x, y)) {
          // Normal scroll - save position
          saveScrollPosition([x, y])
        }
      },
      { throttle: MEMOIZATION_INTERVAL }
    )

    unregisterPageFinish = nuxtApp.hook('page:finish', handlePageFinish)

    const { stop } = useMutationObserver(
      document.body,
      () => {
        if (pendingRestore.value) {
          attemptPendingRestore()
        }
      },
      { childList: true, subtree: true }
    )
    mutationObserverStop.value = stop

    logger.debug('Scroll restorer initialized')

    const instance = getCurrentInstance()
    if (instance) {
      onUnmounted(cleanup)
    }
  }

  return {
    /**
     * Manually save the current scroll position to history state
     */
    saveScrollPosition,
    /**
     * Scroll to an anchor element by hash
     */
    scrollToAnchor,
    /**
     * Wait for an anchor element to appear and scroll to it
     */
    waitForAnchor,
    /**
     * Cancel any pending scroll restoration
     */
    cancelPendingRestore,
    /**
     * Get the saved scroll position from history state
     */
    getSavedPosition,
    /**
     * Clear the saved scroll position from history state
     */
    clearSavedPosition,
    /**
     * Scroll to top of the page
     */
    scrollToTop,
    /**
     * Temporarily disable scroll restoration
     */
    disable,
    /**
     * Re-enable scroll restoration after disabling
     */
    enable,
    /**
     * Check if scroll restoration is currently enabled
     */
    isEnabled,
  }
}

export default useScrollRestorer
