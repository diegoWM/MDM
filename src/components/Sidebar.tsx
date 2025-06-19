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
      <div className="w-16 bg-slate-800 border-r border-slate-700 flex flex-col">
        <div className="p-4">
          <button
            onClick={onToggleCollapse}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors duration-200 rounded-lg w-full"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
        
        <nav className="flex-1 px-2 space-y-2">
          {tables.map((table) => {
            const Icon = table.icon;
            const isSelected = selectedTable.id === table.id;
            
            return (
              <button
                key={table.id}
                onClick={() => onTableSelect(table)}
                className={`w-full p-3 rounded-lg transition-all duration-200 relative ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700'
                }`}
                title={table.name}
              >
                <Icon className="h-5 w-5 mx-auto" />
                {table.pendingCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center">
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
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
              <div className="text-white text-lg">🌿</div>
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">
                WeedMe MDM
              </h2>
              <p className="text-xs text-slate-400 font-medium">Master Data Management</p>
            </div>
          </div>
          <button
            onClick={onToggleCollapse}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors duration-200 rounded-lg"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <nav className="flex-1 p-6 overflow-y-auto space-y-6">
        {/* Global Lineage Map */}
        <div>
          <button className="w-full flex items-center space-x-3 px-4 py-3 text-slate-300 hover:bg-slate-700 hover:text-white transition-all duration-200 rounded-lg group">
            <div className="p-2 bg-slate-700 group-hover:bg-slate-600 rounded-lg transition-colors duration-200">
              <GitBranch className="h-4 w-4 text-blue-400" />
            </div>
            <span className="font-medium">Global Lineage Map</span>
          </button>
        </div>

        {/* Sources of Truth Section */}
        <div>
          <button
            onClick={() => setIsSourcesExpanded(!isSourcesExpanded)}
            className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-700 transition-colors duration-200 rounded-lg mb-3"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-slate-700 rounded-lg">
                <Database className="h-4 w-4 text-blue-400" />
              </div>
              <span className="font-semibold text-white">Sources of Truth</span>
            </div>
            <div className="flex items-center space-x-2">
              {totalPendingCount > 0 && (
                <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                  {totalPendingCount}
                </span>
              )}
              {isSourcesExpanded ? (
                <ChevronDown className="h-4 w-4 text-slate-400" />
              ) : (
                <ChevronRight className="h-4 w-4 text-slate-400" />
              )}
            </div>
          </button>

          {/* Tables List */}
          {isSourcesExpanded && (
            <div className="space-y-2 ml-4">
              {tables.map((table) => {
                const Icon = table.icon;
                const isSelected = selectedTable.id === table.id;
                
                return (
                  <button
                    key={table.id}
                    onClick={() => onTableSelect(table)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all duration-200 group ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center space-x-3 min-w-0 flex-1">
                      <div className={`p-2 rounded-lg transition-colors duration-200 ${
                        isSelected 
                          ? 'bg-blue-500' 
                          : 'bg-slate-600 group-hover:bg-slate-500'
                      }`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-medium truncate">{table.name}</div>
                        <div className={`text-xs truncate ${
                          isSelected ? 'text-blue-100' : 'text-slate-400 group-hover:text-slate-300'
                        }`}>
                          {table.description}
                        </div>
                      </div>
                    </div>
                    {table.pendingCount > 0 && (
                      <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full ml-3">
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