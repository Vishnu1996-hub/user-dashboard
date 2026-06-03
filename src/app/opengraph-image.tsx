import { ImageResponse } from 'next/og'
import { siteConfig } from '@/lib/seo'

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: 'center',
          background: '#0f172a',
          color: '#f8fafc',
          display: 'flex',
          flexDirection: 'column',
          fontFamily: 'Inter, Arial, sans-serif',
          height: '100%',
          justifyContent: 'center',
          padding: '72px',
          width: '100%',
        }}
      >
        <div
          style={{
            color: '#38bdf8',
            fontSize: 32,
            fontWeight: 700,
            letterSpacing: 0,
            marginBottom: 24,
          }}
        >
          {siteConfig.name}
        </div>
        <div
          style={{
            fontSize: 74,
            fontWeight: 800,
            letterSpacing: 0,
            lineHeight: 1.05,
            maxWidth: 900,
            textAlign: 'center',
          }}
        >
          Admin metrics, users, products, and orders in one view
        </div>
        <div
          style={{
            color: '#cbd5e1',
            fontSize: 28,
            lineHeight: 1.4,
            marginTop: 30,
            maxWidth: 760,
            textAlign: 'center',
          }}
        >
          {siteConfig.description}
        </div>
      </div>
    ),
    size
  )
}
