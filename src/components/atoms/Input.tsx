import { cn } from '@/lib/utils'
import { InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'h-9 w-full rounded border bg-white px-3 text-sm text-zinc-900 outline-none transition-colors',
            'placeholder:text-zinc-400',
            'border-zinc-300 hover:border-zinc-400',
            'focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20',
            'dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-100 dark:hover:border-zinc-600',
            'dark:focus:border-primary-500',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-danger-600 focus:border-danger-600 focus:ring-danger-600/20',
            className,
          )}
          {...props}
        />
        {error && <p className="text-xs text-danger-600">{error}</p>}
        {hint && !error && <p className="text-xs text-zinc-500">{hint}</p>}
      </div>
    )
  }
)
Input.displayName = 'Input'