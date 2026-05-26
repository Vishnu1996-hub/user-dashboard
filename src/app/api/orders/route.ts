import type { OrderStatus } from '@/types'
import { orderStore } from '@/lib/data/orderStore'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const search   = searchParams.get('search')  ?? ''
  const status   = (searchParams.get('status') ?? 'all') as OrderStatus | 'all'
  const page     = Math.max(1,  parseInt(searchParams.get('page')     ?? '1'))
  const pageSize = Math.min(50, parseInt(searchParams.get('pageSize') ?? '8'))

  let orders = orderStore.getAll()

  if (search) {
    const q = search.toLowerCase()
    orders = orders.filter(
      (o) =>
        o.orderNumber.toLowerCase().includes(q)   ||
        o.customerName.toLowerCase().includes(q)  ||
        o.customerEmail.toLowerCase().includes(q)
    )
  }
  if (status !== 'all') orders = orders.filter((o) => o.status === status)

  const total     = orders.length
  const start     = (page - 1) * pageSize
  const paginated = orders.slice(start, start + pageSize)

  return Response.json({ orders: paginated, total, page, pageSize })
}
