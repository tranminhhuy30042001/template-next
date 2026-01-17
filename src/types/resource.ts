export type Resource<T> = ResourceState<T> & {
  setData: (data: T) => void
}
export type ResourceState<T> = {
  data?: T
  loading: boolean
  error?: Error
}