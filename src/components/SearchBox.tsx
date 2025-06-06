'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { t } from './i18n';
import type { Game } from '@/types/games';
import { getCachedItem } from '@/lib/localStorageCache';

// 定义缓存键名，与gamelist页面保持一致
const GAMES_CACHE_KEY = 'cachedGamesList';

interface SearchBoxProps {
  games?: Game[];
  onSelectGame?: (game: Game) => void;
}

// 为了解决any类型问题，定义游戏扩展接口
interface GameWithRecommendation extends Game {
  isRecommended?: boolean;
}

const SearchBox: React.FC<SearchBoxProps> = ({ games: propGames, onSelectGame }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [filteredGames, setFilteredGames] = useState<GameWithRecommendation[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [localGames, setLocalGames] = useState<GameWithRecommendation[]>([]);
  const [gamesCount, setGamesCount] = useState<number | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // 从本地缓存加载游戏数据
  useEffect(() => {
    // 1. 尝试从本地缓存获取游戏列表
    const cachedGames = getCachedItem<GameWithRecommendation[]>(GAMES_CACHE_KEY);
    
    if (cachedGames) {
      setLocalGames(cachedGames);
      setGamesCount(cachedGames.length);
    } else if (propGames && propGames.length > 0) {
      setLocalGames(propGames as GameWithRecommendation[]);
      setGamesCount(propGames.length);
    }
  }, [propGames]);

  // 从本地存储加载搜索历史
  useEffect(() => {
    const history = localStorage.getItem('searchHistory');
    if (history) {
      setSearchHistory(JSON.parse(history));
    }
  }, []);

  // 处理搜索输入
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value.trim() === '') {
      // 显示推荐游戏
      const recommended = localGames
        .filter(game => game.isRecommended || true) // 暂时所有游戏都视为推荐，确保有足够的游戏显示
        .slice(0, 20); // 显示20个推荐游戏
      setFilteredGames(recommended);
    } else {
      // 模糊匹配
      const matched = localGames
        .filter(game => 
          game.title.toLowerCase().includes(value.toLowerCase())
        )
        .slice(0, 20);
      setFilteredGames(matched);
    }
  };

  // 处理游戏选择
  const handleSelectGame = (game: Game) => {
    setSearchTerm(game.title);
    setIsSearchFocused(false);
    
    // 保存到搜索历史
    const newHistory = [game.title, ...searchHistory.filter(item => item !== game.title)].slice(0, 5);
    setSearchHistory(newHistory);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
    
    // 构建URL参数
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
    
    // 调用外部回调
    if (onSelectGame) {
      onSelectGame(game);
    }
    
    // 导航到游戏详情页
    router.push(`/home?${params.toString()}`);
  };

  // 清除搜索历史
  const clearHistory = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
  };

  // 删除单个搜索历史
  const removeHistoryItem = (e: React.MouseEvent, item: string) => {
    e.stopPropagation();
    const newHistory = searchHistory.filter(i => i !== item);
    setSearchHistory(newHistory);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
  };

  // 初始化时显示推荐游戏
  useEffect(() => {
    if (localGames.length > 0) {
      // 确保显示20个推荐游戏
      const recommended = localGames
        .filter(game => game.isRecommended || true) // 暂时所有游戏都视为推荐，确保有足够的游戏显示
        .slice(0, 20);
      setFilteredGames(recommended);
    }
  }, [localGames]);

  // 点击外部关闭搜索结果
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 决定是否显示搜索结果
  const showSearchResults = isSearchFocused || searchTerm.length > 0;

  return (
    <div className="relative w-[300px]" ref={searchRef}>
      {/* 搜索输入框 */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        <input
          ref={inputRef}
          type="search"
          className="block w-full p-2 pl-10 text-sm bg-[#1a1a1a] border border-[#333] rounded-lg focus:ring-blue-500 focus:border-blue-500 text-white"
          placeholder={gamesCount !== null ? `${t('header.search')} (${gamesCount} ${t('searchBox.games')})` : t('header.search')}
          value={searchTerm}
          onChange={handleSearchChange}
          onFocus={() => setIsSearchFocused(true)}
        />
        {searchTerm && (
          <button 
            className="absolute inset-y-0 right-0 flex items-center pr-3"
            onClick={() => {
              setSearchTerm('');
              if (inputRef.current) inputRef.current.focus();
            }}
          >
            <svg className="w-4 h-4 text-gray-400 hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        )}
      </div>

      {/* 搜索结果区域 - 只在有搜索内容或点击搜索框时显示 */}
      {showSearchResults && (
        <div className="absolute w-full bg-[#1a1a1a] border border-[#333] rounded-lg shadow-lg h-[500px] overflow-y-auto scrollbar-hide z-50 mt-1" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <style jsx global>{`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
            .scrollbar-hide {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}</style>
          
          {/* 搜索历史 */}
          {searchHistory.length > 0 && (
            <div className="px-3 py-2">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm text-gray-400">{t('searchBox.searchHistory')}</h3>
                <span 
                  className="text-xs text-gray-500 hover:text-gray-300 cursor-pointer"
                  onClick={clearHistory}
                >
                  {t('searchBox.clear')}
                </span>
              </div>
              {searchHistory.map((item, index) => (
                <div 
                  key={`history-${index}`}
                  className="flex items-center justify-between p-2 hover:bg-[#2a2a2a] rounded cursor-pointer"
                  onClick={() => {
                    setSearchTerm(item);
                    const matched = localGames
                      .filter(game => game.title.toLowerCase().includes(item.toLowerCase()))
                      .slice(0, 20);
                    setFilteredGames(matched);
                  }}
                >
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span className="text-sm text-white">{item}</span>
                  </div>
                  <span 
                    className="text-gray-500 hover:text-gray-300 cursor-pointer"
                    onClick={(e) => removeHistoryItem(e, item)}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* 分隔线 */}
          {searchHistory.length > 0 && filteredGames.length > 0 && (
            <hr className="border-[#333] mx-3" />
          )}

          {/* 游戏列表 */}
          <div className="py-2">
            <h3 className="px-3 py-1 text-sm text-gray-400">
              {searchTerm.trim() === '' ? t('searchBox.recommendedGames') : t('searchBox.searchResults')}
            </h3>
            
            {filteredGames.length > 0 ? (
              filteredGames.map((game) => (
                <div 
                  key={game.id?.toString() || game.title}
                  className="flex items-center px-3 py-2 hover:bg-[#2a2a2a] cursor-pointer"
                  onClick={() => handleSelectGame(game)}
                >
                  {game.isRecommended && searchTerm.trim() === '' && (
                    <span className="mr-2 text-orange-500">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd"></path>
                      </svg>
                    </span>
                  )}
                  {game.logo && (
                    <div className="relative w-8 h-8 mr-3">
                      <Image 
                        src={game.logo} 
                        alt={game.title}
                        className="object-cover rounded"
                        fill
                        sizes="32px"
                      />
                    </div>
                  )}
                  <span className="text-white text-sm truncate">{game.title}</span>
                </div>
              ))
            ) : (
              <div className="px-3 py-2 text-sm text-gray-500">{t('searchBox.noResults')}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBox; 