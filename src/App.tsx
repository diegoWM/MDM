import React, { useState } from 'react';
import { Database, Table, Plus, Search, Settings, Users, Package, Building, GitBranch, Bell, Monitor, Sun, Moon } from 'lucide-react';
import TableView from './components/TableView';
import Sidebar from './components/Sidebar';
import EnvironmentSwitcher from './components/EnvironmentSwitcher';
import NotificationBadge from './components/NotificationBadge';

const sampleTables = [
  { 
    id: 'customers', 
    name: 'Customers', 
    icon: Users, 
    count: 1247,
    domain: 'Sources of Truth',
    pendingCount: 3,
    qualityScore: 92
  },
  { 
    id: 'products', 
    name: 'Products', 
    icon: Package, 
    count: 856,
    domain: 'Sources of Truth', 
    pendingCount: 7,
    qualityScore: 88
  },
  { 
    id: 'suppliers', 
    name: 'Suppliers', 
    icon: Building, 
    count: 124,
    domain: 'Partners',
    pendingCount: 1,
    qualityScore: 95
  },
  { 
    id: 'categories', 
    name: 'Categories', 
    icon: Table, 
    count: 45,
    domain: 'Ref-data',
    pendingCount: 0,
    qualityScore: 97
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
    <div className={`min-h-screen ${isDarkMode ? 'bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900' : 'bg-gradient-to-br from-gray-100 via-slate-200 to-gray-100'} flex`}>
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
        <header className={`${isDarkMode ? 'bg-gradient-to-r from-purple-900 via-indigo-900 to-green-900' : 'bg-gradient-to-r from-purple-600 via-indigo-600 to-green-600'} shadow-2xl relative overflow-hidden border-b ${isDarkMode ? 'border-purple-500/30' : 'border-purple-400/50'}`}>
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-transparent to-emerald-400/10"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-600/20 via-transparent to-green-600/20"></div>
          <div className="relative px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-purple-600/30 to-green-600/30 backdrop-blur-lg rounded-2xl border border-purple-400/40 shadow-xl">
                  <img 
                    src="/public/image.png" 
                    alt="WeedMe Logo" 
                    className="w-9 h-9 object-contain"
                  />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-300 via-yellow-300 to-green-300 bg-clip-text text-transparent">
                    WeedMe MDM
                  </h1>
                  <p className={`${isDarkMode ? 'text-purple-200' : 'text-purple-100'} text-sm font-semibold tracking-wide`}>Master Data Management System</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* Environment Switcher */}
                <EnvironmentSwitcher 
                  currentEnvironment={currentEnvironment}
                  onEnvironmentChange={setCurrentEnvironment}
                />

                {/* Global Search */}
                <div className="relative">
                  <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${isDarkMode ? 'text-purple-300' : 'text-purple-200'}`} />
                  <input
                    type="text"
                    placeholder="Search records... (⌘K)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`pl-11 pr-4 py-3 ${isDarkMode ? 'bg-gray-800/60 text-white placeholder-purple-300' : 'bg-white/20 text-white placeholder-purple-200'} backdrop-blur-lg border ${isDarkMode ? 'border-purple-500/40' : 'border-purple-400/50'} rounded-2xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none w-80 shadow-lg`}
                  />
                </div>

                {/* Notifications */}
                <NotificationBadge count={totalPendingCount} isDarkMode={isDarkMode} />

                {/* Add Record Button */}
                <button className="bg-gradient-to-r from-yellow-500 via-yellow-400 to-amber-400 text-gray-900 px-8 py-3 rounded-2xl hover:from-yellow-400 hover:via-amber-400 hover:to-orange-400 transition-all duration-300 flex items-center space-x-2 font-bold shadow-xl transform hover:scale-105">
                  <Plus className="h-5 w-5" />
                  <span>Add Record</span>
                </button>

                {/* Theme Toggle */}
                <button 
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className={`p-3 ${isDarkMode ? 'text-purple-300 hover:text-white hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-600' : 'text-purple-200 hover:text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-indigo-500'} transition-all duration-300 rounded-2xl shadow-lg border ${isDarkMode ? 'border-purple-500/30' : 'border-purple-400/40'}`}
                >
                  {isDarkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
                </button>

                {/* Settings */}
                <button className={`p-3 ${isDarkMode ? 'text-purple-300 hover:text-white hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-600' : 'text-purple-200 hover:text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-indigo-500'} transition-all duration-300 rounded-2xl shadow-lg border ${isDarkMode ? 'border-purple-500/30' : 'border-purple-400/40'}`}>
                  <Settings className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* View Tabs */}
        <div className={`${isDarkMode ? 'bg-gray-800/60' : 'bg-white/60'} backdrop-blur-sm border-b ${isDarkMode ? 'border-gray-700/50' : 'border-gray-300/50'} px-6`}>
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
                  className={`flex items-center space-x-2 px-6 py-4 text-sm font-semibold transition-all duration-300 border-b-2 ${
                    activeView === tab.id
                      ? `${isDarkMode ? 'text-purple-300 border-purple-400' : 'text-purple-600 border-purple-500'} bg-gradient-to-r ${isDarkMode ? 'from-purple-900/30 to-green-900/30' : 'from-purple-100/50 to-green-100/50'}`
                      : `${isDarkMode ? 'text-gray-400 border-transparent hover:text-purple-300' : 'text-gray-600 border-transparent hover:text-purple-600'} hover:bg-gradient-to-r ${isDarkMode ? 'hover:from-purple-800/20 hover:to-green-800/20' : 'hover:from-purple-50 hover:to-green-50'}`
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
        <main className={`flex-1 p-6 ${isDarkMode ? 'bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900' : 'bg-gradient-to-br from-gray-100 via-slate-200 to-gray-100'}`}>
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