import { ResourceState } from "@/types/resource"

export type BaseResource<T> = ResourceState<T>

export function combineResources<T extends Record<string, any>>(
  resources: {
    [K in keyof T]: BaseResource<T[K]>
  }
) {
  const entries = Object.entries(resources) as [
    keyof T,
    ResourceState<T[keyof T]>
  ][]

  const loading = entries.some(([, r]) => r.loading)
  const error = entries.find(([, r]) => r.error)?.[1].error

  if (loading || error) {
    return {
      data: undefined,
      loading,
      error,
    }
  }

  const data = Object.fromEntries(
    entries.map(([key, r]) => [key, r.data])
  ) as T

  return {
    data,
    loading: false,
    error: undefined,
  }
}
