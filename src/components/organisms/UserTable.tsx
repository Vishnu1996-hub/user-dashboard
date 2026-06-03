'use client'

import { useCallback, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Edit2, Eye, Plus, Trash2 } from 'lucide-react'
import { Avatar } from '@/components/atoms/Avatar'
import { Badge } from '@/components/atoms/Badge'
import { Button } from '@/components/atoms/Button'
import { Skeleton } from '@/components/atoms/Skeleton'
import { SearchInput } from '@/components/molecules/SearchInput'
import { Pagination } from '@/components/molecules/Pagination'
import { Modal } from '@/components/molecules/Modal'
import { ConfirmDialog } from '@/components/molecules/ConfirmDialog'
import { useDeleteUser, useUserList } from '@/hooks/useUsers'
import { useDebounce } from '@/hooks/useDebounce'
import { cn } from '@/lib/utils'
import type { User, UserStatus } from '@/types'

const PAGE_SIZE = 8
const STATUS_FILTERS = ['all', 'active', 'inactive', 'pending'] as const

const UserForm = dynamic(
  () => import('@/components/organisms/UserForm').then((mod) => mod.UserForm),
  {
    loading: () => (
      <div className="flex flex-col gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-11 rounded-xl" />
        ))}
      </div>
    ),
  }
)

export function UserTable() {
  // ── List / filter state ────────────────────────────────────────────────────
  const [search, setSearch]   = useState('')
  const [status, setStatus]   = useState<UserStatus | 'all'>('all')
  const [page, setPage]       = useState(1)

  const debouncedSearch = useDebounce(search, 300)

  const handleSearch = useCallback((val: string) => {
    setSearch(val)
    setPage(1)
  }, [])

  const handleStatus = useCallback((val: UserStatus | 'all') => {
    setStatus(val)
    setPage(1)
  }, [])

  const { data, isLoading, error } = useUserList({
    search: debouncedSearch,
    status,
    page,
    pageSize: PAGE_SIZE,
  })

  // ── Modal state ────────────────────────────────────────────────────────────
  const [addOpen,      setAddOpen]      = useState(false)
  const [editUser,     setEditUser]     = useState<User | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null)

  // ── Delete mutation ────────────────────────────────────────────────────────
  const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser()

  const closeAddModal = useCallback(() => setAddOpen(false), [])
  const closeEditModal = useCallback(() => setEditUser(null), [])
  const closeDeleteDialog = useCallback(() => setDeleteTarget(null), [])
  const openAddModal = useCallback(() => setAddOpen(true), [])

  const handleConfirmDelete = useCallback(() => {
    if (!deleteTarget) return
    deleteUser(deleteTarget.id, {
      onSuccess: () => setDeleteTarget(null),
    })
  }, [deleteTarget, deleteUser])

  return (
    <>
      {/* ── Add User modal ────────────────────────────────────────────────── */}
      <Modal
        open={addOpen}
        onClose={closeAddModal}
        title="Add User"
        description="Create a new team member with role and access level."
        size="lg"
      >
        <UserForm
          onSuccess={closeAddModal}
          onCancel={closeAddModal}
        />
      </Modal>

      {/* ── Edit User modal ───────────────────────────────────────────────── */}
      <Modal
        open={Boolean(editUser)}
        onClose={closeEditModal}
        title="Edit User"
        description={editUser ? `Update ${editUser.name}'s details.` : undefined}
        size="lg"
      >
        {/* key ensures the form re-initialises when a different user is selected */}
        <UserForm
          key={editUser?.id}
          user={editUser ?? undefined}
          onSuccess={closeEditModal}
          onCancel={closeEditModal}
        />
      </Modal>

      {/* ── Delete confirm dialog ─────────────────────────────────────────── */}
      <ConfirmDialog
        open={Boolean(deleteTarget)}
        onClose={closeDeleteDialog}
        onConfirm={handleConfirmDelete}
        title={`Delete "${deleteTarget?.name}"?`}
        message="This action cannot be undone. The user will be permanently removed."
        confirmLabel="Yes, delete"
        variant="danger"
        loading={isDeleting}
      />

      {/* ── Table card ────────────────────────────────────────────────────── */}
      <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-card">

        {/* Header */}
        <div className="flex flex-col gap-4 border-b border-border p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold">All Users</h2>
            <p className="text-sm text-muted-foreground">
              {data ? `${data.total} user${data.total !== 1 ? 's' : ''} total` : '—'}
            </p>
          </div>
          <Button size="sm" onClick={openAddModal}>
            <Plus size={15} />
            Add User
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-3 border-b border-border px-6 py-4 sm:flex-row sm:items-center">
          <SearchInput
            value={search}
            onChange={handleSearch}
            placeholder="Search by name or email…"
            className="sm:w-72"
          />
          <div className="flex flex-wrap gap-2">
            {STATUS_FILTERS.map((s) => (
              <button
                key={s}
                onClick={() => handleStatus(s)}
                aria-pressed={status === s}
                className={cn(
                  'rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-colors',
                  status === s
                    ? 'bg-primary text-primary-foreground'
                    : 'border border-border hover:bg-secondary'
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <caption className="sr-only">Users with role, status, join date, and actions</caption>
            <thead>
              <tr className="border-b border-border text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <th className="px-6 py-3">User</th>
                <th className="hidden px-6 py-3 sm:table-cell">Role</th>
                <th className="px-6 py-3">Status</th>
                <th className="hidden px-6 py-3 md:table-cell">Joined</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    <td colSpan={5} className="px-6 py-3">
                      <Skeleton className="h-10 w-full rounded-xl" />
                    </td>
                  </tr>
                ))
              ) : error ? (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center text-muted-foreground">
                    Failed to load users. Please try again.
                  </td>
                </tr>
              ) : data?.users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center">
                    <p className="font-medium">No users found</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Try adjusting your search or filter.
                    </p>
                  </td>
                </tr>
              ) : (
                data?.users.map((user) => (
                  <tr
                    key={user.id}
                    className="transition-colors hover:bg-secondary/40"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar name={user.name} size="sm" />
                        <div>
                          <p className="font-medium leading-tight">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="hidden px-6 py-4 capitalize text-muted-foreground sm:table-cell">
                      {user.role}
                    </td>
                    <td className="px-6 py-4">
                      <Badge status={user.status} />
                    </td>
                    <td className="hidden px-6 py-4 text-muted-foreground md:table-cell">
                      {new Date(user.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric', month: 'short', day: 'numeric',
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        {/* View — still navigates to the detail page */}
                        <Link
                          href={`/dashboard/users/${user.id}`}
                          aria-label={`View ${user.name}`}
                          className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                        >
                          <Eye size={15} aria-hidden="true" />
                        </Link>

                        {/* Edit — opens modal in-place */}
                        <button
                          onClick={() => setEditUser(user)}
                          aria-label={`Edit ${user.name}`}
                          className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                        >
                          <Edit2 size={15} aria-hidden="true" />
                        </button>

                        {/* Delete — opens confirm dialog */}
                        <button
                          onClick={() => setDeleteTarget({ id: user.id, name: user.name })}
                          disabled={isDeleting}
                          aria-label={`Delete ${user.name}`}
                          className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-danger/10 hover:text-danger disabled:opacity-50"
                        >
                          <Trash2 size={15} aria-hidden="true" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {data && data.total > PAGE_SIZE && (
          <div className="border-t border-border px-6 py-4">
            <Pagination
              page={page}
              pageSize={PAGE_SIZE}
              total={data.total}
              onPageChange={setPage}
            />
          </div>
        )}
      </div>
    </>
  )
}
