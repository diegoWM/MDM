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
      'Active': 'bg-gradient-to-r from-green-400 to-green-500 text-white',
      'Inactive': 'bg-gradient-to-r from-red-400 to-red-500 text-white',
      'Pending': 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900'
    };
    return colors[status as keyof typeof colors] || 'bg-gradient-to-r from-gray-400 to-gray-500 text-white';
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-purple-100 overflow-hidden">
      {/* Table Header */}
      <div className="px-8 py-6 bg-gradient-to-r from-purple-50 to-green-50 border-b border-purple-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl">
              <Icon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                {table.name}
              </h3>
              <p className="text-gray-600 font-medium">
                {filteredData.length} of {table.count} records
                {searchQuery && (
                  <span className="text-purple-600 font-semibold"> matching "{searchQuery}"</span>
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
            <thead className="bg-gradient-to-r from-purple-600 to-indigo-700">
              <tr>
                {getColumns().map((column) => (
                  <th
                    key={column}
                    className="px-8 py-4 text-left text-sm font-bold text-white uppercase tracking-wider"
                  >
                    {column.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </th>
                ))}
                <th className="px-8 py-4 text-right text-sm font-bold text-white uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-purple-100">
              {filteredData.map((item: any, index: number) => (
                <tr key={item.id || index} className="hover:bg-gradient-to-r hover:from-purple-50 hover:to-green-50 transition-all duration-200">
                  {getColumns().map((column) => (
                    <td key={column} className="px-8 py-5 whitespace-nowrap text-sm font-medium text-gray-900">
                      {column === 'status' ? (
                        <span className={`inline-flex px-3 py-1 text-xs font-bold rounded-full shadow-sm ${getStatusBadge(item[column])}`}>
                          {item[column]}
                        </span>
                      ) : (
                        item[column]
                      )}
                    </td>
                  ))}
                  <td className="px-8 py-5 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-3">
                      <button className="p-2 text-purple-600 hover:text-white hover:bg-purple-600 transition-all duration-200 rounded-lg">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-green-600 hover:text-white hover:bg-green-600 transition-all duration-200 rounded-lg">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-red-600 hover:text-white hover:bg-red-600 transition-all duration-200 rounded-lg">
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-white hover:bg-gray-600 transition-all duration-200 rounded-lg">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-16">
            <div className="p-4 bg-gradient-to-r from-purple-100 to-green-100 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
              <Icon className="h-10 w-10 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No records found</h3>
            <p className="text-gray-600 font-medium">
              {searchQuery ? `No records match "${searchQuery}"` : 'Get started by adding a new record.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TableView;