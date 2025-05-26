"use client"
import React, { useState, useEffect } from 'react'
import { t, getCurrentLang, Lang } from './i18n';

const genres = [
  { label: 'Action', count: 233 },
  { label: 'Adventure', count: 107 },
  { label: 'Card Game', count: 13 },
  { label: 'Fighting', count: 19 },
  { label: 'FPS', count: 65 },
  { label: 'Indie', count: 83 },
  { label: 'MMO', count: 8 },
  { label: 'Music', count: 8 },
  { label: 'Platformer', count: 45 },
  { label: 'Puzzle', count: 17 },
  { label: 'Racing', count: 9 },
  { label: 'RPG', count: 54 },
]
const themes = [
  { label: 'Cartoon', count: 107 },
  { label: 'Fantasy', count: 96 },
  { label: 'Horror', count: 31 },
  { label: 'Medieval', count: 51 },
  { label: 'Military', count: 31 },
  { label: 'Modern', count: 87 },
  { label: 'Pirate', count: 2 },
  { label: 'Pixel art', count: 26 },
  { label: 'Sci-Fi', count: 80 },
  { label: 'Western', count: 3 },
]
const platforms = [
  { label: 'Arcade', count: 2 },
  { label: 'Mobile', count: 33 },
  { label: 'Nintendo Switch', count: 123 },
  { label: 'PC', count: 320 },
  { label: 'PS3', count: 5 },
  { label: 'PS4', count: 221 },
  { label: 'PS5', count: 55 },
  { label: 'Retro consoles', count: 4 },
  { label: 'Stadia', count: 9 },
  { label: 'Wii U', count: 1 },
  { label: 'Xbox 360', count: 4 },
  { label: 'Xbox One', count: 193 },
  { label: 'Xbox Series', count: 47 },
]

export default function Sidebar() {
  const [open, setOpen] = useState<{ [key: string]: boolean }>({})
  const [checked, setChecked] = useState<{ [key: string]: boolean }>({})
  const [hovered, setHovered] = useState<string | null>(null)
  const [lang, setLang] = useState<Lang | undefined>(undefined);

  useEffect(() => {
    setLang(getCurrentLang());
    
    const handler = () => {
      setLang(getCurrentLang());
    };
    
    window.addEventListener("langchange", handler);
    return () => window.removeEventListener("langchange", handler);
  }, []);

  const handleToggle = (key: string) => {
    setOpen(prev => ({ ...prev, [key]: !prev[key] }))
  }
  const handleCheck = (key: string) => {
    setChecked(prev => ({ ...prev, [key]: !prev[key] }))
  }

  if (!lang) return null;

  return (
    <aside className="min-w-[320px] max-w-[360px] bg-neutral-900 p-8 rounded-xl mr-8 transition-all border border-neutral-800">
      {/* 排序方式 */}
      <div className="mb-8">
        <div className="font-bold text-xl mb-4">{t('sidebar.sort_by').toUpperCase()}</div>
        <div className="mb-4">
          <select className="w-full bg-neutral-900 border border-neutral-800 text-white rounded px-4 py-3 text-lg font-semibold">
            <option>{t('sidebar.most_popular')}</option>
            <option>{t('sidebar.newest')}</option>
          </select>
        </div>
      </div>
      {/* GENRES 可展开复选框 */}
      <div className="border-t border-neutral-800 pt-6">
        <div className="flex items-center justify-between cursor-pointer select-none" onClick={() => handleToggle('genres')}>
          <span className="font-bold text-lg">{t('sidebar.genres').toUpperCase()}</span>
          <span className="text-2xl">{open.genres ? '▾' : '▸'}</span>
        </div>
        <div
          className={`transition-all duration-600 overflow-hidden ${open.genres ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}
        >
          <div className="mt-4">
            {genres.map(g => (
              <label
                key={g.label}
                className={`flex items-center justify-between px-2 py-2 rounded cursor-pointer transition ${hovered === g.label ? 'bg-neutral-800' : ''}`}
                onMouseEnter={() => setHovered(g.label)}
                onMouseLeave={() => setHovered(null)}
              >
                <span className="flex items-center">
                  <input
                    type="checkbox"
                    checked={!!checked[g.label]}
                    onChange={() => handleCheck(g.label)}
                    className="mr-3 w-5 h-5 accent-white border border-neutral-600 rounded focus:ring-0"
                  />
                  <span className="text-base font-medium">{g.label}</span>
                </span>
                <span className="text-neutral-500 font-mono text-base">{g.count.toString().padStart(2, '0')}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
      {/* THEMES 可展开复选框 */}
      <div className="border-t border-neutral-800 pt-6">
        <div className="flex items-center justify-between cursor-pointer select-none" onClick={() => handleToggle('themes')}>
          <span className="font-bold text-lg">{t('sidebar.themes').toUpperCase()}</span>
          <span className="text-2xl">{open.themes ? '▾' : '▸'}</span>
        </div>
        <div
          className={`transition-all duration-600 overflow-hidden ${open.themes ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}
        >
          <div className="mt-4">
            {themes.map(t => (
              <label
                key={t.label}
                className={`flex items-center justify-between px-2 py-2 rounded cursor-pointer transition ${hovered === t.label ? 'bg-neutral-800' : ''}`}
                onMouseEnter={() => setHovered(t.label)}
                onMouseLeave={() => setHovered(null)}
              >
                <span className="flex items-center">
                  <input
                    type="checkbox"
                    checked={!!checked[t.label]}
                    onChange={() => handleCheck(t.label)}
                    className="mr-3 w-5 h-5 accent-white border border-neutral-600 rounded focus:ring-0"
                  />
                  <span className="text-base font-medium">{t.label}</span>
                </span>
                <span className="text-neutral-500 font-mono text-base">{t.count.toString().padStart(2, '0')}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
      {/* PLATFORMS 可展开复选框 */}
      <div className="border-t border-neutral-800 pt-6">
        <div className="flex items-center justify-between cursor-pointer select-none" onClick={() => handleToggle('platforms')}>
          <span className="font-bold text-lg">{t('sidebar.platforms').toUpperCase()}</span>
          <span className="text-2xl">{open.platforms ? '▾' : '▸'}</span>
        </div>
        <div
          className={`transition-all duration-600 overflow-hidden ${open.platforms ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}
        >
          <div className="mt-4">
            {platforms.map(p => (
              <label
                key={p.label}
                className={`flex items-center justify-between px-2 py-2 rounded cursor-pointer transition ${hovered === p.label ? 'bg-neutral-800' : ''}`}
                onMouseEnter={() => setHovered(p.label)}
                onMouseLeave={() => setHovered(null)}
              >
                <span className="flex items-center">
                  <input
                    type="checkbox"
                    checked={!!checked[p.label]}
                    onChange={() => handleCheck(p.label)}
                    className="mr-3 w-5 h-5 accent-white border border-neutral-600 rounded focus:ring-0"
                  />
                  <span className="text-base font-medium">{p.label}</span>
                </span>
                <span className="text-neutral-500 font-mono text-base">{p.count.toString().padStart(2, '0')}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </aside>
  )
}