'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { SearchInput } from '@/components/ui/search-input'
import { FilterDropdown } from '@/components/ui/filter-dropdown'
import { DataTable } from '@/components/ui/data-table'
import { StatsCard } from '@/components/ui/stats-card'
import { 
  Search, 
  Filter, 
  RefreshCw, 
  Download, 
  Users, 
  Building2, 
  MapPin, 
  Mail,
  ExternalLink,
  TrendingUp,
  Activity
} from 'lucide-react'

// Type definition based on your BigQuery schema
interface Partnership {
  id: string
  name: string
  status: string
  region: string
  tier: string | null
  Parent_Partnership: string | null
  Parent_ID: string | null
  source_type: string | null
  source_link: string | null
  point_contact: string | null
  Internal_Contact: string | null
}

export function PartnershipDashboard() {
  const [partnerships, setPartnerships] = useState<Partnership[]>([])
  const [filteredPartnerships, setFilteredPartnerships] = useState<Partnership[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [regionFilter, setRegionFilter] = useState<string>('all')

  // Mock data based on your BigQuery table structure
  useEffect(() => {
    const mockData: Partnership[] = [
      {
        id: 'LL',
        name: 'Leaf Life',
        status: 'Active',
        region: 'AB',
        tier: 'Premium',
        Parent_Partnership: null,
        Parent_ID: null,
        source_type: 'Portal',
        source_link: null,
        point_contact: 'contact@leaflife.ca',
        Internal_Contact: 'Marina, Rori'
      },
      {
        id: 'PL',
        name: 'Plantlife',
        status: 'Active',
        region: 'AB',
        tier: 'Standard',
        Parent_Partnership: null,
        Parent_ID: null,
        source_type: 'Email',
        source_link: null,
        point_contact: 'dylan.bruck@plantlifecanada.com',
        Internal_Contact: 'Marina, Rori'
      },
      {
        id: 'LUX',
        name: 'Lux',
        status: 'Active',
        region: 'AB,MB',
        tier: 'Premium',
        Parent_Partnership: null,
        Parent_ID: null,
        source_type: 'Email',
        source_link: null,
        point_contact: 'jselleck@420corp.ca',
        Internal_Contact: 'Marina, Rori'
      },
      {
        id: 'F20',
        name: 'Four20',
        status: 'Active',
        region: 'AB,ON',
        tier: 'Standard',
        Parent_Partnership: null,
        Parent_ID: null,
        source_type: 'Email',
        source_link: null,
        point_contact: 'lauramurray@oneplant.ca',
        Internal_Contact: 'Rori'
      },
      {
        id: 'TRN',
        name: 'True North',
        status: 'Inactive',
        region: 'ON',
        tier: null,
        Parent_Partnership: null,
        Parent_ID: null,
        source_type: null,
        source_link: null,
        point_contact: null,
        Internal_Contact: null
      },
      {
        id: 'GRN',
        name: 'Green Valley',
        status: 'Active',
        region: 'BC',
        tier: 'Premium',
        Parent_Partnership: null,
        Parent_ID: null,
        source_type: 'Portal',
        source_link: null,
        point_contact: 'info@greenvalley.ca',
        Internal_Contact: 'Diego, Marina'
      },
      {
        id: 'CAN',
        name: 'Cannabis Plus',
        status: 'Active',
        region: 'ON,QC',
        tier: 'Standard',
        Parent_Partnership: null,
        Parent_ID: null,
        source_type: 'Email',
        source_link: null,
        point_contact: 'contact@cannabisplus.ca',
        Internal_Contact: 'Rori'
      }
    ]

    // Simulate API loading delay
    setTimeout(() => {
      setPartnerships(mockData)
      setFilteredPartnerships(mockData)
      setLoading(false)
    }, 1000)
  }, [])

  // Filter partnerships based on search and filters
  useEffect(() => {
    let filtered = partnerships

    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.point_contact && p.point_contact.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(p => p.status.toLowerCase() === statusFilter.toLowerCase())
    }

    if (regionFilter !== 'all') {
      filtered = filtered.filter(p => p.region.includes(regionFilter))
    }

    setFilteredPartnerships(filtered)
  }, [partnerships, searchTerm, statusFilter, regionFilter])

  const getStatusBadge = (status: string) => {
    return (
      <Badge 
        variant={status === 'Active' ? 'default' : 'secondary'}
        className={status === 'Active' ? 'bg-green-100 text-green-800 border-green-200' : 'bg-gray-100 text-gray-800 border-gray-200'}
      >
        <Activity className="w-3 h-3 mr-1" />
        {status}
      </Badge>
    )
  }

  const getTierBadge = (tier: string | null) => {
    if (!tier) return <span className="text-muted-foreground">-</span>
    
    return (
      <Badge 
        variant="outline"
        className={tier === 'Premium' ? 'border-yellow-300 text-yellow-700 bg-yellow-50' : 'border-blue-300 text-blue-700 bg-blue-50'}
      >
        {tier}
      </Badge>
    )
  }

  const getRegionTags = (region: string) => {
    const regions = region.split(',').map(r => r.trim())
    return (
      <div className="flex flex-wrap gap-1">
        {regions.map((r, index) => (
          <Badge key={index} variant="outline" className="text-xs">
            <MapPin className="w-3 h-3 mr-1" />
            {r}
          </Badge>
        ))}
      </div>
    )
  }

  const refreshData = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 500)
  }

  const exportData = () => {
    // Future implementation for CSV export
    console.log('Exporting data...', filteredPartnerships)
  }

  // Calculate stats
  const activePartnerships = partnerships.filter(p => p.status === 'Active').length
  const totalRegions = new Set(partnerships.flatMap(p => p.region.split(',').map(r => r.trim()))).size
  const premiumPartnerships = partnerships.filter(p => p.tier === 'Premium').length

  // Filter options
  const statusOptions = [
    { value: 'all', label: 'All Status', count: partnerships.length },
    { value: 'active', label: 'Active', count: partnerships.filter(p => p.status === 'Active').length },
    { value: 'inactive', label: 'Inactive', count: partnerships.filter(p => p.status === 'Inactive').length },
  ]

  const regionOptions = [
    { value: 'all', label: 'All Regions' },
    { value: 'AB', label: 'Alberta (AB)' },
    { value: 'BC', label: 'British Columbia (BC)' },
    { value: 'ON', label: 'Ontario (ON)' },
    { value: 'MB', label: 'Manitoba (MB)' },
    { value: 'QC', label: 'Quebec (QC)' },
  ]

  // Table columns
  const columns = [
    {
      key: 'id' as keyof Partnership,
      label: 'ID',
      render: (value: string) => (
        <span className="font-mono text-sm font-semibold text-primary">{value}</span>
      ),
      className: 'w-20'
    },
    {
      key: 'name' as keyof Partnership,
      label: 'Partnership Name',
      render: (value: string, row: Partnership) => (
        <div className="flex items-center space-x-2">
          <Building2 className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">{value}</span>
        </div>
      )
    },
    {
      key: 'status' as keyof Partnership,
      label: 'Status',
      render: (value: string) => getStatusBadge(value),
      className: 'w-32'
    },
    {
      key: 'tier' as keyof Partnership,
      label: 'Tier',
      render: (value: string | null) => getTierBadge(value),
      className: 'w-24'
    },
    {
      key: 'region' as keyof Partnership,
      label: 'Regions',
      render: (value: string) => getRegionTags(value),
      className: 'w-40'
    },
    {
      key: 'point_contact' as keyof Partnership,
      label: 'External Contact',
      render: (value: string | null) => (
        value ? (
          <a 
            href={`mailto:${value}`}
            className="flex items-center space-x-1 text-primary hover:text-primary/80 transition-colors"
          >
            <Mail className="h-3 w-3" />
            <span className="text-sm">{value}</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        ) : (
          <span className="text-muted-foreground">-</span>
        )
      )
    },
    {
      key: 'Internal_Contact' as keyof Partnership,
      label: 'Internal Team',
      render: (value: string | null) => (
        value ? (
          <div className="flex items-center space-x-1">
            <Users className="h-3 w-3 text-muted-foreground" />
            <span className="text-sm">{value}</span>
          </div>
        ) : (
          <span className="text-muted-foreground">-</span>
        )
      )
    },
    {
      key: 'source_type' as keyof Partnership,
      label: 'Source',
      render: (value: string | null) => (
        value ? (
          <Badge variant="outline" className="text-xs">
            {value}
          </Badge>
        ) : (
          <span className="text-muted-foreground">-</span>
        )
      ),
      className: 'w-24'
    }
  ]

  if (loading) {
    return (
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="h-12 bg-gray-200 rounded-lg animate-pulse mx-auto max-w-md"></div>
          <div className="h-6 bg-gray-200 rounded-lg animate-pulse mx-auto max-w-lg"></div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-xl animate-pulse"></div>
          ))}
        </div>

        {/* Main Card */}
        <Card>
          <CardHeader>
            <div className="h-8 bg-gray-200 rounded animate-pulse max-w-sm"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse max-w-md"></div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
              <div className="h-64 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Active Partnerships"
          value={activePartnerships}
          description="Currently active partnerships"
          icon={Building2}
          variant="success"
          trend={{ value: 12, label: "vs last month", isPositive: true }}
        />
        <StatsCard
          title="Geographic Coverage"
          value={totalRegions}
          description="Provinces covered"
          icon={MapPin}
          variant="info"
        />
        <StatsCard
          title="Premium Partners"
          value={premiumPartnerships}
          description="Premium tier partnerships"
          icon={TrendingUp}
          variant="warning"
        />
      </div>

      {/* Main Dashboard */}
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="border-b border-gray-100">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                Partnership Master Data
              </CardTitle>
              <CardDescription className="text-gray-600 mt-1">
                Manage and view partnership information from your master data source
              </CardDescription>
            </div>
            <div className="flex items-center space-x-3">
              <Button onClick={exportData} variant="outline" size="sm" className="bg-white">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button onClick={refreshData} variant="outline" size="sm" className="bg-white">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="space-y-6">
            {/* Search and Filter Controls */}
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <SearchInput
                  placeholder="Search partnerships, IDs, regions, or contacts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onClear={() => setSearchTerm('')}
                />
              </div>
              <div className="flex gap-3">
                <FilterDropdown
                  options={statusOptions}
                  value={statusFilter}
                  onValueChange={setStatusFilter}
                  placeholder="Filter by status"
                  className="w-48"
                />
                <FilterDropdown
                  options={regionOptions}
                  value={regionFilter}
                  onValueChange={setRegionFilter}
                  placeholder="Filter by region"
                  className="w-48"
                />
              </div>
            </div>

            {/* Results Summary */}
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>
                Showing <span className="font-medium text-foreground">{filteredPartnerships.length}</span> of{' '}
                <span className="font-medium text-foreground">{partnerships.length}</span> partnerships
              </span>
              {(searchTerm || statusFilter !== 'all' || regionFilter !== 'all') && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearchTerm('')
                    setStatusFilter('all')
                    setRegionFilter('all')
                  }}
                  className="text-xs"
                >
                  Clear filters
                </Button>
              )}
            </div>

            {/* Data Table */}
            <DataTable
              data={filteredPartnerships}
              columns={columns}
              onRowClick={(row) => console.log('Row clicked:', row)}
            />

            {filteredPartnerships.length === 0 && (
              <div className="text-center py-12">
                <div className="mx-auto h-24 w-24 text-gray-300 mb-4">
                  <Search className="h-full w-full" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No partnerships found</h3>
                <p className="text-gray-500 mb-4">
                  Try adjusting your search terms or filters to find what you're looking for.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm('')
                    setStatusFilter('all')
                    setRegionFilter('all')
                  }}
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}