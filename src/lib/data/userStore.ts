import fs from 'fs'
import path from 'path'
import type { User, UserRole, UserStatus } from '@/types'
import { MOCK_USERS } from './users'

const DATA_DIR = path.join(process.cwd(), '.data')
const STORE_FILE = path.join(DATA_DIR, 'users.json')
const ID_FILE = path.join(DATA_DIR, 'nextId.txt')

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true })
}

function readStore(): User[] {
  ensureDir()
  try {
    if (!fs.existsSync(STORE_FILE)) {
      fs.writeFileSync(STORE_FILE, JSON.stringify(MOCK_USERS, null, 2))
      return [...MOCK_USERS]
    }
    return JSON.parse(fs.readFileSync(STORE_FILE, 'utf-8')) as User[]
  } catch {
    return [...MOCK_USERS]
  }
}

function writeStore(data: User[]): void {
  ensureDir()
  fs.writeFileSync(STORE_FILE, JSON.stringify(data, null, 2))
}

function readNextId(): number {
  ensureDir()
  try {
    if (!fs.existsSync(ID_FILE)) {
      const id = MOCK_USERS.length + 1
      fs.writeFileSync(ID_FILE, String(id))
      return id
    }
    return parseInt(fs.readFileSync(ID_FILE, 'utf-8'), 10)
  } catch {
    return MOCK_USERS.length + 1
  }
}

function writeNextId(id: number): void {
  ensureDir()
  fs.writeFileSync(ID_FILE, String(id))
}

export const userStore = {
  getAll(): User[] {
    return readStore()
  },

  getById(id: string): User | null {
    return readStore().find((u) => u.id === id) ?? null
  },

  create(data: { name: string; email: string; role: UserRole; status: UserStatus }): User {
    const store = readStore()
    const nextId = readNextId()
    const user: User = {
      ...data,
      id: String(nextId),
      avatarUrl: '',
      createdAt: new Date().toISOString().split('T')[0],
    }
    store.push(user)
    writeStore(store)
    writeNextId(nextId + 1)
    return user
  },

  update(id: string, data: Partial<Omit<User, 'id' | 'createdAt'>>): User | null {
    const store = readStore()
    const idx = store.findIndex((u) => u.id === id)
    if (idx === -1) return null
    store[idx] = { ...store[idx], ...data }
    writeStore(store)
    return store[idx]
  },

  delete(id: string): boolean {
    const store = readStore()
    const idx = store.findIndex((u) => u.id === id)
    if (idx === -1) return false
    store.splice(idx, 1)
    writeStore(store)
    return true
  },
}
