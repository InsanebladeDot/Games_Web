/*
请修改文件 src/lib/localStorageCache.ts
将 CACHE_EXPIRATION_MS 的值从 60 * 60 * 1000 修改为 10 * 60 * 1000
*/

// 缓存的有效期，单位为毫秒（这里设置为 10 分钟）
const CACHE_EXPIRATION_MS = 10 * 60 * 1000; // 修改为 10 分钟

interface CacheItem<T> {
  data: T;
  timestamp: number; // 缓存创建时的时间戳
}

/**
 * 将数据存储到本地存储，并记录当前时间戳
 * @param key 存储的键名
 * @param data 要存储的数据
 */
export function setCachedItem<T>(key: string, data: T): void {
  try {
    const item: CacheItem<T> = {
      data: data,
      timestamp: Date.now(),
    };
    // 使用 JSON.stringify 将对象转换为字符串进行存储
    localStorage.setItem(key, JSON.stringify(item));
    console.log(`Cache set for key "${key}".`);
  } catch (error) {
    console.error("Error setting item in local storage:", error);
    // 在某些浏览器隐私模式下，localStorage 可能不可用，需要捕获异常
    // 可以考虑添加一个用户提示或者其他降级处理
  }
}

/**
 * 从本地存储获取数据，并检查是否过期
 * @param key 存储的键名
 * @returns 未过期的数据，如果不存在或已过期则返回 null
 */
export function getCachedItem<T>(key: string): T | null {
  try {
    const itemString = localStorage.getItem(key);
    if (!itemString) {
      console.log(`No cache found for key "${key}".`);
      return null; // 没有找到缓存
    }

    // 解析存储的 JSON 字符串
    const item: CacheItem<T> = JSON.parse(itemString);
    const now = Date.now();

    // 检查缓存是否过期
    if (now - item.timestamp > CACHE_EXPIRATION_MS) {
      console.log(`Cache for key "${key}" expired.`);
      localStorage.removeItem(key); // 移除过期缓存
      return null;
    }

    console.log(`Using cache for key "${key}".`);
    return item.data; // 返回未过期的数据
  } catch (error) {
    console.error("Error getting item from local storage:", error);
    // 解析 JSON 失败或 localStorage 读取错误
    localStorage.removeItem(key); // 清理可能的损坏缓存
    return null;
  }
}

/**
 * 从本地存储移除某个键的缓存
 * @param key 要移除的键名
 */
export function removeCachedItem(key: string): void {
  try {
    localStorage.removeItem(key);
    console.log(`Cache removed for key "${key}".`);
  } catch (error) {
    console.error("Error removing item from local storage:", error);
  }
}

// 您还可以添加其他辅助函数，例如清除所有缓存等
// export function clearAllCache(): void {
//   try {
//     localStorage.clear();
//     console.log("All local storage cache cleared.");
//   } catch (error) {
//     console.error("Error clearing all local storage cache:", error);
//   }
// }

const localStorageCache = {
  setCachedItem,
  getCachedItem,
  removeCachedItem
};

export default localStorageCache;