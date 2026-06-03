import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

export const siteConfig = {
  name: 'User Dashboard',
  url: siteUrl,
  description:
    'Manage users, products, orders, analytics, and settings from one focused admin dashboard.',
  ogImage: '/opengraph-image',
  twitterImage: '/twitter-image',
}

type SeoOptions = {
  title?: string
  description?: string
  path?: string
  noIndex?: boolean
}

export function createMetadata({
  title = siteConfig.name,
  description = siteConfig.description,
  path = '/',
  noIndex = false,
}: SeoOptions = {}): Metadata {
  const isHomeTitle = title === siteConfig.name
  const socialTitle = isHomeTitle ? siteConfig.name : `${title} | ${siteConfig.name}`

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: 'website',
      url: path,
      siteName: siteConfig.name,
      title: socialTitle,
      description,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} dashboard preview`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description,
      images: [
        {
          url: siteConfig.twitterImage,
          alt: `${siteConfig.name} dashboard preview`,
        },
      ],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : undefined,
  }
}
