import { useState } from 'react';
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
import { DataTable, Column } from '../shared/DataTable';
import { StatusBadge } from '../shared/StatusBadge';
import { workerRequests } from '../../data/mockData';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router';

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
    const [statusFilter, setStatusFilter] = useState('');

    const filtered = workerRequests.filter(
        (r) => statusFilter === '' || r.status === statusFilter
    );

    const columns: Column<(typeof workerRequests)[0]>[] = [
        { id: 'jobTitle', label: 'Job Title', minWidth: 150 },
        {
            id: 'numberOfWorkersNeeded',
            label: '# Needed',
            minWidth: 90,
            align: 'center',
        },
        { id: 'workLocation', label: 'Location', minWidth: 120 },
        { id: 'salaryRange', label: 'Salary (SAR)', minWidth: 150 },
        { id: 'requestDate', label: 'Date', minWidth: 110 },
        {
            id: 'status',
            label: 'Status',
            minWidth: 160,
            format: (value: string) => <StatusBadge status={value} />,
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
                        Requests
                    </Typography>
                    <Typography color="text.secondary">
                        Manage your requests for new workers.
                    </Typography>
                </Box>
                <Box display="flex" gap={2} alignItems="center">
                    <FormControl size="small" sx={{ minWidth: 190 }}>
                        <InputLabel>Filter by Status</InputLabel>
                        <Select
                            value={statusFilter}
                            label="Filter by Status"
                            onChange={(e: SelectChangeEvent) =>
                                setStatusFilter(e.target.value)
                            }
                        >
                            <MenuItem value="">All Statuses</MenuItem>
                            {REQUEST_STATUSES.map((s) => (
                                <MenuItem key={s} value={s}>
                                    {s}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button
                        variant="contained"
                        startIcon={<Plus size={18} />}
                        onClick={() => navigate('/sponsor/requests/new')}
                    >
                        New Request
                    </Button>
                </Box>
            </Box>

            <DataTable
                columns={columns}
                rows={filtered}
                searchableKey="jobTitle"
                searchPlaceholder="Search by job title..."
            />
        </DashboardLayout>
    );
}
