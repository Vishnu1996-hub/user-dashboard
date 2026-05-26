'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/atoms/Button'
import { Select } from '@/components/atoms/Select'
import { FormField } from '@/components/molecules/FormField'
import { userSchema, type UserFormData } from '@/lib/schemas/user.schema'
import { useCreateUser, useUpdateUser } from '@/hooks/useUsers'
import type { User } from '@/types'

interface UserFormProps {
  user?: User
}

export function UserForm({ user }: UserFormProps) {
  const router = useRouter()
  const isEdit = Boolean(user)

  const { mutateAsync: createUser } = useCreateUser()
  const { mutateAsync: updateUser } = useUpdateUser()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: user
      ? { name: user.name, email: user.email, role: user.role, status: user.status }
      : { role: 'viewer', status: 'active' },
  })

  useEffect(() => {
    if (user) {
      reset({ name: user.name, email: user.email, role: user.role, status: user.status })
    }
  }, [user, reset])

  const onSubmit = async (data: UserFormData) => {
    if (isEdit && user) {
      await updateUser({ id: user.id, ...data })
      router.push(`/dashboard/users/${user.id}`)
    } else {
      const created = await createUser(data)
      router.push(`/dashboard/users/${created.id}`)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      <FormField
        label="Full name"
        placeholder="Jane Smith"
        required
        error={errors.name?.message}
        {...register('name')}
      />

      <FormField
        label="Email address"
        type="email"
        placeholder="jane@example.com"
        required
        error={errors.email?.message}
        {...register('email')}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Select
          label="Role"
          required
          error={errors.role?.message}
          {...register('role')}
        >
          <option value="viewer">Viewer</option>
          <option value="editor">Editor</option>
          <option value="admin">Admin</option>
        </Select>

        <Select
          label="Status"
          required
          error={errors.status?.message}
          {...register('status')}
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="pending">Pending</option>
        </Select>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" loading={isSubmitting} className="min-w-28">
          {isEdit ? 'Save changes' : 'Create user'}
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={() => router.back()}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}
