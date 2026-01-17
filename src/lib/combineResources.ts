export type Resource<T> = {
  data: T | null
  loading: boolean
  error: Error | null
}

export function combineResources<T extends Record<string, any>>(
  resources: { [K in keyof T]: Resource<T[K]> }
): Resource<T> {
  const loading = Object.values(resources).some(r => r.loading)
  const error = Object.values(resources).find(r => r.error)?.error ?? null

  if (loading || error) {
    return {
      data: null,
      loading,
      error,
    }
  }

  const data = Object.fromEntries(
    Object.entries(resources).map(([key, r]) => [key, r.data])
  ) as T

  return {
    data,
    loading: false,
    error: null,
  }
}
