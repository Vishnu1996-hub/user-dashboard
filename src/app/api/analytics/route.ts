/**
 * GET /api/analytics
 *
 * Computes all dashboard & analytics stats from the live file stores.
 * Every value here is derived from real data — nothing is hardcoded.
 *
 * Query params:
 *   months  (default 6)  — how many months of history to include in the chart
 */

import type { NextRequest }           from 'next/server'
import type { AnalyticsData, CategoryRevStat, MonthlyRevStat, TopProductStat, Order } from '@/types'
import { orderStore }   from '@/lib/data/orderStore'
import { productStore } from '@/lib/data/productStore'
import { userStore }    from '@/lib/data/userStore'

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** "2026-05-19" → { year: 2026, month: 5 } */
function parseYM(dateStr: string): { year: number; month: number } {
  const [y, m] = dateStr.split('-').map(Number)
  return { year: y, month: m }
}

/** Format as "Dec '25" or "May '26" */
function formatMonth(year: number, month: number): string {
  const names = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  return `${names[month - 1]} '${String(year).slice(2)}`
}

function pctGrowth(current: number, previous: number): number | null {
  if (previous === 0) return null
  return Math.round(((current - previous) / previous) * 100 * 10) / 10
}

// ─── Route handler ────────────────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  const months = Math.min(12, Math.max(1,
    parseInt(new URL(req.url).searchParams.get('months') ?? '6')
  ))

  const orders   = orderStore.getAll()
  const products = productStore.getAll()
  const users    = userStore.getAll()

  // ── Build product lookup: name → { sku, category } ──────────────────────
  const productMap = new Map(
    products.map((p) => [p.name.toLowerCase(), { sku: p.sku, category: p.category }])
  )

  // ── KPIs ──────────────────────────────────────────────────────────────────
  const totalRevenue  = orders.reduce((s, o) => s + o.total, 0)
  const totalOrders   = orders.length
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0

  const activeProducts = products.filter((p) => p.status === 'active').length
  const totalProducts  = products.length
  const activeUsers    = users.filter((u) => u.status === 'active').length
  const totalUsers     = users.length

  // Current & previous calendar months
  const now       = new Date()
  const curYear   = now.getFullYear()
  const curMonth  = now.getMonth() + 1       // 1-based
  const prevYear  = curMonth === 1 ? curYear - 1 : curYear
  const prevMonth = curMonth === 1 ? 12 : curMonth - 1

  const curOrders  = orders.filter((o) => { const { year, month } = parseYM(o.createdAt); return year === curYear  && month === curMonth  })
  const prevOrders = orders.filter((o) => { const { year, month } = parseYM(o.createdAt); return year === prevYear && month === prevMonth })

  const curRevenue  = curOrders.reduce((s, o) => s + o.total, 0)
  const prevRevenue = prevOrders.reduce((s, o) => s + o.total, 0)
  const curAvg      = curOrders.length  > 0 ? curRevenue  / curOrders.length  : 0
  const prevAvg     = prevOrders.length > 0 ? prevRevenue / prevOrders.length : 0

  const revenueGrowth  = pctGrowth(curRevenue, prevRevenue)
  const orderGrowth    = pctGrowth(curOrders.length, prevOrders.length)
  const avgOrderGrowth = pctGrowth(curAvg, prevAvg)

  // ── Monthly revenue (last N months) ───────────────────────────────────────
  const monthlyRevenue: MonthlyRevStat[] = []
  for (let i = months - 1; i >= 0; i--) {
    let y = curYear
    let m = curMonth - i
    while (m <= 0) { m += 12; y -= 1 }

    const slice = orders.filter((o) => {
      const ym = parseYM(o.createdAt)
      return ym.year === y && ym.month === m
    })
    monthlyRevenue.push({
      label:   formatMonth(y, m),
      revenue: Math.round(slice.reduce((s, o) => s + o.total, 0) * 100) / 100,
      orders:  slice.length,
    })
  }

  // ── Order status counts ────────────────────────────────────────────────────
  const orderStatusCounts: Record<string, number> = {}
  for (const o of orders) {
    orderStatusCounts[o.status] = (orderStatusCounts[o.status] ?? 0) + 1
  }

  // ── Category revenue ──────────────────────────────────────────────────────
  const catRevMap: Record<string, number> = {}
  for (const order of orders) {
    for (const item of order.items) {
      const meta = productMap.get(item.productName.toLowerCase())
      const cat  = meta?.category ?? 'other'
      catRevMap[cat] = (catRevMap[cat] ?? 0) + item.quantity * item.unitPrice
    }
  }
  const catRevTotal = Object.values(catRevMap).reduce((s, v) => s + v, 0)
  const categoryRevenue: CategoryRevStat[] = Object.entries(catRevMap)
    .sort(([, a], [, b]) => b - a)
    .map(([category, revenue]) => ({
      category,
      revenue: Math.round(revenue * 100) / 100,
      pct:     catRevTotal > 0 ? Math.round((revenue / catRevTotal) * 1000) / 10 : 0,
    }))

  // ── Top products ──────────────────────────────────────────────────────────
  const prodRevMap: Record<string, { revenue: number; unitsSold: number; sku: string; category: string }> = {}
  for (const order of orders) {
    for (const item of order.items) {
      const meta = productMap.get(item.productName.toLowerCase())
      if (!prodRevMap[item.productName]) {
        prodRevMap[item.productName] = {
          revenue:   0,
          unitsSold: 0,
          sku:       meta?.sku      ?? '—',
          category:  meta?.category ?? 'other',
        }
      }
      prodRevMap[item.productName].revenue   += item.quantity * item.unitPrice
      prodRevMap[item.productName].unitsSold += item.quantity
    }
  }
  const sortedProds = Object.entries(prodRevMap).sort(([, a], [, b]) => b.revenue - a.revenue)
  const maxProdRev  = sortedProds[0]?.[1].revenue ?? 1
  const topProducts: TopProductStat[] = sortedProds.slice(0, 5).map(([name, stats]) => ({
    name,
    sku:       stats.sku,
    category:  stats.category,
    unitsSold: stats.unitsSold,
    revenue:   Math.round(stats.revenue * 100) / 100,
    barPct:    Math.round((stats.revenue / maxProdRev) * 100),
  }))

  // ── Recent orders (last 5 by createdAt desc) ──────────────────────────────
  const recentOrders: Order[] = [...orders]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 5)

  const result: AnalyticsData = {
    totalRevenue:   Math.round(totalRevenue  * 100) / 100,
    totalOrders,
    avgOrderValue:  Math.round(avgOrderValue * 100) / 100,
    activeProducts,
    totalProducts,
    activeUsers,
    totalUsers,
    revenueGrowth,
    orderGrowth,
    avgOrderGrowth,
    monthlyRevenue,
    orderStatusCounts,
    categoryRevenue,
    topProducts,
    recentOrders,
  }

  return Response.json(result)
}
