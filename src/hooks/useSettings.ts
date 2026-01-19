import { useResource } from './useResource'
import { apiFetch } from '@/lib/apiFetch'
import type { Settings } from '@/types'

export function useSettings() {
  return useResource(
    signal => apiFetch('/api/settings', { signal }),
    []
  )
}