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
  manifest: '/manifest.json',
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
        
        {/* プリロード - クリティカルリソース */}
        <link 
          rel="preload" 
          href="/_next/static/css/app.css" 
          as="style" 
          crossOrigin="anonymous"
        />
        <link 
          rel="preload" 
          href="/fonts/inter-var.woff2" 
          as="font" 
          type="font/woff2" 
          crossOrigin="anonymous"
        />
        
        {/* モジュールプリロード - 重要なJavaScript */}
        <link 
          rel="modulepreload" 
          href="/_next/static/chunks/main.js"
          crossOrigin="anonymous"
        />
        
        {/* プリフェッチ - 次に訪問される可能性の高いページ */}
        <link rel="prefetch" href="/products" />
        <link rel="prefetch" href="/contact" />
        
        {/* プリレンダー - 重要な次ページ */}
        <link rel="prerender" href="/products" />
        
        {/* Early Hints対応 */}
        <meta httpEquiv="Link" content="</images/hero.jpg>; rel=preload; as=image" />
        
        {/* Resource Hints */}
        <meta name="turbo-cache-control" content="no-preview" />
      </head>
      <body className="font-sans leading-relaxed text-gray-800 antialiased">
        <SecurityFeatures />
        
        {/* Service Worker登録 */}
        <Script
          id="service-worker"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js').then(
                    (registration) => {
                      console.log('Service Worker registered:', registration.scope);
                    },
                    (error) => {
                      console.error('Service Worker registration failed:', error);
                    }
                  );
                });
              }
            `
          }}
        />
        
        
        
        
        
        <main className="min-h-screen">
          {children}
        </main>
        
      </body>
    </html>
  )
}