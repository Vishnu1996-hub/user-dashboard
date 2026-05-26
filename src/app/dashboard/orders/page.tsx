import type { Metadata } from 'next'
import { DashboardLayout } from '@/components/templates/DashboardLayout'
import { OrderTable } from '@/components/organisms/OrderTable'

export const metadata: Metadata = {
  title: 'Orders',
  description: 'Review and manage customer orders — filter by status and update fulfilment.',
}

export default function OrdersPage() {
  return (
    <DashboardLayout>
      <OrderTable />
    </DashboardLayout>
  )
}
