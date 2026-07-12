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
import { useTranslation } from 'react-i18next';

export default function WorkerRegistration() {
    const { t } = useTranslation();
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
                            {t('public_reg.worker.title')}
                        </Typography>
                        <Typography
                            variant="body1"
                            color="text.secondary"
                            mb={4}
                        >
                            {t('public_reg.worker.subtitle')}
                        </Typography>

                        <form onSubmit={handleRegister}>
                            {/* Basic Information */}
                            <Typography variant="h6" gutterBottom mt={2}>
                                {t('public_reg.worker.basic_info_title')}
                            </Typography>
                            <Divider sx={{ mb: 3 }} />
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label={t('public_reg.worker.full_name_label')}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth required>
                                        <InputLabel>{t('public_reg.worker.nationality_label')}</InputLabel>
                                        <Select
                                            value={nationality}
                                            label={t('public_reg.worker.nationality_label')}
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
                                        <InputLabel>{t('public_reg.worker.gender_label')}</InputLabel>
                                        <Select
                                            value={gender}
                                            label={t('public_reg.worker.gender_label')}
                                            onChange={(e) =>
                                                setGender(e.target.value)
                                            }
                                        >
                                            <MenuItem value="Male">
                                                {t('public_reg.worker.gender_male')}
                                            </MenuItem>
                                            <MenuItem value="Female">
                                                {t('public_reg.worker.gender_female')}
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label={t('public_reg.worker.dob_label')}
                                        type="date"
                                        InputLabelProps={{ shrink: true }}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth required>
                                        <InputLabel>{t('public_reg.worker.current_city_label')}</InputLabel>
                                        <Select
                                            value={city}
                                            label={t('public_reg.worker.current_city_label')}
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
                                {t('public_reg.worker.contact_info_title')}
                            </Typography>
                            <Divider sx={{ mb: 3 }} />
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label={t('public_reg.worker.mobile_label')}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label={t('public_reg.worker.email_label')}
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
                                        label={t('public_reg.worker.password_label')}
                                        type="password"
                                        required
                                    />
                                </Grid>
                            </Grid>

                            {/* Employment Information */}
                            <Typography variant="h6" gutterBottom mt={4}>
                                {t('public_reg.worker.employment_info_title')}
                            </Typography>
                            <Divider sx={{ mb: 3 }} />
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth required>
                                        <InputLabel>{t('public_reg.worker.job_title_label')}</InputLabel>
                                        <Select
                                            value={jobTitle}
                                            label={t('public_reg.worker.job_title_label')}
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
                                        label={t('public_reg.worker.experience_label')}
                                        type="number"
                                        inputProps={{ min: 0 }}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth required>
                                        <InputLabel>
                                            {t('public_reg.worker.employment_status_label')}
                                        </InputLabel>
                                        <Select
                                            value={employmentStatus}
                                            label={t('public_reg.worker.employment_status_label')}
                                            onChange={(e) =>
                                                setEmploymentStatus(
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <MenuItem value="Available">
                                                {t('public_reg.worker.status_available')}
                                            </MenuItem>
                                            <MenuItem value="Employed">
                                                {t('public_reg.worker.status_employed')}
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth required>
                                        <InputLabel>
                                            {t('public_reg.worker.preferred_location_label')}
                                        </InputLabel>
                                        <Select
                                            value={preferredLocation}
                                            label={t('public_reg.worker.preferred_location_label')}
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
                                {t('public_reg.worker.sponsorship_title')}
                            </Typography>
                            <Divider sx={{ mb: 3 }} />
                            <FormControl component="fieldset">
                                <FormLabel component="legend">
                                    {t('public_reg.worker.sponsorship_legend')}
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
                                        label={t('public_reg.worker.sponsorship_sponsored')}
                                    />
                                    <FormControlLabel
                                        value="Needs Sponsorship Transfer"
                                        control={<Radio />}
                                        label={t('public_reg.worker.sponsorship_needs_transfer')}
                                    />
                                </RadioGroup>
                            </FormControl>

                            {/* Documents */}
                            <Typography variant="h6" gutterBottom mt={4}>
                                {t('public_reg.worker.documents_title')}
                            </Typography>
                            <Divider sx={{ mb: 3 }} />
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label={t('public_reg.worker.id_passport_label')}
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
                                        {t('public_reg.worker.upload_resume_btn')}
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
                                    {t('public_reg.worker.back_btn')}
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                >
                                    {t('public_reg.worker.submit_btn')}
                                </Button>
                            </Box>
                        </form>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    );
}
