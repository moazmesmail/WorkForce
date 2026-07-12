import { Typography, Box, Paper, Grid, Button } from '@mui/material';
import { DashboardLayout } from '../shared/DashboardLayout';
import { workerNavItems } from './WorkerDashboard';
import { StatusBadge } from '../shared/StatusBadge';
import { DataTable, Column } from '../shared/DataTable';
import { sponsorshipRequests } from '../../data/mockData';

export default function WorkerSponsorshipTransfer() {
  const columns: Column<typeof sponsorshipRequests[0]>[] = [
    { id: 'requestDate', label: 'Date', minWidth: 100 },
    { id: 'currentSponsor', label: 'Current Sponsor', minWidth: 150 },
    { id: 'newSponsor', label: 'New Sponsor', minWidth: 150 },
    { 
      id: 'status', 
      label: 'Status', 
      minWidth: 100,
      format: (value: string) => <StatusBadge status={value} />
    }
  ];

  return (
    <DashboardLayout navItems={workerNavItems}>
      <Typography variant="h4" fontWeight="bold" mb={3}>Sponsorship Transfer</Typography>

      <Grid container spacing={4} mb={4}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>Current Status</Typography>
            <Box display="flex" alignItems="center" gap={2} mb={2}>
              <Typography>Status:</Typography>
              <StatusBadge status="Active" />
            </Box>
            <Typography mb={1}><strong>Current Sponsor:</strong> Current Corp</Typography>
            <Typography><strong>Eligibility:</strong> Eligible for transfer</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="h6" gutterBottom align="center">Initiate Transfer</Typography>
            <Typography align="center" color="text.secondary" mb={3}>
              Start a new sponsorship transfer request. Make sure you have an offer from a new sponsor.
            </Typography>
            <Button variant="contained" size="large">Request Transfer</Button>
          </Paper>
        </Grid>
      </Grid>

      <Typography variant="h5" gutterBottom>Transfer History</Typography>
      <DataTable columns={columns} rows={sponsorshipRequests} />
    </DashboardLayout>
  );
}
