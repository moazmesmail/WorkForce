import { useState, useEffect } from 'react';
import {
    Typography,
    Box,
    Tabs,
    Tab,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import { DashboardLayout } from '../shared/DashboardLayout';
import { sponsorNavItems } from './SponsorDashboard';
import { AppDataTable } from '../ui/data-display/AppDataTable';
import { MRT_ColumnDef } from 'material-react-table';
import { StatusBadge } from '../shared/StatusBadge';
import {
    recruitmentRequests as mockRecruitment,
    sponsorshipRequests as mockSponsorship,
} from '../../data/mockData';
import { CheckCircle, XCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function SponsorRecruitmentApproval() {
    const { currentUser } = useAuth();
    const [tabIndex, setTabIndex] = useState(0);
    const [openDialog, setOpenDialog] = useState(false);
    const [actionType, setActionType] = useState<'Approve' | 'Reject' | null>(
        null
    );

    const [sponsorshipList, setSponsorshipList] = useState<any[]>([]);
    const [recruitmentList, setRecruitmentList] = useState<any[]>([]);
    const [selectedRequest, setSelectedRequest] = useState<{
        id: string;
        type: 'sponsorship' | 'recruitment';
    } | null>(null);

    useEffect(() => {
        // Load Sponsorship
        const savedSponsorship = localStorage.getItem('sponsorship_requests');
        if (savedSponsorship) {
            setSponsorshipList(JSON.parse(savedSponsorship));
        } else {
            setSponsorshipList(mockSponsorship);
            localStorage.setItem(
                'sponsorship_requests',
                JSON.stringify(mockSponsorship)
            );
        }

        // Load Recruitment
        const savedRecruitment = localStorage.getItem('recruitment_requests');
        if (savedRecruitment) {
            setRecruitmentList(JSON.parse(savedRecruitment));
        } else {
            setRecruitmentList(mockRecruitment);
            localStorage.setItem(
                'recruitment_requests',
                JSON.stringify(mockRecruitment)
            );
        }
    }, []);

    const handleAction = (
        type: 'Approve' | 'Reject',
        row: any,
        requestType: 'sponsorship' | 'recruitment'
    ) => {
        setActionType(type);
        setSelectedRequest({ id: row.id, type: requestType });
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
        setActionType(null);
        setSelectedRequest(null);
    };

    const handleConfirm = () => {
        if (!selectedRequest || !actionType) return;

        const newStatus = actionType === 'Approve' ? 'Approved' : 'Rejected';

        if (selectedRequest.type === 'sponsorship') {
            const updated = sponsorshipList.map((r) => {
                if (r.id === selectedRequest.id) {
                    return {
                        ...r,
                        status: newStatus,
                        newSponsor:
                            actionType === 'Approve'
                                  ? currentUser?.name || 'TechNova Solutions'
                                : r.newSponsor,
                    };
                }
                return r;
            });
            setSponsorshipList(updated);
            localStorage.setItem(
                'sponsorship_requests',
                JSON.stringify(updated)
            );
        } else {
            const updated = recruitmentList.map((r) =>
                r.id === selectedRequest.id ? { ...r, status: newStatus } : r
            );
            setRecruitmentList(updated);
            localStorage.setItem(
                'recruitment_requests',
                JSON.stringify(updated)
            );
        }

        handleClose();
    };

    const ActionButtons = ({
        row,
        type,
    }: {
        row: any;
        type: 'sponsorship' | 'recruitment';
    }) => (
        <Box display="flex" gap={1} justifyContent="center">
            <Button
                size="small"
                color="success"
                variant="outlined"
                startIcon={<CheckCircle size={14} />}
                disabled={
                    row.status === 'Approved' || row.status === 'Rejected'
                }
                onClick={() => handleAction('Approve', row, type)}
                sx={{
                    py: 0.75,
                    px: 1.5,
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    '&:hover': {
                        backgroundColor: '#DDFBE6',
                        borderColor: '#1A7F37',
                    },
                }}
            >
                Approve
            </Button>
            <Button
                size="small"
                color="error"
                variant="outlined"
                startIcon={<XCircle size={14} />}
                disabled={
                    row.status === 'Approved' || row.status === 'Rejected'
                }
                onClick={() => handleAction('Reject', row, type)}
                sx={{
                    py: 0.75,
                    px: 1.5,
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    '&:hover': {
                        backgroundColor: '#FEE4E2',
                        borderColor: '#D92D20',
                    },
                }}
            >
                Reject
            </Button>
        </Box>
    );

    const recruitmentColumns: MRT_ColumnDef<any>[] = [
        { accessorKey: 'jobTitle', header: 'Job Title', size: 150 },
        { accessorKey: 'workersNeeded', header: 'Workers Needed', size: 120 },
        { accessorKey: 'requestDate', header: 'Date', size: 120 },
        {
            accessorKey: 'status',
            header: 'Status',
            size: 120,
            Cell: ({ cell }) => <StatusBadge status={cell.getValue<string>()} />,
        },
        {
            id: 'actions',
            header: 'Actions',
            size: 260,
            muiTableHeadCellProps: { align: 'center' },
            muiTableBodyCellProps: { align: 'center' },
            Cell: ({ row }) => (
                <ActionButtons row={row.original} type="recruitment" />
            ),
        },
    ];

    const sponsorshipColumns: MRT_ColumnDef<any>[] = [
        {
            accessorKey: 'workerName',
            header: 'Worker Name',
            size: 140,
            Cell: ({ cell }) => cell.getValue<string>() || 'Ahmed Hassan',
        },
        { accessorKey: 'currentSponsor', header: 'Current Sponsor', size: 140 },
        {
            accessorKey: 'desiredJobTitle',
            header: 'Job Title',
            size: 140,
            Cell: ({ cell, row }) => cell.getValue<string>() || row.original.jobTitle || 'General',
        },
        {
            accessorKey: 'preferredLocation',
            header: 'Preferred Location',
            size: 150,
            Cell: ({ cell }) => cell.getValue<string>() || 'Riyadh',
        },
        {
            accessorKey: 'expectedSalary',
            header: 'Expected Salary',
            size: 140,
            Cell: ({ cell }) => cell.getValue<string>() || 'Not Specified',
        },
        {
            accessorKey: 'availabilityDate',
            header: 'Availability',
            size: 120,
            Cell: ({ cell }) => cell.getValue<string>() || 'Immediate',
        },
        {
            accessorKey: 'status',
            header: 'Status',
            size: 120,
            Cell: ({ cell }) => <StatusBadge status={cell.getValue<string>()} />,
        },
        {
            id: 'actions',
            header: 'Actions',
            size: 260,
            muiTableHeadCellProps: { align: 'center' },
            muiTableBodyCellProps: { align: 'center' },
            Cell: ({ row }) => (
                <ActionButtons row={row.original} type="sponsorship" />
            ),
        },
    ];

    return (
        <DashboardLayout navItems={sponsorNavItems}>
            <Box mb={3}>
                <Typography variant="h4" fontWeight="bold">
                    Approvals Hub
                </Typography>
                <Typography color="text.secondary">
                    Review and approve agency recruitment submissions and
                    incoming transfer requests.
                </Typography>
            </Box>

            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                <Tabs value={tabIndex} onChange={(_, nv) => setTabIndex(nv)}>
                    <Tab label="Recruitment Submissions" />
                    <Tab label="Transfer Requests" />
                </Tabs>
            </Box>

            {tabIndex === 0 && (
                <AppDataTable
                    columns={recruitmentColumns}
                    data={recruitmentList}
                />
            )}

            {tabIndex === 1 && (
                <AppDataTable
                    columns={sponsorshipColumns}
                    data={sponsorshipList}
                />
            )}

            <Dialog open={openDialog} onClose={handleClose}>
                <DialogTitle>{actionType} Request</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to {actionType?.toLowerCase()}{' '}
                        this request? This action cannot be undone.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                        onClick={handleConfirm}
                        variant="contained"
                        color={actionType === 'Approve' ? 'success' : 'error'}
                    >
                        Confirm {actionType}
                    </Button>
                </DialogActions>
            </Dialog>
        </DashboardLayout>
    );
}
