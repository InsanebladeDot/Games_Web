"use client";
import { useEffect, useState } from 'react';
import { changeLanguage } from '../../../components/i18n';
import ArticlesPage from '../../(root)/articles/page';

export default function ChArticlesPage() {
  // 使用状态来控制组件渲染
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // 确保语言设置为中文
    changeLanguage('zh');
    // 标记组件已挂载
    setMounted(true);
  }, []);

  // 只有在客户端挂载后才渲染内容
  if (!mounted) {
    return <div className="min-h-screen bg-black"></div>; // 空白占位，避免闪烁
  }

  return <ArticlesPage />;
} 