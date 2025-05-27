'use client';

import React from 'react';
// import { t, getCurrentLang, Lang } from './i18n'; // 暂时注释掉i18n，直接使用通用文本

// 模拟 t 函数，直接返回输入（或者一个简单的通用文本处理）

// 模拟 getCurrentLang 函数
interface GameTipsProps {
  gameId: string | number;
  gameUrl?: string;
}

export default function GameTips({ gameUrl }: GameTipsProps) {
  // Removed unused mounted and lang state variables and their setters
  // const [mounted, setMounted] = useState(false);
  // const [lang, setLang] = useState<string | undefined>(undefined);

  // Removed useEffect hook related to mounting and language as it's no longer needed
  // useEffect(() => {
  //   setMounted(true);
  //   // Removed language listener logic as i18n is not used
  //   // Removed unused handler and event listener
  // }, []);

  // 提供通用的游戏提示
  const getTipsByGameId = () => { 
    return [
      {
        icon: '🎮',
        title: '游戏目标', // 通用标题
        description: [
          '了解基本规则和获胜条件。', // 通用描述
          '掌握核心玩法。',
          '探索地图和环境。',
          '与队友协作（如果适用）。'
        ]
      },
      {
        icon: '🎯',
        title: '控制方式', // 通用标题
        description: [
          '熟悉角色移动和视角控制。', // 通用描述
          '了解攻击和防御操作。',
          '掌握特殊技能的使用。',
          '自定义按键设置（如果支持）。'
        ]
      },
      {
        icon: '⚙️',
        title: '游戏机制', // 通用标题
        description: [
          '理解资源收集和管理。', // 通用描述
          '熟悉升级和强化系统。',
          '了解游戏内的经济或进度。',
          '应对游戏中的挑战和事件。'
        ]
      },
      {
        icon: '💡',
        title: '实用技巧', // 通用标题
        description: [
          '选择适合自己的策略。', // 通用描述
          '观察对手或敌人。',
          '利用环境优势。',
          '持续学习和适应。'
        ]
      }
    ];
  };

  // 提供通用的游戏特性
  const getFeaturesByGameId = () => { 
    return [
      {
        icon: '📊',
        title: '紧张刺激', // 通用标题
        description: '快节奏的游戏体验，让你肾上腺素飙升。' // 通用描述
      },
      {
        icon: '👑',
        title: '竞技挑战', // 通用标题
        description: '与其他玩家一较高下，争夺胜利荣耀。' // 通用描述
      },
      {
        icon: '🎯',
        title: '极具策略', // 通用标题
        description: '需要深思熟虑的决策和灵活的战术。' // 通用描述
      },
      {
        icon: '🐑', // 保留羊图标，增加趣味性，或者换成通用图标
        title: '独特玩法', // 通用标题
        description: '创新的游戏模式和机制带来前所未有的乐趣。' // 通用描述
      },
      {
        icon: '🌐',
        title: '全球联机', // 通用标题
        description: '与来自世界各地的玩家互动和竞技。' // 通用描述
      },
      {
        icon: '🎮',
        title: '免费体验', // 通用标题
        description: '无需付费即可畅玩核心内容。' // 通用描述
      }
    ];
  };

  // Removed loading placeholder as mounted state is removed
  // if (!mounted) { /* ... */ }

  // Call functions directly as they no longer depend on state/props
  const tips = getTipsByGameId(); 
  const features = getFeaturesByGameId(); 

  // 立即游玩按钮滚动到内嵌游戏区域
  const handlePlayClick = () => {
    // Assuming 'game-embed-section' is the ID for the game iframe/embed container in the parent component
    const el = document.getElementById('game-embed-section'); 
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else if (gameUrl) {
      // If no embed element, could consider navigating to gameUrl, but this might not be desired
      // window.location.href = gameUrl;
      console.warn("找不到id为'game-embed-section'的元素，且未提供gameUrl用于跳转。");
    }
  };

  return (
    <section className="w-full mt-8 mb-10 max-w-5xl mx-auto px-3">
      <h2 className="text-3xl font-bold text-center mb-8 text-green-500">
        游戏指南
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tips.map((tip, index) => (
          <div 
            key={index} 
            className="bg-gray-900 rounded-lg p-5 border-l-4 border-green-500 shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center text-2xl mr-4">
                {tip.icon}
              </div>
              <h3 className="text-xl font-semibold text-green-400">{tip.title}</h3>
            </div>
            <ul className="space-y-3 text-gray-300 text-lg">
              {tip.description.map((line, i) => (
                <li key={i} className="flex items-start">
                  <span className="mr-2 text-green-400">•</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-5 bg-gray-900 border border-green-800 rounded-lg">
        <p className="flex items-center text-gray-300 text-lg">
          <span className="font-bold text-green-400 mr-2 text-xl">
            小贴士:
          </span>
          掌握基本操作是成功的关键！
        </p>
      </div>
      
      <div className="mt-16 text-center">
        <h2 className="text-3xl font-bold mb-8 text-green-500">
          游戏特色
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-900 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 rounded-full bg-green-600 flex items-center justify-center text-2xl mb-4 mx-auto">
                <span>{feature.icon}</span>
              </div>
              <h3 className="text-xl font-semibold text-center text-green-400 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-300 text-center text-lg">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-16 text-center">
        <h2 className="text-3xl font-bold mb-4 text-green-500">
          立即下载
        </h2>
        <p className="text-gray-400 mb-6 max-w-3xl mx-auto text-lg">
          准备好迎接挑战了吗？立即下载游戏，开始你的冒险！
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
          {['Windows', 'macOS', 'Linux'].map((platform) => (
            <a
              key={platform}
              href={gameUrl || '#'}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-900 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow cursor-pointer hover:bg-gray-800 block"
              title={`下载 ${platform} 版本`}
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
          请确保从官方渠道下载，保障您的设备安全。
        </p>
      </div>
      
      <div className="mt-8 flex justify-center gap-4">
        <button className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow-lg transition-colors text-lg" onClick={handlePlayClick}>
          立即游玩
        </button>
        <a
          href={gameUrl || '#'}
          download
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-3 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-lg shadow-lg transition-colors text-lg flex items-center justify-center"
        >
          下载游戏
        </a>
      </div>
    </section>
  );
} 