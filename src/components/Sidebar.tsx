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

  const getQualityColor = (score: number) => {
    if (score >= 95) return isDarkMode ? 'text-green-400' : 'text-green-600';
    if (score >= 80) return isDarkMode ? 'text-yellow-400' : 'text-yellow-600';
    return isDarkMode ? 'text-red-400' : 'text-red-600';
  };

  const getQualityBg = (score: number) => {
    if (score >= 95) return isDarkMode ? 'bg-green-500/10' : 'bg-green-100';
    if (score >= 80) return isDarkMode ? 'bg-yellow-500/10' : 'bg-yellow-100';
    return isDarkMode ? 'bg-red-500/10' : 'bg-red-100';
  };

  return (
    <div className={`w-80 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} border-r flex flex-col`}>
      <div className={`p-6 border-b ${isDarkMode ? 'border-slate-700' : 'border-gray-200'}`}>
        <div className="flex items-center space-x-3 mb-2">
          <div className={`p-2 ${isDarkMode ? 'bg-slate-700' : 'bg-gray-100'} rounded-lg`}>
            <Shield className={`h-5 w-5 ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`} />
          </div>
          <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Data Management</h2>
        </div>
        <p className={`${isDarkMode ? 'text-slate-400' : 'text-gray-600'} text-sm`}>Authoritative data sources with validation</p>
      </div>
      
      <nav className="flex-1 p-6 overflow-y-auto">
        {/* Global Lineage Map */}
        <div className="mb-6">
          <button className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg ${isDarkMode ? 'bg-slate-700 hover:bg-slate-600 text-slate-300 border border-slate-600' : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200'} transition-colors duration-200`}>
            <GitBranch className="h-5 w-5" />
            <span className="font-medium">Global Lineage Map</span>
          </button>
        </div>

        {/* Sources of Truth Section */}
        <div className={`${isDarkMode ? 'bg-slate-700/50 border-slate-600' : 'bg-gray-50 border-gray-200'} rounded-lg border`}>
          {/* Section Header */}
          <button
            onClick={() => setIsSourcesExpanded(!isSourcesExpanded)}
            className={`w-full flex items-center justify-between px-4 py-3 ${isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-100'} transition-colors duration-200 rounded-t-lg`}
          >
            <div className="flex items-center space-x-3">
              {isSourcesExpanded ? (
                <ChevronDown className={`h-4 w-4 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`} />
              ) : (
                <ChevronRight className={`h-4 w-4 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`} />
              )}
              <div className="flex items-center space-x-2">
                <Database className={`h-4 w-4 ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`} />
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
            <div className="px-3 pb-3 space-y-1">
              {tables.map((table) => {
                const Icon = table.icon;
                const isSelected = selectedTable.id === table.id;
                
                return (
                  <button
                    key={table.id}
                    onClick={() => onTableSelect(table)}
                    className={`w-full flex items-center justify-between px-3 py-3 rounded-lg text-left transition-colors duration-200 ${
                      isSelected
                        ? `${isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white'}`
                        : `${isDarkMode ? 'text-slate-300 hover:bg-slate-600' : 'text-gray-700 hover:bg-gray-100'}`
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        isSelected 
                          ? 'bg-white/20' 
                          : isDarkMode ? 'bg-slate-600' : 'bg-gray-200'
                      }`}>
                        <Icon className={`h-4 w-4 ${
                          isSelected ? 'text-white' : isDarkMode ? 'text-slate-400' : 'text-gray-600'
                        }`} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-medium truncate">{table.name}</div>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`text-xs ${isSelected ? 'text-white/80' : isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                            {table.count.toLocaleString()} records
                          </span>
                          <div className={`text-xs font-medium px-2 py-0.5 rounded-full ${getQualityBg(table.qualityScore)} ${getQualityColor(table.qualityScore)}`}>
                            {table.qualityScore}%
                          </div>
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
                        <span className="bg-red-500 text-white text-xs font-medium px-2 py-0.5 rounded-full">
                          {table.pendingCount}
                        </span>
                      )}
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        isSelected 
                          ? 'bg-white/20 text-white' 
                          : isDarkMode ? 'bg-slate-600 text-slate-300' : 'bg-gray-200 text-gray-700'
                      }`}>
                        {table.count.toLocaleString()}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </nav>
      
      <div className={`p-6 border-t ${isDarkMode ? 'border-slate-700' : 'border-gray-200'}`}>
        <div className={`text-center ${isDarkMode ? 'bg-slate-700/50' : 'bg-gray-50'} rounded-lg p-4 border ${isDarkMode ? 'border-slate-600' : 'border-gray-200'}`}>
          <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
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