import { Box, Button, Container, Grid, Typography } from '@mui/material';
import {
    ArrowRight,
    Briefcase,
    Building2,
    ShieldCheck,
    Users,
    Zap,
} from 'lucide-react';
import { useNavigate } from 'react-router';

const stats = [
    { value: '12,000+', label: 'Active Workers' },
    { value: '850+', label: 'Registered Sponsors' },
    { value: '200+', label: 'Partner Agencies' },
    { value: '98%', label: 'Placement Rate' },
];

const features = [
    {
        icon: Briefcase,
        title: 'For Workers',
        color: '#0969DA',
        bg: '#DDF4FF',
        description:
            'Manage your profile, track job applications, upload documents, and request sponsorship transfers — all from one unified dashboard.',
        points: [
            'Profile & document management',
            'Job search & applications',
            'Sponsorship transfer requests',
        ],
    },
    {
        icon: Building2,
        title: 'For Sponsors',
        color: '#1A7F37',
        bg: '#DDFBE6',
        description:
            'Post recruitment requests, search verified talent directly, manage your workforce, and handle all approvals in one place.',
        points: [
            'Worker requests & search',
            'Job offer management',
            'Recruitment approvals',
        ],
    },
    {
        icon: ShieldCheck,
        title: 'For Agencies',
        color: '#B54708',
        bg: '#FEF0C7',
        description:
            'Register workers into your pool, verify essential documents, and fulfill sponsor recruitment requests with full workflow visibility.',
        points: [
            'Worker pool management',
            'Document verification',
            'Recruitment fulfillment',
        ],
    },
];

