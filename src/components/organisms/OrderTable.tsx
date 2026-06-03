'use client'

import { useCallback, useState } from 'react'
import dynamic from 'next/dynamic'
import { Trash2 } from 'lucide-react'
import { Badge } from '@/components/atoms/Badge'
import { Skeleton } from '@/components/atoms/Skeleton'
import { SearchInput } from '@/components/molecules/SearchInput'
import { Pagination } from '@/components/molecules/Pagination'
import { ConfirmDialog } from '@/components/molecules/ConfirmDialog'
import { useOrderList, useDeleteOrder } from '@/hooks/useOrders'
import { useDebounce } from '@/hooks/useDebounce'
import { cn } from '@/lib/utils'
import type { Order, OrderStatus } from '@/types'

const PAGE_SIZE = 8
const STATUS_FILTERS: Array<OrderStatus | 'all'> = [
  'all',
  'pending',
  'processing',
  'shipped',
  'delivered',
  'cancelled',
]

const OrderDetailModal = dynamic(
  () => import('@/components/organisms/OrderDetailModal').then((mod) => mod.OrderDetailModal),
  {
    loading: () => <Skeleton className="h-96 rounded-3xl" />,
  }
)

export function OrderTable() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<OrderStatus | 'all'>('all')
  const [page, setPage] = useState(1)
  const [detailOrder, setDetailOrder] = useState<Order | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; orderNumber: string } | null>(null)

  const debouncedSearch = useDebounce(search, 300)

  const { data, isLoading, error } = useOrderList({
    search: debouncedSearch,
    status,
    page,
    pageSize: PAGE_SIZE,
  })
  const { mutate: deleteOrder, isPending: isDeleting } = useDeleteOrder()

  const handleSearch = useCallback((value: string) => {
    setSearch(value)
    setPage(1)
  }, [])

  const handleStatus = useCallback((value: OrderStatus | 'all') => {
    setStatus(value)
    setPage(1)
  }, [])

  const closeDetailModal = useCallback(() => setDetailOrder(null), [])
  const closeDeleteDialog = useCallback(() => setDeleteTarget(null), [])

  const handleConfirmDelete = useCallback(() => {
    if (!deleteTarget) return
    deleteOrder(deleteTarget.id, { onSuccess: closeDeleteDialog })
  }, [closeDeleteDialog, deleteOrder, deleteTarget])

  return (
    <>
      {detailOrder && <OrderDetailModal order={detailOrder} onClose={closeDetailModal} />}

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        onClose={closeDeleteDialog}
        onConfirm={handleConfirmDelete}
        title={`Delete ${deleteTarget?.orderNumber}?`}
        message="This order will be permanently removed and cannot be recovered."
        confirmLabel="Yes, delete"
        variant="danger"
        loading={isDeleting}
      />

      <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-card">
        <div className="flex flex-col gap-4 border-b border-border p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold">All Orders</h2>
            <p className="text-sm text-muted-foreground">
              {data ? `${data.total} order${data.total !== 1 ? 's' : ''} total` : '-'}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-b border-border px-6 py-4 sm:flex-row sm:items-center">
          <SearchInput
            value={search}
            onChange={handleSearch}
            placeholder="Search by order # or customer..."
            className="sm:w-72"
          />
          <div className="flex flex-wrap gap-2">
            {STATUS_FILTERS.map((item) => (
              <button
                key={item}
                onClick={() => handleStatus(item)}
                aria-pressed={status === item}
                className={cn(
                  'rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-colors',
                  status === item
                    ? 'bg-primary text-primary-foreground'
                    : 'border border-border hover:bg-secondary'
                )}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <caption className="sr-only">Orders with customer, item count, total, status, and actions</caption>
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
                  <tr key={i}>
                    <td colSpan={6} className="px-6 py-3">
                      <Skeleton className="h-10 w-full rounded-xl" />
                    </td>
                  </tr>
                ))
              ) : error ? (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center text-muted-foreground">
                    Failed to load orders. Please try again.
                  </td>
                </tr>
              ) : data?.orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center">
                    <p className="font-medium">No orders found</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Try adjusting your search or filter.
                    </p>
                  </td>
                </tr>
              ) : (
                data?.orders.map((order) => (
                  <tr
                    key={order.id}
                    className="cursor-pointer transition-colors hover:bg-secondary/40"
                    onClick={() => setDetailOrder(order)}
                  >
                    <td className="px-6 py-4">
                      <p className="font-medium">{order.orderNumber}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(order.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                    </td>
                    <td className="hidden px-6 py-4 sm:table-cell">
                      <p className="font-medium leading-tight">{order.customerName}</p>
                      <p className="text-xs text-muted-foreground">{order.customerEmail}</p>
                    </td>
                    <td className="hidden px-6 py-4 text-muted-foreground md:table-cell">
                      {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                    </td>
                    <td className="px-6 py-4 font-semibold">${order.total.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <Badge status={order.status} />
                    </td>
                    <td className="px-6 py-4" onClick={(event) => event.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() =>
                            setDeleteTarget({ id: order.id, orderNumber: order.orderNumber })
                          }
                          disabled={isDeleting}
                          aria-label={`Delete ${order.orderNumber}`}
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

        {data && data.total > PAGE_SIZE && (
          <div className="border-t border-border px-6 py-4">
            <Pagination page={page} pageSize={PAGE_SIZE} total={data.total} onPageChange={setPage} />
          </div>
        )}
      </div>
    </>
  )
}
