import { useState } from 'react';
import {
    Typography,
    Box,
    Paper,
    Grid,
    TextField,
    Button,
    Divider,
    MenuItem,
    FormControlLabel,
    Switch,
    Alert,
    Snackbar,
} from '@mui/material';
import { useNavigate } from 'react-router';
import { DashboardLayout } from '../shared/DashboardLayout';
import { workerNavItems } from './WorkerDashboard';
import { agencyNavItems } from '../agency/AgencyDashboard';
import { workers } from '../../data/mockData';
import { ArrowLeft, CheckCircle, FileText, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useMockTranslation } from '../../utils/translateHelpers';

interface WorkerSponsorshipTransferFormProps {
    isAgencyMode?: boolean;
}

export default function WorkerSponsorshipTransferForm({
    isAgencyMode = false,
}: WorkerSponsorshipTransferFormProps) {
    const { t } = useTranslation();
    const { tName, tJobTitle } = useMockTranslation();
    const navigate = useNavigate();
    const navItems = isAgencyMode ? agencyNavItems : workerNavItems;

    // Form states
    const [inSaudiArabia, setInSaudiArabia] = useState(false);
    const [selectedWorkerId, setSelectedWorkerId] = useState(
        isAgencyMode ? '' : 'w1'
    );

    // Job Match Preferences (to match with employers)
    const [desiredJobTitle, setDesiredJobTitle] = useState('Driver');
    const [preferredLocation, setPreferredLocation] = useState('');
    const [expectedSalary, setExpectedSalary] = useState('');
    const [availabilityDate, setAvailabilityDate] = useState('');
    const [applicationMessage, setApplicationMessage] = useState('');

    // Errors & Alerts
    const [errorMsg, setErrorMsg] = useState('');
    const [successOpen, setSuccessOpen] = useState(false);

    const handleCancel = () => {
        if (isAgencyMode) {
            navigate('/agency/dashboard');
        } else {
            navigate('/worker/sponsorship');
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!inSaudiArabia) {
            setErrorMsg(
                t('sponsorship.errInSaudi')
            );
            return;
        }

        if (!preferredLocation || !desiredJobTitle || !availabilityDate) {
            setErrorMsg(
                t('sponsorship.errRequired')
            );
            return;
        }

        // Resolve worker name
        let workerName = 'Ahmed Hassan';
        if (isAgencyMode) {
            const match = workers.find((w) => w.id === selectedWorkerId);
            if (match) workerName = match.name;
        }

        // Save to localStorage
        const newRequest = {
            id: 'sr_mock_' + Date.now(),
            workerId: selectedWorkerId,
            workerName,
            currentSponsor: 'Current Corp', // fallback default
            newSponsor: 'Pending System Match',
            desiredJobTitle,
            preferredLocation,
            expectedSalary: expectedSalary
                ? `${expectedSalary} SAR`
                : 'Not Specified',
            availabilityDate,
            message: applicationMessage,
            requestDate: new Date().toISOString().split('T')[0],
            status: 'Needs Match',
        };

        const saved = localStorage.getItem('sponsorship_requests');
        const list = saved ? JSON.parse(saved) : [];
        list.unshift(newRequest);
        localStorage.setItem('sponsorship_requests', JSON.stringify(list));

        setErrorMsg('');
        setSuccessOpen(true);

        setTimeout(() => {
            if (isAgencyMode) {
                navigate('/agency/workers');
            } else {
                navigate('/worker/sponsorship');
            }
        }, 1500);
    };

    return (
        <DashboardLayout navItems={navItems}>
            <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Button
                    onClick={handleCancel}
                    variant="outlined"
                    sx={{ minWidth: 'auto', p: 1, borderRadius: '50%' }}
                >
                    <ArrowLeft size={18} />
                </Button>
                <Box>
                    <Typography variant="h4" fontWeight="bold">
                        {isAgencyMode
                            ? t('sponsorship.submitRequestTitle')
                            : t('sponsorship.submitRequestTitle')}
                    </Typography>
                    <Typography color="text.secondary">
                        {isAgencyMode
                            ? t('sponsorship.agencyDesc')
                            : t('sponsorship.workerDesc')}
                    </Typography>
                </Box>
            </Box>

            {errorMsg && (
                <Alert severity="error" sx={{ mb: 3, borderRadius: '8px' }}>
                    {errorMsg}
                </Alert>
            )}

            <form onSubmit={handleSubmit}>
                <Paper sx={{ p: 4, mb: 4 }}>
                    {/* Preconditions */}
                    <Typography
                        variant="h6"
                        gutterBottom
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                    >
                        <CheckCircle size={18} color="#1A7F37" /> {t('sponsorship.preconditions')}
                    </Typography>
                    <Divider sx={{ mb: 3 }} />
                    <Grid container spacing={3} sx={{ mb: 4 }}>
                        <Grid size={{ xs: 12 }}>
                            <Box
                                sx={{
                                    p: 2.5,
                                    borderRadius: '8px',
                                    backgroundColor: inSaudiArabia
                                        ? '#DDFBE6'
                                        : '#FFF8EB',
                                    border: `1px solid ${inSaudiArabia ? '#BBF7D0' : '#FFE0B2'}`,
                                    transition: 'all 0.2s ease',
                                }}
                            >
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={inSaudiArabia}
                                            onChange={(e) =>
                                                setInSaudiArabia(
                                                    e.target.checked
                                                )
                                            }
                                            color="success"
                                        />
                                    }
                                    label={
                                        <Typography
                                            sx={{
                                                fontWeight: 600,
                                                color: inSaudiArabia
                                                    ? '#1A7F37'
                                                    : '#B54708',
                                            }}
                                        >
                                            {t('sponsorship.inSaudi')}
                                        </Typography>
                                    }
                                />
                                <Typography
                                    variant="caption"
                                    display="block"
                                    sx={{ mt: 1, color: 'text.secondary' }}
                                >
                                    {t('sponsorship.inSaudiDesc')}
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>

                    {/* Worker selection (Agency only) */}
                    {isAgencyMode && (
                        <>
                            <Typography
                                variant="h6"
                                gutterBottom
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                }}
                            >
                                <User size={18} /> {t('sponsorship.selectWorker')}
                            </Typography>
                            <Divider sx={{ mb: 3 }} />
                            <Grid container spacing={3} sx={{ mb: 4 }}>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <TextField
                                        select
                                        fullWidth
                                        label={t('sponsorship.workerName')}
                                        value={selectedWorkerId}
                                        onChange={(e) =>
                                            setSelectedWorkerId(e.target.value)
                                        }
                                        required
                                    >
                                        {workers.map((w) => (
                                            <MenuItem key={w.id} value={w.id}>
                                                {tName(w.name)} ({tJobTitle(w.jobTitle)})
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                            </Grid>
                        </>
                    )}

                    {/* Job Preference (For System Matching) */}
                    <Typography
                        variant="h6"
                        gutterBottom
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                    >
                        <FileText size={18} /> {t('sponsorship.jobPref')}
                    </Typography>
                    <Divider sx={{ mb: 3 }} />
                    <Grid container spacing={3} sx={{ mb: 4 }}>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                select
                                fullWidth
                                label={t('sponsorship.desiredJobTitle')}
                                value={desiredJobTitle}
                                onChange={(e) =>
                                    setDesiredJobTitle(e.target.value)
                                }
                                required
                            >
                                <MenuItem value="Driver">{t('jobTitles.driver')}</MenuItem>
                                <MenuItem value="Cleaner">{t('jobTitles.cleaner')}</MenuItem>
                                <MenuItem value="Housekeeper">
                                    {t('jobTitles.housekeeper')}
                                </MenuItem>
                                <MenuItem value="Construction Worker">
                                    {t('jobTitles.constructionWorker')}
                                </MenuItem>
                                <MenuItem value="Mason">{t('jobTitles.mason')}</MenuItem>
                                <MenuItem value="Software Engineer">
                                    {t('jobTitles.softwareEngineer')}
                                </MenuItem>
                            </TextField>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label={t('sponsorship.prefLocationLabel')}
                                value={preferredLocation}
                                onChange={(e) =>
                                    setPreferredLocation(e.target.value)
                                }
                                placeholder={t('sponsorship.prefLocationPlaceholder')}
                                required
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label={t('sponsorship.expectedSalaryLabel')}
                                type="number"
                                value={expectedSalary}
                                onChange={(e) =>
                                    setExpectedSalary(e.target.value)
                                }
                                placeholder={t('sponsorship.expectedSalaryPlaceholder')}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label={t('sponsorship.availDateLabel')}
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                value={availabilityDate}
                                onChange={(e) =>
                                    setAvailabilityDate(e.target.value)
                                }
                                required
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                multiline
                                rows={3}
                                label={t('sponsorship.appMessageLabel')}
                                value={applicationMessage}
                                onChange={(e) =>
                                    setApplicationMessage(e.target.value)
                                }
                                placeholder={t('sponsorship.appMessagePlaceholder')}
                            />
                        </Grid>
                    </Grid>

                    {/* Form Actions */}
                    <Box
                        sx={{
                            mt: 5,
                            pt: 3,
                            borderTop: '1px solid #D2DAE5',
                            display: 'flex',
                            gap: 2,
                            justifyContent: 'flex-end',
                        }}
                    >
                        <Button
                            variant="outlined"
                            onClick={handleCancel}
                            sx={{
                                borderColor: '#D2DAE5',
                                color: '#5E7089',
                                '&:hover': {
                                    backgroundColor: '#F5F7FA',
                                    borderColor: '#B0BDD0',
                                },
                            }}
                        >
                            {t('common.cancel')}
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            disabled={!inSaudiArabia}
                        >
                            {t('sponsorship.submitRequest')}
                        </Button>
                    </Box>
                </Paper>
            </form>

            <Snackbar
                open={successOpen}
                autoHideDuration={2000}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    severity="success"
                    sx={{ width: '100%', borderRadius: '8px' }}
                >
                    {t('sponsorship.successMessage')}
                </Alert>
            </Snackbar>
        </DashboardLayout>
    );
}
