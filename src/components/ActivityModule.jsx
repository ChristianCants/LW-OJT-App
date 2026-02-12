import React, { useState } from 'react';
import {
    ChevronRight,
    FileText,
    CheckCircle,
    Clock,
    X,
    Download,
    Trophy,
    Target,
    TrendingUp,
    TrendingDown,
    Activity as ActivityIcon,
    BarChart3
} from 'lucide-react';

const mockScores = [
    {
        id: 1,
        activity: "React Component Library",
        module: "Frontend Development",
        date: "2026-02-10",
        score: 85,
        max_score: 100,
        status: "Passed",
        instructor: "Engr. Sarah Connor",
        remarks: "Good component structure and prop validation. CSS naming conventions could be more consistent.",
        improvements: ["Use consistent class naming", "Optimize re-renders"],
    },
    {
        id: 2,
        activity: "API Integration",
        module: "Backend Integration",
        date: "2026-02-12",
        score: 92,
        max_score: 100,
        status: "Passed",
        instructor: "Engr. John Doe",
        remarks: "Excellent error handling.",
        improvements: []
    },
    {
        id: 3,
        activity: "UI/UX Design",
        module: "Design Systems",
        date: "2026-02-14",
        score: null,
        max_score: 100,
        status: "Pending",
        instructor: "Ms. Jane Smith",
        remarks: "Waiting for submission review.",
        improvements: []
    },
    {
        id: 4,
        activity: "Database Schema",
        module: "Database Management",
        date: "2026-02-08",
        score: 78,
        max_score: 100,
        status: "Passed",
        instructor: "Mr. Alex Router",
        remarks: "Schema is normalized but misses some foreign keys.",
        improvements: ["Add foreign keys"]
    },
    {
        id: 5,
        activity: "System Architecture",
        module: "System Design",
        date: "2026-02-15",
        score: 88,
        max_score: 100,
        status: "Passed",
        instructor: "Mr. Architect",
        remarks: "Solid diagramming.",
        improvements: []
    }
];

