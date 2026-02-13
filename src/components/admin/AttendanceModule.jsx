import React, { useState } from 'react';
import {
    Calendar as CalendarIcon,
    ChevronLeft,
    ChevronRight,
    Check,
    X,
    Clock,
    Download,
    Filter,
    Search,
    UserCheck,
    UserX,
    Users
} from 'lucide-react';

// Mock intern data
const mockInterns = [
    { id: 1, name: "Sarah Johnson", avatar: "SJ", status: "present" },
    { id: 2, name: "Michael Chen", avatar: "MC", status: "present" },
    { id: 3, name: "Emma Davis", avatar: "ED", status: "late" },
    { id: 4, name: "John Smith", avatar: "JS", status: "absent" },
    { id: 5, name: "Lisa Brown", avatar: "LB", status: "present" },
    { id: 6, name: "David Wilson", avatar: "DW", status: "present" },
    { id: 7, name: "Anna Martinez", avatar: "AM", status: "present" },
    { id: 8, name: "James Taylor", avatar: "JT", status: "late" },
];

// Mock attendance history
const mockAttendanceHistory = {
    "2026-02-10": { present: 22, absent: 2, late: 0 },
    "2026-02-11": { present: 21, absent: 1, late: 2 },
    "2026-02-12": { present: 20, absent: 3, late: 1 },
};

