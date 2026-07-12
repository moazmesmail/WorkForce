import { useState } from 'react';
import { Typography, Box, Tabs, Tab, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { DashboardLayout } from '../shared/DashboardLayout';
import { sponsorNavItems } from './SponsorDashboard';
import { DataTable, Column } from '../shared/DataTable';
import { StatusBadge } from '../shared/StatusBadge';
import { recruitmentRequests, sponsorshipRequests } from '../../data/mockData';
import { CheckCircle, XCircle } from 'lucide-react';

export default function SponsorRecruitmentApproval() {
  const [tabIndex, setTabIndex] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [actionType, setActionType] = useState<'Approve' | 'Reject' | null>(null);

  const handleAction = (type: 'Approve' | 'Reject') => {
    setActionType(type);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
    setActionType(null);
  };

  const ActionButtons = () => (
    <Box display="flex" gap={1} justifyContent="center">
      <Button size="small" color="success" variant="contained" onClick={() => handleAction('Approve')} sx={{ minWidth: 'auto', p: 1 }}>
        <CheckCircle size={16} />
      </Button>
      <Button size="small" color="error" variant="contained" onClick={() => handleAction('Reject')} sx={{ minWidth: 'auto', p: 1 }}>
        <XCircle size={16} />
      </Button>
    </Box>
  );

  const recruitmentColumns: Column<typeof recruitmentRequests[0]>[] = [
    { id: 'jobTitle', label: 'Job Title', minWidth: 150 },
    { id: 'workersNeeded', label: 'Workers Needed', minWidth: 120 },
    { id: 'requestDate', label: 'Date', minWidth: 120 },
    { id: 'status', label: 'Status', minWidth: 120, format: (v: string) => <StatusBadge status={v} /> },
    { id: 'actions', label: 'Actions', minWidth: 100, align: 'center', format: () => <ActionButtons /> }
  ];

  const sponsorshipColumns: Column<typeof sponsorshipRequests[0]>[] = [
    { id: 'newSponsor', label: 'Requesting Sponsor', minWidth: 150 },
    { id: 'requestDate', label: 'Date', minWidth: 120 },
    { id: 'status', label: 'Status', minWidth: 120, format: (v: string) => <StatusBadge status={v} /> },
    { id: 'actions', label: 'Actions', minWidth: 100, align: 'center', format: () => <ActionButtons /> }
  ];

  return (
    <DashboardLayout navItems={sponsorNavItems}>
      <Box mb={3}>
        <Typography variant="h4" fontWeight="bold">Approvals Hub</Typography>
        <Typography color="text.secondary">Review and approve agency recruitment submissions and incoming transfer requests.</Typography>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabIndex} onChange={(_, nv) => setTabIndex(nv)}>
          <Tab label="Recruitment Submissions" />
          <Tab label="Transfer Requests" />
        </Tabs>
      </Box>

      {tabIndex === 0 && (
        <DataTable columns={recruitmentColumns} rows={recruitmentRequests} searchableKey="jobTitle" searchPlaceholder="Search job titles..." />
      )}

      {tabIndex === 1 && (
        <DataTable columns={sponsorshipColumns} rows={sponsorshipRequests} searchableKey="newSponsor" searchPlaceholder="Search sponsors..." />
      )}

      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>{actionType} Request</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to {actionType?.toLowerCase()} this request? This action cannot be undone.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose} variant="contained" color={actionType === 'Approve' ? 'success' : 'error'}>
            Confirm {actionType}
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
}
