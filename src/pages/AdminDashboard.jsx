
import React, { useEffect, useState } from 'react';
import { supabase, signOut } from '../services';
import { useNavigate } from 'react-router-dom';
import { LogOut, LayoutDashboard, Users, Settings, Bell } from 'lucide-react';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [admin, setAdmin] = useState(null);

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

    if (!admin) return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-black text-white flex">
            {/* Sidebar */}
            <aside className="w-64 glass-card m-4 mr-0 flex flex-col hidden md:flex">
                <div className="p-6 border-b border-white/10">
                    <h2 className="text-2xl font-bold text-gradient">Admin Panel</h2>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <a href="#" className="flex items-center gap-3 px-4 py-3 bg-green-500/10 text-green-400 rounded-lg border border-green-500/20">
                        <LayoutDashboard size={20} />
                        Dashboard
                    </a>
                    <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-white/5 hover:text-white rounded-lg transition-colors">
                        <Users size={20} />
                        Users
                    </a>
                    <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-white/5 hover:text-white rounded-lg transition-colors">
                        <Settings size={20} />
                        Settings
                    </a>
                </nav>
                <div className="p-4 border-t border-white/10">
                    <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 w-full text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                <header className="h-16 flex items-center justify-between px-8 bg-black/50 backdrop-blur-md border-b border-white/5">
                    <h1 className="text-xl font-semibold">Overview</h1>
                    <div className="flex items-center gap-4">
                        <button className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/5">
                            <Bell size={20} />
                        </button>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-green-400 to-blue-500"></div>
                    </div>
                </header>

                <main className="flex-1 overflow-auto p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="glass-card p-6">
                            <h3 className="text-gray-400 text-sm font-medium">Total Users</h3>
                            <p className="text-3xl font-bold mt-2">1,234</p>
                            <span className="text-green-400 text-xs">+12% from last month</span>
                        </div>
                        <div className="glass-card p-6">
                            <h3 className="text-gray-400 text-sm font-medium">Active Sessions</h3>
                            <p className="text-3xl font-bold mt-2">856</p>
                            <span className="text-green-400 text-xs">+5% from last hour</span>
                        </div>
                        <div className="glass-card p-6">
                            <h3 className="text-gray-400 text-sm font-medium">System Status</h3>
                            <p className="text-3xl font-bold mt-2 text-green-400">Normal</p>
                            <span className="text-gray-500 text-xs">All systems operational</span>
                        </div>
                    </div>

                    <div className="glass-card p-6">
                        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-400">
                                            <Users size={20} />
                                        </div>
                                        <div>
                                            <p className="font-medium text-white">New user registration</p>
                                            <p className="text-xs text-gray-500">2 minutes ago</p>
                                        </div>
                                    </div>
                                    <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded">Success</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
