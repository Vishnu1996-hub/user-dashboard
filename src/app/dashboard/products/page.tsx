import type { Metadata } from 'next'
import { DashboardLayout } from '@/components/templates/DashboardLayout'
import { ProductTable } from '@/components/organisms/ProductTable'
import { createMetadata } from '@/lib/seo'

export const metadata: Metadata = createMetadata({
  title: 'Products',
  description: 'Manage your product catalogue - add, edit, and track inventory.',
  path: '/dashboard/products',
})

export default function ProductsPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <section aria-labelledby="products-title">
          <h1 id="products-title" className="text-2xl font-semibold">
            Products
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage product catalogue details, pricing, status, and stock.
          </p>
        </section>
        <ProductTable />
      </div>
    </DashboardLayout>
  )
}
