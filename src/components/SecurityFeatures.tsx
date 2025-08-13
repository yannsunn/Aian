'use client'

import React, { useEffect } from 'react'

const SecurityFeatures = () => {
  useEffect(() => {
    // CSP Header enforcement
    const meta = document.createElement('meta')
    meta.httpEquiv = 'Content-Security-Policy'
    meta.content = "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;"
    document.head.appendChild(meta)

    // X-Frame-Optionsはヘッダーで設定すべきなので削除

    // X-Content-Type-Options
    const contentType = document.createElement('meta')
    contentType.httpEquiv = 'X-Content-Type-Options'
    contentType.content = 'nosniff'
    document.head.appendChild(contentType)

    // Referrer Policy
    const referrer = document.createElement('meta')
    referrer.name = 'referrer'
    referrer.content = 'strict-origin-when-cross-origin'
    document.head.appendChild(referrer)

    // Cleanup
    return () => {
      document.head.removeChild(meta)
      document.head.removeChild(contentType)
      document.head.removeChild(referrer)
    }
  }, [])

  // Form sanitization
  const sanitizeInput = (input: string): string => {
    return input
      .replace(/[<>]/g, '') // Remove < and >
      .replace(/javascript:/gi, '') // Remove javascript: protocols
      .replace(/on\w+=/gi, '') // Remove event handlers
      .trim()
  }

  // Email validation
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Phone validation
  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[\d\-\+\(\)\s]+$/
    return phoneRegex.test(phone)
  }

  return null // This component doesn't render anything
}

export default SecurityFeatures