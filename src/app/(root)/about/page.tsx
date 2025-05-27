'use client';

import { useEffect, useState } from 'react';

export default function AboutRoot() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-black">
          <div className="animate-shimmer absolute inset-0"></div>
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className={`max-w-3xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              Blue Prince
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
              探索无限可能的游戏世界，发现属于你的精彩冒险。我们致力于为玩家带来最优质的游戏体验。
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <section className="py-20 bg-neutral-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <h2 className="text-3xl font-bold mb-6">我们的使命</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                Blue Prince 致力于打造一个充满创意和激情的游戏平台，让每一位玩家都能找到属于自己的游戏天地。
              </p>
              <p className="text-gray-400 leading-relaxed">
                我们相信游戏不仅仅是娱乐，更是一种艺术形式，能够连接人们、激发创造力，并带来无限可能。
              </p>
            </div>
            <div className={`relative h-80 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg overflow-hidden">
                <div className="animate-shimmer absolute inset-0"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">我们的特色</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: '精选游戏',
                description: '严格筛选，只为呈现最优质的游戏内容',
                icon: '🎮'
              },
              {
                title: '实时更新',
                description: '第一时间获取最新游戏资讯和更新',
                icon: '🔄'
              },
              {
                title: '社区互动',
                description: '加入玩家社区，分享游戏体验',
                icon: '👥'
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className={`bg-neutral-900 p-6 rounded-lg transition-all duration-1000 hover:bg-neutral-800 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-neutral-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">联系我们</h2>
          <div className={`max-w-xl mx-auto transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <p className="text-gray-400 mb-8">
              有任何问题或建议？我们随时欢迎您的反馈！
            </p>
            <div className="flex justify-center space-x-6">
              <a href="mailto:contact@blueprince.com" className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors">
                发送邮件
              </a>
              <a href="#" className="bg-neutral-800 hover:bg-neutral-700 text-white px-6 py-3 rounded-lg transition-colors">
                加入社区
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}