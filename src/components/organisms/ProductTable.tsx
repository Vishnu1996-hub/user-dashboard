'use client'

import { useCallback, useState } from 'react'
import dynamic from 'next/dynamic'
import { Edit2, Package, Plus, Trash2 } from 'lucide-react'
import { Badge } from '@/components/atoms/Badge'
import { Button } from '@/components/atoms/Button'
import { Skeleton } from '@/components/atoms/Skeleton'
import { SearchInput } from '@/components/molecules/SearchInput'
import { Pagination } from '@/components/molecules/Pagination'
import { Modal } from '@/components/molecules/Modal'
import { ConfirmDialog } from '@/components/molecules/ConfirmDialog'
import { useProductList, useDeleteProduct } from '@/hooks/useProducts'
import { useDebounce } from '@/hooks/useDebounce'
import { cn } from '@/lib/utils'
import type { Product, ProductCategory, ProductStatus } from '@/types'

const PAGE_SIZE = 8

const STATUS_FILTERS: Array<ProductStatus | 'all'> = ['all', 'active', 'draft', 'archived']
const CATEGORY_FILTERS: Array<ProductCategory | 'all'> = ['all', 'electronics', 'clothing', 'food', 'books', 'home', 'sports']

const ProductForm = dynamic(
  () => import('@/components/organisms/ProductForm').then((mod) => mod.ProductForm),
  {
    loading: () => (
      <div className="flex flex-col gap-5">
        {Array.from({ length: 7 }).map((_, i) => (
          <Skeleton key={i} className="h-11 rounded-xl" />
        ))}
      </div>
    ),
  }
)

