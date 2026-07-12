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
import { workerNavItems } from './WorkerDashboard';
import { AppDataTable } from '../ui/data-display/AppDataTable';
import { MRT_ColumnDef } from 'material-react-table';
import { StatusBadge } from '../shared/StatusBadge';
import { workerRequests } from '../../data/mockData';
import { useNavigate } from 'react-router';

// Only show requests that are open (Pending or Reviewing Matches)
const OPEN_STATUSES = ['Pending', 'Reviewing Matches'];

export default function WorkerJobOpportunities() {
    const navigate = useNavigate();
    const [titleFilter, setTitleFilter] = useState('');

    const allTitles = [...new Set(workerRequests.map((r) => r.jobTitle))];

    const filtered = workerRequests.filter(
        (r) =>
            OPEN_STATUSES.includes(r.status) &&
            (titleFilter === '' || r.jobTitle === titleFilter)
    );

    const columns: MRT_ColumnDef<(typeof workerRequests)[0]>[] = [
        { accessorKey: 'jobTitle', header: 'Job Title', size: 150 },
        { accessorKey: 'sponsorName', header: 'Sponsor', size: 170 },
        { accessorKey: 'workLocation', header: 'Location', size: 120 },
        { accessorKey: 'salaryRange', header: 'Salary (SAR)', size: 150 },
        { accessorKey: 'requiredExperience', header: 'Experience', size: 120 },
        {
            accessorKey: 'accommodationProvided',
            header: 'Accommodation',
            size: 130,
            Cell: ({ cell }) => (cell.getValue() ? 'Provided' : 'Not Provided'),
        },
        {
            id: 'actions',
            header: 'Actions',
            size: 120,
            muiTableHeadCellProps: { align: 'center' },
            muiTableBodyCellProps: { align: 'center' },
            Cell: ({ row }) => (
                <Button
                    size="small"
                    variant="outlined"
                    onClick={() => navigate(`/worker/jobs/${row.original.id}`)}
                >
                    View & Apply
                </Button>
            ),
        },
    ];

    return (
        <DashboardLayout navItems={workerNavItems}>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={3}
            >
                <Box>
                    <Typography variant="h4" fontWeight="bold">
                        Job Opportunities
                    </Typography>
                    <Typography color="text.secondary">
                        Browse open positions and submit your application.
                    </Typography>
                </Box>
                <FormControl size="small" sx={{ minWidth: 180 }}>
                    <InputLabel>Filter by Job Title</InputLabel>
                    <Select
                        value={titleFilter}
                        label="Filter by Job Title"
                        onChange={(e: SelectChangeEvent) =>
                            setTitleFilter(e.target.value)
                        }
                    >
                        <MenuItem value="">All Titles</MenuItem>
                        {allTitles.map((t) => (
                            <MenuItem key={t} value={t}>
                                {t}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            <AppDataTable
                columns={columns}
                data={filtered}
            />
        </DashboardLayout>
    );
}
