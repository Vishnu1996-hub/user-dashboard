import type { ProductStatus, ProductCategory } from '@/types'
import { productStore } from '@/lib/data/productStore'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const search   = searchParams.get('search')   ?? ''
  const status   = (searchParams.get('status')   ?? 'all') as ProductStatus | 'all'
  const category = (searchParams.get('category') ?? 'all') as ProductCategory | 'all'
  const page     = Math.max(1,  parseInt(searchParams.get('page')     ?? '1'))
  const pageSize = Math.min(50, parseInt(searchParams.get('pageSize') ?? '8'))

  let products = productStore.getAll()

  if (search) {
    const q = search.toLowerCase()
    products = products.filter(
      (p) => p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q)
    )
  }
  if (status   !== 'all') products = products.filter((p) => p.status   === status)
  if (category !== 'all') products = products.filter((p) => p.category === category)

  const total     = products.length
  const start     = (page - 1) * pageSize
  const paginated = products.slice(start, start + pageSize)

  return Response.json({ products: paginated, total, page, pageSize })
}

export async function POST(request: Request) {
  const body    = await request.json()
  const product = productStore.create(body)
  return Response.json(product, { status: 201 })
}
