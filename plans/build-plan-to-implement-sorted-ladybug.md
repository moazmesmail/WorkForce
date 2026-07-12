# Recruitment Platform — Full MVP Build Plan

## Context

The app is currently a blank React shell (`src/app/App.tsx` returns an empty div). The goal is to build a complete workforce recruitment and sponsorship transfer platform MVP with three actor modules — Worker, Sponsor, and Recruitment Agency — featuring full page navigation, forms, tables, and mock data throughout. The interface must look like a professional SaaS dashboard in MUI style (clean, white, blue/green palette, table-based data views).

---

## Tech Stack & Available Packages

- **Routing:** `react-router` v7 (already installed)
- **UI Components:** `@mui/material` v7 + `@mui/icons-material` (installed) — use for all MUI-style elements
- **shadcn/ui:** Available in `src/app/components/ui/` — use for dialogs, forms, badges, tables, selects, inputs as needed
- **State:** React Context for auth/session state (no backend needed — mock data throughout)
- **Note:** `@mui/x-data-grid` is NOT installed; simulate DataGrid with MUI `Table` + custom styling

---

## File Structure

```
src/app/
├── App.tsx                          ← Router setup + route definitions
├── context/
│   └── AuthContext.tsx              ← Auth state: currentUser, role, login(), logout()
├── data/
│   └── mockData.ts                  ← All mock data for workers, jobs, requests, etc.
├── components/
│   ├── shared/
│   │   ├── DashboardLayout.tsx      ← Sidebar + TopNav wrapper for dashboard pages
│   │   ├── StatusBadge.tsx          ← Colored chip for status values
│   │   └── DataTable.tsx            ← Reusable MUI-style table component
│   ├── public/
│   │   ├── LandingPage.tsx          ← Hero + 3-actor explanation + Login/Register CTAs
│   │   ├── LoginPage.tsx            ← Login form with account type selector
│   │   └── RegisterSelectPage.tsx   ← Choose registration type
│   ├── worker/
│   │   ├── WorkerRegistration.tsx
│   │   ├── WorkerDashboard.tsx
│   │   ├── WorkerProfile.tsx
│   │   ├── WorkerDocuments.tsx
│   │   ├── WorkerSponsorshipTransfer.tsx
│   │   ├── WorkerJobOpportunities.tsx
│   │   ├── WorkerApplicationTracking.tsx
│   │   └── WorkerJobOffer.tsx
│   ├── sponsor/
│   │   ├── SponsorRegistration.tsx
│   │   ├── SponsorDashboard.tsx
│   │   ├── SponsorWorkerRequests.tsx   ← List + Create (multi-step stepper)
│   │   ├── SponsorWorkerSearch.tsx
│   │   ├── SponsorRecommendedWorkers.tsx
│   │   ├── SponsorJobOffers.tsx
│   │   └── SponsorRecruitmentApproval.tsx
│   └── agency/
│       ├── AgencyRegistration.tsx
│       ├── AgencyDashboard.tsx
│       ├── AgencyRegisterWorker.tsx
│       ├── AgencyManageWorkers.tsx
│       ├── AgencyVerifyDocuments.tsx
│       └── AgencyRecruitmentRequests.tsx
```

---

## Routes

```
/                        → LandingPage
/login                   → LoginPage
/register                → RegisterSelectPage
/register/worker         → WorkerRegistration
/register/sponsor        → SponsorRegistration
/register/agency         → AgencyRegistration

/worker/dashboard        → WorkerDashboard
/worker/profile          → WorkerProfile
/worker/documents        → WorkerDocuments
/worker/sponsorship      → WorkerSponsorshipTransfer
/worker/jobs             → WorkerJobOpportunities
/worker/applications     → WorkerApplicationTracking
/worker/offers/:id       → WorkerJobOffer

/sponsor/dashboard       → SponsorDashboard
/sponsor/requests        → SponsorWorkerRequests
/sponsor/search          → SponsorWorkerSearch
/sponsor/recommended     → SponsorRecommendedWorkers
/sponsor/offers          → SponsorJobOffers
/sponsor/approval        → SponsorRecruitmentApproval

/agency/dashboard        → AgencyDashboard
/agency/register-worker  → AgencyRegisterWorker
/agency/workers          → AgencyManageWorkers
/agency/documents        → AgencyVerifyDocuments
/agency/requests         → AgencyRecruitmentRequests
```

---

## Design Tokens

Apply globally in `src/styles/theme.css` updates or inline Tailwind:
- **Primary blue:** `#1565C0` (MUI blue[800])
- **Primary green:** `#2E7D32` (MUI green[800])
- **Background:** white `#FFFFFF`, surface `#F5F7FA`
- **Text:** `#1A1A2E` primary, `#6B7280` secondary
- **Status badge colors:** Pending=amber, Active/Approved/Verified=green, Rejected=red, Reviewing=blue

---

## Implementation Steps

### 1. Setup routing and auth context
- Configure `react-router` in `App.tsx` with `BrowserRouter` + `Routes`
- Create `AuthContext.tsx` with `currentUser` (name, role: `'worker'|'sponsor'|'agency'`), `login()`, `logout()`
- Create `mockData.ts` with realistic mock arrays for workers, jobs, applications, sponsorship requests, recruitment requests

