// components/ContentDisplay.tsx
'use client';

import React from 'react';
import TypingMarkdown from '@/components/typing-markdown';

interface ContentDisplayProps {
  content: string;
  generatedAt: string;
}

const ContentDisplay: React.FC<ContentDisplayProps> = ({ content, generatedAt }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
      <h2 className="text-xl font-bold">Generated Content</h2>
      <TypingMarkdown content={content} />
      <p className="text-sm text-gray-500">
        <strong>Generated At:</strong> {new Date(generatedAt).toLocaleString()}
      </p>
    </div>
  );
};

export default ContentDisplay;
