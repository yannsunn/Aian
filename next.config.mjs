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
  
  // 実験的機能 - 最大最適化
  experimental: {
    optimizePackageImports: [
      'clsx',
      'tailwind-merge',
      'react',
      'react-dom'
    ],
    optimizeCss: true,
    scrollRestoration: true,
    webVitalsAttribution: ['CLS', 'LCP', 'FCP', 'FID', 'TTFB'],
    gzipSize: true,
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
  
  // Webpack最適化 - 極限設定
  webpack: (config, { dev, isServer, webpack }) => {
    // 本番環境の極限最適化
    if (!dev) {
      // Tree Shaking強化
      config.optimization = {
        ...config.optimization,
        usedExports: true,
        sideEffects: false,
        minimize: true,
        concatenateModules: true,
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          minSize: 20000,
          minRemainingSize: 0,
          minChunks: 1,
          maxAsyncRequests: 30,
          maxInitialRequests: 30,
          enforceSizeThreshold: 50000,
          cacheGroups: {
            defaultVendors: {
              test: /[\\/]node_modules[\\/]/,
              priority: -10,
              reuseExistingChunk: true,
              name(module, chunks, cacheGroupKey) {
                const packageName = module.context.match(
                  /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                )?.[1];
                return `vendor-${packageName?.replace('@', '')}`;
              },
            },
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            },
            react: {
              test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
              name: 'react',
              priority: 20,
              chunks: 'all',
            },
            commons: {
              name: 'commons',
              minChunks: 2,
              priority: 10,
              reuseExistingChunk: true,
            },
          },
        },
      };

      // プロダクションソースマップ無効化（サイズ削減）
      config.devtool = false;

      // TerserPlugin設定強化
      config.optimization.minimizer = config.optimization.minimizer.map(plugin => {
        if (plugin.constructor.name === 'TerserPlugin') {
          plugin.options.terserOptions = {
            ...plugin.options.terserOptions,
            compress: {
              drop_console: true,
              drop_debugger: true,
              pure_funcs: ['console.log', 'console.info', 'console.debug'],
              passes: 2,
            },
            mangle: {
              safari10: true,
            },
            format: {
              comments: false,
              ascii_only: true,
            },
          };
        }
        return plugin;
      });

      // 未使用コードの削除
      config.plugins.push(
        new webpack.IgnorePlugin({
          resourceRegExp: /^\.\/locale$/,
          contextRegExp: /moment$/,
        })
      );
    }

    // サーバーサイドバンドルサイズ最適化
    if (isServer) {
      config.externals = [...(config.externals || []), 'canvas', 'jsdom'];
    }

    // Alias設定でインポート最適化
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': './src',
    };

    // モジュール解決の最適化
    config.resolve.extensions = ['.ts', '.tsx', '.js', '.jsx', '.json'];

    return config;
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