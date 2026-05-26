import type { Metadata } from 'next'
import { DashboardLayout } from '@/components/templates/DashboardLayout'
import { ProductTable } from '@/components/organisms/ProductTable'

export const metadata: Metadata = {
  title: 'Products',
  description: 'Manage your product catalogue — add, edit, and track inventory.',
}

export default function ProductsPage() {
  return (
    <DashboardLayout>
      <ProductTable />
    </DashboardLayout>
  )
}
