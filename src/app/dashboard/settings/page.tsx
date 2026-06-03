import type { Metadata } from 'next'
import { DashboardLayout } from '@/components/templates/DashboardLayout'
import { SettingsPanel } from '@/app/features/settings/SettingsPanel'
import { createMetadata } from '@/lib/seo'

export const metadata: Metadata = createMetadata({
  title: 'Settings',
  description: 'Manage your profile, appearance, notifications and security preferences.',
  path: '/dashboard/settings',
})

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <SettingsPanel />
    </DashboardLayout>
  )
}
