import React, { useState } from 'react';
import { Database, Table, Search, Settings, Users, Package, Building, GitBranch, Bell, Monitor, Sun, Moon, Menu, X } from 'lucide-react';
import TableView from './components/TableView';
import Sidebar from './components/Sidebar';
import EnvironmentSwitcher from './components/EnvironmentSwitcher';
import NotificationBadge from './components/NotificationBadge';

const sampleTables = [
  { 
    id: 'customers', 
    name: 'Customer Master', 
    icon: Users, 
    count: 1247,
    domain: 'Sources of Truth',
    pendingCount: 3,
    qualityScore: 92,
    description: 'Authoritative customer records with strict validation'
  },
  { 
    id: 'products', 
    name: 'Product Catalog', 
    icon: Package, 
    count: 856,
    domain: 'Sources of Truth', 
    pendingCount: 7,
    qualityScore: 88,
    description: 'Master product information and specifications'
  },
  { 
    id: 'locations', 
    name: 'Location Registry', 
    icon: Building, 
    count: 324,
    domain: 'Sources of Truth',
    pendingCount: 2,
    qualityScore: 95,
    description: 'Standardized location and address data'
  },
  { 
    id: 'suppliers', 
    name: 'Supplier Database', 
    icon: Database, 
    count: 189,
    domain: 'Sources of Truth',
    pendingCount: 1,
    qualityScore: 91,
    description: 'Verified supplier and vendor information'
  }
];

function App() {
  const [selectedTable, setSelectedTable] = useState(sampleTables[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentEnvironment, setCurrentEnvironment] = useState<'production' | 'staging'>('staging');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeView, setActiveView] = useState<'data' | 'history' | 'lineage'>('data');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Role management - in real app this would come from authentication
  const [userRole, setUserRole] = useState<'admin' | 'user'>('admin'); // Change to 'user' to test user experience
  const [pendingChangesCount, setPendingChangesCount] = useState(13); // Changes awaiting approval

  const totalPendingCount = sampleTables.reduce((sum, table) => sum + table.pendingCount, 0);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} flex`}>
      {/* Sidebar */}
      <Sidebar 
        tables={sampleTables}
        selectedTable={selectedTable}
        onTableSelect={setSelectedTable}
        isDarkMode={isDarkMode}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} shadow-sm border-b`}>
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {/* Sidebar Toggle */}
                <button
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                  className={`p-2 ${isDarkMode ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'} transition-colors duration-200 rounded-md`}
                >
                  <Menu className="h-5 w-5" />
                </button>
                
                <div>
                  <h1 className="text-xl font-semibold bg-gradient-to-r from-purple-400 to-green-400 bg-clip-text text-transparent">
                    Sources of Truth Management
                  </h1>
                  {userRole === 'user' && (
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
                      Changes require admin approval before going live
                    </p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* Global Search */}
                <div className="relative">
                  <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  <input
                    type="text"
                    placeholder="Search records..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`pl-10 pr-4 py-2 ${isDarkMode ? 'bg-gray-700 text-white placeholder-gray-400 border-gray-600' : 'bg-white text-gray-900 placeholder-gray-500 border-gray-300'} border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none w-80`}
                  />
                </div>

                {/* Environment Indicator - Subtle for users, prominent for admins */}
                {userRole === 'admin' ? (
                  <EnvironmentSwitcher 
                    currentEnvironment={currentEnvironment}
                    onEnvironmentChange={setCurrentEnvironment}
                    userRole={userRole}
                    pendingChangesCount={pendingChangesCount}
                  />
                ) : (
                  <div className={`flex items-center space-x-2 px-3 py-1 ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-600'} rounded-md text-sm`}>
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Staging</span>
                  </div>
                )}

                {/* Admin Panel Button - Only for admins */}
                {userRole === 'admin' && pendingChangesCount > 0 && (
                  <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md transition-colors duration-200 flex items-center space-x-2 font-medium">
                    <Bell className="h-4 w-4" />
                    <span>Review ({pendingChangesCount})</span>
                  </button>
                )}

                {/* Role Switcher (for demo purposes) */}
                <button
                  onClick={() => setUserRole(userRole === 'admin' ? 'user' : 'admin')}
                  className={`px-3 py-2 text-xs font-medium rounded-md ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} transition-colors duration-200`}
                >
                  Switch to {userRole === 'admin' ? 'User' : 'Admin'}
                </button>

                {/* Theme Toggle */}
                <button 
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className={`p-2 ${isDarkMode ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'} transition-colors duration-200 rounded-md`}
                >
                  {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>

                {/* Settings */}
                <button className={`p-2 ${isDarkMode ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'} transition-colors duration-200 rounded-md`}>
                  <Settings className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Production Warning Banner - Only for admins in production */}
          {userRole === 'admin' && currentEnvironment === 'production' && (
            <div className="bg-red-600 text-white px-6 py-2 border-t border-red-500">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-red-300 rounded-full animate-pulse"></div>
                <span className="font-medium text-sm">⚠️ LIVE PRODUCTION ENVIRONMENT - Changes affect real data and downstream systems</span>
                <div className="w-2 h-2 bg-red-300 rounded-full animate-pulse"></div>
              </div>
            </div>
          )}
        </header>

        {/* View Tabs */}
        <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b px-6`}>
          <div className="flex space-x-0">
            {[
              { id: 'data', label: 'Data', icon: Table },
              { id: 'history', label: 'History', icon: GitBranch },
              { id: 'lineage', label: 'Lineage', icon: Database }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveView(tab.id as any)}
                  className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium transition-colors duration-200 border-b-2 ${
                    activeView === tab.id
                      ? `text-blue-600 border-blue-600`
                      : `${isDarkMode ? 'text-gray-400 border-transparent hover:text-gray-300' : 'text-gray-500 border-transparent hover:text-gray-700'}`
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content Area */}
        <main className={`flex-1 p-6 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
          <TableView 
            table={selectedTable}
            searchQuery={searchQuery}
            activeView={activeView}
            isDarkMode={isDarkMode}
            userRole={userRole}
            currentEnvironment={currentEnvironment}
          />
        </main>
      </div>
    </div>
  );
}

export default App;