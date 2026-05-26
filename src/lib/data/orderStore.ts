import type { Order, OrderStatus } from '@/types'
import { createFileStore, type FileStore } from './store'
import { MOCK_ORDERS } from './orders'

// Orders use the generic store but expose a domain-specific `updateStatus`
// convenience method on top of the standard `update`.
const _base: FileStore<Order> = createFileStore<Order>('orders.json', MOCK_ORDERS)

export const orderStore = {
  ..._base,

  /** Update only the status field of an order. */
  updateStatus(id: string, status: OrderStatus): Order | null {
    return _base.update(id, { status })
  },
}
