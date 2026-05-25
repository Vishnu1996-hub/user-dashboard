'use client'

import { useEffect, useMemo, useState } from 'react'
import { useTheme } from 'next-themes'
import {
  Check,
  ChevronDown,
} from 'lucide-react'

import { cn } from '@/lib/utils'
import { themes } from '@/lib/themes'

interface ThemeSwitcherProps {
  className?: string
  showLabel?: boolean
}

export function ThemeSwitcher({
  className,
  showLabel = true,
}: ThemeSwitcherProps) {
  const { theme, setTheme } = useTheme()

  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const timer = window.requestAnimationFrame(() => {
      setMounted(true)
    })

    return () => window.cancelAnimationFrame(timer)
  }, [])

  const activeTheme = useMemo(
    () =>
      themes.find((item) => item.value === theme) ||
      themes[0],
    [theme]
  )

  // Prevent hydration mismatch
  if (!mounted) return null

  const ActiveIcon = activeTheme.icon

  return (
    <div className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          'flex items-center gap-2 rounded-xl border border-border',
          'bg-card px-3 py-2 text-sm text-foreground shadow-sm',
          'transition-colors hover:bg-secondary',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary'
        )}
      >
        {showLabel && (
          <>
            <div className="flex items-center gap-2">
              <ActiveIcon size={15} />

              <span className="font-medium">
                {activeTheme.label}
              </span>
            </div>

            <ChevronDown
              size={16}
              className={cn(
                'transition-transform duration-200',
                open && 'rotate-180'
              )}
            />
          </>
        )}
      </button>

      {open && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />

          <div
            className={cn(
              'absolute right-0 top-full z-50 mt-1.5 w-56 rounded-2xl',
              'border border-border bg-card p-1.5 shadow-xl'
            )}
          >
            <div className="flex flex-col gap-1">
              {themes.map((item) => {
                const isActive = item.value === theme
                const Icon = item.icon

                return (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => {
                      setTheme(item.value)
                      setOpen(false)
                    }}
                    className={cn(
                      'flex items-center justify-between rounded-xl px-3 py-2.5',
                      'transition-colors',
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground hover:bg-secondary'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          'flex h-8 w-8 items-center justify-center rounded-lg text-black',
                          item.preview
                        )}
                      >
                        <Icon size={16} />
                      </div>

                      <span className="text-sm font-medium">
                        {item.label}
                      </span>
                    </div>

                    {isActive && <Check size={16} />}
                  </button>
                )
              })}
            </div>
          </div>
        </>
      )}
    </div>
  )
}