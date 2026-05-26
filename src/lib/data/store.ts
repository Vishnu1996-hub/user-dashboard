/**
 * store.ts — Centralised file-backed store with ACID-like guarantees.
 *
 * Atomicity  : writes go to a <file>.tmp then fs.renameSync overwrites the
 *              real file in a single OS call (NTFS rename is atomic).
 * Consistency: the generic type parameter T ensures shape is preserved; seed
 *              data is used on first run or after corruption.
 * Isolation  : all reads/writes are synchronous within the same Node process,
 *              so there is no interleaving. A module-level cache serves as an
 *              in-memory read layer that is invalidated on every write.
 * Durability : fs.writeFileSync (synchronous) ensures the OS has accepted the
 *              bytes before the call returns; renameSync makes that permanent.
 *
 * Each entity (users, products, orders) gets a single JSON file whose schema
 * is `{ nextId: number, items: T[] }`, which collapses the previous two-file
 * design (data file + counter file) into one atomic write.
 */

import fs   from 'fs'
import path from 'path'

// ─── Internal types ───────────────────────────────────────────────────────────

interface StoreFile<T> {
  nextId: number   // monotonically increasing; embedded for atomic create
  items:  T[]
}

// ─── Module-level read cache ──────────────────────────────────────────────────
// Keyed by absolute file path. Cleared on every write so stale reads are
// impossible within the same process lifetime.

const _cache = new Map<string, StoreFile<unknown>>()

// ─── Helpers ──────────────────────────────────────────────────────────────────

const DATA_DIR = path.join(process.cwd(), '.data')

function ensureDir(): void {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true })
}

/**
 * Atomic write: write content to <filePath>.tmp, then rename over the real
 * file. On NTFS/ext4 this is a single inode-pointer swap — either the old or
 * the new content is visible, never a partial write.
 */
function atomicWrite(filePath: string, content: string): void {
  const tmp = filePath + '.tmp'
  fs.writeFileSync(tmp, content, 'utf-8')
  // renameSync on Windows will overwrite the destination if it exists
  try {
    fs.renameSync(tmp, filePath)
  } catch {
    // Fallback: direct write (e.g., cross-device rename fails)
    fs.writeFileSync(filePath, content, 'utf-8')
    try { fs.unlinkSync(tmp) } catch { /* ignore */ }
  }
}

function readFile<T>(filePath: string, seed: StoreFile<T>): StoreFile<T> {
  ensureDir()

  // Return from cache if present (invalidated on every write)
  if (_cache.has(filePath)) {
    return _cache.get(filePath) as StoreFile<T>
  }

  try {
    if (!fs.existsSync(filePath)) {
      // First run — persist the seed so every process sees the same state
      atomicWrite(filePath, JSON.stringify(seed, null, 2))
      _cache.set(filePath, seed as StoreFile<unknown>)
      return seed
    }
    const parsed = JSON.parse(fs.readFileSync(filePath, 'utf-8')) as StoreFile<T>
    _cache.set(filePath, parsed as StoreFile<unknown>)
    return parsed
  } catch {
    // Corrupted file — fall back to seed and overwrite
    atomicWrite(filePath, JSON.stringify(seed, null, 2))
    _cache.set(filePath, seed as StoreFile<unknown>)
    return seed
  }
}

function writeFile<T>(filePath: string, data: StoreFile<T>): void {
  ensureDir()
  atomicWrite(filePath, JSON.stringify(data, null, 2))
  // Immediately update the cache so subsequent reads in this request are
  // consistent with the write that just happened.
  _cache.set(filePath, data as StoreFile<unknown>)
}

// ─── Public factory ───────────────────────────────────────────────────────────

export interface FileStore<T extends { id: string }> {
  /** Return all items. */
  getAll(): T[]
  /** Return one item by id, or null. */
  getById(id: string): T | null
  /**
   * Create a new item. The store assigns `id` automatically from its
   * internal counter; `createdAt` should be supplied by the caller.
   */
  create(data: Omit<T, 'id'>): T
  /** Merge `data` into the item with `id`. Returns the updated item or null. */
  update(id: string, data: Partial<Omit<T, 'id'>>): T | null
  /** Remove item by id. Returns true if found and deleted. */
  delete(id: string): boolean
}

/**
 * createFileStore — returns a FileStore<T> backed by `.data/<fileName>`.
 *
 * @param fileName  Filename inside `.data/`, e.g. `"users.json"`
 * @param seed      Initial items written on first run
 */
export function createFileStore<T extends { id: string }>(
  fileName: string,
  seed: T[],
): FileStore<T> {
  const filePath = path.join(DATA_DIR, fileName)

  const seedFile: StoreFile<T> = {
    nextId: seed.length + 1,
    items:  seed,
  }

  const read  = (): StoreFile<T>                => readFile<T>(filePath, seedFile)
  const write = (s: StoreFile<T>): void         => writeFile<T>(filePath, s)

  return {
    getAll(): T[] {
      return read().items
    },

    getById(id: string): T | null {
      return read().items.find((item) => item.id === id) ?? null
    },

    create(data: Omit<T, 'id'>): T {
      const store = read()
      const item  = { ...data, id: String(store.nextId) } as T
      write({ nextId: store.nextId + 1, items: [...store.items, item] })
      return item
    },

    update(id: string, data: Partial<Omit<T, 'id'>>): T | null {
      const store = read()
      const idx   = store.items.findIndex((item) => item.id === id)
      if (idx === -1) return null
      const updated  = { ...store.items[idx], ...data }
      const newItems = store.items.map((item, i) => (i === idx ? updated : item))
      write({ ...store, items: newItems })
      return updated
    },

    delete(id: string): boolean {
      const store = read()
      const idx   = store.items.findIndex((item) => item.id === id)
      if (idx === -1) return false
      write({ ...store, items: store.items.filter((item) => item.id !== id) })
      return true
    },
  }
}
