import React, { useState } from 'react';
import { Edit, Trash2, Eye, MoreHorizontal, Filter, Grid, List, AlertTriangle, CheckCircle, Clock, GitBranch, Database } from 'lucide-react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface Table {
  id: string;
  name: string;
  icon: LucideIcon;
  count: number;
  domain: string;
  pendingCount: number;
  qualityScore: number;
}

interface TableViewProps {
  table: Table;
  searchQuery: string;
  activeView: 'data' | 'history' | 'lineage';
  isDarkMode: boolean;
}

// Sample data for demonstration
const sampleData = {
  customers: [
    { id: 1, name: 'John Smith', email: 'john@example.com', status: 'Active', created: '2024-01-15', hasIssues: false },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', status: 'Active', created: '2024-01-20', hasIssues: true },
    { id: 3, name: 'Mike Wilson', email: 'mike@example.com', status: 'Inactive', created: '2024-01-25', hasIssues: false },
    { id: 4, name: 'Emily Davis', email: 'emily@example.com', status: 'Pending', created: '2024-02-01', hasIssues: false },
  ],
  products: [
    { id: 1, name: 'Laptop Pro', category: 'Electronics', price: '$1,299', stock: 45, hasIssues: false },
    { id: 2, name: 'Wireless Mouse', category: 'Accessories', price: '$29', stock: 120, hasIssues: true },
    { id: 3, name: 'Monitor 4K', category: 'Electronics', price: '$399', stock: 23, hasIssues: false },
    { id: 4, name: 'Keyboard Mechanical', category: 'Accessories', price: '$89', stock: 67, hasIssues: false },
  ],
  locations: [
    { id: 1, name: 'New York Office', address: '123 Broadway, NY', type: 'Office', capacity: 150, hasIssues: false },
    { id: 2, name: 'LA Warehouse', address: '456 Sunset Blvd, CA', type: 'Warehouse', capacity: 500, hasIssues: false },
    { id: 3, name: 'Chicago Store', address: '789 Michigan Ave, IL', type: 'Retail', capacity: 75, hasIssues: true },
  ],
  suppliers: [
    { id: 1, name: 'Tech Solutions Inc', contact: 'contact@techsol.com', location: 'New York', rating: '4.8', hasIssues: false },
    { id: 2, name: 'Global Electronics', contact: 'info@globalelec.com', location: 'California', rating: '4.5', hasIssues: false },
    { id: 3, name: 'Component Masters', contact: 'sales@compmasters.com', location: 'Texas', rating: '4.7', hasIssues: true },
  ]
};

