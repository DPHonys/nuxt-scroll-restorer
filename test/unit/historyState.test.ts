import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import {
  isRecord,
  getState,
  getScrollFromState,
  getTimestamp,
  getIsNavigatingHistory,
} from '../../src/runtime/utils/historyState'

describe('historyState utilities', () => {
  describe('isRecord', () => {
    it('returns true for plain objects', () => {
      expect(isRecord({})).toBe(true)
      expect(isRecord({ a: 1 })).toBe(true)
      expect(isRecord({ nested: { value: true } })).toBe(true)
    })

    it('returns false for non-objects', () => {
      expect(isRecord(null)).toBe(false)
      expect(isRecord(undefined)).toBe(false)
      expect(isRecord(42)).toBe(false)
      expect(isRecord('string')).toBe(false)
      expect(isRecord(true)).toBe(false)
    })

    it('returns false for arrays', () => {
      expect(isRecord([])).toBe(false)
      expect(isRecord([1, 2, 3])).toBe(false)
    })
  })

  describe('getState', () => {
    let mockState: unknown = null

    beforeEach(() => {
      // Mock window.history with a getter for state
      global.window = {
        history: {
          get state() {
            return mockState
          },
        },
      } as unknown as Window & typeof globalThis
    })

    afterEach(() => {
      mockState = null
    })

    it('returns history.state when it is a record', () => {
      mockState = { nuxt_scroll_restorer_x: 100 }
      expect(getState()).toEqual(mockState)
    })

    it('returns null when history.state is null', () => {
      mockState = null
      expect(getState()).toBe(null)
    })

    it('returns null when history.state is not an object', () => {
      mockState = 'invalid'
      expect(getState()).toBe(null)
    })
  })

  describe('getScrollFromState', () => {
    it('returns scroll position from valid state', () => {
      const state = {
        nuxt_scroll_restorer_x: 100,
        nuxt_scroll_restorer_y: 200,
      }
      expect(getScrollFromState(state)).toEqual([100, 200])
    })

    it('returns null when state is null', () => {
      expect(getScrollFromState(null)).toBe(null)
    })

    it('returns null when x or y is NaN', () => {
      const state = {
        nuxt_scroll_restorer_x: 'invalid',
        nuxt_scroll_restorer_y: 200,
      }
      expect(
        getScrollFromState(state as unknown as Record<string, unknown>)
      ).toBe(null)
    })

    it('handles zero values correctly', () => {
      const state = {
        nuxt_scroll_restorer_x: 0,
        nuxt_scroll_restorer_y: 0,
      }
      expect(getScrollFromState(state)).toEqual([0, 0])
    })

    it('handles string number values', () => {
      const state = {
        nuxt_scroll_restorer_x: '100',
        nuxt_scroll_restorer_y: '200',
      }
      expect(getScrollFromState(state)).toEqual([100, 200])
    })
  })

  describe('getTimestamp', () => {
    it('returns timestamp from valid state', () => {
      const timestamp = Date.now()
      const state = {
        nuxt_scroll_restorer_popstate_timestamp: timestamp,
      }
      expect(getTimestamp('popstate_timestamp', state)).toBe(timestamp)
    })

    it('returns null when state is null', () => {
      expect(getTimestamp('popstate_timestamp', null)).toBe(null)
    })

    it('returns null when key is not present', () => {
      const state = {}
      expect(getTimestamp('popstate_timestamp', state)).toBe(null)
    })

    it('returns null when value is NaN', () => {
      const state = {
        nuxt_scroll_restorer_popstate_timestamp: 'invalid',
      }
      expect(
        getTimestamp(
          'popstate_timestamp',
          state as unknown as Record<string, unknown>
        )
      ).toBe(null)
    })
  })

  describe('getIsNavigatingHistory', () => {
    it('returns true when flag is set to 1', () => {
      const state = {
        nuxt_scroll_restorer_is_navigating_history: 1,
      }
      expect(getIsNavigatingHistory(state)).toBe(true)
    })

    it('returns true when flag is set to true', () => {
      const state = {
        nuxt_scroll_restorer_is_navigating_history: true,
      }
      expect(getIsNavigatingHistory(state)).toBe(true)
    })

    it('returns false when flag is not set', () => {
      const state = {}
      expect(getIsNavigatingHistory(state)).toBe(false)
    })

    it('returns false when flag is set to false', () => {
      const state = {
        nuxt_scroll_restorer_is_navigating_history: false,
      }
      expect(getIsNavigatingHistory(state)).toBe(false)
    })

    it('returns false when state is null', () => {
      expect(getIsNavigatingHistory(null)).toBe(false)
    })
  })
})
