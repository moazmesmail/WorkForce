Design and build a complete modern MVP website prototype for a workforce recruitment and sponsorship transfer platform connecting three actors:

1. Worker
2. Recruitment Agency
3. Sponsor (Employer)

The platform helps:
- Workers create and manage profiles, upload documents, find job opportunities, apply for jobs, receive offers, and manage sponsorship transfer requests.
- Recruitment agencies register workers, manage worker profiles, verify documents, submit sponsorship transfer requests, and track recruitment requests.
- Sponsors register, create worker requests, search workers, view recommended workers, send job offers, and approve recruitment and sponsorship transfer requests.

====================================
GENERAL WEBSITE REQUIREMENTS
====================================

Build a complete responsive website prototype.

Technology/UI style reference:
- React Material UI (MUI) style interface
- Professional SaaS dashboard
- Clean white background
- Blue and green primary colors
- Modern typography
- Tables instead of cards for displaying data
- Lists, forms, dialogs, and data grids
- Sidebar navigation dashboards
- Responsive desktop and mobile layouts
- Simple and professional UI suitable for startup pitch presentation

Avoid:
- Complex animations
- Excessive illustrations
- Card-based layouts for data display
- Matching percentages or scoring systems
- AI score indicators

Use:
- MUI DataGrid style tables
- Search fields
- Filter dropdowns
- Pagination
- Status badges
- Forms
- Dialog confirmations
- Stepper forms


====================================
WEBSITE STRUCTURE
====================================

Create:

Public Pages:
- Landing Page
- Login Page
- Registration Selection Page

Authentication:
- Worker Login
- Recruitment Agency Login
- Sponsor Login


After login:

Worker → Worker Dashboard

Recruitment Agency → Agency Dashboard

Sponsor → Sponsor Dashboard


====================================
LANDING PAGE
====================================

Create homepage with:

Sections:
- Platform introduction
- Explain connection between:
  Workers
  Recruitment Agencies
  Sponsors

Buttons:
- Login
- Register


Registration selection:

User chooses:

- Register as Worker
- Register as Recruitment Agency
- Register as Sponsor


====================================
AUTHENTICATION
====================================

Create login pages.

Fields:

- Mobile Number or Email
- Password

Account Type Selection:

- Worker
- Recruitment Agency
- Sponsor


====================================
1. WORKER MODULE
====================================


Create worker dashboard application.


------------------------------------
Worker Registration
------------------------------------

Form fields:

Basic Information:

- Full Name
- Nationality
- Gender
- Date of Birth
- Current City


Contact Information:

- Mobile Number
- Email (optional)


------------------------------------
Worker Dashboard
------------------------------------

Create dashboard with:

Profile information table:

Fields:
- Full Name
- Nationality
- Job Title
- Years of Experience
- Current City
- Employment Status
- Availability Status
- Sponsorship Status
- Document Verification Status


Actions:

- Update Profile
- Upload Documents
- Request Sponsorship Transfer
- View Job Opportunities
- Track Applications


------------------------------------
Worker Profile Management
------------------------------------

Create editable profile page.

Sections:


Basic Information:

- Full Name
- Nationality
- Gender
- Date of Birth
- Current City


Contact Information:

- Mobile Number
- Email


Employment Information:

- Job Title
- Years of Experience
- Current Employment Status

Options:
- Available
- Employed


- Preferred Work Location


Sponsorship:

- Current Sponsorship Status

Options:
- Sponsored
- Needs Sponsorship Transfer


Documents:

- National ID or Passport Number
- Resume (optional)


------------------------------------
Document Upload
------------------------------------

Create document management page.

Use table layout:

Columns:

- Document Name
- Upload Date
- Status
- Action


Documents:

- National ID / Passport
- Resume


Actions:

- Upload
- View
- Replace


------------------------------------
Sponsorship Transfer Request
------------------------------------

Create page:

Show:

Current Sponsorship Status

Request Status:

- Pending
- Approved
- Rejected


Allow worker to submit sponsorship transfer request.


------------------------------------
Job Opportunities
------------------------------------

Create job listing page using MUI table.

Columns:

- Job Title
- Location
- Salary Range
- Required Experience
- Accommodation Provided
- Status
- Actions


Actions:

- View Details
- Apply


------------------------------------
Apply For Job
------------------------------------

Form:

Job Preference:

- Desired Job Title
- Preferred Work Location
- Expected Salary (optional)
- Availability Date


Application Message:

- Short Introduction
- Additional Notes


------------------------------------
Application Tracking
------------------------------------

Create application table.

Columns:

- Job Title
- Employer
- Location
- Application Date
- Status
- Actions


Status:

- Applied
- Employer Reviewing
- Offer Received
- Accepted
- Rejected


------------------------------------
Job Offer Response
------------------------------------

Create offer page.

Display:

- Employer Information
- Job Information
- Employment Details


Actions:

- Accept Offer
- Reject Offer



====================================
2. SPONSOR MODULE
====================================


Create sponsor dashboard application.


------------------------------------
Sponsor Registration
------------------------------------

Fields:

Basic Information:

- Full Name or Company Name

Sponsor Type:

- Individual
- Company


- City
- Address


Contact Information:

- Mobile Number
- Email


Identification:

- National ID
- Commercial Registration Number


