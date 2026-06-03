'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { User, UserStatus } from '@/types'
import apiClient from '@/lib/api/client'

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
  const response = await apiClient.get<UserListResponse>('/api/users', {
    params: {
      search: params.search,
      status: params.status,
      page: params.page ?? 1,
      pageSize: params.pageSize ?? 8,
    },
  })
  return response.data
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
      const response = await apiClient.get<User>(`/api/users/${id}`)
      return response.data
    },
    enabled: Boolean(id),
  })
}

export function useCreateUser() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (data: Omit<User, 'id' | 'createdAt' | 'avatarUrl'>) => {
      const response = await apiClient.post<User>('/api/users', data)
      return response.data
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
      const response = await apiClient.put<User>(`/api/users/${id}`, data)
      return response.data
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
      await apiClient.delete(`/api/users/${id}`)
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['users'] })
      qc.invalidateQueries({ queryKey: ['analytics'] })
    },
  })
}
