'use client';

import React from 'react';
import MessageItem, { MessageType } from './MessageItem';

export interface MessageInstance {
  id: string;
  type: MessageType;
  content: string;
}

interface MessageContainerProps {
  messages: MessageInstance[];
  onRemove: (id: string) => void;
}

const MessageContainer: React.FC<MessageContainerProps> = ({ messages, onRemove }) => {
  return (
    <div className="fixed left-0 right-0 top-0 flex flex-col items-center pointer-events-none" 
      style={{ paddingTop: '40px', zIndex: 9999999 }}>
      {messages.map((message) => (
        <div key={message.id} className="pointer-events-auto">
          <MessageItem
            type={message.type}
            content={message.content}
            onClose={() => onRemove(message.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default MessageContainer; 