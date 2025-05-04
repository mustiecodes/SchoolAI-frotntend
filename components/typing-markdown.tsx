// components/TypingMarkdown.tsx
'use client';

import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface TypingMarkdownProps {
  content: string;
  delay?: number; // milliseconds between words
}

const TypingMarkdown: React.FC<TypingMarkdownProps> = ({ content, delay = 40 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const words = content.split(/(\s+)/); // keep spaces
    let current = 0;

    const interval = setInterval(() => {
      if (current < words.length) {
        setDisplayedText((prev) => prev + words[current]);
        current++;
        setCurrentIndex(current);
      } else {
        clearInterval(interval);
      }
    }, delay);

    return () => clearInterval(interval);
  }, [content, delay]);

  return (
    <div className="prose max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{displayedText}</ReactMarkdown>
    </div>
  );
};

export default TypingMarkdown;
