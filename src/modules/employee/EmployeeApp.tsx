import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../../components/shared/ProtectedRoute';
import { UnauthorizedPage, NotFoundPage } from '../../components/shared/ErrorPages';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import AdminDashboard from './pages/Admin/AdminDashboard';
import EmployeeDashboard from './pages/Employee/EmployeeDashboard';
import './App.css';

function EmployeeApp() {
  return (
    <Routes>
      {/* Redirect root (which is /) → login */}
      <Route path="/" element={<Navigate to="login" replace />} />

      {/* Auth Pages */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/unauthorized" element={<UnauthorizedPage loginPath="/emp/login" />} />

      {/* Admin Routes */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute requiredRole="ADMIN/HR" redirectPath="/emp/login">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* Employee Routes */}
      <Route
        path="/employee/*"
        element={
          <ProtectedRoute requiredRole="EMPLOYEE" redirectPath="/emp/login">
            <EmployeeDashboard />
          </ProtectedRoute>
        }
      />

      {/* 404 */}
      <Route path="*" element={<NotFoundPage homePath="/emp" />} />
    </Routes>
  );
}

export default EmployeeApp;
