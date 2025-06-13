import React from 'react';
import { Edit, Trash2, Eye, MoreHorizontal } from 'lucide-react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface Table {
  id: string;
  name: string;
  icon: LucideIcon;
  count: number;
}

interface TableViewProps {
  table: Table;
  searchQuery: string;
}

// Sample data for demonstration
const sampleData = {
  customers: [
    { id: 1, name: 'John Smith', email: 'john@example.com', status: 'Active', created: '2024-01-15' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', status: 'Active', created: '2024-01-20' },
    { id: 3, name: 'Mike Wilson', email: 'mike@example.com', status: 'Inactive', created: '2024-01-25' },
    { id: 4, name: 'Emily Davis', email: 'emily@example.com', status: 'Active', created: '2024-02-01' },
  ],
  products: [
    { id: 1, name: 'Laptop Pro', category: 'Electronics', price: '$1,299', stock: 45 },
    { id: 2, name: 'Wireless Mouse', category: 'Accessories', price: '$29', stock: 120 },
    { id: 3, name: 'Monitor 4K', category: 'Electronics', price: '$399', stock: 23 },
    { id: 4, name: 'Keyboard Mechanical', category: 'Accessories', price: '$89', stock: 67 },
  ],
  suppliers: [
    { id: 1, name: 'Tech Solutions Inc', contact: 'contact@techsol.com', location: 'New York', rating: '4.8' },
    { id: 2, name: 'Global Electronics', contact: 'info@globalelec.com', location: 'California', rating: '4.5' },
    { id: 3, name: 'Component Masters', contact: 'sales@compmasters.com', location: 'Texas', rating: '4.7' },
  ],
  categories: [
    { id: 1, name: 'Electronics', description: 'Electronic devices and components', products: 156 },
    { id: 2, name: 'Accessories', description: 'Computer and device accessories', products: 89 },
    { id: 3, name: 'Software', description: 'Software licenses and applications', products: 34 },
  ]
};

const TableView: React.FC<TableViewProps> = ({ table, searchQuery }) => {
  const data = sampleData[table.id as keyof typeof sampleData] || [];
  const Icon = table.icon;

  // Filter data based on search query
  const filteredData = data.filter((item: any) =>
    Object.values(item).some((value: any) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const getColumns = () => {
    if (data.length === 0) return [];
    return Object.keys(data[0]).filter(key => key !== 'id');
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      'Active': 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg border border-green-400/30',
      'Inactive': 'bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-lg border border-red-400/30',
      'Pending': 'bg-gradient-to-r from-yellow-500 to-amber-500 text-gray-900 shadow-lg border border-yellow-400/30'
    };
    return colors[status as keyof typeof colors] || 'bg-gradient-to-r from-gray-500 to-slate-500 text-white shadow-lg border border-gray-400/30';
  };

  return (
    <div className="bg-gradient-to-br from-gray-800/80 via-slate-800/80 to-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-purple-500/30 overflow-hidden">
      {/* Table Header */}
      <div className="px-8 py-8 bg-gradient-to-r from-purple-900/60 to-green-900/60 border-b border-purple-500/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="p-4 bg-gradient-to-r from-purple-600 to-green-600 rounded-2xl shadow-xl border border-purple-400/40">
              <Icon className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-300 via-yellow-300 to-green-300 bg-clip-text text-transparent">
                {table.name}
              </h3>
              <p className="text-purple-200 font-semibold text-lg">
                {filteredData.length} of {table.count} records
                {searchQuery && (
                  <span className="text-yellow-300 font-bold"> matching "{searchQuery}"</span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        {filteredData.length > 0 ? (
          <table className="w-full">
            <thead className="bg-gradient-to-r from-purple-800 to-green-800 border-b border-purple-500/30">
              <tr>
                {getColumns().map((column) => (
                  <th
                    key={column}
                    className="px-8 py-5 text-left text-sm font-bold text-purple-200 uppercase tracking-wider"
                  >
                    {column.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </th>
                ))}
                <th className="px-8 py-5 text-right text-sm font-bold text-purple-200 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-gradient-to-b from-gray-800/60 to-slate-800/60 divide-y divide-gray-700/50">
              {filteredData.map((item: any, index: number) => (
                <tr key={item.id || index} className="hover:bg-gradient-to-r hover:from-purple-800/30 hover:to-green-800/30 transition-all duration-300 hover:shadow-lg border-b border-gray-700/30">
                  {getColumns().map((column) => (
                    <td key={column} className="px-8 py-6 whitespace-nowrap text-sm font-semibold text-gray-200">
                      {column === 'status' ? (
                        <span className={`inline-flex px-4 py-2 text-xs font-bold rounded-full ${getStatusBadge(item[column])}`}>
                          {item[column]}
                        </span>
                      ) : (
                        item[column]
                      )}
                    </td>
                  ))}
                  <td className="px-8 py-6 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-3">
                      <button className="p-3 text-purple-400 hover:text-white hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 rounded-xl shadow-md hover:shadow-lg transform hover:scale-110 border border-purple-500/30 hover:border-purple-400">
                        <Eye className="h-5 w-5" />
                      </button>
                      <button className="p-3 text-green-400 hover:text-white hover:bg-gradient-to-r hover:from-green-600 hover:to-emerald-600 transition-all duration-300 rounded-xl shadow-md hover:shadow-lg transform hover:scale-110 border border-green-500/30 hover:border-green-400">
                        <Edit className="h-5 w-5" />
                      </button>
                      <button className="p-3 text-red-400 hover:text-white hover:bg-gradient-to-r hover:from-red-600 hover:to-rose-600 transition-all duration-300 rounded-xl shadow-md hover:shadow-lg transform hover:scale-110 border border-red-500/30 hover:border-red-400">
                        <Trash2 className="h-5 w-5" />
                      </button>
                      <button className="p-3 text-blue-400 hover:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 rounded-xl shadow-md hover:shadow-lg transform hover:scale-110 border border-blue-500/30 hover:border-blue-400">
                        <MoreHorizontal className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-20">
            <div className="p-6 bg-gradient-to-r from-purple-700/40 to-green-700/40 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center shadow-xl border border-purple-500/40">
              <Icon className="h-12 w-12 text-purple-300" />
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-300 to-green-300 bg-clip-text text-transparent mb-3">
              No records found
            </h3>
            <p className="text-purple-200 font-semibold text-lg">
              {searchQuery ? `No records match "${searchQuery}"` : 'Get started by adding a new record.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TableView;