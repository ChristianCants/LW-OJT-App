import React from 'react';
import { Edit } from 'lucide-react';

const ProfileCard = ({ user }) => {
    return (
        <div className="bg-white rounded-3xl p-6 border border-gray-100">
            <div className="flex items-start justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">My Profile</h2>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Edit size={16} className="text-gray-600" />
                </button>
            </div>

            {/* Profile Image */}
            <div className="flex justify-center mb-4">
                <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white text-3xl font-bold">
                        {user?.username?.charAt(0).toUpperCase() || 'R'}
                    </div>
                    {/* Online indicator */}
                    <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
                </div>
            </div>

            {/* User Info */}
            <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {user?.username || 'Royal Parvej'}
                </h3>
                <p className="text-sm text-gray-500">@{user?.username?.toLowerCase() || 'royalparvej'}</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">10</p>
                    <p className="text-xs text-gray-500">Rank</p>
                </div>
                <div className="text-center border-x border-gray-200">
                    <p className="text-2xl font-bold text-gray-900">2h</p>
                    <p className="text-xs text-gray-500">Per Hour</p>
                </div>
                <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">12</p>
                    <p className="text-xs text-gray-500">Enrolled</p>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;
