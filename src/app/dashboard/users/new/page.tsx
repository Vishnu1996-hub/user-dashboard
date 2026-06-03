import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { DashboardLayout } from '@/components/templates/DashboardLayout'
import { UserForm } from '@/components/organisms/UserForm'
import { createMetadata } from '@/lib/seo'

export const metadata: Metadata = createMetadata({
  title: 'Add User',
  description: 'Create a new team member account.',
  path: '/dashboard/users/new',
  noIndex: true,
})

export default function NewUserPage() {
  return (
    <DashboardLayout>
      <section aria-labelledby="add-user-title" className="mx-auto max-w-2xl">
        <div className="mb-6">
          <Link
            href="/dashboard/users"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={15} aria-hidden="true" />
            Back to Users
          </Link>
          <h1 id="add-user-title" className="mt-4 text-2xl font-semibold">
            Add User
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Create a new team member with role and access level.
          </p>
        </div>

        <div className="rounded-3xl border border-border bg-card p-6 shadow-card">
          <UserForm />
        </div>
      </section>
    </DashboardLayout>
  )
}
