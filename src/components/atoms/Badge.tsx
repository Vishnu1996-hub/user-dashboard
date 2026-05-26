import { cn } from '@/lib/utils'

// All status values across the app
export type BadgeStatus =
  | 'active' | 'inactive' | 'pending'          // users
  | 'draft'  | 'archived'                       // products
  | 'processing' | 'shipped' | 'delivered' | 'cancelled'  // orders

const statusStyles: Record<BadgeStatus, string> = {
  // Users
  active:     'bg-success/10 text-success',
  inactive:   'bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400',
  pending:    'bg-warning/10 text-warning',
  // Products
  draft:      'bg-primary/10 text-primary',
  archived:   'bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400',
  // Orders
  processing: 'bg-primary/10 text-primary',
  shipped:    'bg-blue-500/10 text-blue-500',
  delivered:  'bg-success/10 text-success',
  cancelled:  'bg-danger/10 text-danger',
}

interface BadgeProps {
  status: BadgeStatus
  className?: string
}

export function Badge({ status, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize',
        statusStyles[status] ?? 'bg-zinc-100 text-zinc-500',
        className
      )}
    >
      <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  )
}
