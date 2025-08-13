import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import './globals.css'
import SecurityFeatures from '@/components/SecurityFeatures'

export const metadata: Metadata = {
  title: 'Vintage Iron Works - ヴィンテージアイアン製品',
  description: '溶接歴40年のパートナーとの協業で生み出す、ヴィンテージ風アイアン製品。オーダーメイドの美しさと品質をお届けします。',
  keywords: 'ヴィンテージ,アイアン,鉄製品,インテリア,家具,アンティーク,インダストリアル,オーダーメイド,溶接',
  authors: [{ name: 'Vintage Iron Works' }],
  applicationName: 'Vintage Iron Works',
  generator: 'Next.js',
  // manifest: '/manifest.json', // PWA未実装のためコメントアウト
  openGraph: {
    title: 'Vintage Iron Works - ヴィンテージアイアン製品',
    description: '溶接歴40年のパートナーとの協業で生み出す、ヴィンテージ風アイアン製品。',
    type: 'website',
    locale: 'ja_JP',
    siteName: 'Vintage Iron Works',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Vintage Iron Works'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vintage Iron Works - ヴィンテージアイアン製品',
    description: '溶接歴40年のパートナーとの協業で生み出す、ヴィンテージ風アイアン製品。',
    images: ['/images/twitter-card.jpg']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://vintage-iron-works.com'
  },
  category: 'business',
  verification: {
    google: 'google-site-verification-code',
    yandex: 'yandex-verification-code'
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' }
  ]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <head>
        {/* プリコネクト - 最重要ドメイン */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS プリフェッチ - サードパーティドメイン */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        
        {/* プリロードは削除 - Next.jsが自動的に処理 */}
        
        {/* Early Hints対応 */}
        <meta httpEquiv="Link" content="</images/hero.jpg>; rel=preload; as=image" />
        
        {/* Resource Hints */}
        <meta name="turbo-cache-control" content="no-preview" />
      </head>
      <body className="font-sans leading-relaxed text-gray-800 antialiased">
        <SecurityFeatures />
        
        <main className="min-h-screen">
          {children}
        </main>
        
      </body>
    </html>
  )
}