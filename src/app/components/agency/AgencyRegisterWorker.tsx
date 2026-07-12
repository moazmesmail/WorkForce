import { useState } from 'react';
import {
    Typography,
    Box,
    Paper,
    Grid,
    TextField,
    Button,
    Divider,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    RadioGroup,
    FormControlLabel,
    Radio,
    FormLabel,
    Snackbar,
    Alert,
} from '@mui/material';
import { DashboardLayout } from '../shared/DashboardLayout';
import { agencyNavItems } from './AgencyDashboard';
import { SAUDI_CITIES, JOB_TITLES, NATIONALITIES } from '../../data/mockData';

export default function AgencyRegisterWorker() {
    const [nationality, setNationality] = useState('');
    const [gender, setGender] = useState('');
    const [city, setCity] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [preferredLocation, setPreferredLocation] = useState('');
    const [employmentStatus, setEmploymentStatus] = useState('Available');
    const [sponsorshipStatus, setSponsorshipStatus] = useState(
        'Needs Sponsorship Transfer'
    );
    const [snackbar, setSnackbar] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSnackbar(true);
    };

    return (
        <DashboardLayout navItems={agencyNavItems}>
            <Box mb={4}>
                <Typography variant="h4" fontWeight="bold">
                    Register New Worker
                </Typography>
                <Typography color="text.secondary">
                    Onboard a new worker into the agency pool on their behalf.
                </Typography>
            </Box>

            <form onSubmit={handleSubmit}>
                <Paper sx={{ p: 4, mb: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        Basic Information
                    </Typography>
                    <Divider sx={{ mb: 3 }} />
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth label="Full Name" required />
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
                                    onChange={(e) => setGender(e.target.value)}
                                >
                                    <MenuItem value="Male">Male</MenuItem>
                                    <MenuItem value="Female">Female</MenuItem>
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
                                    onChange={(e) => setCity(e.target.value)}
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
                </Paper>

                <Paper sx={{ p: 4, mb: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        Contact Information
                    </Typography>
                    <Divider sx={{ mb: 3 }} />
                    <Grid container spacing={3}>
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
                            />
                        </Grid>
                    </Grid>
                </Paper>

                <Paper sx={{ p: 4, mb: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        Employment Information
                    </Typography>
                    <Divider sx={{ mb: 3 }} />
                    <Grid container spacing={3}>
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
                                <InputLabel>Employment Status</InputLabel>
                                <Select
                                    value={employmentStatus}
                                    label="Employment Status"
                                    onChange={(e) =>
                                        setEmploymentStatus(e.target.value)
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
                                <InputLabel>Preferred Work Location</InputLabel>
                                <Select
                                    value={preferredLocation}
                                    label="Preferred Work Location"
                                    onChange={(e) =>
                                        setPreferredLocation(e.target.value)
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
                </Paper>

                <Paper sx={{ p: 4, mb: 3 }}>
                    <Typography variant="h6" gutterBottom>
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
                </Paper>

                <Paper sx={{ p: 4, mb: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        Documents
                    </Typography>
                    <Divider sx={{ mb: 3 }} />
                    <Grid container spacing={3}>
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
                </Paper>

                <Box display="flex" gap={2} justifyContent="flex-end">
                    <Button variant="outlined">Cancel</Button>
                    <Button type="submit" variant="contained" size="large">
                        Submit Registration
                    </Button>
                </Box>
            </form>

            <Snackbar
                open={snackbar}
                autoHideDuration={3500}
                onClose={() => setSnackbar(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert severity="success" onClose={() => setSnackbar(false)}>
                    Worker registered successfully and added to agency pool.
                </Alert>
            </Snackbar>
        </DashboardLayout>
    );
}
