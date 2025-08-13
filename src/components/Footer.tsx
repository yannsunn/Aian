import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-900 text-white py-16">
      <div className="container-custom">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden">
                <img 
                  src="/images/viw-logo.png" 
                  alt="VIW Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold">Vintage Iron Works</h3>
                <p className="text-slate-400 text-sm">ヴィンテージアイアン製品</p>
              </div>
            </div>
            <p className="text-slate-300 leading-relaxed">
              アイアン製品の企画・販売・品質管理を手掛ける、熟練の職人との信頼ある協業体制です。
            </p>
            <div className="flex items-center space-x-1">
              <span className="text-amber-400 text-sm font-medium">★★★★★</span>
              <span className="text-slate-400 text-sm ml-2">信頼ある品質管理</span>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-white mb-4">サービス</h4>
            <ul className="space-y-3">
              {[
                'オーダーメイド家具',
                'インテリア装飾',
                '建築アイアンワーク',
                '修理・メンテナンス',
                'デザイン相談'
              ].map((service, index) => (
                <li key={index} className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors duration-200">
                  <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-white mb-4">お問い合わせ</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-blue-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div className="text-slate-300">
                  <p>〒207-0013</p>
                  <p>東京都東大和市向原5-1129-61</p>
                  <p>渡辺ビル1F</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-slate-300">050-7115-4948</span>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-slate-300">shop@awakeinc.co.jp</span>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-white mb-4">営業時間</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-slate-700">
                <span className="text-slate-300">平日</span>
                <span className="text-white font-medium">営業中</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-700">
                <span className="text-slate-300">土曜日</span>
                <span className="text-white font-medium">営業中（短縮）</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-slate-300">日曜・祝日</span>
                <span className="text-red-400 font-medium">お休み</span>
              </div>
            </div>
            <div className="bg-slate-800 p-4 rounded-xl">
              <p className="text-sm text-slate-300">
                <span className="text-emerald-400 font-semibold">無料相談</span>受付中
                <br />
                お気軽にお問い合わせください
              </p>
            </div>
          </div>
        </div>

        {/* Legal Links Section */}
        <div className="border-t border-slate-700 pt-8 mb-8">
          <div className="text-center">
            <h4 className="text-lg font-bold text-white mb-4">法的情報</h4>
            <div className="flex flex-wrap justify-center gap-6">
              <a href="/company" className="text-slate-300 hover:text-white transition-colors duration-300 flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z"/>
                </svg>
                会社概要・特定商取引法
              </a>
              <a href="/privacy" className="text-slate-300 hover:text-white transition-colors duration-300 flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                プライバシーポリシー
              </a>
              <a href="/terms" className="text-slate-300 hover:text-white transition-colors duration-300 flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a1 1 0 102 0V3a2 2 0 012-2h6a2 2 0 012 2v1a1 1 0 102 0V3a2 2 0 012-2 2 2 0 012 2v6.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L21 11.586V5a2 2 0 00-2-2z" clipRule="evenodd" />
                </svg>
                利用規約
              </a>
            </div>
          </div>
        </div>

        {/* Security & Compliance Section */}
        <div className="border-t border-slate-700 pt-8 mb-8">
          <div className="text-center">
            <h4 className="text-lg font-bold text-white mb-6">セキュリティ・品質保証</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-slate-300 text-sm font-medium">SSL暗号化</p>
                <p className="text-slate-400 text-xs">通信暗号化</p>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <p className="text-slate-300 text-sm font-medium">個人情報保護</p>
                <p className="text-slate-400 text-xs">法令遵守</p>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                </div>
                <p className="text-slate-300 text-sm font-medium">ISO9001</p>
                <p className="text-slate-400 text-xs">品質管理</p>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                  </svg>
                </div>
                <p className="text-slate-300 text-sm font-medium">10年保証</p>
                <p className="text-slate-400 text-xs">品質保証</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-slate-400 text-sm">
                &copy; {currentYear} 株式会社Awake All Rights Reserved.
              </p>
              <div className="flex items-center space-x-4 text-xs">
                <a href="/privacy" className="text-slate-400 hover:text-white transition-colors">
                  プライバシー
                </a>
                <span className="text-slate-600">|</span>
                <a href="/terms" className="text-slate-400 hover:text-white transition-colors">
                  利用規約
                </a>
                <span className="text-slate-600">|</span>
                <a href="/company" className="text-slate-400 hover:text-white transition-colors">
                  会社概要
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-slate-400 text-sm">現在の状態:</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-emerald-400 text-sm font-medium">受注可能</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

Footer.displayName = 'Footer'

export default Footer