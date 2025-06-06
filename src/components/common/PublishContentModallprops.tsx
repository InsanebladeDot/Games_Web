/*
请修改文件 src/components/common/PublishContentModallprops.tsx
*/
import React, { useState, useEffect, useRef } from 'react';
import Upload from '../Upload/index'
import Image from 'next/image';
// 假设 t, changeLanguage, getCurrentLang, Lang 从 src/components/i18n 获取
// 如果您的 i18n 工具文件在其他位置，请调整导入路径
import { t } from "../i18n";
// 导入本地存储缓存工具
import { setCachedItem, getCachedItem } from '@/lib/localStorageCache'; // 修正导入路径
// 导入 GameExperience 类型
import type { GameExperience } from '@/types/user_experience';
import { useGameExperienceStore } from '@/store/gameExperienceStore';
import { insertUserExperienceL } from '@/app/api/user_experience';
import message from '@/components/Message';
import { getGames } from '@/app/api/games';
import type { Game } from '@/types/games';

interface PublishContentModalProps {
  isOpen: boolean; // 控制模态框是否可见
  onClose: () => void; // 关闭模态框的回调函数
  // 添加一个 prop 用于处理表单提交的数据，包括图片数据
}

const GAME_LIST_KEY = 'game_list_cache';
const CACHE_EXPIRE = 1000 * 60 * 60 * 24; // 24小时

function getLocalGames() {
  const cache = localStorage.getItem(GAME_LIST_KEY);
  if (!cache) return null;
  try {
    const { data, time } = JSON.parse(cache);
    if (Date.now() - time < CACHE_EXPIRE) {
      return data;
    }
    return null;
  } catch {
    return null;
  }
}

function setLocalGames(data: Game[]) {
  localStorage.setItem(
    GAME_LIST_KEY,
    JSON.stringify({ data, time: Date.now() })
  );
}

