import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { QueryProvider } from '@/components/providers/QueryProvider'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: { default: 'User Dashboard', template: '%s — User Dashboard' },
  description: 'Manage your team users efficiently with real-time search, filtering, and role-based access.',
  keywords: ['user management', 'dashboard', 'admin panel', 'team management'],
  openGraph: {
    type: 'website',
    title: 'User Dashboard',
    description: 'Manage your team users efficiently.',
    siteName: 'User Dashboard',
  },
  twitter: {
    card: 'summary',
    title: 'User Dashboard',
    description: 'Manage your team users efficiently.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans bg-background text-foreground`}>
        <ThemeProvider>
          <QueryProvider>{children}</QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
