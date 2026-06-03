import type { Metadata } from 'next'
import { DashboardLayout } from '@/components/templates/DashboardLayout'
import { UserTable } from '@/components/organisms/UserTable'
import { createMetadata } from '@/lib/seo'

export const metadata: Metadata = createMetadata({
  title: 'Users',
  description: 'Manage team users - search, filter, and control access.',
  path: '/dashboard/users',
})

export default function UsersPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <section aria-labelledby="users-title">
          <h1 id="users-title" className="text-2xl font-semibold">
            Users
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage team users, roles, account status, and access.
          </p>
        </section>
        <UserTable />
      </div>
    </DashboardLayout>
  )
}
