import { useState, useEffect } from 'react';
import { Typography, Box, Paper, Grid, Button } from '@mui/material';
import { DashboardLayout } from '../shared/DashboardLayout';
import { workerNavItems } from './WorkerDashboard';
import { StatusBadge } from '../shared/StatusBadge';
import { DataTable, Column } from '../shared/DataTable';
import { sponsorshipRequests as mockSponsorshipRequests } from '../../data/mockData';
import { useNavigate } from 'react-router';

export default function WorkerSponsorshipTransfer() {
    const navigate = useNavigate();
    const [requests, setRequests] = useState<any[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem('sponsorship_requests');
        if (saved) {
            setRequests(JSON.parse(saved));
        } else {
            setRequests(mockSponsorshipRequests);
            localStorage.setItem(
                'sponsorship_requests',
                JSON.stringify(mockSponsorshipRequests)
            );
        }
    }, []);

    const columns: Column<any>[] = [
        { id: 'requestDate', label: 'Date', minWidth: 100 },
        { id: 'currentSponsor', label: 'Current Sponsor', minWidth: 150 },
        {
            id: 'desiredJobTitle',
            label: 'Job Title',
            minWidth: 150,
            format: (v, row) => v || row.jobTitle || 'General',
        },
        {
            id: 'newSponsor',
            label: 'Matched Sponsor',
            minWidth: 180,
            format: (v) =>
                v === 'Pending System Match' ? (
                    <em style={{ color: '#8494AB' }}>Pending Match</em>
                ) : (
                    v
                ),
        },
        {
            id: 'status',
            label: 'Status',
            minWidth: 120,
            format: (value: string) => <StatusBadge status={value} />,
        },
        {
            id: 'actions',
            label: 'Actions',
            minWidth: 140,
            align: 'center',
            format: (value, row) => (
                <Button
                    variant="outlined"
                    size="small"
                    onClick={() => navigate(`/worker/sponsorship/${row.id}`)}
                    sx={{
                        py: 0.5,
                        px: 1.5,
                        fontSize: '0.75rem',
                        borderColor: '#D2DAE5',
                        color: '#0969DA',
                        '&:hover': {
                            backgroundColor: '#F5F7FA',
                            borderColor: '#B0BDD0',
                        },
                    }}
                >
                    View Details
                </Button>
            ),
        },
    ];

    return (
        <DashboardLayout navItems={workerNavItems}>
            <Typography variant="h4" fontWeight="bold" mb={3}>
                Sponsorship Transfer
            </Typography>

            <Grid container spacing={4} mb={4}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper sx={{ p: 3, height: '100%' }}>
                        <Typography variant="h6" gutterBottom>
                            Current Status
                        </Typography>
                        <Box display="flex" alignItems="center" gap={2} mb={2}>
                            <Typography>Status:</Typography>
                            <StatusBadge status="Active" />
                        </Box>
                        <Typography mb={1}>
                            <strong>Current Sponsor:</strong> Current Corp
                        </Typography>
                        <Typography>
                            <strong>Eligibility:</strong> Eligible for transfer
                        </Typography>
                    </Paper>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper
                        sx={{
                            p: 3,
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Typography variant="h6" gutterBottom align="center">
                            Initiate Transfer
                        </Typography>
                        <Typography
                            align="center"
                            color="text.secondary"
                            mb={3}
                        >
                            Start a new sponsorship transfer request. The system
                            will match your request with prospective sponsors
                            after submission.
                        </Typography>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => navigate('/worker/sponsorship/new')}
                        >
                            Request Transfer
                        </Button>
                    </Paper>
                </Grid>
            </Grid>

            <Typography variant="h5" gutterBottom>
                Transfer History
            </Typography>
            <DataTable columns={columns} rows={requests} />
        </DashboardLayout>
    );
}
