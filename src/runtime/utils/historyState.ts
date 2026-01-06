import { getKey } from './constants'
import type { ScrollPos, HistoryState } from './types'

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

export function getState(): HistoryState {
  const state = window.history.state as unknown
  return isRecord(state) ? state : null
}

export function getScrollFromState(state: HistoryState): ScrollPos | null {
  if (!state) return null
  const x = Number(state[getKey('x')])
  const y = Number(state[getKey('y')])
  return !Number.isNaN(x) && !Number.isNaN(y) ? [x, y] : null
}

export function getTimestamp(key: string, state: HistoryState): number | null {
  if (!state) return null
  const value = Number(state[getKey(key)])
  return Number.isNaN(value) ? null : value
}

export function getIsNavigatingHistory(state: HistoryState): boolean {
  return state ? Boolean(state[getKey('is_navigating_history')]) : false
}
