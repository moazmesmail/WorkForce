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
import { jobOffers, workers } from '../../data/mockData';
import { DashboardLayout } from '../shared/DashboardLayout';
import { Column, DataTable } from '../shared/DataTable';
import { StatusBadge } from '../shared/StatusBadge';
import { sponsorNavItems } from './SponsorDashboard';

export default function SponsorWorkers() {
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

    const [mockWorkers, setMockWorkers] = useState(workers);

    const [mockJobOffers, setMockJobOffers] = useState(jobOffers);
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
                    const numericExp = parseInt(w.experience, 10);
                    if (expFilter === 'no-experience') {
                        return numericExp === 0 || !w.experience;
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
    }, [tabValue, nationalityFilter, expFilter]);

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

    const columns: Column<any>[] = [
        { id: 'name', label: 'Worker Name', minWidth: 150 },
        { id: 'jobTitle', label: 'Job Title', minWidth: 150 },
        { id: 'nationality', label: 'Nationality', minWidth: 120 },
        { id: 'experience', label: 'Experience (Yrs)', minWidth: 100 },
        {
            id: 'verificationStatus',
            label: 'Status',
            minWidth: 120,
            format: (value: string) => <StatusBadge status={value} />,
        },
        {
            id: 'actions',
            label: 'Actions',
            minWidth: 120,
            align: 'center',
            format: (value, row) => (
                <Button
                    size="small"
                    variant="contained"
                    startIcon={<Send size={14} />}
                    onClick={() => handleOpenOffer(row)}
                >
                    Send Offer
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
                        Workers Directory
                    </Typography>
                    <Typography color="text.secondary" variant="body2">
                        Search, filter, and recruit available talent or explore
                        curated recommended matches.
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
                                <Users size={16} /> All Available Workers
                            </Box>
                        }
                    />
                    <Tab
                        label={
                            <Box display="flex" alignItems="center" gap={1}>
                                <Star size={16} /> Recommended Matches
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
                        label="Filter by Nationality"
                        variant="outlined"
                        value={nationalityFilter}
                        onChange={(e) => setNationalityFilter(e.target.value)}
                        sx={{ minWidth: 200 }}
                    />

                    <FormControl size="small" sx={{ minWidth: 200 }}>
                        <InputLabel id="exp-filter-label">
                            Filter by Experience
                        </InputLabel>
                        <Select
                            labelId="exp-filter-label"
                            value={expFilter}
                            label="Filter by Experience"
                            onChange={(e) => setExpFilter(e.target.value)}
                        >
                            <MenuItem value="">All Experience Levels</MenuItem>
                            <MenuItem value="no-experience">
                                No experience
                            </MenuItem>
                            <MenuItem value="1-3">1-3 years</MenuItem>
                            <MenuItem value="3plus">3+ years</MenuItem>
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
                            Clear Filters
                        </Button>
                    )}
                </Box>
            </Paper>

            {/* Workers list DataTable */}
            <DataTable
                columns={columns}
                rows={filteredRows}
                searchableKey="name"
                searchPlaceholder="Search by worker name..."
            />

            {/* Send Offer Dialog */}
            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ fontWeight: 'bold' }}>
                    Send Job Offer to {selectedWorker?.name}
                </DialogTitle>
                <DialogContent dividers>
                    <Grid container spacing={2.5} sx={{ mt: 0.5 }}>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                label="Job Title"
                                value={offerJobTitle}
                                onChange={(e) =>
                                    setOfferJobTitle(e.target.value)
                                }
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="Salary Offer"
                                placeholder="e.g. 5,000 SAR"
                                value={offerSalary}
                                onChange={(e) => setOfferSalary(e.target.value)}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="Location"
                                placeholder="e.g. Riyadh"
                                value={offerLocation}
                                onChange={(e) =>
                                    setOfferLocation(e.target.value)
                                }
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                label="Message to Worker"
                                multiline
                                rows={4}
                                placeholder="Describe responsibilities, expectations, and benefit details..."
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
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={handleSendOffer}>
                        Send Offer
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
                    Recruitment offer sent successfully!
                </Alert>
            </Snackbar>
        </DashboardLayout>
    );
}
