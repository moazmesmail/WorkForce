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
import { DataTable, Column } from '../shared/DataTable';
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

    const columns: Column<Request>[] = [
        { id: 'id', label: 'Request ID', minWidth: 100 },
        { id: 'sponsor', label: 'Sponsor', minWidth: 160 },
        { id: 'jobTitle', label: 'Job Title', minWidth: 150 },
        { id: 'location', label: 'Location', minWidth: 120 },
        { id: 'workersNeeded', label: 'Needed', minWidth: 90, align: 'center' },
        { id: 'requestDate', label: 'Date', minWidth: 110 },
        {
            id: 'status',
            label: 'Status',
            minWidth: 130,
            format: (value: string) => <StatusBadge status={value} />,
        },
        {
            id: 'actions',
            label: 'Actions',
            minWidth: 180,
            align: 'center',
            format: (_v, row) => (
                <Button
                    size="small"
                    variant="contained"
                    startIcon={<Send size={16} />}
                    onClick={() => handleOpenDialog(row)}
                    disabled={row.status === 'Completed'}
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

            <DataTable
                columns={columns}
                rows={requests}
                searchableKey="sponsor"
                searchPlaceholder="Search by sponsor..."
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
