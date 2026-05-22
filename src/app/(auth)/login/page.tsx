import type { Metadata } from 'next'
import { AuthLayout } from '@/components/templates'
import { LoginForm } from '@/components/organisms/LoginForm'

export const metadata: Metadata = {
  title: 'Sign in',
  description: 'Sign in to your User Dashboard account',
}

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