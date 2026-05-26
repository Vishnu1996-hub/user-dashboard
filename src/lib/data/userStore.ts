import type { User } from '@/types'
import { createFileStore } from './store'
import { MOCK_USERS } from './users'

// Single .data/users.json  — nextId + items in one atomic write.
export const userStore = createFileStore<User>('users.json', MOCK_USERS)
