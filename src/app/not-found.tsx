import type { Metadata } from 'next'
import Link from 'next/link'
import { createMetadata } from '@/lib/seo'

export const metadata: Metadata = createMetadata({
  title: '404 - Page Not Found',
  description: 'The requested dashboard page could not be found.',
  noIndex: true,
})

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <section aria-labelledby="not-found-title" className="text-center">
        <p className="text-8xl font-bold text-primary" aria-hidden="true">
          404
        </p>
        <h1 id="not-found-title" className="mt-4 text-2xl font-semibold">
          Page not found
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/dashboard"
          className="mt-6 inline-flex items-center rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
        >
          Go to Dashboard
        </Link>
      </section>
    </main>
  )
}
