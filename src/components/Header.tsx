import React from 'react';
import { Search, Settings, Bell, ChevronRight, ChevronDown, User } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  currentEnvironment: 'staging' | 'production';
  onEnvironmentChange: (env: 'staging' | 'production') => void;
  sidebarCollapsed: boolean;
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  currentEnvironment,
  onEnvironmentChange,
  sidebarCollapsed,
  onToggleSidebar
}) => {
  return (
    <header className="bg-gray-800/95 shadow-xl border-b border-gray-700 backdrop-blur-sm">
      <div className="px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            {/* Sidebar Toggle */}
            <button
              onClick={onToggleSidebar}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 transition-all duration-200 rounded-lg"
              title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <ChevronRight className={`h-5 w-5 transition-transform duration-200 ${sidebarCollapsed ? '' : 'rotate-180'}`} />
            </button>
            
            <div>
              <h1 className="text-xl font-semibold text-white">
                Sources of Truth Management
              </h1>
              <p className="text-sm text-gray-400 mt-0.5">Centralized master data governance platform</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Global Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search records..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 pr-4 py-2 bg-gray-700/50 text-white placeholder-gray-400 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none w-80 transition-all duration-200 backdrop-blur-sm"
              />
            </div>

            {/* Environment Switcher */}
            <div className="relative">
              <select
                value={currentEnvironment}
                onChange={(e) => onEnvironmentChange(e.target.value as 'staging' | 'production')}
                className={`appearance-none px-4 py-2 pr-8 rounded-lg font-medium text-sm border transition-all duration-200 min-w-[120px] backdrop-blur-sm ${
                  currentEnvironment === 'production'
                    ? 'bg-red-500/20 hover:bg-red-500/30 text-red-300 border-red-500/50'
                    : 'bg-green-500/20 hover:bg-green-500/30 text-green-300 border-green-500/50'
                }`}
              >
                <option value="staging">Staging</option>
                <option value="production">Production</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-current pointer-events-none" />
            </div>

            {/* Review Button */}
            <button className="bg-orange-500/80 hover:bg-orange-500 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 font-medium backdrop-blur-sm">
              <Bell className="h-4 w-4" />
              <span>Review</span>
            </button>

            {/* User Menu */}
            <div className="flex items-center space-x-3">
              <button className="px-3 py-1.5 text-xs font-medium rounded-lg bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 hover:text-white transition-all duration-200 backdrop-blur-sm">
                Switch to User
              </button>
              
              <div className="h-5 w-px bg-gray-600"></div>
              
              <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 transition-all duration-200 rounded-lg">
                <Settings className="h-4 w-4" />
              </button>
              
              <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 transition-all duration-200 rounded-lg">
                <User className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;