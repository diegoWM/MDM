import React from 'react';
import { Bell } from 'lucide-react';

interface NotificationBadgeProps {
  count: number;
  isDarkMode: boolean;
}

const NotificationBadge: React.FC<NotificationBadgeProps> = ({ count, isDarkMode }) => {
  return (
    <button className={`relative p-3 ${isDarkMode ? 'text-purple-300 hover:text-white hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-600' : 'text-purple-200 hover:text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-indigo-500'} transition-all duration-300 rounded-2xl shadow-lg border ${isDarkMode ? 'border-purple-500/30' : 'border-purple-400/40'}`}>
      <Bell className="h-6 w-6" />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-rose-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center shadow-lg border border-red-400/30">
          {count > 99 ? '99+' : count}
        </span>
      )}
    </button>
  );
};

export default NotificationBadge;