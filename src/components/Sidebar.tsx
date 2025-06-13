import React, { useState } from 'react';
import { DivideIcon as LucideIcon, ChevronDown, ChevronRight, GitBranch, Shield, Database, Menu, X } from 'lucide-react';

interface Table {
  id: string;
  name: string;
  icon: LucideIcon;
  count: number;
  domain: string;
  pendingCount: number;
  qualityScore: number;
  description?: string;
}

interface SidebarProps {
  tables: Table[];
  selectedTable: Table;
  onTableSelect: (table: Table) => void;
  isDarkMode: boolean;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  tables, 
  selectedTable, 
  onTableSelect, 
  isDarkMode, 
  collapsed, 
  onToggleCollapse 
}) => {
  const [isSourcesExpanded, setIsSourcesExpanded] = useState(true);

  const totalPendingCount = tables.reduce((sum, table) => sum + table.pendingCount, 0);

  if (collapsed) {
    return (
      <div className={`w-16 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-r flex flex-col`}>
        <div className="p-4">
          <button
            onClick={onToggleCollapse}
            className={`p-2 ${isDarkMode ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'} transition-colors duration-200 rounded-md w-full`}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
        
        <nav className="flex-1 px-2 space-y-1">
          {tables.map((table) => {
            const Icon = table.icon;
            const isSelected = selectedTable.id === table.id;
            
            return (
              <button
                key={table.id}
                onClick={() => onTableSelect(table)}
                className={`w-full p-3 rounded-md transition-colors duration-200 relative ${
                  isSelected
                    ? `bg-gradient-to-r from-purple-600 to-green-600 text-white`
                    : `${isDarkMode ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`
                }`}
                title={table.name}
              >
                <Icon className="h-5 w-5 mx-auto" />
                {table.pendingCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-medium rounded-full h-4 w-4 flex items-center justify-center">
                    {table.pendingCount > 9 ? '9+' : table.pendingCount}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    );
  }

  return (
    <div className={`w-80 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-r flex flex-col`}>
      <div className={`p-6 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`p-2 bg-gradient-to-r from-purple-600 to-green-600 rounded-lg`}>
              <Shield className="h-5 w-5 text-white" />
            </div>
            <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Data Management</h2>
          </div>
          <button
            onClick={onToggleCollapse}
            className={`p-2 ${isDarkMode ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'} transition-colors duration-200 rounded-md`}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>Authoritative data sources with validation</p>
      </div>
      
      <nav className="flex-1 p-4 overflow-y-auto">
        {/* Global Lineage Map */}
        <div className="mb-6">
          <button className={`w-full flex items-center space-x-3 px-4 py-3 rounded-md ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-300 border border-gray-600' : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200'} transition-colors duration-200`}>
            <GitBranch className="h-5 w-5" />
            <span className="font-medium">Global Lineage Map</span>
          </button>
        </div>

        {/* Sources of Truth Section */}
        <div className={`${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'} rounded-md border`}>
          {/* Section Header */}
          <button
            onClick={() => setIsSourcesExpanded(!isSourcesExpanded)}
            className={`w-full flex items-center justify-between px-4 py-3 ${isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-100'} transition-colors duration-200 rounded-t-md`}
          >
            <div className="flex items-center space-x-3">
              {isSourcesExpanded ? (
                <ChevronDown className={`h-4 w-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              ) : (
                <ChevronRight className={`h-4 w-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              )}
              <div className="flex items-center space-x-2">
                <Database className="h-4 w-4 text-blue-500" />
                <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Sources of Truth</span>
              </div>
            </div>
            {totalPendingCount > 0 && (
              <span className="bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                {totalPendingCount}
              </span>
            )}
          </button>

          {/* Tables List */}
          {isSourcesExpanded && (
            <div className="px-2 pb-2 space-y-1">
              {tables.map((table) => {
                const Icon = table.icon;
                const isSelected = selectedTable.id === table.id;
                
                return (
                  <button
                    key={table.id}
                    onClick={() => onTableSelect(table)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-left transition-colors duration-200 ${
                      isSelected
                        ? `bg-gradient-to-r from-purple-600 to-green-600 text-white`
                        : `${isDarkMode ? 'text-gray-300 hover:bg-gray-600' : 'text-gray-700 hover:bg-gray-100'}`
                    }`}
                  >
                    <div className="flex items-center space-x-3 min-w-0 flex-1">
                      <div className={`p-1.5 rounded ${
                        isSelected 
                          ? 'bg-white/20' 
                          : isDarkMode ? 'bg-gray-600' : 'bg-gray-200'
                      }`}>
                        <Icon className={`h-4 w-4 ${
                          isSelected ? 'text-white' : isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-medium truncate">{table.name}</div>
                      </div>
                    </div>
                    {table.pendingCount > 0 && (
                      <span className="bg-red-500 text-white text-xs font-medium px-1.5 py-0.5 rounded-full ml-2">
                        {table.pendingCount}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;