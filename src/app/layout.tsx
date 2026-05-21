import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from '@/components/Providers'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: { default: 'UserDash', template: '%s — UserDash' },
  description: 'Manage your team users efficiently.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}