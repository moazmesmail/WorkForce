import { useState } from 'react';
import { Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router';
import { DashboardLayout } from '../shared/DashboardLayout';
import { workerNavItems } from './WorkerDashboard';
import { AppDataTable } from '../ui/data-display/AppDataTable';
import { MRT_ColumnDef } from 'material-react-table';
import { StatusBadge } from '../shared/StatusBadge';
import { workerApplications } from '../../data/mockData';
import { useTranslation } from 'react-i18next';
import { useMockTranslation } from '../../utils/translateHelpers';

export default function WorkerApplicationTracking() {
    const { t } = useTranslation();
    const { tJobTitle, tName, tCity } = useMockTranslation();
    const navigate = useNavigate();
    const [appList] = useState(workerApplications);

    const columns: MRT_ColumnDef<(typeof workerApplications)[0]>[] = [
        { 
            accessorKey: 'jobTitle', 
            header: t('worker.jobTitle'), 
            size: 150,
            Cell: ({ cell }) => tJobTitle(cell.getValue() as string)
        },
        { 
            accessorKey: 'sponsorName', 
            header: t('worker.sponsor'), 
            size: 170,
            Cell: ({ cell }) => tName(cell.getValue() as string)
        },
        { 
            accessorKey: 'workLocation', 
            header: t('worker.location'), 
            size: 120,
            Cell: ({ cell }) => tCity(cell.getValue() as string)
        },
        { accessorKey: 'dateApplied', header: t('worker.dateApplied'), size: 120 },
        {
            accessorKey: 'status',
            header: t('worker.status'),
            size: 140,
            Cell: ({ cell }) => <StatusBadge status={cell.getValue() as string} />,
        },
        {
            id: 'actions',
            header: t('worker.actions'),
            size: 130,
            muiTableHeadCellProps: { align: 'center' },
            muiTableBodyCellProps: { align: 'center' },
            Cell: ({ row }) =>
                row.original.status === 'Offer Received' ? (
                    <Button
                        size="small"
                        variant="contained"
                        onClick={() => navigate(`/worker/offers/${row.original.id}`)}
                    >
                        {t('worker.viewOffer')}
                    </Button>
                ) : (
                    <Button size="small" variant="outlined" disabled>
                        {t('worker.noOfferYet')}
                    </Button>
                ),
        },
    ];

    return (
        <DashboardLayout navItems={workerNavItems}>
            <Box mb={3}>
                <Typography variant="h4" fontWeight="bold">
                    {t('worker.applicationTrackingTitle')}
                </Typography>
                <Typography color="text.secondary">
                    {t('worker.applicationTrackingSubtitle')}
                </Typography>
            </Box>

            <AppDataTable
                columns={columns}
                data={appList}
            />
        </DashboardLayout>
    );
}
