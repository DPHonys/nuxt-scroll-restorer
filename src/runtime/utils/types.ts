export type ScrollPos = [number, number]
export type HistoryState = Record<string, unknown> | null

export interface ScrollRestorerOptions {
  /**
   * Maximum time (ms) to wait for lazy content or anchor elements
   * @default 5000
   */
  lazyTimeout?: number
  /**
   * Scroll behavior when restoring scroll position (back/forward navigation)
   * @default 'instant'
   */
  scrollBehavior?: ScrollBehavior
  /**
   * Scroll behavior when scrolling to anchors
   * @default 'smooth'
   */
  anchorBehavior?: ScrollBehavior
  /**
   * Enable debug logging
   * @default false
   */
  debug?: boolean
}

declare module '#app' {
  interface NuxtApp {
    _scrollRestorerInitialized?: boolean
  }
}
