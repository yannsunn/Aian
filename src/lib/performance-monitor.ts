// 極限パフォーマンス監視システム
interface PerformanceMetrics {
  FCP: number | null  // First Contentful Paint
  LCP: number | null  // Largest Contentful Paint
  FID: number | null  // First Input Delay
  CLS: number | null  // Cumulative Layout Shift
  TTFB: number | null // Time to First Byte
  INP: number | null  // Interaction to Next Paint
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics = {
    FCP: null,
    LCP: null,
    FID: null,
    CLS: null,
    TTFB: null,
    INP: null
  }
  
  private observers: Map<string, PerformanceObserver> = new Map()
  private resourceTimings: PerformanceResourceTiming[] = []
  private navigationTiming: PerformanceNavigationTiming | null = null

  constructor() {
    if (typeof window !== 'undefined') {
      this.init()
    }
  }

  private init() {
    // Web Vitals観測
    this.observeWebVitals()
    
    // リソースタイミング観測
    this.observeResourceTimings()
    
    // ナビゲーションタイミング観測
    this.observeNavigationTiming()
    
    // Long Tasks観測
    this.observeLongTasks()
    
    // メモリ使用状況観測
    this.observeMemory()
    
    // ネットワーク情報観測
    this.observeNetwork()
  }

  private observeWebVitals() {
    // FCP (First Contentful Paint)
    this.createObserver('paint', (entries) => {
      entries.forEach((entry) => {
        if (entry.name === 'first-contentful-paint') {
          this.metrics.FCP = Math.round(entry.startTime)
          this.reportMetric('FCP', this.metrics.FCP)
        }
      })
    })

    // LCP (Largest Contentful Paint)
    this.createObserver('largest-contentful-paint', (entries) => {
      const lastEntry = entries[entries.length - 1]
      this.metrics.LCP = Math.round(lastEntry.startTime)
      this.reportMetric('LCP', this.metrics.LCP)
    })

    // FID (First Input Delay)
    this.createObserver('first-input', (entries) => {
      const firstEntry = entries[0]
      this.metrics.FID = Math.round(firstEntry.processingStart - firstEntry.startTime)
      this.reportMetric('FID', this.metrics.FID)
    })

    // CLS (Cumulative Layout Shift)
    let clsValue = 0
    let clsEntries: PerformanceEntry[] = []
    
    this.createObserver('layout-shift', (entries) => {
      entries.forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value
          clsEntries.push(entry)
        }
      })
      this.metrics.CLS = Math.round(clsValue * 1000) / 1000
      this.reportMetric('CLS', this.metrics.CLS)
    })

    // INP (Interaction to Next Paint)
    const interactions: number[] = []
    this.createObserver('event', (entries) => {
      entries.forEach((entry: any) => {
        if (entry.interactionId) {
          interactions.push(entry.duration)
          // 98パーセンタイルを計算
          const sorted = [...interactions].sort((a, b) => a - b)
          const index = Math.ceil(sorted.length * 0.98) - 1
          this.metrics.INP = sorted[index] || 0
          this.reportMetric('INP', this.metrics.INP)
        }
      })
    })
  }

  private observeResourceTimings() {
    this.createObserver('resource', (entries) => {
      entries.forEach((entry) => {
        const resourceEntry = entry as PerformanceResourceTiming
        this.resourceTimings.push(resourceEntry)
        
        // 重要なリソースの監視
        if (this.isCriticalResource(resourceEntry.name)) {
          this.reportCriticalResource(resourceEntry)
        }
      })
    })
  }

  private observeNavigationTiming() {
    this.createObserver('navigation', (entries) => {
      const navEntry = entries[0] as PerformanceNavigationTiming
      this.navigationTiming = navEntry
      
      // TTFB計算
      this.metrics.TTFB = Math.round(
        navEntry.responseStart - navEntry.fetchStart
      )
      this.reportMetric('TTFB', this.metrics.TTFB)
      
      // その他の重要なタイミング
      this.reportNavigationMetrics(navEntry)
    })
  }

  private observeLongTasks() {
    if ('PerformanceObserver' in window && 'PerformanceLongTaskTiming' in window) {
      this.createObserver('longtask', (entries) => {
        entries.forEach((entry) => {
          console.warn('Long task detected:', {
            duration: entry.duration,
            startTime: entry.startTime,
            name: entry.name
          })
          this.reportLongTask(entry)
        })
      })
    }
  }

  private observeMemory() {
    if ('memory' in performance) {
      setInterval(() => {
        const memory = (performance as any).memory
        const memoryInfo = {
          usedJSHeapSize: Math.round(memory.usedJSHeapSize / 1048576),
          totalJSHeapSize: Math.round(memory.totalJSHeapSize / 1048576),
          jsHeapSizeLimit: Math.round(memory.jsHeapSizeLimit / 1048576)
        }
        
        // メモリ使用率が80%を超えたら警告
        const usage = memory.usedJSHeapSize / memory.jsHeapSizeLimit
        if (usage > 0.8) {
          console.warn('High memory usage detected:', memoryInfo)
          this.reportMemoryWarning(memoryInfo)
        }
      }, 10000) // 10秒ごとにチェック
    }
  }

  private observeNetwork() {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection
      
      // 初期ネットワーク情報
      this.reportNetworkInfo(connection)
      
      // ネットワーク変更を監視
      connection.addEventListener('change', () => {
        this.reportNetworkInfo(connection)
      })
    }
  }

  private createObserver(type: string, callback: PerformanceObserverCallback) {
    try {
      const observer = new PerformanceObserver(callback)
      observer.observe({ type, buffered: true })
      this.observers.set(type, observer)
    } catch (e) {
      // サポートされていないオブザーバータイプ
      console.debug(`PerformanceObserver for ${type} not supported`)
    }
  }

  private isCriticalResource(url: string): boolean {
    // クリティカルリソースの判定
    return (
      url.includes('/_next/static/css/') ||
      url.includes('/_next/static/chunks/main') ||
      url.includes('/_next/static/chunks/pages/_app') ||
      url.includes('/fonts/') ||
      url.includes('hero')
    )
  }

  private reportMetric(name: string, value: number | null) {
    if (value === null) return
    
    // コンソールに出力
    const rating = this.getRating(name, value)
    console.log(
      `%c[Performance] ${name}: ${value}ms (${rating})`,
      this.getConsoleStyle(rating)
    )
    
    // 分析エンドポイントに送信
    this.sendToAnalytics({
      metric: name,
      value,
      rating,
      timestamp: Date.now(),
      url: window.location.href,
      userAgent: navigator.userAgent
    })
  }

  private reportCriticalResource(entry: PerformanceResourceTiming) {
    const duration = Math.round(entry.responseEnd - entry.startTime)
    const size = entry.encodedBodySize || 0
    
    console.log(
      `%c[Critical Resource] ${entry.name.split('/').pop()}: ${duration}ms, ${Math.round(size / 1024)}KB`,
      'color: #10b981'
    )
  }

  private reportNavigationMetrics(entry: PerformanceNavigationTiming) {
    const metrics = {
      dnsLookup: Math.round(entry.domainLookupEnd - entry.domainLookupStart),
      tcpConnection: Math.round(entry.connectEnd - entry.connectStart),
      request: Math.round(entry.responseStart - entry.requestStart),
      response: Math.round(entry.responseEnd - entry.responseStart),
      domProcessing: Math.round(entry.domComplete - entry.domInteractive),
      onload: Math.round(entry.loadEventEnd - entry.loadEventStart)
    }
    
    console.table(metrics)
  }

  private reportLongTask(entry: PerformanceEntry) {
    this.sendToAnalytics({
      type: 'long-task',
      duration: entry.duration,
      startTime: entry.startTime,
      timestamp: Date.now(),
      url: window.location.href
    })
  }

  private reportMemoryWarning(memoryInfo: any) {
    this.sendToAnalytics({
      type: 'memory-warning',
      ...memoryInfo,
      timestamp: Date.now(),
      url: window.location.href
    })
  }

  private reportNetworkInfo(connection: any) {
    const networkInfo = {
      effectiveType: connection.effectiveType,
      downlink: connection.downlink,
      rtt: connection.rtt,
      saveData: connection.saveData
    }
    
    console.log('[Network Info]', networkInfo)
    
    // 低速接続の警告
    if (connection.effectiveType === '2g' || connection.effectiveType === 'slow-2g') {
      console.warn('Slow network detected. Optimizing for low bandwidth...')
      this.optimizeForSlowNetwork()
    }
  }

  private getRating(metric: string, value: number): 'good' | 'needs-improvement' | 'poor' {
    const thresholds: Record<string, [number, number]> = {
      FCP: [1800, 3000],
      LCP: [2500, 4000],
      FID: [100, 300],
      CLS: [0.1, 0.25],
      TTFB: [800, 1800],
      INP: [200, 500]
    }
    
    const [good, poor] = thresholds[metric] || [Infinity, Infinity]
    
    if (value <= good) return 'good'
    if (value <= poor) return 'needs-improvement'
    return 'poor'
  }

  private getConsoleStyle(rating: 'good' | 'needs-improvement' | 'poor'): string {
    switch (rating) {
      case 'good':
        return 'color: #10b981; font-weight: bold'
      case 'needs-improvement':
        return 'color: #f59e0b; font-weight: bold'
      case 'poor':
        return 'color: #ef4444; font-weight: bold'
    }
  }

  private sendToAnalytics(data: any) {
    // バッチング用のキュー
    if (!window.__performanceQueue) {
      window.__performanceQueue = []
    }
    
    window.__performanceQueue.push(data)
    
    // 5秒ごとにバッチ送信
    if (!window.__performanceBatchTimer) {
      window.__performanceBatchTimer = setTimeout(() => {
        this.flushAnalytics()
      }, 5000)
    }
  }

  private flushAnalytics() {
    if (!window.__performanceQueue || window.__performanceQueue.length === 0) {
      return
    }
    
    const batch = [...window.__performanceQueue]
    window.__performanceQueue = []
    window.__performanceBatchTimer = null
    
    // 分析エンドポイントに送信
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ metrics: batch }),
      keepalive: true
    }).catch(console.error)
  }

  private optimizeForSlowNetwork() {
    // 低速ネットワーク用の最適化
    document.body.classList.add('slow-network')
    
    // 画像の品質を下げる
    document.querySelectorAll('img').forEach((img) => {
      const src = img.src
      if (src.includes('q=')) {
        img.src = src.replace(/q=\d+/, 'q=50')
      }
    })
    
    // 自動再生を停止
    document.querySelectorAll('video').forEach((video) => {
      video.pause()
      video.removeAttribute('autoplay')
    })
  }

  public getMetrics(): PerformanceMetrics {
    return { ...this.metrics }
  }

  public destroy() {
    this.observers.forEach((observer) => observer.disconnect())
    this.observers.clear()
    
    if (window.__performanceBatchTimer) {
      clearTimeout(window.__performanceBatchTimer)
      this.flushAnalytics()
    }
  }
}

// グローバルインスタンス
declare global {
  interface Window {
    __performanceMonitor?: PerformanceMonitor
    __performanceQueue?: any[]
    __performanceBatchTimer?: NodeJS.Timeout
  }
}

// シングルトンインスタンスのエクスポート
export const performanceMonitor = typeof window !== 'undefined' 
  ? (window.__performanceMonitor || (window.__performanceMonitor = new PerformanceMonitor()))
  : null

export default performanceMonitor