'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import useIntersectionObserver from '@/hooks/useIntersectionObserver'
import ImageSlider from './ui/ImageSlider'

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
      '/images/products/custom-order/S__83738760.jpg',  // 1枚目
      '/images/products/custom-order/S__83738761.jpg'   // 2枚目
    ]
  }
]

const Products = () => {
  const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.1 })
  const [selectedCategory, setSelectedCategory] = useState<string>('home')
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  const currentCategory = categories.find(cat => cat.id === selectedCategory) || categories[0]

  return (
    <section id="products" ref={sectionRef} className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6">
        {/* セクションヘッダー */}
        <div className={cn(
          "text-center mb-16 transition-all duration-1000",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-gray-100 rounded">
            <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
            </svg>
            <span className="text-gray-700 font-medium text-sm">コレクション</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-light mb-6">
            <span className="font-thin text-gray-800">製品</span>
            <span className="block mt-2 font-bold text-gray-900">
              ギャラリー
            </span>
          </h2>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            長年の経験と精密な技術が生み出す、唯一無二のアイアン作品
          </p>
        </div>

        {/* カテゴリータブ */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={cn(
                "px-6 py-3 rounded-full font-medium transition-all duration-300",
                selectedCategory === category.id
                  ? "bg-gray-900 text-white shadow-lg scale-105"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              )}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* カテゴリー説明 */}
        <div className="text-center mb-8">
          <p className="text-gray-600">{currentCategory.description}</p>
        </div>

        {/* 画像ギャラリー */}
        <div className={cn(
          "max-w-6xl mx-auto transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>
          {/* スライダーコントロール */}
          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className={cn(
                "px-4 py-2 rounded-lg font-medium transition-all",
                isAutoPlay
                  ? "bg-green-100 text-green-700 border border-green-300"
                  : "bg-gray-100 text-gray-700 border border-gray-300"
              )}
            >
              {isAutoPlay ? '自動再生 ON' : '自動再生 OFF'}
            </button>
          </div>

          {/* メイン画像スライダー */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gray-100">
            <div className="relative aspect-[16/10] md:aspect-[16/9]">
              <ImageSlider
                images={currentCategory.images}
                alt={currentCategory.name}
                className="w-full h-full object-contain"
                autoPlay={isAutoPlay}
                interval={3000}
              />
            </div>
          </div>

          {/* サムネイルギャラリー */}
          {currentCategory.images.length > 1 && (
            <div className="mt-8 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
              {currentCategory.images.map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <Image
                    src={image}
                    alt={`${currentCategory.name} ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, 16vw"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* お問い合わせセクション */}
        <div className={cn(
          "mt-20 p-12 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl text-center transition-all duration-1000 text-white",
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
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-900 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300 hover:scale-105"
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
}

export default Products