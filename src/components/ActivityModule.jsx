import React, { useState, useMemo } from 'react';
import {
    Search,
    SlidersHorizontal,
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
    BarChart3,
    Layers,
    Code,
    Database,
    Palette,
    Server,
} from 'lucide-react';

/* ─── Mock Data ──────────────────────────────────────── */
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
    },
    {
        id: 6,
        activity: "REST API Design",
        module: "Backend Integration",
        date: "2026-02-11",
        score: 90,
        max_score: 100,
        status: "Passed",
        instructor: "Engr. John Doe",
        remarks: "Clean endpoint design.",
        improvements: []
    },
];

/* Module icon & color mapping */
const moduleConfig = {
    "Frontend Development": { icon: Code, color: '#3b82f6', bg: 'bg-blue-50', text: 'text-blue-600' },
    "Backend Integration": { icon: Server, color: '#8b5cf6', bg: 'bg-purple-50', text: 'text-purple-600' },
    "Design Systems": { icon: Palette, color: '#f59e0b', bg: 'bg-amber-50', text: 'text-amber-600' },
    "Database Management": { icon: Database, color: '#10b981', bg: 'bg-emerald-50', text: 'text-emerald-600' },
    "System Design": { icon: Layers, color: '#ef4444', bg: 'bg-red-50', text: 'text-red-600' },
};

const defaultConfig = { icon: FileText, color: '#6b7280', bg: 'bg-gray-50', text: 'text-gray-600' };