const AttendanceModule = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [interns, setInterns] = useState(mockInterns);
    const [searchQuery, setSearchQuery] = useState('');

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

    const updateAttendance = (internId, status) => {
        setInterns(interns.map(intern =>
            intern.id === internId ? { ...intern, status } : intern
        ));
    };

    const markAllPresent = () => {
        setInterns(interns.map(intern => ({ ...intern, status: 'present' })));
    };

    const filteredInterns = interns.filter(intern =>
        intern.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const attendanceStats = {
        present: interns.filter(i => i.status === 'present').length,
        absent: interns.filter(i => i.status === 'absent').length,
        late: interns.filter(i => i.status === 'late').length,
    };

    const getAttendanceForDate = (day) => {
        const dateStr = `2026-02-${String(day).padStart(2, '0')}`;
        return mockAttendanceHistory[dateStr];
    };

    return (
        <div className="h-full overflow-y-auto pb-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Attendance Tracking</h1>
                    <p className="text-sm text-gray-500 mt-1">Mark and monitor daily attendance</p>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={markAllPresent}
                        className="px-4 py-2 bg-green-500 text-white rounded-xl text-sm font-semibold hover:bg-green-600 transition-colors flex items-center gap-2"
                    >
                        <UserCheck size={16} />
                        Mark All Present
                    </button>
                    <button
                        className="px-4 py-2 bg-gray-900 text-white rounded-xl text-sm font-semibold hover:bg-gray-800 transition-colors flex items-center gap-2"
                    >
                        <Download size={16} />
                        Export Report
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div
                    className="p-6 rounded-2xl"
                    style={{
                        background: 'rgba(255, 255, 255, 0.6)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(0, 0, 0, 0.05)',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
                    }}
                >
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-green-50 rounded-xl">
                            <UserCheck size={24} className="text-green-500" strokeWidth={1.5} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 font-semibold uppercase">Present</p>
                            <p className="text-2xl font-bold text-gray-900">{attendanceStats.present}</p>
                        </div>
                    </div>
                </div>

                <div
                    className="p-6 rounded-2xl"
                    style={{
                        background: 'rgba(255, 255, 255, 0.6)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(0, 0, 0, 0.05)',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
                    }}
                >
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-red-50 rounded-xl">
                            <UserX size={24} className="text-red-500" strokeWidth={1.5} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 font-semibold uppercase">Absent</p>
                            <p className="text-2xl font-bold text-gray-900">{attendanceStats.absent}</p>
                        </div>
                    </div>
                </div>

                <div
                    className="p-6 rounded-2xl"
                    style={{
                        background: 'rgba(255, 255, 255, 0.6)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(0, 0, 0, 0.05)',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
                    }}
                >
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-orange-50 rounded-xl">
                            <Clock size={24} className="text-orange-500" strokeWidth={1.5} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 font-semibold uppercase">Late</p>
                            <p className="text-2xl font-bold text-gray-900">{attendanceStats.late}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Intern List */}
                <div className="lg:col-span-2">
                    <div
                        className="p-6 rounded-2xl"
                        style={{
                            background: 'rgba(255, 255, 255, 0.6)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(0, 0, 0, 0.05)',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
                        }}
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-bold text-gray-900">Today's Attendance</h2>
                            <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-xl w-64">
                                <Search size={16} className="text-gray-500" />
                                <input
                                    type="text"
                                    placeholder="Search interns..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="bg-transparent outline-none text-sm w-full"
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            {filteredInterns.map(intern => (
                                <div
                                    key={intern.id}
                                    className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 text-white flex items-center justify-center font-bold text-sm">
                                            {intern.avatar}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">{intern.name}</h3>
                                            <p className="text-xs text-gray-500">ID: {intern.id.toString().padStart(4, '0')}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => updateAttendance(intern.id, 'present')}
                                            className={`p-2 rounded-lg transition-all ${intern.status === 'present'
                                                    ? 'bg-green-500 text-white shadow-lg shadow-green-500/30'
                                                    : 'bg-gray-100 text-gray-400 hover:bg-green-50 hover:text-green-500'
                                                }`}
                                        >
                                            <Check size={18} strokeWidth={2.5} />
                                        </button>
                                        <button
                                            onClick={() => updateAttendance(intern.id, 'late')}
                                            className={`p-2 rounded-lg transition-all ${intern.status === 'late'
                                                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                                                    : 'bg-gray-100 text-gray-400 hover:bg-orange-50 hover:text-orange-500'
                                                }`}
                                        >
                                            <Clock size={18} strokeWidth={2.5} />
                                        </button>
                                        <button
                                            onClick={() => updateAttendance(intern.id, 'absent')}
                                            className={`p-2 rounded-lg transition-all ${intern.status === 'absent'
                                                    ? 'bg-red-500 text-white shadow-lg shadow-red-500/30'
                                                    : 'bg-gray-100 text-gray-400 hover:bg-red-50 hover:text-red-500'
                                                }`}
                                        >
                                            <X size={18} strokeWidth={2.5} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column - Calendar */}
                <div>
                    <div
                        className="p-6 rounded-2xl"
                        style={{
                            background: 'rgba(255, 255, 255, 0.6)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(0, 0, 0, 0.05)',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
                        }}
                    >
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Calendar</h2>

                        {/* Calendar Header */}
                        <div className="flex items-center justify-between mb-4">
                            <button onClick={previousMonth} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                <ChevronLeft size={20} className="text-gray-600" />
                            </button>
                            <span className="font-semibold text-gray-900">{monthName}</span>
                            <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                <ChevronRight size={20} className="text-gray-600" />
                            </button>
                        </div>

                        {/* Calendar Grid */}
                        <div className="grid grid-cols-7 gap-2 text-center">
                            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                                <div key={i} className="text-xs font-semibold text-gray-500 pb-2">
                                    {day}
                                </div>
                            ))}

                            {/* Empty cells */}
                            {Array.from({ length: firstDay }).map((_, i) => (
                                <div key={`empty-${i}`} />
                            ))}

                            {/* Days */}
                            {Array.from({ length: daysInMonth }).map((_, i) => {
                                const day = i + 1;
                                const isToday = day === 12; // Mock today
                                const attendance = getAttendanceForDate(day);

                                return (
                                    <div
                                        key={day}
                                        className={`
                                            aspect-square flex flex-col items-center justify-center rounded-lg text-sm cursor-pointer transition-all
                                            ${isToday
                                                ? 'bg-blue-500 text-white font-bold shadow-lg shadow-blue-500/30'
                                                : attendance
                                                    ? 'bg-green-50 text-gray-700 hover:bg-green-100'
                                                    : 'text-gray-400 hover:bg-gray-100'
                                            }
                                        `}
                                    >
                                        <span className="text-xs">{day}</span>
                                        {attendance && !isToday && (
                                            <div className="flex gap-0.5 mt-1">
                                                <div className="w-1 h-1 rounded-full bg-green-500" />
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Legend */}
                        <div className="mt-6 pt-4 border-t border-gray-200 space-y-2">
                            <div className="flex items-center gap-2 text-xs">
                                <div className="w-3 h-3 rounded bg-blue-500" />
                                <span className="text-gray-600">Today</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                                <div className="w-3 h-3 rounded bg-green-50 border border-green-200" />
                                <span className="text-gray-600">Has attendance</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AttendanceModule;
