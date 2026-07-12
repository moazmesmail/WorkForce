import { useState } from 'react';
import { Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router';
import { DashboardLayout } from '../shared/DashboardLayout';
import { workerNavItems } from './WorkerDashboard';
import { AppDataTable } from '../ui/data-display/AppDataTable';
import { MRT_ColumnDef } from 'material-react-table';
import { StatusBadge } from '../shared/StatusBadge';
import { workerApplications } from '../../data/mockData';

export default function WorkerApplicationTracking() {
    const navigate = useNavigate();
    const [appList] = useState(workerApplications);

    const columns: MRT_ColumnDef<(typeof workerApplications)[0]>[] = [
        { accessorKey: 'jobTitle', header: 'Job Title', size: 150 },
        { accessorKey: 'sponsorName', header: 'Sponsor', size: 170 },
        { accessorKey: 'workLocation', header: 'Location', size: 120 },
        { accessorKey: 'dateApplied', header: 'Date Applied', size: 120 },
        {
            accessorKey: 'status',
            header: 'Status',
            size: 140,
            Cell: ({ cell }) => <StatusBadge status={cell.getValue() as string} />,
        },
        {
            id: 'actions',
            header: 'Actions',
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
                        View Offer
                    </Button>
                ) : (
                    <Button size="small" variant="outlined" disabled>
                        No Offer Yet
                    </Button>
                ),
        },
    ];

    return (
        <DashboardLayout navItems={workerNavItems}>
            <Box mb={3}>
                <Typography variant="h4" fontWeight="bold">
                    Application Tracking
                </Typography>
                <Typography color="text.secondary">
                    Monitor the status of your job applications.
                </Typography>
            </Box>

            <AppDataTable
                columns={columns}
                data={appList}
            />
        </DashboardLayout>
    );
}
