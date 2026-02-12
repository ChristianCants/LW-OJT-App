import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import {
    Home,
    Activity,
    Calendar,
    Settings,
    LogOut,
    Search,
    Bell,
    Moon,
    Sun,
    Menu,
    X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DashboardLayout = ({ children, user }) => {
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/signin');
    };

    return (
        <div className="flex h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300 overflow-hidden font-sans">
            {/* Sidebar */}
            <aside className={`
                fixed inset-y-0 left-0 z-50 w-64 bg-[var(--bg-secondary)] border-r border-[var(--border-color)] transform transition-transform duration-300 ease-in-out
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
                lg:relative lg:translate-x-0
            `}>
                <div className="h-full flex flex-col p-6">
                    {/* Logo */}
                    <div className="flex items-center gap-2 mb-10">
                        <span className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">L</span>
                        <span className="text-xl font-bold tracking-tight">Lifewood</span>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-2">
                        <NavItem icon={Home} label="Dashboard" active />
                        <NavItem icon={Activity} label="Activity" />
                        <NavItem icon={Calendar} label="Schedule" />
                        <NavItem icon={Settings} label="Settings" />
                    </nav>

                    {/* Logout */}
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 text-[var(--text-secondary)] hover:bg-[var(--bg-primary)] hover:text-[var(--text-primary)] rounded-xl transition-colors mt-auto"
                    >
                        <LogOut size={20} />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-full overflow-hidden relative">
                {/* Header */}
                <header className="h-20 bg-[var(--bg-primary)] flex items-center justify-between px-6 lg:px-10 shrink-0">
                    <div className="flex items-center gap-4">
                        <button
                            className="lg:hidden p-2 text-[var(--text-secondary)]"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X /> : <Menu />}
                        </button>

                        {/* Search Bar */}
                        <div className="hidden md:flex items-center gap-3 bg-[var(--bg-secondary)] px-4 py-2.5 rounded-xl border border-[var(--border-color)] w-80 shadow-sm">
                            <Search size={18} className="text-[var(--text-secondary)]" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="bg-transparent border-none outline-none text-sm w-full placeholder-[var(--text-secondary)] text-[var(--text-primary)]"
                            />
                            <div className="flex gap-1">
                                <span className="text-xs text-[var(--text-secondary)] border border-[var(--border-color)] px-1.5 py-0.5 rounded">⌘</span>
                                <span className="text-xs text-[var(--text-secondary)] border border-[var(--border-color)] px-1.5 py-0.5 rounded">F</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={toggleTheme}
                            className="p-2.5 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all shadow-sm"
                        >
                            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                        </button>

                        <button className="p-2.5 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all shadow-sm relative">
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

                {/* Content Scrollable Area */}
                <main className="flex-1 overflow-y-auto px-6 lg:px-10 pb-10">
                    {children}
                </main>
            </div>

            {/* Overlay for mobile menu */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden glass-overlay"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}
        </div>
    );
};

const NavItem = ({ icon: Icon, label, active }) => (
    <button className={`
        flex items-center gap-3 px-4 py-3 w-full rounded-xl transition-all duration-200
        ${active
            ? 'bg-[var(--text-primary)] text-[var(--bg-secondary)] shadow-lg'
            : 'text-[var(--text-secondary)] hover:bg-[var(--bg-primary)] hover:text-[var(--text-primary)]'
        }
    `}>
        <Icon size={20} />
        <span className="font-medium">{label}</span>
    </button>
);

export default DashboardLayout;
