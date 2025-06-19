import React from 'react';
import { Search, Settings, Bell, Menu, ChevronDown } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  currentEnvironment: 'staging' | 'production';
  onEnvironmentChange: (env: 'staging' | 'production') => void;
  totalPendingCount: number;
  sidebarCollapsed: boolean;
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  currentEnvironment,
  onEnvironmentChange,
  totalPendingCount,
  sidebarCollapsed,
  onToggleSidebar
}) => {
  return (
    <header className="bg-slate-800 shadow-sm border-b border-slate-700">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Sidebar Toggle */}
            <button
              onClick={onToggleSidebar}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors duration-200 rounded-md"
            >
              <Menu className="h-5 w-5" />
            </button>
            
            <div>
              <h1 className="text-xl font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Sources of Truth Management
              </h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Global Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search records..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 pr-4 py-2 bg-slate-700 text-white placeholder-slate-400 border border-slate-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none w-80"
              />
            </div>

            {/* Environment Switcher */}
            <div className="relative">
              <select
                value={currentEnvironment}
                onChange={(e) => onEnvironmentChange(e.target.value as 'staging' | 'production')}
                className={`appearance-none px-3 py-2 pr-8 rounded-md font-medium text-sm border transition-colors duration-200 min-w-[120px] ${
                  currentEnvironment === 'production'
                    ? 'bg-red-600 hover:bg-red-700 text-white border-red-500'
                    : 'bg-green-600 hover:bg-green-700 text-white border-green-500'
                }`}
              >
                <option value="staging">Staging</option>
                <option value="production">Production</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white pointer-events-none" />
            </div>

            {/* Review Button */}
            {totalPendingCount > 0 && (
              <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md transition-colors duration-200 flex items-center space-x-2 font-medium">
                <Bell className="h-4 w-4" />
                <span>Review ({totalPendingCount})</span>
              </button>
            )}

            {/* Switch to User Button */}
            <button className="px-3 py-2 text-xs font-medium rounded-md bg-slate-700 text-slate-300 hover:bg-slate-600 transition-colors duration-200">
              Switch to User
            </button>

            {/* Settings */}
            <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors duration-200 rounded-md">
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;