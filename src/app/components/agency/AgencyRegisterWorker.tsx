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
import { useTranslation } from 'react-i18next';

export default function AgencyRegisterWorker() {
    const { t } = useTranslation();
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
                    {t('agency.registerWorker.title')}
                </Typography>
                <Typography color="text.secondary">
                    {t('agency.registerWorker.subtitle')}
                </Typography>
            </Box>

            <form onSubmit={handleSubmit}>
                <Paper sx={{ p: 4, mb: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        {t('agency.registerWorker.basicInfo')}
                    </Typography>
                    <Divider sx={{ mb: 3 }} />
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth label={t('agency.registerWorker.fullName')} required />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth required>
                                <InputLabel>{t('agency.registerWorker.nationality')}</InputLabel>
                                <Select
                                    value={nationality}
                                    label={t('agency.registerWorker.nationality')}
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
                                <InputLabel>{t('agency.registerWorker.gender')}</InputLabel>
                                <Select
                                    value={gender}
                                    label={t('agency.registerWorker.gender')}
                                    onChange={(e) => setGender(e.target.value)}
                                >
                                    <MenuItem value="Male">{t('agency.registerWorker.genderMale')}</MenuItem>
                                    <MenuItem value="Female">{t('agency.registerWorker.genderFemale')}</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label={t('agency.registerWorker.dateOfBirth')}
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth required>
                                <InputLabel>{t('agency.registerWorker.currentCity')}</InputLabel>
                                <Select
                                    value={city}
                                    label={t('agency.registerWorker.currentCity')}
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
                        {t('agency.registerWorker.contactInfo')}
                    </Typography>
                    <Divider sx={{ mb: 3 }} />
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label={t('agency.registerWorker.mobileNumber')}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label={t('agency.registerWorker.emailOptional')}
                                type="email"
                            />
                        </Grid>
                    </Grid>
                </Paper>

                <Paper sx={{ p: 4, mb: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        {t('agency.registerWorker.employmentInfo')}
                    </Typography>
                    <Divider sx={{ mb: 3 }} />
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth required>
                                <InputLabel>{t('agency.registerWorker.jobTitle')}</InputLabel>
                                <Select
                                    value={jobTitle}
                                    label={t('agency.registerWorker.jobTitle')}
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
                                label={t('agency.registerWorker.yearsOfExperience')}
                                type="number"
                                inputProps={{ min: 0 }}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth required>
                                <InputLabel>{t('agency.registerWorker.employmentStatus')}</InputLabel>
                                <Select
                                    value={employmentStatus}
                                    label={t('agency.registerWorker.employmentStatus')}
                                    onChange={(e) =>
                                        setEmploymentStatus(e.target.value)
                                    }
                                >
                                    <MenuItem value="Available">
                                        {t('agency.registerWorker.statusAvailable')}
                                    </MenuItem>
                                    <MenuItem value="Employed">
                                        {t('agency.registerWorker.statusEmployed')}
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth required>
                                <InputLabel>{t('agency.registerWorker.preferredWorkLocation')}</InputLabel>
                                <Select
                                    value={preferredLocation}
                                    label={t('agency.registerWorker.preferredWorkLocation')}
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
                        {t('agency.registerWorker.sponsorshipStatusTitle')}
                    </Typography>
                    <Divider sx={{ mb: 3 }} />
                    <FormControl component="fieldset">
                        <FormLabel component="legend">
                            {t('agency.registerWorker.currentSponsorshipStatus')}
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
                                label={t('agency.registerWorker.sponsorshipSponsored')}
                            />
                            <FormControlLabel
                                value="Needs Sponsorship Transfer"
                                control={<Radio />}
                                label={t('agency.registerWorker.sponsorshipNeedsTransfer')}
                            />
                        </RadioGroup>
                    </FormControl>
                </Paper>

                <Paper sx={{ p: 4, mb: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        {t('agency.registerWorker.documents')}
                    </Typography>
                    <Divider sx={{ mb: 3 }} />
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label={t('agency.registerWorker.idOrPassport')}
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
                                {t('agency.registerWorker.uploadResume')}
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
                    <Button variant="outlined">{t('agency.registerWorker.cancel')}</Button>
                    <Button type="submit" variant="contained" size="large">
                        {t('agency.registerWorker.submit')}
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
                    {t('agency.registerWorker.successMessage')}
                </Alert>
            </Snackbar>
        </DashboardLayout>
    );
}
