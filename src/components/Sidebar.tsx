import React, { useState } from 'react';
import { DivideIcon as LucideIcon, ChevronDown, ChevronRight, GitBranch, Shield, Database } from 'lucide-react';

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
}

const Sidebar: React.FC<SidebarProps> = ({ tables, selectedTable, onTableSelect, isDarkMode }) => {
  const [isSourcesExpanded, setIsSourcesExpanded] = useState(true);

  const totalPendingCount = tables.reduce((sum, table) => sum + table.pendingCount, 0);

  return (
    <div className={`w-80 ${isDarkMode ? 'bg-gradient-to-b from-slate-800 via-slate-800 to-slate-900 border-slate-700' : 'bg-gradient-to-b from-white via-gray-50 to-gray-100 border-gray-200'} border-r flex flex-col shadow-lg`}>
      <div className={`p-6 border-b ${isDarkMode ? 'border-slate-700 bg-gradient-to-r from-purple-900/20 to-green-900/20' : 'border-gray-200 bg-gradient-to-r from-purple-100/30 to-green-100/30'}`}>
        <div className="flex items-center space-x-3 mb-2">
          <div className={`p-2 ${isDarkMode ? 'bg-gradient-to-r from-purple-600/30 to-green-600/30' : 'bg-gradient-to-r from-purple-200/50 to-green-200/50'} rounded-lg backdrop-blur-sm`}>
            <Shield className={`h-5 w-5 ${isDarkMode ? 'text-purple-300' : 'text-purple-600'}`} />
          </div>
          <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Data Management</h2>
        </div>
        <p className={`${isDarkMode ? 'text-purple-200' : 'text-purple-700'} text-sm font-medium`}>Authoritative data sources with validation</p>
      </div>
      
      <nav className="flex-1 p-6 overflow-y-auto">
        {/* Global Lineage Map */}
        <div className="mb-6">
          <button className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg ${isDarkMode ? 'bg-gradient-to-r from-indigo-600/20 to-purple-600/20 hover:from-indigo-600/30 hover:to-purple-600/30 text-indigo-300 border border-indigo-500/20' : 'bg-gradient-to-r from-indigo-100/60 to-purple-100/60 hover:from-indigo-200/60 hover:to-purple-200/60 text-indigo-700 border border-indigo-300/30'} transition-all duration-200 shadow-sm`}>
            <GitBranch className="h-5 w-5" />
            <span className="font-medium">Global Lineage Map</span>
          </button>
        </div>

        {/* Sources of Truth Section */}
        <div className={`${isDarkMode ? 'bg-slate-700/30 border-slate-600/50' : 'bg-white/60 border-gray-200/60'} rounded-lg border backdrop-blur-sm shadow-sm`}>
          {/* Section Header */}
          <button
            onClick={() => setIsSourcesExpanded(!isSourcesExpanded)}
            className={`w-full flex items-center justify-between px-4 py-3 ${isDarkMode ? 'hover:bg-slate-700/40' : 'hover:bg-gray-100/40'} transition-colors duration-200 rounded-t-lg`}
          >
            <div className="flex items-center space-x-3">
              {isSourcesExpanded ? (
                <ChevronDown className={`h-4 w-4 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`} />
              ) : (
                <ChevronRight className={`h-4 w-4 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`} />
              )}
              <div className="flex items-center space-x-2">
                <Database className={`h-4 w-4 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Sources of Truth</span>
              </div>
            </div>
            {totalPendingCount > 0 && (
              <span className="bg-gradient-to-r from-red-500 to-rose-500 text-white text-xs font-medium px-2 py-1 rounded-full shadow-sm">
                {totalPendingCount}
              </span>
            )}
          </button>

          {/* Tables List */}
          {isSourcesExpanded && (
            <div className="px-3 pb-3 space-y-1">
              {tables.map((table) => {
                const Icon = table.icon;
                const isSelected = selectedTable.id === table.id;
                
                return (
                  <button
                    key={table.id}
                    onClick={() => onTableSelect(table)}
                    className={`w-full flex items-center justify-between px-3 py-3 rounded-lg text-left transition-all duration-200 ${
                      isSelected
                        ? `bg-gradient-to-r from-purple-600 to-green-600 text-white shadow-md`
                        : `${isDarkMode ? 'text-slate-300 hover:bg-slate-600/40' : 'text-gray-700 hover:bg-gray-100/60'} hover:shadow-sm`
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        isSelected 
                          ? 'bg-white/20 backdrop-blur-sm' 
                          : isDarkMode ? 'bg-slate-600/50' : 'bg-gray-200/60'
                      }`}>
                        <Icon className={`h-4 w-4 ${
                          isSelected ? 'text-white' : isDarkMode ? 'text-slate-400' : 'text-gray-600'
                        }`} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-medium truncate">{table.name}</div>
                        <div className={`text-xs mt-1 ${isSelected ? 'text-white/80' : isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                          {table.count.toLocaleString()} records
                        </div>
                        {table.description && (
                          <div className={`text-xs mt-1 ${isSelected ? 'text-white/70' : isDarkMode ? 'text-slate-500' : 'text-gray-500'} line-clamp-2`}>
                            {table.description}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-2">
                      {table.pendingCount > 0 && (
                        <span className="bg-gradient-to-r from-red-500 to-rose-500 text-white text-xs font-medium px-2 py-0.5 rounded-full shadow-sm">
                          {table.pendingCount}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </nav>
      
      <div className={`p-6 border-t ${isDarkMode ? 'border-slate-700 bg-gradient-to-r from-purple-900/10 to-green-900/10' : 'border-gray-200 bg-gradient-to-r from-purple-100/20 to-green-100/20'}`}>
        <div className={`text-center ${isDarkMode ? 'bg-slate-700/40' : 'bg-white/60'} rounded-lg p-4 border ${isDarkMode ? 'border-slate-600/50' : 'border-gray-200/60'} backdrop-blur-sm shadow-sm`}>
          <div className={`text-2xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-green-400 bg-clip-text text-transparent`}>
            {tables.reduce((sum, table) => sum + table.count, 0).toLocaleString()}
          </div>
          <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-600'} font-medium mt-1`}>Total Records</p>
          <div className="mt-2">
            <span className={`text-xs ${isDarkMode ? 'text-green-400' : 'text-green-600'} font-medium`}>
              Validated & Trusted
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;