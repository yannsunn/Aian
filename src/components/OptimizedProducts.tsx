'use client'

import Image from 'next/image'
import React, { useState, useCallback, useMemo, memo } from 'react'
import { cn } from '@/lib/utils'
import useIntersectionObserver from '@/hooks/useIntersectionObserver'
import dynamic from 'next/dynamic'

// 動的インポートで最適化されたImageSlider
const OptimizedImageSlider = dynamic(() => import('./ui/OptimizedImageSlider'), {
  loading: () => <div className="aspect-video bg-gray-200 animate-pulse rounded-lg" />,
  ssr: false
})

interface Category {
  id: string
  name: string
  description: string
  images: string[]
}

const categories: Category[] = [
  {
    id: 'home',
    name: '住宅施工',
    description: '住宅に設置するアイアン製品の施工例',
    images: [
      '/images/products/home/S__83738760.jpg',  // 1枚目（新しい画像）
      '/images/products/home/S__83738739.jpg',
      '/images/products/home/S__83738740_0.jpg',
      '/images/products/home/S__83738742_0.jpg',
      '/images/products/home/S__83738743_0.jpg',
      '/images/products/home/S__83738744_0.jpg',
      '/images/products/home/S__83738745_0.jpg',
      '/images/products/home/S__83738746_0.jpg',
      '/images/products/home/S__83738747_0.jpg',
      '/images/products/home/S__83738748_0.jpg'
    ]
  },
  {
    id: 'retrofit',
    name: '後付け可能製品',
    description: '既存の建物に後から設置できる製品',
    images: [
      '/images/products/retrofit/S__83738749_0.jpg',
      '/images/products/retrofit/S__83738751_0.jpg',
      '/images/products/retrofit/S__83738752_0.jpg',
      '/images/products/retrofit/S__83738753_0.jpg',
      '/images/products/retrofit/S__83738755_0.jpg'
    ]
  },
  {
    id: 'outdoor',
    name: 'アウトドア',
    description: 'アウトドアで使用できる製品',
    images: [
      '/images/products/outdoor/S__83738756_0.jpg',
      '/images/products/outdoor/S__83738758_0.jpg',
      '/images/products/outdoor/S__83738759_0.jpg'
    ]
  },
  {
    id: 'custom',
    name: '受注生産',
    description: 'お客様のご要望に合わせた完全オーダーメイド製品',
    images: [
      '/images/products/custom-order/S__83738761.jpg'
    ]
  }
]

// メモ化されたカテゴリータブコンポーネント
const CategoryTab = memo(({ 
  category, 
  isSelected, 
  onClick 
}: { 
  category: Category
  isSelected: boolean
  onClick: () => void 
}) => (
  <button
    onClick={onClick}
    className={cn(
      "px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105",
      isSelected
        ? "bg-gray-900 text-white shadow-lg scale-105"
        : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
    )}
    aria-pressed={isSelected}
  >
    {category.name}
  </button>
))

CategoryTab.displayName = 'CategoryTab'

// メモ化されたサムネイルギャラリーコンポーネント
const ThumbnailGallery = memo(({ 
  images, 
  categoryName 
}: { 
  images: string[]
  categoryName: string 
}) => {
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set())

  const handleImageLoad = useCallback((index: number) => {
    setLoadedImages(prev => new Set([...prev, index]))
  }, [])

  if (images.length <= 1) return null

  return (
    <div className="mt-8 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
      {images.map((image, index) => (
        <div
          key={`${categoryName}-thumb-${index}`}
          className="relative aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity group"
        >
          {!loadedImages.has(index) && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          )}
          <Image
            src={image}
            alt={`${categoryName} ${index + 1}`}
            fill
            className={cn(
              "object-cover transition-opacity duration-300",
              loadedImages.has(index) ? "opacity-100" : "opacity-0"
            )}
            sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, 16vw"
            loading="lazy"
            onLoad={() => handleImageLoad(index)}
          />
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity" />
        </div>
      ))}
    </div>
  )
})

ThumbnailGallery.displayName = 'ThumbnailGallery'

