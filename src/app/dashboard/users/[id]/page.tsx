import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Calendar, Edit2, Mail, Shield } from 'lucide-react'
import { DashboardLayout } from '@/components/templates/DashboardLayout'
import { Avatar } from '@/components/atoms/Avatar'
import { Badge } from '@/components/atoms/Badge'
import { userStore } from '@/lib/data/userStore'
import { createMetadata } from '@/lib/seo'
import DeleteUserButton from './DeleteUserButton'

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const user = userStore.getById(id)

  if (!user) {
    return createMetadata({
      title: 'User Not Found',
      description: 'The requested user profile could not be found.',
      path: `/dashboard/users/${id}`,
      noIndex: true,
    })
  }

  return createMetadata({
    title: user.name,
    description: `Profile of ${user.name} - ${user.role} / ${user.status}.`,
    path: `/dashboard/users/${user.id}`,
    noIndex: true,
  })
}

export default async function UserDetailPage({ params }: Props) {
  const { id } = await params
  const user = userStore.getById(id)

  if (!user) notFound()

  return (
    <DashboardLayout>
      <article aria-labelledby="user-profile-title" className="mx-auto max-w-2xl">
        <div className="mb-6">
          <Link
            href="/dashboard/users"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={15} aria-hidden="true" />
            Back to Users
          </Link>
        </div>

        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-card">
          <div className="h-20 bg-primary/10" aria-hidden="true" />

          <div className="-mt-10 px-6 pb-6">
            <div className="flex items-end justify-between">
              <Avatar name={user.name} size="lg" className="ring-4 ring-card" />
              <div className="flex items-center gap-2 pb-1">
                <Link
                  href={`/dashboard/users/${user.id}/edit`}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary"
                >
                  <Edit2 size={14} aria-hidden="true" />
                  Edit
                </Link>
                <DeleteUserButton userId={user.id} userName={user.name} />
              </div>
            </div>

            <div className="mt-4">
              <h1 id="user-profile-title" className="text-xl font-semibold">
                {user.name}
              </h1>
              <p className="mt-0.5 text-sm capitalize text-muted-foreground">{user.role}</p>
            </div>

            <section aria-label="User profile details" className="mt-6 grid gap-4 sm:grid-cols-2">
              <InfoRow icon={Mail} label="Email" value={user.email} />
              <InfoRow icon={Shield} label="Role" value={user.role} capitalize />
              <InfoRow
                icon={Calendar}
                label="Joined"
                value={new Date(user.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              />
              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Status
                </span>
                <Badge status={user.status} />
              </div>
            </section>
          </div>
        </div>
      </article>
    </DashboardLayout>
  )
}

function InfoRow({
  icon: Icon,
  label,
  value,
  capitalize,
}: {
  icon: React.ElementType
  label: string
  value: string
  capitalize?: boolean
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <div className="flex items-center gap-2 text-sm">
        <Icon size={14} className="shrink-0 text-muted-foreground" aria-hidden="true" />
        <span className={capitalize ? 'capitalize' : ''}>{value}</span>
      </div>
    </div>
  )
}
