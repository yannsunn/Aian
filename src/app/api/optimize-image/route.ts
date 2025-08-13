import { NextRequest, NextResponse } from 'next/server'
import sharp from 'sharp'

export const runtime = 'nodejs'

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
    const width = parseInt(searchParams.get('w') || '0')
    const height = parseInt(searchParams.get('h') || '0')
    const quality = parseInt(searchParams.get('q') || '85')
    const format = (searchParams.get('f') as OptimizeOptions['format']) || 'webp'

    if (!imageUrl) {
      return NextResponse.json({ error: 'Image URL is required' }, { status: 400 })
    }

    // Fetch the original image
    const response = await fetch(imageUrl)
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`)
    }

    const buffer = await response.arrayBuffer()
    const imageBuffer = Buffer.from(buffer)

    // Process image with sharp
    let processedImage = sharp(imageBuffer)

    // Resize if dimensions provided
    if (width || height) {
      processedImage = processedImage.resize(width || undefined, height || undefined, {
        fit: 'inside',
        withoutEnlargement: true,
      })
    }

    // Apply format and quality
    switch (format) {
      case 'avif':
        processedImage = processedImage.avif({ quality, effort: 4 })
        break
      case 'webp':
        processedImage = processedImage.webp({ quality, effort: 4 })
        break
      case 'jpeg':
        processedImage = processedImage.jpeg({ quality, progressive: true, mozjpeg: true })
        break
      case 'png':
        processedImage = processedImage.png({ quality, compressionLevel: 9, progressive: true })
        break
    }

    const optimizedBuffer = await processedImage.toBuffer()

    // Return optimized image with appropriate headers
    return new NextResponse(optimizedBuffer, {
      status: 200,
      headers: {
        'Content-Type': `image/${format}`,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Content-Length': optimizedBuffer.length.toString(),
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