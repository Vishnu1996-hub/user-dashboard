'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { Order, OrderStatus } from '@/types'

export interface OrderListParams {
  search?:   string
  status?:   OrderStatus | 'all'
  page?:     number
  pageSize?: number
}

export interface OrderListResponse {
  orders:   Order[]
  total:    number
  page:     number
  pageSize: number
}

async function fetchOrders(params: OrderListParams): Promise<OrderListResponse> {
  const sp = new URLSearchParams()
  if (params.search) sp.set('search', params.search)
  if (params.status) sp.set('status', params.status)
  sp.set('page',     String(params.page     ?? 1))
  sp.set('pageSize', String(params.pageSize ?? 8))

  const res = await fetch(`/api/orders?${sp}`)
  if (!res.ok) throw new Error('Failed to fetch orders')
  return res.json()
}

export function useOrderList(params: OrderListParams) {
  return useQuery<OrderListResponse>({
    queryKey: ['orders', 'list', params],
    queryFn:  () => fetchOrders(params),
  })
}

export function useUpdateOrderStatus() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: OrderStatus }) => {
      const res = await fetch(`/api/orders/${id}`, {
        method:  'PUT',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ status }),
      })
      if (!res.ok) throw new Error('Failed to update order')
      return res.json() as Promise<Order>
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
      const res = await fetch(`/api/orders/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete order')
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['orders'] })
      qc.invalidateQueries({ queryKey: ['analytics'] })
    },
  })
}
