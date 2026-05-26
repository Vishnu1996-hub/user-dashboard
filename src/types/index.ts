// ─── Users ────────────────────────────────────────────────────────────────────

export type UserStatus = 'active' | 'inactive' | 'pending'
export type UserRole   = 'admin' | 'editor' | 'viewer'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  status: UserStatus
  avatarUrl?: string
  createdAt: string
}

// ─── Products ─────────────────────────────────────────────────────────────────

export type ProductStatus   = 'active' | 'draft' | 'archived'
export type ProductCategory = 'electronics' | 'clothing' | 'food' | 'books' | 'home' | 'sports'

export interface Product {
  id: string
  name: string
  description: string
  price: number          // stored in dollars, e.g. 29.99
  category: ProductCategory
  status: ProductStatus
  stock: number
  sku: string
  createdAt: string
}

// ─── Orders ───────────────────────────────────────────────────────────────────

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'

export interface OrderItem {
  productName: string
  quantity: number
  unitPrice: number
}

export interface Order {
  id: string
  orderNumber: string      // e.g. "ORD-0042"
  customerName: string
  customerEmail: string
  items: OrderItem[]
  total: number
  status: OrderStatus
  createdAt: string
}

// ─── Analytics ────────────────────────────────────────────────────────────────

export interface MonthlyRevStat {
  label:    string   // "Dec '25"
  revenue:  number
  orders:   number
}

export interface CategoryRevStat {
  category:   string
  revenue:    number
  pct:        number   // share of total revenue (0-100)
}

export interface TopProductStat {
  name:       string
  sku:        string
  category:   string
  unitsSold:  number
  revenue:    number
  barPct:     number   // % of leading product's revenue (for bar width)
}

export interface AnalyticsData {
  // ── KPIs ────────────────────────────────────────────────────────────────
  totalRevenue:      number
  totalOrders:       number
  avgOrderValue:     number
  activeProducts:    number
  totalProducts:     number
  activeUsers:       number
  totalUsers:        number
  // Growth vs previous calendar month (null when no prior data)
  revenueGrowth:     number | null
  orderGrowth:       number | null
  avgOrderGrowth:    number | null
  // ── Charts ──────────────────────────────────────────────────────────────
  monthlyRevenue:    MonthlyRevStat[]
  orderStatusCounts: Record<string, number>
  categoryRevenue:   CategoryRevStat[]
  topProducts:       TopProductStat[]
  recentOrders:      Order[]
}
