import { Typography, Box, Button } from '@mui/material';
import { DashboardLayout } from '../shared/DashboardLayout';
import { sponsorNavItems } from './SponsorDashboard';
import { DataTable, Column } from '../shared/DataTable';
import { StatusBadge } from '../shared/StatusBadge';
import { jobOffers } from '../../data/mockData';
import { XCircle } from 'lucide-react';

export default function SponsorJobOffers() {
  const columns: Column<typeof jobOffers[0]>[] = [
    { id: 'workerName', label: 'Worker Name', minWidth: 150 },
    { id: 'jobTitle', label: 'Position Offered', minWidth: 150 },
    { id: 'offerDate', label: 'Date Sent', minWidth: 120 },
    { 
      id: 'status', 
      label: 'Status', 
      minWidth: 120,
      format: (value: string) => <StatusBadge status={value} />
    },
    {
      id: 'actions',
      label: 'Actions',
      minWidth: 100,
      align: 'center',
      format: (value, row) => (
        <Button 
          size="small" 
          color="error" 
          variant="outlined" 
          startIcon={<XCircle size={16} />}
          disabled={row.status === 'Accepted' || row.status === 'Rejected'}
        >
          Cancel Offer
        </Button>
      )
    }
  ];

  return (
    <DashboardLayout navItems={sponsorNavItems}>
      <Box mb={3}>
        <Typography variant="h4" fontWeight="bold">Job Offers</Typography>
        <Typography color="text.secondary">Track the status of direct offers sent to workers.</Typography>
      </Box>

      <DataTable 
        columns={columns} 
        rows={jobOffers} 
        searchableKey="workerName" 
        searchPlaceholder="Search by worker name..." 
      />
    </DashboardLayout>
  );
}
