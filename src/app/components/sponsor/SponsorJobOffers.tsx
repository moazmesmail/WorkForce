import { useState } from 'react';
import {
    Typography,
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import { DashboardLayout } from '../shared/DashboardLayout';
import { sponsorNavItems } from './SponsorDashboard';
import { AppDataTable } from '../ui/data-display/AppDataTable';
import { MRT_ColumnDef } from 'material-react-table';
import { StatusBadge } from '../shared/StatusBadge';
import { jobOffers as initialOffers } from '../../data/mockData';
import { XCircle } from 'lucide-react';

type Offer = (typeof initialOffers)[0];

export default function SponsorJobOffers() {
    const [offersList, setOffersList] = useState(initialOffers);
    const [cancelTarget, setCancelTarget] = useState<Offer | null>(null);

    const handleCancel = () => {
        if (!cancelTarget) return;
        setOffersList((prev) =>
            prev.map((o) =>
                o.id === cancelTarget.id ? { ...o, status: 'Cancelled' } : o
            )
        );
        setCancelTarget(null);
    };

    const columns: MRT_ColumnDef<Offer>[] = [
        { accessorKey: 'workerName', header: 'Worker Name', size: 160 },
        { accessorKey: 'jobTitle', header: 'Position Offered', size: 150 },
        { accessorKey: 'workLocation', header: 'Location', size: 120 },
        { accessorKey: 'salaryOffered', header: 'Salary (SAR)', size: 140 },
        { accessorKey: 'offerDate', header: 'Date Sent', size: 120 },
        {
            accessorKey: 'status',
            header: 'Status',
            size: 120,
            Cell: ({ cell }) => <StatusBadge status={cell.getValue<string>()} />,
        },
        {
            id: 'actions',
            header: 'Actions',
            size: 130,
            muiTableHeadCellProps: { align: 'center' },
            muiTableBodyCellProps: { align: 'center' },
            Cell: ({ row }) => (
                <Button
                    size="small"
                    color="error"
                    variant="outlined"
                    startIcon={<XCircle size={16} />}
                    disabled={
                        row.original.status === 'Accepted' ||
                        row.original.status === 'Rejected' ||
                        row.original.status === 'Cancelled'
                    }
                    onClick={() => setCancelTarget(row.original)}
                >
                    Cancel
                </Button>
            ),
        },
    ];

    return (
        <DashboardLayout navItems={sponsorNavItems}>
            <Box mb={3}>
                <Typography variant="h4" fontWeight="bold">
                    Offers
                </Typography>
                <Typography color="text.secondary">
                    Track the status of direct offers sent to workers.
                </Typography>
            </Box>

            <AppDataTable
                columns={columns}
                data={offersList}
            />

            <Dialog
                open={!!cancelTarget}
                onClose={() => setCancelTarget(null)}
                maxWidth="xs"
                fullWidth
            >
                <DialogTitle>Cancel Offer?</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to cancel the offer sent to{' '}
                        <strong>{cancelTarget?.workerName}</strong> for{' '}
                        <strong>{cancelTarget?.jobTitle}</strong>?
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={() => setCancelTarget(null)}>
                        Keep Offer
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleCancel}
                    >
                        Yes, Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </DashboardLayout>
    );
}
