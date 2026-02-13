import React, { useEffect, useState } from 'react';
import { supabase } from '../services';
import { useNavigate } from 'react-router-dom';
import { Bell, Search } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import DashboardOverview from '../components/admin/DashboardOverview';
import AttendanceModule from '../components/admin/AttendanceModule';
import TaskManagement from '../components/admin/TaskManagement';
import CreateUser from '../components/admin/CreateUser';
import AdminFloatingDock from '../components/AdminFloatingDock';
import Particles from '../components/Particles';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [admin, setAdmin] = useState(null);
    const [activeTab, setActiveTab] = useState('dashboard');
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

    if (!admin) return (
        <div className="flex justify-center items-center h-screen bg-[var(--bg-primary)]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[var(--bg-primary)] relative">
            {/* Video + Particles Background */}
            <div className="fixed inset-0 z-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                >
                    <source src="https://videos.pexels.com/video-files/10922866/10922866-uhd_2560_1440_30fps.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0">
                    <Particles
                        particleCount={800}
                        particleSpread={17}
                        speed={0.28}
                        particleColors={['#ffffff', '#00d10e', '#dfd707', '#171717']}
                        moveParticlesOnHover={false}
                        particleHoverFactor={1}
                        alphaParticles={false}
                        particleBaseSize={100}
                        sizeRandomness={1}
                        cameraDistance={20}
                        disableRotation={false}
                    />
                </div>
            </div>
            {/* Header */}
            <header className="h-16 bg-[var(--bg-secondary)] border-b border-[var(--border-color)] px-4 lg:px-8 flex items-center justify-between sticky top-0 z-30 relative">
                <div className="flex items-center gap-4">
                    <h2 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                        Admin Panel
                    </h2>

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
            <main className="p-4 lg:p-8 pb-32 relative z-10">
                {activeTab === 'dashboard' && <DashboardOverview />}
                {activeTab === 'interns' && <PlaceholderModule title="Interns Management" />}
                {activeTab === 'attendance' && <AttendanceModule />}
                {activeTab === 'tasks' && <TaskManagement />}
                {activeTab === 'performance' && <PlaceholderModule title="Performance Scoring" />}
                {activeTab === 'feedback' && <PlaceholderModule title="Feedback System" />}
                {activeTab === 'create-user' && <CreateUser />}
            </main>

            {/* Floating Dock Navigation */}
            <AdminFloatingDock activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
    );
};

// Placeholder component for modules not yet implemented
const PlaceholderModule = ({ title }) => (
    <div
        className="h-full min-h-[60vh] flex items-center justify-center rounded-2xl"
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
