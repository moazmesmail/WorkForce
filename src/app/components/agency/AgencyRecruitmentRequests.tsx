import { useState } from 'react';
import {
    Typography,
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Checkbox,
    FormControlLabel,
    Snackbar,
    Alert,
} from '@mui/material';
import { DashboardLayout } from '../shared/DashboardLayout';
import { agencyNavItems } from './AgencyDashboard';
import { AppDataTable } from '../ui/data-display/AppDataTable';
import { MRT_ColumnDef } from 'material-react-table';
import { StatusBadge } from '../shared/StatusBadge';
import { recruitmentRequests, agencyWorkers } from '../../data/mockData';
import { Send, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { useMockTranslation } from '../../utils/translateHelpers';

type Request = (typeof recruitmentRequests)[0];
type AgencyWorker = (typeof agencyWorkers)[0];

export default function AgencyRecruitmentRequests() {
    const { t } = useTranslation();
    const { tName, tJobTitle, tNationality, tCity } = useMockTranslation();
    const [requests] = useState(recruitmentRequests);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState<Request | null>(
        null
    );
    const [selectedWorkerIds, setSelectedWorkerIds] = useState<string[]>([]);
    const [snackbar, setSnackbar] = useState(false);

    const availableWorkers = agencyWorkers.filter(
        (w) => w.sponsorshipStatus === 'Needs Sponsorship Transfer'
    );

    const handleOpenDialog = (request: Request) => {
        setSelectedRequest(request);
        setSelectedWorkerIds([]);
        setDialogOpen(true);
    };

    const toggleWorker = (id: string) => {
        setSelectedWorkerIds((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

    const handleSubmit = () => {
        setDialogOpen(false);
        setSnackbar(true);
        setSelectedWorkerIds([]);
        setSelectedRequest(null);
    };

    const columns: MRT_ColumnDef<Request>[] = [
        { accessorKey: 'id', header: t('agency.recruitmentRequests.columns.id'), size: 100 },
        { 
            accessorKey: 'sponsor', 
            header: t('agency.recruitmentRequests.columns.sponsor'), 
            size: 160,
            Cell: ({ cell }) => tName(cell.getValue() as string)
        },
        { 
            accessorKey: 'jobTitle', 
            header: t('agency.recruitmentRequests.columns.jobTitle'), 
            size: 150,
            Cell: ({ cell }) => tJobTitle(cell.getValue() as string)
        },
        { 
            accessorKey: 'location', 
            header: t('agency.recruitmentRequests.columns.location'), 
            size: 120,
            Cell: ({ cell }) => tCity(cell.getValue() as string)
        },
        {
            accessorKey: 'workersNeeded',
            header: t('agency.recruitmentRequests.columns.needed'),
            size: 90,
            muiTableHeadCellProps: { align: 'center' },
            muiTableBodyCellProps: { align: 'center' },
        },
        { accessorKey: 'requestDate', header: t('agency.recruitmentRequests.columns.date'), size: 110 },
        {
            accessorKey: 'status',
            header: t('agency.recruitmentRequests.columns.status'),
            size: 130,
            Cell: ({ cell }) => <StatusBadge status={cell.getValue() as string} />,
        },
        {
            id: 'actions',
            header: t('agency.recruitmentRequests.columns.actions'),
            size: 180,
            muiTableHeadCellProps: { align: 'center' },
            muiTableBodyCellProps: { align: 'center' },
            Cell: ({ row }) => (
                <Button
                    size="small"
                    variant="contained"
                    startIcon={<Send size={16} />}
                    onClick={() => handleOpenDialog(row.original)}
                    disabled={row.original.status === 'Completed'}
                >
                    {t('agency.recruitmentRequests.actions.submitCandidates')}
                </Button>
            ),
        },
    ];

    return (
        <DashboardLayout navItems={agencyNavItems}>
            <Box mb={3}>
                <Typography variant="h4" fontWeight="bold">
                    {t('agency.recruitmentRequests.title')}
                </Typography>
                <Typography color="text.secondary">
                    {t('agency.recruitmentRequests.subtitle')}
                </Typography>
            </Box>

            <AppDataTable
                columns={columns}
                data={requests}
            />

            <Dialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>
                    <Box display="flex" alignItems="center" gap={1}>
                        <Users size={20} />
                        {t('agency.recruitmentRequests.submitCandidatesTitle', { title: selectedRequest?.jobTitle ? tJobTitle(selectedRequest.jobTitle) : '' })}
                    </Box>
                </DialogTitle>
                <DialogContent dividers>
                    <Typography variant="body2" color="text.secondary" mb={2}>
                        {t('agency.recruitmentRequests.selectWorkersDescPart1')}{' '}
                        <strong>{selectedRequest?.sponsor ? tName(selectedRequest.sponsor) : ''}</strong>{' '}
                        {t('agency.recruitmentRequests.selectWorkersDescPart2', { count: selectedRequest?.workersNeeded })}
                    </Typography>
                    {availableWorkers.map((w: AgencyWorker) => (
                        <Box
                            key={w.id}
                            sx={{ borderBottom: '1px solid #EEF0F3', py: 1 }}
                        >
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={selectedWorkerIds.includes(
                                            w.id
                                        )}
                                        onChange={() => toggleWorker(w.id)}
                                    />
                                }
                                label={
                                    <Box>
                                        <Typography fontWeight={600}>
                                            {tName(w.name)}
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                        >
                                            {tJobTitle(w.jobTitle)} · {tNationality(w.nationality)} ·{' '}
                                            {t('agency.recruitmentRequests.yearsExp', { count: w.yearsOfExperience })} ·{' '}
                                            {tCity(w.currentCity)}
                                        </Typography>
                                    </Box>
                                }
                            />
                        </Box>
                    ))}
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={() => setDialogOpen(false)}>{t('agency.recruitmentRequests.actions.cancel')}</Button>
                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        disabled={selectedWorkerIds.length === 0}
                        startIcon={<Send size={16} />}
                    >
                        {selectedWorkerIds.length > 0
                            ? t('agency.recruitmentRequests.actions.submitCountCandidates', { count: selectedWorkerIds.length })
                            : t('agency.recruitmentRequests.actions.submitCandidates')}
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={snackbar}
                autoHideDuration={3500}
                onClose={() => setSnackbar(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert severity="success" onClose={() => setSnackbar(false)}>
                    {t('agency.recruitmentRequests.candidatesSubmitted')}
                </Alert>
            </Snackbar>
        </DashboardLayout>
    );
}
