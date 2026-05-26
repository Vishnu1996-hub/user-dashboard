'use client'

import { AlertTriangle, HelpCircle, Info } from 'lucide-react'
import { Modal } from './Modal'
import { Button } from '@/components/atoms/Button'
import { cn } from '@/lib/utils'

// ─── Variant config ───────────────────────────────────────────────────────────

export type ConfirmVariant = 'danger' | 'warning' | 'info'

const variantConfig = {
  danger: {
    Icon:          AlertTriangle,
    iconColor:     'text-danger',
    iconBg:        'bg-danger/10',
    confirmVariant: 'danger',
  },
  warning: {
    Icon:          AlertTriangle,
    iconColor:     'text-warning',
    iconBg:        'bg-warning/10',
    confirmVariant: 'primary',
  },
  info: {
    Icon:          Info,
    iconColor:     'text-primary',
    iconBg:        'bg-primary/10',
    confirmVariant: 'primary',
  },
} as const satisfies Record<
  ConfirmVariant,
  {
    Icon:           React.ElementType
    iconColor:      string
    iconBg:         string
    confirmVariant: 'danger' | 'primary'
  }
>

// ─── Props ────────────────────────────────────────────────────────────────────

export interface ConfirmDialogProps {
  open: boolean
  onClose: () => void
  /** Called when the user presses the confirm button */
  onConfirm: () => void | Promise<void>
  title: string
  message: string
  /** Label for the confirm action button. Defaults to `"Confirm"` */
  confirmLabel?: string
  /** Label for the cancel button. Defaults to `"Cancel"` */
  cancelLabel?: string
  /** Visual style of the dialog. Defaults to `"danger"` */
  variant?: ConfirmVariant
  /** Shows a spinner on the confirm button and disables both buttons */
  loading?: boolean
}

// ─── ConfirmDialog ────────────────────────────────────────────────────────────

/**
 * Accessible confirm / alert dialog built on top of `<Modal>`.
 *
 * Drop-in replacement for `window.confirm()` that stays on-brand.
 *
 * Usage:
 * ```tsx
 * <ConfirmDialog
 *   open={open}
 *   onClose={() => setOpen(false)}
 *   onConfirm={handleDelete}
 *   title="Delete user?"
 *   message="This action cannot be undone."
 *   confirmLabel="Yes, delete"
 *   variant="danger"
 *   loading={isPending}
 * />
 * ```
 */
export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel  = 'Cancel',
  variant      = 'danger',
  loading      = false,
}: ConfirmDialogProps) {
  const { Icon, iconColor, iconBg, confirmVariant } = variantConfig[variant]

  return (
    <Modal open={open} onClose={onClose} size="sm">
      <div className="flex flex-col items-center gap-5 py-2 text-center">

        {/* Icon badge */}
        <div
          className={cn(
            'flex h-14 w-14 items-center justify-center rounded-2xl',
            iconBg
          )}
        >
          <Icon size={26} className={iconColor} />
        </div>

        {/* Copy */}
        <div className="space-y-1.5">
          <h3 className="text-base font-semibold leading-tight">{title}</h3>
          <p className="text-sm text-muted-foreground">{message}</p>
        </div>

        {/* Actions */}
        <div className="flex w-full gap-3">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={onClose}
            disabled={loading}
          >
            {cancelLabel}
          </Button>

          <Button
            type="button"
            variant={confirmVariant}
            className="flex-1"
            onClick={onConfirm}
            loading={loading}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
