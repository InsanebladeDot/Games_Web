"use client";
import Link from "next/link";
import Image from 'next/image';
import { useState, useEffect } from "react";
import { t, changeLanguage, getCurrentLang, Lang } from "./i18n";
import SearchBox from "./SearchBox";

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
    setLang(next);
    console.log(`Language switched to: ${next}`);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-neutral-900 shadow-lg h-16">
      <div className="flex items-center justify-between px-4 md:px-6 lg:px-10 h-full">
        <div className="flex items-center">
          <Link href="/">
            <Image src="https://interfaceingame.com/wp-content/themes/interface-in-game/dist/assets/static/images/logo.svg" alt="logo" width={40} height={40} className="w-10 mr-4 cursor-pointer" unoptimized />
          </Link>
          <nav className="flex items-center">
            <Link className="mx-2 md:mx-4" href="/gamelist">{t('header.games')}</Link>
            <Link className="mx-2 md:mx-4" href="/articles">{t('header.articles')}</Link>
            <Link className="mx-2 md:mx-4" href="/about">{t('header.about')}</Link>
          </nav>
          {/* 额外功能以后再扩展 */}
          {/* <div className="hidden md:flex gap-2 ml-10 xl:ml-20 items-center">
            <Link href="/genre" className="text-white px-4 py-2 rounded-lg transition-colors duration-200 bg-neutral-800 hover:bg-neutral-700">
              {t('header.genre.label')}
            </Link>
            <Link href="/theme" className="text-white px-4 py-2 rounded-lg transition-colors duration-200 bg-neutral-800 hover:bg-neutral-700">
              {t('header.theme.label')}
            </Link>
            <Link href="/platform" className="text-white px-4 py-2 rounded-lg transition-colors duration-200 bg-neutral-800 hover:bg-neutral-700">
              {t('header.platform.label')}
            </Link>
          </div> */}
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <SearchBox />
          <button className="bg-white text-black rounded px-4 py-1">{t('header.mockup')}</button>
          
          {/* 语言切换按钮 */}
          <button
            className="bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-full shadow-lg flex items-center"
            onClick={handleLangSwitch}
            title={t('header.langSwitchTitle')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
            {lang === 'en' ? '中文' : 'English'}
          </button>
          
          {/* 当前语言显示 */}
          <div className="text-white bg-gray-700 px-3 py-1 rounded-full text-sm font-medium">
            {lang === 'zh' ? '中文' : 'ENGLISH'}
          </div>
        </div>
      </div>
    </header>
  );
}