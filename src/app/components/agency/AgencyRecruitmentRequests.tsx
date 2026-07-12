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

type Request = (typeof recruitmentRequests)[0];
type AgencyWorker = (typeof agencyWorkers)[0];

export default function AgencyRecruitmentRequests() {
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
        { accessorKey: 'id', header: 'Request ID', size: 100 },
        { accessorKey: 'sponsor', header: 'Sponsor', size: 160 },
        { accessorKey: 'jobTitle', header: 'Job Title', size: 150 },
        { accessorKey: 'location', header: 'Location', size: 120 },
        {
            accessorKey: 'workersNeeded',
            header: 'Needed',
            size: 90,
            muiTableHeadCellProps: { align: 'center' },
            muiTableBodyCellProps: { align: 'center' },
        },
        { accessorKey: 'requestDate', header: 'Date', size: 110 },
        {
            accessorKey: 'status',
            header: 'Status',
            size: 130,
            Cell: ({ cell }) => <StatusBadge status={cell.getValue() as string} />,
        },
        {
            id: 'actions',
            header: 'Actions',
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
                    Submit Candidates
                </Button>
            ),
        },
    ];

    return (
        <DashboardLayout navItems={agencyNavItems}>
            <Box mb={3}>
                <Typography variant="h4" fontWeight="bold">
                    Recruitment Requests
                </Typography>
                <Typography color="text.secondary">
                    Fulfill sponsor requests by submitting suitable candidates.
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
                        Submit Candidates — {selectedRequest?.jobTitle}
                    </Box>
                </DialogTitle>
                <DialogContent dividers>
                    <Typography variant="body2" color="text.secondary" mb={2}>
                        Select workers from your pool to submit for{' '}
                        <strong>{selectedRequest?.sponsor}</strong> (
                        {selectedRequest?.workersNeeded} needed).
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
                                            {w.name}
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                        >
                                            {w.jobTitle} · {w.nationality} ·{' '}
                                            {w.yearsOfExperience} yrs exp ·{' '}
                                            {w.currentCity}
                                        </Typography>
                                    </Box>
                                }
                            />
                        </Box>
                    ))}
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        disabled={selectedWorkerIds.length === 0}
                        startIcon={<Send size={16} />}
                    >
                        Submit{' '}
                        {selectedWorkerIds.length > 0
                            ? `(${selectedWorkerIds.length})`
                            : ''}{' '}
                        Candidates
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
                    Candidates submitted successfully!
                </Alert>
            </Snackbar>
        </DashboardLayout>
    );
}
