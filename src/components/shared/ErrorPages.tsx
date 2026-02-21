import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export const UnauthorizedPage = ({ loginPath = "/login" }: { loginPath?: string }) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      flexDirection: 'column',
      gap: 2,
      textAlign: 'center'
    }}
  >
    <Typography variant="h4" color="error">
      401 - Unauthorized
    </Typography>
    <Typography>You don’t have permission to access this page.</Typography>
    <Button variant="contained" color="primary" component={Link} to={loginPath}>
      Go to Login
    </Button>
  </Box>
);

export const NotFoundPage = ({ homePath = "/" }: { homePath?: string }) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      flexDirection: 'column',
      gap: 2,
      textAlign: 'center',
      px: 2
    }}
  >
    <Typography variant="h3" color="primary" fontWeight="bold">
      404 - Page Not Found
    </Typography>
    <Typography variant="body1" sx={{ maxWidth: 400 }}>
      The page you’re looking for doesn’t exist or has been moved.
    </Typography>
    <Button variant="contained" color="secondary" component={Link} to={homePath}>
      Back to Home
    </Button>
  </Box>
);
