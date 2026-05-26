'use client'

import { memo } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LogOut, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ThemeSwitcher } from '@/components/molecules/ThemeSwitcher'
import { BRAND, NAV_ITEMS } from '@/lib/sidebare'
import { useAuthStore } from '@/store/useAuthStore'

// ─── Brand / header strip ────────────────────────────────────────────────────

function SidebarBrand({ onClose }: { onClose: () => void }) {
  const Icon = BRAND.icon

  return (
    <div className="flex h-16 shrink-0 items-center justify-between border-b border-border px-6">
      <div className="flex items-center gap-3">
        <div
          aria-hidden="true"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm"
        >
          <Icon size={20} />
        </div>
        <div>
          <h2 className="text-sm font-semibold leading-tight">{BRAND.title}</h2>
          <p className="text-xs text-muted-foreground leading-tight">{BRAND.subtitle}</p>
        </div>
      </div>

      {/* Close button — visible on ALL screen sizes */}
      <button
        onClick={onClose}
        aria-label="Close sidebar"
        className="rounded-lg p-2 transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
      >
        <X size={18} aria-hidden="true" />
      </button>
    </div>
  )
}

// ─── Nav item ────────────────────────────────────────────────────────────────

function NavItem({
  label,
  icon: Icon,
  href,
  active,
}: {
  label: string
  icon: React.ElementType
  href: string
  active?: boolean
}) {
  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40',
        active
          ? 'bg-primary text-primary-foreground shadow-sm'
          : 'text-foreground hover:bg-secondary'
      )}
    >
      <Icon size={18} aria-hidden="true" />
      {label}
    </Link>
  )
}

// ─── Sign-out button ──────────────────────────────────────────────────────────

function SidebarSignOut() {
  const logout = useAuthStore((s) => s.logout)

  const handleLogout = () => {
    logout()
    // Full-page redirect: clears all React/RSC state and forces the proxy
    // to evaluate the cleared auth cookie before serving the login page.
    window.location.href = '/login'
  }

  return (
    <div className="shrink-0 px-4 pb-2">
      <button
        onClick={handleLogout}
        className={cn(
          'flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-colors',
          'text-danger hover:bg-danger/10',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger/40'
        )}
      >
        <LogOut size={18} aria-hidden="true" />
        Sign out
      </button>
    </div>
  )
}

// ─── Footer (theme switcher) ──────────────────────────────────────────────────

function SidebarFooter() {
  return (
    <div className="shrink-0 border-t border-border p-4">
      <div className="rounded-2xl bg-secondary p-4">
        <p className="text-sm font-medium">Customize Theme</p>
        <p className="mt-1 text-xs text-muted-foreground">Personalize your dashboard</p>
        <div className="mt-4">
          <ThemeSwitcher className="w-full" placement="top" />
        </div>
      </div>
    </div>
  )
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

interface SidebarProps {
  open: boolean
  onClose: () => void
}

export const Sidebar = memo(function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard'
    return pathname.startsWith(href)
  }

  return (
    <aside
      aria-hidden={!open}
      inert={!open || undefined}
      className={cn(
        // Base: fixed panel, full-height, slides in/out
        'fixed left-0 top-0 z-50 flex h-screen w-72 flex-col',
        'border-r border-border bg-card',
        'transition-transform duration-300 ease-in-out',
        open ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
      )}
    >
      <SidebarBrand onClose={onClose} />

      <nav aria-label="Main navigation" className="flex-1 overflow-y-auto px-4 py-6">
        <ul className="flex flex-col gap-1.5" role="list">
          {NAV_ITEMS.map((item) => (
            <li key={item.label}>
              <NavItem
                label={item.label}
                icon={item.icon}
                href={item.href}
                active={isActive(item.href)}
              />
            </li>
          ))}
        </ul>
      </nav>

      {/* Sign out lives above the theme footer */}
      <SidebarSignOut />
      <SidebarFooter />
    </aside>
  )
})
