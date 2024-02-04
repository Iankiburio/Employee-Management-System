// Import necessary dependencies
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Import your components
import AdminDashboard from './AdminDashboard';
import EmployeeDashboard from './EmployeeDashboard';
import PayrollPage from './PayrollPage';
import AttendancePage from './AttendancePage';

// Home Page Component
const HomePage = () => {
  return (
    <div>
      <h1>Employee Management System</h1>
      <div>
        <Link to="/admin">
          <button>Admin Dashboard</button>
        </Link>
        <br />
        <Link to="/employee/1"> {/* Replace 123 with the actual employee ID */}
          <button>Employee Dashboard</button>
        </Link>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  return (
    <Router>
      <Routes>
        {/* Route for Home Page */}
        <Route path="/" element={<HomePage />} />

        {/* Route for Admin Dashboard */}
        <Route path="/admin/*" element={<AdminDashboard />} />
        
        {/* Route for Payroll Page */}
        <Route path="/admin/payroll/:employeeId" element={<PayrollPage />} />

        {/* Route for Attendance Page */}
        <Route path="/admin/attendance/:employeeId" element={<AttendancePage />} />

        {/* Route for Employee Dashboard */}
        <Route path="/employee/:id/*" element={<EmployeeDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
