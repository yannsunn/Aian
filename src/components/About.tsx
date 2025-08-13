'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import useIntersectionObserver from '@/hooks/useIntersectionObserver'
import Card from '@/components/ui/Card'

interface AboutItem {
  icon: React.ReactNode
  title: string
  description: string
  highlight?: string
}

const About = () => {
  const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.1 })
  
  const aboutItems: AboutItem[] = [
    {
      icon: (
        <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: '確かな歴史と伝統',
      description: '創業以来、職人の技術と伝統を大切に、最高品質のアイアン製品を提供し続けています。',
      highlight: '豊富な実績'
    },
    {
      icon: (
        <svg className="w-12 h-12 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      title: '確かな技術力',
      description: '熟練の職人による手作業と最新の製造設備を組み合わせ、精密で美しい製品を生み出しています。',
      highlight: '職人の技'
    },
    {
      icon: (
        <svg className="w-12 h-12 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      title: '品質へのこだわり',
      description: '厳選された素材と徹底した品質管理により、長くご愛用いただける製品づくりを心がけています。',
      highlight: '最高品質'
    },
    {
      icon: (
        <svg className="w-12 h-12 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: 'お客様との信頼関係',
      description: 'お客様一人一人のニーズに寄り添い、期待を超える製品とサービスを提供することを目指しています。',
      highlight: '高い満足度'
    }
  ]

  return (
    <section ref={sectionRef} id="about" className="py-32 bg-slate-50">
      <div className="container-custom">
        {/* Section Header */}
        <div className={cn(
          'text-center mb-20 transition-all duration-1000',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}>
          <div className="inline-block">
            <h2 className="text-6xl font-bold text-slate-900 mb-6 tracking-tight">
              会社概要
            </h2>
            <div className="h-1 w-24 mx-auto bg-blue-600 rounded-full shadow-lg" />
          </div>
          <p className="text-xl text-slate-600 mt-8 max-w-3xl mx-auto leading-relaxed">
            長年にわたりアイアン家具製作の最前線で
            <span className="text-blue-600 font-semibold">職人の技と革新</span>
            を追求し続けています
          </p>
        </div>

        {/* Philosophy Section */}
        <div className={cn(
          'mb-20 transition-all duration-1000',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        )}>
          <Card variant="premium" className="p-12 text-center">
            <div className="absolute inset-0 bg-blue-50 rounded-3xl" />
            <div className="relative z-10">
              <h3 className="text-4xl font-bold text-slate-900 mb-6">
                企業理念
              </h3>
              <blockquote className="text-2xl text-slate-700 font-light italic leading-relaxed max-w-4xl mx-auto">
                「鉄に魂を込めて、お客様の想いを形にする」
                <br />
                <span className="text-lg text-slate-600 not-italic mt-4 block">
                  私たちは単なるアイアン製品メーカーではありません。
                  お客様の夢と想いを、職人の技術で形にする
                  <span className="text-blue-600 font-semibold">クリエイティブパートナー</span>
                  です。
                </span>
              </blockquote>
            </div>
          </Card>
        </div>

        {/* Company Values Grid */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {aboutItems.map((item, index) => (
              <Card
                key={index}
                variant="premium"
                className={cn(
                  'p-8 text-center hover-lift group transition-all duration-700',
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                )}
                style={{ 
                  transitionDelay: `${index * 150 + 200}ms`,
                }}
              >
                <div className="mb-6 flex justify-center">
                  <div className="p-4 bg-slate-100 rounded-2xl group-hover:bg-blue-50 transition-colors duration-300">
                    {item.icon}
                  </div>
                </div>
                
                {item.highlight && (
                  <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full mb-4">
                    {item.highlight}
                  </div>
                )}
                
                <h3 className="text-xl font-bold mb-4 text-slate-800 group-hover:text-blue-900 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors duration-300">
                  {item.description}
                </p>
                
                {/* Animated bottom accent */}
                <div className="mt-6 h-0.5 w-0 bg-blue-600 group-hover:w-full transition-all duration-500 rounded-full mx-auto" />
              </Card>
            ))}
          </div>
        </div>

        {/* Mission & Vision Section */}
        <div className={cn(
          'mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12 transition-all duration-1000',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        )}>
          {/* Mission */}
          <Card variant="premium" className="p-10 text-center">
            <div className="absolute inset-0 bg-emerald-50 rounded-3xl" />
            <div className="relative z-10">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-4">
                ミッション
              </h3>
              <p className="text-lg text-slate-700 leading-relaxed">
                最高品質のアイアン製品を通じて、お客様の生活空間に
                <span className="text-emerald-600 font-semibold">美しさと機能性</span>
                をもたらし、永く愛される製品を創造し続けます。
              </p>
            </div>
          </Card>

          {/* Vision */}
          <Card variant="premium" className="p-10 text-center">
            <div className="absolute inset-0 bg-amber-50 rounded-3xl" />
            <div className="relative z-10">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-4">
                ビジョン
              </h3>
              <p className="text-lg text-slate-700 leading-relaxed">
                日本最高峰のオーダーメイドアイアン工房として、
                <span className="text-amber-600 font-semibold">伝統技術と革新</span>
                を融合し、世界に誇れるものづくりを追求します。
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}

About.displayName = 'About'

export default About