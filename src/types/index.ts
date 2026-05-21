export type UserStatus = 'active' | 'inactive' | 'pending'
export type UserRole   = 'admin' | 'editor' | 'viewer'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  status: UserStatus
  avatarUrl?: string
  createdAt: string
}