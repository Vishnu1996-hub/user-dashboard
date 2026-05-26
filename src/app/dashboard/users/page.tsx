import type { Metadata } from 'next'
import { DashboardLayout } from '@/components/templates/DashboardLayout'
import { UserTable } from '@/components/organisms/UserTable'

export const metadata: Metadata = {
  title: 'Users',
  description: 'Manage team users — search, filter, and control access.',
}

export default function UsersPage() {
  return (
    <DashboardLayout>
      <UserTable />
    </DashboardLayout>
  )
}
