import { Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router';
import { DashboardLayout } from '../shared/DashboardLayout';
import { workerNavItems } from './WorkerDashboard';
import { DataTable, Column } from '../shared/DataTable';
import { StatusBadge } from '../shared/StatusBadge';
import { applications } from '../../data/mockData';

export default function WorkerApplicationTracking() {
  const navigate = useNavigate();

  const columns: Column<typeof applications[0]>[] = [
    { id: 'jobTitle', label: 'Job Title', minWidth: 170 },
    { id: 'employer', label: 'Employer', minWidth: 150 },
    { id: 'dateApplied', label: 'Date Applied', minWidth: 120 },
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
      format: (value, row) => (
        <Button size="small" variant="contained" onClick={() => navigate(`/worker/offers/${row.id}`)}>
          View Offer
        </Button>
      )
    }
  ];

  return (
    <DashboardLayout navItems={workerNavItems}>
      <Box mb={3}>
        <Typography variant="h4" fontWeight="bold">Application Tracking</Typography>
        <Typography color="text.secondary">Monitor the status of your job applications.</Typography>
      </Box>

      <DataTable 
        columns={columns} 
        rows={applications} 
        searchableKey="jobTitle" 
        searchPlaceholder="Search applications..." 
      />
    </DashboardLayout>
  );
}
