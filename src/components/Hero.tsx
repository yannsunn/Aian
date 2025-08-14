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
  
  // ヒーロー画像のリスト
  const heroImages = [
    '/images/products/home/S__83738740_0.jpg',
    '/images/products/home/S__83738742_0.jpg',
    '/images/products/home/S__83738743_0.jpg',
    '/images/products/home/S__83738744_0.jpg'
  ]
  

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
          

          {/* シンプルで職人らしいヘッドライン */}
          <div className="mb-6 md:mb-8">
            <div className="inline-flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 px-4 sm:px-6 py-2 sm:py-3 bg-amber-900/20 backdrop-blur-md rounded border border-amber-700/30">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
              <span className="text-amber-200 font-medium text-base sm:text-lg md:text-xl tracking-wide">職人の技術と伝統</span>
            </div>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light mb-4 sm:mb-6 md:mb-8 tracking-tight text-white leading-tight px-2">
            <span className="block mb-1 sm:mb-2 md:mb-4 font-light text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-amber-200">職人が作る</span>
            <span className="block font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
              アイアン製品
            </span>
          </h1>


          {/* 職人の価値観を強調した価値提案 */}
          <div className="mb-8 sm:mb-12">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-light leading-relaxed max-w-3xl mx-auto text-gray-200 mb-4 sm:mb-8 px-4">
              一つ一つ心を込めて作り上げる、<br />
              本物のアイアン製品
            </p>
            
            {/* 職人の価値観 */}
            <div className="flex justify-center gap-8 text-base sm:text-lg md:text-xl text-amber-200">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-amber-500 rounded-full" />
                <span>伝統の技術</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-amber-500 rounded-full" />
                <span>手作りの温かみ</span>
              </div>
            </div>
          </div>

          {/* 職人らしいシンプルCTA */}
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
              <Button
                variant="primary"
                size="lg"
                onClick={scrollToGallery}
                className="w-full sm:w-auto bg-amber-600 text-white hover:bg-amber-700 px-6 sm:px-8 py-3 sm:py-4 font-medium tracking-wide transition-all duration-300 hover:scale-105 text-base sm:text-lg md:text-xl border border-amber-500"
              >
                作品を見る
              </Button>
              
              <Button
                variant="outline"
                size="md"
                className="w-full sm:w-auto border-amber-400/60 text-amber-200 hover:bg-amber-900/30 text-base sm:text-lg md:text-xl"
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              >
                職人について
              </Button>
            </div>

            
            {/* 職人のサービス指標 */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 md:gap-6 px-2 sm:px-4">
              <div className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1 sm:py-2 bg-amber-900/20 backdrop-blur-sm rounded border border-amber-700/40">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                  <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                </svg>
                <span className="text-base sm:text-lg md:text-xl text-amber-200 font-medium">全国配送対応</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1 sm:py-2 bg-amber-900/20 backdrop-blur-sm rounded border border-amber-700/40">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                <span className="text-base sm:text-lg md:text-xl text-amber-200 font-medium">オーダーメイド可</span>
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