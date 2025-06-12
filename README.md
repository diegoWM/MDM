# Master Data Management (MDM) System

## Overview
A governance-first approach to master data management that democratizes access while maintaining control over data quality and changes.

## Architecture
- **Frontend**: React/Next.js with Firebase Auth & Hosting
- **Backend**: Cloud Run (FastAPI) 
- **Database**: BigQuery (single source of truth)
- **Auth**: Firebase Auth with Google Workspace SSO

## Project Structure
```
mdm-system/
├── frontend/          # React/Next.js application
├── backend/           # FastAPI Cloud Run service  
├── infrastructure/    # Terraform/deployment configs
├── database/          # BigQuery schemas & migrations
└── docs/             # Documentation
```

## Development Phases

### Phase 1: Access & Visibility ✅ (Current)
- Read-only dashboard for Partnership data
- Firebase Auth integration
- Clean UI for non-technical users

### Phase 2: Controlled Editing (Next)
- Edit forms with validation
- Direct BigQuery writes
- Replace email/spreadsheet workflow

### Phase 3: Governance & Approval (Future)
- Staging/approval workflow
- Audit trail and history
- Full MDM governance

### Phase 4: Scale & Expand (Future)
- Additional entity types
- Advanced analytics
- Embedded dashboards

## Getting Started
1. Clone this repository
2. Set up local development environment
3. Configure GCP and Firebase projects
4. Follow phase-specific setup instructions

## Current Focus
**Partnership Master Data**: Providing clean access and editing capabilities for the Partnership_Master_List entity in BigQuery. 