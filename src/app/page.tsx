"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getLang } from '../components/i18n';

export default function RootPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // 标记组件已挂载
    setMounted(true);
    
    // 获取当前语言设置并重定向
    const lang = getLang();
    router.replace(lang === 'zh' ? '/zh' : '/en');
  }, [router]);

  // 显示加载中状态
  return <div className="min-h-screen bg-black flex items-center justify-center">
    {mounted ? null : <div className="text-white text-xl">Loading...</div>}
  </div>;
} 