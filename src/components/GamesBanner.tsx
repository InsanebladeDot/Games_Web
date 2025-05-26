import React from 'react';

export default function GamesBanner({url='https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/library_hero.jpg'}: {url: string}) {
  return (
    <div className="w-full relative h-[300px] flex items-center border-b border-neutral-800 mb-8" 
    style={{
      backgroundImage: `url(${url})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundColor: '#111',
    }}
    >
      {/* 黑色遮罩，降低透明度 */}
      <div className="absolute inset-0 bg-black opacity-5 pointer-events-none" />
      <div className="relative z-10 px-12">
        <h1 className="text-4xl font-bold text-white mb-2">Games</h1>
        <div className="text-base text-neutral-200 font-medium">378 game interfaces for designers and video games lovers</div>
      </div>
    </div>
  );
} 