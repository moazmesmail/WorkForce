import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    Typography,
    Box,
    Button,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    SelectChangeEvent,
} from '@mui/material';
import { DashboardLayout } from '../shared/DashboardLayout';
import { sponsorNavItems } from './SponsorDashboard';
import { AppDataTable } from '../ui/data-display/AppDataTable';
import { MRT_ColumnDef } from 'material-react-table';
import { StatusBadge } from '../shared/StatusBadge';
import { workerRequests } from '../../data/mockData';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router';

import { useMockTranslation } from '../../utils/translateHelpers';

const REQUEST_STATUSES = [
    'Draft',
    'Pending',
    'Reviewing Matches',
    'Candidates Selected',
    'Completed',
    'Cancelled',
];

export default function SponsorWorkerRequests() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { tJobTitle, tCity } = useMockTranslation();
    const [statusFilter, setStatusFilter] = useState('');

    const filtered = workerRequests.filter(
        (r) => statusFilter === '' || r.status === statusFilter
    );

    const statusKeyMap: Record<string, string> = {
        'Draft': 'sponsor.requests.status.draft',
        'Pending': 'sponsor.requests.status.pending',
        'Reviewing Matches': 'sponsor.requests.status.reviewingMatches',
        'Candidates Selected': 'sponsor.requests.status.candidatesSelected',
        'Completed': 'sponsor.requests.status.completed',
        'Cancelled': 'sponsor.requests.status.cancelled',
    };

    const columns: MRT_ColumnDef<(typeof workerRequests)[0]>[] = [
        { 
            accessorKey: 'jobTitle', 
            header: t('sponsor.requests.columns.jobTitle'), 
            size: 150,
            Cell: ({ cell }) => tJobTitle(cell.getValue() as string)
        },
        {
            accessorKey: 'numberOfWorkersNeeded',
            header: t('sponsor.requests.columns.needed'),
            size: 90,
            muiTableHeadCellProps: { align: 'center' },
            muiTableBodyCellProps: { align: 'center' },
        },
        { 
            accessorKey: 'workLocation', 
            header: t('sponsor.requests.columns.location'), 
            size: 120,
            Cell: ({ cell }) => tCity(cell.getValue() as string)
        },
        { accessorKey: 'salaryRange', header: t('sponsor.requests.columns.salary'), size: 150 },
        { accessorKey: 'requestDate', header: t('sponsor.requests.columns.date'), size: 110 },
        {
            accessorKey: 'status',
            header: t('sponsor.requests.columns.status'),
            size: 160,
            Cell: ({ cell }) => <StatusBadge status={cell.getValue<string>()} />,
        },
    ];

    return (
        <DashboardLayout navItems={sponsorNavItems}>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={3}
            >
                <Box>
                    <Typography variant="h4" fontWeight="bold">
                        {t('sponsor.requests.title')}
                    </Typography>
                    <Typography color="text.secondary">
                        {t('sponsor.requests.subtitle')}
                    </Typography>
                </Box>
                <Box display="flex" gap={2} alignItems="center">
                    <FormControl size="small" sx={{ minWidth: 190 }}>
                        <InputLabel>{t('sponsor.requests.filterByStatus')}</InputLabel>
                        <Select
                            value={statusFilter}
                            label={t('sponsor.requests.filterByStatus')}
                            onChange={(e: SelectChangeEvent) =>
                                setStatusFilter(e.target.value)
                            }
                        >
                            <MenuItem value="">{t('sponsor.requests.allStatuses')}</MenuItem>
                            {REQUEST_STATUSES.map((s) => (
                                <MenuItem key={s} value={s}>
                                    {t(statusKeyMap[s] || s)}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button
                        variant="contained"
                        startIcon={<Plus size={18} />}
                        onClick={() => navigate('/sponsor/requests/new')}
                    >
                        {t('sponsor.requests.newRequest')}
                    </Button>
                </Box>
            </Box>

            <AppDataTable
                columns={columns}
                data={filtered}
            />
        </DashboardLayout>
    );
}
