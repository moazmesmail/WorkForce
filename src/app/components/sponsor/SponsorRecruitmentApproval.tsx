import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
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

import { useMockTranslation } from '../../utils/translateHelpers';

export default function SponsorRecruitmentApproval() {
    const { currentUser } = useAuth();
    const { t } = useTranslation();
    const { tName, tJobTitle, tCity } = useMockTranslation();
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
                {t('sponsor.approvals.actions.approve')}
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
                {t('sponsor.approvals.actions.reject')}
            </Button>
        </Box>
    );

    const recruitmentColumns: MRT_ColumnDef<any>[] = [
        { 
            accessorKey: 'jobTitle', 
            header: t('sponsor.approvals.columns.jobTitle'), 
            size: 150,
            Cell: ({ cell }) => tJobTitle(cell.getValue() as string)
        },
        { accessorKey: 'workersNeeded', header: t('sponsor.approvals.columns.workersNeeded'), size: 120 },
        { accessorKey: 'requestDate', header: t('sponsor.approvals.columns.date'), size: 120 },
        {
            accessorKey: 'status',
            header: t('sponsor.approvals.columns.status'),
            size: 120,
            Cell: ({ cell }) => <StatusBadge status={cell.getValue<string>()} />,
        },
        {
            id: 'actions',
            header: t('sponsor.approvals.columns.actions'),
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
            header: t('sponsor.approvals.columns.workerName'),
            size: 140,
            Cell: ({ cell }) => tName(cell.getValue<string>() || 'Ahmed Hassan'),
        },
        { 
            accessorKey: 'currentSponsor', 
            header: t('sponsor.approvals.columns.currentSponsor'), 
            size: 140,
            Cell: ({ cell }) => tName(cell.getValue<string>() || 'Al-Faris Trading Co.')
        },
        {
            accessorKey: 'desiredJobTitle',
            header: t('sponsor.approvals.columns.jobTitle'),
            size: 140,
            Cell: ({ cell, row }) => tJobTitle(cell.getValue<string>() || row.original.jobTitle || 'General'),
        },
        {
            accessorKey: 'preferredLocation',
            header: t('sponsor.approvals.columns.preferredLocation'),
            size: 150,
            Cell: ({ cell }) => tCity(cell.getValue<string>() || 'Riyadh'),
        },
        {
            accessorKey: 'expectedSalary',
            header: t('sponsor.approvals.columns.expectedSalary'),
            size: 140,
            Cell: ({ cell }) => cell.getValue<string>() || t('sponsor.approvals.values.notSpecified'),
        },
        {
            accessorKey: 'availabilityDate',
            header: t('sponsor.approvals.columns.availability'),
            size: 120,
            Cell: ({ cell }) => cell.getValue<string>() || t('sponsor.approvals.values.immediate'),
        },
        {
            accessorKey: 'status',
            header: t('sponsor.approvals.columns.status'),
            size: 120,
            Cell: ({ cell }) => <StatusBadge status={cell.getValue<string>()} />,
        },
        {
            id: 'actions',
            header: t('sponsor.approvals.columns.actions'),
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
            {/* Page Header */}
            <Box mb={3}>
                <Typography variant="h4" fontWeight="bold">
                    {t('sponsor.approvals.title')}
                </Typography>
                <Typography color="text.secondary">
                    {t('sponsor.approvals.subtitle')}
                </Typography>
            </Box>

            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                <Tabs value={tabIndex} onChange={(_, nv) => setTabIndex(nv)}>
                    <Tab label={t('sponsor.approvals.tabs.recruitment')} />
                    <Tab label={t('sponsor.approvals.tabs.transfer')} />
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
                <DialogTitle>
                    {actionType === 'Approve' 
                        ? t('sponsor.approvals.dialog.title_approve') 
                        : t('sponsor.approvals.dialog.title_reject')}
                </DialogTitle>
                <DialogContent>
                    <Typography>
                        {actionType === 'Approve'
                            ? t('sponsor.approvals.dialog.confirmText_approve')
                            : t('sponsor.approvals.dialog.confirmText_reject')}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>{t('sponsor.approvals.dialog.cancel')}</Button>
                    <Button
                        onClick={handleConfirm}
                        variant="contained"
                        color={actionType === 'Approve' ? 'success' : 'error'}
                    >
                        {actionType === 'Approve'
                            ? t('sponsor.approvals.dialog.confirmButton_approve')
                            : t('sponsor.approvals.dialog.confirmButton_reject')}
                    </Button>
                </DialogActions>
            </Dialog>
        </DashboardLayout>
    );
}
