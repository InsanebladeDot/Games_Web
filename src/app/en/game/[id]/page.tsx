"use client";
import { useEffect, useState } from 'react';
import { changeLanguage } from '../../../../components/i18n';
import { useParams } from 'next/navigation';
import GameDetail from '../../../(root)/home/page';

export default function EnGameDetailPage() {
  const [mounted, setMounted] = useState(false);
  const params = useParams();

  useEffect(() => {
    // 确保语言设置为英文
    changeLanguage('en');
    setMounted(true);
  }, []);

  // 只有在客户端挂载后才渲染内容
  if (!mounted) {
    return <div className="min-h-screen bg-black"></div>; // 空白占位，避免闪烁
  }

  return <GameDetail params={Promise.resolve({ gameId: params?.id as string })} />;
} 