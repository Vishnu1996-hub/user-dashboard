import { Button, Badge, Avatar, Input, Skeleton } from '@/components/atoms'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col gap-8 p-10">
      <h1 className="text-2xl font-semibold">Atom preview</h1>

      <section className="flex flex-wrap gap-3">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="outline">Outline</Button>
        <Button loading>Loading...</Button>
      </section>

      <section className="flex gap-2">
        <Badge status="active" />
        <Badge status="inactive" />
        <Badge status="pending" />
      </section>

      <section className="flex gap-3 items-center">
        <Avatar name="John Doe" size="sm" />
        <Avatar name="Sara Smith" size="md" />
        <Avatar name="Alex Kumar" size="lg" />
      </section>

      <section className="max-w-sm">
        <Input label="Email address" placeholder="you@example.com" hint="We'll never share your email." />
        <div className="mt-4">
          <Input label="Password" type="password" error="Password is too short." />
        </div>
      </section>

      <section className="flex flex-col gap-2 max-w-sm">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-9 w-full" />
      </section>
    </div>
  )
}