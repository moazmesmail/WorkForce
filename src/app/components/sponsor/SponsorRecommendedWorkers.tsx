import { useState } from 'react';
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

// Only show workers who need sponsorship transfer (available to be matched)
const recommended = workers.filter(
    (w) =>
        w.sponsorshipStatus === 'Needs Sponsorship Transfer' &&
        w.verificationStatus === 'Verified'
);

export default function SponsorRecommendedWorkers() {
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
        { accessorKey: 'name', header: 'Worker Name', size: 160 },
        { accessorKey: 'jobTitle', header: 'Job Title', size: 150 },
        { accessorKey: 'nationality', header: 'Nationality', size: 120 },
        { accessorKey: 'currentCity', header: 'City', size: 110 },
        {
            accessorKey: 'yearsOfExperience',
            header: 'Experience (yrs)',
            size: 130,
            muiTableHeadCellProps: { align: 'center' },
            muiTableBodyCellProps: { align: 'center' },
        },
        {
            accessorKey: 'verificationStatus',
            header: 'Documents',
            size: 130,
            Cell: ({ cell }) => <StatusBadge status={cell.getValue<string>()} />,
        },
        {
            id: 'actions',
            header: 'Actions',
            size: 130,
            muiTableHeadCellProps: { align: 'center' },
            muiTableBodyCellProps: { align: 'center' },
            Cell: ({ row }) =>
                sent.includes(row.original.id) ? (
                    <Button size="small" variant="outlined" disabled>
                        Offer Sent
                    </Button>
                ) : (
                    <Button
                        size="small"
                        variant="contained"
                        startIcon={<Send size={16} />}
                        onClick={() => handleSendOffer(row.original)}
                    >
                        Send Offer
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
                        Recommended Workers
                    </Typography>
                    <Typography color="text.secondary">
                        Verified workers available for sponsorship transfer,
                        matched to your hiring needs.
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
                <DialogTitle>Send Offer to {selected?.name}</DialogTitle>
                <DialogContent dividers>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Job Title"
                                defaultValue={selected?.jobTitle}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Salary Offer (SAR)"
                                placeholder="e.g. 2,500 SAR/month"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Work Location"
                                placeholder="e.g. Riyadh"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Message to Worker (optional)"
                                multiline
                                rows={3}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button variant="contained" onClick={handleConfirmOffer}>
                        Send Offer
                    </Button>
                </DialogActions>
            </Dialog>
        </DashboardLayout>
    );
}
