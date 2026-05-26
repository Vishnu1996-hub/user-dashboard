'use client'

import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

// ─── Size map ────────────────────────────────────────────────────────────────

const sizeClasses = {
  sm:  'max-w-sm',
  md:  'max-w-md',
  lg:  'max-w-lg',
  xl:  'max-w-xl',
  '2xl': 'max-w-2xl',
} as const

export type ModalSize = keyof typeof sizeClasses

// ─── Props ───────────────────────────────────────────────────────────────────

export interface ModalProps {
  /** Whether the modal is visible */
  open: boolean
  /** Called when the user dismisses the modal (backdrop click, Escape, ✕ button) */
  onClose: () => void
  /** Optional heading shown in the header strip */
  title?: string
  /** Optional sub-heading shown below the title */
  description?: string
  /** Controls the max-width of the panel. Defaults to `"md"` */
  size?: ModalSize
  /**
   * When true the default `px-6 py-5` body padding is removed so you can
   * lay out content edge-to-edge (e.g. full-bleed forms).
   */
  noPadding?: boolean
  children: React.ReactNode
}

// ─── Modal ───────────────────────────────────────────────────────────────────

/**
 * Reusable portal-based modal.
 *
 * Usage:
 * ```tsx
 * <Modal open={open} onClose={() => setOpen(false)} title="Add User" size="lg">
 *   <UserForm onSuccess={() => setOpen(false)} />
 * </Modal>
 * ```
 *
 * Behaviour:
 * - Renders into `document.body` via React portal (escapes any overflow/z-index parent)
 * - Closes on backdrop click, Escape key, or the ✕ button
 * - Locks body scroll while open
 * - Entrance animation via `animate-modal-overlay` / `animate-modal-panel` utilities
 */
export function Modal({
  open,
  onClose,
  title,
  description,
  size = 'md',
  noPadding = false,
  children,
}: ModalProps) {
  const backdropRef = useRef<HTMLDivElement>(null)

  // ── Close on Escape ────────────────────────────────────────────────────────
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, onClose])

  // ── Scroll lock ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  if (!open) return null

  return createPortal(
    // ── Overlay / backdrop ──────────────────────────────────────────────────
    <div
      ref={backdropRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
      className="animate-modal-overlay fixed inset-0 z-[200] flex items-center justify-center p-4"
      onClick={(e) => {
        // Close only when the click lands directly on the backdrop, not the panel
        if (e.target === backdropRef.current) onClose()
      }}
    >
      {/* Blurred dark backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* ── Panel ──────────────────────────────────────────────────────────── */}
      <div
        className={cn(
          'animate-modal-panel relative z-10 w-full rounded-3xl',
          'border border-border bg-card shadow-2xl',
          sizeClasses[size]
        )}
      >
        {/* ── Header ──────────────────────────────────────────────────────── */}
        {(title || description) && (
          <div className="flex items-start justify-between gap-4 border-b border-border px-6 py-5">
            <div>
              {title && (
                <h2
                  id="modal-title"
                  className="text-base font-semibold leading-tight"
                >
                  {title}
                </h2>
              )}
              {description && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {description}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className={cn(
                'shrink-0 rounded-lg p-1.5 text-muted-foreground',
                'transition-colors hover:bg-secondary hover:text-foreground',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40'
              )}
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* ── Body ─────────────────────────────────────────────────────────── */}
        <div className={noPadding ? '' : 'px-6 py-5'}>{children}</div>
      </div>
    </div>,
    document.body
  )
}
