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
    TextField,
    Grid,
} from '@mui/material';
import { DashboardLayout } from '../shared/DashboardLayout';
import { sponsorNavItems } from './SponsorDashboard';
import { AppDataTable } from '../ui/data-display/AppDataTable';
import { MRT_ColumnDef } from 'material-react-table';
import { StatusBadge } from '../shared/StatusBadge';
import { workers } from '../../data/mockData';
import { Send } from 'lucide-react';

import { useMockTranslation } from '../../utils/translateHelpers';

export default function SponsorWorkerSearch() {
    const { t } = useTranslation();
    const { tName, tJobTitle, tNationality } = useMockTranslation();
    const [open, setOpen] = useState(false);
    const [selectedWorker, setSelectedWorker] = useState<string | null>(null);

    const handleOpenOffer = (workerName: string) => {
        setSelectedWorker(workerName);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedWorker(null);
    };

    const columns: MRT_ColumnDef<(typeof workers)[0]>[] = [
        { 
            accessorKey: 'name', 
            header: t('sponsor.search.columns.name'), 
            size: 150,
            Cell: ({ cell }) => tName(cell.getValue() as string)
        },
        { 
            accessorKey: 'jobTitle', 
            header: t('sponsor.search.columns.jobTitle'), 
            size: 150,
            Cell: ({ cell }) => tJobTitle(cell.getValue() as string)
        },
        { 
            accessorKey: 'nationality', 
            header: t('sponsor.search.columns.nationality'), 
            size: 120,
            Cell: ({ cell }) => tNationality(cell.getValue() as string)
        },
        { accessorKey: 'yearsOfExperience', header: t('sponsor.search.columns.experience'), size: 100 },
        {
            accessorKey: 'verificationStatus',
            header: t('sponsor.search.columns.status'),
            size: 120,
            Cell: ({ cell }) => <StatusBadge status={cell.getValue<string>()} />,
        },
        {
            id: 'actions',
            header: t('sponsor.search.columns.actions'),
            size: 120,
            muiTableHeadCellProps: { align: 'center' },
            muiTableBodyCellProps: { align: 'center' },
            Cell: ({ row }) => (
                <Button
                    size="small"
                    variant="contained"
                    startIcon={<Send size={16} />}
                    onClick={() => handleOpenOffer(row.original.name)}
                >
                    {t('sponsor.search.actions.sendOffer')}
                </Button>
            ),
        },
    ];

    return (
        <DashboardLayout navItems={sponsorNavItems}>
            <Box mb={3}>
                <Typography variant="h4" fontWeight="bold">
                    {t('sponsor.search.title')}
                </Typography>
                <Typography color="text.secondary">
                    {t('sponsor.search.subtitle')}
                </Typography>
            </Box>

            {/* Filter placeholder space */}
            <Box display="flex" gap={2} mb={3}>
                <TextField
                    size="small"
                    label={t('sponsor.search.filters.nationality')}
                    variant="outlined"
                />
                <TextField
                    size="small"
                    label={t('sponsor.search.filters.experience')}
                    variant="outlined"
                />
            </Box>

            <AppDataTable
                columns={columns}
                data={workers}
            />

            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>{t('sponsor.search.dialog.title', { name: selectedWorker ? tName(selectedWorker) : '' })}</DialogTitle>
                <DialogContent dividers>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                label={t('sponsor.search.dialog.jobTitle')}
                                defaultValue="Software Engineer"
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField fullWidth label={t('sponsor.search.dialog.salaryOffer')} />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField fullWidth label={t('sponsor.search.dialog.location')} />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                label={t('sponsor.search.dialog.message')}
                                multiline
                                rows={4}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={handleClose}>{t('sponsor.search.dialog.cancel')}</Button>
                    <Button variant="contained" onClick={handleClose}>
                        {t('sponsor.search.dialog.sendOffer')}
                    </Button>
                </DialogActions>
            </Dialog>
        </DashboardLayout>
    );
}
