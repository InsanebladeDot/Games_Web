'use client';

import React from 'react';

export type MessageType = 'success' | 'error' | 'info' | 'warning';

interface MessageItemProps {
  type: MessageType;
  content: string;
  onClose: () => void;
}

const MessageItem: React.FC<MessageItemProps> = ({ type, content }) => {
  const getTypeConfig = () => {
    switch (type) {
      case 'success':
        return {
          bgClass: 'bg-green-100 dark:bg-green-900',
          borderClass: 'border-green-500 dark:border-green-700',
          textClass: 'text-green-900 dark:text-green-100',
          hoverClass: 'hover:bg-green-200 dark:hover:bg-green-800',
          iconClass: 'text-green-600'
        };
      case 'info':
        return {
          bgClass: 'bg-blue-100 dark:bg-blue-900',
          borderClass: 'border-blue-500 dark:border-blue-700',
          textClass: 'text-blue-900 dark:text-blue-100',
          hoverClass: 'hover:bg-blue-200 dark:hover:bg-blue-800',
          iconClass: 'text-blue-600'
        };
      case 'warning':
        return {
          bgClass: 'bg-yellow-100 dark:bg-yellow-900',
          borderClass: 'border-yellow-500 dark:border-yellow-700',
          textClass: 'text-yellow-900 dark:text-yellow-100',
          hoverClass: 'hover:bg-yellow-200 dark:hover:bg-yellow-800',
          iconClass: 'text-yellow-600'
        };
      case 'error':
        return {
          bgClass: 'bg-red-100 dark:bg-red-900',
          borderClass: 'border-red-500 dark:border-red-700',
          textClass: 'text-red-900 dark:text-red-100',
          hoverClass: 'hover:bg-red-200 dark:hover:bg-red-800',
          iconClass: 'text-red-600'
        };
    }
  };

  const config = getTypeConfig();

  return (
    <div
      role="alert"
      className={`
        ${config.bgClass} border-l-4 ${config.borderClass} ${config.textClass} p-2 rounded-lg 
        flex items-center transition-all duration-300 ease-in-out ${config.hoverClass} transform hover:scale-105
        animate-message-slide-in opacity-0 mb-2 min-w-[300px] max-w-[600px]
      `}
      style={{ zIndex: 9999999 }}
    >
      <svg
        stroke="currentColor"
        viewBox="0 0 24 24"
        fill="none"
        className={`h-5 w-5 flex-shrink-0 mr-2 ${config.iconClass}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13 16h-1v-4h1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
        ></path>
      </svg>
      <p className="text-xs font-semibold">{content}</p>
    </div>
  );
};

export default MessageItem; 