import React, { useState } from 'react';
import { LayoutDashboard, Users, Calendar, CheckSquare, BarChart3, MessageSquare, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminFloatingDock = ({ activeTab, onTabChange }) => {
    const navigate = useNavigate();
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const navItems = [
        { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { id: 'interns', icon: Users, label: 'Interns' },
        { id: 'attendance', icon: Calendar, label: 'Attendance' },
        { id: 'tasks', icon: CheckSquare, label: 'Tasks' },
        { id: 'performance', icon: BarChart3, label: 'Performance' },
        { id: 'feedback', icon: MessageSquare, label: 'Feedback' },
    ];

    const handleLogout = async () => {
        const { signOut } = await import('../services');
        await signOut();
        navigate('/admin/signin');
    };

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
            <div
                className="px-8 py-4 flex items-center gap-6 shadow-2xl rounded-full"
                style={{
                    background: 'rgba(255, 255, 255, 0.7)',
                    backdropFilter: 'blur(40px) saturate(180%)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
                }}
            >
                {navItems.map((item, index) => {
                    const isActive = activeTab === item.id;
                    const Icon = item.icon;
                    return (
                        <button
                            key={item.id}
                            onClick={() => onTabChange(item.id)}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            className="relative flex flex-col items-center gap-2 transition-all duration-300 group"
                        >
                            <div className={`
                                p-2.5 rounded-xl transition-all duration-300
                                ${isActive
                                    ? 'text-blue-600'
                                    : 'text-gray-400 hover:text-gray-600'
                                }
                            `}>
                                <Icon
                                    size={22}
                                    strokeWidth={1.5}
                                    className="transition-transform duration-300 group-hover:scale-110"
                                />
                            </div>

                            {/* Active indicator - blue dot */}
                            {isActive && (
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 absolute -bottom-1" />
                            )}

                            {/* Tooltip */}
                            <div className={`
                                absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-gray-900 text-white text-[10px] font-medium rounded-lg opacity-0 transition-all duration-200 pointer-events-none whitespace-nowrap
                                ${hoveredIndex === index ? 'opacity-100 -translate-y-1' : 'translate-y-1'}
                            `}>
                                {item.label}
                                <div className="absolute top-full left-1/2 -translate-x-1/2 border-[3px] border-transparent border-t-gray-900" />
                            </div>
                        </button>
                    );
                })}

                <div className="w-[1px] h-8 bg-gray-200" />

                <button
                    onClick={handleLogout}
                    className="p-2.5 text-gray-400 hover:text-red-500 transition-all duration-300 group relative"
                >
                    <LogOut size={22} strokeWidth={1.5} className="group-hover:translate-x-0.5 transition-transform" />
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-red-500 text-white text-[10px] font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap -translate-y-1">
                        Sign Out
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-[3px] border-transparent border-t-red-500" />
                    </div>
                </button>
            </div>
        </div>
    );
};

export default AdminFloatingDock;
