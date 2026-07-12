import { useState } from 'react';
import { Box, Card, CardContent, Typography, TextField, Button, Container, Grid, Divider } from '@mui/material';
import { useNavigate } from 'react-router';
import { useAuth } from '../../context/AuthContext';

export default function AgencyRegistration() {
  const [email, setEmail] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    login(email || 'agency@example.com', 'agency');
    navigate('/agency/dashboard');
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#F5F7FA', py: 8 }}>
      <Container maxWidth="md">
        <Card sx={{ boxShadow: 3 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom fontWeight="bold">
              Agency Registration
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={4}>
              Register your agency to manage and deploy workforce.
            </Typography>
            
            <form onSubmit={handleRegister}>
              <Typography variant="h6" gutterBottom mt={2}>Agency Information</Typography>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField fullWidth label="Agency Name" required />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="License Number" required />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Country of Operation" required />
                </Grid>
              </Grid>

              <Typography variant="h6" gutterBottom mt={4}>Admin Contact</Typography>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Contact Person Name" required />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Phone Number" required />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Work Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Password" type="password" required />
                </Grid>
              </Grid>

              <Box mt={4} display="flex" justifyContent="space-between">
                <Button variant="outlined" onClick={() => navigate('/register')}>Back</Button>
                <Button type="submit" variant="contained" size="large">Complete Registration</Button>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
