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
import { DataTable, Column } from '../shared/DataTable';
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

    const columns: Column<Offer>[] = [
        { id: 'workerName', label: 'Worker Name', minWidth: 160 },
        { id: 'jobTitle', label: 'Position Offered', minWidth: 150 },
        { id: 'workLocation', label: 'Location', minWidth: 120 },
        { id: 'salaryOffered', label: 'Salary (SAR)', minWidth: 140 },
        { id: 'offerDate', label: 'Date Sent', minWidth: 120 },
        {
            id: 'status',
            label: 'Status',
            minWidth: 120,
            format: (value: string) => <StatusBadge status={value} />,
        },
        {
            id: 'actions',
            label: 'Actions',
            minWidth: 130,
            align: 'center',
            format: (_v, row) => (
                <Button
                    size="small"
                    color="error"
                    variant="outlined"
                    startIcon={<XCircle size={16} />}
                    disabled={
                        row.status === 'Accepted' ||
                        row.status === 'Rejected' ||
                        row.status === 'Cancelled'
                    }
                    onClick={() => setCancelTarget(row)}
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

            <DataTable
                columns={columns}
                rows={offersList}
                searchableKey="workerName"
                searchPlaceholder="Search by worker name..."
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
