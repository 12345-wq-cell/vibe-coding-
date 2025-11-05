import React, { useState } from 'react';
import { ClipboardIcon, CheckIcon } from './icons';

interface CodeBlockProps {
  code: string;
  language: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="relative bg-black/30 h-full">
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 p-2 bg-white/10 hover:bg-white/20 rounded-md text-gray-300 hover:text-white transition-colors z-10"
        aria-label="Copy code"
      >
        {copied ? (
          <CheckIcon className="h-5 w-5 text-green-400" />
        ) : (
          <ClipboardIcon className="h-5 w-5" />
        )}
      </button>
      <pre className="p-4 pt-12 overflow-auto h-full text-sm text-gray-200">
        <code className={`language-${language} whitespace-pre-wrap`}>
          {code}
        </code>
      </pre>
    </div>
  );
};

export default CodeBlock;
