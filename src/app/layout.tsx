import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Blue Prince - 精品游戏推荐平台 | 免费在线游戏、热门游戏下载、休闲益智游戏',
  description: '探索Blue Prince精品游戏世界，提供动作、冒险、策略等多种类型游戏。支持在线试玩和免费下载，享受流畅操作体验。找到适合您的游戏，立即开始精彩冒险之旅！',
  metadataBase: new URL('https://games-web-lovat.vercel.app'),
  alternates: {
    canonical: 'https://games-web-lovat.vercel.app',
  },
  openGraph: {
    title: 'Blue Prince - 精品游戏推荐平台 | 免费在线游戏、热门游戏下载',
    description: '探索Blue Prince精品游戏世界，提供动作、冒险、策略等多种类型游戏。支持在线试玩和免费下载，享受流畅操作体验。找到适合您的游戏，开始精彩冒险！',
    url: 'https://games-web-lovat.vercel.app',
    siteName: 'Blue Prince',
    images: [
      {
        url: 'https://games-web-lovat.vercel.app/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Blue Prince 游戏平台',
      },
    ],
    locale: 'zh_CN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blue Prince - 精品游戏推荐平台 | 免费在线游戏',
    description: '探索Blue Prince精品游戏世界，提供动作、冒险、策略等多种类型游戏。支持在线试玩和免费下载，享受流畅操作体验。',
    images: ['https://games-web-lovat.vercel.app/twitter-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className + " bg-black text-white"}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}