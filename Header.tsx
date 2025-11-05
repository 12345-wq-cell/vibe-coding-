
import React from 'react';
import { GridIcon } from './icons';

const Header: React.FC = () => {
  return (
    <header className="absolute top-0 left-0 right-0 z-20 px-4 sm:px-8 py-4">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-8">
          <a href="#" className="flex items-center gap-2 text-xl font-bold text-white">
            <span className="text-yellow-400">Vibe Coder</span>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-300">
            <a href="#" className="hover:text-white transition-colors">Community</a>
            <a href="#" className="hover:text-white transition-colors">Pricing</a>
            <a href="#" className="hover:text-white transition-colors">Enterprise</a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
            <button className="p-2 text-white rounded-full hover:bg-white/10 transition-colors">
                <GridIcon className="w-5 h-5" />
            </button>
          <button className="flex items-center gap-2 text-sm font-medium h-9 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-md text-white transition-colors">
             <div className="w-6 h-6 bg-purple-800 rounded-full flex items-center justify-center text-xs font-bold">U</div>
             <span>My Vibe</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
