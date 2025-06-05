'use client'
import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import Image from 'next/image'
import { getGameBySimilarity } from '@/app/api/games/index'
import type { Game } from '@/types/games'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'
import { t, getCurrentLang, Lang } from './i18n'


export interface GameItem {
  name: string;
  img: string;
  date: string;
  tags?: string[];
  url?: string;
}

interface SimilarGamesProps {
  title?: string;
  games?: GameItem[];
  genre?: string;
}

export default function SimilarGames({ title, genre="Action" }: SimilarGamesProps) {
  const rowOneRef = useRef<HTMLDivElement>(null)
  const rowTwoRef = useRef<HTMLDivElement>(null)
  const [radomGames, setRadomGames] = useState<Game[]>([])
  const router = useRouter()
  const [lang, setLang] = useState<Lang | undefined>(undefined);

  useEffect(() => {
    setLang(getCurrentLang());
    
    const handler = () => {
      setLang(getCurrentLang());
    };
    
    window.addEventListener("langchange", handler);
    return () => window.removeEventListener("langchange", handler);
  }, []);

  useEffect(()=>{
    getGameBySimilarity(genre).then(res=>{
      // 获取更多游戏以填充两行
      const games = res.data?.data || [];
      console.log("Fetched games:", games);
      setRadomGames(games.length > 0 ? [...games, ...games] : []);
    }).catch(() => {
      setRadomGames([])
    })
  },[genre])

  const scroll = (dir: number, rowRef: React.RefObject<HTMLDivElement | null>) => {
    if (rowRef.current) {
      rowRef.current.scrollBy({ left: dir * 550, behavior: 'smooth' })
    }
  }

  const handleClick = (props:Game) => {
    router.push(`/home?id=${props.id}&title=${props.title}&gameUrl=${props.gameUrl}&logo=${props.logo}&description=${props.description}&genre=${props.genre}&releaseDate=${props.releaseDate}&open=${props.open}`)
  }

  if (!lang) return null;

  const formatDate = (date: string) => {
    return lang === 'zh' 
      ? dayjs(date).format('YYYY年M月D日')
      : dayjs(date).format('MMM D, YYYY');
  };

  // 将游戏分为两行
  const firstRowGames = radomGames.slice(0, Math.ceil(radomGames.length / 2));
  const secondRowGames = radomGames.slice(Math.ceil(radomGames.length / 2));

  return (
    <section>
      <div className="flex items-center mb-4">
        <h2 className="flex-1 text-xl font-bold">{title || t('similar_games.title')}</h2>
        <div className="flex space-x-2">
          <button className="bg-neutral-800 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-neutral-700" onClick={() => scroll(-1, rowOneRef)}>&lt;</button>
          <button className="bg-neutral-800 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-neutral-700" onClick={() => scroll(1, rowOneRef)}>&gt;</button>
        </div>
      </div>
      
      <div
        className="flex overflow-x-auto gap-6 pb-6 scrollbar-hide"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
        ref={rowOneRef}
      >
        {firstRowGames.map(g => (
          <div 
            className="w-[275px] bg-neutral-900 rounded-xl overflow-hidden flex-shrink-0 border-2 border-neutral-800 hover:border-neutral-700 hover:shadow-lg transition-all cursor-pointer" 
            key={`row1-${g.id}`}
            onClick={() => handleClick(g)}
          >
            <Image
              src={g.logo || 'notFund.png'}
              alt={g.title}
              width={275}
              height={176}
              className="w-full h-44 object-cover transition-transform duration-1000 ease-out"
              draggable={false}
              unoptimized
            />
            <div className="font-bold text-lg px-4 pt-3">{g.title}</div>
            <div className="text-sm text-neutral-400 px-4 pb-4">{formatDate(g.releaseDate)}</div>
          </div>
        ))}
      </div>
      
      <div className="flex items-center mb-4 mt-6">
        <h2 className="flex-1 text-xl font-bold">{lang === 'zh' ? '更多推荐' : 'More Recommendations'}</h2>
        <div className="flex space-x-2">
          <button className="bg-neutral-800 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-neutral-700" onClick={() => scroll(-1, rowTwoRef)}>&lt;</button>
          <button className="bg-neutral-800 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-neutral-700" onClick={() => scroll(1, rowTwoRef)}>&gt;</button>
        </div>
      </div>
      
      <div
        className="flex overflow-x-auto gap-6 pb-2 scrollbar-hide"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
        ref={rowTwoRef}
      >
        {secondRowGames.map(g => (
          <div 
            className="w-[275px] bg-neutral-900 rounded-xl overflow-hidden flex-shrink-0 border-2 border-neutral-800 hover:border-neutral-700 hover:shadow-lg transition-all cursor-pointer" 
            key={`row2-${g.id}`}
            onClick={() => handleClick(g)}
          >
            <Image
              src={g.logo || 'notFund.png'}
              alt={g.title}
              width={275}
              height={176}
              className="w-full h-44 object-cover transition-transform duration-1000 ease-out"
              draggable={false}
              unoptimized
            />
            <div className="font-bold text-lg px-4 pt-3">{g.title}</div>
            <div className="text-sm text-neutral-400 px-4 pb-4">{formatDate(g.releaseDate)}</div>
          </div>
        ))}
      </div>
    </section>
  )
}