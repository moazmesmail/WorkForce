import { Typography, Box, Paper, Button, Grid, Divider } from '@mui/material';
import { useParams, useNavigate } from 'react-router';
import { DashboardLayout } from '../shared/DashboardLayout';
import { workerNavItems } from './WorkerDashboard';
import { applications } from '../../data/mockData';

export default function WorkerJobOffer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const application = applications.find(a => a.id === id) || applications[0]; // fallback to first for demo

  return (
    <DashboardLayout navItems={workerNavItems}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight="bold">Job Offer Details</Typography>
        <Button variant="outlined" onClick={() => navigate('/worker/applications')}>Back to Applications</Button>
      </Box>

      <Paper sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
        <Typography variant="h5" color="primary.main" gutterBottom fontWeight="bold">
          {application.jobTitle}
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          {application.employer}
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography color="text.secondary">Salary</Typography>
            <Typography variant="body1" fontWeight="bold">15,000 - 20,000 AED</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography color="text.secondary">Location</Typography>
            <Typography variant="body1" fontWeight="bold">Dubai Internet City</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography color="text.secondary">Accommodation</Typography>
            <Typography variant="body1" fontWeight="bold">Provided</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography color="text.secondary">Expected Start Date</Typography>
            <Typography variant="body1" fontWeight="bold">August 1, 2026</Typography>
          </Grid>
        </Grid>

        <Box mt={4} p={2} bgcolor="#F5F7FA" borderRadius={1}>
          <Typography variant="body2" color="text.secondary">
            Please review the offer details above. Accepting this offer will initiate the sponsorship transfer process.
          </Typography>
        </Box>

        <Box mt={4} display="flex" gap={2} justifyContent="flex-end">
          <Button variant="outlined" color="error" size="large">Reject Offer</Button>
          <Button variant="contained" color="primary" size="large">Accept Offer</Button>
        </Box>
      </Paper>
    </DashboardLayout>
  );
}
