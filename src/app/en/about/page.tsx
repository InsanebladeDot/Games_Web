"use client";
import { useEffect, useState } from 'react';
import { changeLanguage } from '../../../components/i18n';
import AboutPage from '../../(root)/about/page';

export default function EnAboutPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // 确保语言设置为英文
    changeLanguage('en');
    setMounted(true);
  }, []);

  // 只有在客户端挂载后才渲染内容
  if (!mounted) {
    return <div className="min-h-screen bg-black"></div>; // 空白占位，避免闪烁
  }

  return <AboutPage />;
} 