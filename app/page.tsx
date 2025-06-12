'use client'

import { useState } from 'react'
import { Search, Filter, Download, RefreshCw } from 'lucide-react'

// Simple partnership data
const partnerships = [
  {
    id: 'LL',
    name: 'Leaf Life',
    status: 'Active',
    region: 'AB',
    contact: 'contact@leaflife.ca',
    tier: 'Premium'
  },
  {
    id: 'PL',
    name: 'Plantlife',
    status: 'Active',
    region: 'AB',
    contact: 'dylan.bruck@plantlifecanada.com',
    tier: 'Standard'
  },
  {
    id: 'LUX',
    name: 'Lux',
    status: 'Active',
    region: 'AB,MB',
    contact: 'jselleck@420corp.ca',
    tier: 'Premium'
  },
  {
    id: 'F20',
    name: 'Four20',
    status: 'Active',
    region: 'AB,ON',
    contact: 'lauramurray@oneplant.ca',
    tier: 'Standard'
  },
  {
    id: 'TRN',
    name: 'True North',
    status: 'Inactive',
    region: 'ON',
    contact: null,
    tier: null
  },
  {
    id: 'GRN',
    name: 'Green Valley',
    status: 'Active',
    region: 'BC',
    contact: 'info@greenvalley.ca',
    tier: 'Premium'
  }
]

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredPartnerships = partnerships.filter(partnership => {
    const matchesSearch = partnership.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         partnership.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || partnership.status.toLowerCase() === statusFilter
    return matchesSearch && matchesStatus
  })

  const activeCount = partnerships.filter(p => p.status === 'Active').length
  const premiumCount = partnerships.filter(p => p.tier === 'Premium').length
  const regionsCount = new Set(partnerships.flatMap(p => p.region.split(','))).size

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Partnership Master Data</h1>
            <p className="text-sm text-gray-600 mt-1">
              Manage and view partnership information from your master data source
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
            <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 p-6 overflow-auto">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 font-bold text-lg">✓</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Active Partnerships</p>
                <p className="text-2xl font-bold text-gray-900">{activeCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-lg">#</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Partnerships</p>
                <p className="text-2xl font-bold text-gray-900">{partnerships.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <span className="text-yellow-600 font-bold text-lg">★</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Premium Partners</p>
                <p className="text-2xl font-bold text-gray-900">{premiumCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-purple-600 font-bold text-lg">📍</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Regions Covered</p>
                <p className="text-2xl font-bold text-gray-900">{regionsCount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Data Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          {/* Filters */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                  placeholder="Search partnerships, IDs, or regions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-3">
                <select
                  className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white min-w-[150px]"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="active">Active Only</option>
                  <option value="inactive">Inactive Only</option>
                </select>
                <button className="inline-flex items-center px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                  <Filter className="w-4 h-4 mr-2" />
                  More Filters
                </button>
              </div>
            </div>
            
            <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
              <span>
                Showing <span className="font-medium text-gray-900">{filteredPartnerships.length}</span> of{' '}
                <span className="font-medium text-gray-900">{partnerships.length}</span> partnerships
              </span>
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
                    Contact
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPartnerships.map((partnership) => (
                  <tr key={partnership.id} className="hover:bg-gray-50 transition-colors cursor-pointer">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-mono font-bold text-green-600 bg-green-50 px-2 py-1 rounded">
                        {partnership.id}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">
                        {partnership.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                        partnership.status === 'Active' 
                          ? 'bg-green-100 text-green-800 border border-green-200' 
                          : 'bg-gray-100 text-gray-800 border border-gray-200'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                          partnership.status === 'Active' ? 'bg-green-500' : 'bg-gray-400'
                        }`}></span>
                        {partnership.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {partnership.tier ? (
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${
                          partnership.tier === 'Premium'
                            ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                            : 'bg-blue-100 text-blue-800 border border-blue-200'
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
                            className="inline-flex items-center px-2 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded border border-blue-200"
                          >
                            📍 {region.trim()}
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredPartnerships.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-4xl mb-4">🔍</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No partnerships found</h3>
              <p className="text-gray-500">Try adjusting your search terms or filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}