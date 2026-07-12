import { useState, useEffect } from 'react';
import {
    Typography,
    Grid,
    Paper,
    Box,
    TextField,
    Button,
    Tabs,
    Tab,
    Avatar,
    Chip,
} from '@mui/material';
import { DashboardLayout } from '../shared/DashboardLayout';
import { workerNavItems } from './WorkerDashboard';
import {
    Edit3,
    Save,
    User,
    Phone,
    Briefcase,
    CheckCircle,
    FileText,
    UploadCloud,
    Eye,
} from 'lucide-react';
import { AppDataTable } from '../ui/data-display/AppDataTable';
import { MRT_ColumnDef } from 'material-react-table';
import { StatusBadge } from '../shared/StatusBadge';
import { documents } from '../../data/mockData';
import { useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel({ children, value, index }: TabPanelProps) {
    return (
        <Box role="tabpanel" hidden={value !== index}>
            {value === index && children}
        </Box>
    );
}

export default function WorkerProfile() {
    const { t } = useTranslation();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const tabParam = queryParams.get('tab');

    const getInitialTab = () => {
        if (tabParam === 'documents') return 3;
        if (tabParam === 'contact') return 1;
        if (tabParam === 'employment') return 2;
        return 0;
    };

    const [isEditing, setIsEditing] = useState(false);
    const [tabValue, setTabValue] = useState(getInitialTab);

    useEffect(() => {
        if (tabParam === 'documents') {
            setTabValue(3);
        } else if (tabParam === 'contact') {
            setTabValue(1);
        } else if (tabParam === 'employment') {
            setTabValue(2);
        } else {
            setTabValue(0);
        }
    }, [tabParam]);

    const disabledStyle = {
        '& .MuiOutlinedInput-root.Mui-disabled': {
            backgroundColor: '#F5F7FA',
            '& fieldset': { borderColor: '#D2DAE5' },
            '& input': { color: '#111827', WebkitTextFillColor: '#111827' },
        },
    };

    const FieldRow = ({
        label,
        value,
        type = 'text',
    }: {
        label: string;
        value: string;
        type?: string;
    }) => (
        <Grid size={{ xs: 12, sm: 6 }}>
            <Box>
                <Typography
                    sx={{
                        fontSize: '0.8125rem',
                        fontWeight: 600,
                        color: '#5E7089',
                        mb: 0.75,
                    }}
                >
                    {label}
                </Typography>
                <TextField
                    fullWidth
                    type={type}
                    defaultValue={value}
                    disabled={!isEditing}
                    InputLabelProps={
                        type === 'date' ? { shrink: true } : undefined
                    }
                    sx={disabledStyle}
                />
            </Box>
        </Grid>
    );

    const getDocTypeTranslation = (type: string) => {
        if (type === 'Passport Copy') return t('worker.docType.passport');
        if (type === 'National ID') return t('worker.docType.nationalId');
        if (type === 'Resume / CV') return t('worker.docType.resume');
        return type;
    };

    const documentColumns: MRT_ColumnDef<(typeof documents)[0]>[] = [
        {
            accessorKey: 'name',
            header: t('worker.documentName'),
            size: 170,
            Cell: ({ cell }) => getDocTypeTranslation(cell.getValue() as string),
        },
        {
            accessorKey: 'uploadDate',
            header: t('worker.uploadDate'),
            size: 100,
        },
        {
            accessorKey: 'status',
            header: t('worker.status'),
            size: 100,
            Cell: ({ cell }) => (
                <StatusBadge status={cell.getValue() as string} />
            ),
        },
        {
            id: 'actions',
            header: t('worker.actions'),
            size: 100,
            muiTableHeadCellProps: { align: 'center' },
            muiTableBodyCellProps: { align: 'center' },
            Cell: () => (
                <Button
                    size="small"
                    startIcon={<Eye size={16} />}
                >
                    {t('worker.view')}
                </Button>
            ),
        },
    ];

    return (
        <DashboardLayout navItems={workerNavItems}>
            {/* Profile Header */}
            <Paper
                sx={{
                    p: 3,
                    mb: 2.5,
                    backgroundColor: '#ffffff',
                    border: '1px solid #D2DAE5',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2.5,
                        flexWrap: 'wrap',
                    }}
                >
                    <Avatar
                        sx={{
                            width: 64,
                            height: 64,
                            fontSize: '1.5rem',
                            fontWeight: 700,
                            backgroundColor: '#0969DA',
                            color: '#ffffff',
                            flexShrink: 0,
                        }}
                    >
                        A
                    </Avatar>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography
                            sx={{
                                fontWeight: 700,
                                fontSize: '1.25rem',
                                color: '#111827',
                                lineHeight: 1.3,
                            }}
                        >
                            {t('worker.profile.mockName')}
                        </Typography>
                        <Typography
                            sx={{
                                color: '#5E7089',
                                fontSize: '0.875rem',
                                mt: 0.25,
                            }}
                        >
                            {t('jobTitles.softwareEngineer')} · {t('worker.profile.location')}
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                gap: 1,
                                mt: 1,
                                flexWrap: 'wrap',
                            }}
                        >
                            <Chip
                                icon={<CheckCircle size={11} />}
                                label={t('worker.verified')}
                                size="small"
                                sx={{
                                    height: 22,
                                    backgroundColor: '#DDFBE6',
                                    color: '#1A7F37',
                                    fontWeight: 700,
                                    fontSize: '0.6875rem',
                                    border: '1px solid #BBF7D0',
                                    '& .MuiChip-icon': {
                                        color: '#1A7F37',
                                        marginLeft: '6px',
                                    },
                                    '& .MuiChip-label': { paddingLeft: '4px' },
                                }}
                            />
                            <Chip
                                label={t('worker.sponsoredCurrentCorp')}
                                size="small"
                                sx={{
                                    height: 22,
                                    backgroundColor: '#DDF4FF',
                                    color: '#0969DA',
                                    fontWeight: 600,
                                    fontSize: '0.6875rem',
                                    border: '1px solid #BAE6FD',
                                }}
                            />
                        </Box>
                    </Box>
                    <Button
                        variant={isEditing ? 'contained' : 'outlined'}
                        startIcon={
                            isEditing ? <Save size={15} /> : <Edit3 size={15} />
                        }
                        onClick={() => setIsEditing(!isEditing)}
                        sx={
                            isEditing
                                ? {
                                      backgroundColor: '#0969DA',
                                      color: 'white',
                                      '&:hover': { backgroundColor: '#085FC7' },
                                  }
                                : {
                                      borderColor: '#D2DAE5',
                                      color: '#111827',
                                      '&:hover': {
                                          backgroundColor: '#F5F7FA',
                                          borderColor: '#B0BDD0',
                                      },
                                  }
                        }
                    >
                        {isEditing ? t('worker.saveChanges') : t('worker.editProfile')}
                    </Button>
                </Box>
            </Paper>

            {/* Tabbed Form */}
            <Paper sx={{ overflow: 'hidden' }}>
                <Box sx={{ borderBottom: '1px solid #D2DAE5', px: 3 }}>
                    <Tabs value={tabValue} onChange={(_, v) => setTabValue(v)}>
                        {[
                            { label: t('worker.tab.basicInfo'), key: 'Basic Info', Icon: User },
                            { label: t('worker.tab.contact'), key: 'Contact', Icon: Phone },
                            { label: t('worker.tab.employment'), key: 'Employment', Icon: Briefcase },
                            { label: t('worker.tab.documents'), key: 'Documents', Icon: FileText },
                        ].map((tabInfo, i) => (
                            <Tab
                                key={tabInfo.key}
                                label={
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 0.75,
                                        }}
                                    >
                                        <tabInfo.Icon size={14} />
                                        {tabInfo.label}
                                    </Box>
                                }
                                value={i}
                            />
                        ))}
                    </Tabs>
                </Box>

                <Box sx={{ p: 3 }}>
                    <TabPanel value={tabValue} index={0}>
                        <Grid container spacing={2.5}>
                            <FieldRow label={t('worker.fullName')} value={t('worker.profile.mockName')} />
                            <FieldRow label={t('worker.nationality')} value={t('worker.profile.mockNationality')} />
                            <FieldRow
                                label={t('worker.dateOfBirth')}
                                value="1990-01-01"
                                type="date"
                            />
                            <FieldRow label={t('worker.gender')} value={t('worker.profile.mockGender')} />
                            <FieldRow
                                label={t('worker.passportNumber')}
                                value="A12345678"
                            />
                            <FieldRow
                                label={t('worker.visaType')}
                                value={t('worker.profile.mockVisaType')}
                            />
                        </Grid>
                    </TabPanel>

                    <TabPanel value={tabValue} index={1}>
                        <Grid container spacing={2.5}>
                            <FieldRow
                                label={t('worker.emailAddress')}
                                value="ahmed@example.com"
                                type="email"
                            />
                            <FieldRow
                                label={t('worker.phoneNumber')}
                                value="+971 50 123 4567"
                            />
                            <FieldRow
                                label={t('worker.emergencyContact')}
                                value="+20 100 555 7890"
                            />
                            <FieldRow
                                label={t('worker.currentAddress')}
                                value={t('worker.profile.location')}
                            />
                            <FieldRow
                                label={t('worker.homeCountryAddress')}
                                value={t('worker.profile.homeCountryAddress')}
                            />
                        </Grid>
                    </TabPanel>

                    <TabPanel value={tabValue} index={2}>
                        <Grid container spacing={2.5}>
                            <FieldRow
                                label={t('worker.jobTitle')}
                                value={t('jobTitles.softwareEngineer')}
                            />
                            <FieldRow
                                label={t('worker.yearsOfExperience')}
                                value="5"
                                type="number"
                            />
                            <FieldRow
                                label={t('worker.currentSponsor')}
                                value={t('worker.mockCurrentSponsor')}
                            />
                            <FieldRow
                                label={t('worker.monthlySalaryAed')}
                                value="15,000"
                            />
                            <FieldRow
                                label={t('worker.contractStart')}
                                value="2022-03-01"
                                type="date"
                            />
                            <FieldRow
                                label={t('worker.contractEnd')}
                                value="2025-03-01"
                                type="date"
                            />
                            <Grid size={{ xs: 12 }}>
                                <Typography
                                    sx={{
                                        fontSize: '0.8125rem',
                                        fontWeight: 600,
                                        color: '#5E7089',
                                        mb: 0.75,
                                    }}
                                >
                                    {t('worker.skills')}
                                </Typography>
                                <TextField
                                    fullWidth
                                    defaultValue="React, Node.js, TypeScript, PostgreSQL, Docker"
                                    disabled={!isEditing}
                                    sx={disabledStyle}
                                />
                            </Grid>
                        </Grid>
                    </TabPanel>

                    <TabPanel value={tabValue} index={3}>
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            mb={3}
                        >
                            <Typography variant="h6" fontWeight="bold">
                                {t('worker.myDocumentsTitle')}
                            </Typography>
                            <Button
                                variant="contained"
                                startIcon={<UploadCloud size={18} />}
                            >
                                {t('worker.uploadDocumentButton')}
                            </Button>
                        </Box>

                        <AppDataTable
                            columns={documentColumns}
                            data={documents}
                        />
                    </TabPanel>

                    {isEditing && (
                        <Box
                            sx={{
                                mt: 3,
                                pt: 3,
                                borderTop: '1px solid #D2DAE5',
                                display: 'flex',
                                gap: 1.5,
                            }}
                        >
                            <Button
                                variant="contained"
                                startIcon={<Save size={15} />}
                                onClick={() => setIsEditing(false)}
                            >
                                {t('worker.saveChanges')}
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={() => setIsEditing(false)}
                                sx={{
                                    borderColor: '#D2DAE5',
                                    color: '#5E7089',
                                    '&:hover': {
                                        backgroundColor: '#F5F7FA',
                                        borderColor: '#B0BDD0',
                                    },
                                }}
                            >
                                {t('worker.cancel')}
                            </Button>
                        </Box>
                    )}
                </Box>
            </Paper>
        </DashboardLayout>
    );
}
