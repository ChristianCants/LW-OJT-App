import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';
import BottomNavigation from '../components/BottomNavigation';
import { StatsCard, PerformanceChart, TaskList, ActivityFeed, ProfileWidget } from '../components/DashboardWidgets';

const UserDashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [activeTab, setActiveTab] = useState('home');

    useEffect(() => {
        // Check for user in localStorage instead of Supabase Auth
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            navigate('/signin');
        } else {
            setUser(JSON.parse(storedUser));
        }
    }, [navigate]);

    if (!user) return (
        <div className="flex justify-center items-center h-screen bg-[#0a0a0a]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
    );

    const renderContent = () => {
        switch (activeTab) {
            case 'home':
                return (
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 pb-24">
                        {/* Main Content Column */}
                        <div className="lg:col-span-3 space-y-6">
                            {/* Header Section */}
                            <div className="glass-card p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div>
                                    <h1 className="text-3xl font-bold text-white mb-2">Hello, {user.username}</h1>
                                    <p className="text-gray-400">Track team progress here. You almost reach a goal!</p>
                                </div>
                                <div className="flex items-center gap-2 text-gray-400 bg-white/5 px-4 py-2 rounded-lg">
                                    <span>{new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                </div>
                            </div>

                            {/* Stats Row */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <StatsCard title="Finished" value="18" change={8} icon={CheckCircle} />
                                <StatsCard title="Tracked" value="31h" change={-6} icon={Clock} color="orange" />
                                <StatsCard title="Efficiency" value="93%" change={12} icon={TrendingUp} color="blue" />
                            </div>

                            {/* Performance and Tasks Row */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <PerformanceChart />
                                <div className="space-y-6">
                                    <TaskList />
                                </div>
                            </div>
                        </div>

                        {/* Right Sidebar Column */}
                        <div className="lg:col-span-1 space-y-6">
                            <ProfileWidget user={user} />
                            <ActivityFeed />
                        </div>
                    </div>
                );
            case 'users':
                return <div className="text-white text-center pt-20">Users Module Coming Soon</div>;
            case 'start':
                return <div className="text-white text-center pt-20">Activity Module Coming Soon</div>;
            default:
                return <div className="text-white text-center pt-20">Module Coming Soon</div>;
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] p-6 font-sans">
            {renderContent()}
            <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
    );
};

export default UserDashboard;
