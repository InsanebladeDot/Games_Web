'use client'
import Sidebar from '../../components/Sidebar'
import GameCard from '../../components/GameCard'
import SimilarGames from '@/components/SimilarGames'
import GamesBanner from '../../components/GamesBanner'
import { getGames } from '@/app/api/games'
import { useState, useEffect } from 'react';
import type { Games } from '@/types/games'


export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [games, setGames] = useState<Games[]>([]);

  useEffect(() => {
    getGames().then(res => {
      setGames(res.data.data);
    });

    setMounted(true);
  }, []);


  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="pt-[84px] w-full">
        {/* Banner */}
        <div className="w-full px-5">
          <GamesBanner url="https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/library_hero.jpg" />
        </div>
        {/* 主内容整体：Sidebar+游戏区 占满宽度，左右各留20px白边 */}
        <div className="w-full flex px-5">
          <Sidebar />
          <main className="flex-1">
            <section className="mb-8 mt-6">
              <div className="grid grid-cols-1 pd-2 md:grid-cols-2 lg:grid-cols-4 gap-[30px]" style={{paddingRight: '100px'}}>
                {Array.isArray(games) && games.map((g, i) => (
                  <GameCard  key={i} {...g} />
                ))}
              </div>
            </section>
          </main>
        </div>
        {/* Developed by... */}
        <div className="w-full px-6 mt-6">
          <section className="bg-neutral-900 rounded-xl p-6 mb-8 w-full flex flex-row gap-[50px]">
            <div className="mb-4">Developed by: <b>Raw Fury</b></div>
            <div>Published by: <b>Raw Fury</b></div>
          </section>
        </div>
        {/* Similar games */}
        <div className="w-full px-6 mt-2">
          <SimilarGames />
        </div>
      </div>
    </div>
  );
}