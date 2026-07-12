import { Typography, Box, Button } from '@mui/material';
import { DashboardLayout } from '../shared/DashboardLayout';
import { agencyNavItems } from './AgencyDashboard';
import { DataTable, Column } from '../shared/DataTable';
import { StatusBadge } from '../shared/StatusBadge';
import { recruitmentRequests } from '../../data/mockData';
import { Send } from 'lucide-react';

export default function AgencyRecruitmentRequests() {
  const columns: Column<typeof recruitmentRequests[0]>[] = [
    { id: 'id', label: 'Request ID', minWidth: 100 },
    { id: 'sponsor', label: 'Sponsor', minWidth: 150 },
    { id: 'jobTitle', label: 'Job Title', minWidth: 150 },
    { id: 'workersNeeded', label: 'Needed', minWidth: 100, align: 'center' },
    { id: 'requestDate', label: 'Date', minWidth: 120 },
    { 
      id: 'status', 
      label: 'Status', 
      minWidth: 120,
      format: (value: string) => <StatusBadge status={value} />
    },
    {
      id: 'actions',
      label: 'Actions',
      minWidth: 150,
      align: 'center',
      format: () => (
        <Button size="small" variant="contained" startIcon={<Send size={16} />}>
          Submit Candidates
        </Button>
      )
    }
  ];

  return (
    <DashboardLayout navItems={agencyNavItems}>
      <Box mb={3}>
        <Typography variant="h4" fontWeight="bold">Recruitment Requests</Typography>
        <Typography color="text.secondary">Fulfill requests from sponsors by submitting suitable candidates.</Typography>
      </Box>

      <DataTable 
        columns={columns} 
        rows={recruitmentRequests} 
        searchableKey="sponsor" 
        searchPlaceholder="Search by sponsor..." 
      />
    </DashboardLayout>
  );
}