### 2. Public pages
- **LandingPage:** Hero section with headline, 3-actor description (Worker / Agency / Sponsor), Login and Register buttons. Use MUI `Box`, `Typography`, `Button`. Simple icon + text layout in a row for the 3 actors.
- **LoginPage:** `Card` with account type tab selector (Worker / Agency / Sponsor), Email + Password fields, Login button that sets auth context and redirects to appropriate dashboard
- **RegisterSelectPage:** 3 option cards or list items linking to each registration form

### 3. Registration forms (Worker, Sponsor, Agency)
- Standard MUI `TextField`, `Select`, `RadioGroup` fields per spec
- Single-page forms with section dividers
- "Register" button sets auth context and redirects to dashboard

### 4. Shared Dashboard Layout (`DashboardLayout.tsx`)
- Fixed left sidebar (240px) with logo, nav links (icons + text), logout button
- Top app bar with user name + role indicator
- Main content area with `children` slot
- Sidebar nav items defined per role, passed as props

### 5. StatusBadge component
- Accepts `status` string, maps to color variant (green/amber/red/blue/gray)
- Uses MUI `Chip` with `size="small"` and appropriate `color`

### 6. DataTable component
- Wraps MUI `Table` with `TableHead`, `TableBody`, `TableRow`, `TableCell`
- Accepts `columns` (label, key, render?) and `rows` arrays
- Includes search field (`TextField`) above table and pagination (`TablePagination`) below
- Optional column filter `Select` dropdowns

### 7. Worker module (8 pages)
- **Dashboard:** Profile info table (key-value pairs), quick action buttons
- **Profile:** Editable form with sections (Basic, Contact, Employment, Sponsorship, Documents), Save button
- **Documents:** DataTable with Name/Upload Date/Status/Actions columns; Upload/View/Replace actions via Dialog
- **Sponsorship Transfer:** Current status display, request form if eligible, history table
- **Job Opportunities:** DataTable with job listings; "View Details" Dialog + "Apply" opens apply form Dialog
- **Apply for Job:** Form in Dialog (Desired Title, Location, Expected Salary, Availability Date, Message)
- **Application Tracking:** DataTable with Job/Employer/Date/Status/Actions; "View Offer" button for offers
- **Job Offer:** Detail view of employer info + job info + Accept/Reject buttons with confirm Dialog

### 8. Sponsor module (6 pages)
- **Dashboard:** Summary row (4 stat boxes), Recent activity table
- **Worker Requests:** Table of existing requests + "Create New Request" button → 3-step stepper Dialog (Step 1: Job Info, Step 2: Worker Requirements, Step 3: Employment Details)
- **Worker Search:** DataTable with search + filters (nationality, job title, experience); "Send Offer" Dialog
- **Recommended Workers:** Table (no scores) + "Send Offer" action
- **Job Offers:** Table of sent offers with Status and Cancel action
- **Recruitment Approval:** Two tab sections — Recruitment Approval table + Sponsorship Transfer Approval table; Approve/Reject buttons with confirm Dialog

### 9. Agency module (5 pages)
- **Dashboard:** Summary stats (total workers, pending verification, submitted requests); two mini-tables
- **Register Worker:** Full form (Basic, Contact, Employment, Sponsorship, Documents sections)
- **Manage Workers:** DataTable with search; "Edit" opens edit Dialog, "View" opens profile Dialog
- **Verify Documents:** DataTable with Worker Name/Document/Date/Status/Actions; Verify/Reject buttons
- **Recruitment Requests:** DataTable with Request ID/Sponsor/Job/Workers/Date/Status/Actions

### 10. Global styling
- Update `src/styles/theme.css` to set primary color variables to blue/green
- Ensure white background, clean typography
- MUI theme override: primary=`#1565C0`, secondary=`#2E7D32`

---

## Mock Data Strategy

`mockData.ts` exports:
- `workers[]` — 10-15 worker profiles with name, nationality, jobTitle, experience, city, verificationStatus, sponsorshipStatus
- `jobs[]` — 8-10 job listings with title, location, salaryRange, experience, accommodation, status
- `applications[]` — worker's applications linked to jobs
- `sponsorshipRequests[]` — worker's transfer requests
- `workerRequests[]` — sponsor's worker requests with statuses
- `jobOffers[]` — offers sent by sponsor
- `recruitmentRequests[]` — agency's request table
- `documents[]` — worker document records

---

## Verification

1. Navigate to `/` → Landing page renders with CTAs
2. Click Login → Login page with account type selector
3. Login as Worker → redirects to `/worker/dashboard`, sidebar shows worker nav
4. Click each worker nav item → correct page loads with populated table/form
5. Login as Sponsor → sidebar shows sponsor nav, all 6 pages accessible
6. Login as Agency → sidebar shows agency nav, all 5 pages accessible
7. Test dialogs: Apply for job, Send offer, Approve/Reject confirmations open and close correctly
8. Test multi-step stepper on Sponsor → Worker Requests → Create New Request (3 steps)
9. Verify no percentage scores or AI indicators appear anywhere
10. Verify all tables show mock data with correct columns per spec
