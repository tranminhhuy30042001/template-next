'use client'

import { DataBoundary } from '@/components/DataBoundary'
import { ResourceState } from '@/types/resource'


type Props<T> = {
  open: boolean
  resource: ResourceState<T>
  onClose(): void
  children(data: T): React.ReactNode
}

export function UserDetailModal<T>({
  open,
  resource,
  onClose,
  children,
}: Props<T>) {
  if (!open) return null

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <button onClick={onClose}>×</button>

        <DataBoundary {...resource}>
          {children}
        </DataBoundary>
      </div>
    </div>
  )
}
