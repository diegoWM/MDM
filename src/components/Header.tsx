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
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            {/* Sidebar Toggle */}
            <button
              onClick={onToggleSidebar}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all duration-200 rounded-md"
            >
              <Menu className="h-5 w-5" />
            </button>
            
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                Sources of Truth Management
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">Centralized master data governance platform</p>
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
                className="pl-10 pr-4 py-2 bg-white text-gray-900 placeholder-gray-400 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none w-80 transition-all duration-200"
              />
            </div>

            {/* Environment Switcher */}
            <div className="relative">
              <select
                value={currentEnvironment}
                onChange={(e) => onEnvironmentChange(e.target.value as 'staging' | 'production')}
                className={`appearance-none px-3 py-2 pr-8 rounded-md font-medium text-sm border transition-all duration-200 min-w-[120px] ${
                  currentEnvironment === 'production'
                    ? 'bg-red-50 hover:bg-red-100 text-red-700 border-red-200'
                    : 'bg-green-50 hover:bg-green-100 text-green-700 border-green-200'
                }`}
              >
                <option value="staging">Staging</option>
                <option value="production">Production</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-current pointer-events-none" />
            </div>

            {/* Review Button */}
            {totalPendingCount > 0 && (
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md transition-all duration-200 flex items-center space-x-2 font-medium">
                <Bell className="h-4 w-4" />
                <span>Review</span>
                <span className="bg-orange-400 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {totalPendingCount}
                </span>
              </button>
            )}

            {/* User Menu */}
            <div className="flex items-center space-x-3">
              <button className="px-3 py-1.5 text-xs font-medium rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-700 transition-all duration-200">
                Switch to User
              </button>
              
              <div className="h-5 w-px bg-gray-300"></div>
              
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all duration-200 rounded-md">
                <Settings className="h-4 w-4" />
              </button>
              
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all duration-200 rounded-md">
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