------------------------------------
Sponsor Dashboard
------------------------------------

Create dashboard with tables.

Summary:

- Active Worker Requests
- Recommended Workers
- Pending Applications
- Completed Recruitment


Navigation:

- Profile
- Worker Requests
- Search Workers
- Recommended Workers
- Job Offers
- Recruitment Approval


------------------------------------
Create Worker Request
------------------------------------

Create multi-step form.


Step 1: Job Information

Fields:

- Job Title

Examples:

- Driver
- Cleaner
- Housekeeper
- Construction Worker


- Number of Workers Needed
- Job Description (optional)
- Required Skills (optional)


Required Experience:

- No experience
- 1-3 years
- 3+ years


Step 2: Worker Requirements

Fields:

- Preferred Nationality
- Preferred Gender
- Age Range
- Language Requirements


Step 3: Employment Details

Fields:

- Work Location
- City
- Region
- Salary Range
- Working Hours
- Contract Duration
- Accommodation Provided

Options:

- Yes
- No


Transportation Provided:

- Yes
- No


Request Status:

Display:

- Pending
- Reviewing Matches
- Candidates Selected
- Completed
- Cancelled


------------------------------------
Worker Search
------------------------------------

Create worker search page.

Use MUI DataGrid.

Columns:

- Name
- Job Title
- Nationality
- Experience
- Current Location
- Sponsorship Status
- Document Verification Status
- Actions


Features:

- Search
- Filters
- Sorting
- Pagination


Actions:

- View Profile
- Send Offer


------------------------------------
Recommended Workers
------------------------------------

Create recommended workers page.

Do NOT show percentage scores.

Use table:

Columns:

- Worker Name
- Job Title
- Nationality
- Experience
- Location
- Sponsorship Status
- Verification Status
- Actions


Actions:

- View Profile
- Send Offer


------------------------------------
Job Offer Management
------------------------------------

Create job offer table.

Columns:

- Worker Name
- Job Title
- Offer Date
- Status
- Actions


Actions:

- Send Offer
- Cancel Offer


------------------------------------
Recruitment Approval
------------------------------------

Create pages:

Recruitment Approval:

Table:

- Worker Name
- Job Title
- Request Date
- Status
- Actions


Actions:

- Approve
- Reject


Sponsorship Transfer Approval:

Table:

- Worker Name
- Current Sponsorship Status
- Request Status
- Actions



====================================
3. RECRUITMENT AGENCY MODULE
====================================


Create agency dashboard application.


------------------------------------
Agency Registration
------------------------------------

Fields:

- Agency Name
- License Number
- Contact Information


------------------------------------
Agency Dashboard
------------------------------------

Show:

Tables:

Workers:

- Total Workers
- Pending Verification


Recruitment Requests:

- Submitted Requests
- Request Status


Navigation:

- Profile
- Register Worker
- Manage Workers
- Verify Documents
- Recruitment Requests


------------------------------------
Register Worker On Behalf Of Worker
------------------------------------

Create worker registration form.

Fields:


Basic Information:

- Full Name
- Nationality
- Gender
- Date of Birth
- Current City


Contact:

- Mobile Number
- Email


Employment:

- Job Title
- Years of Experience
- Employment Status
- Preferred Work Location


Sponsorship:

- Current Sponsorship Status


Documents:

- National ID / Passport Number
- Resume


------------------------------------
Manage Worker Profiles
------------------------------------

Use MUI DataGrid.

Columns:

- Name
- Job Title
- Nationality
- Experience
- Location
- Verification Status
- Actions


Actions:

- View
- Edit


------------------------------------
Verify Worker Documents
------------------------------------

Document verification table.

Columns:

- Worker Name
- Document Type
- Upload Date
- Status
- Actions


Statuses:

- Pending Verification
- Verified
- Rejected


Actions:

- Verify
- Reject


------------------------------------
Recruitment Requests
------------------------------------

Create request management table.

Columns:

- Request ID
- Sponsor
- Required Job
- Number of Workers
- Submission Date
- Status
- Actions


Statuses:

- Pending
- Reviewing Matches
- Candidates Selected
- Completed
- Cancelled


====================================
GLOBAL COMPONENTS
====================================

Create reusable components:

- Sidebar navigation
- Top navigation bar
- User menu
- MUI DataGrid tables
- Forms
- Dialogs
- Stepper forms
- Search bars
- Filters
- Status chips
- Timelines
- Buttons


====================================
FINAL IMPLEMENTATION REQUIREMENTS
====================================

Create a complete MVP website prototype.

The prototype must include all modules:

Worker:
- Registration
- Login
- Dashboard
- Profile management
- Documents
- Sponsorship transfer
- Job browsing
- Job application
- Application tracking
- Offer response


Sponsor:
- Registration
- Login
- Dashboard
- Profile management
- Worker request creation
- Worker search
- Recommended workers
- Job offers
- Recruitment approval
- Sponsorship transfer approval


Recruitment Agency:
- Registration
- Login
- Dashboard
- Register workers
- Manage workers
- Verify documents
- Recruitment requests


Important:
- Use tables and lists for all data management screens.
- Do not use worker cards.
- Do not display matching percentages or AI scores.
- Do not invent additional features.
- Implement every listed feature clearly.
- Keep the interface minimal, professional, and suitable for an MVP startup demonstration.