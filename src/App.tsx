import React, { useState } from 'react';
import { Database, Users, Package, Building, Grid } from 'lucide-react';
import Sidebar from './components/Sidebar';
import TableView from './components/TableView';
import Header from './components/Header';

const sampleTables = [
  { 
    id: 'customers', 
    name: 'Customer Master', 
    icon: Users, 
    count: 1247,
    pendingCount: 3,
    description: 'Customer records and information'
  },
  { 
    id: 'products', 
    name: 'Product Catalog', 
    icon: Package, 
    count: 856,
    pendingCount: 7,
    description: 'Product information and specifications'
  },
  { 
    id: 'locations', 
    name: 'Location Registry', 
    icon: Building, 
    count: 324,
    pendingCount: 2,
    description: 'Location and address data'
  },
  { 
    id: 'suppliers', 
    name: 'Supplier Database', 
    icon: Database, 
    count: 189,
    pendingCount: 1,
    description: 'Supplier and vendor information'
  }
];

function App() {
  const [selectedTable, setSelectedTable] = useState(sampleTables[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentEnvironment, setCurrentEnvironment] = useState<'staging' | 'production'>('staging');
  const [activeView, setActiveView] = useState<'data' | 'history' | 'lineage'>('data');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  const totalPendingCount = sampleTables.reduce((sum, table) => sum + table.pendingCount, 0);

  return (
    <div className="min-h-screen bg-slate-900 flex">
      {/* Sidebar */}
      <Sidebar 
        tables={sampleTables}
        selectedTable={selectedTable}
        onTableSelect={setSelectedTable}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        totalPendingCount={totalPendingCount}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <Header 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          currentEnvironment={currentEnvironment}
          onEnvironmentChange={setCurrentEnvironment}
          totalPendingCount={totalPendingCount}
          sidebarCollapsed={sidebarCollapsed}
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        {/* View Tabs */}
        <div className="bg-slate-800 border-b border-slate-700 px-6">
          <div className="flex space-x-0">
            {[
              { id: 'data', label: 'Data', icon: Grid },
              { id: 'history', label: 'History', icon: Database },
              { id: 'lineage', label: 'Lineage', icon: Database }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveView(tab.id as any)}
                  className={`flex items-center space-x-2 px-6 py-4 text-sm font-semibold transition-all duration-200 border-b-2 ${
                    activeView === tab.id
                      ? 'text-blue-400 border-blue-400 bg-slate-700/50'
                      : 'text-slate-400 border-transparent hover:text-slate-300 hover:bg-slate-700/30'
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
        <main className="flex-1 p-6 bg-slate-900">
          <TableView 
            table={selectedTable}
            searchQuery={searchQuery}
            activeView={activeView}
            currentEnvironment={currentEnvironment}
            selectedRows={selectedRows}
            onSelectedRowsChange={setSelectedRows}
          />
        </main>
      </div>
    </div>
  );
}

export default App;