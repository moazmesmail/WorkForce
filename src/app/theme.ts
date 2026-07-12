import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#0969DA',
            light: '#085FC7',
            dark: '#074FA6',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#1A7F37',
            light: '#2EA043',
            dark: '#115E25',
            contrastText: '#ffffff',
        },
        background: {
            default: '#F5F7FA',
            paper: '#ffffff',
        },
        text: {
            primary: '#111827',
            secondary: '#5E7089',
        },
        divider: '#D2DAE5',
        success: {
            main: '#1A7F37',
            light: '#DDFBE6',
            contrastText: '#166534',
        },
        warning: {
            main: '#B54708',
            light: '#FEF0C7',
            contrastText: '#92400E',
        },
        error: {
            main: '#D92D20',
            light: '#FEE4E2',
            contrastText: '#991B1B',
        },
        info: {
            main: '#0969DA',
            light: '#DDF4FF',
            contrastText: '#075985',
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: { fontWeight: 800, letterSpacing: '-0.025em' },
        h2: { fontWeight: 700, letterSpacing: '-0.02em' },
        h3: { fontWeight: 700, letterSpacing: '-0.015em' },
        h4: { fontWeight: 700, letterSpacing: '-0.01em' },
        h5: { fontWeight: 600 },
        h6: { fontWeight: 600 },
        subtitle1: { fontWeight: 500 },
        subtitle2: { fontWeight: 600, color: '#5E7089' },
        body1: { lineHeight: 1.7 },
        body2: { lineHeight: 1.6 },
        button: {
            textTransform: 'none' as const,
            fontWeight: 600,
            letterSpacing: '0.01em',
        },
        caption: {
            letterSpacing: '0.03em',
        },
    },
    shape: {
        borderRadius: 10,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    padding: '8px 20px',
                    boxShadow: 'none',
                    transition: 'all 0.15s ease',
                    '&:hover': {
                        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                        transform: 'translateY(-1px)',
                    },
                },
                containedPrimary: {
                    background:
                        'linear-gradient(135deg, #0969DA 0%, #085FC7 100%)',
                    '&:hover': {
                        background:
                            'linear-gradient(135deg, #074FA6 0%, #0969DA 100%)',
                        boxShadow: '0 6px 20px rgba(9, 105, 218, 0.3)',
                    },
                },
                containedSecondary: {
                    background:
                        'linear-gradient(135deg, #1A7F37 0%, #2EA043 100%)',
                    '&:hover': {
                        background:
                            'linear-gradient(135deg, #115E25 0%, #1A7F37 100%)',
                    },
                },
                outlinedPrimary: {
                    borderColor: '#D2DAE5',
                    '&:hover': {
                        borderColor: '#0969DA',
                        backgroundColor: 'rgba(9, 105, 218, 0.04)',
                    },
                },
                sizeLarge: {
                    padding: '12px 28px',
                    fontSize: '1rem',
                },
                sizeSmall: {
                    padding: '5px 14px',
                    fontSize: '0.8125rem',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                    boxShadow:
                        '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
                    border: '1px solid #D2DAE5',
                    borderRadius: 12,
                },
                elevation0: {
                    boxShadow: 'none',
                    border: '1px solid #D2DAE5',
                },
                elevation3: {
                    boxShadow:
                        '0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 4px 10px -6px rgba(0, 0, 0, 0.05)',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    border: '1px solid #D2DAE5',
                    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)',
                    backgroundImage: 'none',
                },
            },
        },
        MuiTableHead: {
            styleOverrides: {
                root: {
                    '& .MuiTableCell-root': {
                        backgroundColor: '#F5F7FA',
                        color: '#475569',
                        fontWeight: 600,
                        fontSize: '0.75rem',
                        textTransform: 'uppercase' as const,
                        letterSpacing: '0.06em',
                        borderBottom: '1px solid #D2DAE5',
                        padding: '14px 16px',
                    },
                },
            },
        },
        MuiTableBody: {
            styleOverrides: {
                root: {
                    '& .MuiTableRow-root:last-child .MuiTableCell-root': {
                        borderBottom: 0,
                    },
                },
            },
        },
        MuiTableRow: {
            styleOverrides: {
                root: {
                    '&:hover': {
                        backgroundColor: '#F5F7FA',
                    },
                    transition: 'background-color 0.1s ease',
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    borderBottom: '1px solid #D2DAE5',
                    padding: '14px 16px',
                    fontSize: '0.875rem',
                    color: '#111827',
                },
            },
        },
        MuiTextField: {
            defaultProps: {
                variant: 'outlined' as const,
                size: 'small' as const,
            },
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 8,
                        backgroundColor: '#ffffff',
                        '& fieldset': {
                            borderColor: '#D2DAE5',
                        },
                        '&:hover fieldset': {
                            borderColor: '#B0BDD0',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#0969DA',
                            borderWidth: '1.5px',
                        },
                        '&.Mui-disabled': {
                            backgroundColor: 'transparent',
                            '& fieldset': {
                                borderColor: '#E1E6EE',
                            },
                            '& input': {
                                color: '#111827',
                                WebkitTextFillColor: '#111827',
                            },
                        },
                    },
                    '& .MuiInputLabel-root': {
                        fontSize: '0.875rem',
                    },
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 6,
                    fontWeight: 600,
                    fontSize: '0.75rem',
                    height: 26,
                },
                label: {
                    padding: '0 10px',
                },
            },
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    textTransform: 'none' as const,
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    minHeight: 44,
                    color: '#5E7089',
                    '&.Mui-selected': {
                        color: '#0969DA',
                    },
                },
            },
        },
        MuiTabs: {
            styleOverrides: {
                indicator: {
                    height: 2,
                    borderRadius: 2,
                },
            },
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    borderRadius: 16,
                    border: '1px solid #D2DAE5',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
                },
            },
        },
        MuiDialogTitle: {
            styleOverrides: {
                root: {
                    fontSize: '1.125rem',
                    fontWeight: 700,
                    padding: '24px 24px 16px',
                },
            },
        },
        MuiDialogContent: {
            styleOverrides: {
                root: {
                    padding: '8px 24px 16px',
                },
            },
        },
        MuiDialogActions: {
            styleOverrides: {
                root: {
                    padding: '16px 24px 24px',
                    gap: 8,
                },
            },
        },
        MuiStepLabel: {
            styleOverrides: {
                label: {
                    fontWeight: 600,
                    fontSize: '0.875rem',
                },
            },
        },
        MuiStepIcon: {
            styleOverrides: {
                root: {
                    '&.Mui-active': {
                        color: '#0969DA',
                    },
                    '&.Mui-completed': {
                        color: '#1A7F37',
                    },
                },
            },
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    borderColor: '#D2DAE5',
                },
            },
        },
        MuiAvatar: {
            styleOverrides: {
                root: {
                    fontWeight: 700,
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    boxShadow: 'none',
                },
            },
        },
        MuiTablePagination: {
            styleOverrides: {
                root: {
                    fontSize: '0.8125rem',
                    color: '#5E7089',
                    borderTop: '1px solid #D2DAE5',
                },
                selectLabel: {
                    fontSize: '0.8125rem',
                },
                displayedRows: {
                    fontSize: '0.8125rem',
                },
            },
        },
    },
});
