import React from 'react';
import {
    ArrowUpRight,
    AlertTriangle,
    Zap,
    Leaf,
    TrendingUp,
    Clock,
    BarChart3,
    Activity,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';

/* ─── Calendar Widget ───────────────────────────────────────── */
const CalendarWidget = () => {
    const [currentDate, setCurrentDate] = React.useState(new Date());

    const daysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

    const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

    const today = new Date();
    const isToday = (day) => {
        return day === today.getDate() &&
            currentDate.getMonth() === today.getMonth() &&
            currentDate.getFullYear() === today.getFullYear();
    };

    const days = [];
    const emptyDays = firstDayOfMonth(currentDate);
    const totalDays = daysInMonth(currentDate);

    for (let i = 0; i < emptyDays; i++) days.push(null);
    for (let i = 1; i <= totalDays; i++) days.push(i);

    return (
        <div className="flex flex-col h-full w-full px-4 py-2">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <span className="block text-sm font-bold text-gray-400 uppercase tracking-wider">Schedule</span>
                    <span className="text-3xl font-black text-gray-900 tracking-tight leading-tight">
                        {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </span>
                </div>
                <div className="flex gap-2">
                    <button onClick={prevMonth} className="p-2 rounded-full hover:bg-black/5 transition-colors text-gray-600 border border-transparent hover:border-black/5">
                        <ChevronLeft size={20} />
                    </button>
                    <button onClick={nextMonth} className="p-2 rounded-full hover:bg-black/5 transition-colors text-gray-600 border border-transparent hover:border-black/5">
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-7 mb-4">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                    <div key={d} className="text-center text-xs font-black text-gray-400 uppercase tracking-wider">
                        {d}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-2 flex-1 auto-rows-fr">
                {days.map((day, i) => (
                    <div
                        key={i}
                        className={`
                            relative flex items-center justify-center rounded-xl text-lg font-bold transition-all duration-300 w-full h-full
                            ${!day ? '' : 'hover:bg-white/60 hover:shadow-sm cursor-pointer border border-transparent hover:border-white/50'} 
                            ${day && isToday(day) ? '!bg-[#c8ff00] !text-gray-900 shadow-sm scale-105' : 'text-gray-600'}
                            ${!day ? 'invisible' : ''}
                        `}
                    >
                        {day}
                        {/* Example Event Dot */}
                        {day === 15 && currentDate.getMonth() === 1 && (
                            <div className="absolute bottom-2 w-1.5 h-1.5 rounded-full bg-orange-500 shadow-sm" />
                        )}
                        {day === 24 && currentDate.getMonth() === 1 && (
                            <div className="absolute bottom-2 w-1.5 h-1.5 rounded-full bg-blue-500 shadow-sm" />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

/* ─── Glass Card ────────────────────────────────────────────── */
const GlassCard = ({ children, className = '' }) => (
    <div className={`liquid-glass p-6 ${className}`}>
        {children}
    </div>
);

/* ─── Donut Chart ───────────────────────────────────────────── */
const DonutChart = ({ percentage, size = 110, strokeWidth = 10, color = '#e8a030' }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;
    const center = size / 2;

    return (
        <div className="relative" style={{ width: size, height: size }}>
            <svg width={size} height={size} className="transform -rotate-90">
                <circle cx={center} cy={center} r={radius} stroke="rgba(0,0,0,0.06)" strokeWidth={strokeWidth} fill="none" />
                <circle
                    cx={center} cy={center} r={radius}
                    stroke={color} strokeWidth={strokeWidth} fill="none"
                    strokeDasharray={circumference} strokeDashoffset={offset}
                    strokeLinecap="round"
                    style={{ transition: 'stroke-dashoffset 1.2s ease-out' }}
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-black text-gray-900">{percentage}%</span>
            </div>
        </div>
    );
};

/* ─── Gauge Arc ─────────────────────────────────────────────── */
const GaugeArc = ({ value, max = 100, size = 140, color = '#e8a030' }) => {
    const pct = value / max;
    const radius = (size - 12) / 2;
    const startAngle = -220;
    const endAngle = 40;
    const totalAngle = endAngle - startAngle;
    const valueAngle = startAngle + totalAngle * pct;

    const polarToCart = (cx, cy, r, angle) => {
        const rad = (angle * Math.PI) / 180;
        return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
    };

    const center = size / 2;
    const bgStart = polarToCart(center, center, radius, startAngle);
    const bgEnd = polarToCart(center, center, radius, endAngle);
    const valEnd = polarToCart(center, center, radius, valueAngle);

    const bgArc = `M ${bgStart.x} ${bgStart.y} A ${radius} ${radius} 0 1 1 ${bgEnd.x} ${bgEnd.y}`;
    const valArc = `M ${bgStart.x} ${bgStart.y} A ${radius} ${radius} 0 ${pct > 0.5 ? 1 : 0} 1 ${valEnd.x} ${valEnd.y}`;

    return (
        <div className="relative flex justify-center" style={{ width: '100%', height: size * 0.65 }}>
            <svg width={size} height={size} style={{ marginTop: -size * 0.18 }}>
                <path d={bgArc} fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="10" strokeLinecap="round" />
                <path d={valArc} fill="none" stroke={color} strokeWidth="10" strokeLinecap="round" />
            </svg>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
                <span className="text-2xl font-black text-gray-900">{value}</span>
                <span className="text-sm text-gray-500 font-bold">/{max}</span>
            </div>
        </div>
    );
};

/* ─── Mini Bar Graph ────────────────────────────────────────── */
const MiniBarGraph = ({ data, highlight = -1, height = 64 }) => {
    const max = Math.max(...data);
    return (
        <div className="flex items-end gap-1 w-full" style={{ height }}>
            {data.map((val, i) => (
                <div
                    key={i}
                    className="flex-1 rounded-t-lg transition-all duration-500"
                    style={{
                        height: `${(val / max) * 100}%`,
                        minHeight: '4px',
                        background: i === highlight ? '#e8a030' : 'rgba(0,0,0,0.08)',
                    }}
                />
            ))}
        </div>
    );
};

/* ─── Main Dashboard Module ─────────────────────────────────── */
const DashboardModule = ({ user }) => {
    const weeklyData = [65, 72, 80, 88, 75, 82, 90, 68, 85, 92, 78, 70];

    return (
        <div className="w-full flex flex-col gap-8 py-6 pb-20">

            {/* ─── TOP SECTION ─────────────────────────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* ── LEFT COLUMN ──────────────────────── */}
                <div className="lg:col-span-4 flex flex-col gap-6">

                    {/* Page Title */}
                    <div className="pl-1">
                        <h1 className="text-4xl lg:text-5xl font-black text-gray-900 leading-none tracking-tighter drop-shadow-sm">
                            Training Hub
                        </h1>
                        <p className="text-sm text-gray-600 mt-2 leading-relaxed font-semibold max-w-[280px]">
                            Welcome back, <span className="text-gray-900 font-black">{user?.username || 'Intern'}</span>.
                        </p>
                    </div>

                    {/* Card: Hours Logged */}
                    <GlassCard className="flex-1 flex flex-col justify-center min-h-[160px]">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xs text-gray-600 font-bold uppercase tracking-wide">Hours Logged</span>
                            <ArrowUpRight size={18} className="text-gray-400" />
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center shadow-sm">
                                <Clock size={24} className="text-orange-500" />
                            </div>
                            <div>
                                <span className="text-4xl font-black text-gray-900 leading-none">127.5</span>
                                <span className="text-sm text-gray-500 font-bold ml-1">hrs</span>
                            </div>
                        </div>
                        <p className="text-[10px] text-gray-500 mt-3 font-bold uppercase tracking-wider">February 2026</p>
                    </GlassCard>

                    {/* Card: Tasks Done */}
                    <GlassCard className="flex-1 flex flex-col justify-center min-h-[160px]">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xs text-gray-600 font-bold uppercase tracking-wide">Tasks Done</span>
                            <ArrowUpRight size={18} className="text-gray-400" />
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center shadow-sm">
                                <Leaf size={24} className="text-green-500" />
                            </div>
                            <div>
                                <span className="text-4xl font-black text-gray-900 leading-none">42</span>
                                <span className="text-sm text-gray-500 font-bold ml-1">tasks</span>
                            </div>
                        </div>
                        <p className="text-[10px] text-gray-500 mt-3 font-bold uppercase tracking-wider">3 Modules Completed</p>
                    </GlassCard>
                </div>

                {/* ── RIGHT COLUMN ─────────────────────── */}
                <div className="lg:col-span-8 h-full">
                    <GlassCard className="h-full flex flex-col justify-center">
                        <CalendarWidget />
                    </GlassCard>
                </div>
            </div>

            {/* ─── BOTTOM ROW: 4 Cards ────────────────────── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                {/* Card 1: Track Progress */}
                <GlassCard className="flex flex-col justify-between min-h-[260px]">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-bold text-gray-700">Track Progress</span>
                        <ArrowUpRight size={18} className="text-gray-400" />
                    </div>
                    <div className="flex justify-center py-4">
                        <GaugeArc value={68} size={150} color="#3b82f6" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-auto pt-5 border-t border-black/5">
                        <div>
                            <p className="text-[10px] text-gray-400 font-bold uppercase">Completion</p>
                            <p className="text-lg font-black text-gray-900">68%</p>
                        </div>
                        <div>
                            <p className="text-[10px] text-gray-400 font-bold uppercase">Target</p>
                            <p className="text-lg font-black text-gray-900">12:45 <span className="text-xs text-gray-400 font-bold">PM</span></p>
                        </div>
                    </div>
                </GlassCard>

                {/* Card 2: Module Balance */}
                <GlassCard className="flex flex-col justify-between min-h-[260px]">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-bold text-gray-700">Module Balance</span>
                        <ArrowUpRight size={18} className="text-gray-400" />
                    </div>

                    <div className="flex justify-center py-4 relative">
                        <GaugeArc value={75} max={100} size={150} color="#10b981" />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-auto pt-5 border-t border-black/5">
                        <div>
                            <p className="text-[10px] text-gray-400 font-bold uppercase">Done</p>
                            <p className="text-lg font-black text-gray-900">6.3</p>
                        </div>
                        <div>
                            <p className="text-[10px] text-gray-400 font-bold uppercase">Left</p>
                            <p className="text-lg font-black text-gray-900">4.5</p>
                        </div>
                    </div>
                </GlassCard>

                {/* Card 3: Scores */}
                <GlassCard className="!bg-white/95 flex flex-col justify-between min-h-[260px]">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-bold text-gray-700">Scores</span>
                        <ArrowUpRight size={18} className="text-gray-400" />
                    </div>
                    <div className="space-y-4 mb-4 flex-1">
                        {[
                            { label: 'Quality', value: '85', unit: 'pts' },
                            { label: 'Collab', value: '92', unit: 'pts' },
                            { label: 'Init.', value: '+4.5', unit: 'pts' },
                        ].map((row, i) => (
                            <div key={i} className="flex justify-between items-baseline border-b border-gray-100 last:border-0 pb-2 last:pb-0">
                                <span className="text-xs text-gray-500 font-bold uppercase">{row.label}</span>
                                <span className="text-lg font-black text-gray-900">{row.value}</span>
                            </div>
                        ))}
                    </div>
                    {/* Mini chart */}
                    <div className="rounded-xl p-3 bg-gray-50 mt-auto">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                            <span className="text-[9px] text-gray-400 font-bold uppercase">Weekly Trend</span>
                        </div>
                        <MiniBarGraph data={[70, 75, 65, 80, 85, 78, 90, 82, 88]} height={50} highlight={8} />
                    </div>
                </GlassCard>

                {/* Card 4: Performance (formerly Schedule) */}
                <GlassCard className="flex flex-col justify-between min-h-[260px]">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-bold text-gray-700">Performance</span>
                        <ArrowUpRight size={18} className="text-gray-400" />
                    </div>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="scale-90 origin-left">
                            <DonutChart percentage={85} size={90} strokeWidth={8} />
                        </div>
                        <div className="flex-1">
                            <p className="text-[10px] text-gray-500 font-bold uppercase">Avg. Score</p>
                            <p className="text-2xl font-black text-gray-900">85</p>
                        </div>
                    </div>
                    <div className="mt-auto">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                            <span className="text-[9px] text-gray-400 font-bold uppercase">Activity</span>
                        </div>
                        <MiniBarGraph data={weeklyData} highlight={9} height={60} />
                    </div>
                </GlassCard>
            </div>
        </div>
    );
};

export default DashboardModule;
