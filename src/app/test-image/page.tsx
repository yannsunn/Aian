import Image from 'next/image'

export default function TestImagePage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-8">Image Test Page</h1>
      
      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Custom Order Image (受注生産)</h2>
          <div className="relative w-full h-96 bg-gray-200 border-2 border-gray-400">
            <Image
              src="/images/products/custom-order/S__83738761.jpg"
              alt="Custom Order Test"
              fill
              className="object-contain"
            />
          </div>
          <p className="mt-2 text-sm">Path: /images/products/custom-order/S__83738761.jpg</p>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Outdoor Image (アウトドア)</h2>
          <div className="relative w-full h-96 bg-gray-200 border-2 border-gray-400">
            <Image
              src="/images/products/outdoor/S__83738756_0.jpg"
              alt="Outdoor Test"
              fill
              className="object-contain"
            />
          </div>
          <p className="mt-2 text-sm">Path: /images/products/outdoor/S__83738756_0.jpg</p>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Direct img tag test</h2>
          <img 
            src="/images/products/custom-order/S__83738761.jpg" 
            alt="Direct img test"
            className="max-w-full h-auto"
          />
        </div>
      </div>
    </div>
  )
}