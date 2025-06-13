import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface Table {
  id: string;
  name: string;
  icon: LucideIcon;
  count: number;
}

interface SidebarProps {
  tables: Table[];
  selectedTable: Table;
  onTableSelect: (table: Table) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ tables, selectedTable, onTableSelect }) => {
  return (
    <div className="w-80 bg-gradient-to-b from-gray-900 via-slate-800 to-gray-900 backdrop-blur-sm border-r border-purple-500/30 flex flex-col shadow-2xl">
      <div className="p-6 border-b border-purple-500/30 bg-gradient-to-r from-purple-900/50 to-green-900/50">
        <div className="bg-gradient-to-r from-purple-300 via-yellow-300 to-green-300 bg-clip-text text-transparent">
          <h2 className="text-2xl font-bold">Data Tables</h2>
        </div>
        <p className="text-purple-200 mt-2 font-semibold">Manage your master data</p>
      </div>
      
      <nav className="flex-1 p-6">
        <ul className="space-y-4">
          {tables.map((table, index) => {
            const Icon = table.icon;
            const isSelected = selectedTable.id === table.id;
            
            // Different gradient colors for each table - darker theme
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
              <li key={table.id}>
                <button
                  onClick={() => onTableSelect(table)}
                  className={`w-full flex items-center justify-between px-6 py-5 rounded-2xl text-left transition-all duration-300 shadow-lg border ${
                    isSelected
                      ? `bg-gradient-to-r ${gradients[index % gradients.length]} text-white shadow-2xl transform scale-105 border-purple-400/40`
                      : `text-gray-300 ${hoverGradients[index % hoverGradients.length]} hover:shadow-xl hover:transform hover:scale-102 bg-gray-800/40 backdrop-blur-sm border-gray-700/50 hover:border-purple-500/40`
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-xl shadow-md border ${
                      isSelected 
                        ? 'bg-white/20 backdrop-blur-sm border-white/20' 
                        : `bg-gradient-to-r ${iconBgGradients[index % iconBgGradients.length]} border-gray-600/50`
                    }`}>
                      <Icon className={`h-6 w-6 ${
                        isSelected ? 'text-white' : 'text-gray-300'
                      }`} />
                    </div>
                    <span className="font-bold text-lg">{table.name}</span>
                  </div>
                  <span className={`text-sm px-4 py-2 rounded-full font-bold shadow-md border ${
                    isSelected 
                      ? 'bg-white/20 text-white backdrop-blur-sm border-white/20' 
                      : `bg-gradient-to-r ${gradients[index % gradients.length]} text-white border-transparent`
                  }`}>
                    {table.count}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-6 border-t border-purple-500/30 bg-gradient-to-r from-purple-900/30 to-green-900/30">
        <div className="text-center bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-purple-500/30">
          <div className="text-3xl font-bold bg-gradient-to-r from-purple-300 via-yellow-300 to-green-300 bg-clip-text text-transparent">
            {tables.reduce((sum, table) => sum + table.count, 0)}
          </div>
          <p className="text-sm text-purple-200 font-bold mt-1">Total Records</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;