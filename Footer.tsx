
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="absolute bottom-0 left-0 right-0 w-full px-4 sm:px-8 py-4 z-20">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center text-sm">
        <button className="bg-black/20 hover:bg-black/40 text-white py-2 px-4 rounded-lg backdrop-blur-sm border border-white/10 transition-colors">
          Vibe Coder
        </button>
        <a href="#" className="text-gray-300 hover:text-white transition-colors">
          View all &gt;
        </a>
      </div>
    </footer>
  );
};

export default Footer;
