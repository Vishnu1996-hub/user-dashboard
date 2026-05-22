'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, LogIn } from 'lucide-react'

import { Button } from '@/components/atoms/Button'
import { FormField } from '@/components/molecules'
import { loginSchema, type LoginFormData } from '@/lib/schemas/auth.schema'
import { useAuthStore } from '@/store/useAuthStore'
import { MOCK_CREDENTIALS, MOCK_USERS } from '@/lib/data/users'
import { cn } from '@/lib/utils'

export function LoginForm() {
  const router = useRouter()
  const login  = useAuthStore((s) => s.login)

  const [showPassword, setShowPassword] = useState(false)
  const [authError, setAuthError]       = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    setAuthError('')

    // Simulate network delay
    await new Promise((r) => setTimeout(r, 800))

    // Check against mock credentials
    const match = MOCK_CREDENTIALS.find(
      (c) => c.email === data.email && c.password === data.password
    )

    if (!match) {
      setAuthError('Invalid email or password. Try alice@example.com / password123')
      return
    }

    const user = MOCK_USERS.find((u) => u.id === match.userId)!
    login(user)
    router.push('/dashboard')
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-5"
    >
      {/* Auth-level error banner */}
      {authError && (
        <div className="rounded border border-danger-600/30 bg-danger-100 px-4 py-3 text-sm text-danger-800 dark:bg-danger-800/20 dark:text-danger-100">
          {authError}
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
      <div className="flex justify-end">
        <button
          type="button"
          className="text-xs text-primary-500 hover:underline"
        >
          Forgot your password?
        </button>
      </div>

      <Button
        type="submit"
        loading={isSubmitting}
        className="w-full gap-2"
        size="lg"
      >
        <LogIn size={16} />
        {isSubmitting ? 'Signing in…' : 'Sign in'}
      </Button>
    </form>
  )
}