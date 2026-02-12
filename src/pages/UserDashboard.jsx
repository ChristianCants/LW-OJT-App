import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    CheckCircle,
    TrendingUp,
    Activity,
    FileText,
    MoreVertical
} from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import ActivityModule from '../components/ActivityModule';
// import { PerformanceChart } from '../components/DashboardWidgets'; // Reusing or will create new one

const UserDashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [activeTab, setActiveTab] = useState('dashboard');

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            navigate('/signin');
        } else {
            setUser(JSON.parse(storedUser));
        }
    }, [navigate]);

    if (!user) return null;

    return (
        <DashboardLayout user={user} activeTab={activeTab} onTabChange={setActiveTab}>
            {activeTab === 'dashboard' ? (
                <div className="space-y-8 animate-fade-in">
                    {/* Welcome Section */}
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Hello, {user.username}!</h1>
                        <p className="text-[var(--text-secondary)]">Here's your daily activity report.</p>
                    </div>

                    {/* Top Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <StatCard
                            icon={Activity}
                            label="Attendance Rate"
                            value="95%"
                            unit="Pres"
                            color="text-green-500"
                            bgColor="bg-green-500/10"
                        />
                        <StatCard
                            icon={CheckCircle}
                            label="Tasks Completed"
                            value="42"
                            unit="Tasks"
                            color="text-blue-500"
                            bgColor="bg-blue-500/10"
                        />
                        <StatCard
                            icon={TrendingUp}
                            label="Average Score"
                            value="88"
                            unit="/ 100"
                            color="text-orange-500"
                            bgColor="bg-orange-500/10"
                        />
                    </div>

                    {/* Main Content Area */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column (Chart) */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Performance Chart Section */}
                            <div className="bg-[var(--bg-secondary)] p-6 rounded-2xl border border-[var(--border-color)] shadow-sm">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="font-bold text-lg flex items-center gap-2">
                                        <Activity size={20} className="text-green-500" />
                                        Performance Report
                                    </h3>
                                    <button className="px-3 py-1.5 text-xs font-medium border border-[var(--border-color)] rounded-lg hover:bg-[var(--bg-primary)] transition-colors">
                                        Filter
                                    </button>
                                </div>
                                {/* Placeholder for Chart - using simple bars for now if Chart component needs update */}
                                <div className="h-64 flex items-end justify-between gap-4 px-4">
                                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                                        <div key={day} className="flex flex-col items-center gap-2 w-full">
                                            <div
                                                className={`w-full rounded-t-xl transition-all hover:opacity-80 ${i === 3 ? 'bg-green-500' : 'bg-[var(--bg-primary)]'}`}
                                                style={{ height: `${Math.random() * 60 + 20}%` }}
                                            ></div>
                                            <span className="text-xs text-[var(--text-secondary)]">{day}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Weekly Recap */}
                            <div className="bg-[var(--bg-secondary)] p-6 rounded-2xl border border-[var(--border-color)] shadow-sm">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="font-bold text-lg">Weekly Activity Log</h3>
                                    <div className="text-sm text-[var(--text-secondary)] bg-[var(--bg-primary)] px-3 py-1 rounded-lg">
                                        09 - 15 Feb 2026
                                    </div>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-left">
                                        <thead className="text-[var(--text-secondary)] font-medium border-b border-[var(--border-color)]">
                                            <tr>
                                                <th className="py-3 pl-2">Day</th>
                                                <th className="py-3">Task</th>
                                                <th className="py-3">Status</th>
                                                <th className="py-3">Duration</th>
                                                <th className="py-3">Score</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-[var(--border-color)]">
                                            <TableRow day="Mon" task="React Components" status="Completed" duration="4h 30m" score="92%" />
                                            <TableRow day="Tue" task="API Integration" status="In Progress" duration="3h 15m" score="--" />
                                            <TableRow day="Wed" task="UI Design" status="Pending" duration="--" score="--" />
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Right Column (Widgets) */}
                        <div className="space-y-6">
                            {/* Reminder Widget */}
                            <div className="bg-[var(--bg-secondary)] p-6 rounded-2xl border border-[var(--border-color)] shadow-sm">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="font-bold text-lg">Reminders</h3>
                                    <span className="text-sm text-orange-500 font-medium">Today</span>
                                </div>

                                <div className="space-y-6 relative before:absolute before:inset-y-2 before:left-[7px] before:w-[2px] before:bg-[var(--border-color)]">
                                    <TimelineItem time="09:00" title="Daily Standup" subtitle="Google Meet" active />
                                    <TimelineItem time="11:30" title="Submit Report" subtitle="Weekly Progress" />
                                    <TimelineItem time="14:00" title="Code Review" subtitle="With Senior Dev" />
                                </div>
                            </div>

                            {/* Recent Activities Widget */}
                            <div className="bg-[var(--bg-secondary)] p-6 rounded-2xl border border-[var(--border-color)] shadow-sm">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="font-bold text-lg">Recent Files</h3>
                                    <button><MoreVertical size={18} className="text-[var(--text-secondary)]" /></button>
                                </div>

                                <div className="space-y-4">
                                    <FileItem name="Project_Specs.pdf" size="2.4 MB" color="text-red-500" bg="bg-red-500/10" />
                                    <FileItem name="Design_System.fig" size="145 MB" color="text-purple-500" bg="bg-purple-500/10" />
                                    <FileItem name="Sprint_Plan.docx" size="1.2 MB" color="text-blue-500" bg="bg-blue-500/10" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="animate-fade-in h-full">
                    <ActivityModule />
                </div>
            )}
        </DashboardLayout>
    );
};

