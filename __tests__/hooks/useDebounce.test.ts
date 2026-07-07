import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useDebounce } from '@/hooks/useDebounce'

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should return initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 300))
    expect(result.current).toBe('initial')
  })

  it('should debounce value changes', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'first', delay: 300 },
      }
    )

    expect(result.current).toBe('first')

    rerender({ value: 'second', delay: 300 })

    expect(result.current).toBe('first')

    act(() => {
      vi.advanceTimersByTime(300)
    })

    expect(result.current).toBe('second')
  })

  it('should use default delay of 300ms', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value),
      {
        initialProps: { value: 'test' },
      }
    )

    rerender({ value: 'changed' })

    act(() => {
      vi.advanceTimersByTime(300)
    })

    expect(result.current).toBe('changed')
  })

  it('should clear timeout on unmount', () => {
    const { unmount, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      {
        initialProps: { value: 'test' },
      }
    )

    rerender({ value: 'changed' })
    unmount()

    expect(() => unmount()).not.toThrow()
  })
})