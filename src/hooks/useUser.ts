import { apiFetch } from '@/lib/apiFetch'
import { useResource } from './useResource'
import type { User } from '@/types'

export function useUser() {
  return useResource<User>(
    signal => apiFetch<User>('/api/user', { signal }),
    []
  )
}
