import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    PieChart,
    FileText,
    BarChart2,
    Search,
    Bell,
    Settings,
    LogOut,
    Menu,
    X,
    ChevronDown
} from 'lucide-react';

const DashboardLayout = ({ children, user, activeTab, onTabChange }) => {
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

    const handleSignOut = () => {
        localStorage.removeItem('user');
        navigate('/signin');
    };

    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'analytics', label: 'Analytics', icon: PieChart },
        { id: 'members', label: 'Evaluation', icon: FileText },
        { id: 'activity', label: 'Reports', icon: BarChart2 },
    ];

    return (
        <div className="flex h-screen bg-[#050505] text-white font-sans overflow-hidden selection:bg-[#bef264]/30">
            {/* ─── Sidebar ─────────────────────────────────────────── */}
            <aside
                className={`
                    fixed inset-y-0 left-0 z-50 w-64 bg-[#050505] border-r border-[#1a1a1a] transition-transform duration-300 ease-in-out flex flex-col
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                    lg:relative lg:translate-x-0
                `}
            >
                {/* Logo Area */}
                <div className="h-20 flex items-center gap-3 px-6 border-b border-[#1a1a1a]">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#bef264] to-[#10b981] flex items-center justify-center shadow-lg shadow-[#bef264]/20">
                        <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <span className="font-bold text-xl tracking-tight">Lifewood</span>
                    <span className="px-2 py-0.5 rounded-md bg-[#1a1a1a] text-[10px] text-gray-400 font-bold border border-[#333]">HUB</span>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-8 space-y-1 overflow-y-auto custom-scrollbar">
                    <p className="px-4 text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Main Menu</p>
                    {navItems.map(item => {
                        const Icon = item.icon;
                        const isActive = activeTab === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => onTabChange(item.id)}
                                className={`
                                    w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 group relative overflow-hidden
                                    ${isActive
                                        ? 'bg-gradient-to-r from-[#1a1a1a] to-transparent text-[#bef264] shadow-inner border-l-2 border-[#bef264]'
                                        : 'text-gray-400 hover:text-white hover:bg-[#111]'
                                    }
                                `}
                            >
                                <Icon
                                    size={20}
                                    className={`transition-colors ${isActive ? 'text-[#bef264]' : 'text-gray-500 group-hover:text-gray-300'}`}
                                />
                                {item.label}
                                {isActive && (
                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-[#bef264] rounded-l-full shadow-[0_0_10px_rgba(190,242,100,0.5)]"></div>
                                )}
                            </button>
                        );
                    })}

                    <p className="px-4 text-xs font-bold text-gray-500 uppercase tracking-wider mt-8 mb-4">Settings</p>
                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-[#111] transition-all">
                        <Settings size={20} className="text-gray-500" />
                        Settings
                    </button>
                </nav>

                {/* Bottom User Card */}
                <div className="p-4 border-t border-[#1a1a1a]">
                    <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-3 p-3 rounded-xl bg-[#111] hover:bg-[#1a1a1a] border border-[#222] transition-all group"
                    >
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#bef264] to-[#10b981] flex items-center justify-center text-xs font-bold ring-2 ring-[#050505] text-black">
                            {(user?.first_name || user?.username)?.[0]?.toUpperCase() || 'U'}
                        </div>
                        <div className="flex-1 text-left overflow-hidden">
                            <p className="text-sm font-bold truncate group-hover:text-[#bef264] transition-colors">
                                {user?.first_name && user?.last_name
                                    ? `${user.first_name} ${user.last_name}`
                                    : user?.username || 'User'}
                            </p>
                            <p className="text-xs text-gray-500 truncate">Intern Access</p>
                        </div>
                        <LogOut size={16} className="text-gray-500 group-hover:text-red-400 transition-colors" />
                    </button>
                </div>
            </aside>

            {/* ─── Main Content Wrapper ───────────────────────────── */}
            <main className="flex-1 flex flex-col min-w-0 bg-[#050505] relative">
                {/* Background Glows */}
                <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#bef264]/5 to-transparent pointer-events-none" />
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#10b981]/5 rounded-full blur-3xl pointer-events-none" />

                {/* Header Removed as per user request */}

                {/* Content Body */}
                <div className="flex-1 overflow-y-auto p-6 lg:p-8 scrollbar-hide relative z-10 pt-8">
                    <button
                        className="lg:hidden absolute top-4 left-4 p-2 text-gray-400 z-50 bg-[#111] rounded-full border border-[#222]"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                    {children}
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
