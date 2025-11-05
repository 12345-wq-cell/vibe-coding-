import React, { useState, useMemo } from 'react';
import type { GeneratedCode } from '../types';
import CodeBlock from './CodeBlock';
import DeployModal from './DeployModal';
import { UploadIcon } from './icons';

interface CodeOutputProps {
  code: GeneratedCode;
}

type MainTab = 'preview' | 'code';
type CodeTab = 'html' | 'css' | 'js';

const CodeOutput: React.FC<CodeOutputProps> = ({ code }) => {
  const [activeMainTab, setActiveMainTab] = useState<MainTab>('preview');
  const [activeCodeTab, setActiveCodeTab] = useState<CodeTab>('html');
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);

  const srcDoc = useMemo(() => {
    return `
      <html>
        <head>
          <style>${code.css}</style>
        </head>
        <body>
          ${code.html}
          <script>${code.javascript}</script>
        </body>
      </html>
    `;
  }, [code]);

  const MainTabButton: React.FC<{tabName: MainTab, label: string}> = ({ tabName, label }) => (
    <button
      onClick={() => setActiveMainTab(tabName)}
      className={`px-4 py-2 text-sm font-medium transition-colors duration-200 border-b-2 ${
        activeMainTab === tabName
          ? 'border-white text-white'
          : 'border-transparent text-gray-400 hover:text-gray-200'
      }`}
    >
      {label}
    </button>
  );

  const CodeTabButton: React.FC<{tabName: CodeTab, label: string}> = ({ tabName, label }) => (
    <button
      onClick={() => setActiveCodeTab(tabName)}
      className={`px-3 py-1 text-xs font-medium transition-colors duration-200 rounded-md ${
        activeCodeTab === tabName
          ? 'bg-white/10 text-white'
          : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
      }`}
    >
      {label}
    </button>
  );

  const renderCodeContent = () => {
    switch(activeCodeTab) {
      case 'html': return <CodeBlock code={code.html} language="html" />;
      case 'css': return <CodeBlock code={code.css} language="css" />;
      case 'js': return <CodeBlock code={code.javascript} language="javascript" />;
      default: return null;
    }
  }

  return (
    <>
      <div className="bg-black/20 border border-white/10 rounded-lg shadow-2xl w-full flex flex-col h-full backdrop-blur-lg">
        {/* Main Tabs */}
        <div className="px-4 pt-2 border-b border-white/10 flex justify-between items-center flex-shrink-0 rounded-t-lg">
          <div className="flex space-x-1">
            <MainTabButton tabName="preview" label="Preview" />
            <MainTabButton tabName="code" label="Code" />
          </div>
          <button
            onClick={() => setIsDeployModalOpen(true)}
            className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-sm px-4 py-1.5 rounded-md transition-colors"
            aria-label="Deploy website"
          >
            <UploadIcon className="h-4 w-4" />
            Deploy
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-grow rounded-b-lg overflow-hidden">
          {activeMainTab === 'preview' && (
            <iframe
              srcDoc={srcDoc}
              title="Website Preview"
              sandbox="allow-scripts allow-same-origin"
              className="w-full h-full bg-white border-0"
            />
          )}
          {activeMainTab === 'code' && (
            <div className="flex flex-col h-full bg-black/20">
              {/* Code Tabs */}
              <div className="p-2 flex space-x-2 border-b border-white/10 flex-shrink-0">
                  <CodeTabButton tabName="html" label="HTML" />
                  <CodeTabButton tabName="css" label="CSS" />
                  <CodeTabButton tabName="js" label="JavaScript" />
              </div>
              {/* Code Block */}
              <div className="flex-grow relative overflow-hidden">
                  {renderCodeContent()}
              </div>
            </div>
          )}
        </div>
      </div>
      {isDeployModalOpen && <DeployModal onClose={() => setIsDeployModalOpen(false)} />}
    </>
  );
};

export default CodeOutput;