import React from 'react';
import { SparklesIcon } from './icons';

const Welcome: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-50 border border-gray-200 rounded-lg shadow-inner h-full min-h-[500px]">
      <div className="w-full max-w-lg text-center">
        <SparklesIcon className="h-16 w-16 text-gray-400 mx-auto mb-6" />
        
        <h2 className="text-3xl font-bold text-gray-800">
          Describe your vision.
        </h2>
        <p className="mt-2 text-xl text-gray-600">
          Generate your website.
        </p>
        <p className="mt-6 text-gray-500 max-w-md mx-auto">
          Simply describe the website you want to create in the panel on the left. Provide details about the style, content, and functionality. Our AI will bring your idea to life in seconds.
        </p>
      </div>
    </div>
  );
};

export default Welcome;
