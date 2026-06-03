/**
 * nav-config.ts
 * ─────────────
 * Navigation items and brand metadata live here, NOT inside Sidebar.tsx.
 *
 * Why a separate file?
 * ────────────────────
 * Webpack / Turbopack analyses import graphs at the module boundary.
 * If NAV_ITEMS were defined inside Sidebar.tsx, every icon (LayoutDashboard,
 * Users, ShoppingCart …) would land in the sidebar chunk — which is fine —
 * but MORE IMPORTANTLY it would prevent future route-level code splits from
 * referencing only the icon they need without dragging in all the others.
 *
 * Keeping config in its own file also makes it trivial to:
 *   • Drive items from an API / feature-flags without touching the UI
 *   • Add href, badge counts, permission checks, or sub-menus later
 *   • Unit-test nav structure independently of rendering
 */

import {
  LayoutDashboard,
  Package,
  Settings,
  ShoppingCart,
  TrendingUp,
  Users,
} from 'lucide-react'

// ─── Brand ────────────────────────────────────────────────────────────────────
export const BRAND = {
  icon: LayoutDashboard,
  title: 'User Dashboard',
  subtitle: 'Admin Panel',
} as const

// ─── Nav items ────────────────────────────────────────────────────────────────
export interface NavItem {
  label: string
  icon: React.ElementType
  href: string          // required for <Link> — replace buttons when adding a router
  active?: boolean
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  { label: 'Users',     icon: Users,           href: '/dashboard/users' },
  { label: 'Orders',    icon: ShoppingCart,    href: '/dashboard/orders' },
  { label: 'Products',  icon: Package,         href: '/dashboard/products' },
  { label: 'Analytics', icon: TrendingUp,      href: '/dashboard/analytics' },
  { label: 'Settings',  icon: Settings,        href: '/dashboard/settings' },
]