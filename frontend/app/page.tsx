import React from 'react'
import { PartnershipDashboard } from '@/components/PartnershipDashboard'

export default function Home() {
  return (
    <main className="container mx-auto py-8">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            Master Data Management
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Democratized access with governance controls for your master data
          </p>
        </div>
        
        <PartnershipDashboard />
      </div>
    </main>
  )
} 