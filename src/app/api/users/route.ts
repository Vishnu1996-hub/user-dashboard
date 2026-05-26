import type { UserStatus } from '@/types'
import { userStore } from '@/lib/data/userStore'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const search = searchParams.get('search') ?? ''
  const status = (searchParams.get('status') ?? 'all') as UserStatus | 'all'
  const page = Math.max(1, parseInt(searchParams.get('page') ?? '1'))
  const pageSize = Math.min(50, parseInt(searchParams.get('pageSize') ?? '8'))

  let users = userStore.getAll()

  if (search) {
    const q = search.toLowerCase()
    users = users.filter(
      (u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    )
  }

  if (status !== 'all') {
    users = users.filter((u) => u.status === status)
  }

  const total = users.length
  const start = (page - 1) * pageSize
  const paginated = users.slice(start, start + pageSize)

  return Response.json({ users: paginated, total, page, pageSize })
}

export async function POST(request: Request) {
  const body = await request.json()
  const user = userStore.create(body)
  return Response.json(user, { status: 201 })
}
