'use client'

import { useEffect, useRef, useState } from 'react'

type Options<T> = {
  data?: T
  fetcher?: (signal: AbortSignal) => Promise<T>
  deps?: any[]
}

export function useSmartResource<T>({
  data,
  fetcher,
  deps = [],
}: Options<T>) {
  const [state, setState] = useState<{
    data: T | null
    loading: boolean
    error: Error | null
  }>({
    data: data ?? null,
    loading: !!fetcher && !data,
    error: null,
  })

  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    if (!fetcher || data) return

    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller

    setState(s => ({ ...s, loading: true }))

    fetcher(controller.signal)
      .then(result => {
        if (!controller.signal.aborted) {
          setState({
            data: result,
            loading: false,
            error: null,
          })
        }
      })
      .catch(err => {
        if (!controller.signal.aborted) {
          setState({
            data: null,
            loading: false,
            error: err,
          })
        }
      })

    return () => controller.abort()
  }, deps)

  return state
}
