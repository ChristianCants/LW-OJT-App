import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import {
    Search,
    Bell,
    Moon,
    Sun,
    Settings,
    LogOut,
} from 'lucide-react';

const DashboardLayout = ({ children, user, activeTab, onTabChange }) => {
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();

    const handleSignOut = () => {
        localStorage.removeItem('user');
        navigate('/signin');
    };

    return (
        <div className="flex flex-col h-screen text-white transition-colors duration-300 overflow-hidden font-sans relative"
            style={{ background: '#0a0d0a' }}
        >
            {/* Video Background */}
            <div className="fixed inset-0 z-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                >
                    <source src="https://www.pexels.com/download/video/10922866/" type="video/mp4" />
                </video>
            </div>
            {/* Top Nav Bar */}
            <header
                className="h-16 flex items-center justify-between px-4 lg:px-6 shrink-0 z-40 sticky top-0 transition-all duration-300"
                style={{
                    background: 'rgba(255, 255, 255, 0.5)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.05)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.5)',
                }}
            >
                {/* Logo */}
                <div className="flex items-center gap-2.5">
                    <img
                        src="/Logo 1.png"
                        alt="Lifewood"
                        className="h-10 w-auto object-contain"
                    />
                </div>

                {/* Center Nav Tabs */}
                <div className="hidden md:flex items-center gap-2">
                    {[
                        { id: 'dashboard', label: 'Dashboard' },
                        { id: 'analytics', label: 'Analytics' },
                        { id: 'members', label: 'Evaluation' },
                        { id: 'activity', label: 'Reports' },
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => onTabChange(tab.id)}
                            className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 ${activeTab === tab.id
                                ? 'bg-gray-900 text-white shadow-md transform scale-105'
                                : 'text-gray-600 hover:text-gray-900 border border-gray-300/50 hover:border-gray-400/80 bg-white/20'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Right: Search + Profile */}
                <div className="flex items-center gap-3">
                    <button className="p-2.5 rounded-full hover:bg-black/5 transition-colors text-gray-600 hover:text-gray-900">
                        <Search size={18} />
                    </button>
                    <button className="p-2.5 rounded-full hover:bg-black/5 transition-colors relative text-gray-600 hover:text-gray-900">
                        <Bell size={18} />
                    </button>
                    <div className="p-0.5 rounded-full border border-gray-200 bg-white/50">
                        <img
                            src={`https://ui-avatars.com/api/?name=${user?.username || 'User'}&background=c8ff00&color=111&bold=true&size=32`}
                            alt="Profile"
                            className="w-8 h-8 rounded-full"
                        />
                    </div>
                    <button
                        onClick={handleSignOut}
                        className="p-2.5 rounded-full hover:bg-red-50 text-gray-600 hover:text-red-500 transition-colors border border-transparent hover:border-red-100 ml-1"
                        title="Sign Out"
                    >
                        <LogOut size={18} />
                    </button>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto scrollbar-hide px-4 lg:px-6 pb-10 relative z-10 w-full">
                <div className="w-full h-full">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
