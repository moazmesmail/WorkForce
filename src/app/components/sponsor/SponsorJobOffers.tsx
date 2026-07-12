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
} from '@mui/material';
import { DashboardLayout } from '../shared/DashboardLayout';
import { sponsorNavItems } from './SponsorDashboard';
import { AppDataTable } from '../ui/data-display/AppDataTable';
import { MRT_ColumnDef } from 'material-react-table';
import { StatusBadge } from '../shared/StatusBadge';
import { jobOffers as initialOffers } from '../../data/mockData';
import { XCircle } from 'lucide-react';

import { useMockTranslation } from '../../utils/translateHelpers';

type Offer = (typeof initialOffers)[0];

export default function SponsorJobOffers() {
    const { t } = useTranslation();
    const { tName, tJobTitle, tCity } = useMockTranslation();
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
        { 
            accessorKey: 'workerName', 
            header: t('sponsor.offers.columns.workerName'), 
            size: 160,
            Cell: ({ cell }) => tName(cell.getValue() as string)
        },
        { 
            accessorKey: 'jobTitle', 
            header: t('sponsor.offers.columns.positionOffered'), 
            size: 150,
            Cell: ({ cell }) => tJobTitle(cell.getValue() as string)
        },
        { 
            accessorKey: 'workLocation', 
            header: t('sponsor.offers.columns.location'), 
            size: 120,
            Cell: ({ cell }) => tCity(cell.getValue() as string)
        },
        { accessorKey: 'salaryOffered', header: t('sponsor.offers.columns.salary'), size: 140 },
        { accessorKey: 'offerDate', header: t('sponsor.offers.columns.dateSent'), size: 120 },
        {
            accessorKey: 'status',
            header: t('sponsor.offers.columns.status'),
            size: 120,
            Cell: ({ cell }) => <StatusBadge status={cell.getValue<string>()} />,
        },
        {
            id: 'actions',
            header: t('sponsor.offers.columns.actions'),
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
                    {t('sponsor.offers.actions.cancel')}
                </Button>
            ),
        },
    ];

    return (
        <DashboardLayout navItems={sponsorNavItems}>
            <Box mb={3}>
                <Typography variant="h4" fontWeight="bold">
                    {t('sponsor.offers.title')}
                </Typography>
                <Typography color="text.secondary">
                    {t('sponsor.offers.subtitle')}
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
                <DialogTitle>{t('sponsor.offers.dialog.title')}</DialogTitle>
                <DialogContent>
                    <Typography>
                        {t('sponsor.offers.dialog.confirmPrefix')}{' '}
                        <strong>{cancelTarget ? tName(cancelTarget.workerName) : ''}</strong>{' '}
                        {t('sponsor.offers.dialog.confirmMiddle')}{' '}
                        <strong>{cancelTarget ? tJobTitle(cancelTarget.jobTitle) : ''}</strong>?
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={() => setCancelTarget(null)}>
                        {t('sponsor.offers.dialog.keep')}
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleCancel}
                    >
                        {t('sponsor.offers.dialog.cancelConfirm')}
                    </Button>
                </DialogActions>
            </Dialog>
        </DashboardLayout>
    );
}
