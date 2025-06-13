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
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-green-100 flex">
      {/* Sidebar */}
      <Sidebar 
        tables={sampleTables}
        selectedTable={selectedTable}
        onTableSelect={setSelectedTable}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-gradient-to-r from-purple-600 via-pink-500 to-green-500 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-transparent to-blue-400/20"></div>
          <div className="relative px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-lg rounded-2xl border border-white/30 shadow-xl">
                  <img 
                    src="/public/image.png" 
                    alt="WeedMe Logo" 
                    className="w-9 h-9 object-contain"
                  />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-yellow-200 to-green-200 bg-clip-text text-transparent">
                    WeedMe MDM
                  </h1>
                  <p className="text-purple-100 text-sm font-semibold tracking-wide">Master Data Management System</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/70" />
                  <input
                    type="text"
                    placeholder="Search records..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-11 pr-4 py-3 bg-gradient-to-r from-white/15 to-white/10 backdrop-blur-lg border border-white/30 rounded-2xl focus:ring-2 focus:ring-yellow-300 focus:border-transparent outline-none w-80 text-white placeholder-white/70 shadow-lg"
                  />
                </div>
                <button className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 text-gray-900 px-8 py-3 rounded-2xl hover:from-yellow-300 hover:via-orange-300 hover:to-red-300 transition-all duration-300 flex items-center space-x-2 font-bold shadow-xl transform hover:scale-105">
                  <Plus className="h-5 w-5" />
                  <span>Add Record</span>
                </button>
                <button className="p-3 text-white/90 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 transition-all duration-300 rounded-2xl shadow-lg">
                  <Settings className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6 bg-gradient-to-br from-slate-50 via-purple-50 to-green-50">
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