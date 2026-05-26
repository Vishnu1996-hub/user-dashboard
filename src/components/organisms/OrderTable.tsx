'use client'

import { useState } from 'react'
import { ChevronDown, Trash2 } from 'lucide-react'
import { Badge } from '@/components/atoms/Badge'
import { Button } from '@/components/atoms/Button'
import { Skeleton } from '@/components/atoms/Skeleton'
import { SearchInput } from '@/components/molecules/SearchInput'
import { Pagination } from '@/components/molecules/Pagination'
import { Modal } from '@/components/molecules/Modal'
import { ConfirmDialog } from '@/components/molecules/ConfirmDialog'
import { useOrderList, useUpdateOrderStatus, useDeleteOrder } from '@/hooks/useOrders'
import { useDebounce } from '@/hooks/useDebounce'
import { cn } from '@/lib/utils'
import type { Order, OrderStatus } from '@/types'

const PAGE_SIZE = 8
const STATUS_FILTERS: Array<OrderStatus | 'all'> = ['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled']

const STATUS_OPTIONS: OrderStatus[] = ['pending', 'processing', 'shipped', 'delivered', 'cancelled']

// ─── Order Detail Modal ───────────────────────────────────────────────────────

function OrderDetailModal({ order, onClose }: { order: Order; onClose: () => void }) {
  const { mutate: updateStatus, isPending } = useUpdateOrderStatus()
  const [newStatus, setNewStatus] = useState<OrderStatus>(order.status)

  const handleSave = () => {
    if (newStatus === order.status) { onClose(); return }
    updateStatus({ id: order.id, status: newStatus }, { onSuccess: onClose })
  }

  return (
    <Modal open onClose={onClose} title={`Order ${order.orderNumber}`} description={`Placed on ${new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`} size="lg">
      <div className="flex flex-col gap-5">
        {/* Customer */}
        <div className="rounded-2xl border border-border bg-background p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Customer</p>
          <p className="mt-1.5 font-medium">{order.customerName}</p>
          <p className="text-sm text-muted-foreground">{order.customerEmail}</p>
        </div>

        {/* Items */}
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Items</p>
          <div className="divide-y divide-border rounded-2xl border border-border">
            {order.items.map((item, i) => (
              <div key={i} className="flex items-center justify-between px-4 py-3">
                <div>
                  <p className="text-sm font-medium">{item.productName}</p>
                  <p className="text-xs text-muted-foreground">Qty {item.quantity} × ${item.unitPrice.toFixed(2)}</p>
                </div>
                <p className="font-medium">${(item.quantity * item.unitPrice).toFixed(2)}</p>
              </div>
            ))}
            <div className="flex items-center justify-between bg-secondary/40 px-4 py-3">
              <p className="text-sm font-semibold">Total</p>
              <p className="font-semibold">${order.total.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Status update */}
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Update Status</p>
          <div className="relative">
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value as OrderStatus)}
              className="w-full appearance-none rounded-xl border border-border bg-card px-4 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s} className="capitalize">{s.charAt(0).toUpperCase() + s.slice(1)}</option>
              ))}
            </select>
            <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          </div>
        </div>

        <div className="flex gap-3">
          <Button type="button" onClick={handleSave} loading={isPending} className="flex-1">Save changes</Button>
          <Button type="button" variant="ghost" onClick={onClose} disabled={isPending}>Cancel</Button>
        </div>
      </div>
    </Modal>
  )
}

// ─── OrderTable ───────────────────────────────────────────────────────────────

export function OrderTable() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<OrderStatus | 'all'>('all')
  const [page,   setPage]   = useState(1)

  const debouncedSearch = useDebounce(search, 300)

  const handleSearch = (v: string)               => { setSearch(v); setPage(1) }
  const handleStatus = (v: OrderStatus | 'all')  => { setStatus(v); setPage(1) }

  const { data, isLoading, error } = useOrderList({ search: debouncedSearch, status, page, pageSize: PAGE_SIZE })

  const [detailOrder,  setDetailOrder]  = useState<Order | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; orderNumber: string } | null>(null)

  const { mutate: deleteOrder, isPending: isDeleting } = useDeleteOrder()

  const handleConfirmDelete = () => {
    if (!deleteTarget) return
    deleteOrder(deleteTarget.id, { onSuccess: () => setDeleteTarget(null) })
  }

  return (
    <>
      {detailOrder && <OrderDetailModal order={detailOrder} onClose={() => setDetailOrder(null)} />}

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
        title={`Delete ${deleteTarget?.orderNumber}?`}
        message="This order will be permanently removed and cannot be recovered."
        confirmLabel="Yes, delete"
        variant="danger"
        loading={isDeleting}
      />

      <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-card">
        {/* Header */}
        <div className="flex flex-col gap-4 border-b border-border p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold">All Orders</h2>
            <p className="text-sm text-muted-foreground">
              {data ? `${data.total} order${data.total !== 1 ? 's' : ''} total` : '—'}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-3 border-b border-border px-6 py-4 sm:flex-row sm:items-center">
          <SearchInput value={search} onChange={handleSearch} placeholder="Search by order # or customer…" className="sm:w-72" />
          <div className="flex flex-wrap gap-2">
            {STATUS_FILTERS.map((s) => (
              <button key={s} onClick={() => handleStatus(s)}
                className={cn('rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-colors',
                  status === s ? 'bg-primary text-primary-foreground' : 'border border-border hover:bg-secondary')}>
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <th className="px-6 py-3">Order</th>
                <th className="hidden px-6 py-3 sm:table-cell">Customer</th>
                <th className="hidden px-6 py-3 md:table-cell">Items</th>
                <th className="px-6 py-3">Total</th>
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
                <tr><td colSpan={6} className="px-6 py-16 text-center text-muted-foreground">Failed to load orders. Please try again.</td></tr>
              ) : data?.orders.length === 0 ? (
                <tr><td colSpan={6} className="px-6 py-16 text-center">
                  <p className="font-medium">No orders found</p>
                  <p className="mt-1 text-sm text-muted-foreground">Try adjusting your search or filter.</p>
                </td></tr>
              ) : (
                data?.orders.map((order) => (
                  <tr key={order.id} className="cursor-pointer transition-colors hover:bg-secondary/40"
                    onClick={() => setDetailOrder(order)}>
                    <td className="px-6 py-4">
                      <p className="font-medium">{order.orderNumber}</p>
                      <p className="text-xs text-muted-foreground">{new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                    </td>
                    <td className="hidden px-6 py-4 sm:table-cell">
                      <p className="font-medium leading-tight">{order.customerName}</p>
                      <p className="text-xs text-muted-foreground">{order.customerEmail}</p>
                    </td>
                    <td className="hidden px-6 py-4 text-muted-foreground md:table-cell">{order.items.length} item{order.items.length !== 1 ? 's' : ''}</td>
                    <td className="px-6 py-4 font-semibold">${order.total.toFixed(2)}</td>
                    <td className="px-6 py-4"><Badge status={order.status} /></td>
                    <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => setDeleteTarget({ id: order.id, orderNumber: order.orderNumber })}
                          disabled={isDeleting} aria-label={`Delete ${order.orderNumber}`}
                          className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-danger/10 hover:text-danger disabled:opacity-50">
                          <Trash2 size={15} />
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
