import { apiFetch } from '@/lib/apiFetch'
import { useResource } from './useResource'
import type { Post } from '@/types'

export function usePosts(userId?: string) {
  return useResource<Post[]>(
    signal =>
      userId
        ? apiFetch<Post[]>(`/api/users/${userId}/posts`, { signal })
        : Promise.resolve([]),
    [userId]
  )
}
