'use client'

import { useEffect, useRef, useState } from 'react'

export function useResource<T>(
  fetcher: (signal: AbortSignal) => Promise<T>,
  deps: any[]
) {

  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<T | undefined>(undefined)
  const [error, setError] = useState<Error | undefined>(undefined)
  const controllerRef = useRef<AbortController | null>(null)

  useEffect(() => {
    controllerRef.current?.abort()
    const controller = new AbortController()
    controllerRef.current = controller

    setLoading(true)
    setError(undefined)

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
