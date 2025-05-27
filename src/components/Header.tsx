"use client";
import Link from "next/link";
import Image from 'next/image';
import { useState, useEffect } from "react";
import { t, changeLanguage, getCurrentLang, Lang } from "./i18n";

const LANG_ICON = (
  <svg width="22" height="22" fill="none" viewBox="0 0 24 24" className="inline-block align-middle"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" stroke="currentColor" strokeWidth="2"/></svg>
);

export default function Header() {
  const [lang, setLang] = useState<Lang | undefined>(undefined);

  useEffect(() => {
    setLang(getCurrentLang());
    const handler = () => setLang(getCurrentLang());
    window.addEventListener("langchange", handler);
    return () => window.removeEventListener("langchange", handler);
  }, []);

  if (!lang) return null;

  const handleLangSwitch = () => {
    const next = lang === 'zh' ? 'en' : 'zh';
    changeLanguage(next);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 md:px-6 lg:px-10 py-3 md:py-4 lg:py-5 bg-neutral-900 shadow-lg flex-wrap">
      <div className="flex items-center flex-wrap">
        <Link href="/">
          <Image src="https://interfaceingame.com/wp-content/themes/interface-in-game/dist/assets/static/images/logo.svg" alt="logo" width={40} height={40} className="w-10 mr-4 cursor-pointer" unoptimized />
        </Link>
        <nav className="flex flex-wrap items-center">
          <Link className="mx-2 md:mx-4" href="/gamelist">{t('header.games')}</Link>
          <Link className="mx-2 md:mx-4" href="/screenshots">{t('header.screenshots')}</Link>
          <Link className="mx-2 md:mx-4" href="/articles">{t('header.articles')}</Link>
          <Link className="mx-2 md:mx-4" href="/about">{t('header.about')}</Link>
        </nav>
      </div>
      <div className="flex items-center gap-2 md:gap-4 flex-wrap mt-2 md:mt-0">
        <input placeholder={t('header.search')} className="bg-neutral-800 text-white rounded px-3 py-1 w-full md:w-auto" />
        <button className="bg-white text-black rounded px-4 py-1">{t('header.mockup')}</button>
        <button
          className="flex items-center gap-1 px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded transition-colors"
          onClick={handleLangSwitch}
          title={lang === 'zh' ? '切换为英文' : 'Switch to Chinese'}
        >
          {LANG_ICON}
          <span className="text-sm font-bold">{lang === 'zh' ? '中' : 'EN'}</span>
        </button>
      </div>
    </header>
  );
}