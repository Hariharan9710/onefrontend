import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import EmployeeApp from './modules/employee/EmployeeApp';
import AdminApp from './modules/admin/AdminApp';
import InterviewApp from './modules/interview/InterviewApp';
import { AuthProvider } from './context/shared/AuthContext';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './styles/theme';
import './App.css';

function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Employee Management System</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
        <Link to="/emp" className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all border border-blue-100 flex flex-col items-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
             <span className="text-3xl text-blue-600">👤</span>
          </div>
          <h2 className="text-xl font-semibold mb-2">Employee Portal</h2>
          <p className="text-gray-500">Access your dashboard, apply for leaves, and more.</p>
        </Link>
        <Link to="/admin-panel" className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all border border-red-100 flex flex-col items-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
             <span className="text-3xl text-red-600">🛡️</span>
          </div>
          <h2 className="text-xl font-semibold mb-2">Admin Panel</h2>
          <p className="text-gray-500">Manage payroll, departments, and employees.</p>
        </Link>
        <Link to="/interview" className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all border border-green-100 flex flex-col items-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
             <span className="text-3xl text-green-600">📋</span>
          </div>
          <h2 className="text-xl font-semibold mb-2">Interview System</h2>
          <p className="text-gray-500">Handle candidate registrations and tests.</p>
        </Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/emp/*" element={<EmployeeApp />} />
            <Route path="/admin-panel/*" element={<AdminApp />} />
            <Route path="/interview/*" element={<InterviewApp />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
