import { useState } from 'react';
import {
    Typography,
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Grid,
    Snackbar,
    Alert,
} from '@mui/material';
import { UploadCloud, Eye, RefreshCw } from 'lucide-react';
import { DashboardLayout } from '../shared/DashboardLayout';
import { workerNavItems } from './WorkerDashboard';
import { AppDataTable } from '../ui/data-display/AppDataTable';
import { MRT_ColumnDef } from 'material-react-table';
import { StatusBadge } from '../shared/StatusBadge';
import { myDocuments as initialDocs } from '../../data/mockData';

type Doc = { id: string; name: string; uploadDate: string; status: string };

const DOCUMENT_TYPES = ['Passport Copy', 'National ID', 'Resume / CV'];

export default function WorkerDocuments() {
    const [docs, setDocs] = useState<Doc[]>(initialDocs);
    const [uploadOpen, setUploadOpen] = useState(false);
    const [docType, setDocType] = useState('');
    const [fileName, setFileName] = useState('');
    const [snackbar, setSnackbar] = useState<{
        open: boolean;
        message: string;
        severity: 'success' | 'info';
    }>({
        open: false,
        message: '',
        severity: 'success',
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) setFileName(e.target.files[0].name);
    };

    const handleUpload = () => {
        if (!docType) return;
        const today = new Date().toISOString().split('T')[0];
        const existing = docs.findIndex((d) => d.name === docType);
        if (existing >= 0) {
            const updated = [...docs];
            updated[existing] = {
                ...updated[existing],
                uploadDate: today,
                status: 'Pending Verification',
            };
            setDocs(updated);
            setSnackbar({
                open: true,
                message: `${docType} replaced and pending verification.`,
                severity: 'info',
            });
        } else {
            setDocs((prev) => [
                ...prev,
                {
                    id: `md${Date.now()}`,
                    name: docType,
                    uploadDate: today,
                    status: 'Pending Verification',
                },
            ]);
            setSnackbar({
                open: true,
                message: `${docType} uploaded successfully.`,
                severity: 'success',
            });
        }
        setUploadOpen(false);
        setDocType('');
        setFileName('');
    };

    const columns: MRT_ColumnDef<Doc>[] = [
        { accessorKey: 'name', header: 'Document Name', size: 200 },
        { accessorKey: 'uploadDate', header: 'Upload Date', size: 130 },
        {
            accessorKey: 'status',
            header: 'Status',
            size: 140,
            Cell: ({ cell }) => <StatusBadge status={cell.getValue() as string} />,
        },
        {
            id: 'actions',
            header: 'Actions',
            size: 180,
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
                        variant="outlined"
                        color="warning"
                        startIcon={<RefreshCw size={14} />}
                        component="label"
                        onClick={() => {
                            setDocType(row.original.name);
                            setUploadOpen(true);
                        }}
                    >
                        Replace
                    </Button>
                </Box>
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
                        My Documents
                    </Typography>
                    <Typography color="text.secondary">
                        Manage your identity and employment documents.
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<UploadCloud size={18} />}
                    onClick={() => setUploadOpen(true)}
                >
                    Upload Document
                </Button>
            </Box>

            <AppDataTable
                columns={columns}
                data={docs}
            />

            <Dialog
                open={uploadOpen}
                onClose={() => setUploadOpen(false)}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>Upload Document</DialogTitle>
                <DialogContent dividers>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={12}>
                            <FormControl fullWidth required>
                                <InputLabel>Document Type</InputLabel>
                                <Select
                                    value={docType}
                                    label="Document Type"
                                    onChange={(e) => setDocType(e.target.value)}
                                >
                                    {DOCUMENT_TYPES.map((t) => (
                                        <MenuItem key={t} value={t}>
                                            {t}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                variant="outlined"
                                component="label"
                                fullWidth
                                sx={{ py: 2 }}
                            >
                                {fileName
                                    ? `Selected: ${fileName}`
                                    : 'Choose File (PDF, JPG, PNG)'}
                                <input
                                    type="file"
                                    hidden
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    onChange={handleFileChange}
                                />
                            </Button>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={() => setUploadOpen(false)}>Cancel</Button>
                    <Button
                        variant="contained"
                        onClick={handleUpload}
                        disabled={!docType}
                    >
                        Upload
                    </Button>
                </DialogActions>
            </Dialog>

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
