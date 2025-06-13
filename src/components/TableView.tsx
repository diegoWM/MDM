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
      'Active': 'bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 text-white shadow-lg',
      'Inactive': 'bg-gradient-to-r from-red-400 via-pink-400 to-rose-400 text-white shadow-lg',
      'Pending': 'bg-gradient-to-r from-yellow-400 via-orange-400 to-amber-400 text-gray-900 shadow-lg'
    };
    return colors[status as keyof typeof colors] || 'bg-gradient-to-r from-gray-400 to-slate-400 text-white shadow-lg';
  };

  return (
    <div className="bg-gradient-to-br from-white via-purple-50 to-green-50 backdrop-blur-sm rounded-3xl shadow-2xl border border-purple-200 overflow-hidden">
      {/* Table Header */}
      <div className="px-8 py-8 bg-gradient-to-r from-purple-200 via-pink-200 to-green-200 border-b border-purple-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="p-4 bg-gradient-to-r from-purple-500 via-pink-500 to-green-500 rounded-2xl shadow-xl">
              <Icon className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-700 via-pink-600 to-green-600 bg-clip-text text-transparent">
                {table.name}
              </h3>
              <p className="text-gray-700 font-semibold text-lg">
                {filteredData.length} of {table.count} records
                {searchQuery && (
                  <span className="text-purple-700 font-bold"> matching "{searchQuery}"</span>
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
            <thead className="bg-gradient-to-r from-purple-600 via-pink-500 to-green-500">
              <tr>
                {getColumns().map((column) => (
                  <th
                    key={column}
                    className="px-8 py-5 text-left text-sm font-bold text-white uppercase tracking-wider"
                  >
                    {column.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </th>
                ))}
                <th className="px-8 py-5 text-right text-sm font-bold text-white uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-gradient-to-b from-white to-purple-50 divide-y divide-purple-200">
              {filteredData.map((item: any, index: number) => (
                <tr key={item.id || index} className="hover:bg-gradient-to-r hover:from-purple-100 hover:via-pink-100 hover:to-green-100 transition-all duration-300 hover:shadow-lg">
                  {getColumns().map((column) => (
                    <td key={column} className="px-8 py-6 whitespace-nowrap text-sm font-semibold text-gray-800">
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
                      <button className="p-3 text-purple-600 hover:text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 transition-all duration-300 rounded-xl shadow-md hover:shadow-lg transform hover:scale-110">
                        <Eye className="h-5 w-5" />
                      </button>
                      <button className="p-3 text-green-600 hover:text-white hover:bg-gradient-to-r hover:from-green-500 hover:to-teal-500 transition-all duration-300 rounded-xl shadow-md hover:shadow-lg transform hover:scale-110">
                        <Edit className="h-5 w-5" />
                      </button>
                      <button className="p-3 text-red-600 hover:text-white hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-500 transition-all duration-300 rounded-xl shadow-md hover:shadow-lg transform hover:scale-110">
                        <Trash2 className="h-5 w-5" />
                      </button>
                      <button className="p-3 text-blue-600 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-500 transition-all duration-300 rounded-xl shadow-md hover:shadow-lg transform hover:scale-110">
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
            <div className="p-6 bg-gradient-to-r from-purple-200 via-pink-200 to-green-200 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center shadow-xl">
              <Icon className="h-12 w-12 text-purple-700" />
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-green-600 bg-clip-text text-transparent mb-3">
              No records found
            </h3>
            <p className="text-gray-700 font-semibold text-lg">
              {searchQuery ? `No records match "${searchQuery}"` : 'Get started by adding a new record.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TableView;