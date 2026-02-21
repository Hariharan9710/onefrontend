import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../../components/shared/ProtectedRoute';
import { NotFoundPage } from '../../components/shared/ErrorPages';
import LoginPage from './pages/Auth/LoginPage';
import './App.css';
import Dashboard from './pages/Admin/Dashboard';

function AdminApp() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="login" replace />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Admin / HR Dashboard - Unified under /admin-panel */}
      <Route
        path="/*"
        element={
          <ProtectedRoute requiredRole="ADMIN/HR" redirectPath="/admin-panel/login">
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFoundPage homePath="/admin-panel" /> }/>
    </Routes>
  );
}

export default AdminApp;
