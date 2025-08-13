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
        
        {/* パフォーマンス監視初期化 */}
        <Script
          id="performance-monitor"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              import('/lib/performance-monitor.js').then(module => {
                window.__performanceMonitor = module.default;
              });
            `
          }}
        />
        
        {/* Speculation Rules API - プリフェッチの高度な制御 */}
        <Script
          id="speculation-rules"
          type="speculationrules"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              prerender: [
                {
                  source: "list",
                  urls: ["/products", "/company"]
                }
              ],
              prefetch: [
                {
                  source: "list",
                  urls: ["/contact", "/privacy", "/terms"],
                  requires: ["anonymous-client-ip-when-cross-origin"],
                  referrer_policy: "no-referrer"
                }
              ]
            })
          }}
        />
        
        {/* Adaptive Loading - ネットワーク状況に応じた最適化 */}
        <Script
          id="adaptive-loading"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if ('connection' in navigator) {
                const connection = navigator.connection;
                const slowConnection = connection.effectiveType === '2g' || 
                                       connection.effectiveType === 'slow-2g' ||
                                       connection.saveData === true;
                
                if (slowConnection) {
                  document.documentElement.classList.add('slow-connection');
                  // 低速接続用の最適化を適用
                  document.querySelectorAll('[data-lazy]').forEach(el => {
                    el.loading = 'lazy';
                  });
                }
                
                // ネットワーク変更を監視
                connection.addEventListener('change', () => {
                  const isSlowNow = connection.effectiveType === '2g' || 
                                    connection.effectiveType === 'slow-2g';
                  document.documentElement.classList.toggle('slow-connection', isSlowNow);
                });
              }
            `
          }}
        />
        
        {/* Intersection Observer による遅延読み込み */}
        <Script
          id="lazy-loading"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if ('IntersectionObserver' in window) {
                const imageObserver = new IntersectionObserver((entries) => {
                  entries.forEach(entry => {
                    if (entry.isIntersecting) {
                      const img = entry.target;
                      img.src = img.dataset.src;
                      img.classList.add('loaded');
                      imageObserver.unobserve(img);
                    }
                  });
                }, {
                  rootMargin: '50px 0px',
                  threshold: 0.01
                });
                
                document.querySelectorAll('img[data-src]').forEach(img => {
                  imageObserver.observe(img);
                });
              }
            `
          }}
        />
        
        <main className="min-h-screen">
          {children}
        </main>
        
        {/* リソースヒント更新 */}
        <Script
          id="resource-hints"
          strategy="idle"
          dangerouslySetInnerHTML={{
            __html: `
              // 動的なリソースヒント更新
              function updateResourceHints() {
                const currentPath = window.location.pathname;
                
                // パスに基づいてプリフェッチを更新
                fetch('/api/edge-optimize', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ currentPath })
                })
                .then(res => res.json())
                .then(data => {
                  data.hints?.forEach(hint => {
                    const link = document.createElement('link');
                    link.rel = 'prefetch';
                    link.href = hint;
                    link.crossOrigin = 'anonymous';
                    document.head.appendChild(link);
                  });
                });
              }
              
              // ページ遷移時に更新
              if ('navigation' in window) {
                navigation.addEventListener('navigate', updateResourceHints);
              }
            `
          }}
        />
      </body>
    </html>
  )
}