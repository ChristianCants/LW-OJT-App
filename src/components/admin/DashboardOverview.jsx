import React, { useState } from 'react';
import {
    Users,
    TrendingUp,
    TrendingDown,
    Award,
    AlertCircle,
    Calendar,
    CheckCircle,
    Clock,
    BarChart3,
    Download,
    Filter
} from 'lucide-react';

// Mock data for demonstration
const mockData = {
    totalInterns: 24,
    averageScore: 82.5,
    topPerformers: [
        { id: 1, name: "Sarah Johnson", score: 95, avatar: "SJ", trend: "+5%" },
        { id: 2, name: "Michael Chen", score: 92, avatar: "MC", trend: "+3%" },
        { id: 3, name: "Emma Davis", score: 90, avatar: "ED", trend: "+2%" },
    ],
    lowPerformers: [
        { id: 4, name: "John Smith", score: 65, avatar: "JS", trend: "-2%" },
        { id: 5, name: "Lisa Brown", score: 68, avatar: "LB", trend: "-1%" },
        { id: 6, name: "David Wilson", score: 70, avatar: "DW", trend: "0%" },
    ],
    weeklyActivity: {
        tasksCompleted: 156,
        tasksInProgress: 42,
        tasksPending: 28,
        attendanceRate: 94.5
    },
    performanceTrend: [
        { week: "Week 1", score: 75 },
        { week: "Week 2", score: 78 },
        { week: "Week 3", score: 80 },
        { week: "Week 4", score: 82.5 },
    ],
    recentActivity: [
        { id: 1, intern: "Sarah Johnson", action: "Completed task", task: "React Component Library", time: "2 mins ago", type: "success" },
        { id: 2, intern: "Michael Chen", action: "Submitted feedback", task: "API Integration", time: "15 mins ago", type: "info" },
        { id: 3, intern: "John Smith", action: "Missed deadline", task: "UI/UX Design", time: "1 hour ago", type: "warning" },
        { id: 4, intern: "Emma Davis", action: "Started task", task: "Database Schema", time: "2 hours ago", type: "info" },
    ]
};

