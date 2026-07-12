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
    Snackbar,
} from '@mui/material';
import { DashboardLayout } from '../shared/DashboardLayout';
import { workerNavItems } from './WorkerDashboard';
import { StatusBadge } from '../shared/StatusBadge';
import {
    workerRequests as mockJobs,
    workerApplications as mockApplications,
} from '../../data/mockData';
import {
    ArrowLeft,
    Briefcase,
    MapPin,
    DollarSign,
    Calendar,
    FileText,
    CheckCircle,
    Home,
    GraduationCap,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useMockTranslation } from '../../utils/translateHelpers';

export default function WorkerJobDetails() {
    const { t } = useTranslation();
    const { tJobTitle, tName, tCity } = useMockTranslation();
    const { id } = useParams();
    const navigate = useNavigate();
    const [job, setJob] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const [applied, setApplied] = useState(false);
    const [successOpen, setSuccessOpen] = useState(false);

    const translateExperience = (exp: string): string => {
        if (exp === '3+ years') return t('sponsor.requests.form.experienceOptions.threePlus');
        if (exp === '1-3 years') return t('sponsor.requests.form.experienceOptions.oneToThree');
        if (exp === 'No experience') return t('sponsor.requests.form.experienceOptions.none');
        return exp;
    };

    useEffect(() => {
        // Find the job
        const foundJob = mockJobs.find((j: any) => j.id === id);
        setJob(foundJob || null);

        if (foundJob) {
            // Check if user has already applied
            const savedApps = localStorage.getItem('job_applications');
            let appList = [];
            if (savedApps) {
                appList = JSON.parse(savedApps);
            } else {
                appList = mockApplications;
                localStorage.setItem(
                    'job_applications',
                    JSON.stringify(mockApplications)
                );
            }
            const hasApplied = appList.some(
                (app: any) => app.requestId === foundJob.id
            );
            setApplied(hasApplied);
        }
        setLoading(false);
    }, [id]);

    const handleApply = () => {
        if (!job) return;

        const savedApps = localStorage.getItem('job_applications');
        const appList = savedApps
            ? JSON.parse(savedApps)
            : [...mockApplications];

        const newApp = {
            id: 'app_mock_' + Date.now(),
            requestId: job.id,
            jobTitle: job.jobTitle,
            sponsorName: job.sponsorName,
            workLocation: job.workLocation,
            dateApplied: new Date().toISOString().split('T')[0],
            status: 'Reviewing',
        };

        appList.unshift(newApp);
        localStorage.setItem('job_applications', JSON.stringify(appList));
        setApplied(true);
        setSuccessOpen(true);

        setTimeout(() => {
            navigate('/worker/applications');
        }, 1500);
    };

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

    if (!job) {
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
                        onClick={() => navigate('/worker/jobs')}
                        variant="outlined"
                        sx={{ minWidth: 'auto', p: 1, borderRadius: '50%' }}
                    >
                        <ArrowLeft size={18} />
                    </Button>
                    <Typography variant="h4" fontWeight="bold">
                        {t('worker.jobNotFoundTitle')}
                    </Typography>
                </Box>
                <Alert severity="error" sx={{ borderRadius: '8px' }}>
                    {t('worker.jobNotFoundDesc')}
                </Alert>
            </DashboardLayout>
        );
    }

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
                        onClick={() => navigate('/worker/jobs')}
                        variant="outlined"
                        sx={{ minWidth: 'auto', p: 1, borderRadius: '50%' }}
                    >
                        <ArrowLeft size={18} />
                    </Button>
                    <Box>
                        <Typography variant="h4" fontWeight="bold">
                            {tJobTitle(job.jobTitle)}
                        </Typography>
                        <Typography color="text.secondary" variant="body1">
                            {tName(job.sponsorName)} · {tCity(job.workLocation)}
                        </Typography>
                    </Box>
                </Box>
                <StatusBadge status={job.status} />
            </Box>

            <Grid container spacing={3.5}>
                {/* Left Side: Job Parameters & Detailed Description */}
                <Grid size={{ xs: 12, md: 8 }}>
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
                            <InfoIcon /> {t('worker.jobOverviewTitle')}
                        </Typography>
                        <Divider sx={{ mb: 3 }} />

                        <Grid container spacing={3}>
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
                                            display: 'flex',
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
                                            {t('worker.salaryRangeLabel')}
                                        </Typography>
                                        <Typography fontWeight="semibold">
                                            {job.salaryRange}
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
                                            display: 'flex',
                                        }}
                                    >
                                        <GraduationCap size={20} />
                                    </Box>
                                    <Box>
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                            display="block"
                                        >
                                            {t('worker.requiredExperienceLabel')}
                                        </Typography>
                                        <Typography fontWeight="semibold">
                                            {translateExperience(job.requiredExperience)}
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
                                            display: 'flex',
                                        }}
                                    >
                                        <Home size={20} />
                                    </Box>
                                    <Box>
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                            display="block"
                                        >
                                            {t('worker.accommodationLabel')}
                                        </Typography>
                                        <Typography fontWeight="semibold">
                                            {job.accommodationProvided
                                                ? t('worker.provided')
                                                : t('worker.notProvided')}
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
                                            display: 'flex',
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
                                            {t('worker.datePostedLabel')}
                                        </Typography>
                                        <Typography fontWeight="semibold">
                                            {job.requestDate}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>

                    {/* Job Description Card */}
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
                            <FileText size={18} /> {t('worker.jobDescAndReqsTitle')}
                        </Typography>
                        <Divider sx={{ mb: 3 }} />

                        <Typography variant="body1" paragraph>
                            {t('worker.jobDescIntroText1')}{' '}
                            <strong>{tJobTitle(job.jobTitle)}</strong> {t('worker.jobDescIntroText2')}{' '}
                            <strong>{tName(job.sponsorName)}</strong> {t('worker.jobDescIntroText3')}{' '}
                            <strong>{tCity(job.workLocation)}</strong>. {t('worker.jobDescIntroText4')}
                        </Typography>

                        <Typography
                            variant="subtitle1"
                            fontWeight="bold"
                            sx={{ mt: 3, mb: 1 }}
                        >
                            {t('worker.keyResponsibilities')}
                        </Typography>
                        <ul>
                            <li>
                                <Typography variant="body2" sx={{ mb: 0.5 }}>
                                    {t('worker.resp1')}
                                </Typography>
                            </li>
                            <li>
                                <Typography variant="body2" sx={{ mb: 0.5 }}>
                                    {t('worker.resp2')}
                                </Typography>
                            </li>
                            <li>
                                <Typography variant="body2" sx={{ mb: 0.5 }}>
                                    {t('worker.resp3')}
                                </Typography>
                            </li>
                            <li>
                                <Typography variant="body2" sx={{ mb: 0.5 }}>
                                    {t('worker.resp4')}
                                </Typography>
                            </li>
                        </ul>

                        <Typography
                            variant="subtitle1"
                            fontWeight="bold"
                            sx={{ mt: 3, mb: 1 }}
                        >
                            {t('worker.qualificationsAndSkills')}
                        </Typography>
                        <ul>
                            <li>
                                <Typography variant="body2" sx={{ mb: 0.5 }}>
                                    {t('worker.qual1Text1')} {translateExperience(job.experience)} {t('worker.qual1Text2')}
                                </Typography>
                            </li>
                            <li>
                                <Typography variant="body2" sx={{ mb: 0.5 }}>
                                    {t('worker.qual2')}
                                </Typography>
                            </li>
                            <li>
                                <Typography variant="body2" sx={{ mb: 0.5 }}>
                                    {t('worker.qual3')}
                                </Typography>
                            </li>
                        </ul>
                    </Paper>
                </Grid>

                {/* Right Side: Apply Action Panel */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <Paper
                        sx={{
                            p: 4,
                            textAlign: 'center',
                            border: applied
                                ? '1px solid #BBF7D0'
                                : '1px solid #D2DAE5',
                        }}
                    >
                        {applied ? (
                            <Box>
                                <Box
                                    sx={{
                                        p: 1.5,
                                        borderRadius: '50%',
                                        backgroundColor: '#DDFBE6',
                                        color: '#1A7F37',
                                        display: 'inline-flex',
                                        mb: 2,
                                    }}
                                >
                                    <CheckCircle size={28} />
                                </Box>
                                <Typography
                                    variant="h6"
                                    fontWeight="bold"
                                    gutterBottom
                                >
                                    {t('worker.appSubmittedTitle')}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    mb={3}
                                >
                                    {t('worker.alreadyAppliedDesc')}
                                </Typography>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    color="success"
                                    onClick={() =>
                                        navigate('/worker/applications')
                                    }
                                >
                                    {t('worker.trackApplicationButton')}
                                </Button>
                            </Box>
                        ) : (
                            <Box>
                                <Box
                                    sx={{
                                        p: 1.5,
                                        borderRadius: '50%',
                                        backgroundColor: '#DDF4FF',
                                        color: '#0969DA',
                                        display: 'inline-flex',
                                        mb: 2,
                                    }}
                                >
                                    <Briefcase size={28} />
                                </Box>
                                <Typography
                                    variant="h6"
                                    fontWeight="bold"
                                    gutterBottom
                                >
                                    {t('worker.applyForJobTitle')}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    mb={3}
                                >
                                    {t('worker.submitProfileToText')}{' '}
                                    <strong>{tName(job.sponsorName)}</strong>.
                                </Typography>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    size="large"
                                    onClick={handleApply}
                                    disabled={
                                        job.status !== 'Pending' &&
                                        job.status !== 'Reviewing Matches'
                                    }
                                >
                                    {job.status === 'Pending' ||
                                    job.status === 'Reviewing Matches'
                                        ? t('worker.applyNow')
                                        : t('worker.positionClosed')}
                                </Button>
                            </Box>
                        )}
                    </Paper>
                </Grid>
            </Grid>

            <Snackbar
                open={successOpen}
                autoHideDuration={2000}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    severity="success"
                    sx={{ width: '100%', borderRadius: '8px' }}
                >
                    {t('worker.appSuccessAlert')}
                </Alert>
            </Snackbar>
        </DashboardLayout>
    );
}

// Simple fallback info icon
function InfoIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
    );
}
