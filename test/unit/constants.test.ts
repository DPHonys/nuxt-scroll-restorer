import { describe, it, expect } from 'vitest'
import {
  STORAGE_PREFIX,
  MEMOIZATION_INTERVAL,
  SAFARI_WORKAROUND_THRESHOLD,
  getKey,
} from '../../src/runtime/utils/constants'

describe('constants', () => {
  describe('STORAGE_PREFIX', () => {
    it('has the correct value', () => {
      expect(STORAGE_PREFIX).toBe('nuxt_scroll_restorer')
    })
  })

  describe('MEMOIZATION_INTERVAL', () => {
    it('has a reasonable throttle interval', () => {
      expect(MEMOIZATION_INTERVAL).toBe(601)
      // Should be greater than 0 and less than 2 seconds
      expect(MEMOIZATION_INTERVAL).toBeGreaterThan(0)
      expect(MEMOIZATION_INTERVAL).toBeLessThan(2000)
    })
  })

  describe('SAFARI_WORKAROUND_THRESHOLD', () => {
    it('has the correct value', () => {
      expect(SAFARI_WORKAROUND_THRESHOLD).toBe(2000)
    })
  })

  describe('getKey', () => {
    it('prefixes key with storage prefix', () => {
      expect(getKey('x')).toBe('nuxt_scroll_restorer_x')
      expect(getKey('y')).toBe('nuxt_scroll_restorer_y')
    })

    it('handles various key names', () => {
      expect(getKey('memo_timestamp')).toBe(
        'nuxt_scroll_restorer_memo_timestamp'
      )
      expect(getKey('is_navigating_history')).toBe(
        'nuxt_scroll_restorer_is_navigating_history'
      )
      expect(getKey('popstate_timestamp')).toBe(
        'nuxt_scroll_restorer_popstate_timestamp'
      )
    })

    it('handles empty string', () => {
      expect(getKey('')).toBe('nuxt_scroll_restorer_')
    })
  })
})
