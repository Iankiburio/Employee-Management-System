import Header from './Header';
import AdminNavbar from './AdminNavbar';
import React from 'react';
import AdminDashboard from './AdminDashboard'
import LeaveType from './AdminLeaveType'
import Department from './AdminDepartment'
import Employees from './AdminEmployees'
import Salary from './AdminSalary'
import LeaveRequests from './AdminLeaveRequests'
import Report from './AdminReport'
import Logout from './LogOut'
import {Route, Routes} from 'react-router-dom';
import Section from './Section';
import '../css/adminapp.css'


function AdminApp() {
    return (
        <div className="app">
          <Header currentUser="User"/>
          <div className ="container">
          <AdminNavbar />
          <Section>
          <Routes>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="leave-type" element={<LeaveType />} />
            <Route path="departments" element={<Department />} />
            <Route path="employees" element={<Employees />} />
            <Route path="salary" element={<Salary />} />
            <Route path="leave-requests" element={<LeaveRequests />} />
            <Route path="report" element={<Report />} />
            <Route path="logout" element={<Logout />} />
          </Routes>
          </Section>
          </div>
        </div>
    );
  }
  
  export default AdminApp;



