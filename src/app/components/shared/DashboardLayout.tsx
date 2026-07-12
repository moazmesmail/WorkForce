import { ReactNode } from 'react';
import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Avatar,
    Chip,
    Divider,
    Tooltip,
    Button,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import { LogOut, Zap, Bell } from 'lucide-react';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

const drawerWidth = 256;

export interface NavItem {
    label: string;
    path: string;
    icon: ReactNode;
}

interface DashboardLayoutProps {
    children: ReactNode;
    navItems: NavItem[];
}

const roleBadgeConfig: Record<
    string,
    { label: string; color: string; bg: string }
> = {
    worker: { label: 'Worker', color: '#166534', bg: '#dcfce7' },
    sponsor: { label: 'Sponsor', color: '#1e40af', bg: '#dbeafe' },
    agency: { label: 'Agency', color: '#6b21a8', bg: '#f3e8ff' },
};

const labelKeys: Record<string, string> = {
    'Dashboard': 'nav.dashboard',
    'Register Worker': 'nav.registerWorker',
    'Manage Workers': 'nav.manageWorkers',
    'Verify Documents': 'nav.verifyDocuments',
    'Recruitment Requests': 'nav.recruitmentRequests',
    'Requests': 'nav.requests',
    'Workers': 'nav.workers',
    'Offers': 'nav.offers',
    'Approvals': 'nav.approvals',
    'Profile': 'nav.profile',
    'Sponsorship Transfer': 'nav.sponsorshipTransfer',
    'Application Tracking': 'nav.applicationTracking',
    'Job Opportunities': 'nav.jobOpportunities'
};

