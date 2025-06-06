import zh from '../locales/zh.json';
import en from '../locales/en.json';

export type Lang = 'zh' | 'en';

const resources = { zh, en };

// 从URL路径中获取语言设置
function getLangFromPath(path?: string): Lang | null {
  if (typeof window !== 'undefined' && !path) {
    path = window.location.pathname;
  }
  
  if (path) {
    if (path.includes('/en')) return 'en';
    if (path.includes('/zh') || path.includes('/ch')) return 'zh';  // 同时支持 zh 和 ch
  }
  
  return null;
}

// 导出getLang函数
export function getLang(path?: string): Lang {
  // 首先尝试从URL路径获取语言
  const pathLang = getLangFromPath(path);
  if (pathLang) return pathLang;
  
  // 其次从localStorage获取
  if (typeof window !== 'undefined') {
    return (localStorage.getItem('lang') as Lang) || 'zh';
  }
  
  // 服务器端默认返回中文
  return 'zh';
}

// 初始语言设置为服务器端默认值
// 这样可以避免服务器端和客户端渲染不一致的问题
let currentLang: Lang = 'zh';

// 仅在客户端执行时更新初始语言
if (typeof window !== 'undefined') {
  // 使用IIFE立即执行，但不影响模块的初始化值
  (function() {
    try {
      currentLang = getLang();
    } catch (e) {
      console.error('Failed to get initial language:', e);
    }
  })();
}

export function t(path: string, params?: Record<string, string | number>): string {
  // 每次调用时获取最新的语言设置
  const lang = getCurrentLang();
  const keys = path.split('.');
  let value: unknown = resources[lang];
  for (const k of keys) {
    if (value && typeof value === 'object' && value !== null && k in value) value = (value as Record<string, unknown>)[k];
    else return path;
  }
  if (typeof value === 'string') {
    if (params) {
      // 简单的 Mustache 替换
      return value.replace(/{{(.*?)}}/g, (_, key) => params[key.trim()]?.toString() ?? '');
    }
    return value;
  }
  return path;
}

// 根据语言更新URL
function updateUrlWithLang(lang: Lang) {
  if (typeof window !== 'undefined') {
    const currentPath = window.location.pathname;
    let newPath = currentPath;
    
    // 替换路径中的语言部分
    if (currentPath.includes('/zh') || currentPath.includes('/en') || currentPath.includes('/ch')) {
      newPath = currentPath.replace(/\/(zh|en|ch)/, lang === 'zh' ? '/zh' : '/en');
    } else {
      // 如果路径中没有语言部分，则在开头添加
      if (currentPath === '/') {
        newPath = lang === 'zh' ? '/zh' : '/en';
      } else {
        newPath = (lang === 'zh' ? '/zh' : '/en') + currentPath;
      }
    }
    
    // 使用Next.js的路由导航，不刷新页面
    window.history.pushState({}, '', newPath);
  }
}

export function changeLanguage(lang: Lang) {
  currentLang = lang;
  if (typeof window !== 'undefined') {
    localStorage.setItem('lang', lang);
    updateUrlWithLang(lang);
    window.dispatchEvent(new Event('langchange'));
  }
}

export function getCurrentLang() {
  return currentLang;
}

// 根据当前URL更新语言设置
export function syncLangWithUrl() {
  if (typeof window !== 'undefined') {
    const pathLang = getLangFromPath();
    if (pathLang && pathLang !== currentLang) {
      // 只更新内部状态，不更新URL（避免循环）
      currentLang = pathLang;
      localStorage.setItem('lang', pathLang);
      window.dispatchEvent(new Event('langchange'));
    }
  }
} 