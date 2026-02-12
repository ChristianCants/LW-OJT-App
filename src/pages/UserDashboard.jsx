
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, ArrowLeft, User } from 'lucide-react';

const UserDashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Check for user in localStorage instead of Supabase Auth
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            navigate('/signin');
        } else {
            setUser(JSON.parse(storedUser));
        }
    }, [navigate]);

    const handleLogout = () => {
        // Clear local storage on logout
        localStorage.removeItem('user');
        navigate('/signin');
    };

    if (!user) return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
    );

    return (
        <div className="min-h-screen p-6">
            <header className="flex justify-between items-center mb-8 glass-card p-4">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-white transition-colors">
                        <ArrowLeft size={24} />
                    </button>
                    <h1 className="text-2xl font-bold text-gradient">Dashboard</h1>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-gray-300">
                        <User size={20} />
                        <span className="hidden md:inline">{user.username}</span>
                    </div>
                    <div className="px-3 py-1 text-xs rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                        {user.role}
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all border border-red-500/20"
                    >
                        <LogOut size={18} />
                        <span className="hidden md:inline">Logout</span>
                    </button>
                </div>
            </header>

            <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Welcome Card */}
                <div className="glass-card p-6 col-span-1 md:col-span-2 lg:col-span-3">
                    <h2 className="text-xl font-semibold mb-2 text-white">Welcome back, {user.username}!</h2>
                    <p className="text-gray-400">Here's an overview of your activity.</p>
                </div>

                {/* Stat Cards */}
                <div className="glass-card p-6 hover:translate-y-[-4px] transition-transform duration-300">
                    <h3 className="text-gray-400 text-sm font-medium mb-2">Total Hours</h3>
                    <p className="text-3xl font-bold text-white">0</p>
                    <div className="text-green-400 text-sm mt-2 flex items-center gap-1">
                        +0% <span className="text-gray-500">from last week</span>
                    </div>
                </div>

                <div className="glass-card p-6 hover:translate-y-[-4px] transition-transform duration-300">
                    <h3 className="text-gray-400 text-sm font-medium mb-2">Tasks Completed</h3>
                    <p className="text-3xl font-bold text-white">0</p>
                    <div className="text-green-400 text-sm mt-2 flex items-center gap-1">
                        +0% <span className="text-gray-500">from last week</span>
                    </div>
                </div>

                <div className="glass-card p-6 hover:translate-y-[-4px] transition-transform duration-300">
                    <h3 className="text-gray-400 text-sm font-medium mb-2">Pending Reviews</h3>
                    <p className="text-3xl font-bold text-white">0</p>
                    <div className="text-yellow-400 text-sm mt-2 flex items-center gap-1">
                        Needs attention
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="glass-card p-6 col-span-1 md:col-span-2 lg:col-span-3">
                    <h3 className="text-lg font-semibold mb-4 text-white">Recent Activity</h3>
                    <div className="space-y-4">
                        <div className="p-4 rounded-lg bg-black/20 border border-white/5 flex justify-between items-center">
                            <div>
                                <p className="text-gray-200">Account Created</p>
                                <p className="text-xs text-gray-500">{new Date(user.created_at).toLocaleDateString()}</p>
                            </div>
                            <span className="text-green-400 text-sm">Completed</span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default UserDashboard;
