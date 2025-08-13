// Service Worker - 極限パフォーマンス最適化版
const CACHE_NAME = 'viw-v1-' + new Date().getTime();
const STATIC_CACHE = 'viw-static-v1';
const DYNAMIC_CACHE = 'viw-dynamic-v1';
const IMAGE_CACHE = 'viw-images-v1';

// キャッシュする静的アセット
const STATIC_ASSETS = [
  '/',
  '/offline.html',
  '/manifest.json',
  '/_next/static/css/',
  '/_next/static/js/',
  '/images/viw-logo.png'
];

// キャッシュ戦略
const CACHE_STRATEGIES = {
  networkFirst: [
    '/api/',
    '/_next/data/'
  ],
  cacheFirst: [
    '/images/',
    '/videos/',
    '/_next/static/',
    '/fonts/'
  ],
  staleWhileRevalidate: [
    '/',
    '/products',
    '/company',
    '/privacy',
    '/terms'
  ]
};

// インストールイベント
self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then((cache) => {
        return cache.addAll(STATIC_ASSETS.filter(asset => !asset.includes('/')));
      }),
      self.skipWaiting()
    ])
  );
});

// アクティベートイベント
self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      // 古いキャッシュをクリーンアップ
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => name.startsWith('viw-') && name !== CACHE_NAME)
            .map((name) => caches.delete(name))
        );
      }),
      self.clients.claim()
    ])
  );
});

// フェッチイベント - 高度なキャッシュ戦略
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // 非GET リクエストはネットワークのみ
  if (request.method !== 'GET') {
    return;
  }

  // Chrome拡張機能などは無視
  if (!request.url.startsWith('http')) {
    return;
  }

  // 画像の最適化処理
  if (isImageRequest(request)) {
    event.respondWith(handleImageRequest(request));
    return;
  }

  // キャッシュ戦略の適用
  const strategy = determineStrategy(url.pathname);
  event.respondWith(executeStrategy(strategy, request));
});

// 画像リクエストの判定
function isImageRequest(request) {
  const acceptHeader = request.headers.get('Accept');
  return acceptHeader && acceptHeader.includes('image');
}

// 画像リクエストの処理
async function handleImageRequest(request) {
  const cache = await caches.open(IMAGE_CACHE);
  const cached = await cache.match(request);

  if (cached) {
    // キャッシュがある場合は即座に返し、バックグラウンドで更新
    updateImageCache(request, cache);
    return cached;
  }

  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
      return response;
    }
    return generatePlaceholderImage();
  } catch {
    return generatePlaceholderImage();
  }
}

// 画像キャッシュの更新
async function updateImageCache(request, cache) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response);
    }
  } catch {
    // Silent fail
  }
}

// プレースホルダー画像の生成
function generatePlaceholderImage() {
  const svg = `
    <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f0f0f0"/>
      <text x="50%" y="50%" font-family="sans-serif" font-size="20" fill="#999" text-anchor="middle" alignment-baseline="middle">
        Loading...
      </text>
    </svg>
  `;
  
  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'no-cache'
    }
  });
}

// キャッシュ戦略の決定
function determineStrategy(pathname) {
  for (const [strategy, patterns] of Object.entries(CACHE_STRATEGIES)) {
    if (patterns.some(pattern => pathname.includes(pattern))) {
      return strategy;
    }
  }
  return 'staleWhileRevalidate';
}

// キャッシュ戦略の実行
async function executeStrategy(strategy, request) {
  switch (strategy) {
    case 'networkFirst':
      return networkFirst(request);
    case 'cacheFirst':
      return cacheFirst(request);
    case 'staleWhileRevalidate':
      return staleWhileRevalidate(request);
    default:
      return fetch(request);
  }
}

// Network First戦略
async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, response.clone());
      return response;
    }
    throw new Error('Network response was not ok');
  } catch (error) {
    const cached = await caches.match(request);
    if (cached) {
      return cached;
    }
    return caches.match('/offline.html');
  }
}

// Cache First戦略
async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) {
    return cached;
  }

  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, response.clone());
      return response;
    }
    throw new Error('Network response was not ok');
  } catch (error) {
    return caches.match('/offline.html');
  }
}

// Stale While Revalidate戦略
async function staleWhileRevalidate(request) {
  const cached = await caches.match(request);

  const fetchPromise = fetch(request).then(async (response) => {
    if (response.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, response.clone());
      return response;
    }
    throw new Error('Network response was not ok');
  }).catch(() => {
    return cached || caches.match('/offline.html');
  });

  return cached || fetchPromise;
}

// プッシュ通知の処理
self.addEventListener('push', (event) => {
  if (!event.data) return;

  const data = event.data.json();
  const options = {
    body: data.body || '新しいアイアン製品が追加されました',
    icon: '/images/viw-logo.png',
    badge: '/images/viw-logo.png',
    vibrate: [200, 100, 200],
    data: {
      url: data.url || '/'
    }
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'Vintage Iron Works', options)
  );
});

// 通知クリックの処理
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});

// バックグラウンド同期
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-images') {
    event.waitUntil(syncImages());
  }
});

// 画像の同期
async function syncImages() {
  const cache = await caches.open(IMAGE_CACHE);
  const requests = await cache.keys();
  
  return Promise.all(
    requests.map(async (request) => {
      try {
        const response = await fetch(request);
        if (response.ok) {
          return cache.put(request, response);
        }
      } catch {
        // Silent fail
      }
    })
  );
}