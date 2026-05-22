import { Input } from '@/components/atoms'
import { cn } from '@/lib/utils'
import { forwardRef, InputHTMLAttributes } from 'react'

// Wraps the Input atom + connects it cleanly to react-hook-form
interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  hint?: string
  required?: boolean
  className?: string
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, error, hint, required, className, ...props }, ref) => (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
        {label}
        {required && <span className="ml-1 text-danger-600">*</span>}
      </label>
      <Input ref={ref} error={error} {...props} />
      {hint && !error && (
        <p className="text-xs text-zinc-500 dark:text-zinc-400">{hint}</p>
      )}
    </div>
  )
)
FormField.displayName = 'FormField'