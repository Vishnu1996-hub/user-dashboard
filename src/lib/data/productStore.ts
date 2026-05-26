import type { Product } from '@/types'
import { createFileStore } from './store'
import { MOCK_PRODUCTS } from './products'

// Single .data/products.json — nextId + items in one atomic write.
export const productStore = createFileStore<Product>('products.json', MOCK_PRODUCTS)
