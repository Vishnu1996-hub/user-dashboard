'use client'

import { memo, useMemo } from 'react'
import { Bell, Menu, Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ThemeSwitcher } from '../molecules/ThemeSwitcher'

const USER = {
  initials: 'VK',
  name: 'Vishnu Kumar',
  role: 'Frontend Developer',
} as const

function BrandBlock({ date }: { date: string }) {
  return (
    <div>
      <h1 className="text-lg font-semibold leading-tight">Dashboard Overview</h1>
      <p className="text-sm text-muted-foreground leading-tight" aria-live="polite">
        {date}
      </p>
    </div>
  )
}

function SearchBar() {
  return (
    <form
      role="search"
      onSubmit={(e) => e.preventDefault()}
      className="hidden items-center gap-2 rounded-2xl border border-border bg-card px-3 py-2 transition-shadow focus-within:ring-2 focus-within:ring-primary/40 md:flex"
    >
      <Search size={16} className="shrink-0 text-muted-foreground" aria-hidden="true" />
      <input
        type="search"
        placeholder="Search…"
        aria-label="Search dashboard"
        className="w-44 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
      />
    </form>
  )
}

function NotificationButton() {
  return (
    <button
      aria-label="Notifications — 1 unread"
      className="relative rounded-2xl border border-border bg-card p-2.5 transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
    >
      <Bell size={18} aria-hidden="true" />
      <span
        className="absolute right-2 top-2 h-2 w-2 rounded-full bg-danger"
        aria-hidden="true"
      />
    </button>
  )
}

function UserButton() {
  return (
    <button
      aria-label={`User menu — ${USER.name}`}
      className="flex items-center gap-3 rounded-2xl border border-border bg-card px-3 py-2 transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
    >
      <div
        aria-hidden="true"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-sm font-semibold text-primary-foreground"
      >
        {USER.initials}
      </div>
      <div className="hidden text-left md:block">
        <p className="text-sm font-medium leading-tight">{USER.name}</p>
        <p className="text-xs text-muted-foreground leading-tight">{USER.role}</p>
      </div>
    </button>
  )
}

interface HeaderProps {
  onMenuClick: () => void
  sidebarOpen: boolean
}

export const Header = memo(function Header({ onMenuClick, sidebarOpen }: HeaderProps) {
  const currentDate = useMemo(
    () =>
      new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      }).format(new Date()),
    []
  )

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-4 lg:px-8">

        <div className="flex items-center gap-4">
          {/* Hamburger:
              – always visible on mobile (sidebar is an overlay there)
              – on desktop: visible only when sidebar is CLOSED, so user can re-open it */}
          <button
            onClick={onMenuClick}
            aria-label="Open navigation menu"
            className={cn(
              'rounded-xl p-2 transition-colors hover:bg-secondary',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40',
              // Mobile: always show | Desktop: show only when sidebar is closed
              sidebarOpen ? 'lg:hidden' : 'block'
            )}
          >
            <Menu size={20} aria-hidden="true" />
          </button>

          <BrandBlock date={currentDate} />
        </div>

        <div className="flex items-center gap-3">
          {/* <SearchBar /> */}
          {/* <NotificationButton /> */}
          <ThemeSwitcher />
          <UserButton />
        </div>
      </div>
    </header>
  )
})
