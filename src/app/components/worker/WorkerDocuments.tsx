import { Typography, Box, Button } from '@mui/material';
import { DashboardLayout } from '../shared/DashboardLayout';
import { workerNavItems } from './WorkerDashboard';
import { DataTable, Column } from '../shared/DataTable';
import { StatusBadge } from '../shared/StatusBadge';
import { documents } from '../../data/mockData';
import { UploadCloud, Eye } from 'lucide-react';

export default function WorkerDocuments() {
  const columns: Column<typeof documents[0]>[] = [
    { id: 'name', label: 'Document Name', minWidth: 170 },
    { id: 'uploadDate', label: 'Upload Date', minWidth: 100 },
    { 
      id: 'status', 
      label: 'Status', 
      minWidth: 100,
      format: (value: string) => <StatusBadge status={value} />
    },
    {
      id: 'actions',
      label: 'Actions',
      minWidth: 100,
      align: 'center',
      format: () => (
        <Button size="small" startIcon={<Eye size={16} />}>View</Button>
      )
    }
  ];

  return (
    <DashboardLayout navItems={workerNavItems}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight="bold">My Documents</Typography>
        <Button variant="contained" startIcon={<UploadCloud size={18} />}>
          Upload Document
        </Button>
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
