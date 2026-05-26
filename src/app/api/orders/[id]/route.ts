import type { NextRequest } from 'next/server'
import { orderStore } from '@/lib/data/orderStore'

type Context = { params: Promise<{ id: string }> }

export async function GET(_req: NextRequest, { params }: Context) {
  const { id } = await params
  const order = orderStore.getById(id)
  if (!order) return Response.json({ error: 'Order not found' }, { status: 404 })
  return Response.json(order)
}

export async function PUT(request: NextRequest, { params }: Context) {
  const { id }    = await params
  const { status } = await request.json()
  const order = orderStore.updateStatus(id, status)
  if (!order) return Response.json({ error: 'Order not found' }, { status: 404 })
  return Response.json(order)
}

export async function DELETE(_req: NextRequest, { params }: Context) {
  const { id } = await params
  const ok = orderStore.delete(id)
  if (!ok) return Response.json({ error: 'Order not found' }, { status: 404 })
  return Response.json({ success: true })
}
