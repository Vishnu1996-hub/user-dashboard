import { z } from 'zod'

export const productSchema = z.object({
  name:        z.string().min(2,  'Name must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price:       z.coerce.number().positive('Price must be greater than 0'),
  category:    z.enum(['electronics', 'clothing', 'food', 'books', 'home', 'sports']),
  status:      z.enum(['active', 'draft', 'archived']),
  stock:       z.coerce.number().int().min(0, 'Stock cannot be negative'),
  sku:         z.string().min(2, 'SKU must be at least 2 characters'),
})

export type ProductFormData = z.infer<typeof productSchema>
