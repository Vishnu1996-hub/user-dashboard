'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/useAuthStore'
import { authService, type LoginRequest } from '@/lib/services/authService'
import type { User } from '@/types'

export interface LoginResponse {
  success: boolean
  data: {
    user: User
    token: string
  }
}

export interface AuthError {
  message: string
}

export function useLogin() {
  const router = useRouter()
  const login = useAuthStore((s) => s.login)

  return useMutation({
    mutationFn: async (credentials: LoginRequest) => {
      return authService.login(credentials)
    },
    onSuccess: (data) => {
      login(data.data.user)
      router.push('/dashboard')
    },
    onError: (error: Error) => {
      console.error('Login failed:', error.message)
    },
  })
}

export function useLogout() {
  const router = useRouter()
  const logout = useAuthStore((s) => s.logout)

  return useMutation({
    mutationFn: async () => {
      await authService.logoutWithAPI()
    },
    onSuccess: () => {
      logout()
      router.push('/login')
    },
    onError: (error: Error) => {
      console.error('Logout failed:', error.message)
      // Still clear local state even on API error
      logout()
      router.push('/login')
    },
  })
}

export function useAuthUser() {
  return useAuthStore((s) => s.user)
}

export function useIsAuthenticated() {
  return useAuthStore((s) => s.isAuthenticated)
}
