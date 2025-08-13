'use client'

import Image from 'next/image'
import React, { useCallback, useMemo, useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import useIntersectionObserver from '@/hooks/useIntersectionObserver'
import Button from '@/components/ui/Button'
import dynamic from 'next/dynamic'

// 動的インポートで最適化されたImageSlider
const OptimizedImageSlider = dynamic(() => import('./ui/OptimizedImageSlider'), {
  loading: () => <div className="absolute inset-0 bg-gray-900" />,
  ssr: false
})

const Hero = () => {
  const [sectionRef, isVisible] = useIntersectionObserver({ 
    threshold: 0.1, 
    initialIsIntersecting: true 
  })
  
  // ニューロマーケティング：限定在庫カウントダウン
  const [stockCount, setStockCount] = useState(7)
  const [viewerCount, setViewerCount] = useState(23)
  
  // ヒーロー画像のリスト
  const heroImages = [
    '/images/products/home/S__83738739.jpg',
    '/images/products/home/S__83738740_0.jpg',
    '/images/products/home/S__83738742_0.jpg',
    '/images/products/home/S__83738743_0.jpg',
    '/images/products/home/S__83738744_0.jpg'
  ]
  
  useEffect(() => {
    // リアルタイム閲覧者数シミュレーション
    const interval = setInterval(() => {
      setViewerCount(prev => Math.max(15, prev + Math.floor(Math.random() * 7 - 3)))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const scrollToGallery = useCallback(() => {
    const element = document.getElementById('products')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])


  return (
    <section 
      ref={sectionRef}
      id="home" 
      className="relative h-screen text-white overflow-hidden"
      style={{ paddingTop: '60px' }}
    >
      {/* Image Background with Slider */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0" style={{ zIndex: 5 }}>
          <OptimizedImageSlider
            images={heroImages}
            alt="Vintage Iron Works - 職人の技術"
            className="w-full h-full"
            autoPlay={true}
            interval={3000}
            priority={true}
            preloadCount={2}
            objectFit="cover"
            showIndicators={true}
            showControls={false}
          />
        </div>
        {/* Enhanced overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" style={{ zIndex: 10 }} />
        <div className="absolute inset-0 bg-black/20" style={{ zIndex: 11 }} />
      </div>


      
      {/* Main content with enhanced animations */}
      <div className="relative z-20 text-center max-w-6xl px-6 mx-auto flex flex-col justify-center h-full">
        <div className={cn(
          'transition-all duration-1000',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}>
          

          {/* クリーンで高級感のあるヘッドライン */}
          <div className="mb-6 md:mb-8">
            <div className="inline-flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-amber-500/30 to-orange-500/30 backdrop-blur-md rounded-full border-2 border-amber-400/50 shadow-lg animate-pulse">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-amber-300" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              <span className="text-white font-bold text-xs sm:text-sm md:text-base tracking-wider uppercase">職人の技術と伝統</span>
            </div>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light mb-4 sm:mb-6 md:mb-8 tracking-tight text-white leading-tight px-2">
            <span className="block mb-1 sm:mb-2 md:mb-4 font-thin text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">最高品質の</span>
            <span className="block font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
              アイアン製品
            </span>
          </h1>

          {/* Psychological trigger: Social proof with neuroscience */}
          <div className="inline-flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-6 px-3 sm:px-4 py-2 bg-black/30 backdrop-blur-md rounded-full border border-white/20">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 border-2 border-white/50" />
              ))}
            </div>
            <span className="text-xs sm:text-sm text-white/90 font-medium">多数のお客様にご愛顧いただいています</span>
            <span className="text-amber-400 text-xs sm:text-sm">★★★★★</span>
          </div>

          {/* シンプルで洗練された価値提案 */}
          <div className="mb-8 sm:mb-12">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-light leading-relaxed max-w-3xl mx-auto text-gray-200 mb-4 sm:mb-8 px-4">
              熟練の職人技が生み出す、長く愛される品質と美しさ
            </p>
            
            {/* 控えめな社会的証明 */}
            <div className="flex justify-center gap-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full opacity-60" />
                <span>多数の実績</span>
              </div>
              <div className="flex items-center gap-2">
                <span>★★★★★</span>
                <span>高評価</span>
              </div>
            </div>
          </div>

          {/* 洗練されたCTA */}
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
              <Button
                variant="primary"
                size="lg"
                onClick={scrollToGallery}
                className="w-full sm:w-auto bg-white text-black hover:bg-gray-100 px-6 sm:px-8 py-3 sm:py-4 font-medium tracking-wide transition-all duration-300 hover:scale-105 text-sm sm:text-base"
              >
                作品を見る
              </Button>
              
              <Button
                variant="outline"
                size="md"
                className="w-full sm:w-auto border-white/40 text-white hover:bg-white/10 text-sm sm:text-base"
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              >
                職人について
              </Button>
            </div>

            
            {/* 信頼性指標 - より目立つように */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 md:gap-6 px-2 sm:px-4">
              <div className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1 sm:py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/30">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                  <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                </svg>
                <span className="text-xs sm:text-sm md:text-base text-white font-medium">全国配送対応</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1 sm:py-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-sm rounded-full border border-amber-400/50 shadow-md">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                <span className="text-xs sm:text-sm md:text-base text-white font-bold">オーダーメイド可</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

Hero.displayName = 'Hero'

export default Hero