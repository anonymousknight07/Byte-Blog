"use client";

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { useTheme } from '@/lib/hooks/useTheme';
import { themes } from '@/lib/constants/codeThemes';
import ThemeToggle from './ThemeToggle';

interface CodeBlockProps {
  code: string;
  language: string;
}

const CodeBlock = ({ code, language }: CodeBlockProps) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="my-6 relative">
      <ThemeToggle theme={theme} onToggle={toggleTheme} />
      <SyntaxHighlighter
        language={language}
        style={themes[theme]}
        className={`rounded-lg ${theme === 'dark' ? '!bg-gray-900' : '!bg-gray-50'}`}
        customStyle={{
          padding: '1.5rem',
          borderRadius: '0.5rem',
          fontSize: '0.875rem',
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;