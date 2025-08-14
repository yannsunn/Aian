import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import Header from '../components/Header'
import StructuredData from '../components/StructuredData'

// 動的インポートでコード分割とプリロード戦略
const Hero = dynamic(() => import('../components/Hero'), {
  loading: () => <HeroSkeleton />,
  ssr: true,
})

const Products = dynamic(() => import('../components/Products'), {
  loading: () => <ProductsSkeleton />,
  ssr: true,
})

const About = dynamic(() => import('../components/About'), {
  loading: () => <SectionSkeleton />,
  ssr: false,
})

const Contact = dynamic(() => import('../components/Contact'), {
  loading: () => <SectionSkeleton />,
  ssr: false,
})

const Footer = dynamic(() => import('../components/Footer'), {
  ssr: true,
})


// スケルトンローダーコンポーネント
function HeroSkeleton() {
  return (
    <div className="h-screen bg-gradient-to-b from-gray-900 to-gray-800 animate-pulse flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="h-12 w-64 bg-gray-700 rounded-lg mx-auto" />
        <div className="h-8 w-48 bg-gray-700 rounded-lg mx-auto" />
        <div className="h-10 w-32 bg-gray-600 rounded-full mx-auto" />
      </div>
    </div>
  )
}

function ProductsSkeleton() {
  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="h-12 w-48 bg-gray-200 rounded-lg mx-auto mb-8 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="aspect-square bg-gray-200 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  )
}

function SectionSkeleton() {
  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="h-8 w-48 bg-gray-200 rounded-lg mx-auto mb-4 animate-pulse" />
        <div className="space-y-2 max-w-3xl mx-auto">
          <div className="h-4 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-4/6" />
        </div>
      </div>
    </div>
  )
}

export default function HomePage() {
  return (
    <>
      <StructuredData />
      <Header />
      <main>
        <Suspense fallback={<HeroSkeleton />}>
          <Hero />
        </Suspense>
        <Suspense fallback={<ProductsSkeleton />}>
          <Products />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  )
}