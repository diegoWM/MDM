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
  suppliers: [
    { id: 1, name: 'Tech Solutions Inc', contact: 'contact@techsol.com', location: 'New York', rating: '4.8', hasIssues: false },
    { id: 2, name: 'Global Electronics', contact: 'info@globalelec.com', location: 'California', rating: '4.5', hasIssues: false },
    { id: 3, name: 'Component Masters', contact: 'sales@compmasters.com', location: 'Texas', rating: '4.7', hasIssues: true },
  ],
  categories: [
    { id: 1, name: 'Electronics', description: 'Electronic devices and components', products: 156, hasIssues: false },
    { id: 2, name: 'Accessories', description: 'Computer and device accessories', products: 89, hasIssues: false },
    { id: 3, name: 'Software', description: 'Software licenses and applications', products: 34, hasIssues: false },
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
      'Active': 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg border border-green-400/30',
      'Inactive': 'bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-lg border border-red-400/30',
      'Pending': 'bg-gradient-to-r from-yellow-500 to-amber-500 text-gray-900 shadow-lg border border-yellow-400/30'
    };
    return colors[status as keyof typeof colors] || 'bg-gradient-to-r from-gray-500 to-slate-500 text-white shadow-lg border border-gray-400/30';
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
      <div className={`${isDarkMode ? 'bg-gradient-to-br from-gray-800/80 via-slate-800/80 to-gray-800/80' : 'bg-gradient-to-br from-white/90 via-gray-50/90 to-white/90'} backdrop-blur-sm rounded-3xl shadow-2xl border ${isDarkMode ? 'border-purple-500/30' : 'border-purple-300/40'} overflow-hidden`}>
        <div className={`px-8 py-8 ${isDarkMode ? 'bg-gradient-to-r from-purple-900/60 to-green-900/60' : 'bg-gradient-to-r from-purple-100/80 to-green-100/80'} border-b ${isDarkMode ? 'border-purple-500/30' : 'border-purple-300/40'}`}>
          <div className="flex items-center space-x-6">
            <div className="p-4 bg-gradient-to-r from-purple-600 to-green-600 rounded-2xl shadow-xl border border-purple-400/40">
              <GitBranch className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-300 via-yellow-300 to-green-300 bg-clip-text text-transparent">
                {table.name} History
              </h3>
              <p className={`${isDarkMode ? 'text-purple-200' : 'text-purple-700'} font-semibold text-lg`}>
                Change timeline and audit trail
              </p>
            </div>
          </div>
        </div>
        <div className="p-8">
          <div className="space-y-4">
            {[
              { action: 'Record Updated', user: 'John Doe', time: '2 hours ago', details: 'Modified customer email address' },
              { action: 'Bulk Import', user: 'System', time: '1 day ago', details: 'Imported 45 new records from CSV' },
              { action: 'Record Deleted', user: 'Sarah Admin', time: '3 days ago', details: 'Removed duplicate customer entry' },
            ].map((entry, index) => (
              <div key={index} className={`flex items-center space-x-4 p-4 ${isDarkMode ? 'bg-gray-800/40' : 'bg-white/60'} rounded-xl border ${isDarkMode ? 'border-gray-700/50' : 'border-gray-300/50'} shadow-md`}>
                <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
                  <Clock className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className={`font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>{entry.action}</div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{entry.details}</div>
                </div>
                <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  <div>{entry.user}</div>
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
      <div className={`${isDarkMode ? 'bg-gradient-to-br from-gray-800/80 via-slate-800/80 to-gray-800/80' : 'bg-gradient-to-br from-white/90 via-gray-50/90 to-white/90'} backdrop-blur-sm rounded-3xl shadow-2xl border ${isDarkMode ? 'border-purple-500/30' : 'border-purple-300/40'} overflow-hidden`}>
        <div className={`px-8 py-8 ${isDarkMode ? 'bg-gradient-to-r from-purple-900/60 to-green-900/60' : 'bg-gradient-to-r from-purple-100/80 to-green-100/80'} border-b ${isDarkMode ? 'border-purple-500/30' : 'border-purple-300/40'}`}>
          <div className="flex items-center space-x-6">
            <div className="p-4 bg-gradient-to-r from-purple-600 to-green-600 rounded-2xl shadow-xl border border-purple-400/40">
              <Database className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-300 via-yellow-300 to-green-300 bg-clip-text text-transparent">
                {table.name} Lineage
              </h3>
              <p className={`${isDarkMode ? 'text-purple-200' : 'text-purple-700'} font-semibold text-lg`}>
                Data flow and dependencies
              </p>
            </div>
          </div>
        </div>
        <div className="p-8">
          <div className="grid grid-cols-3 gap-6">
            <div className={`${isDarkMode ? 'bg-gray-800/40' : 'bg-white/60'} rounded-xl p-6 border ${isDarkMode ? 'border-gray-700/50' : 'border-gray-300/50'} shadow-md`}>
              <h4 className={`font-bold text-lg mb-4 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>Upstream Sources</h4>
              <div className="space-y-3">
                {['CRM Database', 'ERP System', 'External API'].map((source, index) => (
                  <div key={index} className={`flex items-center space-x-3 p-3 ${isDarkMode ? 'bg-gray-700/40' : 'bg-gray-100/60'} rounded-lg`}>
                    <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
                    <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} font-medium`}>{source}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className={`${isDarkMode ? 'bg-gray-800/40' : 'bg-white/60'} rounded-xl p-6 border ${isDarkMode ? 'border-gray-700/50' : 'border-gray-300/50'} shadow-md flex items-center justify-center`}>
              <div className="text-center">
                <div className="p-6 bg-gradient-to-r from-purple-600 to-green-600 rounded-full mx-auto mb-4">
                  <Icon className="h-12 w-12 text-white" />
                </div>
                <div className={`font-bold text-xl ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>{table.name}</div>
              </div>
            </div>
            
            <div className={`${isDarkMode ? 'bg-gray-800/40' : 'bg-white/60'} rounded-xl p-6 border ${isDarkMode ? 'border-gray-700/50' : 'border-gray-300/50'} shadow-md`}>
              <h4 className={`font-bold text-lg mb-4 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>Downstream Consumers</h4>
              <div className="space-y-3">
                {['Analytics Dashboard', 'Reporting Engine', 'ML Pipeline'].map((consumer, index) => (
                  <div key={index} className={`flex items-center space-x-3 p-3 ${isDarkMode ? 'bg-gray-700/40' : 'bg-gray-100/60'} rounded-lg`}>
                    <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
                    <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} font-medium`}>{consumer}</span>
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
    <div className={`${isDarkMode ? 'bg-gradient-to-br from-gray-800/80 via-slate-800/80 to-gray-800/80' : 'bg-gradient-to-br from-white/90 via-gray-50/90 to-white/90'} backdrop-blur-sm rounded-3xl shadow-2xl border ${isDarkMode ? 'border-purple-500/30' : 'border-purple-300/40'} overflow-hidden`}>
      {/* Table Header */}
      <div className={`px-8 py-8 ${isDarkMode ? 'bg-gradient-to-r from-purple-900/60 to-green-900/60' : 'bg-gradient-to-r from-purple-100/80 to-green-100/80'} border-b ${isDarkMode ? 'border-purple-500/30' : 'border-purple-300/40'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="p-4 bg-gradient-to-r from-purple-600 to-green-600 rounded-2xl shadow-xl border border-purple-400/40">
              <Icon className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-300 via-yellow-300 to-green-300 bg-clip-text text-transparent">
                {table.name}
              </h3>
              <p className={`${isDarkMode ? 'text-purple-200' : 'text-purple-700'} font-semibold text-lg`}>
                {filteredData.length} of {table.count} records
                {searchQuery && (
                  <span className="text-yellow-300 font-bold"> matching "{searchQuery}"</span>
                )}
              </p>
            </div>
          </div>
          
          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={`px-4 py-2 ${isDarkMode ? 'bg-gray-800/60 text-white border-gray-600' : 'bg-white/60 text-gray-800 border-gray-300'} border rounded-xl focus:ring-2 focus:ring-purple-400 outline-none`}
            >
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Pending">Pending</option>
            </select>
            
            {/* View Density Toggle */}
            <button
              onClick={() => setViewDensity(viewDensity === 'compact' ? 'relaxed' : 'compact')}
              className={`p-2 ${isDarkMode ? 'text-purple-300 hover:text-white hover:bg-purple-600/30' : 'text-purple-600 hover:text-white hover:bg-purple-500/30'} transition-all duration-300 rounded-xl border ${isDarkMode ? 'border-purple-500/30' : 'border-purple-300/40'}`}
            >
              {viewDensity === 'compact' ? <List className="h-5 w-5" /> : <Grid className="h-5 w-5" />}
            </button>
          </div>
        </div>
        
        {/* Bulk Actions */}
        {selectedRows.size > 0 && (
          <div className="mt-4 flex items-center space-x-4">
            <span className={`${isDarkMode ? 'text-purple-200' : 'text-purple-700'} font-semibold`}>
              {selectedRows.size} selected
            </span>
            <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 font-semibold shadow-lg">
              Propose Merge
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-xl hover:from-red-600 hover:to-rose-600 transition-all duration-300 font-semibold shadow-lg">
              Deactivate
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 font-semibold shadow-lg">
              Export CSV
            </button>
          </div>
        )}
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        {filteredData.length > 0 ? (
          <table className="w-full">
            <thead className={`${isDarkMode ? 'bg-gradient-to-r from-purple-800 to-green-800' : 'bg-gradient-to-r from-purple-200 to-green-200'} border-b ${isDarkMode ? 'border-purple-500/30' : 'border-purple-300/40'}`}>
              <tr>
                <th className={`px-4 py-${viewDensity === 'compact' ? '3' : '5'} text-left`}>
                  <input
                    type="checkbox"
                    checked={selectedRows.size === filteredData.length}
                    onChange={toggleAllRows}
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                </th>
                {getColumns().map((column) => (
                  <th
                    key={column}
                    className={`px-8 py-${viewDensity === 'compact' ? '3' : '5'} text-left text-sm font-bold ${isDarkMode ? 'text-purple-200' : 'text-purple-800'} uppercase tracking-wider`}
                  >
                    {column.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </th>
                ))}
                <th className={`px-8 py-${viewDensity === 'compact' ? '3' : '5'} text-right text-sm font-bold ${isDarkMode ? 'text-purple-200' : 'text-purple-800'} uppercase tracking-wider`}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className={`${isDarkMode ? 'bg-gradient-to-b from-gray-800/60 to-slate-800/60' : 'bg-gradient-to-b from-white/60 to-gray-50/60'} divide-y ${isDarkMode ? 'divide-gray-700/50' : 'divide-gray-300/50'}`}>
              {filteredData.map((item: any, index: number) => (
                <tr key={item.id || index} className={`${isDarkMode ? 'hover:bg-gradient-to-r hover:from-purple-800/30 hover:to-green-800/30' : 'hover:bg-gradient-to-r hover:from-purple-100/50 hover:to-green-100/50'} transition-all duration-300 hover:shadow-lg border-b ${isDarkMode ? 'border-gray-700/30' : 'border-gray-300/30'}`}>
                  <td className={`px-4 py-${viewDensity === 'compact' ? '3' : '6'} whitespace-nowrap`}>
                    <input
                      type="checkbox"
                      checked={selectedRows.has(item.id)}
                      onChange={() => toggleRowSelection(item.id)}
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                  </td>
                  {getColumns().map((column) => (
                    <td key={column} className={`px-8 py-${viewDensity === 'compact' ? '3' : '6'} whitespace-nowrap text-sm font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                      <div className="flex items-center space-x-2">
                        {item.hasIssues && column === getColumns()[0] && (
                          <AlertTriangle className="h-4 w-4 text-yellow-500" title="Data quality issue detected" />
                        )}
                        {column === 'status' ? (
                          <span className={`inline-flex px-4 py-2 text-xs font-bold rounded-full ${getStatusBadge(item[column])}`}>
                            {item[column]}
                          </span>
                        ) : (
                          item[column]
                        )}
                      </div>
                    </td>
                  ))}
                  <td className={`px-8 py-${viewDensity === 'compact' ? '3' : '6'} whitespace-nowrap text-right text-sm font-medium`}>
                    <div className="flex items-center justify-end space-x-3">
                      <button className={`p-3 ${isDarkMode ? 'text-purple-400 hover:text-white hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-600' : 'text-purple-600 hover:text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-indigo-500'} transition-all duration-300 rounded-xl shadow-md hover:shadow-lg transform hover:scale-110 border ${isDarkMode ? 'border-purple-500/30 hover:border-purple-400' : 'border-purple-300/40 hover:border-purple-400'}`}>
                        <Eye className="h-5 w-5" />
                      </button>
                      <button className={`p-3 ${isDarkMode ? 'text-green-400 hover:text-white hover:bg-gradient-to-r hover:from-green-600 hover:to-emerald-600' : 'text-green-600 hover:text-white hover:bg-gradient-to-r hover:from-green-500 hover:to-emerald-500'} transition-all duration-300 rounded-xl shadow-md hover:shadow-lg transform hover:scale-110 border ${isDarkMode ? 'border-green-500/30 hover:border-green-400' : 'border-green-300/40 hover:border-green-400'}`}>
                        <Edit className="h-5 w-5" />
                      </button>
                      <button className={`p-3 ${isDarkMode ? 'text-red-400 hover:text-white hover:bg-gradient-to-r hover:from-red-600 hover:to-rose-600' : 'text-red-600 hover:text-white hover:bg-gradient-to-r hover:from-red-500 hover:to-rose-500'} transition-all duration-300 rounded-xl shadow-md hover:shadow-lg transform hover:scale-110 border ${isDarkMode ? 'border-red-500/30 hover:border-red-400' : 'border-red-300/40 hover:border-red-400'}`}>
                        <Trash2 className="h-5 w-5" />
                      </button>
                      <button className={`p-3 ${isDarkMode ? 'text-blue-400 hover:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-600' : 'text-blue-600 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-500'} transition-all duration-300 rounded-xl shadow-md hover:shadow-lg transform hover:scale-110 border ${isDarkMode ? 'border-blue-500/30 hover:border-blue-400' : 'border-blue-300/40 hover:border-blue-400'}`}>
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
            <div className={`p-6 ${isDarkMode ? 'bg-gradient-to-r from-purple-700/40 to-green-700/40' : 'bg-gradient-to-r from-purple-200/60 to-green-200/60'} rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center shadow-xl border ${isDarkMode ? 'border-purple-500/40' : 'border-purple-300/50'}`}>
              <Icon className={`h-12 w-12 ${isDarkMode ? 'text-purple-300' : 'text-purple-600'}`} />
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-300 to-green-300 bg-clip-text text-transparent mb-3">
              No records found
            </h3>
            <p className={`${isDarkMode ? 'text-purple-200' : 'text-purple-700'} font-semibold text-lg`}>
              {searchQuery ? `No records match "${searchQuery}"` : 'Get started by adding a new record.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TableView;