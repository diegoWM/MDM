'use client'

import { useState } from 'react'
import { 
  ChevronDown, 
  ChevronRight,
  Database,
  Users,
  Building2,
  MapPin,
  Package,
  Settings,
  BarChart3,
  Shield,
  FileText,
  Plus,
  Search,
  Bell,
  User
} from 'lucide-react'

interface MenuItem {
  id: string
  label: string
  icon: React.ComponentType<any>
  children?: MenuItem[]
  badge?: string
  isNew?: boolean
  href?: string
}

const menuItems: MenuItem[] = [
  {
    id: 'master-data',
    label: 'Master Data',
    icon: Database,
    children: [
      {
        id: 'partnerships',
        label: 'Partnerships',
        icon: Building2,
        badge: '5',
        href: '/partnerships'
      },
      {
        id: 'stores',
        label: 'Stores',
        icon: MapPin,
        badge: 'Soon',
        href: '/stores'
      },
      {
        id: 'products',
        label: 'Products',
        icon: Package,
        badge: 'Soon',
        href: '/products'
      },
      {
        id: 'contacts',
        label: 'Contacts',
        icon: Users,
        badge: 'Soon',
        href: '/contacts'
      }
    ]
  },
  {
    id: 'analytics',
    label: 'Analytics & Reports',
    icon: BarChart3,
    children: [
      {
        id: 'dashboards',
        label: 'Dashboards',
        icon: BarChart3,
        badge: 'Soon',
        href: '/dashboards'
      },
      {
        id: 'reports',
        label: 'Reports',
        icon: FileText,
        badge: 'Soon',
        href: '/reports'
      }
    ]
  },
  {
    id: 'governance',
    label: 'Data Governance',
    icon: Shield,
    children: [
      {
        id: 'approvals',
        label: 'Pending Approvals',
        icon: Shield,
        badge: '3',
        isNew: true,
        href: '/approvals'
      },
      {
        id: 'audit-trail',
        label: 'Audit Trail',
        icon: FileText,
        badge: 'Soon',
        href: '/audit'
      }
    ]
  },
  {
    id: 'administration',
    label: 'Administration',
    icon: Settings,
    children: [
      {
        id: 'users',
        label: 'User Management',
        icon: Users,
        badge: 'Soon',
        href: '/admin/users'
      },
      {
        id: 'settings',
        label: 'System Settings',
        icon: Settings,
        badge: 'Soon',
        href: '/admin/settings'
      }
    ]
  }
]

export function Navigation() {
  const [expandedItems, setExpandedItems] = useState<string[]>(['master-data'])
  const [isCollapsed, setIsCollapsed] = useState(false)

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  const renderMenuItem = (item: MenuItem, level: number = 0) => {
    const isExpanded = expandedItems.includes(item.id)
    const hasChildren = item.children && item.children.length > 0
    const isActive = item.id === 'partnerships' // Current active item

    return (
      <div key={item.id}>
        <div
          className={`
            flex items-center px-3 py-2 text-sm cursor-pointer transition-all duration-200
            ${level === 0 ? 'mx-2 rounded-lg' : 'ml-6 mr-2 rounded-md'}
            ${isActive 
              ? 'bg-green-100 text-green-800 font-medium' 
              : 'text-gray-700 hover:bg-gray-100'
            }
            ${level > 0 ? 'border-l-2 border-gray-200 ml-8' : ''}
          `}
          onClick={() => hasChildren ? toggleExpanded(item.id) : null}
        >
          <item.icon className={`
            ${isCollapsed ? 'w-5 h-5' : 'w-4 h-4'} 
            ${isActive ? 'text-green-600' : 'text-gray-500'}
            flex-shrink-0
          `} />
          
          {!isCollapsed && (
            <>
              <span className="ml-3 flex-1">{item.label}</span>
              
              {/* Badges */}
              {item.badge && (
                <span className={`
                  ml-2 px-2 py-0.5 text-xs rounded-full font-medium
                  ${item.badge === 'Soon' 
                    ? 'bg-gray-100 text-gray-600' 
                    : item.isNew
                    ? 'bg-red-100 text-red-700'
                    : 'bg-blue-100 text-blue-700'
                  }
                `}>
                  {item.badge}
                </span>
              )}
              
              {/* Expand/Collapse Icon */}
              {hasChildren && (
                <div className="ml-2">
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {/* Children */}
        {hasChildren && isExpanded && !isCollapsed && (
          <div className="mt-1">
            {item.children!.map(child => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={`
      bg-white border-r border-gray-200 flex flex-col transition-all duration-300
      ${isCollapsed ? 'w-16' : 'w-64'}
    `}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div>
              <h1 className="text-lg font-bold text-gray-900">WeedMe MDM</h1>
              <p className="text-xs text-gray-500">Master Data Management</p>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded-md hover:bg-gray-100 transition-colors"
          >
            <ChevronRight className={`w-4 h-4 text-gray-500 transition-transform ${
              isCollapsed ? 'rotate-0' : 'rotate-180'
            }`} />
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      {!isCollapsed && (
        <div className="p-4 border-b border-gray-200">
          <button className="w-full flex items-center px-3 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors">
            <Plus className="w-4 h-4 mr-2" />
            Add New Data
          </button>
        </div>
      )}

      {/* Navigation Menu */}
      <nav className="flex-1 py-4 overflow-y-auto">
        <div className="space-y-1">
          {menuItems.map(item => renderMenuItem(item))}
        </div>
      </nav>

      {/* User Section */}
      <div className="border-t border-gray-200 p-4">
        {!isCollapsed ? (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-green-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">Diego WM</p>
              <p className="text-xs text-gray-500 truncate">Data Steward</p>
            </div>
            <Bell className="w-4 h-4 text-gray-400" />
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-green-600" />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}