export const DashboardLayout = ({
    children,
    navItems,
}: DashboardLayoutProps) => {
    const { t, i18n } = useTranslation();
    const muiTheme = useTheme();
    const isRtl = muiTheme.direction === 'rtl';

    const { currentUser, role, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const currentPage =
        navItems.find((n) => location.pathname.startsWith(n.path))?.label ||
        'Dashboard';
    const badge = role ? roleBadgeConfig[role] : null;

    const initials = currentUser?.name
        ? currentUser.name
              .split(' ')
              .map((w) => w[0])
              .join('')
              .toUpperCase()
              .slice(0, 2)
        : 'U';

    return (
        <Box
            sx={{
                display: 'flex',
                height: '100vh',
                backgroundColor: '#F5F7FA',
            }}
        >
            {/* Sidebar */}
            <Drawer
                variant="permanent"
                anchor="left"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        backgroundColor: '#FFFFFF',
                        color: '#111827',
                        borderRight: '1px solid #D2DAE5',
                        display: 'flex',
                        flexDirection: 'column',
                    },
                }}
            >
                {/* Logo */}
                <Box
                    sx={{
                        px: 3,
                        py: 3,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                    }}
                >
                    <Box
                        sx={{
                            width: 36,
                            height: 36,
                            borderRadius: '10px',
                            background:
                                'linear-gradient(135deg, #0969DA, #085FC7)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                        }}
                    >
                        <Zap size={20} color="white" strokeWidth={2.5} />
                    </Box>
                    <Box>
                        <Typography
                            sx={{
                                fontWeight: 800,
                                fontSize: '1rem',
                                color: '#111827',
                                letterSpacing: '-0.02em',
                                lineHeight: 1.2,
                            }}
                        >
                            WorkForce
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: '0.65rem',
                                color: '#8494AB',
                                letterSpacing: '0.08em',
                                textTransform: 'uppercase',
                                fontWeight: 600,
                            }}
                        >
                            Platform
                        </Typography>
                    </Box>
                </Box>

                <Divider sx={{ borderColor: '#D2DAE5', mx: 2 }} />

                {/* Navigation */}
                <Box sx={{ flex: 1, overflowY: 'auto', pt: 2, px: 2 }}>
                    <Typography
                        sx={{
                            fontSize: '0.6rem',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.12em',
                            color: '#8494AB',
                            px: 1.5,
                            pb: 1.5,
                        }}
                    >
                        {t('nav.navigation')}
                    </Typography>
                    <List disablePadding>
                        {navItems.map((item) => {
                            const isActive = location.pathname.startsWith(
                                item.path
                            );
                            return (
                                <ListItem
                                    key={item.label}
                                    disablePadding
                                    sx={{ mb: 0.5 }}
                                >
                                    <ListItemButton
                                        onClick={() => navigate(item.path)}
                                        sx={{
                                            borderRadius: '8px',
                                            py: 1.25,
                                            px: 1.5,
                                            backgroundColor: isActive
                                                ? '#DDF4FF'
                                                : 'transparent',
                                            '&:hover': {
                                                backgroundColor: isActive
                                                    ? '#DDF4FF'
                                                    : '#EDF0F5',
                                            },
                                            position: 'relative',
                                            transition:
                                                'background-color 0.15s ease',
                                        }}
                                    >
                                        {isActive && (
                                            <Box
                                                sx={{
                                                    position: 'absolute',
                                                    left: 0,
                                                    top: '20%',
                                                    bottom: '20%',
                                                    width: 3,
                                                    borderRadius: '0 3px 3px 0',
                                                    backgroundColor: '#0969DA',
                                                }}
                                            />
                                        )}
                                        <ListItemIcon
                                            sx={{
                                                color: isActive
                                                    ? '#0969DA'
                                                    : '#8494AB',
                                                minWidth: 36,
                                                '& svg': {
                                                    width: 18,
                                                    height: 18,
                                                },
                                            }}
                                        >
                                            {item.icon}
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={t(labelKeys[item.label] || item.label)}
                                            primaryTypographyProps={{
                                                fontSize: '0.875rem',
                                                fontWeight: isActive
                                                    ? 600
                                                    : 500,
                                                color: isActive
                                                    ? '#0969DA'
                                                    : '#5E7089',
                                            }}
                                        />
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                    </List>
                </Box>

                {/* User info at bottom */}
                <Box sx={{ p: 2 }}>
                    <Divider sx={{ borderColor: '#D2DAE5', mb: 2 }} />
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.5,
                            p: 1.5,
                            borderRadius: '10px',
                            backgroundColor: '#F5F7FA',
                        }}
                    >
                        <Avatar
                            sx={{
                                width: 36,
                                height: 36,
                                fontSize: '0.8125rem',
                                fontWeight: 700,
                                background:
                                    'linear-gradient(135deg, #0969DA, #085FC7)',
                                flexShrink: 0,
                            }}
                        >
                            {initials}
                        </Avatar>
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Typography
                                sx={{
                                    fontSize: '0.8125rem',
                                    fontWeight: 600,
                                    color: '#111827',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    lineHeight: 1.3,
                                }}
                            >
                                {currentUser?.name || 'User'}
                            </Typography>
                            {badge && (
                                <Box
                                    component="span"
                                    sx={{
                                        display: 'inline-block',
                                        fontSize: '0.65rem',
                                        fontWeight: 700,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.06em',
                                        color: badge.color,
                                        backgroundColor: badge.bg,
                                        px: '6px',
                                        py: '1px',
                                        borderRadius: '4px',
                                        mt: '2px',
                                    }}
                                >
                                    {t('roles.' + role)}
                                </Box>
                            )}
                        </Box>
                        <Tooltip title={t('common.logout')} placement="top">
                            <IconButton
                                size="small"
                                onClick={handleLogout}
                                sx={{
                                    color: '#8494AB',
                                    '&:hover': {
                                        color: '#D92D20',
                                        backgroundColor: '#FEE4E2',
                                    },
                                    flexShrink: 0,
                                }}
                            >
                                <LogOut size={16} />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>
            </Drawer>

            {/* Top AppBar */}
            <AppBar
                position="fixed"
                elevation={0}
                sx={{
                    width: `calc(100% - ${drawerWidth}px)`,
                    ml: `${drawerWidth}px`,
                    backgroundColor: 'rgba(255, 255, 255, 0.85)',
                    backdropFilter: 'blur(12px)',
                    borderBottom: '1px solid #D2DAE5',
                    color: 'text.primary',
                }}
            >
                <Toolbar
                    sx={{
                        justifyContent: 'space-between',
                        minHeight: '60px !important',
                        px: 4,
                    }}
                >
                    <Box>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 700,
                                color: '#111827',
                                lineHeight: 1.2,
                                fontSize: '1rem',
                            }}
                        >
                            {t(labelKeys[currentPage] || currentPage)}
                        </Typography>
                        <Typography
                            variant="caption"
                            sx={{ color: '#8494AB', fontSize: '0.75rem' }}
                        >
                            {currentUser?.email || 'workforce-platform.app'}
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Button
                            onClick={() => i18n.changeLanguage(i18n.language === 'ar' ? 'en' : 'ar')}
                            size="small"
                            sx={{
                                fontSize: '0.8125rem',
                                fontWeight: 700,
                                color: '#5E7089',
                                textTransform: 'none',
                                minWidth: 'unset',
                                px: 1.5,
                                py: 0.5,
                                borderRadius: '6px',
                                '&:hover': {
                                    backgroundColor: '#F5F7FA',
                                },
                            }}
                        >
                            {i18n.language === 'ar' ? 'English' : 'العربية'}
                        </Button>

                        <Tooltip title={t('common.notifications')}>
                            <IconButton
                                size="small"
                                sx={{
                                    color: '#5E7089',
                                    position: 'relative',
                                    '&:hover': { backgroundColor: '#F5F7FA' },
                                }}
                            >
                                <Bell size={18} />
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: 6,
                                        right: 6,
                                        width: 7,
                                        height: 7,
                                        borderRadius: '50%',
                                        backgroundColor: '#D92D20',
                                        border: '1.5px solid #FFFFFF',
                                    }}
                                />
                            </IconButton>
                        </Tooltip>

                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                ml: 1,
                                pl: 2,
                                borderLeft: '1px solid #D2DAE5',
                             }}
                        >
                            <Avatar
                                sx={{
                                    width: 32,
                                    height: 32,
                                    fontSize: '0.75rem',
                                    fontWeight: 700,
                                    background:
                                        'linear-gradient(135deg, #0969DA, #085FC7)',
                                }}
                            >
                                {initials}
                            </Avatar>
                            {badge && (
                                <Chip
                                    label={t('roles.' + role)}
                                    size="small"
                                    sx={{
                                        height: 22,
                                        fontSize: '0.6875rem',
                                        fontWeight: 700,
                                        color: badge.color,
                                        backgroundColor: badge.bg,
                                        border: 'none',
                                        '& .MuiChip-label': { px: '8px' },
                                    }}
                                />
                            )}
                        </Box>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Main content */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    pt: '80px',
                    overflowY: 'auto',
                    minHeight: '100vh',
                }}
            >
                <Box
                    sx={{
                        p: { xs: 2.5, sm: 4, md: 5 },
                        maxWidth: 1440,
                        mx: 'auto',
                    }}
                >
                    {children}
                </Box>
            </Box>
        </Box>
    );
};
