import { create } from 'zustand';
import { MessageType } from './MessageItem';

export interface MessageInstance {
  id: string;
  type: MessageType;
  content: string;
}

interface MessageStore {
  messages: MessageInstance[];
  addMessage: (type: MessageType, content: string) => void;
  removeMessage: (id: string) => void;
}

export const useMessageStore = create<MessageStore>((set) => ({
  messages: [],
  addMessage: (type, content) => {
    const id = Math.random().toString(36).substring(2);
    set((state) => ({
      messages: [...state.messages, { id, type, content }],
    }));
    // 3秒后自动移除消息
    setTimeout(() => {
      set((state) => ({
        messages: state.messages.filter((msg) => msg.id !== id),
      }));
    }, 3000);
  },
  removeMessage: (id) =>
    set((state) => ({
      messages: state.messages.filter((msg) => msg.id !== id),
    })),
}));

const message = {
  success: (content: string) => useMessageStore.getState().addMessage('success', content),
  error: (content: string) => useMessageStore.getState().addMessage('error', content),
  info: (content: string) => useMessageStore.getState().addMessage('info', content),
  warning: (content: string) => useMessageStore.getState().addMessage('warning', content),
};

export default message; 