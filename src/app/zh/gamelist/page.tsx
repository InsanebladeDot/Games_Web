"use client";
import { useEffect, useState } from 'react';
import { changeLanguage } from '../../../components/i18n';
import GameListPage from '../../(root)/gamelist/page';

export default function ChGameListPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // 确保语言设置为中文
    changeLanguage('zh');
    setMounted(true);
  }, []);

  // 只有在客户端挂载后才渲染内容
  if (!mounted) {
    return <div className="min-h-screen bg-black"></div>; // 空白占位，避免闪烁
  }

  return <GameListPage />;
} 