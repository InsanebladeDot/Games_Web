// components/DarkGameIntro.tsx
import type { Game } from "@/types/games";
import React, { useRef, useEffect, useState } from "react";


export default function GameIntro({
  description = "暂无游戏介绍",
  recommendedVideos = "https://www.youtube.com/embed/qYF-efFnx9A?rel=0",
  downloadLink = "",
  title=""
}: Game) {
  // 用于同步左右两侧高度
  const leftRef = useRef<HTMLDivElement>(null);
  const [leftHeight, setLeftHeight] = useState(0);

  useEffect(() => {
    if (leftRef.current) {
      setLeftHeight(leftRef.current.offsetHeight);
    }
    const handleResize = () => {
      if (leftRef.current) {
        setLeftHeight(leftRef.current.offsetHeight);
      }
    };
    window.addEventListener('resize', handleResize);
    // 清理函数，在组件卸载时移除事件监听器
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToGameEmbed = () => {
    const gameEmbedSection = document.getElementById('game-embed-section');
    if (gameEmbedSection) {
      gameEmbedSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 简单按句号分割描述文本，并确保至少有一个段落
  const descriptionParagraphs = title
    ? title
        .split('.') // 按句号分割
        .map(sentence => sentence.trim()) // 去除空格
        .filter(sentence => sentence.length > 0) // 过滤空字符串
    : [];

  // 如果没有分割出段落，或者 gameIntroduction 为空，使用完整的 gameIntroduction 作为一段
  if (descriptionParagraphs.length === 0 && title) {
      descriptionParagraphs.push(title.trim());
  }
    // 如果 gameIntroduction 本身也是空的，显示一个默认文本
    if (descriptionParagraphs.length === 0) {
        descriptionParagraphs.push("未提供游戏描述。");
    }

  return (
    <div className="w-full flex flex-col md:flex-row items-stretch bg-gradient-to-br from-gray-900 via-black to-gray-800 rounded-3xl shadow-2xl p-12 md:p-20 mt-12 max-w-7xl mx-auto">
      {/* 左侧文字 */}
      <div ref={leftRef} className="flex-1 pr-0 md:pr-12 flex flex-col justify-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-purple-200 mb-8 drop-shadow-lg">
          Welcome to {title}
        </h2>
        <p className="text-2xl text-gray-300 mb-5"> A battle royale rage game about sheep; will you have what it takes to survive in {description}? </p>
        {/* 显示描述文本，每个分割的段落一个p标签，添加首行缩进 */}
        {descriptionParagraphs.map((paragraph, index) => (
            <p key={index} className={`relative z-10 ${index === 0 ? 'text-2xl text-gray-300 mb-5' : 'text-gray-400 mb-5 text-lg'}`} style={{ textIndent: '2em' }}> {/* 添加首行缩进样式，保持用户当前的文本大小和颜色类，调整 mb 使段落之间有间隔 */} 
              {paragraph + (paragraph.endsWith('.') ? '' : '.')} {/* 如果原句没有句号，添加一个 */} 
            </p>
        ))}

        <div className="flex flex-row gap-6 w-full relative z-10 mt-6"> {/* 保持用户当前的按钮布局类，调整 mt */}
          <button
            className="flex-1 bg-green-600 hover:bg-green-500 text-white font-bold py-4 px-10 rounded-2xl shadow-lg transition-all text-2xl whitespace-nowrap"
            onClick={scrollToGameEmbed} // 恢复点击滚动功能
          >
            PLAY NOW 
          </button>
          <a
            href={downloadLink}
            download
            className="flex-1 bg-purple-800 hover:bg-purple-700 text-white font-bold py-4 px-10 rounded-2xl shadow-lg transition-all text-2xl whitespace-nowrap text-center"
          >
            DOWNLOAD {title}
          </a>
        </div>
      </div>
      {/* 右侧视频，和左侧内容等高 */}
      <div className="flex-1 flex justify-center items-center relative" style={{ minHeight: leftHeight ? leftHeight : undefined }}>
        <div className="relative w-full h-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl border-4 border-gray-700 flex items-center justify-center" style={{ height: leftHeight ? leftHeight : 'auto' }}>
          <iframe
            src={recommendedVideos}
            title="Crazy Cattle 3D Trailer"
            allow="encrypted-media"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full border-0"
            style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}
          />
        </div>
      </div>
    </div>
  );
}