const DashboardOverview = () => {
    const [timeFilter, setTimeFilter] = useState('week');

    const MetricCard = ({ icon: Icon, label, value, subtitle, trend, color = "blue" }) => {
        const colorClasses = {
            blue: "bg-blue-50 text-blue-500",
            green: "bg-green-50 text-green-500",
            orange: "bg-orange-50 text-orange-500",
            purple: "bg-purple-50 text-purple-500"
        };

        return (
            <div
                className="p-6 rounded-2xl"
                style={{
                    background: 'rgba(255, 255, 255, 0.6)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(0, 0, 0, 0.05)',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
                }}
            >
                <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl ${colorClasses[color]}`}>
                        <Icon size={24} strokeWidth={1.5} />
                    </div>
                    {trend && (
                        <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${trend.startsWith('+') ? 'bg-green-50' : 'bg-red-50'
                            }`}>
                            {trend.startsWith('+') ? (
                                <TrendingUp size={14} className="text-green-500" strokeWidth={2} />
                            ) : (
                                <TrendingDown size={14} className="text-red-500" strokeWidth={2} />
                            )}
                            <span className={`text-xs font-bold ${trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
                                }`}>
                                {trend}
                            </span>
                        </div>
                    )}
                </div>

                <div>
                    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-1">{label}</p>
                    <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
                    {subtitle && <p className="text-xs text-gray-400 font-medium">{subtitle}</p>}
                </div>
            </div>
        );
    };

    const PerformerCard = ({ performer, type }) => {
        const isTop = type === 'top';
        return (
            <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                <div className={`w-10 h-10 rounded-xl ${isTop ? 'bg-green-500' : 'bg-orange-500'
                    } text-white flex items-center justify-center font-bold text-sm`}>
                    {performer.avatar}
                </div>
                <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 text-sm">{performer.name}</h4>
                    <p className="text-xs text-gray-500">Score: {performer.score}%</p>
                </div>
                <div className={`px-2 py-1 rounded-lg text-xs font-bold ${performer.trend.startsWith('+') || performer.trend === '0%'
                        ? 'bg-green-50 text-green-600'
                        : 'bg-red-50 text-red-600'
                    }`}>
                    {performer.trend}
                </div>
            </div>
        );
    };

    return (
        <div className="h-full overflow-y-auto pb-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                    <p className="text-sm text-gray-500 mt-1">Monitor intern performance and productivity</p>
                </div>

                <div className="flex gap-3">
                    <button
                        className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                    >
                        <Filter size={16} />
                        Filter
                    </button>
                    <button
                        className="px-4 py-2 bg-gray-900 text-white rounded-xl text-sm font-semibold hover:bg-gray-800 transition-colors flex items-center gap-2"
                    >
                        <Download size={16} />
                        Export
                    </button>
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <MetricCard
                    icon={Users}
                    label="Total Interns"
                    value={mockData.totalInterns}
                    subtitle="Active this month"
                    color="blue"
                />
                <MetricCard
                    icon={BarChart3}
                    label="Average Score"
                    value={`${mockData.averageScore}%`}
                    subtitle="Overall performance"
                    trend="+2.5%"
                    color="green"
                />
                <MetricCard
                    icon={CheckCircle}
                    label="Tasks Completed"
                    value={mockData.weeklyActivity.tasksCompleted}
                    subtitle="This week"
                    trend="+12%"
                    color="purple"
                />
                <MetricCard
                    icon={Calendar}
                    label="Attendance Rate"
                    value={`${mockData.weeklyActivity.attendanceRate}%`}
                    subtitle="Last 7 days"
                    trend="+1.5%"
                    color="orange"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Charts & Analytics */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Performance Trend Chart */}
                    <div
                        className="p-6 rounded-2xl"
                        style={{
                            background: 'rgba(255, 255, 255, 0.6)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(0, 0, 0, 0.05)',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
                        }}
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-bold text-gray-900">Performance Trend</h2>
                            <div className="flex gap-2">
                                {['week', 'month', 'year'].map(filter => (
                                    <button
                                        key={filter}
                                        onClick={() => setTimeFilter(filter)}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${timeFilter === filter
                                                ? 'bg-gray-900 text-white'
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                            }`}
                                    >
                                        {filter.charAt(0).toUpperCase() + filter.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Simple Bar Chart */}
                        <div className="h-64 flex items-end justify-between gap-4">
                            {mockData.performanceTrend.map((item, i) => (
                                <div key={i} className="flex flex-col items-center gap-2 flex-1">
                                    <div className="w-full bg-gray-100 rounded-t-xl relative" style={{ height: '100%' }}>
                                        <div
                                            className="absolute bottom-0 w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-xl transition-all duration-500"
                                            style={{ height: `${(item.score / 100) * 100}%` }}
                                        />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-xs font-bold text-gray-900">{item.score}%</p>
                                        <p className="text-xs text-gray-500">{item.week}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div
                        className="p-6 rounded-2xl"
                        style={{
                            background: 'rgba(255, 255, 255, 0.6)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(0, 0, 0, 0.05)',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
                        }}
                    >
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h2>
                        <div className="space-y-3">
                            {mockData.recentActivity.map(activity => (
                                <div key={activity.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                                    <div className={`w-2 h-2 rounded-full mt-2 ${activity.type === 'success' ? 'bg-green-500' :
                                            activity.type === 'warning' ? 'bg-orange-500' :
                                                'bg-blue-500'
                                        }`} />
                                    <div className="flex-1">
                                        <p className="text-sm font-semibold text-gray-900">{activity.intern}</p>
                                        <p className="text-xs text-gray-600">{activity.action}: <span className="font-medium">{activity.task}</span></p>
                                        <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column - Top/Low Performers */}
                <div className="space-y-6">
                    {/* Top Performers */}
                    <div
                        className="p-6 rounded-2xl"
                        style={{
                            background: 'rgba(255, 255, 255, 0.6)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(0, 0, 0, 0.05)',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
                        }}
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <Award size={20} className="text-green-500" />
                            <h2 className="text-lg font-bold text-gray-900">Top Performers</h2>
                        </div>
                        <div className="space-y-2">
                            {mockData.topPerformers.map(performer => (
                                <PerformerCard key={performer.id} performer={performer} type="top" />
                            ))}
                        </div>
                    </div>

                    {/* Low Performers */}
                    <div
                        className="p-6 rounded-2xl"
                        style={{
                            background: 'rgba(255, 255, 255, 0.6)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(0, 0, 0, 0.05)',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
                        }}
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <AlertCircle size={20} className="text-orange-500" />
                            <h2 className="text-lg font-bold text-gray-900">Needs Attention</h2>
                        </div>
                        <div className="space-y-2">
                            {mockData.lowPerformers.map(performer => (
                                <PerformerCard key={performer.id} performer={performer} type="low" />
                            ))}
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div
                        className="p-6 rounded-2xl"
                        style={{
                            background: 'rgba(255, 255, 255, 0.6)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(0, 0, 0, 0.05)',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
                        }}
                    >
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Task Overview</h2>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500" />
                                    <span className="text-sm text-gray-600">Completed</span>
                                </div>
                                <span className="text-sm font-bold text-gray-900">{mockData.weeklyActivity.tasksCompleted}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                                    <span className="text-sm text-gray-600">In Progress</span>
                                </div>
                                <span className="text-sm font-bold text-gray-900">{mockData.weeklyActivity.tasksInProgress}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-gray-400" />
                                    <span className="text-sm text-gray-600">Pending</span>
                                </div>
                                <span className="text-sm font-bold text-gray-900">{mockData.weeklyActivity.tasksPending}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardOverview;