export default function LandingPage() {
    const navigate = useNavigate();

    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
            {/* Navbar */}
            <Box
                sx={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 100,
                    backgroundColor: '#ffffff',
                    borderBottom: '1px solid #D2DAE5',
                }}
            >
                <Container maxWidth="lg">
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            py: 1.5,
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1.25,
                            }}
                        >
                            <Box
                                sx={{
                                    width: 30,
                                    height: 30,
                                    borderRadius: '7px',
                                    backgroundColor: '#0969DA',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0,
                                }}
                            >
                                <Zap
                                    size={16}
                                    color="white"
                                    strokeWidth={2.5}
                                />
                            </Box>
                            <Typography
                                sx={{
                                    fontWeight: 700,
                                    fontSize: '1rem',
                                    color: '#111827',
                                    letterSpacing: '-0.01em',
                                }}
                            >
                                WorkForcePro
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                gap: 1,
                                alignItems: 'center',
                            }}
                        >
                            <Button
                                variant="text"
                                onClick={() => navigate('/login')}
                                sx={{
                                    color: '#5E7089',
                                    fontWeight: 500,
                                    fontSize: '0.875rem',
                                    '&:hover': {
                                        backgroundColor: '#F5F7FA',
                                        color: '#111827',
                                    },
                                }}
                            >
                                Sign In
                            </Button>
                            <Button
                                variant="contained"
                                onClick={() => navigate('/register')}
                                sx={{ fontSize: '0.875rem' }}
                            >
                                Get Started
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </Box>

            {/* Hero */}
            <Box
                sx={{
                    backgroundColor: '#F5F7FA',
                    borderBottom: '1px solid #D2DAE5',
                    pt: { xs: 8, md: 14 },
                    pb: { xs: 8, md: 14 },
                }}
            >
                <Container maxWidth="md">
                    <Box
                        sx={{
                            textAlign: 'center',
                            height: '60vh',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: { xs: '2rem', md: '3rem' },
                                fontWeight: 800,
                                color: '#111827',
                                letterSpacing: '-0.03em',
                                lineHeight: 1.1,
                                mb: 2.5,
                            }}
                        >
                            Workforce Recruitment,{' '}
                            <Box component="span" sx={{ color: '#0969DA' }}>
                                Simplified
                            </Box>
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: { xs: '1rem', md: '1.125rem' },
                                color: '#5E7089',
                                mb: 4,
                                lineHeight: 1.7,
                                maxWidth: 540,
                                mx: 'auto',
                            }}
                        >
                            The unified platform connecting workers, sponsors,
                            and recruitment agencies — streamline every step
                            from sourcing to placement.
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                gap: 1.5,
                                flexWrap: 'wrap',
                            }}
                        >
                            <Button
                                variant="contained"
                                size="large"
                                onClick={() => navigate('/register')}
                                endIcon={<ArrowRight size={16} />}
                                sx={{ px: 3.5, fontSize: '0.9375rem' }}
                            >
                                Create Free Account
                            </Button>
                            <Button
                                variant="outlined"
                                size="large"
                                onClick={() => navigate('/login')}
                                sx={{
                                    px: 3.5,
                                    fontSize: '0.9375rem',
                                    borderColor: '#D2DAE5',
                                    color: '#111827',
                                    '&:hover': {
                                        backgroundColor: '#EDF0F5',
                                        borderColor: '#B0BDD0',
                                    },
                                }}
                            >
                                Sign In
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </Box>

            {/* Stats bar */}
            <Box
                sx={{
                    backgroundColor: '#ffffff',
                    borderBottom: '1px solid #D2DAE5',
                }}
            >
                <Container maxWidth="lg">
                    <Grid container>
                        {stats.map((stat, i) => (
                            <Grid size={{ xs: 6, md: 3 }} key={stat.label}>
                                <Box
                                    sx={{
                                        py: 3,
                                        px: 4,
                                        textAlign: 'center',
                                        borderRight:
                                            i < 3
                                                ? '1px solid #D2DAE5'
                                                : 'none',
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontWeight: 700,
                                            fontSize: '1.5rem',
                                            color: '#111827',
                                            letterSpacing: '-0.02em',
                                            lineHeight: 1.1,
                                        }}
                                    >
                                        {stat.value}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontSize: '0.8125rem',
                                            color: '#5E7089',
                                            mt: 0.5,
                                        }}
                                    >
                                        {stat.label}
                                    </Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* Features */}
            <Box sx={{ backgroundColor: '#ffffff', py: { xs: 8, md: 12 } }}>
                <Container maxWidth="lg">
                    <Box sx={{ textAlign: 'center', mb: 7 }}>
                        <Typography
                            sx={{
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                color: '#0969DA',
                                mb: 1.5,
                            }}
                        >
                            Platform Modules
                        </Typography>
                        <Typography
                            sx={{
                                fontWeight: 800,
                                color: '#111827',
                                fontSize: { xs: '1.625rem', md: '2.25rem' },
                                letterSpacing: '-0.02em',
                                mb: 1.5,
                            }}
                        >
                            Designed for Every Role
                        </Typography>
                        <Typography
                            sx={{
                                color: '#5E7089',
                                maxWidth: 480,
                                mx: 'auto',
                                lineHeight: 1.7,
                                fontSize: '0.9375rem',
                            }}
                        >
                            Three purpose-built modules, one integrated platform
                            — each role gets exactly what they need.
                        </Typography>
                    </Box>

                    <Grid container spacing={2.5}>
                        {features.map((f) => {
                            const Icon = f.icon;
                            return (
                                <Grid size={{ xs: 12, md: 4 }} key={f.title}>
                                    <Box
                                        sx={{
                                            p: 3.5,
                                            height: '100%',
                                            backgroundColor: '#ffffff',
                                            border: '1px solid #D2DAE5',
                                            borderRadius: '10px',
                                            transition:
                                                'border-color 0.15s, box-shadow 0.15s',
                                            '&:hover': {
                                                borderColor: '#B0BDD0',
                                                boxShadow:
                                                    '0 4px 16px rgba(17,24,39,0.07)',
                                            },
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: 44,
                                                height: 44,
                                                borderRadius: '10px',
                                                backgroundColor: f.bg,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                mb: 2.5,
                                            }}
                                        >
                                            <Icon
                                                size={22}
                                                color={f.color}
                                                strokeWidth={1.75}
                                            />
                                        </Box>
                                        <Typography
                                            sx={{
                                                fontWeight: 700,
                                                fontSize: '1rem',
                                                color: '#111827',
                                                mb: 1,
                                            }}
                                        >
                                            {f.title}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                color: '#5E7089',
                                                lineHeight: 1.7,
                                                fontSize: '0.875rem',
                                                mb: 2.5,
                                            }}
                                        >
                                            {f.description}
                                        </Typography>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: 0.875,
                                            }}
                                        >
                                            {f.points.map((p) => (
                                                <Box
                                                    key={p}
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 1.25,
                                                    }}
                                                >
                                                    <Box
                                                        sx={{
                                                            width: 5,
                                                            height: 5,
                                                            borderRadius: '50%',
                                                            backgroundColor:
                                                                f.color,
                                                            flexShrink: 0,
                                                        }}
                                                    />
                                                    <Typography
                                                        sx={{
                                                            fontSize:
                                                                '0.8125rem',
                                                            color: '#5E7089',
                                                        }}
                                                    >
                                                        {p}
                                                    </Typography>
                                                </Box>
                                            ))}
                                        </Box>
                                    </Box>
                                </Grid>
                            );
                        })}
                    </Grid>
                </Container>
            </Box>

            {/* CTA Banner */}
            <Box
                sx={{
                    backgroundColor: '#F5F7FA',
                    borderTop: '1px solid #D2DAE5',
                    borderBottom: '1px solid #D2DAE5',
                    py: { xs: 7, md: 10 },
                }}
            >
                <Container maxWidth="md">
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography
                            sx={{
                                fontWeight: 800,
                                color: '#111827',
                                fontSize: { xs: '1.5rem', md: '2rem' },
                                letterSpacing: '-0.02em',
                                mb: 1.5,
                            }}
                        >
                            Ready to streamline your workforce?
                        </Typography>
                        <Typography
                            sx={{
                                color: '#5E7089',
                                mb: 4,
                                fontSize: '0.9375rem',
                                lineHeight: 1.7,
                            }}
                        >
                            Join thousands of workers, sponsors, and agencies
                            already using WorkForcePro.
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                gap: 1.5,
                                justifyContent: 'center',
                                flexWrap: 'wrap',
                            }}
                        >
                            <Button
                                variant="contained"
                                size="large"
                                onClick={() => navigate('/register')}
                                endIcon={<ArrowRight size={16} />}
                                sx={{ px: 3.5, fontSize: '0.9375rem' }}
                            >
                                Get Started Free
                            </Button>
                            <Button
                                variant="outlined"
                                size="large"
                                onClick={() => navigate('/login')}
                                sx={{
                                    px: 3.5,
                                    fontSize: '0.9375rem',
                                    borderColor: '#D2DAE5',
                                    color: '#5E7089',
                                    '&:hover': {
                                        backgroundColor: '#EDF0F5',
                                        borderColor: '#B0BDD0',
                                        color: '#111827',
                                    },
                                }}
                            >
                                Already have an account? Sign In
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </Box>

            {/* Footer */}
            <Box
                sx={{
                    backgroundColor: '#ffffff',
                    borderTop: '1px solid #D2DAE5',
                    py: 3,
                }}
            >
                <Container maxWidth="lg">
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            gap: 2,
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                            }}
                        >
                            <Users size={14} color="#8494AB" />
                            <Typography
                                sx={{ fontSize: '0.8125rem', color: '#8494AB' }}
                            >
                                WorkForcePro © {new Date().getFullYear()}
                            </Typography>
                        </Box>
                        <Typography
                            sx={{ fontSize: '0.8125rem', color: '#8494AB' }}
                        >
                            Workforce Recruitment & Sponsorship Transfer
                            Platform
                        </Typography>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
}
