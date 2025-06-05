import React, { useRef } from 'react';

interface FileUploaderProps {
  action: string; // 上传接口
  onSuccess?: (url: string, file: File) => void; // 上传成功回调
  children?: React.ReactNode; // 自定义按钮内容
  accept?: string; // 限制文件类型
  className?: string; // 自定义样式
}

const FileUploader: React.FC<FileUploaderProps> = ({ action, onSuccess, children, accept, className }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch(action, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      // 假设后端返回的文件地址在 data.url
      if (onSuccess) onSuccess(data.url, file);
    } catch (err) {
      // 你可以在这里处理错误
      console.error('上传失败', err);
    }

    // 清空 input，允许重复上传同一个文件
    e.target.value = '';
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        style={{ display: 'none' }}
        accept={accept}
        onChange={handleChange}
      />
      <button
        type="button"
        onClick={handleClick}
        className={className || 'px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition'}
      >
        {children || '上传文件'}
      </button>
    </div>
  );
};

export default FileUploader;