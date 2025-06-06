'use client';

import { useEffect, useState } from 'react';
import { t, getCurrentLang, syncLangWithUrl, Lang } from '../../../components/i18n';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import './css/index.css';

import React from 'react';

export default function AboutRoot() {
  const [isVisible, setIsVisible] = useState(false);
  const [lang, setLang] = useState<Lang>(getCurrentLang());
  const [currentUrl, setCurrentUrl] = useState('');
  const pathname = usePathname();
  const router = useRouter();

  // 监听语言变化
  useEffect(() => {
    setIsVisible(true);
    
    // 同步URL和语言设置
    syncLangWithUrl();
    setLang(getCurrentLang());
    
    // 设置当前URL
    setCurrentUrl(window.location.href);
    
    // 监听语言变化事件
    const handleLangChange = () => {
      setLang(getCurrentLang());
      setCurrentUrl(window.location.href);
    };
    
    window.addEventListener("langchange", handleLangChange);
    return () => window.removeEventListener("langchange", handleLangChange);
  }, []);

  // 当URL变化时同步语言设置
  useEffect(() => {
    if (pathname) {
      syncLangWithUrl();
      setLang(getCurrentLang());
      if (typeof window !== 'undefined') {
        setCurrentUrl(window.location.href);
      }
    }
  }, [pathname]);

  // Features 数据
  const features = [
    {
      title: t('about.feature1Title'),
      description: t('about.feature1Description'),
      link: `/${lang === 'zh' ? 'zh' : 'en'}/gamelist`,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
        </svg>
      )
    },
    {
      title: t('about.feature2Title'),
      description: t('about.feature2Description'),
      link: `/${lang === 'zh' ? 'zh' : 'en'}/gamelist`,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      )
    },
    {
      title: t('about.feature3Title'),
      description: t('about.feature3Description'),
      link: currentUrl ? `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(currentUrl)}` : '#',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    }
  ];

  // 处理卡片点击
  const handleCardClick = (link: string) => {
    if (link.startsWith('http')) {
      window.open(link, '_blank');
    } else {
      router.push(link);
    }
  };

  return (
    <div className="min-h-screen text-white pt-20 relative">
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-black Hero-container">
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl transition-all duration-1000 ">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              {t('about.companyName')}
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
              {t('about.heroDescription')}
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <section className="py-20 bg-neutral-900 mission-section">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="transition-all duration-1000 delay-300 mission-content">
              <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">{t('about.missionTitle')}</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                {t('about.missionDescription1')}
              </p>
              <p className="text-gray-300 leading-relaxed">
                {t('about.missionDescription2')}
              </p>
            </div>
            <div className="relative h-80 transition-all duration-1000 delay-500 mission-image">
              <Image 
                src="/logo.jpg" 
                alt="Blue Prince" 
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">{t('about.featuresTitle')}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const CardContent = () => (
                <>
                  <div className="feature-icon mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </>
              );
              
              return (
                <div 
                  key={index}
                  className={`feature-card p-6 transition-all duration-1000 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  } ${feature.link ? 'cursor-pointer' : ''}`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                  onClick={feature.link ? () => handleCardClick(feature.link) : undefined}
                >
                  {feature.link ? (
                    <div className="relative w-full h-full">
                      <CardContent />
                      <div className="absolute bottom-0 right-0 p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  ) : (
                    <CardContent />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-neutral-900 contact-section">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">{t('about.contactTitle')}</h2>
          <div className={`max-w-xl mx-auto transition-all duration-1000 delay-700 contact-content ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <p className="text-gray-300 mb-8">
              {t('about.contactDescription')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <a 
                href={`mailto:${t('about.emailAddress')}`} 
                className="contact-button email-button text-white px-8 py-4 rounded-lg transition-all transform hover:scale-105"
              >
                <span className="flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  {t('about.sendEmail')}
                </span>
              </a>
              <a 
                href={currentUrl ? `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(currentUrl)}` : '#'}
                className="contact-button community-button text-white px-8 py-4 rounded-lg transition-all transform hover:scale-105"
              >
                <span className="flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                  {t('about.joinCommunity')}
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}