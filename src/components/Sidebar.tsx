import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Database, Menu, X, GitBranch } from 'lucide-react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface Table {
  id: string;
  name: string;
  icon: LucideIcon;
  count: number;
  pendingCount: number;
  description?: string;
}

interface SidebarProps {
  tables: Table[];
  selectedTable: Table;
  onTableSelect: (table: Table) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  totalPendingCount: number;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  tables, 
  selectedTable, 
  onTableSelect, 
  collapsed, 
  onToggleCollapse,
  totalPendingCount
}) => {
  const [isSourcesExpanded, setIsSourcesExpanded] = useState(true);

  if (collapsed) {
    return (
      <div className="w-16 bg-white border-r border-gray-200 flex flex-col shadow-sm">
        <div className="p-4 border-b border-gray-200">
          <button
            onClick={onToggleCollapse}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all duration-200 rounded-md w-full"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
        
        <nav className="flex-1 px-3 py-4 space-y-2">
          {tables.map((table) => {
            const Icon = table.icon;
            const isSelected = selectedTable.id === table.id;
            
            return (
              <button
                key={table.id}
                onClick={() => onTableSelect(table)}
                className={`w-full p-2.5 rounded-md transition-all duration-200 relative group ${
                  isSelected
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
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
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-md">
              <div className="text-white text-sm font-bold">W</div>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                WeedMe MDM
              </h2>
              <p className="text-xs text-gray-500">Master Data Management</p>
            </div>
          </div>
          <button
            onClick={onToggleCollapse}
            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all duration-200 rounded-md"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <nav className="flex-1 p-6 overflow-y-auto space-y-6">
        {/* Global Lineage Map */}
        <div>
          <button className="w-full flex items-center space-x-3 px-3 py-2.5 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 rounded-md group">
            <div className="p-1.5 bg-gray-100 group-hover:bg-gray-200 rounded-md transition-colors duration-200">
              <GitBranch className="h-4 w-4 text-gray-600" />
            </div>
            <span className="font-medium">Global Lineage Map</span>
          </button>
        </div>

        {/* Sources of Truth Section */}
        <div>
          <button
            onClick={() => setIsSourcesExpanded(!isSourcesExpanded)}
            className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-gray-50 transition-colors duration-200 rounded-md mb-3"
          >
            <div className="flex items-center space-x-3">
              <div className="p-1.5 bg-gray-100 rounded-md">
                <Database className="h-4 w-4 text-gray-600" />
              </div>
              <span className="font-semibold text-gray-900">Sources of Truth</span>
            </div>
            <div className="flex items-center space-x-2">
              {totalPendingCount > 0 && (
                <span className="bg-red-100 text-red-600 text-xs font-medium px-2 py-1 rounded-full">
                  {totalPendingCount}
                </span>
              )}
              {isSourcesExpanded ? (
                <ChevronDown className="h-4 w-4 text-gray-400" />
              ) : (
                <ChevronRight className="h-4 w-4 text-gray-400" />
              )}
            </div>
          </button>

          {/* Tables List */}
          {isSourcesExpanded && (
            <div className="space-y-1 ml-4">
              {tables.map((table) => {
                const Icon = table.icon;
                const isSelected = selectedTable.id === table.id;
                
                return (
                  <button
                    key={table.id}
                    onClick={() => onTableSelect(table)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md text-left transition-all duration-200 group ${
                      isSelected
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <div className="flex items-center space-x-3 min-w-0 flex-1">
                      <div className={`p-1.5 rounded-md transition-colors duration-200 ${
                        isSelected 
                          ? 'bg-blue-100' 
                          : 'bg-gray-100 group-hover:bg-gray-200'
                      }`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-medium truncate">{table.name}</div>
                        <div className={`text-xs truncate ${
                          isSelected ? 'text-blue-500' : 'text-gray-500 group-hover:text-gray-600'
                        }`}>
                          {table.description}
                        </div>
                      </div>
                    </div>
                    {table.pendingCount > 0 && (
                      <span className="bg-red-100 text-red-600 text-xs font-medium px-2 py-1 rounded-full ml-3">
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