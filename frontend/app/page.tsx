import React from 'react'
import { PartnershipDashboard } from '@/components/PartnershipDashboard'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-white to-accent/5">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative">
          <div className="container mx-auto px-4 py-16 lg:py-24">
            <div className="text-center space-y-6 max-w-4xl mx-auto">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <span className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse"></span>
                Master Data Management System
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-gray-900">
                Democratized Access with
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> Governance Controls</span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Professional master data management that empowers your team while maintaining data quality and governance standards.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Real-time data synchronization</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Enterprise-grade security</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Audit trail & compliance</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard */}
      <main className="container mx-auto px-4 py-12 lg:py-16">
        <PartnershipDashboard />
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50/50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-sm text-gray-600">
              © 2024 WeedMe Inc. Master Data Management System
            </div>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <span className="text-xs text-gray-500">Phase 1: Read-only Dashboard</span>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-500">System Operational</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}