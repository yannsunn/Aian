'use client'

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface OptimizedImageSliderProps {
  images: string[]
  alt: string
  className?: string
  autoPlay?: boolean
  interval?: number
  priority?: boolean
  preloadCount?: number
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
  showIndicators?: boolean
  showControls?: boolean
}

const OptimizedImageSlider: React.FC<OptimizedImageSliderProps> = React.memo(({ 
  images, 
  alt, 
  className, 
  autoPlay = false, 
  interval = 5000,
  priority = false,
  preloadCount = 2,
  objectFit = 'contain',
  showIndicators = true,
  showControls = true
}) => {
  // 初期表示は必ず0番目（1枚目）から始める - 強制的に0を設定
  const [currentIndex, setCurrentIndex] = useState(() => 0)
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set([0]))
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [isZoomed, setIsZoomed] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout>()
  const observerRef = useRef<IntersectionObserver>()
  const containerRef = useRef<HTMLDivElement>(null)
  
  // 画像配列が変更された時に確実に0番目を表示
  useEffect(() => {
    setCurrentIndex(0)
    setLoadedImages(new Set([0]))
  }, [images.length, images[0]]) // 画像の数または最初の画像が変わった時のみリセット
  
  // プリロード戦略
  useEffect(() => {
    const preloadIndices = []
    for (let i = 1; i <= preloadCount; i++) {
      const nextIndex = (currentIndex + i) % images.length
      preloadIndices.push(nextIndex)
    }
    
    preloadIndices.forEach(index => {
      if (!loadedImages.has(index)) {
        const img = new window.Image()
        img.src = images[index]
        img.onload = () => {
          setLoadedImages(prev => new Set([...prev, index]))
        }
      }
    })
  }, [currentIndex, images, preloadCount, loadedImages])

  // Navigation functions with preloading
  const goToPrevious = useCallback(() => {
    setCurrentIndex(prev => {
      const newIndex = prev === 0 ? images.length - 1 : prev - 1
      return newIndex
    })
  }, [images.length])

  const goToNext = useCallback(() => {
    setCurrentIndex(prev => {
      const newIndex = prev === images.length - 1 ? 0 : prev + 1
      return newIndex
    })
  }, [images.length])

  const goToSlide = useCallback((slideIndex: number) => {
    setCurrentIndex(slideIndex)
  }, [])
  
  // Optimized auto-play with Intersection Observer
  useEffect(() => {
    if (!containerRef.current) return

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting && autoPlay && images.length > 1) {
          // 初回表示時は少し遅延を入れてから自動再生を開始
          setTimeout(() => {
            intervalRef.current = setInterval(goToNext, interval)
          }, 500)
        } else {
          if (intervalRef.current) {
            clearInterval(intervalRef.current)
          }
        }
      },
      { threshold: 0.5 }
    )

    observerRef.current.observe(containerRef.current)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (observerRef.current) observerRef.current.disconnect()
    }
  }, [autoPlay, interval, images.length, goToNext])

  // Touch handlers with performance optimization
  const minSwipeDistance = 50

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }, [])

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }, [])

  const onTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance
    if (isLeftSwipe) goToNext()
    if (isRightSwipe) goToPrevious()
  }, [touchStart, touchEnd, goToNext, goToPrevious])

  // Keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') goToPrevious()
    if (e.key === 'ArrowRight') goToNext()
    if (e.key === 'Escape' && isZoomed) setIsZoomed(false)
  }, [goToPrevious, goToNext, isZoomed])

  // Memoized image sizes for responsive loading
  const imageSizes = useMemo(() => ({
    default: "(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px",
    thumbnail: "(max-width: 640px) 33vw, (max-width: 768px) 25vw, 16vw"
  }), [])

  if (!images || images.length === 0) {
    return (
      <div className={cn("w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-white", className)}>
        <div className="text-center">
          <div className="w-14 h-14 mx-auto mb-3 animate-pulse">
            <svg className="w-full h-full text-amber-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
            </svg>
          </div>
          <h3 className="text-lg font-bold">アイアン製品</h3>
          <p className="text-sm text-gray-300">画像準備中</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div 
        ref={containerRef}
        className={cn("relative w-full h-full overflow-hidden group", className)}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        role="region"
        aria-label="画像スライダー"
        aria-roledescription="carousel"
      >
        {/* Main Image with Next.js Image optimization */}
        <div className="relative w-full h-full">
          <Image
            src={images[currentIndex]}
            alt={`${alt} - ${currentIndex + 1}/${images.length}`}
            fill
            className={cn(
              objectFit === 'cover' ? 'object-cover' : 
              objectFit === 'contain' ? 'object-contain' :
              objectFit === 'fill' ? 'object-fill' :
              objectFit === 'none' ? 'object-none' :
              'object-scale-down',
              'transition-opacity duration-500'
            )}
            sizes={imageSizes.default}
            priority={priority || currentIndex === 0}
            quality={85}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwABmX/9k="
            onClick={() => setIsZoomed(true)}
            onLoad={() => setLoadedImages(prev => new Set([...prev, currentIndex]))}
          />
        </div>

        {/* Enhanced Navigation */}
        {images.length > 1 && showControls && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/90 backdrop-blur-sm text-gray-800 p-2 rounded-full opacity-0 group-hover:opacity-100 hover:bg-white hover:scale-110 transition-all duration-300 z-30 shadow-lg"
              aria-label="前の画像"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
            </button>
            
            <button
              onClick={goToNext}
              className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/90 backdrop-blur-sm text-gray-800 p-2 rounded-full opacity-0 group-hover:opacity-100 hover:bg-white hover:scale-110 transition-all duration-300 z-30 shadow-lg"
              aria-label="次の画像"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.25 4.5 15.75 12l-7.5 7.5" />
              </svg>
            </button>

            {/* Progress Indicators */}
            {showIndicators && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-30">
                {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    currentIndex === index 
                      ? "w-8 bg-white shadow-lg" 
                      : "bg-white/50 hover:bg-white/70"
                  )}
                  aria-label={`画像 ${index + 1}`}
                  aria-current={currentIndex === index}
                />
                ))}
              </div>
            )}

            {/* Image Counter */}
            <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium z-30">
              {currentIndex + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {/* Optimized Zoom Modal with Portal */}
      {isZoomed && (
        <div 
          className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setIsZoomed(false)}
          role="dialog"
          aria-modal="true"
          aria-label="拡大画像"
        >
          <div className="relative max-w-[95vw] max-h-[95vh]">
            <Image
              src={images[currentIndex]}
              alt={`${alt} - 拡大表示`}
              width={1920}
              height={1080}
              className="max-w-full max-h-full object-contain"
              quality={90}
              priority
            />
            
            <button
              onClick={() => setIsZoomed(false)}
              className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-800 p-2 rounded-full hover:bg-white transition-all"
              aria-label="閉じる"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    goToPrevious()
                  }}
                  className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/90 backdrop-blur-sm text-gray-800 p-3 rounded-full hover:bg-white transition-all"
                  aria-label="前の画像"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.75 19.5 8.25 12l7.5-7.5" />
                  </svg>
                </button>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    goToNext()
                  }}
                  className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/90 backdrop-blur-sm text-gray-800 p-3 rounded-full hover:bg-white transition-all"
                  aria-label="次の画像"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.25 4.5 15.75 12l-7.5 7.5" />
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
})

OptimizedImageSlider.displayName = 'OptimizedImageSlider'

export default OptimizedImageSlider