// ... Sub-components (StatCard, TimelineItem, etc.) remain unchanged ...
// NOTE: I'm re-declaring them here to ensure the full file is valid.
const StatCard = ({ icon: Icon, label, value, unit, color, bgColor }) => (
    <div className="bg-[var(--bg-secondary)] p-6 rounded-2xl border border-[var(--border-color)] flex items-center gap-4 shadow-sm hover:translate-y-[-2px] transition-transform">
        <div className={`p-4 rounded-xl ${bgColor} ${color}`}>
            <Icon size={24} />
        </div>
        <div>
            <p className="text-sm text-[var(--text-secondary)] font-medium mb-1">{label}</p>
            <div className="flex items-baseline gap-1">
                <h3 className="text-2xl font-bold">{value}</h3>
                <span className="text-sm text-[var(--text-secondary)]">{unit}</span>
            </div>
        </div>
    </div>
);

const TimelineItem = ({ time, title, subtitle, active }) => (
    <div className="flex gap-4 relative pl-2">
        <div className={`w-3.5 h-3.5 rounded-full border-2 border-[var(--bg-secondary)] z-10 
            ${active ? 'bg-orange-500 shadow-[0_0_0_4px_rgba(249,115,22,0.2)]' : 'bg-[var(--border-color)]'}
         `}></div>
        <div>
            <p className="text-xs font-bold text-[var(--text-primary)] mb-0.5">{time}</p>
            <h4 className="font-medium text-sm">{title}</h4>
            <p className="text-xs text-[var(--text-secondary)]">{subtitle}</p>
        </div>
    </div>
);

const TableRow = ({ day, task, status, duration, score }) => (
    <tr className="hover:bg-[var(--bg-primary)] transition-colors">
        <td className="py-4 pl-2 font-medium">{day}</td>
        <td className="py-4">{task}</td>
        <td className="py-4">
            <span className={`text-xs px-2 py-1 rounded-full 
                ${status === 'Completed' ? 'bg-green-500/10 text-green-500' :
                    status === 'In Progress' ? 'bg-blue-500/10 text-blue-500' :
                        'bg-gray-500/10 text-gray-500'}
            `}>
                {status}
            </span>
        </td>
        <td className="py-4 text-[var(--text-secondary)]">{duration}</td>
        <td className="py-4 font-bold">{score}</td>
    </tr>
);

const FileItem = ({ name, size, color, bg }) => (
    <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-[var(--bg-primary)] transition-colors cursor-pointer">
        <div className={`p-2.5 rounded-lg ${bg} ${color}`}>
            <FileText size={18} />
        </div>
        <div>
            <p className="text-sm font-medium">{name}</p>
            <p className="text-xs text-[var(--text-secondary)]">{size}</p>
        </div>
    </div>
);

export default UserDashboard;
