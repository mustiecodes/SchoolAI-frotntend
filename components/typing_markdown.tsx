"use client";

import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface TypingMarkdownProps {
  content: string;
  delay?: number; // milliseconds between words
}

const TypingMarkdown: React.FC<TypingMarkdownProps> = ({
  content,
  delay = 40,
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (typeof content !== "string" || content.trim() === "") return;

    setDisplayedText("");
    setIsDone(false);

    const words = content.split(/(\s+)/); // keep spaces
    let current = 0;

    const interval = setInterval(() => {
      if (current < words.length) {
        setDisplayedText((prev) => prev + words[current]);
        current++;
      } else {
        clearInterval(interval);
        setIsDone(true);
      }
    }, delay);

    return () => clearInterval(interval);
  }, [content, delay]);

  return (
    <div className="prose prose-purple max-w-none">
      {isDone ? (
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      ) : (
        <pre className="whitespace-pre-wrap text-gray-700">{displayedText}</pre>
      )}
    </div>
  );
};

export default TypingMarkdown;
