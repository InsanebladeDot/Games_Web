'use client';

import { useEffect } from 'react';
import { t, getCurrentLang, syncLangWithUrl } from '../../../components/i18n';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CookiePolicy() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // 同步URL和语言设置
    syncLangWithUrl();
    
    // 监听语言变化事件
    const handleLangChange = () => {
      const newLang = getCurrentLang();
      
      // 根据新语言更新路由
      const newPath = pathname?.replace(/^\/(zh|en)/, `/${newLang}`) || `/${newLang}`;
      router.push(newPath);
    };
    
    window.addEventListener("langchange", handleLangChange);
    return () => window.removeEventListener("langchange", handleLangChange);
  }, [pathname, router]);

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">{t('policy.cookie.title')}</h1>
        
        <div className="flex justify-between text-sm text-gray-400 mb-8">
          <div>
            <div>{t('policy.updated')}: 2023-04-30</div>
            <div>{t('policy.effective')}: 2023-05-07</div>
          </div>
          <div className="flex items-center">
            <span>{t('policy.currentVersion')}:</span>
            <span>2023-04-30</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{t('policy.cookie.aboutCookies')}</h2>
          <p className="text-gray-300 leading-relaxed">
            {t('policy.cookie.aboutCookiesDesc')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-neutral-900 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">{t('policy.cookie.whatAreCookies')}</h3>
            <p className="text-gray-300 leading-relaxed">
              {t('policy.cookie.whatAreCookiesDesc')}
            </p>
          </div>
          
          <div className="bg-neutral-900 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">{t('policy.cookie.howWeUseCookies')}</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              {t('policy.cookie.howWeUseCookiesDesc')}
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-300">
              <li>{t('policy.cookie.necessaryCookies')}</li>
              <li>{t('policy.cookie.preferenceCookies')}</li>
              <li>{t('policy.cookie.statisticsCookies')}</li>
              <li>{t('policy.cookie.marketingCookies')}</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-800 pt-8">
          <div className="flex flex-wrap gap-6 justify-center text-gray-400">
            <Link href={`/cookie`} className="hover:text-purple-400 transition-colors">{t('footer.cookie_policy')}</Link>
            <Link href={`/copyright`} className="hover:text-purple-400 transition-colors">{t('footer.copyright')}</Link>
            <Link href={`/privacy`} className="hover:text-purple-400 transition-colors">{t('footer.privacy_policy')}</Link>
            <Link href={`/terms`} className="hover:text-purple-400 transition-colors">{t('footer.terms')}</Link>
          </div>
        </div>
      </div>
    </div>
  );
} 