import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

interface OptimizeOptions {
  width?: number
  height?: number
  quality?: number
  format?: 'webp' | 'avif' | 'jpeg' | 'png'
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const imageUrl = searchParams.get('url')
    const width = searchParams.get('w') || ''
    const height = searchParams.get('h') || ''
    const quality = searchParams.get('q') || '85'

    if (!imageUrl) {
      return NextResponse.json({ error: 'Image URL is required' }, { status: 400 })
    }

    // For Vercel deployment, we'll use Next.js Image Optimization API
    // or simply pass through the original image with caching headers
    const response = await fetch(imageUrl)
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`)
    }

    const buffer = await response.arrayBuffer()
    
    // Return image with caching headers
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': response.headers.get('content-type') || 'image/jpeg',
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Content-Length': buffer.byteLength.toString(),
      },
    })
  } catch (error) {
    console.error('Image optimization error:', error)
    return NextResponse.json(
      { error: 'Failed to optimize image' },
      { status: 500 }
    )
  }
}

// 画像プリロード用のメタデータ生成
export async function POST(request: NextRequest) {
  try {
    const { images } = await request.json()
    
    if (!Array.isArray(images)) {
      return NextResponse.json({ error: 'Images array is required' }, { status: 400 })
    }

    const metadata = await Promise.all(
      images.map(async (imageUrl: string) => {
        try {
          const response = await fetch(imageUrl, { method: 'HEAD' })
          const contentLength = response.headers.get('content-length')
          const contentType = response.headers.get('content-type')
          
          return {
            url: imageUrl,
            size: contentLength ? parseInt(contentLength) : null,
            type: contentType,
            optimized: {
              webp: `/api/optimize-image?url=${encodeURIComponent(imageUrl)}&f=webp`,
              avif: `/api/optimize-image?url=${encodeURIComponent(imageUrl)}&f=avif`,
            }
          }
        } catch {
          return null
        }
      })
    )

    return NextResponse.json({
      images: metadata.filter(Boolean),
      timestamp: Date.now(),
    })
  } catch (error) {
    console.error('Metadata generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate metadata' },
      { status: 500 }
    )
  }
}