import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { DashboardLayout } from '@/components/templates/DashboardLayout'
import { UserForm } from '@/components/organisms/UserForm'
import { userStore } from '@/lib/data/userStore'

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const user = userStore.getById(id)
  if (!user) return { title: 'User Not Found' }
  return {
    title: `Edit ${user.name}`,
    description: `Edit profile of ${user.name}.`,
  }
}

export default async function EditUserPage({ params }: Props) {
  const { id } = await params
  const user = userStore.getById(id)

  if (!user) notFound()

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-2xl">
        <div className="mb-6">
          <Link
            href={`/dashboard/users/${user.id}`}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={15} />
            Back to Profile
          </Link>
          <h1 className="mt-4 text-2xl font-semibold">Edit User</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Update {user.name}&apos;s details.
          </p>
        </div>

        <div className="rounded-3xl border border-border bg-card p-6 shadow-card">
          <UserForm user={user} />
        </div>
      </div>
    </DashboardLayout>
  )
}
