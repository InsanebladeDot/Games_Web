"use client"
import { t, getCurrentLang, Lang } from './i18n';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Footer() {
  const [mounted, setMounted] = useState(false);
  const [lang, setLang] = useState<Lang | undefined>(undefined);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setMounted(true);
    setLang(getCurrentLang());
    
    const handler = () => {
      setLang(getCurrentLang());
    };
    
    window.addEventListener("langchange", handler);
    return () => window.removeEventListener("langchange", handler);
  }, []);

  if (!mounted || !lang || !visible) {
    // SSR 阶段或首次挂载前，渲染空内容或 loading 占位，保证一致性
    return null;
  }

  return (
    <footer className="bg-neutral-900 text-neutral-400 px-10 py-10 mt-10 w-full relative">
      <div className="flex flex-col md:flex-row justify-between max-w-full">
        {/* 左侧描述和下方链接 */}
        <div className="flex-1 min-w-[320px]">
          <p className="text-lg text-white mb-8">{t('footer.desc')}</p>
          <div className="my-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <Link href="/cookie" className="hover:underline hover:text-purple-400 transition-colors">{t('footer.cookie_policy')}</Link>
            <Link href="/copyright" className="hover:underline hover:text-purple-400 transition-colors">{t('footer.copyright')}</Link>
            <Link href="/privacy" className="hover:underline hover:text-purple-400 transition-colors">{t('footer.privacy_policy')}</Link>
            <Link href="/terms" className="hover:underline hover:text-purple-400 transition-colors">{t('footer.terms')}</Link>
          </div>
          <div className="text-xs mt-4 text-neutral-500">
            {t('footer.trademark')}
          </div>
        </div>
        {/* 右侧菜单和社交icon */}
        <div className="flex flex-col items-end justify-between min-w-[320px] pr-0 md:pr-10">
          <div className="flex gap-10 mb-8">
            <Link href={`/${lang === 'zh' ? 'zh' : 'en'}/gamelist`} className="text-white font-semibold hover:underline">{t('header.games')}</Link>
            <Link href={`/${lang === 'zh' ? 'zh' : 'en'}/articles`} className="text-white font-semibold hover:underline">{t('header.articles')}</Link>
            <Link href={`/${lang === 'zh' ? 'zh' : 'en'}/about`} className="text-white font-semibold hover:underline">{t('header.about')}</Link>
          </div>
          <div className="flex gap-4">
            <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}`}
             className="w-10 h-10 flex items-center justify-center rounded-full border border-neutral-500 text-white hover:bg-neutral-800 transition" >
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.56v14.91a4.56 4.56 0 0 1-4.56 4.56H4.56A4.56 4.56 0 0 1 0 19.47V4.56A4.56 4.56 0 0 1 4.56 0h14.91A4.56 4.56 0 0 1 24 4.56zM9.36 19.47V9.36H5.82v10.11h3.54zm-1.77-11.52a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zm14.13 11.52v-5.6c0-3.36-1.8-4.93-4.2-4.93-1.93 0-2.8 1.07-3.28 1.82v-1.56h-3.54c.05 1.03 0 10.11 0 10.11h3.54v-5.65c0-.3.02-.6.11-.82.24-.6.79-1.22 1.71-1.22 1.21 0 1.7.92 1.7 2.27v5.42h3.54z"/></svg>
            </a>
            <a href="https://www.instagram.com/your_instagram_handle"
             className="w-10 h-10 flex items-center justify-center rounded-full border border-neutral-500 text-white hover:bg-neutral-800 transition" >
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            {/* 关闭Footer的X按钮 */}
            <button
              aria-label="关闭Footer"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-neutral-500 text-white hover:bg-neutral-800 transition"
              style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: 22 }}
              onClick={() => setVisible(false)}
            >
              <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
