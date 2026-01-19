// feat: thêm DataBoundary để xử lý loading, error và data thống nhất

// - Gom logic loading / error / success vào một component
// - Giảm lặp code ở các màn hình gọi API
// - Cho phép custom UI khi loading hoặc error
import { ReactNode } from 'react'
import { DefaultLoading } from './ui/DefaultLoading'
import { DefaultError } from './ui/DefaultError'
type Props<T> = {
  data?: T
  loading?: boolean
  error?: Error
  children: (data: T) => ReactNode

  loadingFallback?: ReactNode
  errorFallback?: (error: Error) => ReactNode
}

export function DataBoundary<T>({
  data,
  loading = false,
  error,
  children,
  loadingFallback,
  errorFallback,
}: Props<T>) {
  if (loading) return <>{loadingFallback ?? <DefaultLoading />}</>
  if (error)
    return <>{errorFallback ? errorFallback(error) : <DefaultError error={error} />}</>
  if (data === undefined) return null

  return <>{children(data)}</>
}