const TableView: React.FC<TableViewProps> = ({ table, searchQuery, activeView, isDarkMode }) => {
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [viewDensity, setViewDensity] = useState<'compact' | 'relaxed'>('relaxed');
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
    return Object.keys(data[0]).filter(key => !['id', 'hasIssues'].includes(key));
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      'Active': 'bg-green-100 text-green-800 border-green-200',
      'Inactive': 'bg-red-100 text-red-800 border-red-200',
      'Pending': 'bg-yellow-100 text-yellow-800 border-yellow-200'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const toggleRowSelection = (id: number) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRows(newSelected);
  };

  const toggleAllRows = () => {
    if (selectedRows.size === filteredData.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(filteredData.map((item: any) => item.id)));
    }
  };

  if (activeView === 'history') {
    return (
      <div className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} rounded-lg border overflow-hidden`}>
        <div className={`px-6 py-4 ${isDarkMode ? 'bg-slate-700 border-slate-600' : 'bg-gray-50 border-gray-200'} border-b`}>
          <div className="flex items-center space-x-4">
            <div className={`p-3 ${isDarkMode ? 'bg-slate-600' : 'bg-gray-200'} rounded-lg`}>
              <GitBranch className={`h-6 w-6 ${isDarkMode ? 'text-slate-300' : 'text-gray-600'}`} />
            </div>
            <div>
              <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {table.name} History
              </h3>
              <p className={`${isDarkMode ? 'text-slate-400' : 'text-gray-600'} text-sm`}>
                Change timeline and audit trail
              </p>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[
              { action: 'Record Updated', user: 'John Doe', time: '2 hours ago', details: 'Modified customer email address' },
              { action: 'Bulk Import', user: 'System', time: '1 day ago', details: 'Imported 45 new records from CSV' },
              { action: 'Record Deleted', user: 'Sarah Admin', time: '3 days ago', details: 'Removed duplicate customer entry' },
            ].map((entry, index) => (
              <div key={index} className={`flex items-center space-x-4 p-4 ${isDarkMode ? 'bg-slate-700' : 'bg-gray-50'} rounded-lg border ${isDarkMode ? 'border-slate-600' : 'border-gray-200'}`}>
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Clock className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{entry.action}</div>
                  <div className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>{entry.details}</div>
                </div>
                <div className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-600'} text-right`}>
                  <div className="font-medium">{entry.user}</div>
                  <div>{entry.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (activeView === 'lineage') {
    return (
      <div className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} rounded-lg border overflow-hidden`}>
        <div className={`px-6 py-4 ${isDarkMode ? 'bg-slate-700 border-slate-600' : 'bg-gray-50 border-gray-200'} border-b`}>
          <div className="flex items-center space-x-4">
            <div className={`p-3 ${isDarkMode ? 'bg-slate-600' : 'bg-gray-200'} rounded-lg`}>
              <Database className={`h-6 w-6 ${isDarkMode ? 'text-slate-300' : 'text-gray-600'}`} />
            </div>
            <div>
              <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {table.name} Lineage
              </h3>
              <p className={`${isDarkMode ? 'text-slate-400' : 'text-gray-600'} text-sm`}>
                Data flow and dependencies
              </p>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-3 gap-6">
            <div className={`${isDarkMode ? 'bg-slate-700 border-slate-600' : 'bg-gray-50 border-gray-200'} rounded-lg p-4 border`}>
              <h4 className={`font-medium text-sm mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Upstream Sources</h4>
              <div className="space-y-2">
                {['CRM Database', 'ERP System', 'External API'].map((source, index) => (
                  <div key={index} className={`flex items-center space-x-2 p-2 ${isDarkMode ? 'bg-slate-600' : 'bg-white'} rounded border ${isDarkMode ? 'border-slate-500' : 'border-gray-200'}`}>
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>{source}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className={`${isDarkMode ? 'bg-slate-700 border-slate-600' : 'bg-gray-50 border-gray-200'} rounded-lg p-4 border flex items-center justify-center`}>
              <div className="text-center">
                <div className={`p-4 ${isDarkMode ? 'bg-slate-600' : 'bg-gray-200'} rounded-lg mx-auto mb-3`}>
                  <Icon className={`h-8 w-8 ${isDarkMode ? 'text-slate-300' : 'text-gray-600'}`} />
                </div>
                <div className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{table.name}</div>
              </div>
            </div>
            
            <div className={`${isDarkMode ? 'bg-slate-700 border-slate-600' : 'bg-gray-50 border-gray-200'} rounded-lg p-4 border`}>
              <h4 className={`font-medium text-sm mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Downstream Consumers</h4>
              <div className="space-y-2">
                {['Analytics Dashboard', 'Reporting Engine', 'ML Pipeline'].map((consumer, index) => (
                  <div key={index} className={`flex items-center space-x-2 p-2 ${isDarkMode ? 'bg-slate-600' : 'bg-white'} rounded border ${isDarkMode ? 'border-slate-500' : 'border-gray-200'}`}>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>{consumer}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} rounded-lg border overflow-hidden`}>
      {/* Table Header */}
      <div className={`px-6 py-4 ${isDarkMode ? 'bg-slate-700 border-slate-600' : 'bg-gray-50 border-gray-200'} border-b`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`p-3 ${isDarkMode ? 'bg-slate-600' : 'bg-gray-200'} rounded-lg`}>
              <Icon className={`h-6 w-6 ${isDarkMode ? 'text-slate-300' : 'text-gray-600'}`} />
            </div>
            <div>
              <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {table.name}
              </h3>
              <p className={`${isDarkMode ? 'text-slate-400' : 'text-gray-600'} text-sm`}>
                {filteredData.length.toLocaleString()} of {table.count.toLocaleString()} records
                {searchQuery && (
                  <span className="text-blue-600 font-medium"> matching "{searchQuery}"</span>
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
              className={`px-3 py-2 ${isDarkMode ? 'bg-slate-600 text-white border-slate-500' : 'bg-white text-gray-900 border-gray-300'} border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm`}
            >
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Pending">Pending</option>
            </select>
            
            {/* View Density Toggle */}
            <button
              onClick={() => setViewDensity(viewDensity === 'compact' ? 'relaxed' : 'compact')}
              className={`p-2 ${isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-600' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'} transition-colors duration-200 rounded-lg border ${isDarkMode ? 'border-slate-600' : 'border-gray-300'}`}
            >
              {viewDensity === 'compact' ? <List className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
            </button>
          </div>
        </div>
        
        {/* Bulk Actions */}
        {selectedRows.size > 0 && (
          <div className="mt-4 flex items-center space-x-3">
            <span className={`${isDarkMode ? 'text-slate-300' : 'text-gray-700'} font-medium text-sm`}>
              {selectedRows.size} selected
            </span>
            <button className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium text-sm">
              Propose Merge
            </button>
            <button className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium text-sm">
              Deactivate
            </button>
            <button className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium text-sm">
              Export CSV
            </button>
          </div>
        )}
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        {filteredData.length > 0 ? (
          <table className="w-full">
            <thead className={`${isDarkMode ? 'bg-slate-700' : 'bg-gray-50'} border-b ${isDarkMode ? 'border-slate-600' : 'border-gray-200'}`}>
              <tr>
                <th className={`px-4 py-${viewDensity === 'compact' ? '2' : '3'} text-left`}>
                  <input
                    type="checkbox"
                    checked={selectedRows.size === filteredData.length}
                    onChange={toggleAllRows}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                {getColumns().map((column) => (
                  <th
                    key={column}
                    className={`px-4 py-${viewDensity === 'compact' ? '2' : '3'} text-left text-xs font-medium ${isDarkMode ? 'text-slate-300' : 'text-gray-500'} uppercase tracking-wider`}
                  >
                    {column.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </th>
                ))}
                <th className={`px-4 py-${viewDensity === 'compact' ? '2' : '3'} text-right text-xs font-medium ${isDarkMode ? 'text-slate-300' : 'text-gray-500'} uppercase tracking-wider`}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} divide-y ${isDarkMode ? 'divide-slate-700' : 'divide-gray-200'}`}>
              {filteredData.map((item: any, index: number) => (
                <tr key={item.id || index} className={`${isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-50'} transition-colors duration-200`}>
                  <td className={`px-4 py-${viewDensity === 'compact' ? '2' : '4'} whitespace-nowrap`}>
                    <input
                      type="checkbox"
                      checked={selectedRows.has(item.id)}
                      onChange={() => toggleRowSelection(item.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  {getColumns().map((column) => (
                    <td key={column} className={`px-4 py-${viewDensity === 'compact' ? '2' : '4'} whitespace-nowrap text-sm ${isDarkMode ? 'text-slate-300' : 'text-gray-900'}`}>
                      <div className="flex items-center space-x-2">
                        {item.hasIssues && column === getColumns()[0] && (
                          <AlertTriangle className="h-4 w-4 text-yellow-500" title="Data quality issue detected" />
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
                  <td className={`px-4 py-${viewDensity === 'compact' ? '2' : '4'} whitespace-nowrap text-right text-sm font-medium`}>
                    <div className="flex items-center justify-end space-x-2">
                      <button className={`p-2 ${isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-600' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'} transition-colors duration-200 rounded-lg`}>
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className={`p-2 ${isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-600' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'} transition-colors duration-200 rounded-lg`}>
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className={`p-2 ${isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-600' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'} transition-colors duration-200 rounded-lg`}>
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <button className={`p-2 ${isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-600' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'} transition-colors duration-200 rounded-lg`}>
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
            <div className={`p-4 ${isDarkMode ? 'bg-slate-700' : 'bg-gray-100'} rounded-lg w-16 h-16 mx-auto mb-4 flex items-center justify-center`}>
              <Icon className={`h-8 w-8 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`} />
            </div>
            <h3 className={`text-lg font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
              No records found
            </h3>
            <p className={`${isDarkMode ? 'text-slate-400' : 'text-gray-600'} text-sm`}>
              {searchQuery ? `No records match "${searchQuery}"` : 'Get started by adding a new record.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TableView;