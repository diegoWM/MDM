import React from 'react';
import { Search, Settings, Bell, Menu, ChevronDown, User } from 'lucide-react';

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
    <header className="bg-slate-800 shadow-lg border-b border-slate-700">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            {/* Sidebar Toggle */}
            <button
              onClick={onToggleSidebar}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors duration-200 rounded-lg"
            >
              <Menu className="h-5 w-5" />
            </button>
            
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Sources of Truth Management
              </h1>
              <p className="text-sm text-slate-400 mt-1">Centralized master data governance platform</p>
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
                className="pl-10 pr-4 py-2.5 bg-slate-700 text-white placeholder-slate-400 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none w-80 transition-all duration-200"
              />
            </div>

            {/* Environment Switcher */}
            <div className="relative">
              <select
                value={currentEnvironment}
                onChange={(e) => onEnvironmentChange(e.target.value as 'staging' | 'production')}
                className={`appearance-none px-4 py-2.5 pr-10 rounded-lg font-semibold text-sm border transition-all duration-200 min-w-[130px] ${
                  currentEnvironment === 'production'
                    ? 'bg-red-600 hover:bg-red-700 text-white border-red-500 shadow-lg'
                    : 'bg-green-600 hover:bg-green-700 text-white border-green-500 shadow-lg'
                }`}
              >
                <option value="staging">Staging</option>
                <option value="production">Production</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white pointer-events-none" />
            </div>

            {/* Review Button */}
            {totalPendingCount > 0 && (
              <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2.5 rounded-lg transition-all duration-200 flex items-center space-x-2 font-semibold shadow-lg hover:shadow-xl">
                <Bell className="h-4 w-4" />
                <span>Review</span>
                <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {totalPendingCount}
                </span>
              </button>
            )}

            {/* User Menu */}
            <div className="flex items-center space-x-3">
              <button className="px-3 py-2 text-xs font-semibold rounded-lg bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white transition-all duration-200">
                Switch to User
              </button>
              
              <div className="h-6 w-px bg-slate-600"></div>
              
              <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors duration-200 rounded-lg">
                <Settings className="h-5 w-5" />
              </button>
              
              <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors duration-200 rounded-lg">
                <User className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;