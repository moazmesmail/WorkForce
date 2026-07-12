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

export default function WorkerSponsorshipTransferDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [request, setRequest] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);

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
                        Request Not Found
                    </Typography>
                </Box>
                <Alert severity="error" sx={{ borderRadius: '8px' }}>
                    The requested sponsorship transfer request could not be
                    located.
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
                            Transfer Request Details
                        </Typography>
                        <Typography color="text.secondary" variant="body2">
                            ID: {request.id} · Submitted on{' '}
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
                            <Briefcase size={18} /> Job Matching Preferences
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
                                            Desired Job Title
                                        </Typography>
                                        <Typography fontWeight="semibold">
                                            {request.desiredJobTitle ||
                                                request.jobTitle ||
                                                'General'}
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
                                            Preferred Work Location
                                        </Typography>
                                        <Typography fontWeight="semibold">
                                            {request.preferredLocation ||
                                                'Anywhere (Saudi Arabia)'}
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
                                            Expected Monthly Salary
                                        </Typography>
                                        <Typography fontWeight="semibold">
                                            {request.expectedSalary ||
                                                'Not Specified'}
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
                                            Availability Date
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
                            <Info size={18} /> Additional Application Notes
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
                                    'No additional application message or notes were attached to this request.'}
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
                                    Sponsor Match Confirmed
                                </Typography>
                            </Box>
                            <Typography
                                variant="body2"
                                mb={3}
                                color="text.secondary"
                            >
                                An employer has reviewed your preferences and
                                approved your sponsorship transfer request.
                            </Typography>
                            <Divider sx={{ mb: 2.5 }} />
                            <Box display="flex" flexDirection="column" gap={2}>
                                <Box>
                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                    >
                                        Matched Employer (New Sponsor)
                                    </Typography>
                                    <Typography
                                        fontWeight="bold"
                                        variant="h6"
                                        color="text.primary"
                                    >
                                        {request.newSponsor}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                    >
                                        Current Employer
                                    </Typography>
                                    <Typography fontWeight="semibold">
                                        {request.currentSponsor ||
                                            'Current Corp'}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                    >
                                        Transfer Approval Status
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
                                    Request Rejected
                                </Typography>
                            </Box>
                            <Typography
                                variant="body2"
                                mb={3}
                                color="text.secondary"
                            >
                                Your sponsorship transfer request has been
                                rejected by the prospective sponsor or system
                                matching pool.
                            </Typography>
                            <Divider sx={{ mb: 2.5 }} />
                            <Box>
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                >
                                    Current Sponsor
                                </Typography>
                                <Typography fontWeight="semibold">
                                    {request.currentSponsor || 'Current Corp'}
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
                                    Awaiting Match
                                </Typography>
                            </Box>
                            <Typography
                                variant="body2"
                                mb={3}
                                color="text.secondary"
                            >
                                Your transfer request has been registered in our
                                matching pool. Employers looking for your
                                specific job title and location will match with
                                your profile.
                            </Typography>
                            <Divider sx={{ mb: 2.5 }} />
                            <Box display="flex" flexDirection="column" gap={2}>
                                <Box>
                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                    >
                                        Current Employer
                                    </Typography>
                                    <Typography fontWeight="semibold">
                                        {request.currentSponsor ||
                                            'Current Corp'}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                    >
                                        Matching Status
                                    </Typography>
                                    <Typography
                                        fontWeight="semibold"
                                        color="#B54708"
                                        sx={{ mt: 0.5 }}
                                    >
                                        Searching pool...
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