// メイン最適化Productsコンポーネント
const OptimizedProducts = memo(() => {
  const [sectionRef, isVisible] = useIntersectionObserver({ 
    threshold: 0.1,
    rootMargin: '50px'
  })
  const [selectedCategory, setSelectedCategory] = useState<string>('home')
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  // メモ化された現在のカテゴリー
  const currentCategory = useMemo(
    () => categories.find(cat => cat.id === selectedCategory) || categories[0],
    [selectedCategory]
  )

  // メモ化されたカテゴリー選択ハンドラー
  const handleCategorySelect = useCallback((categoryId: string) => {
    setSelectedCategory(categoryId)
    // カテゴリー変更時にプリロード
    const category = categories.find(cat => cat.id === categoryId)
    if (category && category.images.length > 0) {
      const img = new window.Image()
      img.src = category.images[0]
    }
  }, [])

  // 自動再生トグルハンドラー
  const handleAutoPlayToggle = useCallback(() => {
    setIsAutoPlay(prev => !prev)
  }, [])

  // コンタクトセクションへのスクロール
  const scrollToContact = useCallback(() => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <section 
      id="products" 
      ref={sectionRef} 
      className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white"
      aria-label="製品ギャラリー"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* セクションヘッダー */}
        <div className={cn(
          "text-center mb-8 sm:mb-12 md:mb-16 transition-all duration-1000 delay-100",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>
          <div className="inline-flex items-center gap-2 mb-3 sm:mb-4 px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-100 rounded-full">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
            </svg>
            <span className="text-gray-700 font-medium text-xs sm:text-sm">コレクション</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-4 sm:mb-6">
            <span className="font-thin text-gray-800">製品</span>
            <span className="block mt-1 sm:mt-2 font-bold text-gray-900">
              ギャラリー
            </span>
          </h2>
          
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
            長年の経験と精密な技術が生み出す、唯一無二のアイアン作品
          </p>
        </div>

        {/* カテゴリータブ - 仮想スクロール対応 */}
        <div 
          className="flex flex-wrap justify-center gap-2 mb-6 sm:mb-8 md:mb-12 overflow-x-auto pb-2 px-2 sm:px-0"
          role="tablist"
        >
          {categories.map((category) => (
            <CategoryTab
              key={category.id}
              category={category}
              isSelected={selectedCategory === category.id}
              onClick={() => handleCategorySelect(category.id)}
            />
          ))}
        </div>

        {/* カテゴリー説明 */}
        <div className="text-center mb-8">
          <p className="text-gray-600 animate-fade-in">{currentCategory.description}</p>
        </div>

        {/* 画像ギャラリー */}
        <div className={cn(
          "max-w-6xl mx-auto transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>
          {/* スライダーコントロール */}
          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={handleAutoPlayToggle}
              className={cn(
                "px-4 py-2 rounded-lg font-medium transition-all transform hover:scale-105",
                isAutoPlay
                  ? "bg-green-100 text-green-700 border border-green-300"
                  : "bg-gray-100 text-gray-700 border border-gray-300"
              )}
              aria-label={isAutoPlay ? '自動再生を停止' : '自動再生を開始'}
            >
              {isAutoPlay ? '自動再生 ON' : '自動再生 OFF'}
            </button>
          </div>

          {/* メイン画像スライダー */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gray-100">
            <div className="relative aspect-[16/10] md:aspect-[16/9]">
              <OptimizedImageSlider
                images={currentCategory.images}
                alt={currentCategory.name}
                className="w-full h-full"
                autoPlay={isAutoPlay}
                interval={2000}
                priority={selectedCategory === 'home'}
                preloadCount={2}
                objectFit="contain"
              />
            </div>
          </div>

          {/* サムネイルギャラリー */}
          <ThumbnailGallery 
            images={currentCategory.images} 
            categoryName={currentCategory.name}
          />
        </div>

        {/* お問い合わせセクション */}
        <div className={cn(
          "mt-20 p-12 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl text-center transition-all duration-1000 text-white transform hover:scale-[1.02]",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}
        style={{ transitionDelay: "400ms" }}
        >
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">
              ご興味のある製品はございましたか？
            </h3>
            <p className="text-xl mb-8 text-gray-300">
              すべての製品はオーダーメイドでの製作も承っております。<br />
              お気軽にお問い合わせください。
            </p>
            
            <button
              onClick={scrollToContact}
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-900 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              aria-label="お問い合わせフォームへ移動"
            >
              <span>お問い合わせ・ご相談</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
})

OptimizedProducts.displayName = 'OptimizedProducts'

export default OptimizedProducts