import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'
export const dynamic = 'force-dynamic'

// Edge Runtimeで動作する最適化API
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const action = searchParams.get('action')

  switch (action) {
    case 'performance':
      return getPerformanceMetrics()
    case 'optimize':
      return optimizeRequest(request)
    case 'cache-status':
      return getCacheStatus()
    default:
      return NextResponse.json({ 
        message: 'Edge Runtime Optimization API',
        runtime: 'edge',
        timestamp: Date.now()
      })
  }
}

// パフォーマンスメトリクス取得
function getPerformanceMetrics() {
  const metrics = {
    timestamp: Date.now(),
    runtime: 'edge',
    memory: process.memoryUsage ? process.memoryUsage() : null,
    uptime: process.uptime ? process.uptime() : null,
    recommendations: [
      'Enable HTTP/3 for better performance',
      'Use Brotli compression for text assets',
      'Implement resource hints for critical resources',
      'Enable early hints (103 status code)'
    ]
  }

  return NextResponse.json(metrics, {
    headers: {
      'Cache-Control': 'private, max-age=0, must-revalidate',
      'X-Runtime': 'edge'
    }
  })
}

// リクエスト最適化
async function optimizeRequest(request: NextRequest) {
  const headers = new Headers(request.headers)
  const acceptEncoding = headers.get('accept-encoding') || ''
  const userAgent = headers.get('user-agent') || ''
  
  // デバイス検出
  const isMobile = /mobile|android|iphone/i.test(userAgent)
  const isTablet = /ipad|tablet/i.test(userAgent)
  
  // 最適化推奨事項
  const optimizations = {
    device: isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop',
    supportsBrotli: acceptEncoding.includes('br'),
    supportsWebP: headers.get('accept')?.includes('image/webp'),
    supportsAvif: headers.get('accept')?.includes('image/avif'),
    recommendations: [] as string[]
  }

  // デバイス別最適化推奨
  if (isMobile) {
    optimizations.recommendations.push(
      'Reduce image quality to 70-80%',
      'Implement lazy loading for below-fold content',
      'Use smaller font files',
      'Minimize JavaScript execution'
    )
  }

  // 画像フォーマット推奨
  if (optimizations.supportsAvif) {
    optimizations.recommendations.push('Serve AVIF images for maximum compression')
  } else if (optimizations.supportsWebP) {
    optimizations.recommendations.push('Serve WebP images for better compression')
  }

  return NextResponse.json(optimizations, {
    headers: {
      'Cache-Control': 'private, max-age=300',
      'X-Device-Type': optimizations.device,
      'X-Runtime': 'edge'
    }
  })
}

// キャッシュステータス
function getCacheStatus() {
  const cacheStatus = {
    timestamp: Date.now(),
    runtime: 'edge',
    caches: {
      static: {
        status: 'active',
        ttl: 31536000,
        strategy: 'immutable'
      },
      dynamic: {
        status: 'active',
        ttl: 3600,
        strategy: 'stale-while-revalidate'
      },
      images: {
        status: 'active',
        ttl: 2592000,
        strategy: 'cache-first'
      }
    },
    cdnStatus: {
      enabled: true,
      provider: 'Vercel Edge Network',
      regions: ['Global']
    }
  }

  return NextResponse.json(cacheStatus, {
    headers: {
      'Cache-Control': 'public, max-age=60',
      'X-Cache-Status': 'HIT',
      'X-Runtime': 'edge'
    }
  })
}

// プリフェッチヒント生成
export async function POST(request: NextRequest) {
  try {
    const { currentPath } = await request.json()
    
    // パスに基づくプリフェッチ推奨
    const prefetchHints = generatePrefetchHints(currentPath)
    
    return NextResponse.json({
      hints: prefetchHints,
      timestamp: Date.now()
    }, {
      headers: {
        'Cache-Control': 'private, max-age=300',
        'X-Runtime': 'edge'
      }
    })
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}

// プリフェッチヒント生成ロジック
function generatePrefetchHints(currentPath: string): string[] {
  const hints: string[] = []
  
  switch (currentPath) {
    case '/':
      hints.push(
        '/_next/data/products.json',
        '/images/products/home/S__83738739.jpg',
        '/_next/static/chunks/pages/products.js'
      )
      break
    case '/products':
      hints.push(
        '/images/products/retrofit/S__83738749_0.jpg',
        '/images/products/outdoor/S__83738756_0.jpg',
        '/_next/data/contact.json'
      )
      break
    case '/company':
      hints.push(
        '/_next/data/contact.json',
        '/_next/static/chunks/pages/contact.js'
      )
      break
  }
  
  // 共通リソース
  hints.push(
    '/_next/static/css/app.css',
    '/_next/static/chunks/main.js',
    '/_next/static/chunks/webpack.js'
  )
  
  return hints
}