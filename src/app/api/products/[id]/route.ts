import type { NextRequest } from 'next/server'
import { productStore } from '@/lib/data/productStore'

type Context = { params: Promise<{ id: string }> }

export async function GET(_req: NextRequest, { params }: Context) {
  const { id } = await params
  const product = productStore.getById(id)
  if (!product) return Response.json({ error: 'Product not found' }, { status: 404 })
  return Response.json(product)
}

export async function PUT(request: NextRequest, { params }: Context) {
  const { id } = await params
  const body    = await request.json()
  const product = productStore.update(id, body)
  if (!product) return Response.json({ error: 'Product not found' }, { status: 404 })
  return Response.json(product)
}

export async function DELETE(_req: NextRequest, { params }: Context) {
  const { id } = await params
  const ok = productStore.delete(id)
  if (!ok) return Response.json({ error: 'Product not found' }, { status: 404 })
  return Response.json({ success: true })
}
