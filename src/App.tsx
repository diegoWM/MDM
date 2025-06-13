import React, { useState } from 'react';
import { Database, Table, Plus, Search, Settings, Users, Package, Building } from 'lucide-react';
import TableView from './components/TableView';
import Sidebar from './components/Sidebar';

const sampleTables = [
  { id: 'customers', name: 'Customers', icon: Users, count: 1247 },
  { id: 'products', name: 'Products', icon: Package, count: 856 },
  { id: 'suppliers', name: 'Suppliers', icon: Building, count: 124 },
  { id: 'categories', name: 'Categories', icon: Table, count: 45 }
];

function App() {
  const [selectedTable, setSelectedTable] = useState(sampleTables[0]);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 flex">
      {/* Sidebar */}
      <Sidebar 
        tables={sampleTables}
        selectedTable={selectedTable}
        onTableSelect={setSelectedTable}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-gradient-to-r from-purple-900 via-indigo-900 to-green-900 shadow-2xl relative overflow-hidden border-b border-purple-500/30">
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
                  <p className="text-purple-200 text-sm font-semibold tracking-wide">Master Data Management System</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-purple-300" />
                  <input
                    type="text"
                    placeholder="Search records..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-11 pr-4 py-3 bg-gray-800/60 backdrop-blur-lg border border-purple-500/40 rounded-2xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none w-80 text-white placeholder-purple-300 shadow-lg"
                  />
                </div>
                <button className="bg-gradient-to-r from-yellow-500 via-yellow-400 to-amber-400 text-gray-900 px-8 py-3 rounded-2xl hover:from-yellow-400 hover:via-amber-400 hover:to-orange-400 transition-all duration-300 flex items-center space-x-2 font-bold shadow-xl transform hover:scale-105">
                  <Plus className="h-5 w-5" />
                  <span>Add Record</span>
                </button>
                <button className="p-3 text-purple-300 hover:text-white hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 rounded-2xl shadow-lg border border-purple-500/30">
                  <Settings className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
          <TableView 
            table={selectedTable}
            searchQuery={searchQuery}
          />
        </main>
      </div>
    </div>
  );
}

export default App;