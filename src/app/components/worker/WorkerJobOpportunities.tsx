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
import { useTranslation } from 'react-i18next';
import { useMockTranslation } from '../../utils/translateHelpers';

// Only show requests that are open (Pending or Reviewing Matches)
const OPEN_STATUSES = ['Pending', 'Reviewing Matches'];

export default function WorkerJobOpportunities() {
    const { t } = useTranslation();
    const { tJobTitle, tName, tCity } = useMockTranslation();
    const navigate = useNavigate();
    const [titleFilter, setTitleFilter] = useState('');

    const allTitles = [...new Set(workerRequests.map((r) => r.jobTitle))];

    const filtered = workerRequests.filter(
        (r) =>
            OPEN_STATUSES.includes(r.status) &&
            (titleFilter === '' || r.jobTitle === titleFilter)
    );

    const translateExperience = (exp: string): string => {
        if (exp === '3+ years') return t('sponsor.requests.form.experienceOptions.threePlus');
        if (exp === '1-3 years') return t('sponsor.requests.form.experienceOptions.oneToThree');
        if (exp === 'No experience') return t('sponsor.requests.form.experienceOptions.none');
        return exp;
    };

    const columns: MRT_ColumnDef<(typeof workerRequests)[0]>[] = [
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
        { accessorKey: 'salaryRange', header: t('worker.salarySar'), size: 150 },
        { 
            accessorKey: 'requiredExperience', 
            header: t('worker.experience'), 
            size: 120,
            Cell: ({ cell }) => translateExperience(cell.getValue() as string)
        },
        {
            accessorKey: 'accommodationProvided',
            header: t('worker.accommodationLabel'),
            size: 130,
            Cell: ({ cell }) => (cell.getValue() ? t('worker.provided') : t('worker.notProvided')),
        },
        {
            id: 'actions',
            header: t('worker.actions'),
            size: 120,
            muiTableHeadCellProps: { align: 'center' },
            muiTableBodyCellProps: { align: 'center' },
            Cell: ({ row }) => (
                <Button
                    size="small"
                    variant="outlined"
                    onClick={() => navigate(`/worker/jobs/${row.original.id}`)}
                >
                    {t('worker.viewAndApplyButton')}
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
                        {t('worker.jobOpportunitiesTitle')}
                    </Typography>
                    <Typography color="text.secondary">
                        {t('worker.jobOpportunitiesSubtitle')}
                    </Typography>
                </Box>
                <FormControl size="small" sx={{ minWidth: 180 }}>
                    <InputLabel>{t('worker.filterByJobTitleLabel')}</InputLabel>
                    <Select
                        value={titleFilter}
                        label={t('worker.filterByJobTitleLabel')}
                        onChange={(e: SelectChangeEvent) =>
                            setTitleFilter(e.target.value)
                        }
                    >
                        <MenuItem value="">{t('worker.allTitles')}</MenuItem>
                        {allTitles.map((tName) => (
                            <MenuItem key={tName} value={tName}>
                                {tJobTitle(tName)}
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
