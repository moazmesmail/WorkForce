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
} from '@mui/material';
import { DashboardLayout } from '../shared/DashboardLayout';
import { sponsorNavItems } from './SponsorDashboard';
import { AppDataTable } from '../ui/data-display/AppDataTable';
import { MRT_ColumnDef } from 'material-react-table';
import { StatusBadge } from '../shared/StatusBadge';
import { workers } from '../../data/mockData';
import { Send } from 'lucide-react';

export default function SponsorWorkerSearch() {
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
        { accessorKey: 'name', header: 'Worker Name', size: 150 },
        { accessorKey: 'jobTitle', header: 'Job Title', size: 150 },
        { accessorKey: 'nationality', header: 'Nationality', size: 120 },
        { accessorKey: 'yearsOfExperience', header: 'Experience (Yrs)', size: 100 },
        {
            accessorKey: 'verificationStatus',
            header: 'Status',
            size: 120,
            Cell: ({ cell }) => <StatusBadge status={cell.getValue<string>()} />,
        },
        {
            id: 'actions',
            header: 'Actions',
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
                    Send Offer
                </Button>
            ),
        },
    ];

    return (
        <DashboardLayout navItems={sponsorNavItems}>
            <Box mb={3}>
                <Typography variant="h4" fontWeight="bold">
                    Worker Search
                </Typography>
                <Typography color="text.secondary">
                    Find and recruit available talent directly.
                </Typography>
            </Box>

            {/* Filter placeholder space */}
            <Box display="flex" gap={2} mb={3}>
                <TextField
                    size="small"
                    label="Filter by Nationality"
                    variant="outlined"
                />
                <TextField
                    size="small"
                    label="Filter by Experience"
                    variant="outlined"
                />
            </Box>

            <AppDataTable
                columns={columns}
                data={workers}
            />

            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>Send Offer to {selectedWorker}</DialogTitle>
                <DialogContent dividers>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                label="Job Title"
                                defaultValue="Software Engineer"
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField fullWidth label="Salary Offer" />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField fullWidth label="Location" />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                label="Message to Worker"
                                multiline
                                rows={4}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" onClick={handleClose}>
                        Send Offer
                    </Button>
                </DialogActions>
            </Dialog>
        </DashboardLayout>
    );
}
