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
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Data Tables</h2>
        <p className="text-sm text-gray-500 mt-1">Manage your master data</p>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {tables.map((table) => {
            const Icon = table.icon;
            const isSelected = selectedTable.id === table.id;
            
            return (
              <li key={table.id}>
                <button
                  onClick={() => onTableSelect(table)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
                    isSelected
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`h-5 w-5 ${isSelected ? 'text-blue-600' : 'text-gray-400'}`} />
                    <span className="font-medium">{table.name}</span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    isSelected ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {table.count}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <div className="text-xs text-gray-500">
          <p>Total Records: {tables.reduce((sum, table) => sum + table.count, 0)}</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;