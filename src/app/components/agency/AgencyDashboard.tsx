import { Box, Typography, Grid, Paper, Divider, Button } from '@mui/material';
import { DashboardLayout, NavItem } from '../shared/DashboardLayout';
import {
    Home,
    UserPlus,
    Users,
    FileCheck,
    ClipboardList,
    ArrowRight,
    TrendingUp,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router';
import { workers, recruitmentRequests } from '../../data/mockData';
import { StatusBadge } from '../shared/StatusBadge';

export const agencyNavItems: NavItem[] = [
    { label: 'Dashboard', path: '/agency/dashboard', icon: <Home /> },
    {
        label: 'Register Worker',
        path: '/agency/register-worker',
        icon: <UserPlus />,
    },
    { label: 'Manage Workers', path: '/agency/workers', icon: <Users /> },
    {
        label: 'Verify Documents',
        path: '/agency/documents',
        icon: <FileCheck />,
    },
    {
        label: 'Recruitment Requests',
        path: '/agency/requests',
        icon: <ClipboardList />,
    },
];

const statCards = [
    {
        label: 'Total Workers Managed',
        value: '45',
        icon: Users,
        color: '#0969DA',
        bg: '#DDF4FF',
        path: '/agency/workers',
    },
    {
        label: 'Pending Verification',
        value: '8',
        icon: FileCheck,
        color: '#B54708',
        bg: '#FEF0C7',
        path: '/agency/documents',
    },
    {
        label: 'Active Sponsor Requests',
        value: '12',
        icon: ClipboardList,
        color: '#1A7F37',
        bg: '#DDFBE6',
        path: '/agency/requests',
    },
    {
        label: 'Placement Rate',
        value: '94%',
        icon: TrendingUp,
        color: '#5E7089',
        bg: '#EDF0F5',
        path: '/agency/workers',
    },
];

export default function AgencyDashboard() {
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    return (
        <DashboardLayout navItems={agencyNavItems}>
            {/* Header */}
            <Box sx={{ mb: 3 }}>
                <Typography
                    sx={{
                        fontWeight: 700,
                        fontSize: '1.25rem',
                        color: '#111827',
                        mb: 0.25,
                    }}
                >
                    Agency Dashboard
                </Typography>
                <Typography sx={{ color: '#5E7089', fontSize: '0.875rem' }}>
                    Welcome back, {currentUser?.name?.split(' ')[0] || 'there'}{' '}
                    — manage your worker pool and fulfill sponsor requests.
                </Typography>
            </Box>

            {/* Stat Cards */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
                {statCards.map((s) => {
                    const Icon = s.icon;
                    return (
                        <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={s.label}>
                            <Paper
                                onClick={() => navigate(s.path)}
                                sx={{
                                    p: 2.5,
                                    cursor: 'pointer',
                                    '&:hover': {
                                        borderColor: '#B0BDD0',
                                        boxShadow:
                                            '0 1px 6px rgba(17,24,39,0.07)',
                                    },
                                    transition:
                                        'border-color 0.12s, box-shadow 0.12s',
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        justifyContent: 'space-between',
                                        mb: 2,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: 36,
                                            height: 36,
                                            borderRadius: '8px',
                                            backgroundColor: s.bg,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Icon size={17} color={s.color} />
                                    </Box>
                                    <ArrowRight size={14} color="#B0BDD0" />
                                </Box>
                                <Typography
                                    sx={{
                                        fontSize: '1.625rem',
                                        fontWeight: 700,
                                        color: '#111827',
                                        letterSpacing: '-0.02em',
                                        lineHeight: 1,
                                    }}
                                >
                                    {s.value}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: '0.8125rem',
                                        color: '#5E7089',
                                        mt: 0.5,
                                    }}
                                >
                                    {s.label}
                                </Typography>
                            </Paper>
                        </Grid>
                    );
                })}
            </Grid>

            <Grid container spacing={2.5}>
                {/* Recently Registered Workers */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper sx={{ p: 3 }}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                mb: 1.5,
                            }}
                        >
                            <Typography
                                sx={{
                                    fontWeight: 600,
                                    fontSize: '0.875rem',
                                    color: '#111827',
                                }}
                            >
                                Recent Workers
                            </Typography>
                            <Button
                                size="small"
                                endIcon={<ArrowRight size={12} />}
                                onClick={() => navigate('/agency/workers')}
                                sx={{
                                    fontSize: '0.8125rem',
                                    color: '#0969DA',
                                    px: 1,
                                }}
                            >
                                View All
                            </Button>
                        </Box>
                        <Divider sx={{ mb: 2 }} />
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 1.25,
                            }}
                        >
                            {workers.slice(0, 4).map((w) => (
                                <Box
                                    key={w.id}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        p: 1.5,
                                        borderRadius: '6px',
                                        border: '1px solid #D2DAE5',
                                        gap: 2,
                                        '&:hover': {
                                            backgroundColor: '#F5F7FA',
                                        },
                                        transition: 'background-color 0.1s',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1.5,
                                            minWidth: 0,
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: 32,
                                                height: 32,
                                                borderRadius: '8px',
                                                backgroundColor: '#DDF4FF',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '0.75rem',
                                                fontWeight: 700,
                                                color: '#0969DA',
                                                flexShrink: 0,
                                            }}
                                        >
                                            {w.name.charAt(0)}
                                        </Box>
                                        <Box sx={{ minWidth: 0 }}>
                                            <Typography
                                                sx={{
                                                    fontSize: '0.875rem',
                                                    fontWeight: 600,
                                                    color: '#111827',
                                                }}
                                            >
                                                {w.name}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    fontSize: '0.75rem',
                                                    color: '#5E7089',
                                                }}
                                            >
                                                {w.jobTitle}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <StatusBadge
                                        status={w.verificationStatus}
                                    />
                                </Box>
                            ))}
                        </Box>
                    </Paper>
                </Grid>

                {/* Right column */}
                <Grid size={{ xs: 12, md: 6 }}>
                    {/* Sponsor Requests */}
                    <Paper sx={{ p: 3, mb: 2 }}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                mb: 1.5,
                            }}
                        >
                            <Typography
                                sx={{
                                    fontWeight: 600,
                                    fontSize: '0.875rem',
                                    color: '#111827',
                                }}
                            >
                                Sponsor Requests
                            </Typography>
                            <Button
                                size="small"
                                endIcon={<ArrowRight size={12} />}
                                onClick={() => navigate('/agency/requests')}
                                sx={{
                                    fontSize: '0.8125rem',
                                    color: '#0969DA',
                                    px: 1,
                                }}
                            >
                                View All
                            </Button>
                        </Box>
                        <Divider sx={{ mb: 2 }} />
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 1.25,
                            }}
                        >
                            {recruitmentRequests.map((req) => (
                                <Box
                                    key={req.id}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        p: 1.5,
                                        borderRadius: '6px',
                                        border: '1px solid #D2DAE5',
                                        gap: 2,
                                        '&:hover': {
                                            backgroundColor: '#F5F7FA',
                                        },
                                        transition: 'background-color 0.1s',
                                    }}
                                >
                                    <Box sx={{ minWidth: 0 }}>
                                        <Typography
                                            sx={{
                                                fontSize: '0.875rem',
                                                fontWeight: 600,
                                                color: '#111827',
                                            }}
                                        >
                                            {req.jobTitle}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                fontSize: '0.75rem',
                                                color: '#5E7089',
                                            }}
                                        >
                                            {req.sponsor} · {req.workersNeeded}{' '}
                                            workers needed
                                        </Typography>
                                    </Box>
                                    <StatusBadge status={req.status} />
                                </Box>
                            ))}
                        </Box>
                    </Paper>

                    {/* Quick Actions */}
                    <Paper sx={{ p: 3 }}>
                        <Typography
                            sx={{
                                fontWeight: 600,
                                fontSize: '0.875rem',
                                color: '#111827',
                                mb: 1.5,
                            }}
                        >
                            Quick Actions
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Grid container spacing={1.5}>
                            {[
                                {
                                    label: 'Register New Worker',
                                    icon: UserPlus,
                                    path: '/agency/register-worker',
                                    color: '#0969DA',
                                    bg: '#DDF4FF',
                                },
                                {
                                    label: 'Verify Documents',
                                    icon: FileCheck,
                                    path: '/agency/documents',
                                    color: '#B54708',
                                    bg: '#FEF0C7',
                                },
                                {
                                    label: 'Manage Workers',
                                    icon: Users,
                                    path: '/agency/workers',
                                    color: '#1A7F37',
                                    bg: '#DDFBE6',
                                },
                                {
                                    label: 'Sponsorship Transfer',
                                    icon: ClipboardList,
                                    path: '/agency/sponsorship/new',
                                    color: '#1A7F37',
                                    bg: '#DDFBE6',
                                },
                                {
                                    label: 'View Requests',
                                    icon: ClipboardList,
                                    path: '/agency/requests',
                                    color: '#5E7089',
                                    bg: '#EDF0F5',
                                },
                            ].map((a) => {
                                const AIcon = a.icon;
                                return (
                                    <Grid size={{ xs: 6 }} key={a.label}>
                                        <Box
                                            onClick={() => navigate(a.path)}
                                            sx={{
                                                p: 1.75,
                                                borderRadius: '8px',
                                                border: '1px solid #D2DAE5',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: 1,
                                                minHeight: 100,
                                                justifyContent: 'space-between',
                                                '&:hover': {
                                                    borderColor: '#B0BDD0',
                                                    backgroundColor: '#F5F7FA',
                                                },
                                                transition:
                                                    'border-color 0.1s, background-color 0.1s',
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    width: 30,
                                                    height: 30,
                                                    borderRadius: '7px',
                                                    backgroundColor: a.bg,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                <AIcon
                                                    size={15}
                                                    color={a.color}
                                                />
                                            </Box>
                                            <Typography
                                                sx={{
                                                    fontSize: '0.8125rem',
                                                    fontWeight: 600,
                                                    color: '#111827',
                                                    lineHeight: 1.3,
                                                }}
                                            >
                                                {a.label}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </DashboardLayout>
    );
}
