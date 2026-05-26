import type { Metadata } from 'next'
import { DashboardLayout } from '@/components/templates/DashboardLayout'
import { SettingsPanel } from '@/app/features/settings/SettingsPanel'

export const metadata: Metadata = {
  title: 'Settings',
  description: 'Manage your profile, appearance, notifications and security preferences.',
}

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <SettingsPanel />
    </DashboardLayout>
  )
}
