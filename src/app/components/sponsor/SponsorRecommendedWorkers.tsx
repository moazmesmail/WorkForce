import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    Typography,
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Grid,
} from '@mui/material';
import { DashboardLayout } from '../shared/DashboardLayout';
import { sponsorNavItems } from './SponsorDashboard';
import { AppDataTable } from '../ui/data-display/AppDataTable';
import { MRT_ColumnDef } from 'material-react-table';
import { StatusBadge } from '../shared/StatusBadge';
import { workers } from '../../data/mockData';
import { Send, Star } from 'lucide-react';
import {
    TextField,
} from '@mui/material';

import { useMockTranslation } from '../../utils/translateHelpers';

// Only show workers who need sponsorship transfer (available to be matched)
const recommended = workers.filter(
    (w) =>
        w.sponsorshipStatus === 'Needs Sponsorship Transfer' &&
        w.verificationStatus === 'Verified'
);

export default function SponsorRecommendedWorkers() {
    const { t } = useTranslation();
    const { tName, tJobTitle, tNationality, tCity } = useMockTranslation();
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<(typeof workers)[0] | null>(null);
    const [sent, setSent] = useState<string[]>([]);

    const handleSendOffer = (worker: (typeof workers)[0]) => {
        setSelected(worker);
        setOpen(true);
    };

    const handleConfirmOffer = () => {
        if (selected) setSent((prev) => [...prev, selected.id]);
        setOpen(false);
        setSelected(null);
    };

    const columns: MRT_ColumnDef<(typeof workers)[0]>[] = [
        { 
            accessorKey: 'name', 
            header: t('sponsor.recommended.columns.workerName'), 
            size: 160,
            Cell: ({ cell }) => tName(cell.getValue() as string)
        },
        { 
            accessorKey: 'jobTitle', 
            header: t('sponsor.recommended.columns.jobTitle'), 
            size: 150,
            Cell: ({ cell }) => tJobTitle(cell.getValue() as string)
        },
        { 
            accessorKey: 'nationality', 
            header: t('sponsor.recommended.columns.nationality'), 
            size: 120,
            Cell: ({ cell }) => tNationality(cell.getValue() as string)
        },
        { 
            accessorKey: 'currentCity', 
            header: t('sponsor.recommended.columns.city'), 
            size: 110,
            Cell: ({ cell }) => tCity(cell.getValue() as string)
        },
        {
            accessorKey: 'yearsOfExperience',
            header: t('sponsor.recommended.columns.experience'),
            size: 130,
            muiTableHeadCellProps: { align: 'center' },
            muiTableBodyCellProps: { align: 'center' },
        },
        {
            accessorKey: 'verificationStatus',
            header: t('sponsor.recommended.columns.documents'),
            size: 130,
            Cell: ({ cell }) => <StatusBadge status={cell.getValue<string>()} />,
        },
        {
            id: 'actions',
            header: t('sponsor.recommended.columns.actions'),
            size: 130,
            muiTableHeadCellProps: { align: 'center' },
            muiTableBodyCellProps: { align: 'center' },
            Cell: ({ row }) =>
                sent.includes(row.original.id) ? (
                    <Button size="small" variant="outlined" disabled>
                        {t('sponsor.recommended.actions.offerSent')}
                    </Button>
                ) : (
                    <Button
                        size="small"
                        variant="contained"
                        startIcon={<Send size={16} />}
                        onClick={() => handleSendOffer(row.original)}
                    >
                        {t('sponsor.recommended.actions.sendOffer')}
                    </Button>
                ),
        },
    ];

    return (
        <DashboardLayout navItems={sponsorNavItems}>
            <Box mb={4} display="flex" alignItems="flex-start" gap={2}>
                <Star
                    color="#F59E0B"
                    fill="#F59E0B"
                    size={26}
                    style={{ marginTop: 6 }}
                />
                <Box>
                    <Typography variant="h4" fontWeight="bold">
                        {t('sponsor.recommended.title')}
                    </Typography>
                    <Typography color="text.secondary">
                        {t('sponsor.recommended.subtitle')}
                    </Typography>
                </Box>
            </Box>

            <AppDataTable
                columns={columns}
                data={recommended}
            />

            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>{t('sponsor.recommended.dialog.title', { name: selected?.name ? tName(selected.name) : '' })}</DialogTitle>
                <DialogContent dividers>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label={t('sponsor.recommended.dialog.jobTitle')}
                                defaultValue={selected?.jobTitle}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label={t('sponsor.recommended.dialog.salaryOffer')}
                                placeholder={t('sponsor.recommended.dialog.salaryOfferPlaceholder')}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label={t('sponsor.recommended.dialog.workLocation')}
                                placeholder={t('sponsor.recommended.dialog.workLocationPlaceholder')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label={t('sponsor.recommended.dialog.message')}
                                multiline
                                rows={3}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={() => setOpen(false)}>{t('sponsor.recommended.dialog.cancel')}</Button>
                    <Button variant="contained" onClick={handleConfirmOffer}>
                        {t('sponsor.recommended.dialog.sendOffer')}
                    </Button>
                </DialogActions>
            </Dialog>
        </DashboardLayout>
    );
}
