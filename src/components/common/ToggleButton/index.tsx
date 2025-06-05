// src/components/StyledButton.tsx
import React, { useRef, useState } from 'react';
import './ToggleButton.css'; // 导入样式文件
import { uploadFile } from '@/app/api/file/index'
import { useGameExperienceStore } from '@/store/gameExperienceStore';
import message from '@/components/Message';

// 移除空接口，直接使用 React.ButtonHTMLAttributes<HTMLButtonElement>
const StyledButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ className, ...restProps }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // 从 store 获取需要的方法
  const { setUploadedImagePath, setError, setLoading } = useGameExperienceStore();

  // 处理文件选择的函数
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files || files.length === 0) {
      return;
    }

    const file = files[0]; // 只处理第一个文件
    setSelectedFile(file);
    setLoading(true);

    try {
      const uploadResult = await uploadFile(file);
      const imagePath = uploadResult.data.data.path;
      console.log('result',uploadResult)
      if(uploadResult.data.code !== 0){
        message.error('上传失败')
        
      }else {
        message.success('上传成功')

        setUploadedImagePath(imagePath);
      }
      
    } catch (error) {
      setError(error instanceof Error ? error.message : '上传失败');
      setUploadedImagePath(null);
    } finally {
      setLoading(false);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <button 
        className={`praashoo7-styled-button ${className || ''}`} 
        onClick={handleButtonClick} 
        type="button"
        {...restProps}
      >
        <svg
          aria-hidden="true"
          stroke="currentColor"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke="#fffffff"
            d="M13.5 3H12H8C6.34315 3 5 4.34315 5 6V18C5 19.6569 6.34315 21 8 21H11M13.5 3L19 8.625M13.5 3V7.625C13.5 8.17728 13.9477 8.625 14.5 8.625H19M19 8.625V11.8125"
          ></path>
          <path
            stroke="#fffffff"
            d="M17 15V18M17 21V18M17 18H14M17 18H20"
          ></path>
        </svg>
        Add File
      </button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
        accept="image/*"
      />
      {selectedFile && (
        <p>Selected file: {selectedFile.name}</p>
      )}
    </>
  );
};

export default StyledButton;