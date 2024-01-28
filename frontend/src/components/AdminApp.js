import Header from './Header';
import AdminNavbar from './AdminNavbar';
import React from 'react';
import AdminDashboard from './AdminDashboard'
import LeaveType from './LeaveType'
import Department from './Department'
import Employees from './Employees'
import Salary from './Salary'
import LeaveRequests from './LeaveRequests'
import Report from './Report'
import Logout from './LogOut'
import {Route, Routes} from 'react-router-dom';
import Section from './Section';


function AdminApp() {
    return (
        <div className="app">
          <Header currentUser="User"/>
          <div className ="container">
          <AdminNavbar />
          <Section>
          <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/leave-type" element={LeaveType} />
            <Route path="/department" element={Department} />
            <Route path="/employees" element={Employees} />
            <Route path="/salary" element={Salary} />
            <Route path="/leave-requests" element={LeaveRequests} />
            <Route path="/report" element={Report} />
            <Route path="/logout" element={Logout} />
          </Routes>
          </Section>
          </div>
        </div>
    );
  }
  
  export default AdminApp;



