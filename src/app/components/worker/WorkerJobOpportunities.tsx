import { Typography, Box, Button } from '@mui/material';
import { DashboardLayout } from '../shared/DashboardLayout';
import { workerNavItems } from './WorkerDashboard';
import { DataTable, Column } from '../shared/DataTable';
import { StatusBadge } from '../shared/StatusBadge';
import { jobs } from '../../data/mockData';

export default function WorkerJobOpportunities() {
  const columns: Column<typeof jobs[0]>[] = [
    { id: 'title', label: 'Job Title', minWidth: 170 },
    { id: 'employer', label: 'Employer', minWidth: 150 },
    { id: 'location', label: 'Location', minWidth: 120 },
    { id: 'salaryRange', label: 'Salary Range', minWidth: 130 },
    { 
      id: 'status', 
      label: 'Status', 
      minWidth: 100,
      format: (value: string) => <StatusBadge status={value} />
    },
    {
      id: 'actions',
      label: 'Actions',
      minWidth: 100,
      align: 'center',
      format: () => (
        <Button size="small" variant="outlined">View Details</Button>
      )
    }
  ];

  return (
    <DashboardLayout navItems={workerNavItems}>
      <Box mb={3}>
        <Typography variant="h4" fontWeight="bold">Job Opportunities</Typography>
        <Typography color="text.secondary">Find and apply for open positions.</Typography>
      </Box>

      <DataTable 
        columns={columns} 
        rows={jobs} 
        searchableKey="title" 
        searchPlaceholder="Search jobs by title..." 
      />
    </DashboardLayout>
  );
}
