'use client'
import { use} from "react";
import Sidebar from '@/components/Sidebar'
import GameDetailBanner from '@/components/GameDetailBanner'
import GamePosterDetail from '@/components/GamePosterDetail'
import GameComments from '@/components/GameComments'
import SimilarGames from '@/components/SimilarGames'
import type { Games } from '@/types/games'
import dayjs from "dayjs";

interface ParamsType {
  name: string
}

export default function GameDetail({
  searchParams
}: {
  params: Promise<ParamsType>,
  searchParams: Promise<Games>
}) {
  const { id, title, gameUrl, logo, description, genre, releaseDate } = use(searchParams);
  // mock 数据，实际可根据name查找
  const gameDetail = {
    name:title,
    img: logo,
    date: dayjs(releaseDate).format('YYYY年M月D日'),
    tags: ["Action", "Adventure", "Indie", "Platformer"],
    desc: description
    };
  return (
    <div className="min-h-screen bg-black text-white">
      {/* 顶部 Banner */}
      <div className="w-full pt-[84px]">
        <GameDetailBanner 
          title={title}
          releaseDate={dayjs(releaseDate).format('MMMM D, YYYY')}
          genres={genre ? genre.split(',') : ["Action", "Adventure"]}
          platform="PC / Console"
          cover={logo}
          bannerImage={logo}
        />
      </div>

      {/* 主体区域：Sidebar + 内嵌游戏 */}
      <div className="w-full flex px-5 mt-8 items-start">
        <Sidebar />
        <div className="flex-1 ml-4 md:ml-6 lg:ml-8 flex justify-center min-h-[600px]" style={{paddingRight: '50px'}}>
          {gameUrl ? (
            <iframe
              src={gameUrl}
              title={title}
              className="w-full h-[600px] rounded-xl border-2 border-neutral-800 bg-black"
              allowFullScreen
            />
          ) : (
            <div className="text-center w-full text-neutral-400">未提供游戏链接</div>
          )}
        </div>
      </div>

      {/* 海报详情 */}
      <div className="w-full px-5 mt-8">
        <GamePosterDetail {...gameDetail} />
      </div>

      {/* 评论区 */}
      <div className="w-full px-5 mt-8">
        <GameComments gameId={id} />
      </div>

      {/* 其他游戏推荐 */}
      <div className="w-full px-5 mt-8">
        <SimilarGames title="其他游戏推荐" genre={genre}/>
      </div>
    </div>
  )
}