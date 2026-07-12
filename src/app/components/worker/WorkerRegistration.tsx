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

export default function WorkerRegistration() {
    const [email, setEmail] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [nationality, setNationality] = useState('');
    const [gender, setGender] = useState('');
    const [city, setCity] = useState('');
    const [preferredLocation, setPreferredLocation] = useState('');
    const [employmentStatus, setEmploymentStatus] = useState('Available');
    const [sponsorshipStatus, setSponsorshipStatus] = useState(
        'Needs Sponsorship Transfer'
    );
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        login(email || 'worker@example.com', 'worker');
        navigate('/worker/dashboard');
    };

    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: '#F5F7FA', py: 8 }}>
            <Container maxWidth="md">
                <Card sx={{ boxShadow: 3 }}>
                    <CardContent sx={{ p: 4 }}>
                        <Typography variant="h4" gutterBottom fontWeight="bold">
                            Worker Registration
                        </Typography>
                        <Typography
                            variant="body1"
                            color="text.secondary"
                            mb={4}
                        >
                            Create your profile to start finding opportunities
                            in Saudi Arabia.
                        </Typography>

                        <form onSubmit={handleRegister}>
                            {/* Basic Information */}
                            <Typography variant="h6" gutterBottom mt={2}>
                                Basic Information
                            </Typography>
                            <Divider sx={{ mb: 3 }} />
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Full Name"
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth required>
                                        <InputLabel>Nationality</InputLabel>
                                        <Select
                                            value={nationality}
                                            label="Nationality"
                                            onChange={(e) =>
                                                setNationality(e.target.value)
                                            }
                                        >
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
                                        <InputLabel>Gender</InputLabel>
                                        <Select
                                            value={gender}
                                            label="Gender"
                                            onChange={(e) =>
                                                setGender(e.target.value)
                                            }
                                        >
                                            <MenuItem value="Male">
                                                Male
                                            </MenuItem>
                                            <MenuItem value="Female">
                                                Female
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Date of Birth"
                                        type="date"
                                        InputLabelProps={{ shrink: true }}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth required>
                                        <InputLabel>Current City</InputLabel>
                                        <Select
                                            value={city}
                                            label="Current City"
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

                            {/* Employment Information */}
                            <Typography variant="h6" gutterBottom mt={4}>
                                Employment Information
                            </Typography>
                            <Divider sx={{ mb: 3 }} />
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth required>
                                        <InputLabel>Job Title</InputLabel>
                                        <Select
                                            value={jobTitle}
                                            label="Job Title"
                                            onChange={(e) =>
                                                setJobTitle(e.target.value)
                                            }
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
                                    <TextField
                                        fullWidth
                                        label="Years of Experience"
                                        type="number"
                                        inputProps={{ min: 0 }}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth required>
                                        <InputLabel>
                                            Employment Status
                                        </InputLabel>
                                        <Select
                                            value={employmentStatus}
                                            label="Employment Status"
                                            onChange={(e) =>
                                                setEmploymentStatus(
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <MenuItem value="Available">
                                                Available
                                            </MenuItem>
                                            <MenuItem value="Employed">
                                                Employed
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth required>
                                        <InputLabel>
                                            Preferred Work Location
                                        </InputLabel>
                                        <Select
                                            value={preferredLocation}
                                            label="Preferred Work Location"
                                            onChange={(e) =>
                                                setPreferredLocation(
                                                    e.target.value
                                                )
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
                            </Grid>

                            {/* Sponsorship */}
                            <Typography variant="h6" gutterBottom mt={4}>
                                Sponsorship Status
                            </Typography>
                            <Divider sx={{ mb: 3 }} />
                            <FormControl component="fieldset">
                                <FormLabel component="legend">
                                    Current Sponsorship Status
                                </FormLabel>
                                <RadioGroup
                                    row
                                    value={sponsorshipStatus}
                                    onChange={(e) =>
                                        setSponsorshipStatus(e.target.value)
                                    }
                                >
                                    <FormControlLabel
                                        value="Sponsored"
                                        control={<Radio />}
                                        label="Sponsored"
                                    />
                                    <FormControlLabel
                                        value="Needs Sponsorship Transfer"
                                        control={<Radio />}
                                        label="Needs Sponsorship Transfer"
                                    />
                                </RadioGroup>
                            </FormControl>

                            {/* Documents */}
                            <Typography variant="h6" gutterBottom mt={4}>
                                Documents
                            </Typography>
                            <Divider sx={{ mb: 3 }} />
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="National ID or Passport Number"
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Button
                                        variant="outlined"
                                        component="label"
                                        fullWidth
                                        sx={{ height: '56px' }}
                                    >
                                        Upload Resume (optional)
                                        <input
                                            type="file"
                                            hidden
                                            accept=".pdf,.doc,.docx"
                                        />
                                    </Button>
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
