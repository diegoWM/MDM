import React, { useState } from 'react';
import { Database, Table, Plus, Search, Settings, Users, Package, Building, GitBranch, Bell, Monitor, Sun, Moon } from 'lucide-react';
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

  const totalPendingCount = sampleTables.reduce((sum, table) => sum + table.pendingCount, 0);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'} flex`}>
      {/* Sidebar */}
      <Sidebar 
        tables={sampleTables}
        selectedTable={selectedTable}
        onTableSelect={setSelectedTable}
        isDarkMode={isDarkMode}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className={`${isDarkMode ? 'bg-gradient-to-r from-purple-900/40 via-slate-800 to-green-900/40 border-slate-700' : 'bg-gradient-to-r from-purple-100/40 via-white to-green-100/40 border-gray-200'} shadow-lg border-b backdrop-blur-sm`}>
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`flex items-center justify-center w-12 h-12 ${isDarkMode ? 'bg-gradient-to-r from-purple-600/30 to-green-600/30' : 'bg-gradient-to-r from-purple-200/50 to-green-200/50'} rounded-lg border ${isDarkMode ? 'border-purple-500/30' : 'border-purple-300/40'} backdrop-blur-sm shadow-sm`}>
                  <img 
                    src="/public/image.png" 
                    alt="WeedMe Logo" 
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-green-400 bg-clip-text text-transparent">
                    WeedMe MDM
                  </h1>
                  <p className={`${isDarkMode ? 'text-purple-200' : 'text-purple-700'} text-sm font-medium`}>Sources of Truth Management</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                {/* Environment Switcher */}
                <EnvironmentSwitcher 
                  currentEnvironment={currentEnvironment}
                  onEnvironmentChange={setCurrentEnvironment}
                />

                {/* Global Search */}
                <div className="relative">
                  <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${isDarkMode ? 'text-purple-300' : 'text-purple-500'}`} />
                  <input
                    type="text"
                    placeholder="Search records... (⌘K)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`pl-10 pr-4 py-2 ${isDarkMode ? 'bg-slate-700/60 text-white placeholder-purple-300 border-purple-500/30' : 'bg-white/80 text-gray-900 placeholder-purple-400 border-purple-300/40'} border rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 outline-none w-80 backdrop-blur-sm shadow-sm`}
                  />
                </div>

                {/* Notifications */}
                <NotificationBadge count={totalPendingCount} isDarkMode={isDarkMode} />

                {/* Add Record Button */}
                <button className="bg-gradient-to-r from-purple-600 to-green-600 hover:from-purple-700 hover:to-green-700 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 font-medium shadow-md">
                  <Plus className="h-4 w-4" />
                  <span>Add Record</span>
                </button>

                {/* Theme Toggle */}
                <button 
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className={`p-2 ${isDarkMode ? 'text-purple-300 hover:text-white hover:bg-purple-600/30' : 'text-purple-600 hover:text-purple-700 hover:bg-purple-100/50'} transition-all duration-200 rounded-lg border ${isDarkMode ? 'border-purple-500/30' : 'border-purple-300/40'} backdrop-blur-sm`}
                >
                  {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>

                {/* Settings */}
                <button className={`p-2 ${isDarkMode ? 'text-purple-300 hover:text-white hover:bg-purple-600/30' : 'text-purple-600 hover:text-purple-700 hover:bg-purple-100/50'} transition-all duration-200 rounded-lg border ${isDarkMode ? 'border-purple-500/30' : 'border-purple-300/40'} backdrop-blur-sm`}>
                  <Settings className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* View Tabs */}
        <div className={`${isDarkMode ? 'bg-slate-800/60 border-slate-700' : 'bg-white/60 border-gray-200'} border-b px-6 backdrop-blur-sm`}>
          <div className="flex space-x-1">
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
                  className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium transition-all duration-200 border-b-2 ${
                    activeView === tab.id
                      ? `${isDarkMode ? 'text-purple-300 border-purple-400 bg-gradient-to-r from-purple-900/30 to-green-900/30' : 'text-purple-600 border-purple-500 bg-gradient-to-r from-purple-100/50 to-green-100/50'}`
                      : `${isDarkMode ? 'text-slate-400 border-transparent hover:text-purple-300 hover:bg-purple-800/20' : 'text-gray-500 border-transparent hover:text-purple-600 hover:bg-purple-50'}`
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
        <main className={`flex-1 p-6 ${isDarkMode ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'}`}>
          <TableView 
            table={selectedTable}
            searchQuery={searchQuery}
            activeView={activeView}
            isDarkMode={isDarkMode}
          />
        </main>
      </div>
    </div>
  );
}

export default App;