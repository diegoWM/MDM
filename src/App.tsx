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
    <div className={`min-h-screen ${isDarkMode ? 'bg-slate-900' : 'bg-gray-50'} flex`}>
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
        <header className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} shadow-sm border-b`}>
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`flex items-center justify-center w-12 h-12 ${isDarkMode ? 'bg-slate-700' : 'bg-gray-100'} rounded-lg border ${isDarkMode ? 'border-slate-600' : 'border-gray-300'}`}>
                  <img 
                    src="/public/image.png" 
                    alt="WeedMe Logo" 
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <div>
                  <h1 className={`text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    WeedMe MDM
                  </h1>
                  <p className={`${isDarkMode ? 'text-slate-400' : 'text-gray-600'} text-sm`}>Sources of Truth Management</p>
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
                  <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${isDarkMode ? 'text-slate-400' : 'text-gray-400'}`} />
                  <input
                    type="text"
                    placeholder="Search records... (⌘K)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`pl-10 pr-4 py-2 ${isDarkMode ? 'bg-slate-700 text-white placeholder-slate-400 border-slate-600' : 'bg-white text-gray-900 placeholder-gray-400 border-gray-300'} border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none w-80`}
                  />
                </div>

                {/* Notifications */}
                <NotificationBadge count={totalPendingCount} isDarkMode={isDarkMode} />

                {/* Add Record Button */}
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2 font-medium">
                  <Plus className="h-4 w-4" />
                  <span>Add Record</span>
                </button>

                {/* Theme Toggle */}
                <button 
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className={`p-2 ${isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-700' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'} transition-colors duration-200 rounded-lg`}
                >
                  {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>

                {/* Settings */}
                <button className={`p-2 ${isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-700' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'} transition-colors duration-200 rounded-lg`}>
                  <Settings className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* View Tabs */}
        <div className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} border-b px-6`}>
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
                  className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium transition-colors duration-200 border-b-2 ${
                    activeView === tab.id
                      ? `${isDarkMode ? 'text-blue-400 border-blue-400 bg-slate-700/50' : 'text-blue-600 border-blue-600 bg-blue-50'}`
                      : `${isDarkMode ? 'text-slate-400 border-transparent hover:text-slate-300 hover:bg-slate-700/30' : 'text-gray-500 border-transparent hover:text-gray-700 hover:bg-gray-50'}`
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
        <main className={`flex-1 p-6 ${isDarkMode ? 'bg-slate-900' : 'bg-gray-50'}`}>
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