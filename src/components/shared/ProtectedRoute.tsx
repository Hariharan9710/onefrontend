import type { JSX } from 'react';
import { Navigate } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import { useAuth } from '../../context/shared/AuthContext';

interface ProtectedRouteProps {
  children: JSX.Element;
  requiredRole?: 'ADMIN' | 'HR' | 'EMPLOYEE' | 'ADMIN/HR';
  redirectPath?: string;
}

export const ProtectedRoute = ({
  children,
  requiredRole,
  redirectPath = "/login"
}: ProtectedRouteProps) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!user) return <Navigate to={redirectPath} replace />;

  if (requiredRole) {
    const isAuthorized = requiredRole === 'ADMIN/HR' 
      ? (user.role === 'ADMIN' || user.role === 'HR')
      : user.role === requiredRole;

    if (!isAuthorized) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
