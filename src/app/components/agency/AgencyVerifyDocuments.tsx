import { useState } from 'react';
import { Typography, Box, Button, Snackbar, Alert } from '@mui/material';
import { DashboardLayout } from '../shared/DashboardLayout';
import { agencyNavItems } from './AgencyDashboard';
import { AppDataTable } from '../ui/data-display/AppDataTable';
import { MRT_ColumnDef } from 'material-react-table';
import { StatusBadge } from '../shared/StatusBadge';
import { documents as initialDocs } from '../../data/mockData';
import { CheckCircle, XCircle, Eye } from 'lucide-react';

type Doc = (typeof initialDocs)[0];

export default function AgencyVerifyDocuments() {
    const [docs, setDocs] = useState(initialDocs);
    const [snackbar, setSnackbar] = useState<{
        open: boolean;
        message: string;
        severity: 'success' | 'error';
    }>({
        open: false,
        message: '',
        severity: 'success',
    });

    const handleVerify = (doc: Doc) => {
        setDocs((prev) =>
            prev.map((d) =>
                d.id === doc.id ? { ...d, status: 'Verified' } : d
            )
        );
        setSnackbar({
            open: true,
            message: `${doc.name} for ${doc.workerName} verified.`,
            severity: 'success',
        });
    };

    const handleReject = (doc: Doc) => {
        setDocs((prev) =>
            prev.map((d) =>
                d.id === doc.id ? { ...d, status: 'Rejected' } : d
            )
        );
        setSnackbar({
            open: true,
            message: `${doc.name} for ${doc.workerName} rejected.`,
            severity: 'error',
        });
    };

    const columns: MRT_ColumnDef<Doc>[] = [
        { accessorKey: 'workerName', header: 'Worker Name', size: 160 },
        { accessorKey: 'name', header: 'Document', size: 150 },
        { accessorKey: 'uploadDate', header: 'Upload Date', size: 120 },
        {
            accessorKey: 'status',
            header: 'Status',
            size: 140,
            Cell: ({ cell }) => <StatusBadge status={cell.getValue() as string} />,
        },
        {
            id: 'actions',
            header: 'Actions',
            size: 280,
            muiTableHeadCellProps: { align: 'center' },
            muiTableBodyCellProps: { align: 'center' },
            Cell: ({ row }) => (
                <Box display="flex" gap={1} justifyContent="center">
                    <Button
                        size="small"
                        variant="outlined"
                        startIcon={<Eye size={14} />}
                    >
                        View
                    </Button>
                    <Button
                        size="small"
                        color="success"
                        variant="outlined"
                        startIcon={<CheckCircle size={14} />}
                        disabled={row.original.status === 'Verified'}
                        onClick={() => handleVerify(row.original)}
                    >
                        Verify
                    </Button>
                    <Button
                        size="small"
                        color="error"
                        variant="outlined"
                        startIcon={<XCircle size={14} />}
                        disabled={
                            row.original.status === 'Verified' ||
                            row.original.status === 'Rejected'
                        }
                        onClick={() => handleReject(row.original)}
                    >
                        Reject
                    </Button>
                </Box>
            ),
        },
    ];

    return (
        <DashboardLayout navItems={agencyNavItems}>
            <Box mb={3}>
                <Typography variant="h4" fontWeight="bold">
                    Verify Documents
                </Typography>
                <Typography color="text.secondary">
                    Review and approve worker uploaded documents.
                </Typography>
            </Box>

            <AppDataTable
                columns={columns}
                data={docs}
            />

            <Snackbar
                open={snackbar.open}
                autoHideDuration={3500}
                onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert
                    severity={snackbar.severity}
                    onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </DashboardLayout>
    );
}
