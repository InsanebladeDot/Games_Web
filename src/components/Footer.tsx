"use client"
import { t } from './i18n';
import { useState, useEffect } from 'react';

export default function Footer() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // SSR 阶段或首次挂载前，渲染空内容或 loading 占位，保证一致性
    return null;
  }

  return (
    <footer className="bg-neutral-900 text-neutral-400 px-10 py-10 mt-10 w-full">
      <div className="flex flex-col md:flex-row justify-between max-w-full">
        {/* 左侧描述和下方链接 */}
        <div className="flex-1 min-w-[320px]">
          <p className="text-lg text-white mb-8">{t('footer.desc')}</p>
          <div className="my-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <a href="#" className="hover:underline">{t('footer.cookie_policy')}</a>
            <a href="#" className="hover:underline">{t('footer.copyright')}</a>
            <a href="#" className="hover:underline">{t('footer.privacy_policy')}</a>
            <a href="#" className="hover:underline">{t('footer.terms')}</a>
          </div>
          <div className="text-xs mt-4 text-neutral-500">
            {t('footer.trademark')}
          </div>
        </div>
        {/* 右侧菜单和社交icon */}
        <div className="flex flex-col items-end justify-between min-w-[320px] pr-0 md:pr-10">
          <div className="flex gap-10 mb-8">
            <a href="#" className="text-white font-semibold hover:underline">{t('header.games')}</a>
            <a href="#" className="text-white font-semibold hover:underline">{t('header.screenshots')}</a>
            <a href="#" className="text-white font-semibold hover:underline">{t('header.articles')}</a>
            <a href="#" className="text-white font-semibold hover:underline">{t('header.about')}</a>
          </div>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full border border-neutral-500 text-white hover:bg-neutral-800 transition">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.56v14.91a4.56 4.56 0 0 1-4.56 4.56H4.56A4.56 4.56 0 0 1 0 19.47V4.56A4.56 4.56 0 0 1 4.56 0h14.91A4.56 4.56 0 0 1 24 4.56zM9.36 19.47V9.36H5.82v10.11h3.54zm-1.77-11.52a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zm14.13 11.52v-5.6c0-3.36-1.8-4.93-4.2-4.93-1.93 0-2.8 1.07-3.28 1.82v-1.56h-3.54c.05 1.03 0 10.11 0 10.11h3.54v-5.65c0-.3.02-.6.11-.82.24-.6.79-1.22 1.71-1.22 1.21 0 1.7.92 1.7 2.27v5.42h3.54z"/></svg>
            </a>
            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full border border-neutral-500 text-white hover:bg-neutral-800 transition">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M17.707 6.293a1 1 0 0 0-1.414 0l-4.293 4.293-4.293-4.293a1 1 0 1 0-1.414 1.414l4.293 4.293-4.293 4.293a1 1 0 1 0 1.414 1.414l4.293-4.293 4.293 4.293a1 1 0 0 0 1.414-1.414l-4.293-4.293 4.293-4.293a1 1 0 0 0 0-1.414z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
