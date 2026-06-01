'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/atoms/Button'
import { Select } from '@/components/atoms/Select'
import { FormField } from '@/components/molecules/FormField'
import { productSchema, type ProductFormData } from '@/lib/schemas/product.schema'
import { useCreateProduct, useUpdateProduct } from '@/hooks/useProducts'
import type { Product } from '@/types'

interface ProductFormProps {
  product?: Product
  onSuccess?: () => void
  onCancel?:  () => void
}

export function ProductForm({ product, onSuccess, onCancel }: ProductFormProps) {
  const isEdit = Boolean(product)

  const { mutateAsync: createProduct } = useCreateProduct()
  const { mutateAsync: updateProduct } = useUpdateProduct()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: product
      ? { name: product.name, description: product.description, price: product.price, category: product.category, status: product.status, stock: product.stock, sku: product.sku }
      : { category: 'electronics', status: 'draft', stock: 0 },
  })

  useEffect(() => {
    if (product) {
      reset({ name: product.name, description: product.description, price: product.price, category: product.category, status: product.status, stock: product.stock, sku: product.sku })
    }
  }, [product, reset])

  const onSubmit = async (data: ProductFormData) => {
    if (isEdit && product) {
      await updateProduct({ id: product.id, ...data })
    } else {
      await createProduct(data)
    }
    onSuccess?.()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      <FormField label="Product name" placeholder="Wireless Headphones" required error={errors.name?.message} {...register('name')} />
      <FormField label="Description" placeholder="Brief product description…" required error={errors.description?.message} {...register('description')} />

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Price ($)" type="number" placeholder="29.99" required error={errors.price?.message} {...register('price', { valueAsNumber: true })} />
        <FormField label="Stock" type="number" placeholder="0" required error={errors.stock?.message} {...register('stock', { valueAsNumber: true })} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="SKU" placeholder="ELEC-001" required error={errors.sku?.message} {...register('sku')} />
        <Select label="Category" required error={errors.category?.message} {...register('category')}>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="food">Food</option>
          <option value="books">Books</option>
          <option value="home">Home</option>
          <option value="sports">Sports</option>
        </Select>
      </div>

      <Select label="Status" required error={errors.status?.message} {...register('status')}>
        <option value="active">Active</option>
        <option value="draft">Draft</option>
        <option value="archived">Archived</option>
      </Select>

      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" loading={isSubmitting} className="min-w-32">
          {isEdit ? 'Save changes' : 'Create product'}
        </Button>
        <Button type="button" variant="ghost" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
