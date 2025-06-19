import React, { useState } from 'react';
import { Eye, Edit, Trash2, MoreHorizontal, Grid, Users, AlertTriangle, Clock } from 'lucide-react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface Table {
  id: string;
  name: string;
  icon: LucideIcon;
  count: number;
  pendingCount: number;
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
      'Active': 'bg-green-500/20 text-green-400 border-green-500/30',
      'Inactive': 'bg-red-500/20 text-red-400 border-red-500/30',
      'Pending': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
    };
    return colors[status as keyof typeof colors] || 'bg-slate-500/20 text-slate-400 border-slate-500/30';
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
      <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
        <div className="px-6 py-4 bg-slate-700 border-b border-slate-600">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-slate-600 rounded-lg">
              <Icon className="h-6 w-6 text-slate-300" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">
                {table.name} {activeView === 'history' ? 'History' : 'Lineage'}
              </h3>
              <p className="text-slate-400 text-sm">
                {activeView === 'history' ? 'Change timeline and audit trail' : 'Data flow and dependencies'}
              </p>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="text-center py-12">
            <div className="p-4 bg-slate-700 rounded-lg w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Icon className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">
              {activeView === 'history' ? 'History View' : 'Lineage View'}
            </h3>
            <p className="text-slate-400 text-sm">
              This view is coming soon.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
      {/* Table Header */}
      <div className="px-6 py-4 bg-slate-700 border-b border-slate-600">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-slate-600 rounded-lg">
              <Icon className="h-6 w-6 text-slate-300" />
            </div>
            <div>
              <div className="flex items-center space-x-3">
                <h3 className="text-xl font-semibold text-white">
                  {table.name}
                </h3>
                <span className="bg-blue-500/20 text-blue-400 text-xs font-medium px-2 py-1 rounded-full border border-blue-500/30">
                  STAGING
                </span>
              </div>
              <p className="text-slate-400 text-sm">
                4 of {table.count.toLocaleString()} records
                {searchQuery && (
                  <span className="text-blue-400 font-medium"> matching "{searchQuery}"</span>
                )}
              </p>
            </div>
          </div>
          
          {/* Controls */}
          <div className="flex items-center space-x-3">
            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-slate-600 text-white border border-slate-500 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
            >
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Pending">Pending</option>
            </select>
            
            {/* View Toggle */}
            <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-600 transition-colors duration-200 rounded-md border border-slate-600">
              <Grid className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        {/* Bulk Actions */}
        {selectedRows.size > 0 && (
          <div className="mt-4 flex items-center space-x-3">
            <span className="text-slate-300 font-medium text-sm">
              {selectedRows.size} selected
            </span>
            <button className="px-3 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors duration-200 font-medium text-sm">
              Propose Changes
            </button>
            <button className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium text-sm">
              Request Review
            </button>
            <button className="px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 font-medium text-sm">
              Export CSV
            </button>
          </div>
        )}
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        {filteredData.length > 0 ? (
          <table className="w-full">
            <thead className="bg-slate-700 border-b border-slate-600">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedRows.size === filteredData.length}
                    onChange={toggleAllRows}
                    className="rounded border-slate-500 text-blue-600 focus:ring-blue-500 bg-slate-600"
                  />
                </th>
                {getColumns().map((column) => (
                  <th
                    key={column}
                    className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider"
                  >
                    {column.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </th>
                ))}
                <th className="px-4 py-3 text-right text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-slate-800 divide-y divide-slate-700">
              {filteredData.map((item: any, index: number) => (
                <tr key={item.id || index} className="hover:bg-slate-700 transition-colors duration-200">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedRows.has(item.id)}
                      onChange={() => toggleRowSelection(item.id)}
                      className="rounded border-slate-500 text-blue-600 focus:ring-blue-500 bg-slate-600"
                    />
                  </td>
                  {getColumns().map((column) => (
                    <td key={column} className="px-4 py-4 whitespace-nowrap text-sm text-slate-300">
                      <div className="flex items-center space-x-2">
                        {item.hasIssues && column === getColumns()[0] && (
                          <AlertTriangle className="h-4 w-4 text-yellow-500" title="Data quality issue detected" />
                        )}
                        {item.hasPendingChanges && column === getColumns()[0] && (
                          <Clock className="h-4 w-4 text-orange-500" title="Pending changes awaiting approval" />
                        )}
                        {column === 'status' ? (
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getStatusBadge(item[column])}`}>
                            {item[column]}
                          </span>
                        ) : (
                          item[column]
                        )}
                      </div>
                    </td>
                  ))}
                  <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="p-2 text-slate-400 hover:text-blue-400 hover:bg-slate-600 transition-colors duration-200 rounded-md">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-green-400 hover:bg-slate-600 transition-colors duration-200 rounded-md">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-600 transition-colors duration-200 rounded-md">
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-600 transition-colors duration-200 rounded-md">
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
            <div className="p-4 bg-slate-700 rounded-lg w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Icon className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">
              No records found
            </h3>
            <p className="text-slate-400 text-sm">
              {searchQuery ? `No records match "${searchQuery}"` : 'Get started by adding a new record.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TableView;