import { Box } from '@mui/material';

interface StatusBadgeProps {
  status: string;
}

type StatusConfig = {
  color: string;
  bg: string;
  dot: string;
};

function getStatusConfig(status: string): StatusConfig {
  const s = status.toLowerCase();

  if (s.includes('verified') || s.includes('approved') || s.includes('accepted') || s.includes('completed')) {
    return { color: '#166534', bg: '#dcfce7', dot: '#16a34a' };
  }
  if (s.includes('active') || s.includes('open') || s.includes('available')) {
    return { color: '#075985', bg: '#e0f2fe', dot: '#0284c7' };
  }
  if (s.includes('pending') || s.includes('reviewing')) {
    return { color: '#92400e', bg: '#fef3c7', dot: '#d97706' };
  }
  if (s.includes('progress') || s.includes('transfer') || s.includes('in progress')) {
    return { color: '#1e40af', bg: '#dbeafe', dot: '#2563eb' };
  }
  if (s.includes('rejected') || s.includes('closed') || s.includes('cancelled')) {
    return { color: '#991b1b', bg: '#fee2e2', dot: '#dc2626' };
  }

  return { color: '#374151', bg: '#F3F4F6', dot: '#6B7280' };
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const config = getStatusConfig(status);

  return (
    <Box
      component="span"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px',
        px: '9px',
        py: '3px',
        borderRadius: '6px',
        backgroundColor: config.bg,
        fontSize: '0.75rem',
        fontWeight: 600,
        color: config.color,
        whiteSpace: 'nowrap',
        lineHeight: 1.5,
      }}
    >
      <Box
        component="span"
        sx={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          backgroundColor: config.dot,
          flexShrink: 0,
          display: 'inline-block',
        }}
      />
      {status}
    </Box>
  );
};
