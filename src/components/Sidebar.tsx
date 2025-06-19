import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Database, ChevronLeft, GitBranch, Users, Package, Building, BarChart3 } from 'lucide-react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface Table {
  id: string;
  name: string;
  icon: LucideIcon;
  count: number;
  description?: string;
}

interface Section {
  id: string;
  name: string;
  icon: LucideIcon;
  tables: Table[];
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
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['sources-of-truth']));

  // Group tables into sections
  const sections: Section[] = [
    {
      id: 'sources-of-truth',
      name: 'Sources of Truth',
      icon: Database,
      tables: tables,
      description: 'Master data repositories'
    },
    {
      id: 'analytics',
      name: 'Analytics',
      icon: BarChart3,
      tables: [],
      description: 'Data insights and reports'
    },
    {
      id: 'governance',
      name: 'Data Governance',
      icon: Users,
      tables: [],
      description: 'Quality and compliance'
    }
  ];

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  if (collapsed) {
    return (
      <div className="w-16 bg-gray-800/95 border-r border-gray-700 flex flex-col shadow-xl backdrop-blur-sm">
        <div className="p-4 border-b border-gray-700">
          <button
            onClick={onToggleCollapse}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 transition-all duration-200 rounded-lg w-full"
            title="Expand sidebar"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
        
        <nav className="flex-1 px-3 py-4 space-y-2">
          {sections.map((section) => {
            const Icon = section.icon;
            const isActive = section.id === 'sources-of-truth' && section.tables.some(table => table.id === selectedTable.id);
            
            return (
              <button
                key={section.id}
                className={`w-full p-2.5 rounded-lg transition-all duration-200 relative group ${
                  isActive
                    ? 'bg-green-500/20 text-green-400 shadow-lg shadow-green-500/10'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
                title={section.name}
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
            title="Collapse sidebar"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <nav className="flex-1 p-6 overflow-y-auto space-y-4">
        {/* Sections */}
        {sections.map((section) => {
          const Icon = section.icon;
          const isExpanded = expandedSections.has(section.id);
          const isActive = section.id === 'sources-of-truth' && section.tables.some(table => table.id === selectedTable.id);
          
          return (
            <div key={section.id}>
              <button
                onClick={() => toggleSection(section.id)}
                className={`w-full flex items-center justify-between px-4 py-3 hover:bg-gray-700/50 transition-all duration-200 rounded-lg group ${
                  isActive ? 'bg-green-500/10 border border-green-500/30' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg transition-colors duration-200 ${
                    isActive 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-gray-700/50 text-gray-400 group-hover:bg-gray-600/50 group-hover:text-white'
                  }`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="text-left">
                    <div className={`font-semibold ${isActive ? 'text-green-400' : 'text-white'}`}>
                      {section.name}
                    </div>
                    <div className={`text-xs ${isActive ? 'text-green-300' : 'text-gray-500'}`}>
                      {section.description}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {section.tables.length > 0 && (
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      isActive 
                        ? 'bg-green-500/20 text-green-300' 
                        : 'bg-gray-700 text-gray-400'
                    }`}>
                      {section.tables.length}
                    </span>
                  )}
                  {section.tables.length > 0 && (
                    isExpanded ? (
                      <ChevronDown className={`h-4 w-4 ${isActive ? 'text-green-400' : 'text-gray-400'}`} />
                    ) : (
                      <ChevronRight className={`h-4 w-4 ${isActive ? 'text-green-400' : 'text-gray-400'}`} />
                    )
                  )}
                </div>
              </button>

              {/* Tables List - Only show for Sources of Truth when expanded */}
              {isExpanded && section.tables.length > 0 && (
                <div className="mt-2 ml-4 space-y-1">
                  {section.tables.map((table) => {
                    const TableIcon = table.icon;
                    const isSelected = selectedTable.id === table.id;
                    
                    return (
                      <button
                        key={table.id}
                        onClick={() => onTableSelect(table)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all duration-200 group ${
                          isSelected
                            ? 'bg-green-500/20 text-green-400 shadow-lg shadow-green-500/10 border border-green-500/30'
                            : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center space-x-3 min-w-0 flex-1">
                          <div className={`p-2 rounded-lg transition-colors duration-200 ${
                            isSelected 
                              ? 'bg-green-500/30' 
                              : 'bg-gray-700/50 group-hover:bg-gray-600/50'
                          }`}>
                            <TableIcon className="h-4 w-4" />
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
                        <div className={`text-xs px-2 py-1 rounded-full ${
                          isSelected 
                            ? 'bg-green-500/20 text-green-300' 
                            : 'bg-gray-700 text-gray-400 group-hover:bg-gray-600'
                        }`}>
                          {table.count.toLocaleString()}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Coming Soon for empty sections */}
              {isExpanded && section.tables.length === 0 && (
                <div className="mt-2 ml-4 px-4 py-3 text-center">
                  <div className="text-gray-500 text-sm">Coming Soon</div>
                </div>
              )}
            </div>
          );
        })}
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