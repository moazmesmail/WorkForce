import { Typography, Box, Paper, Grid, TextField, Button, Divider } from '@mui/material';
import { DashboardLayout } from '../shared/DashboardLayout';
import { agencyNavItems } from './AgencyDashboard';

export default function AgencyRegisterWorker() {
  return (
    <DashboardLayout navItems={agencyNavItems}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" fontWeight="bold">Register New Worker</Typography>
          <Typography color="text.secondary">Onboard a new worker into the agency pool.</Typography>
        </Box>
        <Button variant="contained" size="large">Submit Registration</Button>
      </Box>

      <Paper sx={{ p: 4, mb: 4 }}>
        <Typography variant="h6" gutterBottom>Basic Information</Typography>
        <Divider sx={{ mb: 3 }} />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Full Name" required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Nationality" required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Date of Birth" type="date" InputLabelProps={{ shrink: true }} required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Passport Number" required />
          </Grid>
        </Grid>

        <Typography variant="h6" gutterBottom mt={5}>Contact Information</Typography>
        <Divider sx={{ mb: 3 }} />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Email" type="email" required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Phone Number" required />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Current Address" required />
          </Grid>
        </Grid>

        <Typography variant="h6" gutterBottom mt={5}>Employment Details</Typography>
        <Divider sx={{ mb: 3 }} />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Primary Job Title" required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Years of Experience" type="number" required />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Skills (comma separated)" />
          </Grid>
        </Grid>

        <Typography variant="h6" gutterBottom mt={5}>Documents Upload</Typography>
        <Divider sx={{ mb: 3 }} />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Button variant="outlined" component="label" fullWidth sx={{ height: '100%', py: 2 }}>
              Upload Passport Copy
              <input type="file" hidden />
            </Button>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button variant="outlined" component="label" fullWidth sx={{ height: '100%', py: 2 }}>
              Upload Resume/CV
              <input type="file" hidden />
            </Button>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button variant="outlined" component="label" fullWidth sx={{ height: '100%', py: 2 }}>
              Upload Certificates
              <input type="file" hidden />
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </DashboardLayout>
  );
}
