import { Box, Button, Divider, Grid, Paper, Typography } from '@mui/material';
import {
    ArrowRight,
    Briefcase,
    CheckSquare,
    Clock,
    FileText,
    Home,
    Search,
    Send,
    Star,
    Users,
} from 'lucide-react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import { recruitmentRequests, workerRequests } from '../../data/mockData';
import { DashboardLayout, NavItem } from '../shared/DashboardLayout';
import { StatusBadge } from '../shared/StatusBadge';

export const sponsorNavItems: NavItem[] = [
    { label: 'Dashboard', path: '/sponsor/dashboard', icon: <Home /> },
    { label: 'Requests', path: '/sponsor/requests', icon: <FileText /> },
    { label: 'Workers', path: '/sponsor/workers', icon: <Users /> },
    { label: 'Offers', path: '/sponsor/offers', icon: <Briefcase /> },
    // { label: 'Approvals', path: '/sponsor/approval', icon: <CheckSquare /> },
];

const statCards = [
    {
        label: 'Active Workers',
        value: '12',
        icon: Users,
        color: '#0969DA',
        bg: '#DDF4FF',
        path: '/sponsor/workers',
    },
    {
        label: 'Pending Requests',
        value: '3',
        icon: Clock,
        color: '#B54708',
        bg: '#FEF0C7',
        path: '/sponsor/requests',
    },
    {
        label: 'Sent Offers',
        value: '5',
        icon: Send,
        color: '#1A7F37',
        bg: '#DDFBE6',
        path: '/sponsor/offers',
    },
    {
        label: 'Pending Approvals',
        value: '2',
        icon: CheckSquare,
        color: '#D92D20',
        bg: '#FEE4E2',
        path: '/sponsor/approval',
    },
];

export default function SponsorDashboard() {
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    return (
        <DashboardLayout navItems={sponsorNavItems}>
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
                    Sponsor Dashboard
                </Typography>
                <Typography sx={{ color: '#5E7089', fontSize: '0.875rem' }}>
                    Welcome back, {currentUser?.name?.split(' ')[0] || 'there'}{' '}
                    — manage your workforce and recruitment pipeline.
                </Typography>
            </Box>

            {/* Stat cards */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
                {statCards.map((s) => {
                    const Icon = s.icon;
                    return (
                        <Grid item xs={12} sm={6} lg={3} key={s.label}>
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
                {/* Recent Worker Requests */}
                <Grid item xs={12} md={7}>
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
                                Recent Worker Requests
                            </Typography>
                            <Button
                                size="small"
                                endIcon={<ArrowRight size={12} />}
                                onClick={() => navigate('/sponsor/requests')}
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
                            {workerRequests.map((req) => (
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
                                                flexShrink: 0,
                                            }}
                                        >
                                            <FileText
                                                size={15}
                                                color="#0969DA"
                                            />
                                        </Box>
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
                                                {req.quantity} worker
                                                {req.quantity > 1 ? 's' : ''} ·{' '}
                                                {req.requestDate}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <StatusBadge status={req.status} />
                                </Box>
                            ))}
                        </Box>
                    </Paper>
                </Grid>

                {/* Quick Actions + Active Recruitments */}
                <Grid item xs={12} md={5}>
                    <Paper sx={{ p: 3, mb: 2 }}>
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
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 1,
                            }}
                        >
                            {[
                                {
                                    label: 'Create Worker Request',
                                    icon: FileText,
                                    path: '/sponsor/requests',
                                },
                                {
                                    label: 'Search Available Workers',
                                    icon: Search,
                                    path: '/sponsor/search',
                                },
                                {
                                    label: 'View Recommended Workers',
                                    icon: Star,
                                    path: '/sponsor/recommended',
                                },
                                {
                                    label: 'Manage Approvals',
                                    icon: CheckSquare,
                                    path: '/sponsor/approval',
                                },
                            ].map((a) => {
                                const AIcon = a.icon;
                                return (
                                    <Box
                                        key={a.label}
                                        onClick={() => navigate(a.path)}
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1.5,
                                            p: 1.25,
                                            borderRadius: '6px',
                                            border: '1px solid #D2DAE5',
                                            cursor: 'pointer',
                                            '&:hover': {
                                                backgroundColor: '#F5F7FA',
                                                borderColor: '#B0BDD0',
                                            },
                                            transition:
                                                'background-color 0.1s, border-color 0.1s',
                                        }}
                                    >
                                        <AIcon size={14} color="#5E7089" />
                                        <Typography
                                            sx={{
                                                fontSize: '0.8125rem',
                                                fontWeight: 500,
                                                color: '#111827',
                                                flex: 1,
                                            }}
                                        >
                                            {a.label}
                                        </Typography>
                                        <ArrowRight size={13} color="#B0BDD0" />
                                    </Box>
                                );
                            })}
                        </Box>
                    </Paper>

                    <Paper sx={{ p: 3 }}>
                        <Typography
                            sx={{
                                fontWeight: 600,
                                fontSize: '0.875rem',
                                color: '#111827',
                                mb: 1.5,
                            }}
                        >
                            Active Recruitments
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 1.5,
                            }}
                        >
                            {recruitmentRequests.slice(0, 2).map((r) => (
                                <Box
                                    key={r.id}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        gap: 1,
                                    }}
                                >
                                    <Box sx={{ minWidth: 0 }}>
                                        <Typography
                                            sx={{
                                                fontSize: '0.8125rem',
                                                fontWeight: 600,
                                                color: '#111827',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                            }}
                                        >
                                            {r.jobTitle}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                fontSize: '0.75rem',
                                                color: '#5E7089',
                                            }}
                                        >
                                            {r.workersNeeded} needed
                                        </Typography>
                                    </Box>
                                    <StatusBadge status={r.status} />
                                </Box>
                            ))}
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </DashboardLayout>
    );
}
