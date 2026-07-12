import { useState } from 'react';
import { Typography, Box, Button, Snackbar, Alert } from '@mui/material';
import { DashboardLayout } from '../shared/DashboardLayout';
import { agencyNavItems } from './AgencyDashboard';
import { DataTable, Column } from '../shared/DataTable';
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

    const columns: Column<Doc>[] = [
        { id: 'workerName', label: 'Worker Name', minWidth: 160 },
        { id: 'name', label: 'Document', minWidth: 150 },
        { id: 'uploadDate', label: 'Upload Date', minWidth: 120 },
        {
            id: 'status',
            label: 'Status',
            minWidth: 140,
            format: (value: string) => <StatusBadge status={value} />,
        },
        {
            id: 'actions',
            label: 'Actions',
            minWidth: 280,
            align: 'center',
            format: (_v, row) => (
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
                        disabled={row.status === 'Verified'}
                        onClick={() => handleVerify(row)}
                    >
                        Verify
                    </Button>
                    <Button
                        size="small"
                        color="error"
                        variant="outlined"
                        startIcon={<XCircle size={14} />}
                        disabled={
                            row.status === 'Verified' ||
                            row.status === 'Rejected'
                        }
                        onClick={() => handleReject(row)}
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

            <DataTable
                columns={columns}
                rows={docs}
                searchableKey="workerName"
                searchPlaceholder="Search by worker name..."
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
