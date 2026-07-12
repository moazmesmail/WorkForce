import { useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    Container,
    Grid,
    Divider,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
} from '@mui/material';
import { useNavigate } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import { SAUDI_CITIES } from '../../data/mockData';

export default function AgencyRegistration() {
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
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
                        <Typography
                            variant="body1"
                            color="text.secondary"
                            mb={4}
                        >
                            Register your recruitment agency to manage and
                            deploy the Saudi workforce.
                        </Typography>

                        <form onSubmit={handleRegister}>
                            <Typography variant="h6" gutterBottom mt={2}>
                                Agency Information
                            </Typography>
                            <Divider sx={{ mb: 3 }} />
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={8}>
                                    <TextField
                                        fullWidth
                                        label="Agency Name"
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        fullWidth
                                        label="License Number"
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth required>
                                        <InputLabel>City</InputLabel>
                                        <Select
                                            value={city}
                                            label="City"
                                            onChange={(e) =>
                                                setCity(e.target.value)
                                            }
                                        >
                                            {SAUDI_CITIES.map((c) => (
                                                <MenuItem key={c} value={c}>
                                                    {c}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Commercial Registration Number"
                                        required
                                    />
                                </Grid>
                            </Grid>

                            <Typography variant="h6" gutterBottom mt={4}>
                                Admin Contact
                            </Typography>
                            <Divider sx={{ mb: 3 }} />
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Contact Person Name"
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Mobile Number"
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Work Email"
                                        type="email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Password"
                                        type="password"
                                        required
                                    />
                                </Grid>
                            </Grid>

                            <Box
                                mt={5}
                                display="flex"
                                justifyContent="space-between"
                            >
                                <Button
                                    variant="outlined"
                                    onClick={() => navigate('/register')}
                                >
                                    Back
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                >
                                    Complete Registration
                                </Button>
                            </Box>
                        </form>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    );
}
