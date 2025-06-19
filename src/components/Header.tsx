import React, { useState } from 'react';
import { Search, Settings, Bell, ChevronRight, ChevronDown, User, LogOut, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

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
  const { user, logout, canAccessProduction } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className={`shadow-xl border-b backdrop-blur-sm transition-all duration-300 ${
      currentEnvironment === 'production'
        ? 'bg-red-900/95 border-red-700 shadow-red-500/20'
        : 'bg-gray-800/95 border-gray-700'
    }`}>
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
              <div className="flex items-center space-x-3">
                <h1 className="text-xl font-semibold text-white">
                  Sources of Truth Management
                </h1>
                {currentEnvironment === 'production' && (
                  <div className="flex items-center space-x-2 bg-red-500/20 border border-red-500/50 rounded-lg px-3 py-1">
                    <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                    <span className="text-red-300 text-sm font-medium">LIVE PRODUCTION</span>
                  </div>
                )}
              </div>
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
                onChange={(e) => {
                  const newEnv = e.target.value as 'staging' | 'production';
                  if (newEnv === 'production' && !canAccessProduction) {
                    alert('Production access requires admin privileges');
                    return;
                  }
                  onEnvironmentChange(newEnv);
                }}
                className={`appearance-none px-4 py-2 pr-8 rounded-lg font-medium text-sm border transition-all duration-200 min-w-[120px] backdrop-blur-sm ${
                  currentEnvironment === 'production'
                    ? 'bg-red-500/20 hover:bg-red-500/30 text-red-300 border-red-500/50 shadow-lg shadow-red-500/20'
                    : 'bg-green-500/20 hover:bg-green-500/30 text-green-300 border-green-500/50'
                }`}
              >
                <option value="staging">Staging</option>
                <option value="production" disabled={!canAccessProduction}>
                  Production {!canAccessProduction ? '(Admin Only)' : ''}
                </option>
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
              <div className="h-5 w-px bg-gray-600"></div>
              
              <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 transition-all duration-200 rounded-lg">
                <Settings className="h-4 w-4" />
              </button>
              
              {/* User Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-3 p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 transition-all duration-200 rounded-lg"
                >
                  {user?.photoURL ? (
                    <img 
                      src={user.photoURL} 
                      alt="Profile" 
                      className="w-6 h-6 rounded-full"
                    />
                  ) : (
                    <User className="h-4 w-4" />
                  )}
                  <span className="text-sm font-medium">{user?.displayName || 'Admin'}</span>
                  <ChevronDown className="h-3 w-3" />
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-64 bg-gray-800 border border-gray-600 rounded-lg shadow-xl z-50 backdrop-blur-sm">
                    <div className="p-4 border-b border-gray-600">
                      <div className="flex items-center space-x-3">
                        {user?.photoURL ? (
                          <img 
                            src={user.photoURL} 
                            alt="Profile" 
                            className="w-10 h-10 rounded-full"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-gray-300" />
                          </div>
                        )}
                        <div>
                          <div className="text-white font-medium">{user?.displayName}</div>
                          <div className="text-gray-400 text-sm">{user?.email}</div>
                          <div className="flex items-center space-x-1 mt-1">
                            <Shield className="h-3 w-3 text-green-400" />
                            <span className="text-green-400 text-xs font-medium">Administrator</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="py-2">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 px-4 py-2 text-gray-300 hover:bg-gray-700/50 hover:text-white transition-all duration-200"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Click outside to close user menu */}
      {showUserMenu && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </header>
  );
};

export default Header;