export function ProductTable() {
  const [search,   setSearch]   = useState('')
  const [status,   setStatus]   = useState<ProductStatus | 'all'>('all')
  const [category, setCategory] = useState<ProductCategory | 'all'>('all')
  const [page,     setPage]     = useState(1)

  const debouncedSearch = useDebounce(search, 300)

  const handleSearch = useCallback((v: string) => {
    setSearch(v)
    setPage(1)
  }, [])

  const handleStatus = useCallback((v: ProductStatus | 'all') => {
    setStatus(v)
    setPage(1)
  }, [])

  const handleCategory = useCallback((v: ProductCategory | 'all') => {
    setCategory(v)
    setPage(1)
  }, [])

  const { data, isLoading, error } = useProductList({ search: debouncedSearch, status, category, page, pageSize: PAGE_SIZE })

  // ── Modal state ────────────────────────────────────────────────────────────
  const [addOpen,      setAddOpen]      = useState(false)
  const [editProduct,  setEditProduct]  = useState<Product | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null)

  const { mutate: deleteProduct, isPending: isDeleting } = useDeleteProduct()

  const closeAddModal = useCallback(() => setAddOpen(false), [])
  const closeEditModal = useCallback(() => setEditProduct(null), [])
  const closeDeleteDialog = useCallback(() => setDeleteTarget(null), [])
  const openAddModal = useCallback(() => setAddOpen(true), [])

  const handleConfirmDelete = useCallback(() => {
    if (!deleteTarget) return
    deleteProduct(deleteTarget.id, { onSuccess: () => setDeleteTarget(null) })
  }, [deleteProduct, deleteTarget])

  return (
    <>
      {/* Add modal */}
      <Modal open={addOpen} onClose={closeAddModal} title="Add Product" description="Add a new product to your catalogue." size="lg">
        <ProductForm onSuccess={closeAddModal} onCancel={closeAddModal} />
      </Modal>

      {/* Edit modal */}
      <Modal open={Boolean(editProduct)} onClose={closeEditModal} title="Edit Product" description={editProduct ? `Update "${editProduct.name}".` : undefined} size="lg">
        <ProductForm key={editProduct?.id} product={editProduct ?? undefined} onSuccess={closeEditModal} onCancel={closeEditModal} />
      </Modal>

      {/* Delete confirm */}
      <ConfirmDialog
        open={Boolean(deleteTarget)}
        onClose={closeDeleteDialog}
        onConfirm={handleConfirmDelete}
        title={`Delete "${deleteTarget?.name}"?`}
        message="This product will be permanently removed from your catalogue."
        confirmLabel="Yes, delete"
        variant="danger"
        loading={isDeleting}
      />

      {/* Table card */}
      <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-card">
        {/* Header */}
        <div className="flex flex-col gap-4 border-b border-border p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold">All Products</h2>
            <p className="text-sm text-muted-foreground">
              {data ? `${data.total} product${data.total !== 1 ? 's' : ''} total` : '—'}
            </p>
          </div>
          <Button size="sm" onClick={openAddModal}>
            <Plus size={15} /> Add Product
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-3 border-b border-border px-6 py-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <SearchInput value={search} onChange={handleSearch} placeholder="Search by name or SKU…" className="sm:w-64" />
            <div className="flex flex-wrap gap-2">
              {STATUS_FILTERS.map((s) => (
                <button key={s} onClick={() => handleStatus(s)} aria-pressed={status === s}
                  className={cn('rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-colors',
                    status === s ? 'bg-primary text-primary-foreground' : 'border border-border hover:bg-secondary')}>
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORY_FILTERS.map((c) => (
              <button key={c} onClick={() => handleCategory(c)} aria-pressed={category === c}
                className={cn('rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-colors',
                  category === c ? 'bg-secondary text-foreground ring-1 ring-border' : 'border border-border hover:bg-secondary')}>
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <caption className="sr-only">Products with category, price, stock, status, and actions</caption>
            <thead>
              <tr className="border-b border-border text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <th className="px-6 py-3">Product</th>
                <th className="hidden px-6 py-3 sm:table-cell">Category</th>
                <th className="px-6 py-3">Price</th>
                <th className="hidden px-6 py-3 md:table-cell">Stock</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}><td colSpan={6} className="px-6 py-3"><Skeleton className="h-10 w-full rounded-xl" /></td></tr>
                ))
              ) : error ? (
                <tr><td colSpan={6} className="px-6 py-16 text-center text-muted-foreground">Failed to load products. Please try again.</td></tr>
              ) : data?.products.length === 0 ? (
                <tr><td colSpan={6} className="px-6 py-16 text-center">
                  <p className="font-medium">No products found</p>
                  <p className="mt-1 text-sm text-muted-foreground">Try adjusting your search or filters.</p>
                </td></tr>
              ) : (
                data?.products.map((product) => (
                  <tr key={product.id} className="transition-colors hover:bg-secondary/40">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                          <Package size={16} aria-hidden="true" />
                        </div>
                        <div>
                          <p className="font-medium leading-tight">{product.name}</p>
                          <p className="text-xs text-muted-foreground">{product.sku}</p>
                        </div>
                      </div>
                    </td>
                    <td className="hidden px-6 py-4 capitalize text-muted-foreground sm:table-cell">{product.category}</td>
                    <td className="px-6 py-4 font-medium">${product.price.toFixed(2)}</td>
                    <td className="hidden px-6 py-4 md:table-cell">
                      <span className={cn('font-medium', product.stock === 0 ? 'text-danger' : product.stock < 20 ? 'text-warning' : 'text-foreground')}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4"><Badge status={product.status} /></td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => setEditProduct(product)} aria-label={`Edit ${product.name}`}
                          className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
                          <Edit2 size={15} aria-hidden="true" />
                        </button>
                        <button onClick={() => setDeleteTarget({ id: product.id, name: product.name })} disabled={isDeleting}
                          aria-label={`Delete ${product.name}`}
                          className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-danger/10 hover:text-danger disabled:opacity-50">
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
            <Pagination page={page} pageSize={PAGE_SIZE} total={data.total} onPageChange={setPage} />
          </div>
        )}
      </div>
    </>
  )
}
