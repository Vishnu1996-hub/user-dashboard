import { cn } from '@/lib/utils'
import Image from 'next/image'

const sizes = {
  sm: 'h-7 w-7 text-xs',
  md: 'h-9 w-9 text-sm',
  lg: 'h-12 w-12 text-base',
}

const imageSizes = {
  sm: '28px',
  md: '36px',
  lg: '48px',
}

interface AvatarProps {
  name: string
  src?: string
  size?: keyof typeof sizes
  className?: string
}

// Gets initials from "John Doe" → "JD"
function getInitials(name: string) {
  return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
}

// Deterministic color from name string
const colors = ['bg-indigo-500','bg-violet-500','bg-teal-500','bg-sky-500','bg-pink-500','bg-orange-500']
function getColor(name: string) {
  const idx = name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) % colors.length
  return colors[idx]
}

export function Avatar({ name, src, size = 'md', className }: AvatarProps) {
  return (
    <div className={cn('relative flex shrink-0 items-center justify-center rounded-full overflow-hidden', sizes[size], className)}>
      {src ? (
        <Image src={src} alt={name} fill sizes={imageSizes[size]} className="object-cover" priority />
      ) : (
        <span className={cn('flex h-full w-full items-center justify-center rounded-full font-medium text-white', getColor(name))}>
          {getInitials(name)}
        </span>
      )}
    </div>
  )
}
