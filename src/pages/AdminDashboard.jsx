import React, { useEffect, useState } from 'react';
import { supabase, signOut } from '../services';
import { useNavigate } from 'react-router-dom';
import {
    LogOut,
    LayoutDashboard,
    Users,
    Calendar,
    CheckSquare,
    BarChart3,
    MessageSquare,
    Bell,
    Search,
    Menu,
    X
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import DashboardOverview from '../components/admin/DashboardOverview';
import AttendanceModule from '../components/admin/AttendanceModule';
import TaskManagement from '../components/admin/TaskManagement';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [admin, setAdmin] = useState(null);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        const checkAdmin = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                navigate('/admin/signin');
            } else {
                setAdmin(user);
            }
        }
        checkAdmin();
    }, [navigate]);

    const handleLogout = async () => {
        await signOut();
        navigate('/admin/signin');
    };

    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'interns', label: 'Interns', icon: Users },
        { id: 'attendance', label: 'Attendance', icon: Calendar },
        { id: 'tasks', label: 'Tasks', icon: CheckSquare },
        { id: 'performance', label: 'Performance', icon: BarChart3 },
        { id: 'feedback', label: 'Feedback', icon: MessageSquare },
    ];

    if (!admin) return (
        <div className="flex justify-center items-center h-screen bg-[var(--bg-primary)]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[var(--bg-primary)] flex">
            {/* Sidebar */}
            <aside className={`
                fixed lg:static inset-y-0 left-0 z-50 w-64 
                bg-[var(--bg-secondary)] border-r border-[var(--border-color)]
                transform transition-transform duration-300 ease-in-out
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                <div className="h-full flex flex-col">
                    {/* Logo */}
                    <div className="p-6 border-b border-[var(--border-color)] flex items-center justify-between">
                        <h2 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                            Admin Panel
                        </h2>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="lg:hidden p-2 hover:bg-[var(--bg-primary)] rounded-lg transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                        {navItems.map(item => {
                            const Icon = item.icon;
                            const isActive = activeTab === item.id;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => {
                                        setActiveTab(item.id);
                                        setSidebarOpen(false);
                                    }}
                                    className={`
                                        w-full flex items-center gap-3 px-4 py-3 rounded-xl
                                        transition-all duration-200 font-medium text-sm
                                        ${isActive
                                            ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                                            : 'text-[var(--text-secondary)] hover:bg-[var(--bg-primary)] hover:text-[var(--text-primary)]'
                                        }
                                    `}
                                >
                                    <Icon size={20} strokeWidth={isActive ? 2 : 1.5} />
                                    {item.label}
                                </button>
                            );
                        })}
                    </nav>

                    {/* Logout */}
                    <div className="p-4 border-t border-[var(--border-color)]">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors font-medium text-sm"
                        >
                            <LogOut size={20} />
                            Logout
                        </button>
                    </div>
                </div>
            </aside>

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen">
                {/* Header */}
                <header className="h-16 bg-[var(--bg-secondary)] border-b border-[var(--border-color)] px-4 lg:px-8 flex items-center justify-between sticky top-0 z-30">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden p-2 hover:bg-[var(--bg-primary)] rounded-lg transition-colors"
                        >
                            <Menu size={20} />
                        </button>

                        {/* Search */}
                        <div className="hidden md:flex items-center gap-2 bg-[var(--bg-primary)] px-4 py-2 rounded-xl border border-[var(--border-color)] w-80">
                            <Search size={18} className="text-[var(--text-secondary)]" />
                            <input
                                type="text"
                                placeholder="Search interns, tasks..."
                                className="bg-transparent outline-none text-sm w-full placeholder:text-[var(--text-secondary)]"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 hover:bg-[var(--bg-primary)] rounded-lg transition-colors"
                        >
                            {theme === 'dark' ? '🌙' : '☀️'}
                        </button>

                        {/* Notifications */}
                        <button className="p-2 hover:bg-[var(--bg-primary)] rounded-lg transition-colors relative">
                            <Bell size={20} />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>

                        {/* Admin Profile */}
                        <div className="flex items-center gap-3 pl-3 border-l border-[var(--border-color)]">
                            <div className="hidden sm:block text-right">
                                <p className="text-sm font-semibold">{admin.email?.split('@')[0]}</p>
                                <p className="text-xs text-[var(--text-secondary)]">Administrator</p>
                            </div>
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                                {admin.email?.[0].toUpperCase()}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="flex-1 p-4 lg:p-8">
                    {activeTab === 'dashboard' && <DashboardOverview />}
                    {activeTab === 'interns' && <PlaceholderModule title="Interns Management" />}
                    {activeTab === 'attendance' && <AttendanceModule />}
                    {activeTab === 'tasks' && <TaskManagement />}
                    {activeTab === 'performance' && <PlaceholderModule title="Performance Scoring" />}
                    {activeTab === 'feedback' && <PlaceholderModule title="Feedback System" />}
                </main>
            </div>
        </div>
    );
};

// Placeholder component for modules not yet implemented
const PlaceholderModule = ({ title }) => (
    <div
        className="h-full flex items-center justify-center rounded-2xl"
        style={{
            background: 'rgba(255, 255, 255, 0.6)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(0, 0, 0, 0.05)',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
        }}
    >
        <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
            <p className="text-gray-500">This module is coming soon...</p>
        </div>
    </div>
);

export default AdminDashboard;
