'use client'

import { useState } from 'react'
import { Search, Building2, MapPin, Mail, Users } from 'lucide-react'

// Simple partnership data
const partnerships = [
  {
    id: 'LL',
    name: 'Leaf Life',
    status: 'Active',
    region: 'AB',
    contact: 'contact@leaflife.ca',
    tier: 'Premium',
    internal_contact: 'Marina, Rori'
  },
  {
    id: 'PL',
    name: 'Plantlife',
    status: 'Active',
    region: 'AB',
    contact: 'dylan.bruck@plantlifecanada.com',
    tier: 'Standard',
    internal_contact: 'Marina, Rori'
  },
  {
    id: 'LUX',
    name: 'Lux',
    status: 'Active',
    region: 'AB,MB',
    contact: 'jselleck@420corp.ca',
    tier: 'Premium',
    internal_contact: 'Marina, Rori'
  },
  {
    id: 'F20',
    name: 'Four20',
    status: 'Active',
    region: 'AB,ON',
    contact: 'lauramurray@oneplant.ca',
    tier: 'Standard',
    internal_contact: 'Rori'
  },
  {
    id: 'TRN',
    name: 'True North',
    status: 'Inactive',
    region: 'ON',
    contact: null,
    tier: null,
    internal_contact: null
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Weed Me - MDM</h1>
          <p className="text-gray-600 mt-1">Master Data Management System</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Building2 className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Active Partnerships</p>
                <p className="text-2xl font-bold">{partnerships.filter(p => p.status === 'Active').length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <MapPin className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Regions</p>
                <p className="text-2xl font-bold">{new Set(partnerships.flatMap(p => p.region.split(','))).size}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Premium Partners</p>
                <p className="text-2xl font-bold">{partnerships.filter(p => p.tier === 'Premium').length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow mb-6 p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search partnerships..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tier</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Region</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Internal Team</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPartnerships.map((partnership) => (
                <tr key={partnership.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-mono font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                      {partnership.id}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Building2 className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm font-medium text-gray-900">{partnership.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      partnership.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {partnership.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {partnership.tier ? (
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        partnership.tier === 'Premium'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {partnership.tier}
                      </span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {partnership.region.split(',').map((region, index) => (
                        <span key={index} className="inline-flex items-center px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                          <MapPin className="h-3 w-3 mr-1" />
                          {region.trim()}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {partnership.contact ? (
                      <a href={`mailto:${partnership.contact}`} className="text-blue-600 hover:text-blue-800 text-sm flex items-center">
                        <Mail className="h-3 w-3 mr-1" />
                        {partnership.contact}
                      </a>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {partnership.internal_contact ? (
                      <div className="flex items-center text-sm text-gray-700">
                        <Users className="h-3 w-3 mr-1" />
                        {partnership.internal_contact}
                      </div>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPartnerships.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No partnerships found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}