import React, { useState } from 'react';
import { Eye, Edit, Trash2, MoreHorizontal, Filter, Users, AlertTriangle, Clock, Download } from 'lucide-react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface Table {
  id: string;
  name: string;
  icon: LucideIcon;
  count: number;
  activeCount?: number;
  description?: string;
}

interface TableViewProps {
  table: Table;
  searchQuery: string;
  activeView: 'data' | 'history' | 'lineage';
  currentEnvironment: 'staging' | 'production';
  selectedRows: Set<number>;
  onSelectedRowsChange: (rows: Set<number>) => void;
}

// Sample data for demonstration
const sampleData = {
  customers: [
    { id: 1, name: 'John Smith', email: 'john@example.com', status: 'Active', created: '2024-01-15', hasIssues: false, hasPendingChanges: true },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', status: 'Active', created: '2024-01-20', hasIssues: true, hasPendingChanges: false },
    { id: 3, name: 'Mike Wilson', email: 'mike@example.com', status: 'Inactive', created: '2024-01-25', hasIssues: false, hasPendingChanges: false },
    { id: 4, name: 'Emily Davis', email: 'emily@example.com', status: 'Pending', created: '2024-02-01', hasIssues: false, hasPendingChanges: true },
  ],
  products: [
    { id: 1, name: 'Laptop Pro', category: 'Electronics', price: '$1,299', stock: 45, hasIssues: false, hasPendingChanges: false },
    { id: 2, name: 'Wireless Mouse', category: 'Accessories', price: '$29', stock: 120, hasIssues: true, hasPendingChanges: true },
    { id: 3, name: 'Monitor 4K', category: 'Electronics', price: '$399', stock: 23, hasIssues: false, hasPendingChanges: false },
    { id: 4, name: 'Keyboard Mechanical', category: 'Accessories', price: '$89', stock: 67, hasIssues: false, hasPendingChanges: true },
  ],
  locations: [
    { id: 1, name: 'New York Office', address: '123 Broadway, NY', type: 'Office', capacity: 150, hasIssues: false, hasPendingChanges: false },
    { id: 2, name: 'LA Warehouse', address: '456 Sunset Blvd, CA', type: 'Warehouse', capacity: 500, hasIssues: false, hasPendingChanges: true },
    { id: 3, name: 'Chicago Store', address: '789 Michigan Ave, IL', type: 'Retail', capacity: 75, hasIssues: true, hasPendingChanges: false },
  ],
  suppliers: [
    { id: 1, name: 'Tech Solutions Inc', contact: 'contact@techsol.com', location: 'New York', rating: '4.8', hasIssues: false, hasPendingChanges: false },
    { id: 2, name: 'Global Electronics', contact: 'info@globalelec.com', location: 'California', rating: '4.5', hasIssues: false, hasPendingChanges: true },
    { id: 3, name: 'Component Masters', contact: 'sales@compmasters.com', location: 'Texas', rating: '4.7', hasIssues: true, hasPendingChanges: false },
  ]
};

