import {
  defineNuxtModule,
  addImports,
  addComponent,
  createResolver,
} from '@nuxt/kit'
import { defu } from 'defu'

// Module options TypeScript interface definition
export interface ModuleOptions {
  /**
   * Enable or disable the scroll restorer
   * @default true
   */
  enabled: boolean
  /**
   * Maximum time (ms) to wait for lazy content or anchor elements
   * @default 5000
   */
  lazyTimeout: number
  /**
   * Scroll behavior when restoring scroll position (back/forward navigation)
   * @default 'instant'
   */
  scrollBehavior: ScrollBehavior
  /**
   * Scroll behavior when scrolling to anchors
   * @default 'smooth'
   */
  anchorBehavior: ScrollBehavior
  /**
   * Enable debug logging
   * @default false
   */
  debug: boolean
}

export type ModulePublicRuntimeConfig = Omit<ModuleOptions, 'enabled'>

declare module '@nuxt/schema' {
  interface PublicRuntimeConfig {
    scrollRestorer: ModulePublicRuntimeConfig
  }
}

const defaults: ModuleOptions = {
  enabled: true,
  lazyTimeout: 5000,
  scrollBehavior: 'instant',
  anchorBehavior: 'smooth',
  debug: false,
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-scroll-restorer',
    configKey: 'scrollRestorer',
    compatibility: {
      nuxt: '>=3.0.0',
    },
  },
  defaults,
  setup(_options, nuxt) {
    const options = defu(_options, defaults)

    if (!options.enabled) {
      return
    }
    const resolver = createResolver(import.meta.url)

    // Provide module options to runtime
    nuxt.options.runtimeConfig.public.scrollRestorer = {
      lazyTimeout: options.lazyTimeout,
      scrollBehavior: options.scrollBehavior,
      anchorBehavior: options.anchorBehavior,
      debug: options.debug,
    }

    // Auto-import the composable
    addImports({
      name: 'default',
      as: 'useScrollRestorer',
      from: resolver.resolve('./runtime/composables/useScrollRestorer'),
    })

    // Auto-import the component
    addComponent({
      name: 'ScrollRestorer',
      filePath: resolver.resolve('./runtime/components/ScrollRestorer.vue'),
    })
  },
})
