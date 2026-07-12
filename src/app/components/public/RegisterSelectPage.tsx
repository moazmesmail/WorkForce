import { Box, Card, CardActionArea, CardContent, Typography, Container, Grid } from '@mui/material';
import { useNavigate } from 'react-router';
import { Briefcase, Building, ShieldCheck } from 'lucide-react';

export default function RegisterSelectPage() {
  const navigate = useNavigate();

  const options = [
    {
      title: 'Worker',
      description: 'Register to find jobs and manage sponsorships.',
      icon: <Briefcase size={40} color="#1565C0" />,
      path: '/register/worker',
    },
    {
      title: 'Sponsor',
      description: 'Register to hire talent and request workers.',
      icon: <Building size={40} color="#2E7D32" />,
      path: '/register/sponsor',
    },
    {
      title: 'Recruitment Agency',
      description: 'Register to provide talent to sponsors.',
      icon: <ShieldCheck size={40} color="#1565C0" />,
      path: '/register/agency',
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', backgroundColor: '#F5F7FA', py: 8 }}>
      <Container maxWidth="md">
        <Typography variant="h3" align="center" gutterBottom fontWeight="bold" mb={6}>
          Choose Account Type
        </Typography>
        <Grid container spacing={4}>
          {options.map((option) => (
            <Grid item xs={12} sm={4} key={option.title}>
              <Card sx={{ height: '100%', '&:hover': { boxShadow: 6 } }}>
                <CardActionArea onClick={() => navigate(option.path)} sx={{ height: '100%', p: 3 }}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Box sx={{ mb: 2 }}>{option.icon}</Box>
                    <Typography variant="h5" component="div" gutterBottom fontWeight="bold">
                      {option.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {option.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box textAlign="center" mt={6}>
          <Typography variant="body1" sx={{ cursor: 'pointer', color: 'primary.main', textDecoration: 'underline' }} onClick={() => navigate('/login')}>
            Already have an account? Login here
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
