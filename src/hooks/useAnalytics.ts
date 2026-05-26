'use client'

import { useQuery } from '@tanstack/react-query'
import type { AnalyticsData } from '@/types'

async function fetchAnalytics(months = 6): Promise<AnalyticsData> {
  const res = await fetch(`/api/analytics?months=${months}`)
  if (!res.ok) throw new Error('Failed to fetch analytics')
  return res.json()
}

/**
 * useAnalytics — fetches /api/analytics and returns live computed stats.
 *
 * React Query deduplicates concurrent calls with the same `months` value, so
 * multiple components on the same page all share a single network request.
 * The query is automatically re-fetched whenever products/orders/users are
 * mutated because those hooks invalidate the ['analytics'] key.
 */
export function useAnalytics(months = 6) {
  return useQuery<AnalyticsData>({
    queryKey:  ['analytics', months],
    queryFn:   () => fetchAnalytics(months),
    staleTime: 30_000,   // 30 s — re-fetch on focus after 30 s
  })
}
