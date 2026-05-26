'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { Product, ProductStatus, ProductCategory } from '@/types'

export interface ProductListParams {
  search?:   string
  status?:   ProductStatus | 'all'
  category?: ProductCategory | 'all'
  page?:     number
  pageSize?: number
}

export interface ProductListResponse {
  products: Product[]
  total:    number
  page:     number
  pageSize: number
}

async function fetchProducts(params: ProductListParams): Promise<ProductListResponse> {
  const sp = new URLSearchParams()
  if (params.search)   sp.set('search',   params.search)
  if (params.status)   sp.set('status',   params.status)
  if (params.category) sp.set('category', params.category)
  sp.set('page',     String(params.page     ?? 1))
  sp.set('pageSize', String(params.pageSize ?? 8))

  const res = await fetch(`/api/products?${sp}`)
  if (!res.ok) throw new Error('Failed to fetch products')
  return res.json()
}

export function useProductList(params: ProductListParams) {
  return useQuery<ProductListResponse>({
    queryKey: ['products', 'list', params],
    queryFn:  () => fetchProducts(params),
  })
}

export function useCreateProduct() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (data: Omit<Product, 'id' | 'createdAt'>) => {
      const res = await fetch('/api/products', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed to create product')
      return res.json() as Promise<Product>
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['products'] })
      qc.invalidateQueries({ queryKey: ['analytics'] })
    },
  })
}

export function useUpdateProduct() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, ...data }: Partial<Product> & { id: string }) => {
      const res = await fetch(`/api/products/${id}`, {
        method:  'PUT',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed to update product')
      return res.json() as Promise<Product>
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['products'] })
      qc.invalidateQueries({ queryKey: ['analytics'] })
    },
  })
}

export function useDeleteProduct() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete product')
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['products'] })
      qc.invalidateQueries({ queryKey: ['analytics'] })
    },
  })
}
