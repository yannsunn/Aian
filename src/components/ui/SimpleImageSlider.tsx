'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface SimpleImageSliderProps {
  images: string[]
  alt: string
  className?: string
}

const SimpleImageSlider: React.FC<SimpleImageSliderProps> = ({ 
  images, 
  alt, 
  className
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToPrevious = () => {
    setCurrentIndex(prev => prev === 0 ? images.length - 1 : prev - 1)
  }

  const goToNext = () => {
    setCurrentIndex(prev => prev === images.length - 1 ? 0 : prev + 1)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  if (!images || images.length === 0) {
    return (
      <div className={cn("w-full h-full bg-gray-200 flex items-center justify-center", className)}>
        <p className="text-gray-500">画像がありません</p>
      </div>
    )
  }

  return (
    <div className={cn("relative w-full h-full overflow-hidden group", className)}>
      {/* メイン画像 */}
      <div className="relative w-full h-full">
        <Image
          src={images[currentIndex]}
          alt={`${alt} - ${currentIndex + 1}/${images.length}`}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          priority={currentIndex === 0}
        />
      </div>

      {/* ナビゲーション */}
      {images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/80 text-gray-800 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-30"
            aria-label="前の画像"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </button>
          
          <button
            onClick={goToNext}
            className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/80 text-gray-800 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-30"
            aria-label="次の画像"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.25 4.5 15.75 12l-7.5 7.5" />
            </svg>
          </button>

          {/* インジケーター */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all",
                  currentIndex === index 
                    ? "w-8 bg-white" 
                    : "bg-white/50 hover:bg-white/70"
                )}
                aria-label={`画像 ${index + 1}`}
              />
            ))}
          </div>

          {/* カウンター */}
          <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm z-30">
            {currentIndex + 1} / {images.length}
          </div>
        </>
      )}
    </div>
  )
}

export default SimpleImageSlider