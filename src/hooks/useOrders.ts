'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { Order, OrderStatus } from '@/types'
import apiClient from '@/lib/api/client'

export interface OrderListParams {
  search?: string
  status?: OrderStatus | 'all'
  page?: number
  pageSize?: number
}

export interface OrderListResponse {
  orders: Order[]
  total: number
  page: number
  pageSize: number
}

async function fetchOrders(params: OrderListParams): Promise<OrderListResponse> {
  const response = await apiClient.get<OrderListResponse>('/api/orders', {
    params: {
      search: params.search,
      status: params.status,
      page: params.page ?? 1,
      pageSize: params.pageSize ?? 8,
    },
  })
  return response.data
}

export function useOrderList(params: OrderListParams) {
  return useQuery<OrderListResponse>({
    queryKey: ['orders', 'list', params],
    queryFn: () => fetchOrders(params),
  })
}

export function useUpdateOrderStatus() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: OrderStatus }) => {
      const response = await apiClient.put<Order>(`/api/orders/${id}`, { status })
      return response.data
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['orders'] })
      qc.invalidateQueries({ queryKey: ['analytics'] })
    },
  })
}

export function useDeleteOrder() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/api/orders/${id}`)
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['orders'] })
      qc.invalidateQueries({ queryKey: ['analytics'] })
    },
  })
}
