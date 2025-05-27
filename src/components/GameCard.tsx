"use client"
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import type { Games } from '@/types/games'



export default function GameCard(props: Games) {
  const [hover, setHover] = useState(false)
  const [imgError, setImgError] = useState(false)
  const router = useRouter()
  const date = "FEBRUARY 24, 2017";
  const tags = ['Action', 'Adventure', 'RPG'];
  useEffect(() => {
    setImgError(false);
  }, [props.logo]);
  const handleClick = () => {
    router.push(`/home?id=${props.id}&title=${props.title}&gameUrl=${props.gameUrl}&logo=${props.logo}&description=${props.description}&genre=${props.genre}&releaseDate=${props.releaseDate}&open=${props.open}`)
  }
  return (
    <div
      className="relative bg-black rounded-lg overflow-hidden border border-neutral-700 transition-all cursor-pointer shadow-lg flex flex-col"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() =>  handleClick()}
      >
      <div className="flex-1 flex flex-col">
        <div className="w-full flex-1 min-h-[120px] relative overflow-hidden">
          {imgError && (
            <div className="absolute inset-0 flex items-center justify-center bg-neutral-900 text-neutral-600 text-2xl font-bold select-none overflow-hidden z-10">
              <svg width="48" height="48" fill="none" viewBox="0 0 48 48" className="mb-2 z-10"><rect width="48" height="48" rx="12" fill="#18181b"/><path d="M16 32l8-8 8 8" stroke="#52525b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M16 20h16" stroke="#52525b" strokeWidth="2" strokeLinecap="round"/></svg>
              <span className="z-10">图片未加载</span>
            </div>
          )}
          <Image
            src={props.logo}
            alt={props.title}
            width={320}
            height={420}
            className={`w-full object-cover flex-1 min-h-[120px] transition-transform duration-1000 ease-out ${hover ? 'scale-110' : 'scale-100'}`}
            style={{
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat',
              backgroundColor: '#111',
              width: '100%', 
              height: '100%'
            }}
            onError={() => setImgError(true)}
            draggable={false}
            unoptimized
          />
        </div>
      </div>
      <div className="w-full bg-neutral-900 p-5 flex flex-col items-start border-t border-neutral-800">
        <div className="text-lg font-semibold text-white mb-1 truncate w-full" title={props.title}>{props.title}</div>
        <div className="text-xs text-neutral-400 mb-3">{date}</div>
        <div className="flex flex-wrap gap-2">
            { tags.map((t, i) => (
              <span key={i} className="bg-neutral-900 border border-neutral-700 text-xs text-white rounded px-3 py-1 font-semibold tracking-wide">{t}</span>
            ))}
          </div>
      </div>
      <div className="absolute top-4 right-4 z-10" style={{display: hover ? 'block' : 'none'}}>
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <circle cx="18" cy="18" r="18" fill="#fff" fillOpacity="0.1"/>
          <path d="M18 28s-8-5.6-8-11.2C10 13.2 12.2 11 15 11c1.7 0 3.3 1.1 4 2.7C19.7 12.1 21.3 11 23 11c2.8 0 5 2.2 5 5.8C26 22.4 18 28 18 28z" fill="#fff"/>
        </svg>
      </div>
    </div>
  )
}
