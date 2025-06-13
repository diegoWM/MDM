import React, { useState } from 'react';
import { DivideIcon as LucideIcon, ChevronDown, ChevronRight, GitBranch } from 'lucide-react';

interface Table {
  id: string;
  name: string;
  icon: LucideIcon;
  count: number;
  domain: string;
  pendingCount: number;
  qualityScore: number;
}

interface SidebarProps {
  tables: Table[];
  selectedTable: Table;
  onTableSelect: (table: Table) => void;
  isDarkMode: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ tables, selectedTable, onTableSelect, isDarkMode }) => {
  const [collapsedDomains, setCollapsedDomains] = useState<Set<string>>(new Set());

  const domains = Array.from(new Set(tables.map(table => table.domain)));

  const toggleDomain = (domain: string) => {
    const newCollapsed = new Set(collapsedDomains);
    if (newCollapsed.has(domain)) {
      newCollapsed.delete(domain);
    } else {
      newCollapsed.add(domain);
    }
    setCollapsedDomains(newCollapsed);
  };

  const getQualityColor = (score: number) => {
    if (score >= 95) return 'text-green-400';
    if (score >= 80) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getQualityBg = (score: number) => {
    if (score >= 95) return 'from-green-500/20 to-emerald-500/20';
    if (score >= 80) return 'from-yellow-500/20 to-amber-500/20';
    return 'from-red-500/20 to-rose-500/20';
  };

  return (
    <div className={`w-80 ${isDarkMode ? 'bg-gradient-to-b from-gray-900 via-slate-800 to-gray-900' : 'bg-gradient-to-b from-white via-gray-50 to-gray-100'} backdrop-blur-sm border-r ${isDarkMode ? 'border-purple-500/30' : 'border-purple-300/40'} flex flex-col shadow-2xl`}>
      <div className={`p-6 border-b ${isDarkMode ? 'border-purple-500/30 bg-gradient-to-r from-purple-900/50 to-green-900/50' : 'border-purple-300/40 bg-gradient-to-r from-purple-100/80 to-green-100/80'}`}>
        <div className="bg-gradient-to-r from-purple-300 via-yellow-300 to-green-300 bg-clip-text text-transparent">
          <h2 className="text-2xl font-bold">Data Domains</h2>
        </div>
        <p className={`${isDarkMode ? 'text-purple-200' : 'text-purple-700'} mt-2 font-semibold`}>Manage your master data</p>
      </div>
      
      <nav className="flex-1 p-6 overflow-y-auto">
        {/* Lineage Global Map */}
        <div className="mb-6">
          <button className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl ${isDarkMode ? 'bg-gradient-to-r from-indigo-600/30 to-purple-600/30 hover:from-indigo-600/40 hover:to-purple-600/40 text-indigo-300 border border-indigo-500/30' : 'bg-gradient-to-r from-indigo-100 to-purple-100 hover:from-indigo-200 hover:to-purple-200 text-indigo-700 border border-indigo-300/50'} transition-all duration-300 shadow-lg`}>
            <GitBranch className="h-5 w-5" />
            <span className="font-semibold">Global Lineage Map</span>
          </button>
        </div>

        {/* Domain Groups */}
        <div className="space-y-4">
          {domains.map((domain) => {
            const domainTables = tables.filter(table => table.domain === domain);
            const isCollapsed = collapsedDomains.has(domain);
            const domainPendingCount = domainTables.reduce((sum, table) => sum + table.pendingCount, 0);
            
            return (
              <div key={domain} className={`${isDarkMode ? 'bg-gray-800/40' : 'bg-white/60'} backdrop-blur-sm rounded-2xl border ${isDarkMode ? 'border-gray-700/50' : 'border-gray-300/50'} shadow-lg`}>
                {/* Domain Header */}
                <button
                  onClick={() => toggleDomain(domain)}
                  className={`w-full flex items-center justify-between px-6 py-4 ${isDarkMode ? 'hover:bg-gray-700/30' : 'hover:bg-gray-100/50'} transition-all duration-300 rounded-t-2xl`}
                >
                  <div className="flex items-center space-x-3">
                    {isCollapsed ? (
                      <ChevronRight className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                    ) : (
                      <ChevronDown className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                    )}
                    <span className={`font-bold text-lg ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>{domain}</span>
                  </div>
                  {domainPendingCount > 0 && (
                    <div className="flex items-center space-x-2">
                      <span className="bg-gradient-to-r from-red-500 to-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg border border-red-400/30">
                        🔔 {domainPendingCount}
                      </span>
                    </div>
                  )}
                </button>

                {/* Domain Tables */}
                {!isCollapsed && (
                  <div className="px-4 pb-4 space-y-2">
                    {domainTables.map((table, index) => {
                      const Icon = table.icon;
                      const isSelected = selectedTable.id === table.id;
                      
                      const gradients = [
                        'from-purple-600 to-indigo-600',
                        'from-green-600 to-emerald-600', 
                        'from-blue-600 to-cyan-600',
                        'from-orange-600 to-amber-600'
                      ];
                      
                      const hoverGradients = [
                        'hover:from-purple-800/40 hover:to-indigo-800/40',
                        'hover:from-green-800/40 hover:to-emerald-800/40',
                        'hover:from-blue-800/40 hover:to-cyan-800/40', 
                        'hover:from-orange-800/40 hover:to-amber-800/40'
                      ];
                      
                      const iconBgGradients = [
                        'from-purple-500/30 to-indigo-500/30',
                        'from-green-500/30 to-emerald-500/30',
                        'from-blue-500/30 to-cyan-500/30',
                        'from-orange-500/30 to-amber-500/30'
                      ];
                      
                      return (
                        <div key={table.id}>
                          <button
                            onClick={() => onTableSelect(table)}
                            className={`w-full flex items-center justify-between px-4 py-4 rounded-xl text-left transition-all duration-300 shadow-md border ${
                              isSelected
                                ? `bg-gradient-to-r ${gradients[index % gradients.length]} text-white shadow-xl transform scale-105 ${isDarkMode ? 'border-purple-400/40' : 'border-purple-300/50'}`
                                : `${isDarkMode ? 'text-gray-300 bg-gray-800/40 border-gray-700/50 hover:border-purple-500/40' : 'text-gray-700 bg-white/40 border-gray-300/50 hover:border-purple-400/50'} ${hoverGradients[index % hoverGradients.length]} hover:shadow-lg hover:transform hover:scale-102 backdrop-blur-sm`
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <div className={`p-2 rounded-lg shadow-sm border ${
                                isSelected 
                                  ? 'bg-white/20 backdrop-blur-sm border-white/20' 
                                  : `bg-gradient-to-r ${iconBgGradients[index % iconBgGradients.length]} ${isDarkMode ? 'border-gray-600/50' : 'border-gray-400/50'}`
                              }`}>
                                <Icon className={`h-5 w-5 ${
                                  isSelected ? 'text-white' : isDarkMode ? 'text-gray-300' : 'text-gray-600'
                                }`} />
                              </div>
                              <div>
                                <div className="font-semibold">{table.name}</div>
                                <div className="flex items-center space-x-2 mt-1">
                                  <span className={`text-xs ${isSelected ? 'text-white/80' : isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    {table.count} records
                                  </span>
                                  <div className={`text-xs font-bold px-2 py-1 rounded-full bg-gradient-to-r ${getQualityBg(table.qualityScore)} ${getQualityColor(table.qualityScore)}`}>
                                    {table.qualityScore}%
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              {table.pendingCount > 0 && (
                                <span className="bg-gradient-to-r from-red-500 to-rose-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md border border-red-400/30">
                                  {table.pendingCount}
                                </span>
                              )}
                              <span className={`text-sm px-3 py-1 rounded-full font-bold shadow-sm border ${
                                isSelected 
                                  ? 'bg-white/20 text-white backdrop-blur-sm border-white/20' 
                                  : `bg-gradient-to-r ${gradients[index % gradients.length]} text-white border-transparent`
                              }`}>
                                {table.count}
                              </span>
                            </div>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>
      
      <div className={`p-6 border-t ${isDarkMode ? 'border-purple-500/30 bg-gradient-to-r from-purple-900/30 to-green-900/30' : 'border-purple-300/40 bg-gradient-to-r from-purple-100/50 to-green-100/50'}`}>
        <div className={`text-center ${isDarkMode ? 'bg-gray-800/60' : 'bg-white/60'} backdrop-blur-sm rounded-2xl p-6 shadow-lg border ${isDarkMode ? 'border-purple-500/30' : 'border-purple-300/40'}`}>
          <div className="text-3xl font-bold bg-gradient-to-r from-purple-300 via-yellow-300 to-green-300 bg-clip-text text-transparent">
            {tables.reduce((sum, table) => sum + table.count, 0)}
          </div>
          <p className={`text-sm ${isDarkMode ? 'text-purple-200' : 'text-purple-700'} font-bold mt-1`}>Total Records</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;