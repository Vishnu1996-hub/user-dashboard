import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, error, className, children, ...props },
  ref
) {
  const id = label ? `select-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium">
          {label}
          {props.required && <span className="ml-1 text-danger">*</span>}
        </label>
      )}
      <select
        ref={ref}
        id={id}
        className={cn(
          'h-9 rounded-xl border border-border bg-card px-3 text-sm',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40',
          error && 'border-danger',
          className
        )}
        {...props}
      >
        {children}
      </select>
      {error && <p className="text-xs text-danger">{error}</p>}
    </div>
  )
})

Select.displayName = 'Select'
