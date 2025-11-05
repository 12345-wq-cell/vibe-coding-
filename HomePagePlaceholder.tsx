import React from 'react';
import { CodeIcon, SparklesIcon, ClipboardIcon } from './icons';

const Feature: React.FC<{ icon: React.ElementType, title: string, description: string }> = ({ icon: Icon, title, description }) => (
    <div className="flex items-start gap-4 text-left">
        <div className="flex-shrink-0 bg-yellow-100 text-yellow-600 p-3 rounded-full">
            <Icon className="h-6 w-6" />
        </div>
        <div>
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            <p className="mt-1 text-gray-500">{description}</p>
        </div>
    </div>
);


const HomePagePlaceholder: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-50 border border-gray-200 rounded-lg shadow-inner h-full min-h-[500px]">
      <div className="w-full max-w-lg text-center">
        <SparklesIcon className="h-16 w-16 text-yellow-500 mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-gray-800">
          Build Your Dream Website
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          We help you build well-designed websites. Get the complete code, ready to use.
        </p>
      </div>

      <div className="mt-12 w-full max-w-lg space-y-8">
          <Feature 
            icon={CodeIcon}
            title="Get Your Code"
            description="We provide clean HTML, CSS, and JavaScript for your entire website design."
          />
          <Feature 
            icon={ClipboardIcon}
            title="Copy, Paste, and Go Live"
            description="Easily retrieve the code with a click, paste it into your editor, and your website is ready!"
          />
      </div>
    </div>
  );
};

export default HomePagePlaceholder;
