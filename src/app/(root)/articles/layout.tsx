import { Metadata } from 'next';

// 导出动态元数据生成函数，支持多语言
export async function generateMetadata(): Promise<Metadata> {
  // 注意：这是服务端组件，无法使用客户端状态
  // 这里我们提供两种语言版本的元数据
  return {
    title: {
      default: '游戏体验分享 | 分享您的游戏体验和精彩瞬间',
      template: '%s | 游戏体验分享',
      absolute: '游戏体验分享 | 分享您的游戏体验和精彩瞬间',
    },
    description: '游戏体验分享是玩家交流游戏心得、分享游戏截图和精彩瞬间的社区平台。加入我们，上传游戏截图，分享您的游戏感受，与其他玩家互动交流，发现更多游戏内容。',
    alternates: {
      languages: {
        'en-US': '/en-US/articles',
        'zh-CN': '/zh-CN/articles',
      },
    },
    openGraph: {
      title: '游戏体验分享 | 分享您的游戏体验和精彩瞬间',
      description: '游戏体验分享是玩家交流游戏心得、分享游戏截图和精彩瞬间的社区平台。加入我们，上传游戏截图，分享您的游戏感受，与其他玩家互动交流，发现更多游戏内容。',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: '游戏体验分享 | 分享您的游戏体验和精彩瞬间',
      description: '游戏体验分享是玩家交流游戏心得、分享游戏截图和精彩瞬间的社区平台。探索、分享、互动，加入我们的游戏社区！',
    }
  };
}

export default function ArticlesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  );
} 