import { useState } from 'react';
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
    Snackbar,
    Alert,
} from '@mui/material';
import { DashboardLayout } from '../shared/DashboardLayout';
import { agencyNavItems } from './AgencyDashboard';
import { AppDataTable } from '../ui/data-display/AppDataTable';
import { MRT_ColumnDef } from 'material-react-table';
import { StatusBadge } from '../shared/StatusBadge';
import { agencyWorkers as initialWorkers } from '../../data/mockData';
import { Edit, Eye, ArrowRightLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { useMockTranslation } from '../../utils/translateHelpers';

type AgencyWorker = (typeof initialWorkers)[0];

export default function AgencyManageWorkers() {
    const { t } = useTranslation();
    const { tName, tJobTitle, tNationality, tCity } = useMockTranslation();
    const [workers, setWorkers] = useState(initialWorkers);
    const [openEdit, setOpenEdit] = useState(false);
    const [selectedWorker, setSelectedWorker] = useState<AgencyWorker | null>(
        null
    );
    const [snackbar, setSnackbar] = useState<{
        open: boolean;
        message: string;
    }>({ open: false, message: '' });

    const handleEdit = (worker: AgencyWorker) => {
        setSelectedWorker(worker);
        setOpenEdit(true);
    };

    const handleSubmitForTransfer = (worker: AgencyWorker) => {
        setWorkers((prev) =>
            prev.map((w) =>
                w.id === worker.id
                    ? { ...w, sponsorshipStatus: 'Needs Sponsorship Transfer' }
                    : w
            )
        );
        setSnackbar({
            open: true,
            message: t('agency.manageWorkers.transferSuccess', { name: tName(worker.name) }),
        });
    };

    const columns: MRT_ColumnDef<AgencyWorker>[] = [
        { 
            accessorKey: 'name', 
            header: t('agency.manageWorkers.columns.name'), 
            size: 160,
            Cell: ({ cell }) => tName(cell.getValue() as string)
        },
        { 
            accessorKey: 'jobTitle', 
            header: t('agency.manageWorkers.columns.jobTitle'), 
            size: 140,
            Cell: ({ cell }) => tJobTitle(cell.getValue() as string)
        },
        { 
            accessorKey: 'nationality', 
            header: t('agency.manageWorkers.columns.nationality'), 
            size: 120,
            Cell: ({ cell }) => tNationality(cell.getValue() as string)
        },
        { 
            accessorKey: 'currentCity', 
            header: t('agency.manageWorkers.columns.city'), 
            size: 110,
            Cell: ({ cell }) => tCity(cell.getValue() as string)
        },
        {
            accessorKey: 'sponsorshipStatus',
            header: t('agency.manageWorkers.columns.sponsorship'),
            size: 180,
            Cell: ({ cell }) => <StatusBadge status={cell.getValue() as string} />,
        },
        {
            accessorKey: 'verificationStatus',
            header: t('agency.manageWorkers.columns.documents'),
            size: 150,
            Cell: ({ cell }) => <StatusBadge status={cell.getValue() as string} />,
        },
        {
            id: 'actions',
            header: t('agency.manageWorkers.columns.actions'),
            size: 260,
            muiTableHeadCellProps: { align: 'center' },
            muiTableBodyCellProps: { align: 'center' },
            Cell: ({ row }) => (
                <Box
                    display="flex"
                    gap={1}
                    justifyContent="center"
                    flexWrap="wrap"
                >
                    <Button
                        size="small"
                        variant="outlined"
                        startIcon={<Eye size={14} />}
                    >
                        {t('agency.manageWorkers.actions.view')}
                    </Button>
                    <Button
                        size="small"
                        variant="outlined"
                        startIcon={<Edit size={14} />}
                        onClick={() => handleEdit(row.original)}
                    >
                        {t('agency.manageWorkers.actions.edit')}
                    </Button>
                    <Button
                        size="small"
                        variant="outlined"
                        color="secondary"
                        startIcon={<ArrowRightLeft size={14} />}
                        disabled={
                            row.original.sponsorshipStatus ===
                            'Needs Sponsorship Transfer'
                        }
                        onClick={() => handleSubmitForTransfer(row.original)}
                    >
                        {t('agency.manageWorkers.actions.transfer')}
                    </Button>
                </Box>
            ),
        },
    ];

    return (
        <DashboardLayout navItems={agencyNavItems}>
            <Box mb={3}>
                <Typography variant="h4" fontWeight="bold">
                    {t('agency.manageWorkers.title')}
                </Typography>
                <Typography color="text.secondary">
                    {t('agency.manageWorkers.subtitle')}
                </Typography>
            </Box>

            <AppDataTable
                columns={columns}
                data={workers}
            />

            <Dialog
                open={openEdit}
                onClose={() => setOpenEdit(false)}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>{t('agency.manageWorkers.editTitle')}</DialogTitle>
                <DialogContent dividers>
                    {selectedWorker && (
                        <Grid container spacing={2} sx={{ mt: 1 }}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label={t('agency.manageWorkers.fullName')}
                                    defaultValue={selectedWorker.name}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label={t('agency.manageWorkers.jobTitle')}
                                    defaultValue={selectedWorker.jobTitle}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label={t('agency.manageWorkers.yearsOfExperience')}
                                    type="number"
                                    defaultValue={
                                        selectedWorker.yearsOfExperience
                                    }
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label={t('agency.manageWorkers.currentCity')}
                                    defaultValue={selectedWorker.currentCity}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label={t('agency.manageWorkers.mobileNumber')}
                                    defaultValue={selectedWorker.mobileNumber}
                                />
                            </Grid>
                        </Grid>
                    )}
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={() => setOpenEdit(false)}>{t('agency.manageWorkers.actions.cancel')}</Button>
                    <Button
                        variant="contained"
                        onClick={() => setOpenEdit(false)}
                    >
                        {t('agency.manageWorkers.actions.save')}
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={3500}
                onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert
                    severity="success"
                    onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </DashboardLayout>
    );
}
