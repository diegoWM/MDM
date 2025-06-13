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
    <div className="w-80 bg-gradient-to-b from-white via-purple-50 to-green-50 backdrop-blur-sm border-r border-purple-200 flex flex-col shadow-2xl">
      <div className="p-6 border-b border-gradient-to-r from-purple-200 to-green-200 bg-gradient-to-r from-purple-100 via-pink-100 to-green-100">
        <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-green-600 bg-clip-text text-transparent">
          <h2 className="text-2xl font-bold">Data Tables</h2>
        </div>
        <p className="text-gray-700 mt-2 font-semibold">Manage your master data</p>
      </div>
      
      <nav className="flex-1 p-6">
        <ul className="space-y-4">
          {tables.map((table, index) => {
            const Icon = table.icon;
            const isSelected = selectedTable.id === table.id;
            
            // Different gradient colors for each table
            const gradients = [
              'from-purple-500 to-pink-500',
              'from-green-500 to-teal-500', 
              'from-blue-500 to-indigo-500',
              'from-orange-500 to-red-500'
            ];
            
            const hoverGradients = [
              'hover:from-purple-100 hover:to-pink-100',
              'hover:from-green-100 hover:to-teal-100',
              'hover:from-blue-100 hover:to-indigo-100', 
              'hover:from-orange-100 hover:to-red-100'
            ];
            
            const iconBgGradients = [
              'from-purple-200 to-pink-200',
              'from-green-200 to-teal-200',
              'from-blue-200 to-indigo-200',
              'from-orange-200 to-red-200'
            ];
            
            return (
              <li key={table.id}>
                <button
                  onClick={() => onTableSelect(table)}
                  className={`w-full flex items-center justify-between px-6 py-5 rounded-2xl text-left transition-all duration-300 shadow-lg ${
                    isSelected
                      ? `bg-gradient-to-r ${gradients[index % gradients.length]} text-white shadow-2xl transform scale-105 border border-white/20`
                      : `text-gray-800 ${hoverGradients[index % hoverGradients.length]} hover:shadow-xl hover:transform hover:scale-102 bg-white/80 backdrop-blur-sm border border-purple-100`
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-xl shadow-md ${
                      isSelected 
                        ? 'bg-white/25 backdrop-blur-sm' 
                        : `bg-gradient-to-r ${iconBgGradients[index % iconBgGradients.length]}`
                    }`}>
                      <Icon className={`h-6 w-6 ${
                        isSelected ? 'text-white' : 'text-gray-700'
                      }`} />
                    </div>
                    <span className="font-bold text-lg">{table.name}</span>
                  </div>
                  <span className={`text-sm px-4 py-2 rounded-full font-bold shadow-md ${
                    isSelected 
                      ? 'bg-white/25 text-white backdrop-blur-sm' 
                      : `bg-gradient-to-r ${gradients[index % gradients.length]} text-white`
                  }`}>
                    {table.count}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-6 border-t border-purple-200 bg-gradient-to-r from-purple-100 via-pink-100 to-green-100">
        <div className="text-center bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
          <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-green-600 bg-clip-text text-transparent">
            {tables.reduce((sum, table) => sum + table.count, 0)}
          </div>
          <p className="text-sm text-gray-700 font-bold mt-1">Total Records</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;