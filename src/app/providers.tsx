'use client';

import { MessageProvider } from '@/components/Message';

export function Providers({ children }: { children: React.ReactNode }) {
  return <MessageProvider>{children}</MessageProvider>;
} 