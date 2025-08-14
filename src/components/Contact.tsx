'use client'

import React, { useState, FormEvent } from 'react'
import { cn } from '@/lib/utils'
import useIntersectionObserver from '@/hooks/useIntersectionObserver'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

interface FormData {
  name: string
  email: string
  message: string
}

interface FormMessage {
  text: string
  type: 'success' | 'error'
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<FormMessage | null>(null)

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // バリデーション
    if (!formData.name || !formData.email || !formData.message) {
      setMessage({
        text: 'すべての項目を入力してください。',
        type: 'error'
      })
      return
    }
    
    if (!isValidEmail(formData.email)) {
      setMessage({
        text: '有効なメールアドレスを入力してください。',
        type: 'error'
      })
      return
    }
    
    setIsSubmitting(true)
    setMessage(null)
    
    // ダミーの送信処理
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setMessage({
        text: 'お問い合わせありがとうございます。後日担当者からご連絡いたします。',
        type: 'success'
      })
      
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      setMessage({
        text: '送信中にエラーが発生しました。しばらく後に再度お試しください。',
        type: 'error'
      })
    } finally {
      setIsSubmitting(false)
    }
    
    // メッセージを5秒後に削除
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.1 })

  return (
    <section ref={sectionRef} id="contact" className="py-16 sm:py-20 md:py-24 lg:py-32 bg-amber-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={cn(
          'text-center mb-12 sm:mb-16 md:mb-20 transition-all duration-1000',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}>
          <div className="inline-block">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-3 sm:mb-4 md:mb-6 tracking-tight">
              お問い合わせ
            </h2>
            <div className="h-1 w-20 sm:w-24 mx-auto bg-amber-600 rounded-full shadow-lg" />
          </div>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 mt-4 sm:mt-6 md:mt-8 max-w-3xl mx-auto leading-relaxed px-4">
            オーダーメイドアイアン製品に関するご相談、<br />
            お見積もりなど<br />
            <span className="text-amber-600 font-semibold">お気軽にお問い合わせ</span>
            ください
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
          {/* Contact Form */}
          <Card variant="premium" className={cn(
            'p-4 sm:p-6 md:p-8 transition-all duration-1000',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          )}>
            <div className="absolute inset-0 bg-white rounded-3xl" />
            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
                メールでのお問い合わせ
              </h3>
              
              {message && (
                <div
                  className={`p-4 rounded-xl mb-6 font-medium transition-all duration-300 ${
                    message.type === 'success'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}
                >
                  {message.text}
                </div>
              )}
          
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-base sm:text-lg md:text-xl font-semibold text-slate-700 mb-3">
                    お名前 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 bg-white text-base sm:text-lg md:text-xl"
                    placeholder="お名前を入力してください"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-base sm:text-lg md:text-xl font-semibold text-slate-700 mb-3">
                    メールアドレス <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 bg-white text-base sm:text-lg md:text-xl"
                    placeholder="メールアドレスを入力してください"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-base sm:text-lg md:text-xl font-semibold text-slate-700 mb-3">
                    お問い合わせ内容 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 resize-vertical bg-white text-base sm:text-lg md:text-xl"
                    placeholder="お問い合わせ内容を詳しく入力してください"
                  />
                </div>
                
                <Button
                  type="submit"
                  variant="premium"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full mt-8"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      送信中...
                    </>
                  ) : (
                    '送信する'
                  )}
                </Button>
              </form>
            </div>
          </Card>

          {/* Contact Information */}
          <div className={cn(
            'space-y-8 transition-all duration-1000',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          )}>
            {/* Business Hours */}
            <Card variant="premium" className="p-8">
              <div className="absolute inset-0 bg-amber-50 rounded-3xl" />
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900">営業時間</h3>
                </div>
                <div className="space-y-3 text-base sm:text-lg md:text-xl text-slate-700">
                  <div className="flex justify-between">
                    <span className="font-medium">平日</span>
                    <span>営業中</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">土曜日</span>
                    <span>営業中（短縮）</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">日曜・祝日</span>
                    <span className="text-red-600">お休み</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Response Time */}
            <Card variant="premium" className="p-8">
              <div className="absolute inset-0 bg-emerald-50 rounded-3xl" />
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900">お返事について</h3>
                </div>
                <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed">
                  お問い合わせいただいた内容については、<br />
                  <span className="text-amber-600 font-semibold">可能な限り迅速に</span>
                  ご返答させていただきます。<br />
                  お急ぎの場合はお電話でのお問い合わせもお受けしております。
                </p>
              </div>
            </Card>

            {/* LINE Official Account */}
            <Card variant="premium" className="p-8">
              <div className="absolute inset-0 bg-green-50 rounded-3xl" />
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
                    </svg>
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900">LINE公式アカウント</h3>
                </div>
                <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed mb-4">
                  LINEでもお気軽にお問い合わせいただけます。<br />
                  <span className="text-green-600 font-semibold">いつでもメッセージ可能</span>
                  ですので、お気軽にご連絡ください。
                </p>
                <a 
                  href="https://line.me/R/ti/p/@919vshsk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full py-3 px-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg text-base sm:text-lg md:text-xl"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
                  </svg>
                  友達追加して相談する
                </a>
              </div>
            </Card>

            {/* Consultation */}
            <Card variant="premium" className="p-8">
              <div className="absolute inset-0 bg-amber-50 rounded-3xl" />
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900">無料相談</h3>
                </div>
                <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed">
                  デザインのご相談から製作まで、<br />
                  <span className="text-amber-700 font-semibold">経験を積んだ職人</span>
                  がサポートいたします。<br />
                  どんな小さなご質問でもお気軽にお問い合わせください。
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

Contact.displayName = 'Contact'

export default Contact