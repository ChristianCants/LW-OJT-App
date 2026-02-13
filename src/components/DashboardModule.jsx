import React, { useState } from 'react';
import {
    ChevronLeft,
    ChevronRight,
    BookOpen,
    Award,
    Clock,
    CheckCircle,
    Globe,
    Megaphone,
    Database,
    Layout,
    FileText,
    Mic
} from 'lucide-react';

// Mock data - will use existing activity data
const mockCourses = [
    {
        id: 1,
        name: "Product Management",
        instructor: "Prof. Linda Cruz",
        icon: Layout,
        color: "bg-purple-100",
        iconColor: "text-purple-500",
        lessonsLeft: 2,
        completed: 80,
        lessons: 10
    },
    {
        id: 2,
        name: "Advanced Geography",
        instructor: "Prof. Linda Cruz",
        icon: Globe,
        color: "bg-blue-100",
        iconColor: "text-blue-500",
        lessonsLeft: 3,
        completed: 65,
        lessons: 12,
        featured: true
    },
    {
        id: 3,
        name: "Mass Communication",
        instructor: "Prof. Jonathan Reyes",
        icon: Megaphone,
        color: "bg-pink-100",
        iconColor: "text-pink-500",
        lessonsLeft: 3,
        completed: 45,
        lessons: 8
    },
];

const mockAchievements = [
    { id: 1, name: "Inorganic Chemistry Certificate", color: "bg-yellow-50", borderColor: "border-yellow-200", textColor: "text-yellow-600", buttonColor: "bg-yellow-500" },
    { id: 2, name: "Social Philosophy Certificate", color: "bg-purple-50", borderColor: "border-purple-200", textColor: "text-purple-600", buttonColor: "bg-purple-500" },
];

const mockTasks = [
    { id: 1, title: "Demo Speech", course: "Mass Communication", icon: Mic, color: "bg-pink-50", iconColor: "text-pink-500", type: "TODAY" },
    { id: 2, title: "Globalization Essay", course: "Advanced Geography", icon: FileText, color: "bg-orange-50", iconColor: "text-orange-500", type: "TODAY" },
    { id: 3, title: "Management Quiz", course: "Product Management", icon: Clock, color: "bg-purple-50", iconColor: "text-purple-500", type: "THIS WEEK" },
    { id: 4, title: "Docu Reaction Paper", course: "Advanced Geography", icon: FileText, color: "bg-orange-50", iconColor: "text-orange-500", type: "THIS WEEK" },
];

