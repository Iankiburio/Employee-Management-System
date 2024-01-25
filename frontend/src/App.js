import React from 'react';
import './App.css';
import Home from './components/Home';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import AdminRole from './components/AdminRole';
import EmployeeRole from './components/EmployeeRole';
import EmployeeLogIn from './components/EmployeeLogIn';
import EmployeeDashboard from './components/EmployeeDashboard';
import AdminDashboard from './components/AdminDashboard';
import Header from './components/Header';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';



function App() {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin-role" element={<AdminRole />} />
        <Route path="/employee-role" element={<EmployeeRole />} />
        <Route path="/login/:role" element={<LogIn />} />
        <Route path="/signup/:role" element={<SignUp />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
      </Routes>
    </Router>
  </AuthProvider>
  );
}

export default App;
