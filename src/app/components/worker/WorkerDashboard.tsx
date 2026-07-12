import {
    Box,
    Typography,
    Grid,
    Paper,
    Divider,
    Button,
    Chip,
} from '@mui/material';
import { DashboardLayout, NavItem } from '../shared/DashboardLayout';
import {
    Home,
    User,
    FileText,
    Repeat,
    Briefcase,
    Clock,
    CheckCircle2,
    AlertCircle,
    ArrowRight,
    TrendingUp,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router';
import { workerApplications, myDocuments } from '../../data/mockData';
import { useTranslation } from 'react-i18next';
import { useMockTranslation } from '../../utils/translateHelpers';

export const workerNavItems: NavItem[] = [
    { label: 'Dashboard', path: '/worker/dashboard', icon: <Home /> },
    { label: 'Profile', path: '/worker/profile', icon: <User /> },
    {
        label: 'Sponsorship Transfer',
        path: '/worker/sponsorship',
        icon: <Repeat />,
    },
    //   { label: 'Job Opportunities', path: '/worker/jobs', icon: <Briefcase /> },
    {
        label: 'Application Tracking',
        path: '/worker/applications',
        icon: <Clock />,
    },
];

export default function WorkerDashboard() {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { tJobTitle, tName } = useMockTranslation();

    const pendingDocs = myDocuments.filter(
        (d) => d.status !== 'Verified'
    ).length;
    const recentApps = workerApplications.slice(0, 3);

    const stats = [
        {
            label: t('worker.stats.activeApplications'),
            value: '2',
            icon: Briefcase,
            color: '#0969DA',
            bg: '#DDF4FF',
            path: '/worker/applications',
        },
        {
            label: t('worker.stats.documentsUploaded'),
            value: '3',
            icon: FileText,
            color: '#1A7F37',
            bg: '#DDFBE6',
            path: '/worker/profile?tab=documents',
        },
        {
            label: t('worker.stats.profileCompletion'),
            value: '85%',
            icon: TrendingUp,
            color: '#B54708',
            bg: '#FEF0C7',
            path: '/worker/profile',
        },
        {
            label: t('worker.stats.verificationStatus'),
            value: t('worker.verified'),
            icon: CheckCircle2,
            color: '#0969DA',
            bg: '#DDF4FF',
            path: '/worker/profile?tab=documents',
        },
    ];

    return (
        <DashboardLayout navItems={workerNavItems}>
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
                    {t('worker.welcomeBack', { name: currentUser?.name?.split(' ')[0] || t('worker.there') })}
                </Typography>
                <Typography sx={{ color: '#5E7089', fontSize: '0.875rem' }}>
                    {t('worker.dashboardSubtitle')}
                </Typography>
            </Box>

            {/* Stat cards */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
                {stats.map((s) => {
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
                                    }}
                                >
                                    <Box>
                                        <Typography
                                            sx={{
                                                fontSize: '0.75rem',
                                                color: '#5E7089',
                                                fontWeight: 500,
                                                mb: 1,
                                            }}
                                        >
                                            {s.label}
                                        </Typography>
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
                                    </Box>
                                    <Box
                                        sx={{
                                            width: 36,
                                            height: 36,
                                            borderRadius: '8px',
                                            backgroundColor: s.bg,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexShrink: 0,
                                        }}
                                    >
                                        <Icon size={17} color={s.color} />
                                    </Box>
                                </Box>
                            </Paper>
                        </Grid>
                    );
                })}
            </Grid>

            <Grid container spacing={2.5}>
                {/* Profile summary */}
                <Grid item xs={12} md={5}>
                    <Paper sx={{ p: 3, height: '100%' }}>
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
                                {t('worker.profileOverview')}
                            </Typography>
                            <Button
                                size="small"
                                endIcon={<ArrowRight size={12} />}
                                onClick={() => navigate('/worker/profile')}
                                sx={{
                                    fontSize: '0.8125rem',
                                    color: '#0969DA',
                                    px: 1,
                                }}
                            >
                                {t('worker.edit')}
                            </Button>
                        </Box>
                        <Divider sx={{ mb: 2 }} />
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 1.75,
                            }}
                        >
                            {[
                                {
                                    label: t('worker.fullName'),
                                    value: currentUser?.name || t('worker.mockNameDefault'),
                                },
                                { label: t('worker.jobTitle'), value: t('worker.driver') },
                                {
                                    label: t('worker.currentSponsor'),
                                    value: t('worker.mockSponsorName'),
                                },
                                {
                                    label: t('worker.location'),
                                    value: t('worker.mockLocation'),
                                },
                            ].map((row) => (
                                <Box
                                    key={row.label}
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: '0.8125rem',
                                            color: '#5E7089',
                                        }}
                                    >
                                        {row.label}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontSize: '0.8125rem',
                                            fontWeight: 600,
                                            color: '#111827',
                                        }}
                                    >
                                        {row.value}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>

                        {pendingDocs > 0 && (
                            <Box
                                onClick={() => navigate('/worker/documents')}
                                sx={{
                                    mt: 2.5,
                                    p: 1.5,
                                    borderRadius: '6px',
                                    backgroundColor: '#FEF0C7',
                                    border: '1px solid #FDE68A',
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: 1.25,
                                    cursor: 'pointer',
                                }}
                            >
                                <AlertCircle
                                    size={15}
                                    color="#B54708"
                                    style={{ marginTop: 1, flexShrink: 0 }}
                                />
                                <Box>
                                    <Typography
                                        sx={{
                                            fontSize: '0.8125rem',
                                            fontWeight: 700,
                                            color: '#B54708',
                                            lineHeight: 1.3,
                                        }}
                                    >
                                        {t('worker.actionRequired')}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontSize: '0.75rem',
                                            color: '#92400E',
                                            mt: 0.25,
                                        }}
                                    >
                                        {t('worker.pendingVerificationCount', { count: pendingDocs })}
                                    </Typography>
                                </Box>
                            </Box>
                        )}
                    </Paper>
                </Grid>

                {/* Recent Applications */}
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
                                {t('worker.recentApplications')}
                            </Typography>
                            <Button
                                size="small"
                                endIcon={<ArrowRight size={12} />}
                                onClick={() => navigate('/worker/applications')}
                                sx={{
                                    fontSize: '0.8125rem',
                                    color: '#0969DA',
                                    px: 1,
                                }}
                            >
                                {t('worker.viewAll')}
                            </Button>
                        </Box>
                        <Divider sx={{ mb: 2 }} />

                        {recentApps.length > 0 ? (
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 1.25,
                                }}
                            >
                                {recentApps.map((app) => (
                                        <Box
                                            key={app.id}
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
                                                    <Briefcase
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
                                                            whiteSpace: 'nowrap',
                                                            overflow: 'hidden',
                                                            textOverflow:
                                                                'ellipsis',
                                                        }}
                                                    >
                                                        {tJobTitle(app.jobTitle)}
                                                    </Typography>
                                                    <Typography
                                                        sx={{
                                                            fontSize: '0.75rem',
                                                            color: '#5E7089',
                                                        }}
                                                    >
                                                        {tName(app.sponsorName)}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'flex-end',
                                                gap: 0.5,
                                                flexShrink: 0,
                                            }}
                                        >
                                            <Chip
                                                label={app.status === 'Reviewing' ? t('worker.status.reviewing') : app.status === 'Offer Received' ? t('worker.status.offerReceived') : app.status}
                                                size="small"
                                                sx={{
                                                    height: 20,
                                                    fontSize: '0.6875rem',
                                                    fontWeight: 600,
                                                    borderRadius: '4px',
                                                    backgroundColor:
                                                        app.status ===
                                                        'Reviewing'
                                                            ? '#FEF0C7'
                                                            : '#EDF0F5',
                                                    color:
                                                        app.status ===
                                                        'Reviewing'
                                                            ? '#B54708'
                                                            : '#5E7089',
                                                    '& .MuiChip-label': {
                                                        px: '6px',
                                                    },
                                                }}
                                            />
                                            <Typography
                                                sx={{
                                                    fontSize: '0.6875rem',
                                                    color: '#8494AB',
                                                }}
                                            >
                                                {app.dateApplied}
                                            </Typography>
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                        ) : (
                            <Box sx={{ py: 4, textAlign: 'center' }}>
                                <Typography
                                    sx={{
                                        color: '#8494AB',
                                        fontSize: '0.875rem',
                                    }}
                                >
                                    {t('worker.noApplications')}
                                </Typography>
                                <Button
                                    size="small"
                                    onClick={() => navigate('/worker/jobs')}
                                    sx={{ mt: 1, color: '#0969DA' }}
                                >
                                    {t('worker.browseJobs')}
                                </Button>
                            </Box>
                        )}
                    </Paper>
                </Grid>

                {/* Quick Actions */}
                <Grid item xs={12}>
                    <Paper sx={{ p: 3 }}>
                        <Typography
                            sx={{
                                fontWeight: 600,
                                fontSize: '0.875rem',
                                color: '#111827',
                                mb: 1.5,
                            }}
                        >
                            {t('worker.quickActions')}
                        </Typography>
                        <Divider sx={{ mb: 2.5 }} />
                        <Grid container spacing={1.5}>
                            {[
                                {
                                    label: t('worker.quickActionsItems.browseJobs'),
                                    icon: Briefcase,
                                    path: '/worker/jobs',
                                    color: '#0969DA',
                                    bg: '#DDF4FF',
                                },
                                {
                                    label: t('worker.quickActionsItems.uploadDocs'),
                                    icon: FileText,
                                    path: '/worker/documents',
                                    color: '#1A7F37',
                                    bg: '#DDFBE6',
                                },
                                {
                                    label: t('worker.quickActionsItems.requestTransfer'),
                                    icon: Repeat,
                                    path: '/worker/sponsorship',
                                    color: '#B54708',
                                    bg: '#FEF0C7',
                                },
                                {
                                    label: t('worker.quickActionsItems.updateProfile'),
                                    icon: User,
                                    path: '/worker/profile',
                                    color: '#5E7089',
                                    bg: '#EDF0F5',
                                },
                            ].map((action) => {
                                const AIcon = action.icon;
                                return (
                                    <Grid item xs={6} sm={3} key={action.label}>
                                        <Box
                                            onClick={() =>
                                                navigate(action.path)
                                            }
                                            sx={{
                                                p: 2,
                                                borderRadius: '8px',
                                                border: '1px solid #D2DAE5',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: 1.25,
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
                                                    width: 32,
                                                    height: 32,
                                                    borderRadius: '8px',
                                                    backgroundColor: action.bg,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                <AIcon
                                                    size={16}
                                                    color={action.color}
                                                />
                                            </Box>
                                            <Typography
                                                sx={{
                                                    fontSize: '0.8125rem',
                                                    fontWeight: 600,
                                                    color: '#111827',
                                                    lineHeight: 1.4,
                                                }}
                                            >
                                                {action.label}
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
