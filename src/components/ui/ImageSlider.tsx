'use client'

import React, { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface ImageSliderProps {
  images: string[]
  alt: string
  className?: string
  width?: number
  height?: number
  autoPlay?: boolean
  interval?: number
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images, alt, className, autoPlay = false, interval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set())
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [isZoomed, setIsZoomed] = useState(false)
  
  const handleImageError = (index: number) => {
    setImageErrors(prev => new Set([...prev, index]))
  }

  // Navigation functions
  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
  }

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1
    const newIndex = isLastSlide ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
  }
  
  // Auto-play functionality
  useEffect(() => {
    if (autoPlay && images.length > 1) {
      const timer = setInterval(() => {
        goToNext()
      }, interval)
      return () => clearInterval(timer)
    }
    return undefined
  }, [currentIndex, autoPlay, interval, images.length])

  // スワイプ処理
  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance
    if (isLeftSwipe) goToNext()
    if (isRightSwipe) goToPrevious()
  }

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex)
  }

  if (!images || images.length === 0) {
    return (
      <div className={cn("w-full h-full bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 flex items-center justify-center text-white relative overflow-hidden", className)}>
        <div 
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `
              linear-gradient(45deg, #4a5568 25%, transparent 25%), 
              linear-gradient(-45deg, #4a5568 25%, transparent 25%), 
              linear-gradient(45deg, transparent 75%, #4a5568 75%), 
              linear-gradient(-45deg, transparent 75%, #4a5568 75%)
            `,
            backgroundSize: '30px 30px',
            backgroundPosition: '0 0, 0 15px, 15px -15px, -15px 0px'
          }}
        />
        <div className="text-center relative z-10">
          <div className="mb-3">
            <svg className="w-14 h-14 mx-auto text-amber-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
              <path d="M12 6.5l-7 3v7c0 3.78 2.58 6.75 7 7.5 4.42-.75 7-3.72 7-7.5v-7l-7-3z" fill="rgba(251, 191, 36, 0.3)"/>
            </svg>
          </div>
          <h3 className="text-lg font-bold mb-1">アイアン製品</h3>
          <p className="text-sm text-gray-300 mb-3">職人による手作り</p>
          <div className="inline-flex items-center text-xs text-gray-400">
            <div className="animate-spin mr-2">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
                <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" fill="currentColor"/>
              </svg>
            </div>
            画像準備中
          </div>
        </div>
      </div>
    )
  }

  return (
    <div 
      className={cn("relative w-full h-full overflow-hidden", className)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') goToPrevious()
        if (e.key === 'ArrowRight') goToNext()
      }}
    >
      {/* Image with fallback */}
      <div className="relative w-full h-full">
        {imageErrors.has(currentIndex) ? (
          <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white relative overflow-hidden">
            <div 
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `
                  linear-gradient(45deg, #4a5568 25%, transparent 25%), 
                  linear-gradient(-45deg, #4a5568 25%, transparent 25%), 
                  linear-gradient(45deg, transparent 75%, #4a5568 75%), 
                  linear-gradient(-45deg, transparent 75%, #4a5568 75%)
                `,
                backgroundSize: '30px 30px',
                backgroundPosition: '0 0, 0 15px, 15px -15px, -15px 0px'
              }}
            />
            <div className="text-center relative z-10">
              <svg className="w-12 h-12 mx-auto mb-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
              <p className="text-sm text-gray-300">アイアン製品画像</p>
            </div>
          </div>
        ) : (
          <img
            src={images[currentIndex]}
            alt={alt}
            className="w-full h-full object-contain bg-white transition-all duration-500 cursor-zoom-in hover:scale-105"
            onError={() => handleImageError(currentIndex)}
            onLoad={() => setIsImageLoaded(true)}
            onClick={() => setIsZoomed(true)}
          />
        )}
      </div>

      {/* Enhanced Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              goToPrevious()
            }}
            className="absolute top-1/2 left-1 -translate-y-1/2 bg-white/90 text-gray-800 p-1.5 sm:p-2 rounded-full hover:bg-white hover:scale-110 transition-all duration-300 z-30 shadow-md border border-white/40"
            aria-label="前の画像"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3 sm:w-4 sm:h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              goToNext()
            }}
            className="absolute top-1/2 right-1 -translate-y-1/2 bg-white/90 text-gray-800 p-1.5 sm:p-2 rounded-full hover:bg-white hover:scale-110 transition-all duration-300 z-30 shadow-md border border-white/40"
            aria-label="次の画像"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3 sm:w-4 sm:h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5 15.75 12l-7.5 7.5" />
            </svg>
          </button>
        </>
      )}

      {/* Enhanced Navigation */}
      {images.length > 1 && (
        <>
          {/* Minimized Dots Indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1.5 z-30 bg-black/50 px-2 py-1 rounded-full backdrop-blur-sm">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  goToSlide(index)
                }}
                className={cn(
                  "w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 hover:scale-125",
                  currentIndex === index 
                    ? "scale-125 bg-white shadow-sm" 
                    : "bg-white/60 hover:bg-white/80"
                )}
                aria-label={`画像 ${index + 1} に移動`}
              />
            ))}
          </div>
          
          {/* Minimized Image Counter */}
          <div className="absolute top-2 right-2 bg-white/85 text-gray-700 px-2 py-0.5 rounded text-xs font-medium backdrop-blur-sm shadow-sm border border-white/40 z-30">
            {currentIndex + 1}/{images.length}
          </div>
          
          {/* Zoom Hint */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/80 text-xs z-20 hidden sm:block">
            <div className="flex items-center gap-1 bg-black/50 px-2 py-0.5 rounded backdrop-blur-sm">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
              <span className="text-xs">クリックで拡大</span>
            </div>
          </div>
        </>
      )}
      
      {/* Zoom Modal */}
      {isZoomed && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setIsZoomed(false)}
        >
          <div className="relative max-w-[95vw] max-h-[95vh]">
            <img
              src={images[currentIndex]}
              alt={alt}
              className="max-w-full max-h-full object-contain cursor-zoom-out"
              onClick={(e) => {
                e.stopPropagation()
                setIsZoomed(false)
              }}
            />
            <button
              onClick={() => setIsZoomed(false)}
              className="absolute top-2 right-2 bg-white/80 text-gray-800 p-2 rounded-full hover:bg-white transition-all shadow-lg"
              aria-label="画像を閉じる"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Zoom Navigation */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    goToPrevious()
                  }}
                  className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/80 text-gray-800 p-3 rounded-full hover:bg-white transition-all shadow-lg"
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
                  className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/80 text-gray-800 p-3 rounded-full hover:bg-white transition-all shadow-lg"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.25 4.5 15.75 12l-7.5 7.5" />
                  </svg>
                </button>
              </>
            )}
            
            {/* Zoom Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/80 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
              {currentIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ImageSlider 