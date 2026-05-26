import type { User } from '@/types'

export const MOCK_USERS: User[] = [
  { id: '1',  name: 'Alice Johnson',  email: 'alice@example.com',   role: 'admin',  status: 'active',   avatarUrl: '', createdAt: '2024-01-10' },
  { id: '2',  name: 'Bob Martinez',   email: 'bob@example.com',     role: 'editor', status: 'active',   avatarUrl: '', createdAt: '2024-02-14' },
  { id: '3',  name: 'Carol White',    email: 'carol@example.com',   role: 'viewer', status: 'inactive', avatarUrl: '', createdAt: '2024-03-05' },
  { id: '4',  name: 'David Lee',      email: 'david@example.com',   role: 'editor', status: 'pending',  avatarUrl: '', createdAt: '2024-04-20' },
  { id: '5',  name: 'Eva Singh',      email: 'eva@example.com',     role: 'admin',  status: 'active',   avatarUrl: '', createdAt: '2024-05-01' },
  { id: '6',  name: 'Frank Zhang',    email: 'frank@example.com',   role: 'viewer', status: 'active',   avatarUrl: '', createdAt: '2024-06-18' },
  { id: '7',  name: 'Grace Kim',      email: 'grace@example.com',   role: 'editor', status: 'inactive', avatarUrl: '', createdAt: '2024-07-22' },
  { id: '8',  name: 'Henry Patel',    email: 'henry@example.com',   role: 'viewer', status: 'pending',  avatarUrl: '', createdAt: '2024-08-30' },
  { id: '9',  name: 'Isla Robinson',  email: 'isla@example.com',    role: 'editor', status: 'active',   avatarUrl: '', createdAt: '2024-09-12' },
  { id: '10', name: 'James Turner',   email: 'james@example.com',   role: 'viewer', status: 'active',   avatarUrl: '', createdAt: '2024-09-25' },
  { id: '11', name: 'Karen Hughes',   email: 'karen@example.com',   role: 'admin',  status: 'active',   avatarUrl: '', createdAt: '2024-10-08' },
  { id: '12', name: 'Liam Chen',      email: 'liam@example.com',    role: 'editor', status: 'inactive', avatarUrl: '', createdAt: '2024-10-14' },
  { id: '13', name: 'Mia Nguyen',     email: 'mia@example.com',     role: 'viewer', status: 'active',   avatarUrl: '', createdAt: '2024-11-03' },
  { id: '14', name: 'Noah Williams',  email: 'noah@example.com',    role: 'editor', status: 'pending',  avatarUrl: '', createdAt: '2024-11-17' },
  { id: '15', name: 'Olivia Brown',   email: 'olivia@example.com',  role: 'viewer', status: 'active',   avatarUrl: '', createdAt: '2024-12-01' },
  { id: '16', name: 'Peter Garcia',   email: 'peter@example.com',   role: 'editor', status: 'active',   avatarUrl: '', createdAt: '2024-12-09' },
  { id: '17', name: 'Quinn Davis',    email: 'quinn@example.com',   role: 'viewer', status: 'inactive', avatarUrl: '', createdAt: '2025-01-05' },
  { id: '18', name: 'Rachel Wilson',  email: 'rachel@example.com',  role: 'admin',  status: 'active',   avatarUrl: '', createdAt: '2025-01-22' },
  { id: '19', name: 'Samuel Moore',   email: 'samuel@example.com',  role: 'editor', status: 'pending',  avatarUrl: '', createdAt: '2025-02-14' },
  { id: '20', name: 'Tina Jackson',   email: 'tina@example.com',    role: 'viewer', status: 'active',   avatarUrl: '', createdAt: '2025-03-01' },
]

export const MOCK_CREDENTIALS = [
  { email: 'alice@example.com', password: 'password123', userId: '1' },
  { email: 'eva@example.com',   password: 'password123', userId: '5' },
]
