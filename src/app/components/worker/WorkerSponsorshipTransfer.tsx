import { useState, useEffect } from 'react';
import { Typography, Box, Paper, Grid, Button } from '@mui/material';
import { DashboardLayout } from '../shared/DashboardLayout';
import { workerNavItems } from './WorkerDashboard';
import { StatusBadge } from '../shared/StatusBadge';
import { AppDataTable } from '../ui/data-display/AppDataTable';
import { MRT_ColumnDef } from 'material-react-table';
import { sponsorshipRequests as mockSponsorshipRequests } from '../../data/mockData';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

import { useMockTranslation } from '../../utils/translateHelpers';

export default function WorkerSponsorshipTransfer() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { tName } = useMockTranslation();
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

    const getJobTitleLabel = (title: string) => {
        if (!title) return '';
        const key = title.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
        return t(`jobTitles.${key}`, title);
    };

    const columns: MRT_ColumnDef<any>[] = [
        { accessorKey: 'requestDate', header: t('sponsorship.columns.date'), size: 100 },
        { 
            accessorKey: 'currentSponsor', 
            header: t('sponsorship.columns.currentSponsor'), 
            size: 150,
            Cell: ({ cell }) => tName(cell.getValue() as string)
        },
        {
            accessorKey: 'desiredJobTitle',
            header: t('sponsorship.columns.jobTitle'),
            size: 150,
            Cell: ({ cell, row }) => getJobTitleLabel(cell.getValue() as string || row.original.jobTitle || 'General'),
        },
        {
            accessorKey: 'newSponsor',
            header: t('sponsorship.columns.matchedSponsor'),
            size: 180,
            Cell: ({ cell }) =>
                cell.getValue() === 'Pending System Match' ? (
                    <em style={{ color: '#8494AB' }}>{t('sponsorship.pendingMatch')}</em>
                ) : (
                    tName(cell.getValue() as string)
                ),
        },
        {
            accessorKey: 'status',
            header: t('sponsorship.columns.status'),
            size: 120,
            Cell: ({ cell }) => <StatusBadge status={cell.getValue() as string} />,
        },
        {
            id: 'actions',
            header: t('sponsorship.columns.actions'),
            size: 140,
            muiTableHeadCellProps: { align: 'center' },
            muiTableBodyCellProps: { align: 'center' },
            Cell: ({ row }) => (
                <Button
                    variant="outlined"
                    size="small"
                    onClick={() => navigate(`/worker/sponsorship/${row.original.id}`)}
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
                    {t('sponsorship.viewDetails')}
                </Button>
            ),
        },
    ];

    return (
        <DashboardLayout navItems={workerNavItems}>
            <Typography variant="h4" fontWeight="bold" mb={3}>
                {t('sponsorship.title')}
            </Typography>

            <Grid container spacing={4} mb={4}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper sx={{ p: 3, height: '100%' }}>
                        <Typography variant="h6" gutterBottom>
                            {t('sponsorship.currentStatus')}
                        </Typography>
                        <Box display="flex" alignItems="center" gap={2} mb={2}>
                            <Typography>{t('common.status')}:</Typography>
                            <StatusBadge status="Active" />
                        </Box>
                        <Typography mb={1}>
                            <strong>{t('sponsorship.columns.currentSponsor')}:</strong> {tName('Current Corp')}
                        </Typography>
                        <Typography>
                            <strong>{t('sponsorship.eligibility')}:</strong> {t('sponsorship.eligible')}
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
                            {t('sponsorship.initiateTransfer')}
                        </Typography>
                        <Typography
                            align="center"
                            color="text.secondary"
                            mb={3}
                        >
                            {t('sponsorship.initiateDesc')}
                        </Typography>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => navigate('/worker/sponsorship/new')}
                        >
                            {t('sponsorship.requestTransfer')}
                        </Button>
                    </Paper>
                </Grid>
            </Grid>

            <Typography variant="h5" gutterBottom>
                {t('sponsorship.transferHistory')}
            </Typography>
            <AppDataTable columns={columns} data={requests} />
        </DashboardLayout>
    );
}
