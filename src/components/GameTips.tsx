'use client';

import React, { useEffect } from 'react';
import type { Game } from '@/types/games';
import MdEditor from './MdEditor';
import { t} from './i18n';

export default function GameTips({gameUrl, downloadLink, gameIntroduction}: Game) {
  // 使用一个简单的状态更新来强制重新渲染
  const [, forceUpdate] = React.useReducer((x: number) => x + 1, 0);

  // 监听语言变化
  useEffect(() => {
    const handleLangChange = () => {
      // 强制重新渲染组件
      forceUpdate();
    };
    
    window.addEventListener('langchange', handleLangChange);
    return () => {
      window.removeEventListener('langchange', handleLangChange);
    };
  }, []);

  // 立即游玩按钮滚动到内嵌游戏区域
  const handlePlayClick = () => {
    const el = document.getElementById('game-embed-section'); 
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else if (gameUrl) {
      console.warn("找不到id为'game-embed-section'的元素，且未提供gameUrl用于跳转。");
    }
  };

  return (
    <section className="w-full mt-8 mb-10 max-w-5xl mx-auto px-3">
      {gameIntroduction ? (
        <MdEditor markdownText={gameIntroduction} />
      ) : null}
      
      {/* 下载部分 */}
      <div className="mt-16 text-center">
        <h2 className="text-3xl font-bold mb-4 text-green-500">
          {t('download.title')}
        </h2>
        <p className="text-gray-400 mb-6 max-w-3xl mx-auto text-lg">
          {t('download.description')}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
          {['Windows', 'macOS', 'Linux'].map((platform) => (
            <a
              key={platform}
              href={downloadLink}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#171a2a] rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow cursor-pointer hover:bg-[#1c2035] block"
              title={`${t('download')} ${platform}`}
            >
              <div className="flex justify-center mb-3">
                <svg className="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center text-green-400">
                {platform}
              </h3>
            </a>
          ))}
        </div>
        
        <p className="text-gray-400 mt-4 text-base">
          {t('download.securityNote')}
        </p>
      </div>
      
      <div className="mt-8 flex justify-center gap-4">
        <button className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow-lg transition-colors text-lg" onClick={handlePlayClick}>
          {t('tips.playNow')}
        </button>
        <a
          href={downloadLink}
          download
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-3 bg-[#9333ea] hover:bg-[#7928ca] text-white font-bold rounded-lg shadow-lg transition-colors text-lg flex items-center justify-center"
        >
          {t('tips.download')}
        </a>
      </div>
    </section>
  );
} 