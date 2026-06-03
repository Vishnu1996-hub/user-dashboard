'use client'

import apiClient from '@/lib/api/client'
import type { User } from '@/types'

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  success: boolean
  data: {
    user: User
    token: string
  }
}

export interface ApiError {
  error: string
}

export const authService = {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await apiClient.post<LoginResponse>('/api/auth/login', credentials)

      // Store token in both localStorage and cookie for persistence
      const token = response.data.data.token
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth-token', token)
        // Also set in cookie for SSR (done via middleware if needed)
        document.cookie = `auth-token=${token}; path=/; max-age=86400; SameSite=Lax`
      }

      return response.data
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || error.message || 'Login failed'
      throw new Error(errorMessage)
    }
  },

  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth-token')
      sessionStorage.removeItem('auth-token')
      document.cookie = 'auth-token=; path=/; max-age=0; SameSite=Lax'
    }
  },

  async logoutWithAPI(): Promise<void> {
    try {
      await apiClient.post('/api/auth/logout')
    } catch (error) {
      console.error('Logout API call failed:', error)
    } finally {
      // Always clear local storage even if API fails
      this.logout()
    }
  },

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth-token') || sessionStorage.getItem('auth-token')
    }
    return null
  },
}
