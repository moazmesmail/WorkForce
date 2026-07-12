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
    RadioGroup,
    FormControlLabel,
    Radio,
    FormLabel,
} from '@mui/material';
import { useNavigate } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import { SAUDI_CITIES, JOB_TITLES, NATIONALITIES } from '../../data/mockData';

export default function SponsorRegistration() {
    const [email, setEmail] = useState('');
    const [sponsorType, setSponsorType] = useState<'Individual' | 'Company'>(
        'Company'
    );
    const [city, setCity] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        login(email || 'sponsor@example.com', 'sponsor');
        navigate('/sponsor/dashboard');
    };

    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: '#F5F7FA', py: 8 }}>
            <Container maxWidth="md">
                <Card sx={{ boxShadow: 3 }}>
                    <CardContent sx={{ p: 4 }}>
                        <Typography variant="h4" gutterBottom fontWeight="bold">
                            Sponsor Registration
                        </Typography>
                        <Typography
                            variant="body1"
                            color="text.secondary"
                            mb={4}
                        >
                            Register as an employer to hire verified workers in
                            Saudi Arabia.
                        </Typography>

                        <form onSubmit={handleRegister}>
                            {/* Basic Information */}
                            <Typography variant="h6" gutterBottom mt={2}>
                                Basic Information
                            </Typography>
                            <Divider sx={{ mb: 3 }} />
                            <FormControl component="fieldset" sx={{ mb: 2 }}>
                                <FormLabel component="legend">
                                    Sponsor Type
                                </FormLabel>
                                <RadioGroup
                                    row
                                    value={sponsorType}
                                    onChange={(e) =>
                                        setSponsorType(
                                            e.target.value as
                                                'Individual' | 'Company'
                                        )
                                    }
                                >
                                    <FormControlLabel
                                        value="Individual"
                                        control={<Radio />}
                                        label="Individual"
                                    />
                                    <FormControlLabel
                                        value="Company"
                                        control={<Radio />}
                                        label="Company"
                                    />
                                </RadioGroup>
                            </FormControl>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={8}>
                                    <TextField
                                        fullWidth
                                        label={
                                            sponsorType === 'Company'
                                                ? 'Company Name'
                                                : 'Full Name'
                                        }
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
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
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Address (optional)"
                                    />
                                </Grid>
                            </Grid>

                            {/* Contact Information */}
                            <Typography variant="h6" gutterBottom mt={4}>
                                Contact Information
                            </Typography>
                            <Divider sx={{ mb: 3 }} />
                            <Grid container spacing={2}>
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
                                        label="Email (optional)"
                                        type="email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
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

                            {/* Identification */}
                            <Typography variant="h6" gutterBottom mt={4}>
                                Identification
                            </Typography>
                            <Divider sx={{ mb: 3 }} />
                            <Grid container spacing={2}>
                                {sponsorType === 'Individual' ? (
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="National ID Number"
                                            required
                                        />
                                    </Grid>
                                ) : (
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Commercial Registration Number"
                                            required
                                        />
                                    </Grid>
                                )}
                            </Grid>

                            {/* Hiring Information */}
                            <Typography variant="h6" gutterBottom mt={4}>
                                Hiring Information
                            </Typography>
                            <Divider sx={{ mb: 3 }} />
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Number of Workers Needed"
                                        type="number"
                                        inputProps={{ min: 1 }}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <InputLabel>
                                            Required Job Title
                                        </InputLabel>
                                        <Select
                                            label="Required Job Title"
                                            defaultValue=""
                                        >
                                            {JOB_TITLES.map((j) => (
                                                <MenuItem key={j} value={j}>
                                                    {j}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <InputLabel>
                                            Preferred Nationality (optional)
                                        </InputLabel>
                                        <Select
                                            label="Preferred Nationality (optional)"
                                            defaultValue=""
                                        >
                                            <MenuItem value="">
                                                No Preference
                                            </MenuItem>
                                            {NATIONALITIES.map((n) => (
                                                <MenuItem key={n} value={n}>
                                                    {n}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth required>
                                        <InputLabel>Work Location</InputLabel>
                                        <Select
                                            label="Work Location"
                                            defaultValue=""
                                        >
                                            {SAUDI_CITIES.map((c) => (
                                                <MenuItem key={c} value={c}>
                                                    {c}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
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
