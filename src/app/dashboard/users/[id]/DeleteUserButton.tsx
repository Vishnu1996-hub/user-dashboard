'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2, AlertTriangle, X } from 'lucide-react'
import { useDeleteUser } from '@/hooks/useUsers'

interface Props {
  userId: string
  userName: string
}

export default function DeleteUserButton({ userId, userName }: Props) {
  const router = useRouter()
  const [confirming, setConfirming] = useState(false)
  const { mutate: deleteUser, isPending } = useDeleteUser()

  const handleDelete = () => {
    deleteUser(userId, {
      onSuccess: () => router.push('/dashboard/users'),
    })
  }

  if (confirming) {
    return (
      <div className="flex items-center gap-2 rounded-xl border border-danger/30 bg-danger/5 px-3 py-2">
        <AlertTriangle size={14} className="shrink-0 text-danger" />
        <span className="text-sm text-danger">Delete &quot;{userName}&quot;?</span>
        <button
          onClick={handleDelete}
          disabled={isPending}
          className="rounded-lg bg-danger px-2 py-0.5 text-xs font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {isPending ? 'Deleting…' : 'Yes, delete'}
        </button>
        <button
          onClick={() => setConfirming(false)}
          disabled={isPending}
          className="rounded-lg p-0.5 text-muted-foreground transition-colors hover:text-foreground"
        >
          <X size={14} />
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      disabled={isPending}
      className="inline-flex items-center gap-1.5 rounded-xl border border-danger/30 bg-danger/5 px-3 py-2 text-sm font-medium text-danger transition-colors hover:bg-danger/10 disabled:opacity-50"
    >
      <Trash2 size={14} />
      Delete
    </button>
  )
}
