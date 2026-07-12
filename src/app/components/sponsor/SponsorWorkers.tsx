import {
    Alert,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Snackbar,
    Tab,
    Tabs,
    TextField,
    Typography,
} from '@mui/material';
import { Send, Star, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { jobOffers, workers } from '../../data/mockData';
import { DashboardLayout } from '../shared/DashboardLayout';
import { AppDataTable } from '../ui/data-display/AppDataTable';
import { MRT_ColumnDef } from 'material-react-table';
import { StatusBadge } from '../shared/StatusBadge';
import { sponsorNavItems } from './SponsorDashboard';

import { useMockTranslation } from '../../utils/translateHelpers';

export default function SponsorWorkers() {
    const { t } = useTranslation();
    const { tName, tJobTitle, tNationality } = useMockTranslation();
    const [tabValue, setTabValue] = useState(0);
    const [open, setOpen] = useState(false);
    const [selectedWorker, setSelectedWorker] = useState<any | null>(null);
    const [successOpen, setSuccessOpen] = useState(false);

    // Offer form state
    const [offerJobTitle, setOfferJobTitle] = useState('');
    const [offerSalary, setOfferSalary] = useState('');
    const [offerLocation, setOfferLocation] = useState('');
    const [offerMessage, setOfferMessage] = useState('');

    // Search and filters
    const [nationalityFilter, setNationalityFilter] = useState('');
    const [expFilter, setExpFilter] = useState('');
    const [filteredRows, setFilteredRows] = useState<any[]>([]);

    const [mockWorkers] = useState(workers);
    const [mockJobOffers] = useState(jobOffers);

    useEffect(() => {
        try {
            console.log('mockWorkers:', mockWorkers);
            let list = [];
            if (tabValue === 1) {
                // Recommended matches tab: show slice(0, 2)
                list = mockWorkers.slice(0, 2);
            } else {
                // All available workers tab
                list = mockWorkers;
            }

            // Apply nationality filter
            if (nationalityFilter) {
                list = list.filter((w: any) =>
                    w.nationality
                        .toLowerCase()
                        .includes(nationalityFilter.toLowerCase())
                );
            }

            // Apply experience filter
            if (expFilter) {
                list = list.filter((w: any) => {
                    const numericExp = parseInt(w.yearsOfExperience, 10);
                    if (expFilter === 'no-experience') {
                        return numericExp === 0 || !w.yearsOfExperience;
                    } else if (expFilter === '1-3') {
                        return numericExp >= 1 && numericExp <= 3;
                    } else if (expFilter === '3plus') {
                        return numericExp > 3;
                    }
                    return true;
                });
            }

            setFilteredRows(list);
        } catch (err) {
            console.error('CRASH IN USEEFFECT:', err);
        }
    }, [tabValue, nationalityFilter, expFilter, mockWorkers]);

    const handleOpenOffer = (worker: any) => {
        setSelectedWorker(worker);
        setOfferJobTitle(worker.jobTitle || '');
        setOfferSalary('');
        setOfferLocation('');
        setOfferMessage('');
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedWorker(null);
    };

    const handleSendOffer = () => {
        if (!selectedWorker) return;

        const saved = localStorage.getItem('sponsor_job_offers');
        const offerList = saved ? JSON.parse(saved) : [...mockJobOffers];

        const newOffer = {
            id: 'jo_' + Date.now(),
            workerName: selectedWorker.name,
            jobTitle:
                offerJobTitle || selectedWorker.jobTitle || 'General Worker',
            offerDate: new Date().toISOString().split('T')[0],
            status: 'Pending',
            salary: offerSalary,
            location: offerLocation,
            message: offerMessage,
        };

        offerList.unshift(newOffer);
        localStorage.setItem('sponsor_job_offers', JSON.stringify(offerList));

        setSuccessOpen(true);
        setOpen(false);
    };

    const columns: MRT_ColumnDef<any>[] = [
        { 
            accessorKey: 'name', 
            header: t('sponsor.workers.columns.name'), 
            size: 150,
            Cell: ({ cell }) => tName(cell.getValue() as string)
        },
        { 
            accessorKey: 'jobTitle', 
            header: t('sponsor.workers.columns.jobTitle'), 
            size: 150,
            Cell: ({ cell }) => tJobTitle(cell.getValue() as string)
        },
        { 
            accessorKey: 'nationality', 
            header: t('sponsor.workers.columns.nationality'), 
            size: 120,
            Cell: ({ cell }) => tNationality(cell.getValue() as string)
        },
        { accessorKey: 'yearsOfExperience', header: t('sponsor.workers.columns.experience'), size: 100 },
        {
            accessorKey: 'verificationStatus',
            header: t('sponsor.workers.columns.status'),
            size: 120,
            Cell: ({ cell }) => <StatusBadge status={cell.getValue<string>()} />,
        },
        {
            id: 'actions',
            header: t('sponsor.workers.columns.actions'),
            size: 120,
            muiTableHeadCellProps: { align: 'center' },
            muiTableBodyCellProps: { align: 'center' },
            Cell: ({ row }) => (
                <Button
                    size="small"
                    variant="contained"
                    startIcon={<Send size={14} />}
                    onClick={() => handleOpenOffer(row.original)}
                >
                    {t('sponsor.workers.actions.sendOffer')}
                </Button>
            ),
        },
    ];

    return (
        <DashboardLayout navItems={sponsorNavItems}>
            {/* Page Header */}
            <Box
                mb={3.5}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
            >
                <Box>
                    <Typography variant="h4" fontWeight="bold">
                        {t('sponsor.workers.title')}
                    </Typography>
                    <Typography color="text.secondary" variant="body2">
                        {t('sponsor.workers.subtitle')}
                    </Typography>
                </Box>
            </Box>

            {/* Tabs Selection */}
            <Paper sx={{ mb: 3.5 }}>
                <Tabs
                    value={tabValue}
                    onChange={(_, v) => setTabValue(v)}
                    sx={{
                        borderBottom: '1px solid #D2DAE5',
                        px: 2,
                    }}
                >
                    <Tab
                        label={
                            <Box display="flex" alignItems="center" gap={1}>
                                <Users size={16} /> {t('sponsor.workers.tabs.allWorkers')}
                            </Box>
                        }
                    />
                    <Tab
                        label={
                            <Box display="flex" alignItems="center" gap={1}>
                                <Star size={16} /> {t('sponsor.workers.tabs.recommended')}
                            </Box>
                        }
                    />
                </Tabs>

                {/* Filters bar */}
                <Box
                    sx={{
                        p: 2.5,
                        display: 'flex',
                        gap: 2,
                        flexWrap: 'wrap',
                        backgroundColor: '#F8FAFC',
                    }}
                >
                    <TextField
                        size="small"
                        label={t('sponsor.workers.filters.nationality')}
                        variant="outlined"
                        value={nationalityFilter}
                        onChange={(e) => setNationalityFilter(e.target.value)}
                        sx={{ minWidth: 200 }}
                    />

                    <FormControl size="small" sx={{ minWidth: 200 }}>
                        <InputLabel id="exp-filter-label">
                            {t('sponsor.workers.filters.experience')}
                        </InputLabel>
                        <Select
                            labelId="exp-filter-label"
                            value={expFilter}
                            label={t('sponsor.workers.filters.experience')}
                            onChange={(e) => setExpFilter(e.target.value)}
                        >
                            <MenuItem value="">{t('sponsor.workers.filters.experienceOptions.all')}</MenuItem>
                            <MenuItem value="no-experience">
                                {t('sponsor.workers.filters.experienceOptions.none')}
                            </MenuItem>
                            <MenuItem value="1-3">{t('sponsor.workers.filters.experienceOptions.oneToThree')}</MenuItem>
                            <MenuItem value="3plus">{t('sponsor.workers.filters.experienceOptions.threePlus')}</MenuItem>
                        </Select>
                    </FormControl>

                    {(nationalityFilter || expFilter) && (
                        <Button
                            variant="text"
                            color="secondary"
                            onClick={() => {
                                setNationalityFilter('');
                                setExpFilter('');
                            }}
                            sx={{ fontSize: '0.875rem' }}
                        >
                            {t('sponsor.workers.filters.clear')}
                        </Button>
                    )}
                </Box>
            </Paper>

            {/* Workers list DataTable */}
            <AppDataTable
                columns={columns}
                data={filteredRows}
            />

            {/* Send Offer Dialog */}
            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ fontWeight: 'bold' }}>
                    {t('sponsor.workers.dialog.title', { name: selectedWorker?.name ? tName(selectedWorker.name) : '' })}
                </DialogTitle>
                <DialogContent dividers>
                    <Grid container spacing={2.5} sx={{ mt: 0.5 }}>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                label={t('sponsor.workers.dialog.jobTitle')}
                                value={offerJobTitle}
                                onChange={(e) =>
                                    setOfferJobTitle(e.target.value)
                                }
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label={t('sponsor.workers.dialog.salaryOffer')}
                                placeholder={t('sponsor.workers.dialog.salaryOfferPlaceholder')}
                                value={offerSalary}
                                onChange={(e) => setOfferSalary(e.target.value)}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label={t('sponsor.workers.dialog.location')}
                                placeholder={t('sponsor.workers.dialog.locationPlaceholder')}
                                value={offerLocation}
                                onChange={(e) =>
                                    setOfferLocation(e.target.value)
                                }
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                label={t('sponsor.workers.dialog.message')}
                                multiline
                                rows={4}
                                placeholder={t('sponsor.workers.dialog.messagePlaceholder')}
                                value={offerMessage}
                                onChange={(e) =>
                                    setOfferMessage(e.target.value)
                                }
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions sx={{ p: 2.5 }}>
                    <Button
                        onClick={handleClose}
                        variant="outlined"
                        sx={{ color: '#5E7089', borderColor: '#D2DAE5' }}
                    >
                        {t('sponsor.workers.dialog.cancel')}
                    </Button>
                    <Button variant="contained" onClick={handleSendOffer}>
                        {t('sponsor.workers.dialog.sendOffer')}
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={successOpen}
                autoHideDuration={2000}
                onClose={() => setSuccessOpen(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    severity="success"
                    sx={{ width: '100%', borderRadius: '8px' }}
                >
                    {t('sponsor.workers.successMessage')}
                </Alert>
            </Snackbar>
        </DashboardLayout>
    );
}
