'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Filter, RefreshCw } from 'lucide-react'

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

  // Mock data based on your BigQuery table structure
  // In Phase 2, this will be replaced with actual API calls
  useEffect(() => {
    const mockData: Partnership[] = [
      {
        id: 'LL',
        name: 'Leaf Life',
        status: 'Active',
        region: 'AB',
        tier: null,
        Parent_Partnership: null,
        Parent_ID: null,
        source_type: null,
        source_link: null,
        point_contact: null,
        Internal_Contact: null
      },
      {
        id: 'PL',
        name: 'Plantlife',
        status: 'Active',
        region: 'AB',
        tier: null,
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
        tier: null,
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
        tier: null,
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
      }
    ]

    // Simulate API loading delay
    setTimeout(() => {
      setPartnerships(mockData)
      setFilteredPartnerships(mockData)
      setLoading(false)
    }, 1000)
  }, [])

  // Filter partnerships based on search and status
  useEffect(() => {
    let filtered = partnerships

    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.region.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(p => p.status.toLowerCase() === statusFilter.toLowerCase())
    }

    setFilteredPartnerships(filtered)
  }, [partnerships, searchTerm, statusFilter])

  const getStatusBadge = (status: string) => {
    const variant = status === 'Active' ? 'default' : 'secondary'
    return <Badge variant={variant}>{status}</Badge>
  }

  const refreshData = () => {
    setLoading(true)
    // In Phase 2, this will trigger an API call
    setTimeout(() => setLoading(false), 500)
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Partnership Master Data</CardTitle>
          <CardDescription>Loading partnership information...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <RefreshCw className="h-8 w-8 animate-spin" />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Partnership Master Data</CardTitle>
            <CardDescription>
              Manage and view partnership information from your master data source
            </CardDescription>
          </div>
          <Button onClick={refreshData} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Search and Filter Controls */}
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search partnerships..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-input bg-background rounded-md text-sm"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Results Summary */}
          <div className="text-sm text-muted-foreground">
            Showing {filteredPartnerships.length} of {partnerships.length} partnerships
          </div>

          {/* Partnership Table */}
          <div className="border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-4 font-medium">ID</th>
                    <th className="text-left p-4 font-medium">Name</th>
                    <th className="text-left p-4 font-medium">Status</th>
                    <th className="text-left p-4 font-medium">Region</th>
                    <th className="text-left p-4 font-medium">Contact</th>
                    <th className="text-left p-4 font-medium">Internal Contact</th>
                    <th className="text-left p-4 font-medium">Source</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPartnerships.map((partnership, index) => (
                    <tr key={partnership.id} className={index % 2 === 0 ? 'bg-background' : 'bg-muted/25'}>
                      <td className="p-4 font-mono text-sm">{partnership.id}</td>
                      <td className="p-4 font-medium">{partnership.name}</td>
                      <td className="p-4">{getStatusBadge(partnership.status)}</td>
                      <td className="p-4">{partnership.region}</td>
                      <td className="p-4 text-sm">
                        {partnership.point_contact ? (
                          <a 
                            href={`mailto:${partnership.point_contact}`}
                            className="text-primary hover:underline"
                          >
                            {partnership.point_contact}
                          </a>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </td>
                      <td className="p-4 text-sm">
                        {partnership.Internal_Contact || <span className="text-muted-foreground">-</span>}
                      </td>
                      <td className="p-4 text-sm">
                        {partnership.source_type ? (
                          <Badge variant="outline">{partnership.source_type}</Badge>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {filteredPartnerships.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No partnerships found matching your criteria.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
} 