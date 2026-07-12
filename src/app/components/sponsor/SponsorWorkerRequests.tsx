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
import { AppDataTable } from '../ui/data-display/AppDataTable';
import { MRT_ColumnDef } from 'material-react-table';
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

    const columns: MRT_ColumnDef<(typeof workerRequests)[0]>[] = [
        { accessorKey: 'jobTitle', header: 'Job Title', size: 150 },
        {
            accessorKey: 'numberOfWorkersNeeded',
            header: '# Needed',
            size: 90,
            muiTableHeadCellProps: { align: 'center' },
            muiTableBodyCellProps: { align: 'center' },
        },
        { accessorKey: 'workLocation', header: 'Location', size: 120 },
        { accessorKey: 'salaryRange', header: 'Salary (SAR)', size: 150 },
        { accessorKey: 'requestDate', header: 'Date', size: 110 },
        {
            accessorKey: 'status',
            header: 'Status',
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

            <AppDataTable
                columns={columns}
                data={filtered}
            />
        </DashboardLayout>
    );
}
