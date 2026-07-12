import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    Typography,
    Container,
    Grid,
} from '@mui/material';
import { useNavigate } from 'react-router';
import { Briefcase, Building, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function RegisterSelectPage() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const options = [
        {
            titleKey: 'public_reg.select.options.worker.title',
            descriptionKey: 'public_reg.select.options.worker.desc',
            icon: <Briefcase size={40} color="#1565C0" />,
            path: '/register/worker',
        },
        {
            titleKey: 'public_reg.select.options.sponsor.title',
            descriptionKey: 'public_reg.select.options.sponsor.desc',
            icon: <Building size={40} color="#2E7D32" />,
            path: '/register/sponsor',
        },
        {
            titleKey: 'public_reg.select.options.agency.title',
            descriptionKey: 'public_reg.select.options.agency.desc',
            icon: <ShieldCheck size={40} color="#1565C0" />,
            path: '/register/agency',
        },
    ];

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#F5F7FA',
                py: 8,
            }}
        >
            <Container maxWidth="md">
                <Typography
                    variant="h3"
                    align="center"
                    gutterBottom
                    fontWeight="bold"
                    mb={6}
                >
                    {t('public_reg.select.title')}
                </Typography>
                <Grid container spacing={4}>
                    {options.map((option) => (
                        <Grid item xs={12} sm={4} key={option.titleKey}>
                            <Card
                                sx={{
                                    height: '100%',
                                    '&:hover': { boxShadow: 6 },
                                }}
                            >
                                <CardActionArea
                                    onClick={() => navigate(option.path)}
                                    sx={{ height: '100%', p: 3 }}
                                >
                                    <CardContent sx={{ textAlign: 'center' }}>
                                        <Box sx={{ mb: 2 }}>{option.icon}</Box>
                                        <Typography
                                            variant="h5"
                                            component="div"
                                            gutterBottom
                                            fontWeight="bold"
                                        >
                                            {t(option.titleKey)}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            {t(option.descriptionKey)}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <Box textAlign="center" mt={6}>
                    <Typography
                        variant="body1"
                        sx={{
                            cursor: 'pointer',
                            color: 'primary.main',
                            textDecoration: 'underline',
                        }}
                        onClick={() => navigate('/login')}
                    >
                        {t('public_reg.select.already_have_account')}
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
}
