export const workers = [
  {
    id: 'w1',
    name: 'Ahmed Hassan',
    nationality: 'Egyptian',
    jobTitle: 'Software Engineer',
    experience: 5,
    city: 'Dubai',
    verificationStatus: 'Verified',
    sponsorshipStatus: 'Active',
    email: 'ahmed@example.com',
    phone: '+971 50 123 4567',
  },
  {
    id: 'w2',
    name: 'Maria Garcia',
    nationality: 'Spanish',
    jobTitle: 'Project Manager',
    experience: 8,
    city: 'Abu Dhabi',
    verificationStatus: 'Pending Verification',
    sponsorshipStatus: 'Transfer Pending',
    email: 'maria@example.com',
    phone: '+971 55 987 6543',
  },
  {
    id: 'w3',
    name: 'John Doe',
    nationality: 'American',
    jobTitle: 'Data Analyst',
    experience: 3,
    city: 'Dubai',
    verificationStatus: 'Verified',
    sponsorshipStatus: 'Available',
    email: 'john@example.com',
    phone: '+971 52 555 1234',
  },
  {
    id: 'w4',
    name: 'Sarah Smith',
    nationality: 'British',
    jobTitle: 'UI/UX Designer',
    experience: 6,
    city: 'Sharjah',
    verificationStatus: 'Rejected',
    sponsorshipStatus: 'Available',
    email: 'sarah@example.com',
    phone: '+971 56 111 2222',
  },
];

export const jobs = [
  {
    id: 'j1',
    title: 'Senior Frontend Developer',
    location: 'Dubai Internet City',
    salaryRange: '15,000 - 20,000 AED',
    experience: '5+ years',
    accommodation: 'Provided',
    status: 'Open',
    employer: 'TechNova Solutions',
    postedDate: '2026-07-01',
  },
  {
    id: 'j2',
    title: 'Marketing Specialist',
    location: 'Abu Dhabi',
    salaryRange: '10,000 - 14,000 AED',
    experience: '3-5 years',
    accommodation: 'Not Provided',
    status: 'Open',
    employer: 'Global Media',
    postedDate: '2026-07-05',
  },
  {
    id: 'j3',
    title: 'Operations Manager',
    location: 'Dubai',
    salaryRange: '20,000 - 25,000 AED',
    experience: '8+ years',
    accommodation: 'Allowance',
    status: 'Closed',
    employer: 'BuildRight Corp',
    postedDate: '2026-06-20',
  },
];

export const applications = [
  {
    id: 'a1',
    jobId: 'j1',
    jobTitle: 'Senior Frontend Developer',
    employer: 'TechNova Solutions',
    dateApplied: '2026-07-10',
    status: 'Reviewing',
  },
  {
    id: 'a2',
    jobId: 'j2',
    jobTitle: 'Marketing Specialist',
    employer: 'Global Media',
    dateApplied: '2026-07-12',
    status: 'Pending',
  },
];

export const sponsorshipRequests = [
  {
    id: 'sr1',
    currentSponsor: 'Current Corp',
    newSponsor: 'TechNova Solutions',
    requestDate: '2026-07-08',
    status: 'Pending Approval',
  },
];

export const workerRequests = [
  {
    id: 'wr1',
    jobTitle: 'System Administrator',
    quantity: 2,
    requestDate: '2026-07-05',
    status: 'Active',
    agency: 'Elite Recruits',
  },
  {
    id: 'wr2',
    jobTitle: 'Accountant',
    quantity: 1,
    requestDate: '2026-07-11',
    status: 'Pending',
    agency: 'Unassigned',
  },
];

export const jobOffers = [
  {
    id: 'jo1',
    workerName: 'Ahmed Hassan',
    jobTitle: 'Software Engineer',
    offerDate: '2026-07-09',
    status: 'Accepted',
  },
  {
    id: 'jo2',
    workerName: 'John Doe',
    jobTitle: 'Data Analyst',
    offerDate: '2026-07-12',
    status: 'Pending',
  },
];

export const recruitmentRequests = [
  {
    id: 'rr1',
    sponsor: 'BuildRight Corp',
    jobTitle: 'Construction Manager',
    workersNeeded: 3,
    requestDate: '2026-07-01',
    status: 'In Progress',
  },
  {
    id: 'rr2',
    sponsor: 'TechNova Solutions',
    jobTitle: 'System Administrator',
    workersNeeded: 2,
    requestDate: '2026-07-05',
    status: 'Reviewing',
  },
];

export const documents = [
  {
    id: 'd1',
    name: 'Passport Copy.pdf',
    uploadDate: '2026-07-01',
    status: 'Verified',
  },
  {
    id: 'd2',
    name: 'Degree Certificate.pdf',
    uploadDate: '2026-07-02',
    status: 'Pending Verification',
  },
  {
    id: 'd3',
    name: 'Previous Visa.pdf',
    uploadDate: '2026-07-03',
    status: 'Rejected',
  },
];
