# MDM System - Project Brief for Bolt AI

## 🎯 Project Overview

**Master Data Management (MDM) System** for WeedMe Inc - A governance-first approach to democratize master data access while maintaining strict control over data quality and changes.

### Business Problem
- **Current Pain**: Multiple "near-duplicate" entity lists scattered across ERP, CRM, Google Sheets, and ad-hoc uploads
- **User Frustration**: Non-technical staff can see data in Tableau but can't fix errors
- **Process Bottleneck**: Corrections require slow email + spreadsheet handoffs
- **Data Quality Issues**: Bad spellings and duplicates leak downstream to analytics and operations

### Solution Vision
Create a **professional web application** that allows:
- ✅ **Democratized Access**: Anyone can view and propose changes
- ✅ **Governance Controls**: Approval workflow prevents data chaos
- ✅ **Audit Trail**: Complete history of who changed what and when
- ✅ **Fast Visibility**: Changes visible in seconds, not 90 minutes
- ✅ **Scalable Foundation**: Start with Partnerships, expand to all master data

## 🏗️ Technical Architecture

### Current Stack (Phase 1)
- **Frontend**: React/Next.js 14 with TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Data Source**: Mock data (matches real BigQuery schema)
- **Deployment**: Local development (http://localhost:3000)

### Future Stack (Phase 2+)
- **Backend**: FastAPI on Google Cloud Run
- **Database**: BigQuery (single source of truth)
- **Authentication**: Firebase Auth with Google Workspace SSO
- **Hosting**: Firebase Hosting with global CDN

## 📊 Data Context

### Primary Entity: Partnership Master Data
Real data structure from BigQuery `Partnership_Master_List` table:

```typescript
interface Partnership {
  id: string              // e.g., "LL", "PL", "LUX"
  name: string            // e.g., "Leaf Life", "Plantlife"
  status: string          // "Active" or "Inactive"
  region: string          // "AB", "ON", "BC", "AB,MB" (Canadian provinces)
  tier: string | null     // Partnership tier (future use)
  Parent_Partnership: string | null
  Parent_ID: string | null
  source_type: string | null    // "Email", "Portal", etc.
  source_link: string | null
  point_contact: string | null  // External contact email
  Internal_Contact: string | null // Internal team members
}
```

### Sample Data (What Users See)
- **Leaf Life** (LL) - Active in AB
- **Plantlife** (PL) - Active in AB, Contact: dylan.bruck@plantlifecanada.com
- **Lux** (LUX) - Active in AB,MB, Contact: jselleck@420corp.ca
- **Four20** (F20) - Active in AB,ON, Contact: lauramurray@oneplant.ca
- **True North** (TRN) - Inactive in ON

## 👥 User Personas

### Primary Users (Non-Technical)
- **Head of Sales** - Needs to update partnership status and contacts
- **VP of Sales** - Reviews partnership performance and regions
- **Head of Marketing** - Manages partnership communications
- **Operations Analyst** - Ensures data accuracy for reporting
- **Sales Analyst** - Uses data for performance analysis

### Secondary Users (Technical)
- **Data Steward (Diego)** - Approves all changes, maintains governance
- **Analytics Team** - Consumes clean data for Tableau dashboards
- **Pipeline Engineers** - Rely on consistent data formats

## 🎨 Current UI State (Phase 1)

### What's Working ✅
- **Clean Dashboard**: Professional table displaying partnership data
- **Search Functionality**: Filter by name, ID, or region
- **Status Filtering**: Dropdown to show Active/Inactive partnerships
- **Responsive Design**: Works on desktop and mobile
- **Loading States**: Proper loading indicators
- **Data Formatting**: Clean presentation of contact info and regions

### Current Components
- `PartnershipDashboard.tsx` - Main data table component
- `Card`, `Badge`, `Button`, `Input` - shadcn/ui components
- Professional color scheme with proper contrast
- Tailwind CSS for consistent styling

## 🚀 Your Mission (UI/UX Enhancement)

### Primary Goals
1. **Elevate the Visual Design** - Make it look like a premium enterprise application
2. **Improve User Experience** - Intuitive workflows for non-technical users
3. **Add Visual Hierarchy** - Clear information architecture
4. **Enhance Interactivity** - Smooth animations and micro-interactions
5. **Prepare for Phase 2** - Design system that scales with editing features

### Specific Enhancement Areas

#### 1. Visual Design System
- **Color Palette**: Professional, modern colors that reflect data trustworthiness
- **Typography**: Clear hierarchy, excellent readability
- **Spacing**: Consistent, breathing room for complex data
- **Icons**: Meaningful icons for actions and status indicators

#### 2. Data Table Improvements
- **Advanced Filtering**: Multi-select regions, date ranges, contact types
- **Sorting**: Click column headers to sort data
- **Pagination**: Handle large datasets gracefully
- **Export Options**: CSV, Excel export functionality
- **Bulk Actions**: Select multiple rows for batch operations

#### 3. Enhanced Components
- **Status Badges**: More sophisticated status indicators
- **Contact Cards**: Rich contact information display
- **Region Tags**: Visual representation of geographic coverage
- **Search Experience**: Advanced search with suggestions and filters

#### 4. Dashboard Layout
- **Summary Cards**: Key metrics at the top (total partnerships, active/inactive counts)
- **Quick Actions**: Prominent buttons for common tasks
- **Navigation**: Prepare for multiple entity types (Partnerships, Stores, etc.)
- **Breadcrumbs**: Clear navigation hierarchy

#### 5. Responsive Excellence
- **Mobile-First**: Excellent mobile experience for field users
- **Tablet Optimization**: Perfect for managers reviewing data
- **Desktop Power**: Full feature set for power users

### Future-Proofing (Phase 2 Preparation)
- **Edit Forms**: Design system for data entry and editing
- **Approval Workflows**: UI for pending changes and approvals
- **History Views**: Timeline and audit trail displays
- **User Management**: Role-based access controls
- **Notifications**: In-app notifications for changes and approvals

## 🎯 Success Metrics

### User Experience Goals
- **Intuitive**: New users can navigate without training
- **Fast**: Sub-second interactions, smooth animations
- **Professional**: Looks like enterprise software, not a prototype
- **Accessible**: WCAG compliant, keyboard navigation
- **Trustworthy**: Users feel confident in data accuracy

### Technical Goals
- **Performance**: Fast loading, efficient rendering
- **Scalable**: Component system that grows with features
- **Maintainable**: Clean, documented code
- **Responsive**: Perfect on all device sizes

## 📁 Repository Structure

### Your Branch: `bolt_ui`
```
frontend/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles (enhance this)
│   ├── layout.tsx         # Root layout (improve this)
│   └── page.tsx           # Home page (redesign this)
├── components/
│   ├── PartnershipDashboard.tsx  # Main component (enhance this)
│   └── ui/                # Component library (expand this)
├── lib/
│   └── utils.ts           # Utilities (add more as needed)
└── package.json           # Dependencies (add what you need)
```

### Development Workflow
1. **Clone Repository**: `git clone https://github.com/diegoWM/MDM.git`
2. **Switch to Your Branch**: `git checkout bolt_ui`
3. **Install Dependencies**: `cd frontend && npm install`
4. **Start Development**: `npm run dev`
5. **View Application**: http://localhost:3000

## 🎨 Design Inspiration

### Style Direction
- **Enterprise Software**: Think Salesforce, HubSpot, modern SaaS applications
- **Data-Focused**: Clean tables, clear hierarchy, excellent readability
- **Professional**: Trustworthy, reliable, sophisticated
- **Modern**: Current design trends, but not trendy

### Reference Applications
- **Notion**: Clean, intuitive data management
- **Airtable**: Excellent table design and filtering
- **Linear**: Beautiful, fast, professional interface
- **Retool**: Enterprise data application aesthetics

## 🔄 Collaboration Process

### Your Workflow
1. **Work on `bolt_ui` branch** - Complete creative freedom
2. **Regular commits** - Push updates frequently
3. **Document changes** - Clear commit messages
4. **Test thoroughly** - Ensure responsive design works

### Integration Process
- **Diego reviews** your UI enhancements
- **Merges to `merge_test`** for integration testing
- **Combines with backend** when Phase 2 begins
- **Deploys to production** after approval

## 📞 Communication

### Questions About:
- **Business Logic**: Ask Diego about data rules and workflows
- **Technical Integration**: Coordinate with backend development
- **User Requirements**: Clarify user experience needs
- **Design Decisions**: Get feedback on major UI changes

### Deliverables
- **Enhanced UI Components**: Improved visual design
- **Better User Experience**: Intuitive workflows
- **Responsive Design**: Perfect mobile/tablet experience
- **Design System**: Scalable component library
- **Documentation**: Component usage and design decisions

---

## 🚀 Ready to Begin!

**Repository**: https://github.com/diegoWM/MDM.git  
**Your Branch**: `bolt_ui`  
**Current Demo**: http://localhost:3000 (after running `npm run dev`)  
**Goal**: Transform the functional Phase 1 dashboard into a beautiful, professional enterprise application

**Your creative expertise will make this MDM system not just functional, but delightful to use!** 🎨✨ 