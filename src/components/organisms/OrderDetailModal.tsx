'use client'

import { useCallback, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/atoms/Button'
import { Modal } from '@/components/molecules/Modal'
import { useUpdateOrderStatus } from '@/hooks/useOrders'
import type { Order, OrderStatus } from '@/types'

const STATUS_OPTIONS: OrderStatus[] = ['pending', 'processing', 'shipped', 'delivered', 'cancelled']

interface OrderDetailModalProps {
  order: Order
  onClose: () => void
}

export function OrderDetailModal({ order, onClose }: OrderDetailModalProps) {
  const { mutate: updateStatus, isPending } = useUpdateOrderStatus()
  const [newStatus, setNewStatus] = useState<OrderStatus>(order.status)

  const handleSave = useCallback(() => {
    if (newStatus === order.status) {
      onClose()
      return
    }

    updateStatus({ id: order.id, status: newStatus }, { onSuccess: onClose })
  }, [newStatus, onClose, order.id, order.status, updateStatus])

  return (
    <Modal
      open
      onClose={onClose}
      title={`Order ${order.orderNumber}`}
      description={`Placed on ${new Date(order.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })}`}
      size="lg"
    >
      <div className="flex flex-col gap-5">
        <div className="rounded-2xl border border-border bg-background p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Customer</p>
          <p className="mt-1.5 font-medium">{order.customerName}</p>
          <p className="text-sm text-muted-foreground">{order.customerEmail}</p>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Items</p>
          <div className="divide-y divide-border rounded-2xl border border-border">
            {order.items.map((item, i) => (
              <div key={i} className="flex items-center justify-between px-4 py-3">
                <div>
                  <p className="text-sm font-medium">{item.productName}</p>
                  <p className="text-xs text-muted-foreground">
                    Qty {item.quantity} x ${item.unitPrice.toFixed(2)}
                  </p>
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

        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Update Status</p>
          <div className="relative">
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value as OrderStatus)}
              className="w-full appearance-none rounded-xl border border-border bg-card px-4 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status} className="capitalize">
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <Button type="button" onClick={handleSave} loading={isPending} className="flex-1">
            Save changes
          </Button>
          <Button type="button" variant="ghost" onClick={onClose} disabled={isPending}>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  )
}