const DashboardModule = ({ user }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());

    // Calendar logic
    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        return { firstDay, daysInMonth };
    };

    const { firstDay, daysInMonth } = getDaysInMonth(currentMonth);
    const monthName = currentMonth.toLocaleString('default', { month: 'long' });

    const previousMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    };

    const nextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    };

    return (
        <div className="h-full overflow-y-auto pb-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Welcome Banner */}
                    <div
                        className="p-8 rounded-3xl relative overflow-hidden"
                        style={{
                            background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
                        }}
                    >
                        <div className="relative z-10">
                            <p className="text-white/80 text-sm mb-2">April 30, Tuesday</p>
                            <h1 className="text-3xl font-bold text-white mb-2">
                                Welcome back, {user?.username || 'Diane'}!
                            </h1>
                            <p className="text-white/90 text-sm">
                                You've finished <span className="font-bold">85%</span> of your weekly goal!
                            </p>
                        </div>

                        {/* Illustration */}
                        <div className="absolute right-8 bottom-0 opacity-20">
                            <Award size={120} className="text-white" />
                        </div>
                    </div>

                    {/* My Courses */}
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-4">My Courses</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {mockCourses.map((course) => {
                                const Icon = course.icon;
                                return (
                                    <div
                                        key={course.id}
                                        className={`p-6 rounded-2xl ${course.color} ${course.featured ? 'ring-2 ring-blue-400' : ''} transition-all hover:scale-105 cursor-pointer`}
                                    >
                                        <div className={`w-16 h-16 rounded-2xl ${course.color} flex items-center justify-center mb-4`}>
                                            <Icon size={32} className={course.iconColor} strokeWidth={1.5} />
                                        </div>

                                        <h3 className="font-bold text-gray-900 mb-1">{course.name}</h3>
                                        <p className="text-xs text-gray-600 mb-4">{course.instructor}</p>

                                        {/* Progress Bar */}
                                        <div className="mb-3">
                                            <div className="flex justify-between text-xs mb-1">
                                                <span className="text-gray-600">Lessons left: {course.lessonsLeft}</span>
                                                <span className="font-bold text-gray-900">Completed: {course.completed}%</span>
                                            </div>
                                            <div className="w-full bg-white/50 rounded-full h-2">
                                                <div
                                                    className={`h-2 rounded-full ${course.iconColor.replace('text-', 'bg-')}`}
                                                    style={{ width: `${course.completed}%` }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Achievements */}
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Achievements</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {mockAchievements.map((achievement) => (
                                <div
                                    key={achievement.id}
                                    className={`p-6 rounded-2xl ${achievement.color} border-2 ${achievement.borderColor} flex items-center justify-between`}
                                >
                                    <div className="flex items-center gap-4">
                                        <Award size={40} className={achievement.textColor} strokeWidth={1.5} />
                                        <div>
                                            <h3 className={`font-bold ${achievement.textColor}`}>
                                                {achievement.name}
                                            </h3>
                                        </div>
                                    </div>
                                    <button className={`px-6 py-2 ${achievement.buttonColor} text-white rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity`}>
                                        View
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column - Schedule & Tasks */}
                <div className="space-y-6">
                    {/* My Schedule Calendar */}
                    <div
                        className="p-6 rounded-2xl"
                        style={{
                            background: 'rgba(255, 255, 255, 0.6)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(0, 0, 0, 0.05)',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
                        }}
                    >
                        <h2 className="text-lg font-bold text-gray-900 mb-4">My Schedule</h2>

                        {/* Calendar Header */}
                        <div className="flex items-center justify-between mb-4">
                            <button onClick={previousMonth} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                                <ChevronLeft size={20} className="text-gray-600" />
                            </button>
                            <span className="font-semibold text-gray-900">{monthName}</span>
                            <button onClick={nextMonth} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                                <ChevronRight size={20} className="text-gray-600" />
                            </button>
                        </div>

                        {/* Calendar Grid */}
                        <div className="grid grid-cols-7 gap-2 text-center">
                            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                                <div key={i} className="text-xs font-semibold text-gray-500 pb-2">
                                    {day}
                                </div>
                            ))}

                            {/* Empty cells for days before month starts */}
                            {Array.from({ length: firstDay === 0 ? 6 : firstDay - 1 }).map((_, i) => (
                                <div key={`empty-${i}`} />
                            ))}

                            {/* Days of the month */}
                            {Array.from({ length: daysInMonth }).map((_, i) => {
                                const day = i + 1;
                                const isToday = day === 11; // Mock today as 11th
                                return (
                                    <div
                                        key={day}
                                        className={`
                                            aspect-square flex items-center justify-center rounded-lg text-sm font-medium cursor-pointer transition-all
                                            ${isToday
                                                ? 'bg-blue-500 text-white'
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

                    {/* Upcoming Tasks */}
                    <div
                        className="p-6 rounded-2xl"
                        style={{
                            background: 'rgba(255, 255, 255, 0.6)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(0, 0, 0, 0.05)',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
                        }}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-bold text-gray-900">Upcoming Tasks</h2>
                            <button className="text-sm text-blue-500 font-semibold hover:text-blue-600">
                                See All
                            </button>
                        </div>

                        <div className="space-y-4">
                            {/* TODAY Section */}
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">TODAY</p>
                                {mockTasks.filter(t => t.type === 'TODAY').map((task) => {
                                    const Icon = task.icon;
                                    return (
                                        <div
                                            key={task.id}
                                            className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors mb-2"
                                        >
                                            <div className={`w-10 h-10 rounded-xl ${task.color} flex items-center justify-center`}>
                                                <Icon size={18} className={task.iconColor} strokeWidth={1.5} />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-gray-900 text-sm">{task.title}</h3>
                                                <p className="text-xs text-gray-500">{task.course}</p>
                                            </div>
                                            <ChevronRight size={18} className="text-gray-400" />
                                        </div>
                                    );
                                })}
                            </div>

                            {/* THIS WEEK Section */}
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">THIS WEEK</p>
                                {mockTasks.filter(t => t.type === 'THIS WEEK').map((task) => {
                                    const Icon = task.icon;
                                    return (
                                        <div
                                            key={task.id}
                                            className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors mb-2"
                                        >
                                            <div className={`w-10 h-10 rounded-xl ${task.color} flex items-center justify-center`}>
                                                <Icon size={18} className={task.iconColor} strokeWidth={1.5} />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-gray-900 text-sm">{task.title}</h3>
                                                <p className="text-xs text-gray-500">{task.course}</p>
                                            </div>
                                            <ChevronRight size={18} className="text-gray-400" />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardModule;
