import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PaginationProps {
  page: number
  pageSize: number
  total: number
  onPageChange: (page: number) => void
}

export function Pagination({ page, pageSize, total, onPageChange }: PaginationProps) {
  const totalPages = Math.ceil(total / pageSize)
  if (totalPages <= 1) return null

  const start = (page - 1) * pageSize + 1
  const end = Math.min(page * pageSize, total)

  const allPages = Array.from({ length: totalPages }, (_, i) => i + 1)
  let visible = allPages
  if (totalPages > 5) {
    const half = 2
    let l = Math.max(1, page - half)
    let r = Math.min(totalPages, page + half)
    if (r - l < 4) {
      if (l === 1) r = Math.min(5, totalPages)
      else l = Math.max(1, r - 4)
    }
    visible = allPages.slice(l - 1, r)
  }

  return (
    <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-muted-foreground">
        Showing {start}–{end} of {total} users
      </p>
      <div className="flex items-center gap-1">
        <PageBtn
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          aria-label="Previous page"
        >
          <ChevronLeft size={15} />
        </PageBtn>

        {visible[0] > 1 && (
          <>
            <PageBtn onClick={() => onPageChange(1)}>1</PageBtn>
            {visible[0] > 2 && <span className="px-1 text-muted-foreground">…</span>}
          </>
        )}

        {visible.map((p) => (
          <PageBtn key={p} onClick={() => onPageChange(p)} active={p === page}>
            {p}
          </PageBtn>
        ))}

        {visible[visible.length - 1] < totalPages && (
          <>
            {visible[visible.length - 1] < totalPages - 1 && (
              <span className="px-1 text-muted-foreground">…</span>
            )}
            <PageBtn onClick={() => onPageChange(totalPages)}>{totalPages}</PageBtn>
          </>
        )}

        <PageBtn
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          aria-label="Next page"
        >
          <ChevronRight size={15} />
        </PageBtn>
      </div>
    </div>
  )
}

function PageBtn({
  children,
  active,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean }) {
  return (
    <button
      className={cn(
        'flex h-8 min-w-8 items-center justify-center rounded-lg px-1 text-sm transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40',
        active
          ? 'bg-primary text-primary-foreground'
          : 'hover:bg-secondary disabled:pointer-events-none disabled:opacity-40'
      )}
      {...props}
    >
      {children}
    </button>
  )
}
