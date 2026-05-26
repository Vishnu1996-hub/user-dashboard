'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Header } from '@/components/organisms/Header'
import { Sidebar } from '@/components/organisms/Sidebar'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  // Default open so desktop users see the sidebar immediately
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── Mobile backdrop ── only visible on small screens when sidebar is open */}
      <div
        aria-hidden="true"
        onClick={() => setSidebarOpen(false)}
        className={cn(
          'fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden',
          sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      />

      {/* ── Sidebar ── always mounted so it can animate in/out */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* ── Main area ── shifts right on desktop when sidebar is open */}
      <div
        className={cn(
          'flex min-h-screen flex-col transition-[margin] duration-300 ease-in-out',
          sidebarOpen ? 'lg:ml-72' : 'lg:ml-0'
        )}
      >
        <Header
          onMenuClick={() => setSidebarOpen(true)}
          sidebarOpen={sidebarOpen}
        />

        <main className="flex-1 px-4 py-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  )
}
