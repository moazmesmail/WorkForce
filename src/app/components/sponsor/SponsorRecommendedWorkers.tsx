import { useState } from 'react';
import { Typography, Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid } from '@mui/material';
import { DashboardLayout } from '../shared/DashboardLayout';
import { sponsorNavItems } from './SponsorDashboard';
import { DataTable, Column } from '../shared/DataTable';
import { StatusBadge } from '../shared/StatusBadge';
import { workers } from '../../data/mockData';
import { Send, Star } from 'lucide-react';

export default function SponsorRecommendedWorkers() {
  const [open, setOpen] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState<string | null>(null);

  const handleOpenOffer = (workerName: string) => {
    setSelectedWorker(workerName);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedWorker(null);
  };

  const columns: Column<typeof workers[0]>[] = [
    { id: 'name', label: 'Worker Name', minWidth: 150 },
    { id: 'jobTitle', label: 'Job Title', minWidth: 150 },
    { id: 'experience', label: 'Experience', minWidth: 100 },
    { 
      id: 'verificationStatus', 
      label: 'Status', 
      minWidth: 120,
      format: (value: string) => <StatusBadge status={value} />
    },
    {
      id: 'actions',
      label: 'Actions',
      minWidth: 120,
      align: 'center',
      format: (value, row) => (
        <Button size="small" variant="contained" color="secondary" startIcon={<Send size={16} />} onClick={() => handleOpenOffer(row.name)}>
          Send Offer
        </Button>
      )
    }
  ];

  // Mock recommended subset
  const recommendedWorkers = workers.slice(0, 2);

  return (
    <DashboardLayout navItems={sponsorNavItems}>
      <Box mb={3} display="flex" alignItems="center" gap={2}>
        <Star color="#F59E0B" fill="#F59E0B" size={32} />
        <Box>
          <Typography variant="h4" fontWeight="bold">Recommended Workers</Typography>
          <Typography color="text.secondary">Curated matches based on your recent activity and requirements.</Typography>
        </Box>
      </Box>

      <DataTable columns={columns} rows={recommendedWorkers} />

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Send Offer to {selectedWorker}</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField fullWidth label="Job Title" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Salary Offer" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Location" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Message to Worker" multiline rows={4} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleClose}>Send Offer</Button>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
}
