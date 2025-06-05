'use client';

import React from 'react';
import MessageContainer from './MessageContainer';
import { useMessageStore } from './message';
import message from './message';

export const MessageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { messages, removeMessage } = useMessageStore();

  return (
    <>
      <MessageContainer messages={messages} onRemove={removeMessage} />
      {children}
    </>
  );
};

export default message; 