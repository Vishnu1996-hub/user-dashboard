---
name: project-overview
description: user-dashboard Next.js 16 app — routes, stack, what's built
metadata:
  type: project
---

Full-stack User Management Dashboard built on Next.js 16.2.6 (Turbopack), React 19, Tailwind v4, TypeScript strict.

**Routes:**
- `/` → redirects to /login
- `/login` — AuthLayout + LoginForm (react-hook-form + zod)
- `/dashboard` — KPI cards + performance chart + recent activity
- `/dashboard/users` — UserTable with search/filter/pagination
- `/dashboard/users/new` — add user form
- `/dashboard/users/[id]` — user detail (server component)
- `/dashboard/users/[id]/edit` — edit user form
- `/api/users` — GET (list/search/filter/paginate), POST (create)
- `/api/users/[id]` — GET, PUT, DELETE

**Auth:** Zustand store → cookie storage → src/proxy.ts reads cookie (Next.js 16 "proxy" = middleware).

**Data:** In-memory store in `src/lib/data/userStore.ts`, seeded from 20 MOCK_USERS. Resets on server restart.

**Test credentials:** alice@example.com / password123 (admin), eva@example.com / password123 (admin)

**Why:** How to apply: Read this before extending any features so you know what already exists.
