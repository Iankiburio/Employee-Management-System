import Header from "./Header";
import AdminNavbar from "./AdminNavbar";
import React, { useState, useEffect } from "react";
import AdminDashboard from "./AdminDashboard";
import LeaveType from "./AdminLeaveType";
import Department from "./AdminDepartment";
import AdminNotifications from "./AdminNotifications";
import Employees from "./AdminEmployees";
import Salary from "./AdminSalary";
import LeaveRequests from "./AdminLeaveRequests";
import Report from "./AdminReport";
import Logout from "./LogOut";
import { Route, Routes } from "react-router-dom";
import Section from "./Section";
import "../css/adminapp.css";

function AdminApp() {
  const [username, setUsername] = useState("");

  const fetchData = () => {
    return fetch("http://127.0.0.1:5000/users/1")
      .then((response) => response.json())
      .then((data) => {
        setUsername(data.user);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="app">
      <Header currentUser={username} />
      <div className="container">
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
            <Route path="notifications" element={<AdminNotifications />} />
          </Routes>
        </Section>
      </div>
    </div>
  );
}

export default AdminApp;
