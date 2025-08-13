/** @type {import('next').NextConfig} */
const nextConfig = {
  // 本番環境最適化
  typescript: {
    ignoreBuildErrors: false, // 型チェックを有効化
  },
  eslint: {
    ignoreDuringBuilds: false, // ESLintチェックを有効化
  },
  
  // 極限パフォーマンス最適化
  poweredByHeader: false,
  trailingSlash: false,
  reactStrictMode: true,
  swcMinify: true,
  compress: true,
  generateEtags: true,
  
  // 実験的機能 - 安定した設定のみ
  experimental: {
    optimizePackageImports: [
      'clsx',
      'tailwind-merge'
    ],
  },
  
  // 画像最適化 - 極限設定
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [320, 420, 640, 768, 1024, 1280, 1536, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512],
    minimumCacheTTL: 31536000, // 1年間
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    contentDispositionType: 'inline',
    remotePatterns: [],
    unoptimized: false,
  },
  
  
  // セキュリティヘッダー強化
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-DNS-Prefetch-Control',
          value: 'on'
        },
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=63072000; includeSubDomains; preload'
        },
        {
          key: 'X-Frame-Options',
          value: 'DENY'
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff'
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block'
        },
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin'
        },
        {
          key: 'Permissions-Policy',
          value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
        },
        {
          key: 'Content-Security-Policy',
          value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self'; media-src 'self'; object-src 'none'; frame-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests"
        }
      ]
    },
    // 静的アセットの長期キャッシュ
    {
      source: '/_next/static/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable'
        }
      ]
    },
    // 画像の長期キャッシュ
    {
      source: '/images/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable'
        }
      ]
    },
    // フォントの長期キャッシュ
    {
      source: '/fonts/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable'
        }
      ]
    }
  ],
  
  // リダイレクト最適化
  redirects: async () => [
    {
      source: '/home',
      destination: '/',
      permanent: true,
    },
  ],
  
  // リライト設定
  rewrites: async () => [
    {
      source: '/api/sitemap',
      destination: '/sitemap.xml',
    },
  ],
  
  // 出力設定
  output: 'standalone',
  distDir: '.next',
  cleanDistDir: true,
  
  // 環境変数
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://vintage-iron-works.com',
  },

  // モジュール連携
  modularizeImports: {
    '@heroicons/react': {
      transform: '@heroicons/react/{{member}}',
    },
    'lodash': {
      transform: 'lodash/{{member}}',
    },
  },

  // 静的生成タイムアウト延長
  staticPageGenerationTimeout: 120,

  // ページ拡張子
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
};

export default nextConfig;