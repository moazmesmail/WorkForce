import { Typography, Box, Button } from '@mui/material';
import { DashboardLayout } from '../shared/DashboardLayout';
import { agencyNavItems } from './AgencyDashboard';
import { DataTable, Column } from '../shared/DataTable';
import { StatusBadge } from '../shared/StatusBadge';
import { documents } from '../../data/mockData';
import { CheckCircle, XCircle, Eye } from 'lucide-react';

export default function AgencyVerifyDocuments() {
  const columns: Column<typeof documents[0]>[] = [
    { id: 'name', label: 'Document', minWidth: 150 },
    { id: 'uploadDate', label: 'Upload Date', minWidth: 120 },
    { 
      id: 'status', 
      label: 'Status', 
      minWidth: 120,
      format: (value: string) => <StatusBadge status={value} />
    },
    {
      id: 'actions',
      label: 'Actions',
      minWidth: 200,
      align: 'center',
      format: (value, row) => (
        <Box display="flex" gap={1} justifyContent="center">
          <Button size="small" variant="outlined" sx={{ minWidth: 'auto', p: 1 }}>
            <Eye size={16} />
          </Button>
          <Button 
            size="small" 
            color="success" 
            variant="contained" 
            disabled={row.status === 'Verified'}
            sx={{ minWidth: 'auto', p: 1 }}
          >
            <CheckCircle size={16} />
          </Button>
          <Button 
            size="small" 
            color="error" 
            variant="contained" 
            disabled={row.status === 'Verified' || row.status === 'Rejected'}
            sx={{ minWidth: 'auto', p: 1 }}
          >
            <XCircle size={16} />
          </Button>
        </Box>
      )
    }
  ];

  return (
    <DashboardLayout navItems={agencyNavItems}>
      <Box mb={3}>
        <Typography variant="h4" fontWeight="bold">Verify Documents</Typography>
        <Typography color="text.secondary">Review and approve worker uploaded documents.</Typography>
      </Box>

      <DataTable 
        columns={columns} 
        rows={documents} 
        searchableKey="name" 
        searchPlaceholder="Search documents..." 
      />
    </DashboardLayout>
  );
}