/* ─── Activity Module ────────────────────────────────── */
const ActivityModule = () => {
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [selectedModule, setSelectedModule] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('All');
    const [showFilter, setShowFilter] = useState(false);

    /* Group activities by module */
    const moduleGroups = useMemo(() => {
        const groups = {};
        mockScores.forEach(item => {
            if (!groups[item.module]) {
                groups[item.module] = [];
            }
            groups[item.module].push(item);
        });
        return groups;
    }, []);

    /* Filter module cards by search */
    const filteredModules = useMemo(() => {
        const modules = Object.entries(moduleGroups).map(([name, activities]) => {
            const scores = activities.filter(a => a.score !== null).map(a => a.score);
            const avgScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null;
            const totalSize = activities.length * 42.3; // mock MB
            return { name, activities, avgScore, totalSize: totalSize.toFixed(1) };
        });

        if (!searchQuery.trim()) return modules;
        return modules.filter(m =>
            m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            m.activities.some(a => a.activity.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    }, [moduleGroups, searchQuery]);

    /* Activities filtered for modal list */
    const filteredActivities = useMemo(() => {
        if (!selectedModule) return [];
        let list = moduleGroups[selectedModule] || [];
        if (filter !== 'All') {
            list = list.filter(s => filter === 'Pending' ? s.status === 'Pending' : s.status === 'Passed');
        }
        return list;
    }, [selectedModule, filter, moduleGroups]);

    return (
        <div className="w-full relative pb-20">

            {/* ─── Header: Search + Filter ─────────────── */}
            <div className="flex items-center gap-3 mb-8 shrink-0 sticky top-0 z-30 py-4 -mx-6 px-6 backdrop-blur-xl transition-all bg-gradient-to-b from-white/10 to-transparent">
                {/* Search Bar */}
                <div
                    className="flex-1 flex items-center gap-3 px-5 py-3.5 rounded-2xl liquid-glass-card cursor-text"
                    style={{ borderRadius: '16px' }}
                >
                    <Search size={18} className="text-gray-400 shrink-0" strokeWidth={1.5} />
                    <input
                        type="text"
                        placeholder="Search modules or activities..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-400 w-full font-medium"
                    />
                </div>

                {/* Filter Button */}
                <button
                    onClick={() => setShowFilter(!showFilter)}
                    className="liquid-glass-card flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors shrink-0"
                    style={{ borderRadius: '16px' }}
                >
                    <SlidersHorizontal size={16} strokeWidth={1.5} />
                    <span className="hidden sm:inline">Filter</span>
                </button>
            </div>

            {/* Filter Pills (collapsible) */}
            {showFilter && (
                <div className="flex gap-2 mb-6 animate-fade-in">
                    {['All', 'Passed', 'Pending'].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300
                                ${filter === f
                                    ? 'bg-gray-900 text-white shadow-md'
                                    : 'liquid-glass-card text-gray-500 hover:text-gray-900'
                                }`}
                            style={{ borderRadius: '999px' }}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            )}

            {/* ─── Card Grid ──────────────────────────── */}
            <div className="">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
                    {filteredModules.map((mod, index) => {
                        const config = moduleConfig[mod.name] || defaultConfig;
                        const Icon = config.icon;

                        return (
                            <div
                                key={mod.name}
                                onClick={() => setSelectedModule(mod.name)}
                                className="liquid-glass-card cursor-pointer group hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] transition-all duration-500"
                                style={{
                                    padding: 0,
                                    minHeight: '240px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    borderRadius: '24px' // Ensure more rounded corners like screenshot
                                }}
                            >
                                {/* Card Content */}
                                <div className="p-6 flex flex-col flex-1 relative overflow-hidden">

                                    {/* Decorative Background Glow */}
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none"
                                        style={{ background: config.color, opacity: 0.15 }} />

                                    {/* Decorative Header Block with Activity Previews */}
                                    <div
                                        className="w-full h-32 rounded-2xl mb-5 flex items-center justify-center relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500"
                                        style={{
                                            background: `linear-gradient(135deg, ${config.color}15, ${config.color}30)`,
                                            border: `1px solid ${config.color}25`,
                                            boxShadow: `inset 0 0 20px ${config.color}10`
                                        }}
                                    >
                                        {/* Background Pattern/Icon */}
                                        <Icon
                                            size={80}
                                            className="absolute -bottom-4 -right-4 opacity-5 pointer-events-none text-current"
                                            style={{ color: config.color }}
                                        />

                                        <div className="flex gap-2 relative z-10 w-full justify-center px-2">
                                            {mod.activities.length > 0 ? (
                                                mod.activities.slice(0, 3).map((a, i) => (
                                                    <div
                                                        key={i}
                                                        className="w-20 h-24 rounded-xl flex items-center justify-center text-[10px] font-bold leading-tight p-2 text-center shadow-lg backdrop-blur-sm transition-all duration-300 shrink-0"
                                                        style={{
                                                            background: i === 0
                                                                ? `linear-gradient(135deg, ${config.color}, ${config.color}dd)`
                                                                : 'rgba(255,255,255,0.9)',
                                                            color: i === 0 ? '#fff' : '#4b5563',
                                                            transform: i === 0
                                                                ? 'rotate(-3deg) scale(1.05) translateY(-2px)'
                                                                : `rotate(${i * 3}deg) scale(0.95)`,
                                                            zIndex: 3 - i,
                                                            border: '1px solid rgba(255,255,255,0.4)',
                                                            maxWidth: '80px'
                                                        }}
                                                    >
                                                        {a.activity.split(' ').slice(0, 3).join(' ')}
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="text-xs text-gray-400 font-medium italic">No activities yet</div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Title & Meta */}
                                    <div className="mb-2">
                                        <div className="flex items-center justify-between mb-1">
                                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-gray-700 transition-colors">
                                                {mod.name}
                                            </h3>
                                            <div className={`p-2 rounded-xl bg-white/50 backdrop-blur-md shadow-sm border border-white/40 ${config.text}`}>
                                                <Icon size={18} strokeWidth={2} />
                                            </div>
                                        </div>
                                        <p className={`text-xs font-semibold ${config.text} px-2.5 py-1 rounded-lg bg-white/40 inline-flex items-center gap-1.5`}>
                                            <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
                                            {mod.activities.length} {mod.activities.length === 1 ? 'activity' : 'activities'}
                                        </p>
                                    </div>

                                    {/* Bottom: Stats */}
                                    <div className="mt-auto pt-4 border-t border-gray-100/50 flex items-center justify-between">
                                        {mod.avgScore !== null ? (
                                            <div className="flex flex-col">
                                                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Avg. Score</span>
                                                <span className="text-lg font-black text-gray-900 flex items-baseline gap-1">
                                                    {mod.avgScore}
                                                    <span className="text-[10px] text-gray-400 font-bold">%</span>
                                                </span>
                                            </div>
                                        ) : (
                                            <span className="text-xs text-orange-500 font-bold bg-orange-50 px-2 py-1 rounded-lg border border-orange-100">
                                                Pending Review
                                            </span>
                                        )}
                                        <div className="text-right">
                                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5 block">Size</span>
                                            <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded-lg">
                                                {mod.totalSize} MB
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* ─── Module Drawer (activity list) ──────── */}
            {selectedModule && !selectedActivity && (
                <div
                    className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/20 backdrop-blur-sm"
                    onClick={() => { setSelectedModule(null); setFilter('All'); }}
                >
                    <div
                        className="w-full sm:max-w-lg max-h-[80vh] flex flex-col overflow-hidden liquid-glass animate-fade-in"
                        style={{
                            background: 'rgba(255, 255, 255, 0.88)',
                            borderRadius: '28px 28px 0 0',
                            ...(window.innerWidth >= 640 ? { borderRadius: '28px' } : {}),
                        }}
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Drawer Header */}
                        <div className="p-6 border-b border-white/30 flex items-center justify-between shrink-0">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">{selectedModule}</h2>
                                <p className="text-xs text-gray-500 font-medium mt-1">
                                    {(moduleGroups[selectedModule] || []).length} activities
                                </p>
                            </div>
                            <button
                                onClick={() => { setSelectedModule(null); setFilter('All'); }}
                                className="p-2 hover:bg-black/5 rounded-xl transition-colors text-gray-400 hover:text-gray-900"
                            >
                                <X size={20} strokeWidth={1.5} />
                            </button>
                        </div>

                        {/* Filter pills inside drawer */}
                        <div className="px-6 py-3 flex gap-2 border-b border-white/20 shrink-0">
                            {['All', 'Passed', 'Pending'].map(f => (
                                <button
                                    key={f}
                                    onClick={() => setFilter(f)}
                                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300
                                        ${filter === f
                                            ? 'bg-gray-900 text-white shadow-sm'
                                            : 'text-gray-500 hover:text-gray-900 bg-white/40'
                                        }`}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>

                        {/* Activity List */}
                        <div className="p-4 overflow-y-auto flex-1">
                            <div className="grid gap-3">
                                {filteredActivities.map(item => (
                                    <div
                                        key={item.id}
                                        onClick={() => setSelectedActivity(item)}
                                        className="liquid-glass-card cursor-pointer group p-4 flex items-center justify-between"
                                        style={{ borderRadius: '16px' }}
                                    >
                                        <div className="flex items-center gap-3 flex-1 min-w-0">
                                            <div className={`p-2.5 rounded-xl shrink-0 ${item.status === 'Passed' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-500'}`}>
                                                {item.status === 'Passed' ? <CheckCircle size={18} strokeWidth={1.5} /> : <Clock size={18} strokeWidth={1.5} />}
                                            </div>
                                            <div className="min-w-0">
                                                <h4 className="font-bold text-sm text-gray-900 truncate">{item.activity}</h4>
                                                <p className="text-[11px] text-gray-400 font-medium mt-0.5">{item.date}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 shrink-0 ml-3">
                                            {item.score !== null && (
                                                <div className="text-right">
                                                    <p className="text-lg font-black text-gray-900">{item.score}</p>
                                                    <p className="text-[10px] text-gray-400 font-semibold">pts</p>
                                                </div>
                                            )}
                                            <div className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${item.status === 'Passed' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-500'}`}>
                                                {item.status}
                                            </div>
                                            <div className="p-1.5 rounded-lg bg-gray-50 group-hover:bg-gray-900 group-hover:text-white transition-colors text-gray-400">
                                                <ChevronRight size={14} strokeWidth={2} />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {filteredActivities.length === 0 && (
                                    <div className="text-center py-12 text-gray-400 text-sm font-medium">
                                        No activities match this filter.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ─── Evaluation Detail Modal ────────────── */}
            {selectedActivity && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-black/30 backdrop-blur-sm" onClick={() => setSelectedActivity(null)}>
                    <div className="w-full max-w-2xl animate-fade-in" onClick={e => e.stopPropagation()}>
                        <div
                            className="flex flex-col max-h-[85vh] overflow-hidden liquid-glass"
                            style={{
                                background: 'rgba(255, 255, 255, 0.92)',
                                borderRadius: '28px',
                            }}
                        >
                            {/* Header */}
                            <div className="p-8 border-b border-white/30 flex justify-between items-start">
                                <div>
                                    <h2 className="text-2xl font-bold pr-8 text-gray-900">{selectedActivity.activity}</h2>
                                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mt-2">{selectedActivity.module}</p>
                                </div>
                                <button
                                    onClick={() => setSelectedActivity(null)}
                                    className="p-2 hover:bg-black/5 rounded-xl transition-colors text-gray-400 hover:text-gray-900"
                                >
                                    <X size={22} strokeWidth={1.5} />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-8 overflow-y-auto">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                    <div
                                        className="p-8 rounded-2xl flex flex-col items-center justify-center text-center liquid-glass-card"
                                        style={{ borderRadius: '20px' }}
                                    >
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
                                        <div
                                            className="p-5 rounded-xl liquid-glass-card"
                                            style={{ borderRadius: '16px' }}
                                        >
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
                                                <div
                                                    key={idx}
                                                    className="flex items-center gap-3 p-4 rounded-xl liquid-glass-card"
                                                    style={{ borderRadius: '14px' }}
                                                >
                                                    <div className="w-2 h-2 rounded-full bg-red-400 shrink-0" />
                                                    <span className="text-sm font-medium text-gray-700">{imp}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="p-6 border-t border-white/30 flex gap-3">
                                <button className="flex-1 py-3.5 bg-gray-900 text-white rounded-xl font-bold text-xs uppercase tracking-wide hover:bg-gray-800 transition-all duration-300 flex justify-center items-center gap-2">
                                    <Download size={16} strokeWidth={2} /> Download Report
                                </button>
                                <button className="w-14 h-14 liquid-glass-card flex items-center justify-center hover:bg-white/60 transition-all text-gray-600" style={{ borderRadius: '14px' }}>
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
