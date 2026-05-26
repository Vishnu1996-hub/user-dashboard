'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2 } from 'lucide-react'
import { ConfirmDialog } from '@/components/molecules/ConfirmDialog'
import { useDeleteUser } from '@/hooks/useUsers'

interface Props {
  userId: string
  userName: string
}

export default function DeleteUserButton({ userId, userName }: Props) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const { mutate: deleteUser, isPending } = useDeleteUser()

  const handleConfirm = () => {
    deleteUser(userId, {
      onSuccess: () => router.push('/dashboard/users'),
    })
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        disabled={isPending}
        className="inline-flex items-center gap-1.5 rounded-xl border border-danger/30 bg-danger/5 px-3 py-2 text-sm font-medium text-danger transition-colors hover:bg-danger/10 disabled:opacity-50"
      >
        <Trash2 size={14} />
        Delete
      </button>

      <ConfirmDialog
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={handleConfirm}
        title={`Delete "${userName}"?`}
        message="This action cannot be undone. The user will be permanently removed from the system."
        confirmLabel="Yes, delete"
        variant="danger"
        loading={isPending}
      />
    </>
  )
}
