'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { User, UserStatus } from '@/types'

export interface UserListParams {
  search?: string
  status?: UserStatus | 'all'
  page?: number
  pageSize?: number
}

export interface UserListResponse {
  users: User[]
  total: number
  page: number
  pageSize: number
}

async function fetchUsers(params: UserListParams): Promise<UserListResponse> {
  const sp = new URLSearchParams()
  if (params.search) sp.set('search', params.search)
  if (params.status) sp.set('status', params.status)
  sp.set('page', String(params.page ?? 1))
  sp.set('pageSize', String(params.pageSize ?? 8))

  const res = await fetch(`/api/users?${sp}`)
  if (!res.ok) throw new Error('Failed to fetch users')
  return res.json()
}

export function useUserList(params: UserListParams) {
  return useQuery<UserListResponse>({
    queryKey: ['users', 'list', params],
    queryFn: () => fetchUsers(params),
  })
}

export function useUser(id: string) {
  return useQuery<User>({
    queryKey: ['users', id],
    queryFn: async () => {
      const res = await fetch(`/api/users/${id}`)
      if (!res.ok) throw new Error('User not found')
      return res.json()
    },
    enabled: Boolean(id),
  })
}

export function useCreateUser() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (data: Omit<User, 'id' | 'createdAt' | 'avatarUrl'>) => {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed to create user')
      return res.json() as Promise<User>
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['users'] })
      qc.invalidateQueries({ queryKey: ['analytics'] })
    },
  })
}

export function useUpdateUser() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, ...data }: Partial<User> & { id: string }) => {
      const res = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed to update user')
      return res.json() as Promise<User>
    },
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: ['users'] })
      qc.invalidateQueries({ queryKey: ['users', id] })
      qc.invalidateQueries({ queryKey: ['analytics'] })
    },
  })
}

export function useDeleteUser() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/users/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete user')
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['users'] })
      qc.invalidateQueries({ queryKey: ['analytics'] })
    },
  })
}
