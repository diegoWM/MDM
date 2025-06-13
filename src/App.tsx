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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex">
      {/* Sidebar */}
      <Sidebar 
        tables={sampleTables}
        selectedTable={selectedTable}
        onTableSelect={setSelectedTable}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-800 shadow-lg">
          <div className="px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl">
                  <img 
                    src="/public/image.png" 
                    alt="WeedMe Logo" 
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">WeedMe MDM</h1>
                  <p className="text-purple-100 text-sm font-medium">Master Data Management System</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
                  <input
                    type="text"
                    placeholder="Search records..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none w-72 text-white placeholder-white/60"
                  />
                </div>
                <button className="bg-gradient-to-r from-green-400 to-yellow-400 text-gray-900 px-6 py-3 rounded-xl hover:from-green-500 hover:to-yellow-500 transition-all duration-200 flex items-center space-x-2 font-semibold shadow-lg">
                  <Plus className="h-4 w-4" />
                  <span>Add Record</span>
                </button>
                <button className="p-3 text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 rounded-xl">
                  <Settings className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Table Content */}
        <main className="flex-1 p-6">
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