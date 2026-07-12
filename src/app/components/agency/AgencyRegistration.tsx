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
import { useTranslation } from 'react-i18next';

export default function AgencyRegistration() {
    const { t } = useTranslation();
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
                            {t('public_reg.agency.title')}
                        </Typography>
                        <Typography
                            variant="body1"
                            color="text.secondary"
                            mb={4}
                        >
                            {t('public_reg.agency.subtitle')}
                        </Typography>

                        <form onSubmit={handleRegister}>
                            <Typography variant="h6" gutterBottom mt={2}>
                                {t('public_reg.agency.info_title')}
                            </Typography>
                            <Divider sx={{ mb: 3 }} />
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={8}>
                                    <TextField
                                        fullWidth
                                        label={t('public_reg.agency.name_label')}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        fullWidth
                                        label={t('public_reg.agency.license_label')}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth required>
                                        <InputLabel>{t('public_reg.agency.city_label')}</InputLabel>
                                        <Select
                                            value={city}
                                            label={t('public_reg.agency.city_label')}
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
                                        label={t('public_reg.agency.commercial_reg_label')}
                                        required
                                    />
                                </Grid>
                            </Grid>

                            <Typography variant="h6" gutterBottom mt={4}>
                                {t('public_reg.agency.admin_contact_title')}
                            </Typography>
                            <Divider sx={{ mb: 3 }} />
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label={t('public_reg.agency.contact_person_label')}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label={t('public_reg.agency.mobile_label')}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label={t('public_reg.agency.email_label')}
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
                                        label={t('public_reg.agency.password_label')}
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
                                    {t('public_reg.agency.back_btn')}
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                >
                                    {t('public_reg.agency.submit_btn')}
                                </Button>
                            </Box>
                        </form>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    );
}
