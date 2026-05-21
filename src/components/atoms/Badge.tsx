import { cn } from '@/lib/utils'
import type { UserStatus } from '@/types'

const statusStyles: Record<UserStatus, string> = {
  active:   'bg-success-100 text-success-800 dark:bg-success-800/20 dark:text-success-100',
  inactive: 'bg-zinc-100   text-zinc-600   dark:bg-zinc-800        dark:text-zinc-400',
  pending:  'bg-pending-100 text-pending-800 dark:bg-pending-800/20 dark:text-pending-100',
}

interface BadgeProps {
  status: UserStatus
  className?: string
}

export function Badge({ status, className }: BadgeProps) {
  return (
    <span className={cn('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize', statusStyles[status], className)}>
      <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  )
}