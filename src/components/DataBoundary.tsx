import { ReactNode } from 'react'
import { DefaultLoading } from './ui/DefaultLoading'
import { DefaultError } from './ui/DefaultError'

type Props<T> = {
  data: T | null
  loading?: boolean
  error?: Error | null
  children: (data: T) => ReactNode

  // optional override
  loadingFallback?: ReactNode
  errorFallback?: (error: Error) => ReactNode
}

export function DataBoundary<T>({
  data,
  loading = false,
  error = null,
  children,
  loadingFallback,
  errorFallback,
}: Props<T>) {
  if (loading) return <>{loadingFallback ?? <DefaultLoading />}</>
  if (error)
    return <>{errorFallback ? errorFallback(error) : <DefaultError error={error} />}</>
  if (!data) return null

  return <>{children(data)}</>
}
