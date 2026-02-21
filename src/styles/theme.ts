import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
    background: { default: '#f5f5f5' }
  },
  typography: {
    h4: { fontWeight: 'bold' },
    h6: { fontWeight: 'bold' }
  }
});

export default theme;
