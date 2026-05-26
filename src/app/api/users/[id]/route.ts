import type { NextRequest } from 'next/server'
import { userStore } from '@/lib/data/userStore'

type Context = { params: Promise<{ id: string }> }

export async function GET(_req: NextRequest, { params }: Context) {
  const { id } = await params
  const user = userStore.getById(id)
  if (!user) return Response.json({ error: 'User not found' }, { status: 404 })
  return Response.json(user)
}

export async function PUT(request: NextRequest, { params }: Context) {
  const { id } = await params
  const body = await request.json()
  const user = userStore.update(id, body)
  if (!user) return Response.json({ error: 'User not found' }, { status: 404 })
  return Response.json(user)
}

export async function DELETE(_req: NextRequest, { params }: Context) {
  const { id } = await params
  const ok = userStore.delete(id)
  if (!ok) return Response.json({ error: 'User not found' }, { status: 404 })
  return Response.json({ success: true })
}
