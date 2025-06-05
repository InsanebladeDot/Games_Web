'use client'
import Sidebar from '../../../components/Sidebar'
import GameCard from '../../../components/GameCard'
import SimilarGames from '@/components/SimilarGames'
import GamesBanner from '../../../components/GamesBanner'
import { getGames } from '@/app/api/games'
import { useState, useEffect } from 'react';
import type { Game } from '@/types/games'
import { getCachedItem, setCachedItem } from '@/lib/localStorageCache';

// 定义一个用于存储游戏列表的缓存键名
const GAMES_CACHE_KEY = 'cachedGamesList';

export default function GameListPage() {
  const [mounted, setMounted] = useState(false);
  const [games, setGames] = useState<Game[]>([]);
  // 分页相关状态
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  useEffect(() => {
    // 1. 尝试从本地缓存获取游戏列表
    const cachedGames = getCachedItem<Game[]>(GAMES_CACHE_KEY);

    if (cachedGames) {
      // 如果本地缓存存在且未过期，则直接使用缓存数据
      setGames(cachedGames);
    } else {
      // 2. 如果本地缓存不存在或已过期，则发起网络请求
      console.log("Fetching games from API...");
      getGames().then(res => {
        const fetchedGames = res.data.data;
        console.log("Fetched games:", res.data);
        setGames(fetchedGames);
        // 3. 将获取到的新数据存入本地缓存
        setCachedItem(GAMES_CACHE_KEY, fetchedGames);
      }).catch(error => {
        console.error("Error fetching games:", error);
        // 处理错误，例如显示错误消息给用户
      });
    }

    setMounted(true);
  }, []);

  // 分页逻辑
  const total = games.length;
  const totalPages = Math.ceil(total / pageSize);
  const pagedGames = games.slice((currentPage - 1) * pageSize, currentPage * pageSize);

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
              <h3 className="text-2xl font-bold mb-6 text-green-500">热门游戏推荐</h3>
              {/* 分页控件 */}
              <div className="flex items-center gap-2 mb-4">
                <span>共 {total} 条记录</span>
                <select
                  className="ml-2 px-2 py-1 rounded bg-neutral-800 text-white border-none focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-none"
                  value={pageSize}
                  onChange={e => {
                    setPageSize(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                >
                  {[10, 20, 30, 50, 100, 200].map(size => (
                    <option
                      key={size}
                      value={size}
                      className="bg-neutral-800 text-white"
                    >
                      {size}条/页
                    </option>
                  ))}
                </select>
                <button
                  className="px-2 py-1 rounded bg-neutral-800 disabled:opacity-50"
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                >首页</button>
                <button
                  className="px-2 py-1 rounded bg-neutral-800 disabled:opacity-50"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >上一页</button>
                {/* 页码数字 */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).slice(Math.max(0, currentPage - 3), currentPage + 2).map(page => (
                  <button
                    key={page}
                    className={`px-2 py-1 rounded ${page === currentPage ? 'bg-white text-black' : 'bg-neutral-800'}`}
                    onClick={() => setCurrentPage(page)}
                  >{page}</button>
                ))}
                <button
                  className="px-2 py-1 rounded bg-neutral-800 disabled:opacity-50"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >下一页</button>
                <button
                  className="px-2 py-1 rounded bg-neutral-800 disabled:opacity-50"
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                >末页</button>
                <span className="ml-2">第 {currentPage} / {totalPages} 页</span>
              </div>
              <div className="grid grid-cols-1 pd-2 md:grid-cols-2 lg:grid-cols-4 gap-[30px]" style={{paddingRight: '100px'}}>
                {Array.isArray(pagedGames) && pagedGames.map((g, i) => (
                  <GameCard key={i} {...g} />
                ))}
              </div>
            </section>
          </main>
        </div>
        {/* Developed by... */}
        <div className="w-full px-6 mt-6">
          <section className="bg-neutral-900 rounded-xl p-6 mb-8 w-full flex flex-row gap-[50px]">
            <h3 className="sr-only">游戏开发与发行信息</h3>
            <div className="mb-4">Developed by: <b>Raw Fury</b></div>
            <div>Published by: <b>Raw Fury</b></div>
          </section>
        </div>
        {/* Similar games */}
        <div className="w-full px-6 mt-2">
          <section>
            <h3 className="text-2xl font-bold mb-6 text-green-500">类似游戏</h3>
          <SimilarGames genre="Action" />
          </section>
        </div>
      </div>
    </div>
  );
}