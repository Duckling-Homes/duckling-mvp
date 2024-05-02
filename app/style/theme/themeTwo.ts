'use client'

import { createTheme } from '@mui/material/styles'

const themeTwo = createTheme({
  palette: {
    type: 'light',
    primary: {
      light: '#B3E5FC',
      main: '#03A9F4',
      dark: '#0277BD',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#616161',
      main: '#212121',
      dark: '#000000',
      contrastText: '#ffffff',
    },
    error: {
      light: '#E57373',
      main: '#F44336',
      dark: '#D32F2F',
      contrastText: '#ffffff',
    },
    warning: {
      light: '#FFB74D',
      main: '#FF9800',
      dark: '#F57C00',
      contrastText: '#ffffff',
    },
    info: {
      light: '#64B5F6',
      main: '#2196F3',
      dark: '#1976D2',
      contrastText: '#ffffff',
    },
    success: {
      light: '#81C784',
      main: '#4CAF50',
      dark: '#388E3C',
      contrastText: '#ffffff',
    },
    background: {
      default: '#F5F5F6',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#212121',
      secondary: '#757575',
      disabled: '#BDBDBD',
    },
  },
  typography: {
    fontSize: 14,
    fontFamily: 'Roboto',
  },
  shape: {
    borderRadius: 20,
  },
})

export default themeTwo
