import { useState } from 'react';
import {
    Typography,
    Box,
    Paper,
    Button,
    Grid,
    Divider,
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router';
import { DashboardLayout } from '../shared/DashboardLayout';
import { workerNavItems } from './WorkerDashboard';
import { jobOffers } from '../../data/mockData';
import { CheckCircle, XCircle, Home, Car } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { useMockTranslation } from '../../utils/translateHelpers';

export default function WorkerJobOffer() {
    const { t } = useTranslation();
    const { tJobTitle, tName, tCity } = useMockTranslation();
    const { id } = useParams();
    const navigate = useNavigate();
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [confirmAction, setConfirmAction] = useState<
        'accept' | 'reject' | null
    >(null);
    const [decided, setDecided] = useState<'Accepted' | 'Rejected' | null>(
        null
    );

    const offer = jobOffers.find((o) => o.id === id) ?? jobOffers[0];

    const handleDecision = () => {
        if (confirmAction === 'accept') setDecided('Accepted');
        else setDecided('Rejected');
        setConfirmOpen(false);
    };

    return (
        <DashboardLayout navItems={workerNavItems}>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={3}
            >
                <Typography variant="h4" fontWeight="bold">
                    {t('worker.jobOfferDetailsTitle')}
                </Typography>
                <Button
                    variant="outlined"
                    onClick={() => navigate('/worker/applications')}
                >
                    {t('worker.backToApplicationsButton')}
                </Button>
            </Box>

            <Paper sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    mb={1}
                >
                    <Box>
                        <Typography
                            variant="h5"
                            color="primary.main"
                            fontWeight="bold"
                        >
                            {tJobTitle(offer.jobTitle)}
                        </Typography>
                        <Typography variant="h6" color="text.secondary">
                            {tName(offer.sponsorName)}
                        </Typography>
                    </Box>
                    {decided && (
                        <Chip
                            label={decided === 'Accepted' ? t('worker.accepted') : t('worker.rejected')}
                            color={decided === 'Accepted' ? 'success' : 'error'}
                            sx={{ fontWeight: 700, fontSize: '0.9rem', px: 1 }}
                        />
                    )}
                </Box>

                <Divider sx={{ my: 3 }} />

                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            display="block"
                        >
                            {t('worker.salaryOfferedLabel')}
                        </Typography>
                        <Typography variant="body1" fontWeight="bold">
                            {offer.salaryOffered}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            display="block"
                        >
                            {t('worker.workLocationLabel')}
                        </Typography>
                        <Typography variant="body1" fontWeight="bold">
                            {tCity(offer.workLocation)}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            display="block"
                        >
                            {t('worker.workingHoursLabel')}
                        </Typography>
                        <Typography variant="body1" fontWeight="bold">
                            {offer.workingHours}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            display="block"
                        >
                            {t('worker.contractDurationLabel')}
                        </Typography>
                        <Typography variant="body1" fontWeight="bold">
                            {offer.contractDuration}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Box display="flex" alignItems="center" gap={1}>
                            <Home size={16} color="#6B7280" />
                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                {t('worker.accommodationLabel')}
                            </Typography>
                        </Box>
                        <Typography variant="body1" fontWeight="bold">
                            {offer.accommodationProvided
                                ? t('worker.provided')
                                : t('worker.notProvided')}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Box display="flex" alignItems="center" gap={1}>
                            <Car size={16} color="#6B7280" />
                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                {t('worker.transportationLabel')}
                            </Typography>
                        </Box>
                        <Typography variant="body1" fontWeight="bold">
                            {offer.transportationProvided
                                ? t('worker.provided')
                                : t('worker.notProvided')}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            display="block"
                        >
                            {t('worker.offerDateLabel')}
                        </Typography>
                        <Typography variant="body1" fontWeight="bold">
                            {offer.offerDate}
                        </Typography>
                    </Grid>
                </Grid>

                <Box mt={4} p={2} bgcolor="#F5F7FA" borderRadius={1}>
                    <Typography variant="body2" color="text.secondary">
                        {t('worker.offerReviewWarning')}
                    </Typography>
                </Box>

                {!decided && (
                    <Box
                        mt={4}
                        display="flex"
                        gap={2}
                        justifyContent="flex-end"
                    >
                        <Button
                            variant="outlined"
                            color="error"
                            size="large"
                            startIcon={<XCircle size={18} />}
                            onClick={() => {
                                setConfirmAction('reject');
                                setConfirmOpen(true);
                            }}
                        >
                            {t('worker.rejectOfferButton')}
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            startIcon={<CheckCircle size={18} />}
                            onClick={() => {
                                setConfirmAction('accept');
                                setConfirmOpen(true);
                            }}
                        >
                            {t('worker.acceptOfferButton')}
                        </Button>
                    </Box>
                )}
            </Paper>

            <Dialog
                open={confirmOpen}
                onClose={() => setConfirmOpen(false)}
                maxWidth="xs"
                fullWidth
            >
                <DialogTitle>
                    {confirmAction === 'accept'
                        ? t('worker.acceptOfferTitle')
                        : t('worker.rejectOfferTitle')}
                </DialogTitle>
                <DialogContent>
                    <Typography>
                        {confirmAction === 'accept'
                            ? t('worker.acceptOfferDesc')
                            : t('worker.rejectOfferDesc')}
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={() => setConfirmOpen(false)}>
                        {t('worker.cancel')}
                    </Button>
                    <Button
                        variant="contained"
                        color={confirmAction === 'accept' ? 'primary' : 'error'}
                        onClick={handleDecision}
                    >
                        {confirmAction === 'accept' ? t('worker.confirmAcceptButton') : t('worker.confirmRejectButton')}
                    </Button>
                </DialogActions>
            </Dialog>
        </DashboardLayout>
    );
}
