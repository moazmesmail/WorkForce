import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import {
    Typography,
    Box,
    Paper,
    Grid,
    Button,
    Divider,
    Alert,
    CircularProgress,
} from '@mui/material';
import { DashboardLayout } from '../shared/DashboardLayout';
import { workerNavItems } from './WorkerDashboard';
import { StatusBadge } from '../shared/StatusBadge';
import { sponsorshipRequests as mockSponsorshipRequests } from '../../data/mockData';
import {
    ArrowLeft,
    Calendar,
    MapPin,
    Briefcase,
    DollarSign,
    ShieldAlert,
    CheckCircle,
    Info,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useMockTranslation } from '../../utils/translateHelpers';

export default function WorkerSponsorshipTransferDetails() {
    const { t } = useTranslation();
    const { tName, tCity } = useMockTranslation();
    const { id } = useParams();
    const navigate = useNavigate();
    const [request, setRequest] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);

    const getJobTitleLabel = (title: string) => {
        if (!title) return '';
        const key = title.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
        return t(`jobTitles.${key}`, title);
    };

    useEffect(() => {
        // Load from localStorage or mock data
        const saved = localStorage.getItem('sponsorship_requests');
        let list = [];
        if (saved) {
            list = JSON.parse(saved);
        } else {
            list = mockSponsorshipRequests;
            localStorage.setItem(
                'sponsorship_requests',
                JSON.stringify(mockSponsorshipRequests)
            );
        }

        const found = list.find((r: any) => r.id === id);
        setRequest(found || null);
        setLoading(false);
    }, [id]);

    if (loading) {
        return (
            <DashboardLayout navItems={workerNavItems}>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="50vh"
                >
                    <CircularProgress />
                </Box>
            </DashboardLayout>
        );
    }

    if (!request) {
        return (
            <DashboardLayout navItems={workerNavItems}>
                <Box
                    sx={{
                        mb: 4,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                    }}
                >
                    <Button
                        onClick={() => navigate('/worker/sponsorship')}
                        variant="outlined"
                        sx={{ minWidth: 'auto', p: 1, borderRadius: '50%' }}
                    >
                        <ArrowLeft size={18} />
                    </Button>
                    <Typography variant="h4" fontWeight="bold">
                        {t('sponsorship.requestNotFound')}
                    </Typography>
                </Box>
                <Alert severity="error" sx={{ borderRadius: '8px' }}>
                    {t('sponsorship.requestNotFoundDesc')}
                </Alert>
            </DashboardLayout>
        );
    }

    const isMatched =
        request.status === 'Approved' ||
        (request.newSponsor && request.newSponsor !== 'Pending System Match');

    return (
        <DashboardLayout navItems={workerNavItems}>
            {/* Header Row */}
            <Box
                sx={{
                    mb: 4,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 2,
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Button
                        onClick={() => navigate('/worker/sponsorship')}
                        variant="outlined"
                        sx={{ minWidth: 'auto', p: 1, borderRadius: '50%' }}
                    >
                        <ArrowLeft size={18} />
                    </Button>
                    <Box>
                        <Typography variant="h4" fontWeight="bold">
                            {t('sponsorship.detailsTitle')}
                        </Typography>
                        <Typography color="text.secondary" variant="body2">
                            ID: {request.id} · {t('sponsorship.submittedOn')}{' '}
                            {request.requestDate}
                        </Typography>
                    </Box>
                </Box>
                <StatusBadge status={request.status} />
            </Box>

            <Grid container spacing={3.5}>
                {/* Left Hand: Request Details & Preferences */}
                <Grid size={{ xs: 12, md: 7 }}>
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
                            <Briefcase size={18} /> {t('sponsorship.jobPref')}
                        </Typography>
                        <Divider sx={{ mb: 3 }} />

                        <Grid container spacing={3.5}>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    gap={1.5}
                                >
                                    <Box
                                        sx={{
                                            p: 1,
                                            borderRadius: '8px',
                                            backgroundColor: '#DDF4FF',
                                            color: '#0969DA',
                                        }}
                                    >
                                        <Briefcase size={20} />
                                    </Box>
                                    <Box>
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                            display="block"
                                        >
                                            {t('sponsorship.columns.jobTitle')}
                                        </Typography>
                                        <Typography fontWeight="semibold">
                                            {getJobTitleLabel(
                                                request.desiredJobTitle ||
                                                request.jobTitle ||
                                                'General'
                                            )}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    gap={1.5}
                                >
                                    <Box
                                        sx={{
                                            p: 1,
                                            borderRadius: '8px',
                                            backgroundColor: '#DDF4FF',
                                            color: '#0969DA',
                                        }}
                                    >
                                        <MapPin size={20} />
                                    </Box>
                                    <Box>
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                            display="block"
                                        >
                                            {t('sponsorship.prefLocation')}
                                        </Typography>
                                        <Typography fontWeight="semibold">
                                            {tCity(request.preferredLocation) ||
                                                t('sponsorship.anywhere', 'Anywhere (Saudi Arabia)')}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    gap={1.5}
                                >
                                    <Box
                                        sx={{
                                            p: 1,
                                            borderRadius: '8px',
                                            backgroundColor: '#DDF4FF',
                                            color: '#0969DA',
                                        }}
                                    >
                                        <DollarSign size={20} />
                                    </Box>
                                    <Box>
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                            display="block"
                                        >
                                            {t('sponsorship.expectedSalary')}
                                        </Typography>
                                        <Typography fontWeight="semibold">
                                            {request.expectedSalary ||
                                                t('common.noRecords')}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    gap={1.5}
                                >
                                    <Box
                                        sx={{
                                            p: 1,
                                            borderRadius: '8px',
                                            backgroundColor: '#DDF4FF',
                                            color: '#0969DA',
                                        }}
                                    >
                                        <Calendar size={20} />
                                    </Box>
                                    <Box>
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                            display="block"
                                        >
                                            {t('sponsorship.availDate')}
                                        </Typography>
                                        <Typography fontWeight="semibold">
                                            {request.availabilityDate ||
                                                'Immediate'}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>

                    {/* Application Message Card */}
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
                            <Info size={18} /> {t('sponsorship.additionalNotes')}
                        </Typography>
                        <Divider sx={{ mb: 2.5 }} />
                        <Box
                            sx={{
                                p: 2.5,
                                borderRadius: '8px',
                                backgroundColor: '#F5F7FA',
                                border: '1px solid #D2DAE5',
                                minHeight: '100px',
                            }}
                        >
                            <Typography
                                variant="body2"
                                sx={{
                                    whiteSpace: 'pre-wrap',
                                    color: request.message
                                        ? 'text.primary'
                                        : 'text.secondary',
                                    fontStyle: request.message
                                        ? 'normal'
                                        : 'italic',
                                }}
                            >
                                {request.message ||
                                    t('sponsorship.noNotes')}
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>

                {/* Right Hand: Match Status & Sponsor details */}
                <Grid size={{ xs: 12, md: 5 }}>
                    {isMatched ? (
                        <Paper
                            sx={{
                                p: 4,
                                border: '1px solid #BBF7D0',
                                backgroundColor: '#F3FEF6',
                            }}
                        >
                            <Box
                                display="flex"
                                alignItems="center"
                                gap={1.5}
                                mb={2.5}
                            >
                                <Box
                                    sx={{
                                        p: 1,
                                        borderRadius: '50%',
                                        backgroundColor: '#DDFBE6',
                                        color: '#1A7F37',
                                        display: 'flex',
                                    }}
                                >
                                    <CheckCircle size={22} />
                                </Box>
                                <Typography
                                    variant="h6"
                                    fontWeight="bold"
                                    color="#1A7F37"
                                >
                                    {t('sponsorship.matchConfirmed')}
                                </Typography>
                            </Box>
                            <Typography
                                variant="body2"
                                mb={3}
                                color="text.secondary"
                            >
                                {t('sponsorship.matchConfirmedDesc')}
                            </Typography>
                            <Divider sx={{ mb: 2.5 }} />
                            <Box display="flex" flexDirection="column" gap={2}>
                                <Box>
                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                    >
                                        {t('sponsorship.matchedEmployer')}
                                    </Typography>
                                    <Typography
                                        fontWeight="bold"
                                        variant="h6"
                                        color="text.primary"
                                    >
                                        {tName(request.newSponsor)}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                    >
                                        {t('sponsorship.currentEmployer')}
                                    </Typography>
                                    <Typography fontWeight="semibold">
                                        {tName(request.currentSponsor ||
                                            'Current Corp')}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                    >
                                        {t('sponsorship.approvalStatus')}
                                    </Typography>
                                    <Box
                                        display="flex"
                                        alignItems="center"
                                        gap={1}
                                        mt={0.5}
                                    >
                                        <StatusBadge status="Approved" />
                                    </Box>
                                </Box>
                            </Box>
                        </Paper>
                    ) : request.status === 'Rejected' ? (
                        <Paper
                            sx={{
                                p: 4,
                                border: '1px solid #FEE4E2',
                                backgroundColor: '#FFF5F5',
                            }}
                        >
                            <Box
                                display="flex"
                                alignItems="center"
                                gap={1.5}
                                mb={2.5}
                            >
                                <Box
                                    sx={{
                                        p: 1,
                                        borderRadius: '50%',
                                        backgroundColor: '#FEE4E2',
                                        color: '#D92D20',
                                        display: 'flex',
                                    }}
                                >
                                    <ShieldAlert size={22} />
                                </Box>
                                <Typography
                                    variant="h6"
                                    fontWeight="bold"
                                    color="#D92D20"
                                >
                                    {t('sponsorship.matchRejected')}
                                </Typography>
                            </Box>
                            <Typography
                                variant="body2"
                                mb={3}
                                color="text.secondary"
                            >
                                {t('sponsorship.matchRejectedDesc')}
                            </Typography>
                            <Divider sx={{ mb: 2.5 }} />
                            <Box>
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                >
                                    {t('sponsorship.columns.currentSponsor')}
                                </Typography>
                                <Typography fontWeight="semibold">
                                    {tName(request.currentSponsor || 'Current Corp')}
                                </Typography>
                            </Box>
                        </Paper>
                    ) : (
                        <Paper
                            sx={{
                                p: 4,
                                border: '1px solid #FFE0B2',
                                backgroundColor: '#FFFDF9',
                            }}
                        >
                            <Box
                                display="flex"
                                alignItems="center"
                                gap={1.5}
                                mb={2.5}
                            >
                                <Typography
                                    variant="h6"
                                    fontWeight="bold"
                                    color="#B54708"
                                >
                                    {t('sponsorship.awaitingMatch')}
                                </Typography>
                            </Box>
                            <Typography
                                variant="body2"
                                mb={3}
                                color="text.secondary"
                            >
                                {t('sponsorship.awaitingMatchDesc')}
                            </Typography>
                            <Divider sx={{ mb: 2.5 }} />
                            <Box display="flex" flexDirection="column" gap={2}>
                                <Box>
                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                    >
                                        {t('sponsorship.currentEmployer')}
                                    </Typography>
                                    <Typography fontWeight="semibold">
                                        {tName(request.currentSponsor ||
                                            'Current Corp')}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                    >
                                        {t('sponsorship.matchingStatus')}
                                    </Typography>
                                    <Typography
                                        fontWeight="semibold"
                                        color="#B54708"
                                        sx={{ mt: 0.5 }}
                                    >
                                        {t('sponsorship.searchingPool')}
                                    </Typography>
                                </Box>
                            </Box>
                        </Paper>
                    )}
                </Grid>
            </Grid>
        </DashboardLayout>
    );
}
