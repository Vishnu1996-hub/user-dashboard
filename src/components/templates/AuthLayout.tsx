'use client'
import { LayoutDashboard, } from 'lucide-react'
import { ThemeSwitcher } from '@/components/molecules/ThemeSwitcher'

interface AuthLayoutProps {
  title: string
  subtitle?: string
  children: React.ReactNode
}

export function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background px-4">

  <div className="absolute right-4 top-4">
    <ThemeSwitcher showLabel={true} />
  </div>

  <div className="w-full max-w-md rounded-xl border border-border bg-card p-8 shadow-card">

    <div className="mb-8 flex flex-col items-center gap-3">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow">
        <LayoutDashboard size={24} />
      </div>

      <div className="text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-1 text-sm text-secondary-foreground">
            {subtitle}
          </p>
        )}
      </div>
    </div>

    {children}
  </div>
</div>
  )
}