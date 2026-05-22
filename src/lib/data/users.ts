import type { User } from '@/types'

export const MOCK_USERS: User[] = [
  { id: '1', name: 'Alice Johnson',  email: 'alice@example.com',  role: 'admin',  status: 'active',   avatarUrl: '', createdAt: '2024-01-10' },
  { id: '2', name: 'Bob Martinez',   email: 'bob@example.com',    role: 'editor', status: 'active',   avatarUrl: '', createdAt: '2024-02-14' },
  { id: '3', name: 'Carol White',    email: 'carol@example.com',  role: 'viewer', status: 'inactive', avatarUrl: '', createdAt: '2024-03-05' },
  { id: '4', name: 'David Lee',      email: 'david@example.com',  role: 'editor', status: 'pending',  avatarUrl: '', createdAt: '2024-04-20' },
  { id: '5', name: 'Eva Singh',      email: 'eva@example.com',    role: 'admin',  status: 'active',   avatarUrl: '', createdAt: '2024-05-01' },
  { id: '6', name: 'Frank Zhang',    email: 'frank@example.com',  role: 'viewer', status: 'active',   avatarUrl: '', createdAt: '2024-06-18' },
  { id: '7', name: 'Grace Kim',      email: 'grace@example.com',  role: 'editor', status: 'inactive', avatarUrl: '', createdAt: '2024-07-22' },
  { id: '8', name: 'Henry Patel',    email: 'henry@example.com',  role: 'viewer', status: 'pending',  avatarUrl: '', createdAt: '2024-08-30' },
]

// Fake credentials — admin can log in
export const MOCK_CREDENTIALS = [
  { email: 'alice@example.com', password: 'password123', userId: '1' },
  { email: 'eva@example.com',   password: 'password123', userId: '5' },
]