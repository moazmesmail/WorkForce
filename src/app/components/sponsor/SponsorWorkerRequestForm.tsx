import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import {
    Typography,
    Box,
    Paper,
    Grid,
    TextField,
    Button,
    Divider,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    Snackbar,
    Alert,
} from '@mui/material';
import { DashboardLayout } from '../shared/DashboardLayout';
import { sponsorNavItems } from './SponsorDashboard';
import {
    ArrowLeft,
    Save,
    Briefcase,
    UserCheck,
    CreditCard,
    Info,
} from 'lucide-react';
import { workerRequests as mockWorkerRequests } from '../../data/mockData';

export default function SponsorWorkerRequestForm() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [successOpen, setSuccessOpen] = useState(false);

    // Form states
    const [jobTitle, setJobTitle] = useState('');
    const [customJobTitle, setCustomJobTitle] = useState('');
    const [quantity, setQuantity] = useState('1');
    const [description, setDescription] = useState('');
    const [skills, setSkills] = useState('');
    const [experience, setExperience] = useState('No experience');

    const [nationality, setNationality] = useState('');
    const [gender, setGender] = useState('Any');
    const [ageRange, setAgeRange] = useState('');
    const [languages, setLanguages] = useState('');

    const [workLocation, setWorkLocation] = useState('');
    const [city, setCity] = useState('');
    const [region, setRegion] = useState('');
    const [salaryRange, setSalaryRange] = useState('');
    const [workingHours, setWorkingHours] = useState('');
    const [contractDuration, setContractDuration] = useState('');
    const [accommodation, setAccommodation] = useState('Yes');
    const [transportation, setTransportation] = useState('Yes');

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validations
        const newErrors: Record<string, string> = {};
        const finalJobTitle = jobTitle === 'Other' ? customJobTitle : jobTitle;

        if (!finalJobTitle) newErrors.jobTitle = t('sponsor.requests.form.errors.jobTitleRequired');
        if (!quantity || parseInt(quantity, 10) <= 0)
            newErrors.quantity = t('sponsor.requests.form.errors.quantityMin');
        if (!workLocation) newErrors.workLocation = t('sponsor.requests.form.errors.locationRequired');
        if (!city) newErrors.city = t('sponsor.requests.form.errors.cityRequired');
        if (!region) newErrors.region = t('sponsor.requests.form.errors.regionRequired');

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Save to localStorage
        const saved = localStorage.getItem('sponsor_worker_requests');
        const requestList = saved ? JSON.parse(saved) : [...mockWorkerRequests];

        const newRequest = {
            id: 'wr_' + Date.now(),
            jobTitle: finalJobTitle,
            quantity: parseInt(quantity, 10),
            requestDate: new Date().toISOString().split('T')[0],
            status: 'Pending', // System managed
            agency: 'Unassigned',
            // Store all additional fields
            description,
            skills,
            experience,
            nationality,
            gender,
            ageRange,
            languages,
            workLocation,
            city,
            region,
            salaryRange,
            workingHours,
            contractDuration,
            accommodation,
            transportation,
        };

        requestList.unshift(newRequest);
        localStorage.setItem(
            'sponsor_worker_requests',
            JSON.stringify(requestList)
        );

        setSuccessOpen(true);
        setTimeout(() => {
            navigate('/sponsor/requests');
        }, 1500);
    };

    const jobTitleOptions = [
        'Driver',
        'Cleaner',
        'Housekeeper',
        'Construction Worker',
        'Software Engineer',
        'Other',
    ];

    const jobTitleKeyMap: Record<string, string> = {
        'Driver': 'sponsor.requests.form.jobs.driver',
        'Cleaner': 'sponsor.requests.form.jobs.cleaner',
        'Housekeeper': 'sponsor.requests.form.jobs.housekeeper',
        'Construction Worker': 'sponsor.requests.form.jobs.constructionWorker',
        'Software Engineer': 'sponsor.requests.form.jobs.softwareEngineer',
        'Other': 'sponsor.requests.form.jobs.other',
    };

    return (
        <DashboardLayout navItems={sponsorNavItems}>
            {/* Header */}
            <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Button
                    onClick={() => navigate('/sponsor/requests')}
                    variant="outlined"
                    sx={{ minWidth: 'auto', p: 1, borderRadius: '50%' }}
                >
                    <ArrowLeft size={18} />
                </Button>
                <Box>
                    <Typography variant="h4" fontWeight="bold">
                        {t('sponsor.requests.form.title')}
                    </Typography>
                    <Typography color="text.secondary" variant="body2">
                        {t('sponsor.requests.form.subtitle')}
                    </Typography>
                </Box>
            </Box>

            <form onSubmit={handleSubmit}>
                <Grid container spacing={3.5}>
                    {/* Left panel: Form fields */}
                    <Grid size={{ xs: 12, md: 8 }}>
                        {/* Section 1: Job Information */}
                        <Paper sx={{ p: 4, mb: 3.5 }}>
                            <Typography
                                variant="h6"
                                fontWeight="bold"
                                gutterBottom
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                }}
                            >
                                <Briefcase size={18} /> {t('sponsor.requests.form.jobInfo')}
                            </Typography>
                            <Divider sx={{ mb: 3 }} />

                            <Grid container spacing={3}>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <FormControl
                                        fullWidth
                                        error={!!errors.jobTitle}
                                    >
                                        <InputLabel id="job-title-label">
                                            {t('sponsor.requests.form.jobTitle')}
                                        </InputLabel>
                                        <Select
                                            labelId="job-title-label"
                                            value={jobTitle}
                                            label={t('sponsor.requests.form.jobTitle')}
                                            onChange={(e) => {
                                                setJobTitle(e.target.value);
                                                setErrors((prev) => ({
                                                    ...prev,
                                                    jobTitle: '',
                                                }));
                                            }}
                                        >
                                            {jobTitleOptions.map((opt) => (
                                                <MenuItem key={opt} value={opt}>
                                                    {t(jobTitleKeyMap[opt] || opt)}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <TextField
                                        fullWidth
                                        label={t('sponsor.requests.form.quantity')}
                                        type="number"
                                        value={quantity}
                                        onChange={(e) => {
                                            setQuantity(e.target.value);
                                            setErrors((prev) => ({
                                                ...prev,
                                                quantity: '',
                                            }));
                                        }}
                                        error={!!errors.quantity}
                                        helperText={errors.quantity}
                                    />
                                </Grid>

                                {jobTitle === 'Other' && (
                                    <Grid size={{ xs: 12 }}>
                                        <TextField
                                            fullWidth
                                            label={t('sponsor.requests.form.specifyJobTitle')}
                                            value={customJobTitle}
                                            onChange={(e) => {
                                                setCustomJobTitle(
                                                    e.target.value
                                                );
                                                setErrors((prev) => ({
                                                    ...prev,
                                                    jobTitle: '',
                                                }));
                                            }}
                                            error={!!errors.jobTitle}
                                            helperText={errors.jobTitle}
                                        />
                                    </Grid>
                                )}

                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="experience-label">
                                            {t('sponsor.requests.form.experience')}
                                        </InputLabel>
                                        <Select
                                            labelId="experience-label"
                                            value={experience}
                                            label={t('sponsor.requests.form.experience')}
                                            onChange={(e) =>
                                                setExperience(e.target.value)
                                            }
                                        >
                                            <MenuItem value="No experience">
                                                {t('sponsor.requests.form.experienceOptions.none')}
                                            </MenuItem>
                                            <MenuItem value="1-3 years">
                                                {t('sponsor.requests.form.experienceOptions.oneToThree')}
                                            </MenuItem>
                                            <MenuItem value="3+ years">
                                                {t('sponsor.requests.form.experienceOptions.threePlus')}
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <TextField
                                        fullWidth
                                        label={t('sponsor.requests.form.skills')}
                                        placeholder={t('sponsor.requests.form.skillsPlaceholder')}
                                        value={skills}
                                        onChange={(e) =>
                                            setSkills(e.target.value)
                                        }
                                    />
                                </Grid>

                                <Grid size={{ xs: 12 }}>
                                    <TextField
                                        fullWidth
                                        multiline
                                        rows={3}
                                        label={t('sponsor.requests.form.description')}
                                        value={description}
                                        onChange={(e) =>
                                            setDescription(e.target.value)
                                        }
                                    />
                                </Grid>
                            </Grid>
                        </Paper>

                        {/* Section 2: Worker Requirements */}
                        <Paper sx={{ p: 4, mb: 3.5 }}>
                            <Typography
                                variant="h6"
                                fontWeight="bold"
                                gutterBottom
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                }}
                            >
                                <UserCheck size={18} /> {t('sponsor.requests.form.workerReqs')}
                            </Typography>
                            <Divider sx={{ mb: 3 }} />

                            <Grid container spacing={3}>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <TextField
                                        fullWidth
                                        label={t('sponsor.requests.form.nationality')}
                                        placeholder={t('sponsor.requests.form.nationalityPlaceholder')}
                                        value={nationality}
                                        onChange={(e) =>
                                            setNationality(e.target.value)
                                        }
                                    />
                                </Grid>

                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="gender-label">
                                            {t('sponsor.requests.form.gender')}
                                        </InputLabel>
                                        <Select
                                            labelId="gender-label"
                                            value={gender}
                                            label={t('sponsor.requests.form.gender')}
                                            onChange={(e) =>
                                                setGender(e.target.value)
                                            }
                                        >
                                            <MenuItem value="Any">{t('sponsor.requests.form.genderOptions.any')}</MenuItem>
                                            <MenuItem value="Male">
                                                {t('sponsor.requests.form.genderOptions.male')}
                                            </MenuItem>
                                            <MenuItem value="Female">
                                                {t('sponsor.requests.form.genderOptions.female')}
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <TextField
                                        fullWidth
                                        label={t('sponsor.requests.form.ageRange')}
                                        placeholder={t('sponsor.requests.form.ageRangePlaceholder')}
                                        value={ageRange}
                                        onChange={(e) =>
                                            setAgeRange(e.target.value)
                                        }
                                    />
                                </Grid>

                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <TextField
                                        fullWidth
                                        label={t('sponsor.requests.form.languages')}
                                        placeholder={t('sponsor.requests.form.languagesPlaceholder')}
                                        value={languages}
                                        onChange={(e) =>
                                            setLanguages(e.target.value)
                                        }
                                    />
                                </Grid>
                            </Grid>
                        </Paper>

                        {/* Section 3: Employment Details */}
                        <Paper sx={{ p: 4 }}>
                            <Typography
                                variant="h6"
                                fontWeight="bold"
                                gutterBottom
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                }}
                            >
                                <CreditCard size={18} /> {t('sponsor.requests.form.employmentDetails')}
                            </Typography>
                            <Divider sx={{ mb: 3 }} />

                            <Grid container spacing={3}>
                                <Grid size={{ xs: 12, sm: 4 }}>
                                    <TextField
                                        fullWidth
                                        label={t('sponsor.requests.form.workLocation')}
                                        placeholder={t('sponsor.requests.form.workLocationPlaceholder')}
                                        value={workLocation}
                                        onChange={(e) => {
                                            setWorkLocation(e.target.value);
                                            setErrors((prev) => ({
                                                ...prev,
                                                workLocation: '',
                                            }));
                                        }}
                                        error={!!errors.workLocation}
                                        helperText={errors.workLocation}
                                    />
                                </Grid>

                                <Grid size={{ xs: 12, sm: 4 }}>
                                    <TextField
                                        fullWidth
                                        label={t('sponsor.requests.form.city')}
                                        placeholder={t('sponsor.requests.form.cityPlaceholder')}
                                        value={city}
                                        onChange={(e) => {
                                            setCity(e.target.value);
                                            setErrors((prev) => ({
                                                ...prev,
                                                city: '',
                                            }));
                                        }}
                                        error={!!errors.city}
                                        helperText={errors.city}
                                    />
                                </Grid>

                                <Grid size={{ xs: 12, sm: 4 }}>
                                    <TextField
                                        fullWidth
                                        label={t('sponsor.requests.form.region')}
                                        placeholder={t('sponsor.requests.form.regionPlaceholder')}
                                        value={region}
                                        onChange={(e) => {
                                            setRegion(e.target.value);
                                            setErrors((prev) => ({
                                                ...prev,
                                                region: '',
                                            }));
                                        }}
                                        error={!!errors.region}
                                        helperText={errors.region}
                                    />
                                </Grid>

                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <TextField
                                        fullWidth
                                        label={t('sponsor.requests.form.salaryRange')}
                                        placeholder={t('sponsor.requests.form.salaryRangePlaceholder')}
                                        value={salaryRange}
                                        onChange={(e) =>
                                            setSalaryRange(e.target.value)
                                        }
                                    />
                                </Grid>

                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <TextField
                                        fullWidth
                                        label={t('sponsor.requests.form.workingHours')}
                                        placeholder={t('sponsor.requests.form.workingHoursPlaceholder')}
                                        value={workingHours}
                                        onChange={(e) =>
                                            setWorkingHours(e.target.value)
                                        }
                                    />
                                </Grid>

                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <TextField
                                        fullWidth
                                        label={t('sponsor.requests.form.contractDuration')}
                                        placeholder={t('sponsor.requests.form.contractDurationPlaceholder')}
                                        value={contractDuration}
                                        onChange={(e) =>
                                            setContractDuration(e.target.value)
                                        }
                                    />
                                </Grid>

                                <Grid size={{ xs: 12, sm: 3 }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="accommodation-label">
                                            {t('sponsor.requests.form.accommodation')}
                                        </InputLabel>
                                        <Select
                                            labelId="accommodation-label"
                                            value={accommodation}
                                            label={t('sponsor.requests.form.accommodation')}
                                            onChange={(e) =>
                                                setAccommodation(e.target.value)
                                            }
                                        >
                                            <MenuItem value="Yes">{t('sponsor.requests.form.yes')}</MenuItem>
                                            <MenuItem value="No">{t('sponsor.requests.form.no')}</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid size={{ xs: 12, sm: 3 }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="transportation-label">
                                            {t('sponsor.requests.form.transportation')}
                                        </InputLabel>
                                        <Select
                                            labelId="transportation-label"
                                            value={transportation}
                                            label={t('sponsor.requests.form.transportation')}
                                            onChange={(e) =>
                                                setTransportation(
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <MenuItem value="Yes">{t('sponsor.requests.form.yes')}</MenuItem>
                                            <MenuItem value="No">{t('sponsor.requests.form.no')}</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>

                    {/* Right panel: Sidebar helper */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Paper
                            sx={{
                                p: 4,
                                mb: 3,
                                border: '1px solid #D2DAE5',
                                backgroundColor: '#F8FAFC',
                            }}
                        >
                            <Typography
                                variant="h6"
                                fontWeight="bold"
                                gutterBottom
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                }}
                            >
                                <Info size={18} /> {t('sponsor.requests.form.sidebar.statusTitle')}
                            </Typography>
                            <Divider sx={{ mb: 2 }} />
                            <Box
                                sx={{
                                    p: 2,
                                    borderRadius: '8px',
                                    backgroundColor: '#EDF0F5',
                                    border: '1px solid #D2DAE5',
                                    mb: 2,
                                }}
                            >
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {t('sponsor.requests.form.sidebar.statusLabel')}
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    fontWeight="bold"
                                    color="#0969DA"
                                >
                                    {t('sponsor.requests.form.sidebar.statusPending')}
                                </Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                                {t('sponsor.requests.form.sidebar.statusDescription')}
                            </Typography>
                        </Paper>

                        <Paper sx={{ p: 4 }}>
                            <Button
                                fullWidth
                                variant="contained"
                                size="large"
                                type="submit"
                                startIcon={<Save size={18} />}
                                sx={{ mb: 2 }}
                            >
                                {t('sponsor.requests.form.submit')}
                            </Button>
                            <Button
                                fullWidth
                                variant="outlined"
                                size="large"
                                onClick={() => navigate('/sponsor/requests')}
                                sx={{
                                    borderColor: '#D2DAE5',
                                    color: '#5E7089',
                                    '&:hover': {
                                        backgroundColor: '#F5F7FA',
                                        borderColor: '#B0BDD0',
                                    },
                                }}
                            >
                                {t('sponsor.requests.form.cancel')}
                            </Button>
                        </Paper>
                    </Grid>
                </Grid>
            </form>

            <Snackbar
                open={successOpen}
                autoHideDuration={2000}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    severity="success"
                    sx={{ width: '100%', borderRadius: '8px' }}
                >
                    {t('sponsor.requests.form.successMessage')}
                </Alert>
            </Snackbar>
        </DashboardLayout>
    );
}
