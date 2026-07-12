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

export default function SponsorRegistration() {
    const { t } = useTranslation();
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
                            {t('public_reg.sponsor.title')}
                        </Typography>
                        <Typography
                            variant="body1"
                            color="text.secondary"
                            mb={4}
                        >
                            {t('public_reg.sponsor.subtitle')}
                        </Typography>

                        <form onSubmit={handleRegister}>
                            {/* Basic Information */}
                            <Typography variant="h6" gutterBottom mt={2}>
                                {t('public_reg.sponsor.basic_info_title')}
                            </Typography>
                            <Divider sx={{ mb: 3 }} />
                            <FormControl component="fieldset" sx={{ mb: 2 }}>
                                <FormLabel component="legend">
                                    {t('public_reg.sponsor.type_label')}
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
                                        label={t('public_reg.sponsor.type_individual')}
                                    />
                                    <FormControlLabel
                                        value="Company"
                                        control={<Radio />}
                                        label={t('public_reg.sponsor.type_company')}
                                    />
                                </RadioGroup>
                            </FormControl>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={8}>
                                    <TextField
                                        fullWidth
                                        label={
                                            sponsorType === 'Company'
                                                ? t('public_reg.sponsor.company_name_label')
                                                : t('public_reg.sponsor.full_name_label')
                                        }
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControl fullWidth required>
                                        <InputLabel>{t('public_reg.sponsor.city_label')}</InputLabel>
                                        <Select
                                            value={city}
                                            label={t('public_reg.sponsor.city_label')}
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
                                        label={t('public_reg.sponsor.address_label')}
                                    />
                                </Grid>
                            </Grid>

                            {/* Contact Information */}
                            <Typography variant="h6" gutterBottom mt={4}>
                                {t('public_reg.sponsor.contact_info_title')}
                            </Typography>
                            <Divider sx={{ mb: 3 }} />
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label={t('public_reg.sponsor.mobile_label')}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label={t('public_reg.sponsor.email_label')}
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
                                        label={t('public_reg.sponsor.password_label')}
                                        type="password"
                                        required
                                    />
                                </Grid>
                            </Grid>

                            {/* Identification */}
                            <Typography variant="h6" gutterBottom mt={4}>
                                {t('public_reg.sponsor.identification_title')}
                            </Typography>
                            <Divider sx={{ mb: 3 }} />
                            <Grid container spacing={2}>
                                {sponsorType === 'Individual' ? (
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label={t('public_reg.sponsor.national_id_label')}
                                            required
                                        />
                                    </Grid>
                                ) : (
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label={t('public_reg.sponsor.commercial_reg_label')}
                                            required
                                        />
                                    </Grid>
                                )}
                            </Grid>

                            {/* Hiring Information */}
                            <Typography variant="h6" gutterBottom mt={4}>
                                {t('public_reg.sponsor.hiring_info_title')}
                            </Typography>
                            <Divider sx={{ mb: 3 }} />
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label={t('public_reg.sponsor.workers_needed_label')}
                                        type="number"
                                        inputProps={{ min: 1 }}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <InputLabel>
                                            {t('public_reg.sponsor.required_job_title_label')}
                                        </InputLabel>
                                        <Select
                                            label={t('public_reg.sponsor.required_job_title_label')}
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
                                            {t('public_reg.sponsor.preferred_nationality_label')}
                                        </InputLabel>
                                        <Select
                                            label={t('public_reg.sponsor.preferred_nationality_label')}
                                            defaultValue=""
                                        >
                                            <MenuItem value="">
                                                {t('public_reg.sponsor.no_preference')}
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
                                        <InputLabel>{t('public_reg.sponsor.work_location_label')}</InputLabel>
                                        <Select
                                            label={t('public_reg.sponsor.work_location_label')}
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
                                    {t('public_reg.sponsor.back_btn')}
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                >
                                    {t('public_reg.sponsor.submit_btn')}
                                </Button>
                            </Box>
                        </form>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    );
}
