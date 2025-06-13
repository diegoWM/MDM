import React from 'react';
import { Bell } from 'lucide-react';

interface NotificationBadgeProps {
  count: number;
  isDarkMode: boolean;
}

const NotificationBadge: React.FC<NotificationBadgeProps> = ({ count, isDarkMode }) => {
  return (
    <button className={`relative p-2 ${isDarkMode ? 'text-purple-300 hover:text-white hover:bg-purple-600/30' : 'text-purple-600 hover:text-purple-700 hover:bg-purple-100/50'} transition-all duration-200 rounded-lg border ${isDarkMode ? 'border-purple-500/30' : 'border-purple-300/40'} backdrop-blur-sm`}>
      <Bell className="h-5 w-5" />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-rose-500 text-white text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center shadow-sm">
          {count > 99 ? '99+' : count}
        </span>
      )}
    </button>
  );
};

export default NotificationBadge;