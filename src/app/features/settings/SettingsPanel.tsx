'use client'

import { useState } from 'react'
import {
  Bell,
  Camera,
  KeyRound,
  Lock,
  Palette,
  Shield,
  Smartphone,
  User,
} from 'lucide-react'
import { Button } from '@/components/atoms/Button'
import { ThemeSwitcher } from '@/components/molecules/ThemeSwitcher'
import { ConfirmDialog } from '@/components/molecules/ConfirmDialog'
import { cn } from '@/lib/utils'

// ─── Shared section wrapper ───────────────────────────────────────────────────

function Section({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: React.ElementType
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <div className="overflow-visible rounded-3xl border border-border bg-card shadow-sm">
      <div className="flex items-center gap-4 border-b border-border p-6">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Icon size={20} />
        </div>
        <div>
          <h2 className="font-semibold">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="p-6">{children}</div>
    </div>
  )
}

// ─── Toggle ───────────────────────────────────────────────────────────────────

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        'relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40',
        checked ? 'bg-primary' : 'bg-border'
      )}
    >
      <span
        className={cn(
          'inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200',
          checked ? 'translate-x-6' : 'translate-x-1'
        )}
      />
    </button>
  )
}

// ─── Field ────────────────────────────────────────────────────────────────────

function Field({
  label,
  id,
  children,
}: {
  label: string
  id?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium">
          {label}
        </label>
      )}
      {children}
    </div>
  )
}

const inputCls =
  'h-9 w-full rounded-xl border border-border bg-background px-3 text-sm ' +
  'placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40'

// ─── Profile section ──────────────────────────────────────────────────────────

function ProfileSection() {
  const [name,  setName]  = useState('Alex Morgan')
  const [email, setEmail] = useState('alex@example.com')
  const [bio,   setBio]   = useState('Product manager & dashboard enthusiast.')
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <Section icon={User} title="Profile" description="Update your personal information.">
      <div className="flex flex-col gap-6">
        {/* Avatar */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-xl font-semibold text-primary-foreground">
              {initials}
            </div>
            <button
              type="button"
              aria-label="Change avatar"
              className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-card border border-border shadow-sm transition-colors hover:bg-secondary"
            >
              <Camera size={12} />
            </button>
          </div>
          <div>
            <p className="font-medium">{name}</p>
            <p className="text-sm text-muted-foreground">{email}</p>
          </div>
        </div>

        {/* Fields */}
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Full name" id="settings-name">
            <input
              id="settings-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="Email address" id="settings-email">
            <input
              id="settings-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputCls}
            />
          </Field>
        </div>

        <Field label="Bio" id="settings-bio">
          <textarea
            id="settings-bio"
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className={cn(inputCls, 'h-auto resize-none py-2')}
          />
        </Field>

        <div className="flex items-center gap-3">
          <Button onClick={handleSave} size="sm" className="min-w-28">
            {saved ? 'Saved ✓' : 'Save changes'}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => { setName('Alex Morgan'); setEmail('alex@example.com'); setBio('Product manager & dashboard enthusiast.') }}
          >
            Reset
          </Button>
        </div>
      </div>
    </Section>
  )
}

// ─── Appearance section ───────────────────────────────────────────────────────

function AppearanceSection() {
  return (
    <Section icon={Palette} title="Appearance" description="Choose a theme that suits your style.">
      <div className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground">
          Select a colour scheme for the dashboard. Your preference is saved automatically.
        </p>
        <ThemeSwitcher placement="bottom" />
      </div>
    </Section>
  )
}

// ─── Notifications section ────────────────────────────────────────────────────

const notificationItems = [
  { id: 'n-orders',    label: 'New orders',          desc: 'Get notified when a new order is placed.',             default: true  },
  { id: 'n-status',    label: 'Order status updates', desc: 'Alerts when an order status changes.',                default: true  },
  { id: 'n-lowstock',  label: 'Low stock alerts',     desc: 'Notify when a product stock drops below 20 units.',   default: true  },
  { id: 'n-users',     label: 'New user registrations', desc: 'Notify when a new user joins the platform.',        default: false },
  { id: 'n-marketing', label: 'Marketing updates',    desc: 'Product announcements and tips from the team.',       default: false },
]

function NotificationsSection() {
  const [prefs, setPrefs] = useState<Record<string, boolean>>(
    Object.fromEntries(notificationItems.map((i) => [i.id, i.default]))
  )

  return (
    <Section icon={Bell} title="Notifications" description="Choose what you want to be notified about.">
      <div className="flex flex-col divide-y divide-border">
        {notificationItems.map((item) => (
          <div key={item.id} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
            <div className="pr-6">
              <p className="text-sm font-medium">{item.label}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{item.desc}</p>
            </div>
            <Toggle
              checked={prefs[item.id]}
              onChange={(v) => setPrefs((prev) => ({ ...prev, [item.id]: v }))}
            />
          </div>
        ))}
      </div>
    </Section>
  )
}

// ─── Security section ─────────────────────────────────────────────────────────

function SecuritySection() {
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [mfaEnabled, setMfaEnabled]   = useState(false)
  const [saved, setSaved]             = useState(false)

  const handleChangePw = () => setConfirmOpen(true)
  const handleConfirm  = () => {
    setConfirmOpen(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <Section icon={Shield} title="Security" description="Manage your password and two-factor authentication.">
      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirm}
        variant="warning"
        title="Send password reset email?"
        message="We'll send a password reset link to your registered email address. The link expires in 30 minutes."
        confirmLabel="Send reset link"
      />

      <div className="flex flex-col gap-5">
        {/* Password */}
        <div className="flex items-center justify-between rounded-2xl border border-border bg-background p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary">
              <KeyRound size={16} className="text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium">Password</p>
              <p className="text-xs text-muted-foreground">Last changed 3 months ago</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={handleChangePw}>
            {saved ? 'Email sent ✓' : 'Change password'}
          </Button>
        </div>

        {/* 2FA */}
        <div className="flex items-center justify-between rounded-2xl border border-border bg-background p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary">
              <Smartphone size={16} className="text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium">Two-factor authentication</p>
              <p className="text-xs text-muted-foreground">
                {mfaEnabled ? 'Currently enabled — your account is protected.' : 'Add an extra layer of protection.'}
              </p>
            </div>
          </div>
          <Toggle checked={mfaEnabled} onChange={setMfaEnabled} />
        </div>

        {/* Sessions */}
        <div className="flex items-center justify-between rounded-2xl border border-border bg-background p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary">
              <Lock size={16} className="text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium">Active sessions</p>
              <p className="text-xs text-muted-foreground">2 sessions active on this account</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="text-danger hover:border-danger/40 hover:bg-danger/5 hover:text-danger">
            Revoke all
          </Button>
        </div>
      </div>
    </Section>
  )
}

// ─── Main panel ───────────────────────────────────────────────────────────────

export function SettingsPanel() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your account preferences and dashboard configuration.
        </p>
      </div>

      <ProfileSection />
      <AppearanceSection />
      <NotificationsSection />
      <SecuritySection />
    </div>
  )
}
