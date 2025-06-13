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
      'Active': 'bg-green-100 text-green-800',
      'Inactive': 'bg-red-100 text-red-800',
      'Pending': 'bg-yellow-100 text-yellow-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Table Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon className="h-6 w-6 text-blue-600" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{table.name}</h3>
              <p className="text-sm text-gray-500">
                {filteredData.length} of {table.count} records
                {searchQuery && ` matching "${searchQuery}"`}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        {filteredData.length > 0 ? (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {getColumns().map((column) => (
                  <th
                    key={column}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {column.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </th>
                ))}
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((item: any, index: number) => (
                <tr key={item.id || index} className="hover:bg-gray-50 transition-colors">
                  {getColumns().map((column) => (
                    <td key={column} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {column === 'status' ? (
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(item[column])}`}>
                          {item[column]}
                        </span>
                      ) : (
                        item[column]
                      )}
                    </td>
                  ))}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900 transition-colors">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900 transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600 transition-colors">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-12">
            <Icon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No records found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchQuery ? `No records match "${searchQuery}"` : 'Get started by adding a new record.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TableView;