import React from 'react';
import { useTheme } from '../context/ThemeContext';
import {
    Search,
    Bell,
    Moon,
    Sun,
} from 'lucide-react';
import FloatingDock from './FloatingDock';

const DashboardLayout = ({ children, user, activeTab, onTabChange }) => {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="flex flex-col h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300 overflow-hidden font-sans relative">

            {/* Minimal Top Bar for Profile & Search */}
            <header className="h-20 flex items-center justify-between px-6 lg:px-10 shrink-0 z-40">
                {/* Logo / Brand */}
                <div className="flex items-center gap-2">
                    <span className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">L</span>
                    <span className="text-xl font-bold tracking-tight">Lifewood</span>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-4">
                    {/* Search Bar - Hidden on small screens for cleanliness */}
                    <div className="hidden md:flex items-center gap-3 bg-[var(--bg-secondary)] px-4 py-2.5 rounded-full border border-[var(--border-color)] w-64 shadow-sm backdrop-blur-md bg-opacity-80">
                        <Search size={18} className="text-[var(--text-secondary)]" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="bg-transparent border-none outline-none text-sm w-full placeholder-[var(--text-secondary)] text-[var(--text-primary)]"
                        />
                    </div>

                    <button
                        onClick={toggleTheme}
                        className="p-2.5 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-full text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all shadow-sm backdrop-blur-md"
                    >
                        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                    </button>

                    <button className="p-2.5 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-full text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all shadow-sm relative backdrop-blur-md">
                        <Bell size={20} />
                        <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-[var(--bg-card)]"></span>
                    </button>

                    <div className="flex items-center gap-3 pl-4 border-l border-[var(--border-color)]">
                        <img
                            src={`https://ui-avatars.com/api/?name=${user?.username || 'User'}&background=0D8ABC&color=fff`}
                            alt="Profile"
                            className="w-10 h-10 rounded-full border-2 border-[var(--bg-secondary)] shadow-sm"
                        />
                        <div className="hidden md:block">
                            <p className="text-sm font-bold leading-none">{user?.username || 'Guest'}</p>
                            <p className="text-xs text-[var(--text-secondary)] mt-1">{user?.email || 'Intern'}</p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto px-6 lg:px-10 pb-32"> {/* Large bottom padding for Dock */}
                <div className="max-w-7xl mx-auto h-full">
                    {children}
                </div>
            </main>

            {/* Floating Liquid Dock */}
            <FloatingDock activeTab={activeTab} onTabChange={onTabChange} />
        </div>
    );
};

export default DashboardLayout;
