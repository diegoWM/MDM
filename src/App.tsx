import React, { useState } from 'react';
import { Database, Users, Package, Building, BarChart3 } from 'lucide-react';
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
    <div className="min-h-screen bg-gray-50 flex">
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
        <div className="bg-white border-b border-gray-200 px-8">
          <div className="flex space-x-8">
            {[
              { id: 'data', label: 'Data', icon: BarChart3 },
              { id: 'history', label: 'History', icon: Database },
              { id: 'lineage', label: 'Lineage', icon: Database }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveView(tab.id as any)}
                  className={`flex items-center space-x-2 px-1 py-4 text-sm font-medium transition-all duration-300 border-b-2 relative ${
                    activeView === tab.id
                      ? 'text-blue-600 border-blue-600'
                      : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
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
        <main className="flex-1 p-8 bg-gray-50">
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