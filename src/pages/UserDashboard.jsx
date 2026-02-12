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
import DashboardModule from '../components/DashboardModule';
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
                <div className="animate-fade-in h-full">
                    <DashboardModule user={user} />
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
