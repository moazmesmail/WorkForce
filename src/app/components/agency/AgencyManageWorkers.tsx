import { useState } from 'react';
import { Typography, Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid } from '@mui/material';
import { DashboardLayout } from '../shared/DashboardLayout';
import { agencyNavItems } from './AgencyDashboard';
import { DataTable, Column } from '../shared/DataTable';
import { StatusBadge } from '../shared/StatusBadge';
import { workers } from '../../data/mockData';
import { Edit, Eye } from 'lucide-react';

export default function AgencyManageWorkers() {
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState<typeof workers[0] | null>(null);

  const handleEdit = (worker: typeof workers[0]) => {
    setSelectedWorker(worker);
    setOpenEdit(true);
  };

  const columns: Column<typeof workers[0]>[] = [
    { id: 'name', label: 'Name', minWidth: 150 },
    { id: 'jobTitle', label: 'Job Title', minWidth: 150 },
    { id: 'nationality', label: 'Nationality', minWidth: 120 },
    { 
      id: 'verificationStatus', 
      label: 'Status', 
      minWidth: 120,
      format: (value: string) => <StatusBadge status={value} />
    },
    {
      id: 'actions',
      label: 'Actions',
      minWidth: 150,
      align: 'center',
      format: (value, row) => (
        <Box display="flex" gap={1} justifyItems="center">
          <Button size="small" variant="outlined" startIcon={<Eye size={16} />}>View</Button>
          <Button size="small" variant="contained" startIcon={<Edit size={16} />} onClick={() => handleEdit(row)}>Edit</Button>
        </Box>
      )
    }
  ];

  return (
    <DashboardLayout navItems={agencyNavItems}>
      <Box mb={3}>
        <Typography variant="h4" fontWeight="bold">Manage Workers</Typography>
        <Typography color="text.secondary">View and edit the profiles of workers in your pool.</Typography>
      </Box>

      <DataTable 
        columns={columns} 
        rows={workers} 
        searchableKey="name" 
        searchPlaceholder="Search workers by name..." 
      />

      <Dialog open={openEdit} onClose={() => setOpenEdit(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Worker Profile</DialogTitle>
        <DialogContent dividers>
          {selectedWorker && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField fullWidth label="Full Name" defaultValue={selectedWorker.name} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Job Title" defaultValue={selectedWorker.jobTitle} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Experience" type="number" defaultValue={selectedWorker.experience} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="City" defaultValue={selectedWorker.city} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Phone" defaultValue={selectedWorker.phone} />
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpenEdit(false)}>Save Changes</Button>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
}
