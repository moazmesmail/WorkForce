import { useState } from 'react';
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
  Divider,
} from '@mui/material';
import { DashboardLayout } from '../shared/DashboardLayout';
import { workerNavItems } from './WorkerDashboard';
import { Edit3, Save, User, Phone, Briefcase, CheckCircle } from 'lucide-react';

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
  const [isEditing, setIsEditing] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  const disabledStyle = {
    '& .MuiOutlinedInput-root.Mui-disabled': {
      backgroundColor: '#F5F7FA',
      '& fieldset': { borderColor: '#D2DAE5' },
      '& input': { color: '#111827', WebkitTextFillColor: '#111827' },
    },
  };

  const FieldRow = ({ label, value, type = 'text' }: { label: string; value: string; type?: string }) => (
    <Grid item xs={12} sm={6}>
      <Box>
        <Typography sx={{ fontSize: '0.8125rem', fontWeight: 600, color: '#5E7089', mb: 0.75 }}>
          {label}
        </Typography>
        <TextField
          fullWidth
          type={type}
          defaultValue={value}
          disabled={!isEditing}
          InputLabelProps={type === 'date' ? { shrink: true } : undefined}
          sx={disabledStyle}
        />
      </Box>
    </Grid>
  );

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
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5, flexWrap: 'wrap' }}>
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
            <Typography sx={{ fontWeight: 700, fontSize: '1.25rem', color: '#111827', lineHeight: 1.3 }}>
              Ahmed Hassan
            </Typography>
            <Typography sx={{ color: '#5E7089', fontSize: '0.875rem', mt: 0.25 }}>
              Software Engineer · Dubai, UAE
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mt: 1, flexWrap: 'wrap' }}>
              <Chip
                icon={<CheckCircle size={11} />}
                label="Verified"
                size="small"
                sx={{
                  height: 22,
                  backgroundColor: '#DDFBE6',
                  color: '#1A7F37',
                  fontWeight: 700,
                  fontSize: '0.6875rem',
                  border: '1px solid #BBF7D0',
                  '& .MuiChip-icon': { color: '#1A7F37', marginLeft: '6px' },
                  '& .MuiChip-label': { paddingLeft: '4px' },
                }}
              />
              <Chip
                label="Sponsored · Current Corp"
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
            startIcon={isEditing ? <Save size={15} /> : <Edit3 size={15} />}
            onClick={() => setIsEditing(!isEditing)}
            sx={
              isEditing
                ? { backgroundColor: '#0969DA', color: 'white', '&:hover': { backgroundColor: '#085FC7' } }
                : { borderColor: '#D2DAE5', color: '#111827', '&:hover': { backgroundColor: '#F5F7FA', borderColor: '#B0BDD0' } }
            }
          >
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </Button>
        </Box>
      </Paper>

      {/* Tabbed Form */}
      <Paper sx={{ overflow: 'hidden' }}>
        <Box sx={{ borderBottom: '1px solid #D2DAE5', px: 3 }}>
          <Tabs value={tabValue} onChange={(_, v) => setTabValue(v)}>
            {[
              { label: 'Basic Info', Icon: User },
              { label: 'Contact', Icon: Phone },
              { label: 'Employment', Icon: Briefcase },
            ].map((t, i) => (
              <Tab
                key={t.label}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                    <t.Icon size={14} />
                    {t.label}
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
              <FieldRow label="Full Name" value="Ahmed Hassan" />
              <FieldRow label="Nationality" value="Egyptian" />
              <FieldRow label="Date of Birth" value="1990-01-01" type="date" />
              <FieldRow label="Gender" value="Male" />
              <FieldRow label="Passport Number" value="A12345678" />
              <FieldRow label="Visa Type" value="Employment Visa" />
            </Grid>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Grid container spacing={2.5}>
              <FieldRow label="Email Address" value="ahmed@example.com" type="email" />
              <FieldRow label="Phone Number" value="+971 50 123 4567" />
              <FieldRow label="Emergency Contact" value="+20 100 555 7890" />
              <FieldRow label="Current Address" value="Dubai, UAE" />
              <FieldRow label="Home Country Address" value="Cairo, Egypt" />
            </Grid>
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            <Grid container spacing={2.5}>
              <FieldRow label="Job Title" value="Software Engineer" />
              <FieldRow label="Years of Experience" value="5" type="number" />
              <FieldRow label="Current Sponsor" value="Current Corp" />
              <FieldRow label="Monthly Salary (AED)" value="15,000" />
              <FieldRow label="Contract Start" value="2022-03-01" type="date" />
              <FieldRow label="Contract End" value="2025-03-01" type="date" />
              <Grid item xs={12}>
                <Typography sx={{ fontSize: '0.8125rem', fontWeight: 600, color: '#5E7089', mb: 0.75 }}>Skills</Typography>
                <TextField
                  fullWidth
                  defaultValue="React, Node.js, TypeScript, PostgreSQL, Docker"
                  disabled={!isEditing}
                  sx={disabledStyle}
                />
              </Grid>
            </Grid>
          </TabPanel>

          {isEditing && (
            <Box sx={{ mt: 3, pt: 3, borderTop: '1px solid #D2DAE5', display: 'flex', gap: 1.5 }}>
              <Button
                variant="contained"
                startIcon={<Save size={15} />}
                onClick={() => setIsEditing(false)}
              >
                Save Changes
              </Button>
              <Button
                variant="outlined"
                onClick={() => setIsEditing(false)}
                sx={{ borderColor: '#D2DAE5', color: '#5E7089', '&:hover': { backgroundColor: '#F5F7FA', borderColor: '#B0BDD0' } }}
              >
                Cancel
              </Button>
            </Box>
          )}
        </Box>
      </Paper>
    </DashboardLayout>
  );
}
