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


        {/* Bottom Section */}
        <div className="border-t border-slate-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-slate-400 text-sm">
                &copy; {currentYear} 株式会社Awake All Rights Reserved.
              </p>
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