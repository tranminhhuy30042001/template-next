'use client'

import { DataBoundary } from '@/components/DataBoundary'
import { useUserWithPosts } from '@/hooks/useUserWithPosts'

export function ProfileWithPosts() {
  const resource = useUserWithPosts()

  return (
    <DataBoundary {...resource}>
      {({ user, posts }) => (
        <div>
          <h1>{user.name}</h1>

          <ul>
            {posts.map(post => (
              <li key={post.id}>{post.title}</li>
            ))}
          </ul>
        </div>
      )}
    </DataBoundary>
  )
}
