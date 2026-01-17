'use client'

import { useEffect, useRef, useState } from 'react'

export function useResource<T>(
  fetcher: (signal: AbortSignal) => Promise<T>,
  deps: any[]
) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const controllerRef = useRef<AbortController | null>(null)

  useEffect(() => {
    controllerRef.current?.abort()
    const controller = new AbortController()
    controllerRef.current = controller

    setLoading(true)
    setError(null)

    fetcher(controller.signal)
      .then(res => {
        if (!controller.signal.aborted) {
          setData(res)
          setLoading(false)
        }
      })
      .catch(err => {
        if (!controller.signal.aborted) {
          setError(err)
          setLoading(false)
        }
      })

    return () => controller.abort()
  }, deps)

  return { data, loading, error }
}
