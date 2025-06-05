/*
创建一个新文件：src/components/common/ImagePreviewModal.tsx
*/
import React, { useEffect } from 'react';
import Image from 'next/image';

interface ImagePreviewModalProps {
  imageUrl: string | null; // 要预览的图片 URL，null 表示不显示
  onClose: () => void; // 关闭预览的回调函数
}

const ImagePreviewModal: React.FC<ImagePreviewModalProps> = ({ imageUrl, onClose }) => {
  // 添加事件监听器以便按 ESC 键关闭
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [onClose]); // 依赖 onClose 函数

  // 点击背景或图片以外区域关闭
  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // 确保只在点击背景时关闭，而不是点击图片本身
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  // 如果没有图片 URL，则不渲染任何内容
  if (!imageUrl) {
    return null;
  }

  return (
    // 全屏覆盖层，用于背景和点击外部关闭
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-[60]" // Z-index 设置得比发布模态框高
      onClick={handleOverlayClick}
    >
      {/* 图片容器，防止图片过大溢出 */}
      <div className="max-w-full max-h-full p-4">
        {/* 预览图片 */}
        <Image
          src={imageUrl || 'notFund.png'}
          alt="图片预览"
          width={400}
          height={400}
          className="max-w-full max-h-full object-contain"
          unoptimized
        />
      </div>
    </div>
  );
};

export default ImagePreviewModal;