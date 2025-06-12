'use client'

import { useState } from 'react'
import { Search, Filter, Download, RefreshCw, Building2, TrendingUp, MapPin, Users } from 'lucide-react'

// Partnership data matching your BigQuery schema
const partnerships = [
  {
    id: 'LL',
    name: 'Leaf Life',
    status: 'Active',
    region: 'AB',
    contact: 'contact@leaflife.ca',
    tier: 'Premium',
    internal_contact: 'Marina, Rori',
    source_type: 'Portal'
  },
  {
    id: 'PL',
    name: 'Plantlife',
    status: 'Active',
    region: 'AB',
    contact: 'dylan.bruck@plantlifecanada.com',
    tier: 'Standard',
    internal_contact: 'Marina, Rori',
    source_type: 'Email'
  },
  {
    id: 'LUX',
    name: 'Lux',
    status: 'Active',
    region: 'AB,MB',
    contact: 'jselleck@420corp.ca',
    tier: 'Premium',
    internal_contact: 'Marina, Rori',
    source_type: 'Email'
  },
  {
    id: 'F20',
    name: 'Four20',
    status: 'Active',
    region: 'AB,ON',
    contact: 'lauramurray@oneplant.ca',
    tier: 'Standard',
    internal_contact: 'Rori',
    source_type: 'Email'
  },
  {
    id: 'TRN',
    name: 'True North',
    status: 'Inactive',
    region: 'ON',
    contact: null,
    tier: null,
    internal_contact: null,
    source_type: null
  },
  {
    id: 'GRN',
    name: 'Green Valley',
    status: 'Active',
    region: 'BC',
    contact: 'info@greenvalley.ca',
    tier: 'Premium',
    internal_contact: 'Diego, Marina',
    source_type: 'Portal'
  }
]

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredPartnerships = partnerships.filter(partnership => {
    const matchesSearch = partnership.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         partnership.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         partnership.region.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || partnership.status.toLowerCase() === statusFilter
    return matchesSearch && matchesStatus
  })

  const activeCount = partnerships.filter(p => p.status === 'Active').length
  const premiumCount = partnerships.filter(p => p.tier === 'Premium').length
  const regionsCount = new Set(partnerships.flatMap(p => p.region.split(','))).size

  return (
    <div className="h-full flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Partnership Master Data</h1>
            <p className="text-gray-600 mt-2">
              Manage and view partnership information from your master data source
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="inline-flex items-center px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
            <button className="inline-flex items-center px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 p-6 lg:p-8 overflow-auto">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Active Partnerships</p>
                <p className="text-2xl font-bold text-gray-900">{activeCount}</p>
                <p className="text-xs text-blue-600 font-medium">+12% vs last month</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-gray-600" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Partnerships</p>
                <p className="text-2xl font-bold text-gray-900">{partnerships.length}</p>
                <p className="text-xs text-gray-500">All partnerships</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Premium Partners</p>
                <p className="text-2xl font-bold text-gray-900">{premiumCount}</p>
                <p className="text-xs text-yellow-600 font-medium">High value tier</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Regions Covered</p>
                <p className="text-2xl font-bold text-gray-900">{regionsCount}</p>
                <p className="text-xs text-purple-600 font-medium">Canadian provinces</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Data Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Filters */}
          <div className="p-6 border-b border-gray-200 bg-gray-50/50">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white shadow-sm"
                  placeholder="Search partnerships, IDs, or regions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-3">
                <select
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white min-w-[150px] shadow-sm"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="active">Active Only</option>
                  <option value="inactive">Inactive Only</option>
                </select>
                <button className="inline-flex items-center px-4 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-sm">
                  <Filter className="w-4 h-4 mr-2" />
                  More Filters
                </button>
              </div>
            </div>
            
            <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
              <span>
                Showing <span className="font-semibold text-gray-900">{filteredPartnerships.length}</span> of{' '}
                <span className="font-semibold text-gray-900">{partnerships.length}</span> partnerships
              </span>
              {(searchTerm || statusFilter !== 'all') && (
                <button
                  onClick={() => {
                    setSearchTerm('')
                    setStatusFilter('all')
                  }}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Partnership Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Tier
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Regions
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    External Contact
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Internal Team
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPartnerships.map((partnership) => (
                  <tr key={partnership.id} className="hover:bg-gray-50 transition-colors cursor-pointer">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-mono font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-md border border-blue-200">
                        {partnership.id}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Building2 className="w-4 h-4 text-gray-400 mr-3" />
                        <div className="text-sm font-semibold text-gray-900">
                          {partnership.name}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border ${
                        partnership.status === 'Active' 
                          ? 'bg-blue-50 text-blue-700 border-blue-200' 
                          : 'bg-gray-50 text-gray-700 border-gray-200'
                      }`}>
                        <span className={`w-2 h-2 rounded-full mr-2 ${
                          partnership.status === 'Active' ? 'bg-blue-500' : 'bg-gray-400'
                        }`}></span>
                        {partnership.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {partnership.tier ? (
                        <span className={`inline-flex px-3 py-1.5 rounded-full text-xs font-semibold border ${
                          partnership.tier === 'Premium'
                            ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
                            : 'bg-blue-50 text-blue-700 border-blue-200'
                        }`}>
                          {partnership.tier}
                        </span>
                      ) : (
                        <span className="text-gray-400 text-sm">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        {partnership.region.split(',').map((region, index) => (
                          <span 
                            key={index}
                            className="inline-flex items-center px-2.5 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-md border border-blue-200"
                          >
                            <MapPin className="w-3 h-3 mr-1" />
                            {region.trim()}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {partnership.contact ? (
                        <a 
                          href={`mailto:${partnership.contact}`}
                          className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                        >
                          {partnership.contact}
                        </a>
                      ) : (
                        <span className="text-sm text-gray-400">No contact</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {partnership.internal_contact ? (
                        <div className="flex items-center">
                          <Users className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-700">{partnership.internal_contact}</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredPartnerships.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🔍</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No partnerships found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your search terms or filters.</p>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setStatusFilter('all')
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}