const PublishContentModal: React.FC<PublishContentModalProps> = ({ isOpen, onClose }) => {
  // 使用状态来控制模态框内容的显示和关闭动画
  const [showContent, setShowContent] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const modalContentRef = useRef<HTMLDivElement>(null);

  // --- 新增状态：存储上传的文件 URL ---
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  // --- 结束新增状态 ---

  // 使用状态来存储表单其他字段的值
  const [content, setContent] = useState('');
  const [username, setUsername] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [gameList, setGameList] = useState<Game[]>([]);

  // 定义本地存储的键名
  const CACHE_KEY = 'publishModalFormData';

  // 从 Zustand store 中获取需要的状态和操作
  const { addExperience, setLoading, setError, uploadedImagePath, setUploadedImagePath } = useGameExperienceStore();

  // 重置表单所有字段和状态
  const resetForm = React.useCallback(() => {
    setContent('');
    setUsername('');
    setSelectedCategory('');
    setUploadedImagePath(null);
    setError(null);
    setCachedItem(CACHE_KEY, null);
  }, [setUploadedImagePath, setError]);

  // 处理点击外部区域的逻辑
  const handleOutsideClick = React.useCallback((event: MouseEvent) => {
    if (modalContentRef.current && !modalContentRef.current.contains(event.target as Node)) {
      if(showContent) {
        setIsClosing(true);
      }
    }
  }, [showContent]);

  useEffect(() => {
    if (isOpen) {
      const timeoutId = setTimeout(() => {
        setShowContent(true);
        setIsClosing(false);
      }, 20);

      document.addEventListener('mousedown', handleOutsideClick);

      const cachedData = getCachedItem<GameExperience>(CACHE_KEY);
      if (cachedData) {
        setContent(cachedData.experienceContent ?? '');
        setUsername(cachedData.username ?? '');
        setUploadedImageUrl(cachedData.experienceImageUrl ?? null);
      } else {
        resetForm();
      }

      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener('mousedown', handleOutsideClick);
      };
    } else {
      setShowContent(false);
      setIsClosing(true);
      document.removeEventListener('mousedown', handleOutsideClick);
    }
  }, [isOpen, handleOutsideClick, resetForm]);

  // 监听表单状态变化，自动保存到本地存储
  useEffect(() => {
      // 构建符合 GameExperience 类型的数据结构进行缓存
      // 注意：只包含表单中有的字段对应的 GameExperience 字段
      const formDataToCache: GameExperience = {
        // 假设其他 GameExperience 字段在表单中没有直接对应，或稍后处理
        id: null,
        userId: null,
        username: username, // 对应 username state
        experienceImageUrl: uploadedImageUrl, // 保存上传的文件 URL state
        experienceContent: content, // 对应 content state
        gameId: null,
        createdAt: new Date().toISOString(),
        title: undefined
      };
      setCachedItem(CACHE_KEY, formDataToCache);
  }, [content, username, uploadedImageUrl]); // 依赖 content, username, 和 uploadedImageUrl 状态的变化

  // 监听 isClosing 状态来执行关闭后的回调
  useEffect(() => {
    if (isClosing) {
      // 动画持续时间应与 Tailwind 的 duration-150 匹配
      const timeoutId = setTimeout(() => {
        onClose(); // 动画结束后调用父组件的关闭函数
        setIsClosing(false); // 重置关闭状态
      }, 150); // 匹配动画时长 (duration-150)

      return () => clearTimeout(timeoutId); // 清理定时器
    }
  }, [isClosing, onClose]); // 依赖 isClosing 和 onClose 回调

  // 修改表单提交处理函数
  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    // 表单验证
    if (!content.trim()) {
      message.warning('请输入游戏体验内容');
      return;
    }
    if (!username.trim()) {
      message.warning('请输入用户名');
      return;
    }
    if (!selectedCategory) {
      message.warning('请选择游戏类别');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      // 构建新的游戏体验数据
      const newExperience: GameExperience = {
        id: null,
        userId: null,
        username: username.trim(),
        experienceImageUrl: uploadedImagePath,
        experienceContent: content.trim(),
        gameId: parseInt(selectedCategory) || null,
        createdAt: new Date().toISOString(),
        title: undefined
      };

      // 调用 API 提交数据
      const response = await insertUserExperienceL(newExperience);
      
      // 根据返回码处理结果
      if (response.data.code === 0) {
        message.success('发布成功！');
        
        // 添加到 store
        addExperience(newExperience);
        
        // 清除本地缓存
        setCachedItem(CACHE_KEY, null);
        
        // 重置表单
        resetForm();
        
        // 关闭模态框
        setIsClosing(true);
      } else {
        // API 返回错误
        message.error(response.data.msg || '发布失败');
      }
      
    } catch (error) {
      console.error('提交失败:', error);
      message.error(error instanceof Error ? error.message : '发布失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const local = getLocalGames();
    if (local) {
      setGameList(local);
    } else {
      getGames().then((res) => {
        if (res?.data?.data) {
          setGameList(res.data.data);
          setLocalGames(res.data.data);
        }
      });
    }
  }, []);

  // 如果模态框不应该显示，直接返回 null
  // 在关闭动画期间，isOpen 已经为 false，但我们依赖 isClosing 来决定是否渲染
  if (!isOpen && !isClosing) {
    return null;
  }

  // 确定动画类
  const animationClasses = showContent && isOpen && !isClosing
    ? 'opacity-100 scale-100' // 进入动画结束状态 (完全可见，正常大小)
    : isClosing
      ? 'opacity-0 scale-95' // 退出动画结束状态 (完全透明，稍微缩小)
      : 'opacity-0 scale-95'; // 进入动画初始状态 (完全透明，稍微缩小)


  return (
    // 全屏覆盖层，用于背景和点击外部关闭 (即使背景透明，这个 div 仍然捕获点击事件)
    <div className="fixed inset-0 bg-black bg-opacity-0 flex justify-center items-center z-50">
      {/* 模态框内容容器，应用动画类 */}
      <div
        ref={modalContentRef} // 绑定 ref 用于检测点击外部
        className={`bg-neutral-900 rounded-lg p-6 shadow-xl w-full max-w-md mx-4 transition-all duration-150 ease-in-out ${animationClasses}`}
        // 阻止点击内容区域时事件冒泡到背景遮罩
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold text-white mb-4">{t('publishModal.title')}</h2>
        {/* 绑定表单提交事件 */}
        <form onSubmit={handleFormSubmit}>
          {/* 感慨内容输入框 */}
          <div className="mb-4">
            <label htmlFor="content" className="block text-sm font-medium text-neutral-300 mb-2">
              {t('publishModal.contentLabel')}
            </label>
            <textarea
              id="content"
              rows={4}
              className="w-full px-3 py-2 text-neutral-300 bg-neutral-800 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder-neutral-500"
              placeholder={t('publishModal.contentPlaceholder')}
              value={content ?? ""} // 绑定状态，防止undefined
              onChange={(e) => setContent(e.target.value)} // 更新状态
            ></textarea>
          </div>
          {/* 修改 Upload 组件的使用 */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              {t('publishModal.uploadImageLabel')}
            </label>
            <Upload />
            {uploadedImageUrl && (
              <div className="mt-2">
                <Image
                  src={uploadedImageUrl || 'notFund.png'}
                  alt={t('publishModal.imagePreview')}
                  width={128}
                  height={128}
                  className="max-h-32 rounded-lg object-cover"
                  unoptimized
                />
              </div>
            )}
          </div>

          {/* 用户名输入框 */}
          <div className="mb-6">
            <label htmlFor="username" className="block text-sm font-medium text-neutral-300 mb-2">
              {t('publishModal.usernameLabel')}
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-3 py-2 text-neutral-300 bg-neutral-800 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder-neutral-500"
              placeholder={t('publishModal.usernamePlaceholder')}
              value={username ?? ""} // 绑定状态，防止undefined
              onChange={(e) => setUsername(e.target.value)} // 更新状态
            />
          </div>

          {/* 游戏类别选择下拉框 */}
          <div className="mb-4">
            <label htmlFor="gameCategory" className="block text-sm font-medium text-neutral-300 mb-2">
              {t('publishModal.gameCategoryLabel')}
            </label>
            <select
              id="gameCategory"
              className="w-full px-3 py-2 text-neutral-300 bg-neutral-800 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={selectedCategory ?? ""}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">{t('publishModal.selectCategory')}</option>
              {gameList.map((game) => (
                <option key={game.id!} value={game.id!}>
                  {game.title}
                </option>
              ))}
            </select>
          </div>

          {/* 按钮 */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setIsClosing(true)} // 点击取消按钮开始关闭动画
              className="px-4 py-2 bg-neutral-700 text-white rounded-md hover:bg-neutral-600 transition-colors duration-200"
            >
              {t('publishModal.cancelButtonText')}
            </button>
            <button
              type="button"
              onClick={handleFormSubmit} // 添加 onClick 事件处理函数
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
            >
              {t('publishModal.publishButtonText')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PublishContentModal;