const ActivityModule = () => {
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [filter, setFilter] = useState('All');

    const filteredScores = filter === 'All'
        ? mockScores
        : mockScores.filter(s => filter === 'Pending' ? s.status === 'Pending' : s.status === 'Passed');

    // Calculate statistics from the system data
    const stats = {
        totalActivities: mockScores.length,
        completedActivities: mockScores.filter(s => s.status === 'Passed').length,
        pendingActivities: mockScores.filter(s => s.status === 'Pending').length,
        averageScore: Math.round(
            mockScores.filter(s => s.score).reduce((acc, s) => acc + s.score, 0) /
            mockScores.filter(s => s.score).length
        ),
        thisWeek: mockScores.filter(s => new Date(s.date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length,
        lastWeek: 3, // Mock data for comparison
    };

    const StatCard = ({ label, value, subLabel, subValue, trend, icon: Icon, color = "blue" }) => {
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
                    <div>
                        <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-1">{label}</p>
                        <p className="text-xs text-gray-400 font-medium">Today</p>
                    </div>
                    {Icon && (
                        <div className={`p-2 rounded-xl ${colorClasses[color]}`}>
                            <Icon size={20} strokeWidth={1.5} />
                        </div>
                    )}
                </div>

                <div className="flex items-end justify-between">
                    <div>
                        <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
                        {subLabel && (
                            <div className="flex items-center gap-2">
                                <p className="text-xs text-gray-400 font-medium">{subLabel}</p>
                                <p className="text-sm font-bold text-gray-600">{subValue}</p>
                            </div>
                        )}
                    </div>
                    {trend !== undefined && (
                        <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${trend >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
                            {trend >= 0 ? (
                                <TrendingUp size={14} className="text-green-500" strokeWidth={2} />
                            ) : (
                                <TrendingDown size={14} className="text-red-500" strokeWidth={2} />
                            )}
                            <span className={`text-xs font-bold ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {Math.abs(trend)}%
                            </span>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="h-full relative overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 shrink-0">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                        Statistical Summary
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">Overview of your activity performance</p>
                </div>

                <div
                    className="px-1.5 py-1.5 flex gap-1 rounded-full"
                    style={{
                        background: 'rgba(255, 255, 255, 0.7)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(0, 0, 0, 0.05)',
                    }}
                >
                    {['All', 'Passed', 'Pending'].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-5 py-2 rounded-full text-xs font-semibold transition-all duration-300
                                ${filter === f
                                    ? 'bg-gray-900 text-white shadow-sm'
                                    : 'text-gray-500 hover:text-gray-900 hover:bg-white/50'
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {/* Statistics Cards */}
            <div className="mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard
                        label="Total Activities"
                        value={stats.totalActivities}
                        subLabel="This Week"
                        subValue={stats.thisWeek}
                        icon={ActivityIcon}
                        color="blue"
                    />
                    <StatCard
                        label="Completed"
                        value={stats.completedActivities}
                        subLabel="Completion Rate"
                        subValue={`${Math.round((stats.completedActivities / stats.totalActivities) * 100)}%`}
                        trend={12}
                        icon={CheckCircle}
                        color="green"
                    />
                    <StatCard
                        label="Pending Review"
                        value={stats.pendingActivities}
                        subLabel="Awaiting"
                        subValue="Evaluation"
                        icon={Clock}
                        color="orange"
                    />
                    <StatCard
                        label="Average Score"
                        value={stats.averageScore}
                        subLabel="Out of"
                        subValue="100"
                        trend={5}
                        icon={BarChart3}
                        color="purple"
                    />
                </div>
            </div>

            {/* Activity List */}
            <div className="flex-1 overflow-y-auto pb-24">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-gray-900">Recent Activities</h2>
                    <button className="text-sm text-gray-500 hover:text-gray-900 font-semibold">View All →</button>
                </div>

                <div className="grid gap-4">
                    {filteredScores.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => setSelectedActivity(item)}
                            className="cursor-pointer group transition-all duration-300 hover:translate-y-[-2px]"
                        >
                            <div
                                className="p-5 rounded-2xl flex items-center justify-between"
                                style={{
                                    background: 'rgba(255, 255, 255, 0.6)',
                                    backdropFilter: 'blur(20px)',
                                    border: '1px solid rgba(0, 0, 0, 0.05)',
                                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
                                }}
                            >
                                <div className="flex items-center gap-4 flex-1">
                                    <div className={`p-3 rounded-xl ${item.status === 'Passed' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-500'
                                        }`}>
                                        {item.status === 'Passed' ? <CheckCircle size={20} strokeWidth={1.5} /> : <Clock size={20} strokeWidth={1.5} />}
                                    </div>

                                    <div className="flex-1">
                                        <h3 className="font-bold text-gray-900 mb-0.5">{item.activity}</h3>
                                        <p className="text-xs text-gray-500 font-medium">{item.module} • {item.date}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6">
                                    {item.score && (
                                        <div className="text-right">
                                            <p className="text-2xl font-bold text-gray-900">{item.score}</p>
                                            <p className="text-xs text-gray-400 font-semibold">Score</p>
                                        </div>
                                    )}

                                    <div className={`px-3 py-1.5 rounded-lg text-xs font-bold ${item.status === 'Passed'
                                            ? 'bg-green-50 text-green-600'
                                            : 'bg-orange-50 text-orange-500'
                                        }`}>
                                        {item.status}
                                    </div>

                                    <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-gray-900 group-hover:text-white transition-colors">
                                        <ChevronRight size={18} strokeWidth={2} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Evaluation Modal */}
            {selectedActivity && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/30 backdrop-blur-sm" onClick={() => setSelectedActivity(null)}>
                    <div className="w-full max-w-2xl" onClick={e => e.stopPropagation()}>
                        <div
                            className="flex flex-col max-h-[85vh] rounded-3xl overflow-hidden"
                            style={{
                                background: 'rgba(255, 255, 255, 0.95)',
                                backdropFilter: 'blur(40px)',
                                border: '1px solid rgba(0, 0, 0, 0.05)',
                                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)'
                            }}
                        >
                            {/* Header */}
                            <div className="p-8 border-b border-gray-100 flex justify-between items-start">
                                <div>
                                    <h2 className="text-2xl font-bold pr-8 text-gray-900">{selectedActivity.activity}</h2>
                                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mt-2">{selectedActivity.module}</p>
                                </div>
                                <button
                                    onClick={() => setSelectedActivity(null)}
                                    className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-400 hover:text-gray-900"
                                >
                                    <X size={22} strokeWidth={1.5} />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-8 overflow-y-auto">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                    <div className="p-8 bg-gray-50 rounded-2xl flex flex-col items-center justify-center text-center">
                                        <span className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-3">Score</span>
                                        <span className="text-6xl font-bold text-gray-900">
                                            {selectedActivity.score || '--'}
                                        </span>
                                        <span className="text-sm font-semibold text-gray-400 mt-2">/ {selectedActivity.max_score}</span>
                                    </div>
                                    <div className="space-y-5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-gray-900 flex items-center justify-center text-white font-bold">
                                                {selectedActivity.instructor[0]}
                                            </div>
                                            <div>
                                                <p className="font-bold text-sm text-gray-900">{selectedActivity.instructor}</p>
                                                <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold">Evaluator</p>
                                            </div>
                                        </div>
                                        <div className="p-5 rounded-xl bg-gray-50">
                                            <p className="text-sm text-gray-700 leading-relaxed italic">
                                                "{selectedActivity.remarks}"
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {selectedActivity.improvements.length > 0 && (
                                    <div>
                                        <h3 className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-4 flex items-center gap-2">
                                            <Target size={16} className="text-red-500" strokeWidth={2} />
                                            Areas for Improvement
                                        </h3>
                                        <div className="grid gap-3">
                                            {selectedActivity.improvements.map((imp, idx) => (
                                                <div key={idx} className="flex items-center gap-3 p-4 rounded-xl bg-gray-50">
                                                    <div className="w-2 h-2 rounded-full bg-red-400" />
                                                    <span className="text-sm font-medium text-gray-700">{imp}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="p-6 border-t border-gray-100 flex gap-3">
                                <button className="flex-1 py-3.5 bg-gray-900 text-white rounded-xl font-bold text-xs uppercase tracking-wide hover:bg-gray-800 transition-all duration-300 flex justify-center items-center gap-2">
                                    <Download size={16} strokeWidth={2} /> Download Report
                                </button>
                                <button className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center hover:bg-gray-100 transition-all text-gray-600">
                                    <FileText size={20} strokeWidth={1.5} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ActivityModule;
