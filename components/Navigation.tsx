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
  Bell,
  User,
  Menu,
  X
} from 'lucide-react'

interface MenuItem {
  id: string
  label: string
  icon: React.ComponentType<any>
  children?: MenuItem[]
  badge?: string
  badgeColor?: 'blue' | 'red' | 'gray' | 'green'
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
        badge: '6',
        badgeColor: 'green',
        href: '/partnerships'
      },
      {
        id: 'stores',
        label: 'Stores',
        icon: MapPin,
        badge: 'Soon',
        badgeColor: 'gray',
        href: '/stores'
      },
      {
        id: 'products',
        label: 'Products',
        icon: Package,
        badge: 'Soon',
        badgeColor: 'gray',
        href: '/products'
      },
      {
        id: 'contacts',
        label: 'Contacts',
        icon: Users,
        badge: 'Soon',
        badgeColor: 'gray',
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
        badgeColor: 'gray',
        href: '/dashboards'
      },
      {
        id: 'reports',
        label: 'Reports',
        icon: FileText,
        badge: 'Soon',
        badgeColor: 'gray',
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
        badgeColor: 'red',
        href: '/approvals'
      },
      {
        id: 'audit-trail',
        label: 'Audit Trail',
        icon: FileText,
        badge: 'Soon',
        badgeColor: 'gray',
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
        badgeColor: 'gray',
        href: '/admin/users'
      },
      {
        id: 'settings',
        label: 'System Settings',
        icon: Settings,
        badge: 'Soon',
        badgeColor: 'gray',
        href: '/admin/settings'
      }
    ]
  }
]

export function Navigation() {
  const [expandedItems, setExpandedItems] = useState<string[]>(['master-data'])
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  const getBadgeStyles = (color: string = 'blue') => {
    const styles = {
      blue: 'bg-blue-100 text-blue-700 border-blue-200',
      red: 'bg-red-100 text-red-700 border-red-200',
      gray: 'bg-gray-100 text-gray-600 border-gray-200',
      green: 'bg-green-100 text-green-700 border-green-200'
    }
    return styles[color as keyof typeof styles] || styles.blue
  }

  const renderMenuItem = (item: MenuItem, level: number = 0) => {
    const isExpanded = expandedItems.includes(item.id)
    const hasChildren = item.children && item.children.length > 0
    const isActive = item.id === 'partnerships' // Current active item

    return (
      <div key={item.id}>
        <div
          className={`
            flex items-center px-3 py-2.5 text-sm cursor-pointer transition-all duration-200 group
            ${level === 0 ? 'mx-2 rounded-lg' : 'ml-6 mr-2 rounded-md'}
            ${isActive 
              ? 'bg-green-50 text-green-800 font-medium border-l-4 border-green-500' 
              : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
            }
            ${level > 0 ? 'border-l-2 border-gray-100 ml-8 hover:border-gray-200' : ''}
          `}
          onClick={() => hasChildren ? toggleExpanded(item.id) : null}
        >
          <item.icon className={`
            ${isCollapsed ? 'w-5 h-5' : 'w-4 h-4'} 
            ${isActive ? 'text-green-600' : 'text-gray-500 group-hover:text-gray-700'}
            flex-shrink-0 transition-colors
          `} />
          
          {!isCollapsed && (
            <>
              <span className="ml-3 flex-1 font-medium">{item.label}</span>
              
              {/* Badges */}
              {item.badge && (
                <span className={`
                  ml-2 px-2 py-0.5 text-xs rounded-full font-semibold border
                  ${getBadgeStyles(item.badgeColor)}
                `}>
                  {item.badge}
                </span>
              )}
              
              {/* Expand/Collapse Icon */}
              {hasChildren && (
                <div className="ml-2">
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {/* Children */}
        {hasChildren && isExpanded && !isCollapsed && (
          <div className="mt-1 space-y-1">
            {item.children!.map(child => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md border border-gray-200"
      >
        <Menu className="w-5 h-5 text-gray-600" />
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Navigation Sidebar */}
      <div className={`
        bg-white border-r border-gray-200 flex flex-col transition-all duration-300 relative z-50
        ${isCollapsed ? 'w-16' : 'w-64'}
        ${isMobileOpen ? 'fixed inset-y-0 left-0' : 'hidden lg:flex'}
      `}>
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <div>
                <h1 className="text-lg font-bold text-gray-900">WeedMe MDM</h1>
                <p className="text-xs text-gray-500 mt-0.5">Master Data Management</p>
              </div>
            )}
            <div className="flex items-center space-x-2">
              {/* Mobile Close Button */}
              <button
                onClick={() => setIsMobileOpen(false)}
                className="lg:hidden p-1.5 rounded-md hover:bg-gray-100 transition-colors"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
              
              {/* Collapse Button */}
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="hidden lg:block p-1.5 rounded-md hover:bg-gray-100 transition-colors"
              >
                <ChevronRight className={`w-4 h-4 text-gray-500 transition-transform ${
                  isCollapsed ? 'rotate-0' : 'rotate-180'
                }`} />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        {!isCollapsed && (
          <div className="p-4 border-b border-gray-200">
            <button className="w-full flex items-center justify-center px-4 py-2.5 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 shadow-sm">
              <Plus className="w-4 h-4 mr-2" />
              Add New Data
            </button>
          </div>
        )}

        {/* Navigation Menu */}
        <nav className="flex-1 py-4 overflow-y-auto">
          <div className="space-y-2">
            {menuItems.map(item => renderMenuItem(item))}
          </div>
        </nav>

        {/* User Section */}
        <div className="border-t border-gray-200 p-4">
          {!isCollapsed ? (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-sm">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">Diego WM</p>
                <p className="text-xs text-gray-500 truncate">Data Steward</p>
              </div>
              <div className="relative">
                <Bell className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-sm">
                <User className="w-5 h-5 text-white" />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}