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

type AgencyWorker = (typeof initialWorkers)[0];

export default function AgencyManageWorkers() {
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
            message: `${worker.name} is now available for sponsorship transfer.`,
        });
    };

    const columns: MRT_ColumnDef<AgencyWorker>[] = [
        { accessorKey: 'name', header: 'Name', size: 160 },
        { accessorKey: 'jobTitle', header: 'Job Title', size: 140 },
        { accessorKey: 'nationality', header: 'Nationality', size: 120 },
        { accessorKey: 'currentCity', header: 'City', size: 110 },
        {
            accessorKey: 'sponsorshipStatus',
            header: 'Sponsorship',
            size: 180,
            Cell: ({ cell }) => <StatusBadge status={cell.getValue() as string} />,
        },
        {
            accessorKey: 'verificationStatus',
            header: 'Documents',
            size: 150,
            Cell: ({ cell }) => <StatusBadge status={cell.getValue() as string} />,
        },
        {
            id: 'actions',
            header: 'Actions',
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
                        View
                    </Button>
                    <Button
                        size="small"
                        variant="outlined"
                        startIcon={<Edit size={14} />}
                        onClick={() => handleEdit(row.original)}
                    >
                        Edit
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
                        Transfer
                    </Button>
                </Box>
            ),
        },
    ];

    return (
        <DashboardLayout navItems={agencyNavItems}>
            <Box mb={3}>
                <Typography variant="h4" fontWeight="bold">
                    Manage Workers
                </Typography>
                <Typography color="text.secondary">
                    View and manage workers registered by your agency.
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
                <DialogTitle>Edit Worker Profile</DialogTitle>
                <DialogContent dividers>
                    {selectedWorker && (
                        <Grid container spacing={2} sx={{ mt: 1 }}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Full Name"
                                    defaultValue={selectedWorker.name}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Job Title"
                                    defaultValue={selectedWorker.jobTitle}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Years of Experience"
                                    type="number"
                                    defaultValue={
                                        selectedWorker.yearsOfExperience
                                    }
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Current City"
                                    defaultValue={selectedWorker.currentCity}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Mobile Number"
                                    defaultValue={selectedWorker.mobileNumber}
                                />
                            </Grid>
                        </Grid>
                    )}
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
                    <Button
                        variant="contained"
                        onClick={() => setOpenEdit(false)}
                    >
                        Save Changes
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
