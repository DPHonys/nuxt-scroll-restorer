export const STORAGE_PREFIX = 'nuxt_scroll_restorer'
export const MEMOIZATION_INTERVAL = 601
export const SAFARI_WORKAROUND_THRESHOLD = 2000

export const getKey = (key: string): string => `${STORAGE_PREFIX}_${key}`
