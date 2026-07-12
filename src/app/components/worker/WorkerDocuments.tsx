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
import { useTranslation } from 'react-i18next';

type Doc = { id: string; name: string; uploadDate: string; status: string };

const DOCUMENT_TYPES = ['Passport Copy', 'National ID', 'Resume / CV'];

export default function WorkerDocuments() {
    const { t } = useTranslation();
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

    const getDocTypeTranslation = (type: string) => {
        if (type === 'Passport Copy') return t('worker.docType.passport');
        if (type === 'National ID') return t('worker.docType.nationalId');
        if (type === 'Resume / CV') return t('worker.docType.resume');
        return type;
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) setFileName(e.target.files[0].name);
    };

    const handleUpload = () => {
        if (!docType) return;
        const today = new Date().toISOString().split('T')[0];
        const existing = docs.findIndex((d) => d.name === docType);
        const translatedType = getDocTypeTranslation(docType);
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
                message: t('worker.docReplacedMsg', { docType: translatedType }),
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
                message: t('worker.docUploadedMsg', { docType: translatedType }),
                severity: 'success',
            });
        }
        setUploadOpen(false);
        setDocType('');
        setFileName('');
    };

    const columns: MRT_ColumnDef<Doc>[] = [
        {
            accessorKey: 'name',
            header: t('worker.documentName'),
            size: 200,
            Cell: ({ cell }) => getDocTypeTranslation(cell.getValue() as string),
        },
        { accessorKey: 'uploadDate', header: t('worker.uploadDate'), size: 130 },
        {
            accessorKey: 'status',
            header: t('worker.status'),
            size: 140,
            Cell: ({ cell }) => <StatusBadge status={cell.getValue() as string} />,
        },
        {
            id: 'actions',
            header: t('worker.actions'),
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
                        {t('worker.view')}
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
                        {t('worker.replace')}
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
                        {t('worker.myDocumentsTitle')}
                    </Typography>
                    <Typography color="text.secondary">
                        {t('worker.myDocumentsSubtitle')}
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<UploadCloud size={18} />}
                    onClick={() => setUploadOpen(true)}
                >
                    {t('worker.uploadDocumentButton')}
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
                <DialogTitle>{t('worker.uploadDocumentTitle')}</DialogTitle>
                <DialogContent dividers>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={12}>
                            <FormControl fullWidth required>
                                <InputLabel>{t('worker.documentTypeLabel')}</InputLabel>
                                <Select
                                    value={docType}
                                    label={t('worker.documentTypeLabel')}
                                    onChange={(e) => setDocType(e.target.value)}
                                >
                                    {DOCUMENT_TYPES.map((tName) => (
                                        <MenuItem key={tName} value={tName}>
                                            {getDocTypeTranslation(tName)}
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
                                    ? t('worker.selectedFile', { fileName })
                                    : t('worker.chooseFile')}
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
                    <Button onClick={() => setUploadOpen(false)}>{t('worker.cancel')}</Button>
                    <Button
                        variant="contained"
                        onClick={handleUpload}
                        disabled={!docType}
                    >
                        {t('worker.upload')}
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
