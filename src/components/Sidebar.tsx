import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Database, Menu, X } from 'lucide-react';
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
      <div className="w-16 bg-slate-800 border-r border-slate-700 flex flex-col">
        <div className="p-4">
          <button
            onClick={onToggleCollapse}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors duration-200 rounded-md w-full"
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
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700'
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
    <div className="w-80 bg-slate-800 border-r border-slate-700 flex flex-col">
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg">
              <div className="text-white text-lg font-bold">🌿</div>
            </div>
            <h2 className="text-lg font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              WeedMe MDM
            </h2>
          </div>
          <button
            onClick={onToggleCollapse}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors duration-200 rounded-md"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <nav className="flex-1 p-4 overflow-y-auto">
        {/* Global Lineage Map */}
        <div className="mb-6">
          <button className="w-full flex items-center space-x-3 px-4 py-3 text-slate-300 hover:bg-slate-700 transition-colors duration-200 rounded-md">
            <Database className="h-4 w-4 text-blue-400" />
            <span className="font-medium">Global Lineage Map</span>
          </button>
        </div>

        {/* Sources of Truth Section */}
        <div className="bg-slate-700 rounded-md border border-slate-600">
          {/* Section Header */}
          <button
            onClick={() => setIsSourcesExpanded(!isSourcesExpanded)}
            className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-600 transition-colors duration-200 rounded-t-md"
          >
            <div className="flex items-center space-x-3">
              {isSourcesExpanded ? (
                <ChevronDown className="h-4 w-4 text-slate-400" />
              ) : (
                <ChevronRight className="h-4 w-4 text-slate-400" />
              )}
              <div className="flex items-center space-x-2">
                <Database className="h-4 w-4 text-blue-400" />
                <span className="font-medium text-white">Sources of Truth</span>
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
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                        : 'text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    <div className="flex items-center space-x-3 min-w-0 flex-1">
                      <div className={`p-1.5 rounded ${
                        isSelected 
                          ? 'bg-white/20' 
                          : 'bg-slate-600'
                      }`}>
                        <Icon className={`h-4 w-4 ${
                          isSelected ? 'text-white' : 'text-slate-400'
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