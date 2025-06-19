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
    description: 'Customer records and information'
  },
  { 
    id: 'products', 
    name: 'Product Catalog', 
    icon: Package, 
    count: 856,
    description: 'Product information and specifications'
  },
  { 
    id: 'locations', 
    name: 'Location Registry', 
    icon: Building, 
    count: 324,
    description: 'Location and address data'
  },
  { 
    id: 'suppliers', 
    name: 'Supplier Database', 
    icon: Database, 
    count: 189,
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

  return (
    <div 
      className="min-h-screen bg-gray-900 flex relative"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/1466335/pexels-photo-1466335.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Dark overlay for better readability */}
      <div className="absolute inset-0 bg-gray-900/85 backdrop-blur-sm"></div>
      
      {/* Content with relative positioning */}
      <div className="relative z-10 flex w-full">
        {/* Sidebar */}
        <Sidebar 
          tables={sampleTables}
          selectedTable={selectedTable}
          onTableSelect={setSelectedTable}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <Header 
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            currentEnvironment={currentEnvironment}
            onEnvironmentChange={setCurrentEnvironment}
            sidebarCollapsed={sidebarCollapsed}
            onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          />

          {/* View Tabs */}
          <div className="bg-gray-800/90 border-b border-gray-700 px-8 backdrop-blur-sm">
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
                        ? 'text-green-400 border-green-400'
                        : 'text-gray-400 border-transparent hover:text-gray-300 hover:border-gray-600'
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
          <main className="flex-1 p-8 bg-transparent">
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
    </div>
  );
}

export default App;