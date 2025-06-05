"use client"
import React, { useState, useEffect } from 'react'
import { t, getCurrentLang, Lang } from './i18n';

export default function Sidebar() {
  const [lang, setLang] = useState<Lang | undefined>(undefined);

  useEffect(() => {
    setLang(getCurrentLang());
    
    const handler = () => {
      setLang(getCurrentLang());
    };
    
    window.addEventListener("langchange", handler);
    return () => window.removeEventListener("langchange", handler);
  }, []);

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
    </aside>
  )
}