'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { Product, ProductStatus, ProductCategory } from '@/types'
import apiClient from '@/lib/api/client'

export interface ProductListParams {
  search?: string
  status?: ProductStatus | 'all'
  category?: ProductCategory | 'all'
  page?: number
  pageSize?: number
}

export interface ProductListResponse {
  products: Product[]
  total: number
  page: number
  pageSize: number
}

async function fetchProducts(params: ProductListParams): Promise<ProductListResponse> {
  const response = await apiClient.get<ProductListResponse>('/api/products', {
    params: {
      search: params.search,
      status: params.status,
      category: params.category,
      page: params.page ?? 1,
      pageSize: params.pageSize ?? 8,
    },
  })

  return response.data
}

export function useProductList(params: ProductListParams) {
  return useQuery<ProductListResponse>({
    queryKey: ['products', 'list', params],
    queryFn: () => fetchProducts(params),
  })
}

export function useCreateProduct() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (data: Omit<Product, 'id' | 'createdAt'>) => {
      const response = await apiClient.post<Product>('/api/products', data)
      return response.data
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
      const response = await apiClient.put<Product>(`/api/products/${id}`, data)
      return response.data
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
      await apiClient.delete(`/api/products/${id}`)
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['products'] })
      qc.invalidateQueries({ queryKey: ['analytics'] })
    },
  })
}
