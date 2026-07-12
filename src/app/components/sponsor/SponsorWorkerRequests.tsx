import { useState } from 'react';
import { Typography, Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, Stepper, Step, StepLabel, TextField, Grid } from '@mui/material';
import { DashboardLayout } from '../shared/DashboardLayout';
import { sponsorNavItems } from './SponsorDashboard';
import { DataTable, Column } from '../shared/DataTable';
import { StatusBadge } from '../shared/StatusBadge';
import { workerRequests } from '../../data/mockData';
import { Plus } from 'lucide-react';

const steps = ['Job Info', 'Worker Requirements', 'Employment Details'];

export default function SponsorWorkerRequests() {
  const [open, setOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);
  const handleClose = () => {
    setOpen(false);
    setActiveStep(0);
  };

  const columns: Column<typeof workerRequests[0]>[] = [
    { id: 'jobTitle', label: 'Job Title', minWidth: 150 },
    { id: 'quantity', label: 'Quantity', minWidth: 100 },
    { id: 'agency', label: 'Assigned Agency', minWidth: 150 },
    { id: 'requestDate', label: 'Request Date', minWidth: 120 },
    { 
      id: 'status', 
      label: 'Status', 
      minWidth: 100,
      format: (value: string) => <StatusBadge status={value} />
    }
  ];

  return (
    <DashboardLayout navItems={sponsorNavItems}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" fontWeight="bold">Worker Requests</Typography>
          <Typography color="text.secondary">Manage your requests for new workers.</Typography>
        </Box>
        <Button variant="contained" startIcon={<Plus size={18} />} onClick={() => setOpen(true)}>
          Create New Request
        </Button>
      </Box>

      <DataTable columns={columns} rows={workerRequests} searchableKey="jobTitle" searchPlaceholder="Search requests..." />

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Create Worker Request</DialogTitle>
        <DialogContent>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {activeStep === 0 && (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={8}>
                <TextField fullWidth label="Job Title" />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField fullWidth label="Quantity Needed" type="number" />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Job Description" multiline rows={3} />
              </Grid>
            </Grid>
          )}

          {activeStep === 1 && (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Preferred Nationality" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Minimum Experience (Years)" type="number" />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Required Skills" />
              </Grid>
            </Grid>
          )}

          {activeStep === 2 && (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Salary Range" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Location" />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Accommodation Details" />
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Box flexGrow={1} />
          <Button disabled={activeStep === 0} onClick={handleBack}>
            Back
          </Button>
          {activeStep === steps.length - 1 ? (
            <Button variant="contained" onClick={handleClose}>
              Submit Request
            </Button>
          ) : (
            <Button variant="contained" onClick={handleNext}>
              Next
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
}
