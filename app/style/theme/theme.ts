'use client'

import { ThemeOptions, createTheme } from '@mui/material/styles'

const themeOptions = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#3678c9',
      light: '#4493c3',
      dark: '#1f5475',
    },
    secondary: {
      main: '#3ea493',
      light: '#4db3a1',
      dark: '#227568',
    },
    divider: 'rgba(0,0,0,0.12)',
    text: {
      secondary: 'rgba(69,90,125,0.54)',
      primary: 'rgba(0, 0, 0, 0.87)',
    },
    background: {
      default: '#fafafa',
    },
  },
  typography: {
    fontFamily: 'inter',
    fontWeightRegular: 400,
    h1: {
      fontWeight: 500,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.8rem',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.3rem',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
    },
    subtitle2: {
      fontSize: '0.8rem',
      fontWeight: 400,
    },
    button: {
      fontWeight: 600,
    },
  },
  components: {
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: 'rgba(0, 0, 0, 0.54)',
          '&.Mui-checked': {
            color: '#3ea493',
          },
          '& .MuiSvgIcon-root': {
            fontSize: '1.5rem',
            transition: 'all 0.3s ease',
            '&.Mui-checked': {
              transform: 'rotate(20deg)',
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          '&.MuiPaper-elevation1': {
            boxShadow: 'none',
          },
          border: '1px solid rgba(0, 0, 0, 0.1)',
          borderRadius: '12px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          border: '1.2px solid rgba(0, 0, 0, 0.1)',
          borderRadius: '12px',
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
          '&:active': {
            boxShadow: 'none',
          },
          '&:focus': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          border: 'none',
          borderRadius: '0px',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          letterSpacing: '0.7px',
          textTransform: 'none',
          borderRadius: '100px',
        },
        outlined: {
          boxShadow: 'none',
          border: '1.5px solid',
          backgroundColor: '#EFF5FD',
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&:hover $notchedOutline': {
            borderColor: 'primary.main',
          },
          '&$focused $notchedOutline': {
            borderColor: 'secondary.main',
            borderWidth: '2px',
          },
        },
        notchedOutline: {
          borderColor: 'rgba(0, 0, 0, 0.23)',
        },
      },
    },
    MuiBox: {
      styleOverrides: {
        root: {
          '& > *': {
            margin: 8,
          },
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            backgroundColor: '#f0f0f0',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: '#e0e0e0',
          color: '#092C58',
          fontWeight: 500,
        },
        clickable: {
          '&:hover': {
            backgroundColor: '#91BDF3',
            color: '#092C58',
          },
          '&:focus': {
            backgroundColor: '#a8a8a8',
            color: '#092C58',
          },
        },
        deletable: {
          backgroundColor: '#B5D2F5',
          color: '#092C58',
          '&:focus': {
            backgroundColor: '#a8a8a8',
          },
        },
        icon: {
          color: 'primary.dark',
        },
        deletableIcon: {
          color: '#092C58',
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          width: 46,
          height: 27,
          padding: 0,
          margin: 8,
        },
        switchBase: {
          padding: 1,
          '&$checked, &$colorPrimary$checked, &$colorSecondary$checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + $track': {
              opacity: 1,
              border: 'none',
            },
          },
        },
        thumb: {
          width: 24,
          height: 24,
        },
        track: {
          borderRadius: 13,
          border: '1px solid #bdbdbd',
          backgroundColor: '#fafafa',
          opacity: 1,
          transition:
            'background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        },
      },
    },
  },
})

export default themeOptions
