import type { Metadata } from 'next'
import { AuthLayout } from '@/components/templates'
import { LoginForm } from '@/components/organisms/LoginForm'
import { createMetadata } from '@/lib/seo'

export const metadata: Metadata = createMetadata({
  title: 'Sign in',
  description: 'Sign in to your User Dashboard account.',
  path: '/login',
  noIndex: true,
})

export default function LoginPage() {
  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to your User Dashboard account"
    >
      <LoginForm />
    </AuthLayout>
  )
}
