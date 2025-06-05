'use client';

import { useState, useEffect } from 'react';

interface MdEditorProps {
  markdownText: string;
}

const MarkdownPreview = ({ markdownText }: MdEditorProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div 
      className="markdown-preview-container"
      dangerouslySetInnerHTML={{ __html: markdownText }}
    />
  );
};

MarkdownPreview.displayName = 'MarkdownPreview';

export default MarkdownPreview;