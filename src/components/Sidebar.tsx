import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Database, Menu, X, GitBranch } from 'lucide-react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface Table {
  id: string;
  name: string;
  icon: LucideIcon;
  count: number;
  description?: string;
}

interface SidebarProps {
  tables: Table[];
  selectedTable: Table;
  onTableSelect: (table: Table) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  tables, 
  selectedTable, 
  onTableSelect, 
  collapsed, 
  onToggleCollapse
}) => {
  const [isSourcesExpanded, setIsSourcesExpanded] = useState(true);

  if (collapsed) {
    return (
      <div className="w-16 bg-gray-800/95 border-r border-gray-700 flex flex-col shadow-xl backdrop-blur-sm">
        <div className="p-4 border-b border-gray-700">
          <button
            onClick={onToggleCollapse}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 transition-all duration-200 rounded-lg w-full"
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
                className={`w-full p-2.5 rounded-lg transition-all duration-200 relative group ${
                  isSelected
                    ? 'bg-green-500/20 text-green-400 shadow-lg shadow-green-500/10'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
                title={table.name}
              >
                <Icon className="h-5 w-5 mx-auto" />
              </button>
            );
          })}
        </nav>

        {/* Global Lineage Map at bottom - collapsed */}
        <div className="p-3 border-t border-gray-700">
          <button className="w-full p-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700/50 transition-all duration-200" title="Global Lineage Map">
            <GitBranch className="h-5 w-5 mx-auto" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 bg-gray-800/95 border-r border-gray-700 flex flex-col shadow-xl backdrop-blur-sm">
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg">
              <div className="text-white text-lg font-bold">🌿</div>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">
                WeedMe MDM
              </h2>
              <p className="text-xs text-gray-400">Master Data Management</p>
            </div>
          </div>
          <button
            onClick={onToggleCollapse}
            className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700/50 transition-all duration-200 rounded-lg"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <nav className="flex-1 p-6 overflow-y-auto space-y-6">
        {/* Sources of Truth Section */}
        <div>
          <button
            onClick={() => setIsSourcesExpanded(!isSourcesExpanded)}
            className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-700/50 transition-colors duration-200 rounded-lg mb-3"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gray-700/50 rounded-lg">
                <Database className="h-4 w-4 text-gray-400" />
              </div>
              <span className="font-semibold text-white">Sources of Truth</span>
            </div>
            <div className="flex items-center space-x-2">
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
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all duration-200 group ${
                      isSelected
                        ? 'bg-green-500/20 text-green-400 shadow-lg shadow-green-500/10'
                        : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center space-x-3 min-w-0 flex-1">
                      <div className={`p-2 rounded-lg transition-colors duration-200 ${
                        isSelected 
                          ? 'bg-green-500/30' 
                          : 'bg-gray-700/50 group-hover:bg-gray-600/50'
                      }`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-medium truncate">{table.name}</div>
                        <div className={`text-xs truncate ${
                          isSelected ? 'text-green-300' : 'text-gray-500 group-hover:text-gray-400'
                        }`}>
                          {table.description}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </nav>

      {/* Global Lineage Map at bottom */}
      <div className="p-6 border-t border-gray-700">
        <button className="w-full flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-gray-700/50 hover:text-white transition-all duration-200 rounded-lg group">
          <div className="p-2 bg-gray-700/50 group-hover:bg-gray-600/50 rounded-lg transition-colors duration-200">
            <GitBranch className="h-4 w-4 text-gray-400 group-hover:text-white" />
          </div>
          <span className="font-medium">Global Lineage Map</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;