const TableView: React.FC<TableViewProps> = ({ 
  table, 
  searchQuery, 
  activeView, 
  currentEnvironment,
  selectedRows,
  onSelectedRowsChange
}) => {
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const data = sampleData[table.id as keyof typeof sampleData] || [];
  const Icon = table.icon;

  // Filter data based on search query and status
  const filteredData = data.filter((item: any) => {
    const matchesSearch = Object.values(item).some((value: any) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    );
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getColumns = () => {
    if (data.length === 0) return [];
    return Object.keys(data[0]).filter(key => !['id', 'hasIssues', 'hasPendingChanges'].includes(key));
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      'Active': 'bg-green-500/20 text-green-300 border-green-500/50',
      'Inactive': 'bg-red-500/20 text-red-300 border-red-500/50',
      'Pending': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-500/20 text-gray-300 border-gray-500/50';
  };

  const toggleRowSelection = (id: number) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    onSelectedRowsChange(newSelected);
  };

  const toggleAllRows = () => {
    if (selectedRows.size === filteredData.length) {
      onSelectedRowsChange(new Set());
    } else {
      onSelectedRowsChange(new Set(filteredData.map((item: any) => item.id)));
    }
  };

  if (activeView !== 'data') {
    return (
      <div className="bg-gray-800/95 rounded-xl border border-gray-700 overflow-hidden shadow-xl backdrop-blur-sm">
        <div className="px-6 py-5 bg-gray-700/50 border-b border-gray-600">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gray-600/50 rounded-xl shadow-lg border border-gray-600">
              <Icon className="h-6 w-6 text-gray-300" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">
                {table.name} {activeView === 'history' ? 'History' : 'Lineage'}
              </h3>
              <p className="text-gray-400 text-sm">
                {activeView === 'history' ? 'Change timeline and audit trail' : 'Data flow and dependencies'}
              </p>
            </div>
          </div>
        </div>
        <div className="p-12">
          <div className="text-center">
            <div className="p-4 bg-gray-700/50 rounded-xl w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Icon className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">
              {activeView === 'history' ? 'History View' : 'Lineage View'}
            </h3>
            <p className="text-gray-400">
              This view is coming soon.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800/95 rounded-xl border border-gray-700 overflow-hidden shadow-xl backdrop-blur-sm">
      {/* Table Header */}
      <div className="px-6 py-5 bg-gray-700/50 border-b border-gray-600">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gray-600/50 rounded-xl shadow-lg border border-gray-600">
              <Icon className="h-6 w-6 text-gray-300" />
            </div>
            <div>
              <div className="flex items-center space-x-3 mb-1">
                <h3 className="text-xl font-semibold text-white">
                  {table.name}
                </h3>
                <span className="bg-green-500/20 text-green-300 text-xs font-medium px-3 py-1 rounded-full border border-green-500/50">
                  STAGING
                </span>
              </div>
              <p className="text-gray-400 text-sm">
                {filteredData.length.toLocaleString()} of {table.count.toLocaleString()} records
                {searchQuery && (
                  <span className="text-green-400 font-medium"> matching "{searchQuery}"</span>
                )}
              </p>
            </div>
          </div>
          
          {/* Controls */}
          <div className="flex items-center space-x-3">
            {/* Status Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-10 pr-8 py-2 bg-gray-700/50 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm appearance-none backdrop-blur-sm"
              >
                <option value="all">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>
        </div>

        {/* KPIs Section - Only show for Customer Master */}
        {table.id === 'customers' && table.activeCount && (
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="bg-gray-600/30 rounded-lg p-4 border border-gray-600/50">
              <div className="text-2xl font-bold text-white">{table.count.toLocaleString()}</div>
              <div className="text-sm text-gray-400">Total Records</div>
            </div>
            <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/30">
              <div className="text-2xl font-bold text-green-400">{table.activeCount.toLocaleString()}</div>
              <div className="text-sm text-green-300">Active Records</div>
            </div>
          </div>
        )}
        
        {/* Bulk Actions */}
        {selectedRows.size > 0 && (
          <div className="mt-4 flex items-center justify-between p-4 bg-green-500/10 rounded-lg border border-green-500/30 backdrop-blur-sm">
            <span className="text-green-300 font-medium">
              {selectedRows.size} record{selectedRows.size > 1 ? 's' : ''} selected
            </span>
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 bg-orange-500/80 hover:bg-orange-500 text-white rounded-lg transition-all duration-200 font-medium backdrop-blur-sm">
                Propose Changes
              </button>
              <button className="px-4 py-2 bg-blue-500/80 hover:bg-blue-500 text-white rounded-lg transition-all duration-200 font-medium backdrop-blur-sm">
                Request Review
              </button>
              <button className="px-4 py-2 bg-green-500/80 hover:bg-green-500 text-white rounded-lg transition-all duration-200 font-medium flex items-center space-x-2 backdrop-blur-sm">
                <Download className="h-4 w-4" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        {filteredData.length > 0 ? (
          <table className="w-full">
            <thead className="bg-gray-700/30 border-b border-gray-600">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedRows.size === filteredData.length}
                    onChange={toggleAllRows}
                    className="rounded border-gray-500 text-green-500 focus:ring-green-500 bg-gray-700 w-4 h-4"
                  />
                </th>
                {getColumns().map((column) => (
                  <th
                    key={column}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                  >
                    {column.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </th>
                ))}
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800/50 divide-y divide-gray-700">
              {filteredData.map((item: any, index: number) => (
                <tr key={item.id || index} className="hover:bg-gray-700/30 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedRows.has(item.id)}
                      onChange={() => toggleRowSelection(item.id)}
                      className="rounded border-gray-500 text-green-500 focus:ring-green-500 bg-gray-700 w-4 h-4"
                    />
                  </td>
                  {getColumns().map((column) => (
                    <td key={column} className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      <div className="flex items-center space-x-2">
                        {item.hasIssues && column === getColumns()[0] && (
                          <AlertTriangle className="h-4 w-4 text-yellow-400" title="Data quality issue detected" />
                        )}
                        {item.hasPendingChanges && column === getColumns()[0] && (
                          <Clock className="h-4 w-4 text-orange-400" title="Pending changes awaiting approval" />
                        )}
                        {column === 'status' ? (
                          <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full border ${getStatusBadge(item[column])}`}>
                            {item[column]}
                          </span>
                        ) : (
                          <span>{item[column]}</span>
                        )}
                      </div>
                    </td>
                  ))}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-1">
                      <button className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 transition-all duration-200 rounded-lg" title="View details">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-green-400 hover:bg-green-500/10 transition-all duration-200 rounded-lg" title="Edit record">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 rounded-lg" title="Delete record">
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-600/50 transition-all duration-200 rounded-lg" title="More actions">
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
            <div className="p-4 bg-gray-700/50 rounded-xl w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Icon className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">
              No records found
            </h3>
            <p className="text-gray-400">
              {searchQuery ? `No records match "${searchQuery}"` : 'Get started by adding a new record.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TableView;