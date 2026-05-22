'use client'
import { useTheme } from 'next-themes'
import { Sun, Moon, LayoutDashboard } from 'lucide-react'
import { Button } from '@/components/atoms'

interface AuthLayoutProps {
  title: string
  subtitle?: string
  children: React.ReactNode
}

export function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
  const { theme, setTheme } = useTheme()

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-zinc-50 px-4 dark:bg-zinc-950">

      {/* Theme toggle — top right */}
      <div className="absolute right-4 top-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </Button>
      </div>

      {/* Card */}
      <div className="w-full max-w-md rounded-xl border border-zinc-200 bg-white p-8 shadow-card dark:border-zinc-800 dark:bg-zinc-900">

        {/* Logo + heading */}
        <div className="mb-8 flex flex-col items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-500 text-white shadow">
            <LayoutDashboard size={24} />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
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