'use client'

import { useReportWebVitals } from 'next/web-vitals'

export function WebVitals() {
  useReportWebVitals((metric) => {
    // You can send this to Google Analytics, Sentry, or your own backend
    console.log(metric)
    
    // Example: send to your analytics endpoint
    // if (metric.label === 'web-vital') {
    //   fetch('/api/analytics/vitals', { body: JSON.stringify(metric), method: 'POST' })
    // }
  })
  return null
}