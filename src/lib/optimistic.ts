import type { Resource } from '@/types/resource'

export async function optimistic<T>(
  resource: Resource<T>,
  options: {
    update: (current: T) => T
    commit: () => Promise<T>
  }
) {
  if (!resource.data) {
    throw new Error('Optimistic update requires existing data')
  }

  const prev = resource.data

  resource.setData(options.update(prev))

  try {
    const result = await options.commit()
    resource.setData(result)
    return result
  } catch (err) {
    resource.setData(prev)
    throw err
  }
}
