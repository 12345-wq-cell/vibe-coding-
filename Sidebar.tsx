import React from 'react';
import { CodeIcon, HomeIcon, LightbulbIcon } from './icons';

// FIX: The 'Page' type was not exported from App.tsx. It is defined here locally.
export type Page = 'home' | 'idea';

interface SidebarProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
}

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  page: Page;
  isActive: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
        isActive ? 'bg-white/20 text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'
      }`}
    >
      <Icon className="h-6 w-6 flex-shrink-0" />
      <span className="font-medium">{label}</span>
    </button>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage }) => {
  return (
    <aside className="w-64 bg-black/30 p-6 flex-col text-white shadow-2xl hidden md:flex">
      <div className="flex items-center gap-3 mb-10">
        <CodeIcon className="h-10 w-10 text-yellow-400" />
        <h1 className="text-2xl font-bold tracking-tight text-yellow-400">
          Vibe Coder
        </h1>
      </div>
      <nav className="flex flex-col gap-2">
        <NavItem
          icon={HomeIcon}
          label="Homepage"
          page="home"
          isActive={activePage === 'home'}
          onClick={() => setActivePage('home')}
        />
        <NavItem
          icon={LightbulbIcon}
          label="Idea Page"
          page="idea"
          isActive={activePage === 'idea'}
          onClick={() => setActivePage('idea')}
        />
      </nav>
    </aside>
  );
};

export default Sidebar;
