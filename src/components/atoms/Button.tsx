import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { ButtonHTMLAttributes, forwardRef } from 'react'

const variants = {
  primary:
    'bg-primary text-primary-foreground hover:bg-primary-hover',

  secondary:
    'bg-secondary text-secondary-foreground hover:opacity-90',

  ghost:
    'bg-transparent text-foreground hover:bg-secondary',

  danger:
    'bg-danger text-white hover:opacity-90',

  outline:
    'border border-border bg-transparent text-foreground hover:bg-secondary',
}

const sizes = {
  sm: 'h-8 px-3 text-xs gap-1.5',
  md: 'h-9 px-4 text-sm gap-2',
  lg: 'h-11 px-6 text-base gap-2',
}

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
  loading?: boolean
}

export const Button = forwardRef<
  HTMLButtonElement,
  ButtonProps
>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading,
      disabled,
      className,
      children,
      ...props
    },
    ref
  ) => (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center justify-center rounded-lg font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        'disabled:pointer-events-none disabled:opacity-50',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {loading && (
        <Loader2 className="animate-spin" size={14} />
      )}
      {children}
    </button>
  )
)

Button.displayName = 'Button'