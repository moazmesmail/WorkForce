import { useState } from 'react';
import { useNavigate } from 'react-router';
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

        if (!finalJobTitle) newErrors.jobTitle = 'Job title is required';
        if (!quantity || parseInt(quantity, 10) <= 0)
            newErrors.quantity = 'Must be greater than 0';
        if (!workLocation) newErrors.workLocation = 'Work location is required';
        if (!city) newErrors.city = 'City is required';
        if (!region) newErrors.region = 'Region is required';

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
                        Create Worker Request
                    </Typography>
                    <Typography color="text.secondary" variant="body2">
                        Request new workers with specific criteria for your
                        organization.
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
                                <Briefcase size={18} /> Job Information
                            </Typography>
                            <Divider sx={{ mb: 3 }} />

                            <Grid container spacing={3}>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <FormControl
                                        fullWidth
                                        error={!!errors.jobTitle}
                                    >
                                        <InputLabel id="job-title-label">
                                            Job Title *
                                        </InputLabel>
                                        <Select
                                            labelId="job-title-label"
                                            value={jobTitle}
                                            label="Job Title *"
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
                                                    {opt}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <TextField
                                        fullWidth
                                        label="Number of Workers Needed *"
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
                                            label="Specify Job Title *"
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
                                            Required Experience
                                        </InputLabel>
                                        <Select
                                            labelId="experience-label"
                                            value={experience}
                                            label="Required Experience"
                                            onChange={(e) =>
                                                setExperience(e.target.value)
                                            }
                                        >
                                            <MenuItem value="No experience">
                                                No experience
                                            </MenuItem>
                                            <MenuItem value="1-3 years">
                                                1-3 years
                                            </MenuItem>
                                            <MenuItem value="3+ years">
                                                3+ years
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <TextField
                                        fullWidth
                                        label="Required Skills (optional)"
                                        placeholder="e.g. Forklift Certification, Plumbing"
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
                                        label="Job Description (optional)"
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
                                <UserCheck size={18} /> Worker Requirements
                            </Typography>
                            <Divider sx={{ mb: 3 }} />

                            <Grid container spacing={3}>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <TextField
                                        fullWidth
                                        label="Preferred Nationality (optional)"
                                        placeholder="e.g. Indian, Pakistani, Filipino"
                                        value={nationality}
                                        onChange={(e) =>
                                            setNationality(e.target.value)
                                        }
                                    />
                                </Grid>

                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="gender-label">
                                            Preferred Gender (optional)
                                        </InputLabel>
                                        <Select
                                            labelId="gender-label"
                                            value={gender}
                                            label="Preferred Gender (optional)"
                                            onChange={(e) =>
                                                setGender(e.target.value)
                                            }
                                        >
                                            <MenuItem value="Any">Any</MenuItem>
                                            <MenuItem value="Male">
                                                Male
                                            </MenuItem>
                                            <MenuItem value="Female">
                                                Female
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <TextField
                                        fullWidth
                                        label="Age Range (optional)"
                                        placeholder="e.g. 21-35"
                                        value={ageRange}
                                        onChange={(e) =>
                                            setAgeRange(e.target.value)
                                        }
                                    />
                                </Grid>

                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <TextField
                                        fullWidth
                                        label="Language Requirements (optional)"
                                        placeholder="e.g. English, Arabic"
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
                                <CreditCard size={18} /> Employment Details
                            </Typography>
                            <Divider sx={{ mb: 3 }} />

                            <Grid container spacing={3}>
                                <Grid size={{ xs: 12, sm: 4 }}>
                                    <TextField
                                        fullWidth
                                        label="Work Location *"
                                        placeholder="e.g. Site Office A"
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
                                        label="City *"
                                        placeholder="e.g. Riyadh"
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
                                        label="Region *"
                                        placeholder="e.g. Central Region"
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
                                        label="Salary Range"
                                        placeholder="e.g. 2,000 - 3,500 SAR"
                                        value={salaryRange}
                                        onChange={(e) =>
                                            setSalaryRange(e.target.value)
                                        }
                                    />
                                </Grid>

                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <TextField
                                        fullWidth
                                        label="Working Hours"
                                        placeholder="e.g. 8 hours/day"
                                        value={workingHours}
                                        onChange={(e) =>
                                            setWorkingHours(e.target.value)
                                        }
                                    />
                                </Grid>

                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <TextField
                                        fullWidth
                                        label="Contract Duration"
                                        placeholder="e.g. 2 Years"
                                        value={contractDuration}
                                        onChange={(e) =>
                                            setContractDuration(e.target.value)
                                        }
                                    />
                                </Grid>

                                <Grid size={{ xs: 12, sm: 3 }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="accommodation-label">
                                            Accommodation Provided
                                        </InputLabel>
                                        <Select
                                            labelId="accommodation-label"
                                            value={accommodation}
                                            label="Accommodation Provided"
                                            onChange={(e) =>
                                                setAccommodation(e.target.value)
                                            }
                                        >
                                            <MenuItem value="Yes">Yes</MenuItem>
                                            <MenuItem value="No">No</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid size={{ xs: 12, sm: 3 }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="transportation-label">
                                            Transportation Provided
                                        </InputLabel>
                                        <Select
                                            labelId="transportation-label"
                                            value={transportation}
                                            label="Transportation Provided"
                                            onChange={(e) =>
                                                setTransportation(
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <MenuItem value="Yes">Yes</MenuItem>
                                            <MenuItem value="No">No</MenuItem>
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
                                <Info size={18} /> Request Status
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
                                    Status
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    fontWeight="bold"
                                    color="#0969DA"
                                >
                                    Pending
                                </Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                                This request status is system-managed. Upon
                                submission, our smart recommendation engine will
                                begin matching candidate profiles and
                                coordination workflows.
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
                                Submit Request
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
                                Cancel
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
                    Worker request submitted successfully!
                </Alert>
            </Snackbar>
        </DashboardLayout>
    );
}
