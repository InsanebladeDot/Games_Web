'use client'
import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import Image from 'next/image'
import { getGameRadom } from '@/app/api/games/index'
import { Games } from '@/types/games'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'


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

function GameImg({ src, alt }: { src: string; alt: string }) {
  const [imgError, setImgError] = React.useState(false);
  const [hover, setHover] = React.useState(false);
  React.useEffect(() => { setImgError(false); }, [src]);
  if (!src) {
    return (
      <div className="w-full h-44 flex items-center justify-center bg-neutral-900 text-neutral-600 text-lg font-bold">
        无图片
      </div>
    );
  }
  return (
    <div className="w-full h-44 relative overflow-hidden"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {imgError && (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-900 text-neutral-600 text-lg font-bold select-none overflow-hidden z-10">
          <svg width="36" height="36" fill="none" viewBox="0 0 48 48" className="mb-1 z-10"><rect width="48" height="48" rx="12" fill="#18181b"/><path d="M16 32l8-8 8 8" stroke="#52525b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M16 20h16" stroke="#52525b" strokeWidth="2" strokeLinecap="round"/></svg>
          <span className="z-10">图片未加载</span>
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        width={220}
        height={176}
        className={`w-full h-44 object-cover transition-transform duration-1000 ease-out ${hover ? 'scale-110' : 'scale-100'}`}
        onError={() => setImgError(true)}
        draggable={false}
        unoptimized
      />
    </div>
  );
}

export default function SimilarGames({ title = "Similar games" }: SimilarGamesProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [RadomGames, setRadomGames] = useState<Games[]>([])
  const router = useRouter()
  useEffect(()=>{
    getGameRadom().then(res=>{
      console.log("随机游戏",res.data)
      setRadomGames(res.data.data || [])
    })
  },[])
  const scroll = (dir: number) => {
    if (ref.current) {
      ref.current.scrollBy({ left: dir * 420, behavior: 'smooth' })
    }
  }
  const handleClick = (props:Games) => {
    router.push(`/games?id=${props.id}&title=${props.title}&gameUrl=${props.gameUrl}&logo=${props.logo}&description=${props.description}&genre=${props.genre}&releaseDate=${props.releaseDate}&open=${props.open}`)
  }
  return (
    <section>
      <div className="flex items-center mb-4">
        <h2 className="flex-1 text-xl font-bold">{title}</h2>
        <button className="bg-neutral-800 text-white rounded-full w-8 h-8 mx-2" onClick={() => scroll(-1)}>&lt;</button>
        <button className="bg-neutral-800 text-white rounded-full w-8 h-8 mx-2" onClick={() => scroll(1)}>&gt;</button>
      </div>
      <div
        className="flex overflow-x-auto gap-6 pb-2 scrollbar-hide"
        style={
          {
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }
        }
        ref={ref}
      >
        {RadomGames.map(g => (
          <div className="w-[220px] bg-neutral-900 rounded-xl overflow-hidden flex-shrink-0 border-2 border-neutral-800 hover:border-neutral-200 transition-all cursor-pointer" key={g.id}
          onClick={()=>handleClick(g)}>
            <GameImg src={g.logo || '/default.png'} alt={g.title} />
            <div className="font-bold text-lg px-3 pt-2">{g.title}</div>
            <div className="text-sm text-neutral-400 px-3 pb-3">{dayjs(g.releaseDate).format('YYYY年M月D日')}</div>
          </div>
        ))}
      </div>
    </section>
  )
}