import { useState } from 'react';
import { Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router';
import { DashboardLayout } from '../shared/DashboardLayout';
import { workerNavItems } from './WorkerDashboard';
import { DataTable, Column } from '../shared/DataTable';
import { StatusBadge } from '../shared/StatusBadge';
import { workerApplications } from '../../data/mockData';

export default function WorkerApplicationTracking() {
    const navigate = useNavigate();
    const [appList] = useState(workerApplications);

    const columns: Column<(typeof workerApplications)[0]>[] = [
        { id: 'jobTitle', label: 'Job Title', minWidth: 150 },
        { id: 'sponsorName', label: 'Sponsor', minWidth: 170 },
        { id: 'workLocation', label: 'Location', minWidth: 120 },
        { id: 'dateApplied', label: 'Date Applied', minWidth: 120 },
        {
            id: 'status',
            label: 'Status',
            minWidth: 140,
            format: (value: string) => <StatusBadge status={value} />,
        },
        {
            id: 'actions',
            label: 'Actions',
            minWidth: 130,
            align: 'center',
            format: (_v, row) =>
                row.status === 'Offer Received' ? (
                    <Button
                        size="small"
                        variant="contained"
                        onClick={() => navigate(`/worker/offers/${row.id}`)}
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

            <DataTable
                columns={columns}
                rows={appList}
                searchableKey="jobTitle"
                searchPlaceholder="Search by job title..."
            />
        </DashboardLayout>
    );
}
