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
import { DataTable, Column } from '../shared/DataTable';
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

    const columns: Column<(typeof workerRequests)[0]>[] = [
        { id: 'jobTitle', label: 'Job Title', minWidth: 150 },
        { id: 'sponsorName', label: 'Sponsor', minWidth: 170 },
        { id: 'workLocation', label: 'Location', minWidth: 120 },
        { id: 'salaryRange', label: 'Salary (SAR)', minWidth: 150 },
        { id: 'requiredExperience', label: 'Experience', minWidth: 120 },
        {
            id: 'accommodationProvided',
            label: 'Accommodation',
            minWidth: 130,
            format: (value: boolean) => (value ? 'Provided' : 'Not Provided'),
        },
        {
            id: 'actions',
            label: 'Actions',
            minWidth: 120,
            align: 'center',
            format: (_v, row) => (
                <Button
                    size="small"
                    variant="outlined"
                    onClick={() => navigate(`/worker/jobs/${row.id}`)}
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

            <DataTable
                columns={columns}
                rows={filtered}
                searchableKey="sponsorName"
                searchPlaceholder="Search by sponsor..."
            />
        </DashboardLayout>
    );
}
