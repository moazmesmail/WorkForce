import { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    InputAdornment,
    IconButton,
    Divider,
} from '@mui/material';
import { useNavigate } from 'react-router';
import { useAuth, Role } from '../../context/AuthContext';
import {
    Eye,
    EyeOff,
    Briefcase,
    Building2,
    ShieldCheck,
    ArrowLeft,
    Zap,
} from 'lucide-react';

const roleInfo = [
    {
        label: 'Worker',
        icon: Briefcase,
        description: 'Find jobs, track applications, manage your sponsorship',
        activeColor: '#0969DA',
        activeBg: '#DDF4FF',
    },
    {
        label: 'Sponsor',
        icon: Building2,
        description: 'Manage your workforce, post requests, send offers',
        activeColor: '#1A7F37',
        activeBg: '#DDFBE6',
    },
    {
        label: 'Agency',
        icon: ShieldCheck,
        description: 'Register workers, verify documents, fulfill requests',
        activeColor: '#B54708',
        activeBg: '#FEF0C7',
    },
];

export default function LoginPage() {
    const [tabIndex, setTabIndex] = useState(0);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        const roles: Role[] = ['worker', 'sponsor', 'agency'];
        const selectedRole = roles[tabIndex];
        login(email || 'user@example.com', selectedRole);
        navigate(`/${selectedRole}/dashboard`);
    };

    const active = roleInfo[tabIndex];
    const ActiveIcon = active.icon;

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                backgroundColor: '#F5F7FA',
            }}
        >
            {/* Left Panel — Brand side */}
            <Box
                sx={{
                    display: { xs: 'none', md: 'flex' },
                    width: '42%',
                    flexShrink: 0,
                    flexDirection: 'column',
                    backgroundColor: '#111827',
                    borderRight: '1px solid #1F2937',
                    p: 5,
                }}
            >
                {/* Logo */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.25,
                        mb: 'auto',
                    }}
                >
                    <Box
                        sx={{
                            width: 30,
                            height: 30,
                            borderRadius: '7px',
                            backgroundColor: '#0969DA',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                        }}
                    >
                        <Zap size={16} color="white" strokeWidth={2.5} />
                    </Box>
                    <Typography
                        sx={{
                            fontWeight: 700,
                            fontSize: '1rem',
                            color: '#ffffff',
                            letterSpacing: '-0.01em',
                        }}
                    >
                        WorkForcePro
                    </Typography>
                </Box>

                {/* Center content */}
                <Box sx={{ my: 'auto' }}>
                    <Box
                        sx={{
                            width: 56,
                            height: 56,
                            borderRadius: '12px',
                            backgroundColor: active.activeBg,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mb: 3,
                        }}
                    >
                        <ActiveIcon
                            size={28}
                            color={active.activeColor}
                            strokeWidth={1.75}
                        />
                    </Box>
                    <Typography
                        sx={{
                            fontWeight: 700,
                            fontSize: '1.625rem',
                            color: '#ffffff',
                            letterSpacing: '-0.02em',
                            lineHeight: 1.2,
                            mb: 1.5,
                        }}
                    >
                        Welcome back,{' '}
                        <Box
                            component="span"
                            sx={{ color: active.activeColor }}
                        >
                            {active.label}
                        </Box>
                    </Typography>
                    <Typography
                        sx={{
                            color: '#8494AB',
                            lineHeight: 1.7,
                            fontSize: '0.9375rem',
                            maxWidth: 300,
                        }}
                    >
                        {active.description}
                    </Typography>

                    {/* Role list */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1,
                            mt: 4,
                        }}
                    >
                        {roleInfo.map((r, i) => {
                            const RIcon = r.icon;
                            const isActive = i === tabIndex;
                            return (
                                <Box
                                    key={r.label}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1.25,
                                        opacity: isActive ? 1 : 0.35,
                                        transition: 'opacity 0.15s',
                                    }}
                                >
                                    <RIcon
                                        size={14}
                                        color={
                                            isActive ? r.activeColor : '#ffffff'
                                        }
                                    />
                                    <Typography
                                        sx={{
                                            fontSize: '0.875rem',
                                            color: isActive
                                                ? '#ffffff'
                                                : '#ffffff',
                                            fontWeight: isActive ? 600 : 400,
                                        }}
                                    >
                                        {r.label} Account
                                    </Typography>
                                </Box>
                            );
                        })}
                    </Box>
                </Box>

                <Button
                    startIcon={<ArrowLeft size={14} />}
                    onClick={() => navigate('/')}
                    sx={{
                        color: '#5E7089',
                        fontWeight: 500,
                        fontSize: '0.8125rem',
                        alignSelf: 'flex-start',
                        '&:hover': {
                            color: '#ffffff',
                            backgroundColor: 'rgba(255,255,255,0.05)',
                        },
                    }}
                >
                    Back to Home
                </Button>
            </Box>

            {/* Right Panel — Form */}
            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    px: { xs: 3, sm: 6 },
                    py: 6,
                    backgroundColor: '#ffffff',
                }}
            >
                <Box sx={{ width: '100%', maxWidth: 400 }}>
                    {/* Mobile logo */}
                    <Box
                        sx={{
                            display: { xs: 'flex', md: 'none' },
                            alignItems: 'center',
                            gap: 1.25,
                            mb: 5,
                        }}
                    >
                        <Box
                            sx={{
                                width: 28,
                                height: 28,
                                borderRadius: '7px',
                                backgroundColor: '#0969DA',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Zap size={15} color="white" strokeWidth={2.5} />
                        </Box>
                        <Typography
                            sx={{
                                fontWeight: 700,
                                fontSize: '0.9375rem',
                                color: '#111827',
                            }}
                        >
                            WorkForcePro
                        </Typography>
                    </Box>

                    <Typography
                        sx={{
                            fontWeight: 700,
                            fontSize: '1.375rem',
                            color: '#111827',
                            mb: 0.5,
                            letterSpacing: '-0.015em',
                        }}
                    >
                        Sign in to your account
                    </Typography>
                    <Typography
                        sx={{ color: '#5E7089', mb: 4, fontSize: '0.875rem' }}
                    >
                        Don&apos;t have an account?{' '}
                        <Box
                            component="span"
                            onClick={() => navigate('/register')}
                            sx={{
                                color: '#0969DA',
                                fontWeight: 600,
                                cursor: 'pointer',
                                '&:hover': { textDecoration: 'underline' },
                            }}
                        >
                            Create one free
                        </Box>
                    </Typography>

                    {/* Role selector */}
                    <Box
                        sx={{
                            display: 'flex',
                            backgroundColor: '#F5F7FA',
                            border: '1px solid #D2DAE5',
                            borderRadius: '8px',
                            p: '3px',
                            mb: 3.5,
                        }}
                    >
                        {roleInfo.map((r, i) => {
                            const RIcon = r.icon;
                            const isActive = i === tabIndex;
                            return (
                                <Box
                                    key={r.label}
                                    onClick={() => setTabIndex(i)}
                                    sx={{
                                        flex: 1,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: 0.75,
                                        py: 0.875,
                                        borderRadius: '6px',
                                        cursor: 'pointer',
                                        backgroundColor: isActive
                                            ? '#ffffff'
                                            : 'transparent',
                                        boxShadow: isActive
                                            ? '0 1px 2px rgba(17,24,39,0.08)'
                                            : 'none',
                                        border: isActive
                                            ? '1px solid #D2DAE5'
                                            : '1px solid transparent',
                                        transition: 'all 0.1s ease',
                                    }}
                                >
                                    <RIcon
                                        size={14}
                                        color={
                                            isActive ? r.activeColor : '#8494AB'
                                        }
                                    />
                                    <Typography
                                        sx={{
                                            fontSize: '0.8125rem',
                                            fontWeight: isActive ? 700 : 500,
                                            color: isActive
                                                ? r.activeColor
                                                : '#8494AB',
                                        }}
                                    >
                                        {r.label}
                                    </Typography>
                                </Box>
                            );
                        })}
                    </Box>

                    <form onSubmit={handleLogin}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                            }}
                        >
                            <Box>
                                <Typography
                                    sx={{
                                        fontSize: '0.8125rem',
                                        fontWeight: 600,
                                        color: '#374151',
                                        mb: 0.75,
                                    }}
                                >
                                    Email address
                                </Typography>
                                <TextField
                                    fullWidth
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </Box>

                            <Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        mb: 0.75,
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: '0.8125rem',
                                            fontWeight: 600,
                                            color: '#374151',
                                        }}
                                    >
                                        Password
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontSize: '0.8125rem',
                                            color: '#0969DA',
                                            fontWeight: 600,
                                            cursor: 'pointer',
                                            '&:hover': {
                                                textDecoration: 'underline',
                                            },
                                        }}
                                    >
                                        Forgot password?
                                    </Typography>
                                </Box>
                                <TextField
                                    fullWidth
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() =>
                                                        setShowPassword(
                                                            !showPassword
                                                        )
                                                    }
                                                    edge="end"
                                                    size="small"
                                                    sx={{
                                                        color: '#8494AB',
                                                        '&:hover': {
                                                            backgroundColor:
                                                                '#EDF0F5',
                                                        },
                                                    }}
                                                >
                                                    {showPassword ? (
                                                        <EyeOff size={15} />
                                                    ) : (
                                                        <Eye size={15} />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Box>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                size="large"
                                sx={{
                                    mt: 0.5,
                                    py: 1.375,
                                    fontSize: '0.9375rem',
                                    fontWeight: 700,
                                }}
                            >
                                Sign In as {active.label}
                            </Button>
                        </Box>
                    </form>

                    <Divider sx={{ my: 3 }}>
                        <Typography
                            sx={{
                                fontSize: '0.75rem',
                                color: '#8494AB',
                                px: 1,
                            }}
                        >
                            or
                        </Typography>
                    </Divider>

                    <Button
                        fullWidth
                        variant="outlined"
                        onClick={() => navigate('/')}
                        startIcon={<ArrowLeft size={14} />}
                        sx={{
                            borderColor: '#D2DAE5',
                            color: '#5E7089',
                            fontWeight: 500,
                            fontSize: '0.875rem',
                            '&:hover': {
                                backgroundColor: '#F5F7FA',
                                borderColor: '#B0BDD0',
                                color: '#111827',
                            },
                        }}
                    >
                        Return to homepage
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}
