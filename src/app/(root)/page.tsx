'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getGameById } from '@/app/api/games';
import { getCachedItem, setCachedItem } from '@/lib/localStorageCache';
import type { Game } from '@/types/games';

const GAME_DETAIL_KEY_PREFIX = 'game_detail_';

// 获取单个游戏（优先本地缓存）
async function fetchGameWithCache(id: number): Promise<Game | null> {
  const cacheKey = `${GAME_DETAIL_KEY_PREFIX}${id}`;
  
  // 1. 先查本地
  const local = getCachedItem<Game>(cacheKey);
  if (local) {
    return local;
  }
  
  // 2. 没有就请求接口
  try {
    const res = await getGameById(id);
    if (res.data.code === 0) {
      const game = res.data.data;
      // 3. 存入缓存
      setCachedItem(cacheKey, game);
      return game;
    }
  } catch (error) {
    console.error('获取游戏详情失败:', error);
  }
  return null;
}

export default function Root() {
  const router = useRouter();

  useEffect(() => {
    async function loadGame() {
      const game = await fetchGameWithCache(92);
      if (!game) return;
      // 用获取到的游戏数据作为params
      const params = new URLSearchParams({
        id: String(game.id ?? ''),
        title: game.title ?? '',
        gameUrl: game.gameUrl ?? '',
        logo: game.logo ?? '',
        description: game.description ?? '',
        genre: game.genre ?? '',
        releaseDate: game.releaseDate ?? '',
        open: String(game.open ?? ''),
        recommendedVideos: game.recommendedVideos ?? '',
        gameIntroduction: game.gameIntroduction ?? '',
        downloadLink: game.downloadLink ?? ''
      });
      router.push(`/home?${params.toString()}`);
    }
    loadGame();
  }, [router]);

  return null;
}