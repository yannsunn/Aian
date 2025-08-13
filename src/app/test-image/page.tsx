import Image from 'next/image'

export default function TestImagePage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-8">Image Test Page - Custom Order Images</h1>
      
      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Custom Order Image 1 (新しい画像 - S__83738760.jpg)</h2>
          <div className="relative w-full h-96 bg-gray-200 border-2 border-gray-400">
            <Image
              src="/images/products/custom-order/S__83738760.jpg"
              alt="Custom Order Test 1"
              fill
              className="object-contain"
              onError={(e) => console.error('Failed to load S__83738760.jpg:', e)}
            />
          </div>
          <p className="mt-2 text-sm">Path: /images/products/custom-order/S__83738760.jpg</p>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Custom Order Image 2 (S__83738761.jpg)</h2>
          <div className="relative w-full h-96 bg-gray-200 border-2 border-gray-400">
            <Image
              src="/images/products/custom-order/S__83738761.jpg"
              alt="Custom Order Test 2"
              fill
              className="object-contain"
              onError={(e) => console.error('Failed to load S__83738761.jpg:', e)}
            />
          </div>
          <p className="mt-2 text-sm">Path: /images/products/custom-order/S__83738761.jpg</p>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Direct img tag test - S__83738760.jpg</h2>
          <img 
            src="/images/products/custom-order/S__83738760.jpg" 
            alt="Direct img test 1"
            className="max-w-full h-auto"
            onError={(e) => console.error('Failed to load via img tag:', e)}
          />
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Direct img tag test - S__83738761.jpg</h2>
          <img 
            src="/images/products/custom-order/S__83738761.jpg" 
            alt="Direct img test 2"
            className="max-w-full h-auto"
            onError={(e) => console.error('Failed to load via img tag:', e)}
          />
        </div>
      </div>
    </div>
  )
}