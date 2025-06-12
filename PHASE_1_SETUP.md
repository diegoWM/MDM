# Phase 1 Setup Guide - MDM System

## Overview
Phase 1 creates a **read-only dashboard** for your Partnership data. This gives non-technical users a clean interface to view and search partnership information without needing BigQuery access.

## What You'll Get
- ✅ Professional React dashboard displaying Partnership data
- ✅ Search and filter capabilities
- ✅ Clean, modern UI that's mobile-responsive
- ✅ Foundation for Phase 2 (editing capabilities)

## Prerequisites
- Node.js 18+ installed
- Git installed
- Access to your GCP project with BigQuery

## Installation Steps

### 1. Install Dependencies
```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend
npm install

# Add missing Tailwind plugin
npm install tailwindcss-animate
```

### 2. Environment Configuration
```bash
# Copy the example environment file
cp env.example .env.local

# Edit .env.local with your actual values:
# - Firebase project details (we'll set this up in Phase 2)
# - Your GCP project ID
# - BigQuery dataset name
```

### 3. Run the Development Server
```bash
# From the frontend directory
npm run dev
```

The application will be available at `http://localhost:3000`

## Current State (Phase 1)
- **Data Source**: Mock data based on your BigQuery schema
- **Authentication**: Not implemented yet (Phase 2)
- **Editing**: Read-only (Phase 2 will add editing)
- **BigQuery Integration**: Mock data (Phase 2 will connect to real data)

## What's Working Now
1. **Partnership Dashboard**: Clean table view of partnership data
2. **Search**: Filter by name, ID, or region
3. **Status Filtering**: Filter by Active/Inactive status
4. **Responsive Design**: Works on desktop and mobile
5. **Professional UI**: Modern, clean interface

## Next Steps (Phase 2)
- Connect to real BigQuery data
- Add Firebase authentication
- Add editing capabilities
- Add form validation
- Add real-time updates

## File Structure
```
frontend/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/
│   ├── PartnershipDashboard.tsx  # Main dashboard component
│   └── ui/                # Reusable UI components
├── lib/
│   └── utils.ts           # Utility functions
└── package.json           # Dependencies
```

## Troubleshooting

### TypeScript Errors
The TypeScript errors you see are expected until dependencies are installed. Run `npm install` to resolve them.

### Port Already in Use
If port 3000 is busy, Next.js will automatically use the next available port (3001, 3002, etc.).

### Styling Issues
Make sure Tailwind CSS is properly configured. The `globals.css` file should be imported in `layout.tsx`.

## Testing the Dashboard
1. Open `http://localhost:3000`
2. You should see the "Master Data Management" title
3. The Partnership table should load with sample data
4. Try searching for "Leaf" or "AB" to test filtering
5. Use the status dropdown to filter by Active/Inactive

## Ready for Phase 2?
Once Phase 1 is working, we'll add:
- Real BigQuery data connection
- Firebase authentication
- Edit forms and validation
- Approval workflow preparation 