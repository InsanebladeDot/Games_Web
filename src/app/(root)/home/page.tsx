'use client'
import { useEffect, useState } from "react";
import GameComments from '@/components/GameComments'
import GameTips from '@/components/GameTips'
import GameIntro from '@/components/home/GameIntro'
import SimilarGames from '@/components/SimilarGames'
import type { Game } from '@/types/games'
import GameCard from '@/components/GameCard'
import { getGameById } from '@/app/api/games';

type SegmentParams = Record<string, string | string[] | undefined>;

interface ParamsType extends SegmentParams {
  gameId?: string;
}

interface GameDetailProps {
  params?: Promise<ParamsType>;
}

export default function GameDetail({
  params
}: GameDetailProps) {
  const [gameData, setGameData] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGameData() {
      try {
        setLoading(true);
        
        // 从 params 中获取 gameId
        const gameId = params && await params.then(p => p.gameId);
        if (gameId) {
          const response = await getGameById(Number(gameId));
          if (response.data && response.data.data) {
            setGameData(response.data.data);
          }
        }
      } catch (error) {
        console.error('Error fetching game data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchGameData();
  }, [params]);

  // 加载状态
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-xl">加载中...</div>
      </div>
    );
  }

  // 如果没有找到游戏数据
  if (!gameData) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-xl">未找到游戏数据</div>
      </div>
    );
  }

  const { 
    id, 
    developerId, 
    title, 
    logo, 
    gameUrl, 
    genre, 
    open, 
    releaseDate, 
    description, 
    recommendedVideos, 
    gameIntroduction,
    downloadLink
  } = gameData;
  
  return (
    <div className="min-h-screen bg-black text-white">
      {/* 顶部 Banner */}

      {/* 主体区域：GameCard + 内嵌游戏 */}
      <div id="game-embed-section" className="w-full flex flex-col md:flex-row px-5 mt-8 items-start">
        <div className="hidden md:block md:min-w-[320px] md:max-w-[360px] md:mr-8">
          <GameCard {...gameData} />
        </div>
        <div className="flex-1 ml-0 md:ml-6 lg:ml-8 flex flex-col justify-center min-h-[600px] w-full" style={{paddingRight: '0px', paddingLeft: '0px'}}>
          {gameUrl && gameUrl !== '' ? (
            <div className="w-full md:w-[90%] lg:w-[85%] xl:w-[80%] mx-auto h-0 pb-[56.25%] md:pb-[50.625%] lg:pb-[47.8125%] xl:pb-[45%] relative">
              <iframe
                src={gameUrl}
                title={title || '游戏'}
                className="absolute top-0 left-0 w-full h-full rounded-xl border-2 border-neutral-800 bg-black"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="text-center w-full text-neutral-400">未提供游戏链接</div>
          )}
          
          {/* 社交媒体分享栏 */}
          <div className="w-full md:w-[90%] lg:w-[85%] xl:w-[80%] mx-auto flex mt-4 rounded-lg overflow-hidden text-xs sm:text-sm md:text-base">
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
               target="_blank"
               rel="noopener noreferrer"
               className="flex-1 bg-[#1877F2] hover:bg-[#166fe0] text-white py-3 flex items-center justify-center transition-colors">
              <span className="mr-2">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
              </span>
              Facebook
            </a>
            <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(title || '')}`}
               target="_blank"
               rel="noopener noreferrer"
               className="flex-1 bg-[#1DA1F2] hover:bg-[#1a94df] text-white py-3 flex items-center justify-center transition-colors">
              <span className="mr-2">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
              </span>
              Twitter
            </a>
            <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(title || '')}`}
               target="_blank"
               rel="noopener noreferrer"
               className="flex-1 bg-[#0A66C2] hover:bg-[#095bb0] text-white py-3 flex items-center justify-center transition-colors">
              <span className="mr-2">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </span>
              LinkedIn
            </a>
            <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${title || ''} ${window.location.href}`)}`}
               target="_blank"
               rel="noopener noreferrer"
               className="flex-1 bg-[#25D366] hover:bg-[#22c35e] text-white py-3 flex items-center justify-center transition-colors">
              <span className="mr-2">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </span>
              WhatsApp
            </a>
            <a href={`https://www.reddit.com/submit?url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(title || '')}`}
               target="_blank"
               rel="noopener noreferrer"
               className="flex-1 bg-[#FF4500] hover:bg-[#e63e00] text-white py-3 flex items-center justify-center transition-colors">
              <span className="mr-2">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/></svg>
              </span>
              Reddit
            </a>
          </div>
        </div>
      </div>


      {/* 评论区 */}
      <div className="w-full px-5 mt-8">
        <GameComments gameId={id || 0} />
      </div>
      
      <GameIntro 
        title={title || ''} 
        description={description || ''} 
        recommendedVideos={recommendedVideos || ''} 
        id={id || null} 
        developerId={developerId || null} 
        logo={logo || ''} 
        gameUrl={gameUrl || ''} 
        genre={genre || ''} 
        open={open || false} 
        releaseDate={releaseDate || ''} 
        gameIntroduction={gameIntroduction || ''} 
        downloadLink={downloadLink || gameUrl || ''} 
      />

      {/* 游戏指南 */}
      <div className="w-full bg-gray-950 py-8 mt-8">
        <GameTips  
          gameUrl={gameUrl || ''} 
          downloadLink={downloadLink || ''} 
          id={id || null} 
          developerId={developerId || null} 
          title={title || ''} 
          logo={logo || ''} 
          genre={genre || ''} 
          open={open || false} 
          releaseDate={releaseDate || ''} 
          description={description || ''} 
          recommendedVideos={recommendedVideos || ''} 
          gameIntroduction={gameIntroduction || ''} 
        />
      </div>
        
      {/* 其他游戏推荐 */}
      <div className="w-full px-5 mt-8">
        <SimilarGames genre={genre || ''} />
      </div>
    </div>
  )
}