import React from 'react';
import Image from 'next/image';

interface GameDetailBannerProps {
  title: string;
  releaseDate?: string;
  genres?: string[];
  platform?: string;
  cover?: string;
  bannerImage?: string;
}

export default function GameDetailBanner({
  title = "The Legend of Zelda: Breath of the Wild",
  releaseDate = "March 3, 2017",
  genres = ["ACTION", "ADVENTURE", "PUZZLE"],
  platform = "Nintendo Switch",
  cover = "/zelda-cover.jpg",
  bannerImage = "https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/ncom/en_US/games/switch/t/the-legend-of-zelda-breath-of-the-wild-switch/hero"
}: GameDetailBannerProps) {
  return (
    <div className="w-full relative h-[300px] border-b border-neutral-800 mb-8 overflow-hidden" 
      style={{
        backgroundImage: `url(${bannerImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#111',
        width: '100%', 
        height: '100%'
      }}
    >
      {/* 半透明渐变遮罩 */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent pointer-events-none" />
      
      <div className="flex items-center h-full relative z-10 px-8">
        {/* 左侧封面图 */}
        <div className="w-[130px] h-[180px] mr-6 rounded-md overflow-hidden border-2 border-white/20 shadow-lg flex-shrink-0">
          <Image 
            src={cover || 'notFund.png'} 
            alt={title}
            width={260}
            height={360}
            className="w-full h-full object-cover object-center"
            priority
            unoptimized
          />
        </div>
        
        {/* 游戏信息 */}
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">{title}</h1>
          <div className="text-sm text-neutral-300 mb-4">{releaseDate}</div>
          
          {/* 标签 */}
          <div className="flex flex-wrap gap-2 mb-4">
            {genres.map(genre => (
              <span key={genre} className="bg-white/10 hover:bg-white/20 transition-colors text-white text-xs font-semibold px-3 py-1 rounded uppercase tracking-wider">
                {genre}
              </span>
            ))}
          </div>
        </div>
        
        {/* 右侧平台信息 */}
        <div className="absolute right-8 bottom-8 text-sm text-white/80">
          Available for {platform}
        </div>
      </div>
    </div>
  );
} 