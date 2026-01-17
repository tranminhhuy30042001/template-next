import { useUser } from './useUser'
import { usePosts } from './usePosts'
import { combineResources } from '@/lib/combineResources'
import type { User, Post } from '@/types'

export function useUserWithPosts() {
  const user = useUser()
  const posts = usePosts(user.data?.id)

  return combineResources<{
    user: User
    posts: Post[]
  }>({
    user,
    posts,
  })
}
