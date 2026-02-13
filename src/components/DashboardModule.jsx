import React, { useState } from 'react';
import {
    ChevronLeft,
    ChevronRight,
    Award,
    Trophy,
    CheckCircle2,
    Bell,
    Video
} from 'lucide-react';
import CircularProgress from './CircularProgress';
import DonutChart from './DonutChart';
import TimeSpendingsChart from './TimeSpendingsChart';
import ProfileCard from './ProfileCard';

const DashboardModule = ({ user }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());

    // Mock data
    const weeklyTimeData = [0, 120, 180, 500, 240, 150, 0]; // Minutes per day

    const courseStatsData = [
        { label: 'Incomplete', value: 40, color: '#ef4444' },
        { label: 'Completed', value: 30, color: '#3b82f6' },
        { label: 'In progress', value: 20, color: '#06b6d4' }
    ];

    const upcomingClasses = [
        {
            id: 1,
            title: 'User Experience Design',
            time: '8:30',
            platform: 'Online - Zoom Meeting'
        },
        {
            id: 2,
            title: 'User Interface Design',
            time: '9:30',
            platform: 'Online - Zoom Meeting'
        }
    ];

    // Calendar logic
    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        return { firstDay, daysInMonth };
    };

    const { firstDay, daysInMonth } = getDaysInMonth(currentMonth);
    const monthName = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });

    const previousMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    };

    const nextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    };

    // Get current date
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });

    return (
        <div className="h-full overflow-y-auto scrollbar-hide pb-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Left Column - Main Content (2/3 width) */}
                <div className="lg:col-span-2 space-y-4">
                    {/* Welcome Header */}
                    <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-4 border border-white/30 shadow-lg">
                        <div className="flex items-center justify-between mb-2">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    Welcome Back, {user?.username || 'Royal'}!
                                </h1>
                                <p className="text-sm text-gray-500 mt-1">{formattedDate}</p>
                            </div>
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                <Bell size={20} className="text-gray-600" />
                            </button>
                        </div>
                    </div>

                    {/* Time Spendings Chart */}
                    <TimeSpendingsChart weeklyData={weeklyTimeData} />

                    {/* Stats Cards Row */}
                    <div className="grid grid-cols-3 gap-4">
                        {/* Hours Spent */}
                        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-5 border border-white/30 shadow-lg">
                            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-3">
                                <Award size={24} className="text-blue-500" />
                            </div>
                            <p className="text-sm text-gray-500 mb-1">Hours Spent</p>
                            <p className="text-3xl font-bold text-gray-900">42</p>
                        </div>

                        {/* Overall Result */}
                        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-5 border border-white/30 shadow-lg">
                            <div className="w-12 h-12 rounded-xl bg-yellow-50 flex items-center justify-center mb-3">
                                <Trophy size={24} className="text-yellow-500" />
                            </div>
                            <p className="text-sm text-gray-500 mb-1">Overall Result</p>
                            <p className="text-3xl font-bold text-gray-900">220</p>
                        </div>

                        {/* Completed */}
                        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-5 border border-white/30 shadow-lg">
                            <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center mb-3">
                                <CheckCircle2 size={24} className="text-purple-500" />
                            </div>
                            <p className="text-sm text-gray-500 mb-1">Completed</p>
                            <p className="text-3xl font-bold text-gray-900">20</p>
                        </div>
                    </div>

                    {/* Homework Progress */}
                    <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-4 border border-white/30 shadow-lg">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Homework Progress</h2>
                        <div className="grid grid-cols-2 gap-8">
                            <CircularProgress
                                percentage={92}
                                size={110}
                                strokeWidth={8}
                                color="#3b82f6"
                                label="User experience Design"
                                taskCount={12}
                            />
                            <CircularProgress
                                percentage={52}
                                size={110}
                                strokeWidth={8}
                                color="#8b5cf6"
                                label="User experience Design"
                                taskCount={12}
                            />
                        </div>
                    </div>

                    {/* Course Statistics */}
                    <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-4 border border-white/30 shadow-lg">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Course Statistics</h2>
                        <div className="flex justify-center">
                            <DonutChart data={courseStatsData} size={160} strokeWidth={28} />
                        </div>
                    </div>
                </div>

                {/* Right Column - Sidebar (1/3 width) */}
                <div className="space-y-4">
                    {/* Profile Card */}
                    <ProfileCard user={user} />

                    {/* Calendar */}
                    <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-white/30 shadow-lg">
                        <div className="flex items-center justify-between mb-4">
                            <button onClick={previousMonth} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                                <ChevronLeft size={20} className="text-gray-600" />
                            </button>
                            <h3 className="text-sm font-bold text-gray-900">{monthName}</h3>
                            <button onClick={nextMonth} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                                <ChevronRight size={20} className="text-gray-600" />
                            </button>
                        </div>

                        {/* Calendar Grid */}
                        <div className="grid grid-cols-7 gap-1 text-center">
                            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                                <div key={i} className="text-xs font-semibold text-gray-400 pb-2">
                                    {day}
                                </div>
                            ))}

                            {/* Empty cells for days before month starts */}
                            {Array.from({ length: firstDay }).map((_, i) => (
                                <div key={`empty-${i}`} />
                            ))}

                            {/* Days of the month */}
                            {Array.from({ length: daysInMonth }).map((_, i) => {
                                const day = i + 1;
                                const isToday = day === 12; // Mock today as 12th
                                const isSelected = [12, 12, 12, 12, 12].includes(day); // Multiple selected days
                                return (
                                    <div
                                        key={day}
                                        className={`
                                            aspect-square flex items-center justify-center rounded-lg text-sm font-medium cursor-pointer transition-all
                                            ${isToday
                                                ? 'bg-blue-500 text-white shadow-lg'
                                                : isSelected
                                                    ? 'bg-blue-100 text-blue-600'
                                                    : 'text-gray-700 hover:bg-gray-100'
                                            }
                                        `}
                                    >
                                        {day}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Upcoming Class */}
                    <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-white/30 shadow-lg">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Upcoming Class</h2>
                        <div className="space-y-3">
                            {upcomingClasses.map((classItem) => (
                                <div
                                    key={classItem.id}
                                    className="p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors cursor-pointer"
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center flex-shrink-0">
                                            <Video size={20} className="text-white" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-bold text-gray-900 mb-1">
                                                {classItem.time}
                                            </p>
                                            <h3 className="text-sm font-semibold text-gray-900 mb-1">
                                                {classItem.title}
                                            </h3>
                                            <p className="text-xs text-gray-500">{classItem.platform}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardModule;
