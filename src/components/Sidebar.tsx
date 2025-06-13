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
    <div className="w-72 bg-white/95 backdrop-blur-sm border-r border-purple-100 flex flex-col shadow-xl">
      <div className="p-6 border-b border-gradient-to-r from-purple-100 to-green-100">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
          <h2 className="text-xl font-bold">Data Tables</h2>
        </div>
        <p className="text-gray-600 mt-2 font-medium">Manage your master data</p>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-3">
          {tables.map((table) => {
            const Icon = table.icon;
            const isSelected = selectedTable.id === table.id;
            
            return (
              <li key={table.id}>
                <button
                  onClick={() => onTableSelect(table)}
                  className={`w-full flex items-center justify-between px-4 py-4 rounded-xl text-left transition-all duration-200 ${
                    isSelected
                      ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg transform scale-105'
                      : 'text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-green-50 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-lg ${
                      isSelected 
                        ? 'bg-white/20' 
                        : 'bg-gradient-to-r from-purple-100 to-green-100'
                    }`}>
                      <Icon className={`h-5 w-5 ${
                        isSelected ? 'text-white' : 'text-purple-600'
                      }`} />
                    </div>
                    <span className="font-semibold">{table.name}</span>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full font-bold ${
                    isSelected 
                      ? 'bg-white/20 text-white' 
                      : 'bg-gradient-to-r from-green-100 to-yellow-100 text-purple-700'
                  }`}>
                    {table.count}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-6 border-t border-purple-100 bg-gradient-to-r from-purple-50 to-green-50">
        <div className="text-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-green-600 bg-clip-text text-transparent">
            {tables.reduce((sum, table) => sum + table.count, 0)}
          </div>
          <p className="text-sm text-gray-600 font-medium">Total Records</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;