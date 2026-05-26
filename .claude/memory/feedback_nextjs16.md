---
name: feedback-nextjs16
description: Next.js 16 breaking changes discovered during build — proxy, params, config
metadata:
  type: feedback
---

In Next.js 16, `middleware.ts` is deprecated and renamed to `proxy.ts`. The exported function must be named `proxy` not `middleware`.

**Why:** Build fails with deprecation warning + Turbopack error if you use the old convention.
**How to apply:** Always create `src/proxy.ts` (not `src/middleware.ts`) for route interception. Export `proxy` function and `config` object directly — `config` cannot be re-exported from another file, it must be defined inline.

Also: `params` in page components and route handlers is now a Promise:
```typescript
// Page:
type Props = { params: Promise<{ id: string }> }
export default async function Page({ params }: Props) {
  const { id } = await params
}
// Route handler:
type Context = { params: Promise<{ id: string }> }
export async function GET(_req: NextRequest, { params }: Context) {
  const { id } = await params
}
```
