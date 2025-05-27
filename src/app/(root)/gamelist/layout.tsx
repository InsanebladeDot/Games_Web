import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blue Prince - 游戏列表 | 探索各类热门游戏、免费在线游戏、休闲益智游戏',
  description: '在Blue Prince游戏列表中探索精选游戏，包括动作冒险、策略、休闲、射击、角色扮演等多种类型。所有游戏支持在线试玩，部分提供免费下载，开启您的游戏冒险之旅！',
  alternates: {
    canonical: 'https://games-web-lovat.vercel.app/gamelist',
  },
  openGraph: {
    title: 'Blue Prince - 游戏列表 | 探索各类热门游戏',
    description: '在Blue Prince游戏列表中探索精选游戏，包括动作冒险、策略、休闲、射击、角色扮演等多种类型。所有游戏支持在线试玩，部分提供免费下载。',
    url: 'https://games-web-lovat.vercel.app/gamelist',
  },
  twitter: {
    title: 'Blue Prince - 游戏列表 | 探索各类热门游戏',
    description: '在Blue Prince游戏列表中探索精选游戏，包括动作冒险、策略、休闲、射击、角色扮演等多种类型。所有游戏支持在线试玩。',
  },
}

export default function GameListLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  )
} 