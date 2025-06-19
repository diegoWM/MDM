import React, { useState, useEffect } from 'react';
import { Database, Users, Package, Building, BarChart3 } from 'lucide-react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginScreen from './components/LoginScreen';
import Sidebar from './components/Sidebar';
import TableView from './components/TableView';
import Header from './components/Header';
import LoadingScreen from './components/LoadingScreen';
import ProductionWarning from './components/ProductionWarning';

const sampleTables = [
  { 
    id: 'customers', 
    name: 'Customer Master', 
    icon: Users, 
    count: 1247,
    activeCount: 892,
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

const AppContent: React.FC = () => {
  const { user, isAdmin, isLoading } = useAuth();
  const [appLoading, setAppLoading] = useState(true);
  const [selectedTable, setSelectedTable] = useState(sampleTables[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentEnvironment, setCurrentEnvironment] = useState<'staging' | 'production'>('staging');
  const [activeView, setActiveView] = useState<'data' | 'history' | 'lineage'>('data');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [showProductionWarning, setShowProductionWarning] = useState(false);
  const [pendingEnvironment, setPendingEnvironment] = useState<'staging' | 'production'>('staging');

  const handleLoadingComplete = () => {
    setAppLoading(false);
  };

  const handleEnvironmentChange = (env: 'staging' | 'production') => {
    if (env === 'production' && currentEnvironment !== 'production') {
      setPendingEnvironment(env);
      setShowProductionWarning(true);
    } else {
      setCurrentEnvironment(env);
    }
  };

  const handleProductionConfirm = () => {
    setCurrentEnvironment(pendingEnvironment);
    setShowProductionWarning(false);
  };

  const handleProductionCancel = () => {
    setShowProductionWarning(false);
    setPendingEnvironment('staging');
  };

  // Show loading screen while auth is loading
  if (isLoading) {
    return <LoadingScreen onLoadingComplete={() => {}} />;
  }

  // Show login screen if not authenticated or not admin
  if (!user || !isAdmin) {
    return <LoginScreen />;
  }

  // Show app loading screen
  if (appLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <div 
      className={`min-h-screen flex relative transition-all duration-500 ${
        currentEnvironment === 'production'
          ? 'bg-red-900/20'
          : 'bg-gray-900'
      }`}
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/1466335/pexels-photo-1466335.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Dynamic overlay based on environment */}
      <div className={`absolute inset-0 backdrop-blur-sm transition-all duration-500 ${
        currentEnvironment === 'production'
          ? 'bg-red-900/85 animate-pulse'
          : 'bg-gray-900/85'
      }`}></div>
      
      {/* Production Warning Modal */}
      {showProductionWarning && (
        <ProductionWarning
          onConfirm={handleProductionConfirm}
          onCancel={handleProductionCancel}
        />
      )}
      
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
            onEnvironmentChange={handleEnvironmentChange}
            sidebarCollapsed={sidebarCollapsed}
            onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          />

          {/* View Tabs */}
          <div className={`border-b backdrop-blur-sm transition-all duration-300 ${
            currentEnvironment === 'production'
              ? 'bg-red-800/90 border-red-700'
              : 'bg-gray-800/90 border-gray-700'
          } px-8`}>
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
                        ? currentEnvironment === 'production'
                          ? 'text-red-400 border-red-400'
                          : 'text-green-400 border-green-400'
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
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;