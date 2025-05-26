import zh from '../locales/zh.json';
import en from '../locales/en.json';

export type Lang = 'zh' | 'en';

const resources = { zh, en };

function getLang(): Lang {
  if (typeof window !== 'undefined') {
    return (localStorage.getItem('lang') as Lang) || 'zh';
  }
  return 'zh';
}

let currentLang: Lang = getLang();

export function t(path: string): string {
  const keys = path.split('.');
  let value: unknown = resources[currentLang];
  for (const k of keys) {
    if (value && typeof value === 'object' && value !== null && k in value) value = (value as Record<string, unknown>)[k];
    else return path;
  }
  return typeof value === 'string' ? value : path;
}

export function changeLanguage(lang: Lang) {
  currentLang = lang;
  if (typeof window !== 'undefined') {
    localStorage.setItem('lang', lang);
    window.dispatchEvent(new Event('langchange'));
  }
}

export function getCurrentLang() {
  return currentLang;
} 