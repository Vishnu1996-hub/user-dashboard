'use client'
import { useState } from 'react'
import { useTheme } from 'next-themes'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, LogIn, Copy, Check } from 'lucide-react'

import { Button } from '@/components/atoms/Button'
import { FormField } from '@/components/molecules'
import { loginSchema, type LoginFormData } from '@/lib/schemas/auth.schema'
import { useLogin } from '@/hooks/useAuth'
import { cn } from '@/lib/utils'

const DEMO_CREDENTIALS = {
  email: 'alice@example.com',
  password: 'password123',
}

export function LoginForm() {
  const { theme } = useTheme()
  const { mutate: login, isPending, error } = useLogin()

  const [showPassword, setShowPassword] = useState(false)
  const [copied, setCopied] = useState<'email' | 'password' | null>(null)

  const isDark = theme === 'dark'

  const cardStyles = {
    container: cn(
      'mt-4 rounded-lg border p-4',
      isDark
        ? 'border-zinc-700 bg-zinc-900/50'
        : 'border-primary-200/50 bg-primary-50/50'
    ),
    title: cn(
      'text-sm font-semibold mb-3',
      isDark ? 'text-zinc-100' : 'text-primary-900'
    ),
    credRow: cn(
      'flex items-center justify-between cursor-pointer rounded px-3 py-2 hover:transition-colors',
      isDark
        ? 'bg-zinc-800/40 hover:bg-zinc-800'
        : 'bg-primary-100/40 hover:bg-primary-100/60'
    ),
    label: cn(
      'text-xs',
      isDark ? 'text-zinc-400' : 'text-primary-700'
    ),
    code: cn(
      'text-xs font-mono',
      isDark ? 'text-zinc-200' : 'text-primary-900'
    ),
    autofillBtn: cn(
      'mt-3 w-full rounded px-3 py-2 text-xs font-medium hover:transition-colors',
      isDark
        ? 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700'
        : 'bg-primary-100 text-primary-700 hover:bg-primary-200'
    ),
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const copyToClipboard = (text: string, field: 'email' | 'password') => {
    navigator.clipboard.writeText(text)
    setCopied(field)
    setTimeout(() => setCopied(null), 2000)
  }

  const onSubmit = async (data: LoginFormData) => {
    login(data)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-5"
    >
      {/* Auth-level error banner */}
      {error && (
        <div className="rounded border border-danger-600/30 bg-danger-100 px-4 py-3 text-sm text-danger-800 dark:bg-danger-800/20 dark:text-danger-100">
          {error.message}
        </div>
      )}

      <FormField
        label="Email address"
        type="email"
        placeholder="you@example.com"
        required
        error={errors.email?.message}
        {...register('email')}
      />

      {/* Password field with show/hide toggle */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Password <span className="text-danger-600">*</span>
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            className={cn(
              'h-9 w-full rounded border bg-white px-3 pr-10 text-sm outline-none transition-colors',
              'placeholder:text-zinc-400',
              'border-zinc-300 hover:border-zinc-400',
              'focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20',
              'dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-100',
              errors.password && 'border-danger-600 focus:border-danger-600'
            )}
            {...register('password')}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {errors.password && (
          <p className="text-xs text-danger-600">{errors.password.message}</p>
        )}
      </div>

      {/* Forgot password link */}
      {/* <div className="flex justify-end">
        <button
          type="button"
          className="text-xs text-primary-500 hover:underline"
        >
          Forgot your password?
        </button>
      </div> */}

      <Button
        type="submit"
        loading={isPending}
        className="w-full gap-2"
        size="lg"
      >
        <LogIn size={16} />
        {isPending ? 'Signing in…' : 'Sign in'}
      </Button>

      {/* Demo Credentials Card */}
      <div
        className={cardStyles.container}
        suppressHydrationWarning
      >
        <h3 className={cardStyles.title}>Demo Credentials</h3>
        <div className="space-y-2.5">
          <div
            onClick={() => copyToClipboard(DEMO_CREDENTIALS.email, 'email')}
            className={cardStyles.credRow}
          >
            <span className={cardStyles.label}>Email:</span>
            <div className="flex items-center gap-2">
              <code className={cardStyles.code}>
                {DEMO_CREDENTIALS.email}
              </code>
              {copied === 'email' ? (
                <Check size={14} className="text-green-600 dark:text-green-400" />
              ) : (
                <Copy size={14} className={cn('text-zinc-400', isDark ? 'dark:text-zinc-500' : 'text-primary-400')} />
              )}
            </div>
          </div>
          <div
            onClick={() => copyToClipboard(DEMO_CREDENTIALS.password, 'password')}
            className={cardStyles.credRow}
          >
            <span className={cardStyles.label}>Password:</span>
            <div className="flex items-center gap-2">
              <code className={cardStyles.code}>
                {DEMO_CREDENTIALS.password}
              </code>
              {copied === 'password' ? (
                <Check size={14} className="text-green-600 dark:text-green-400" />
              ) : (
                <Copy size={14} className={cn('text-zinc-400', isDark ? 'dark:text-zinc-500' : 'text-primary-400')} />
              )}
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}