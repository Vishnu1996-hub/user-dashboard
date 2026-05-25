import {
  Moon,
  Sun,
  Trees,
  Waves,
} from 'lucide-react'

export type ThemeOption = {
  label: string
  value: string
  icon: React.ElementType
  preview: string
}

export const themes: ThemeOption[] = [
  {
    label: 'Light',
    value: 'light',
    icon: Sun,
    preview: 'bg-[#6366f1]',
  },
  {
    label: 'Dark',
    value: 'dark',
    icon: Moon,
    preview: 'bg-[#18181b]',
  },
  {
    label: 'Ocean',
    value: 'ocean',
    icon: Waves,
    preview: 'bg-[#0ea5e9]',
  },
  {
    label: 'Forest',
    value: 'forest',
    icon: Trees,
    preview: 'bg-[#16a34a]',
  },
]