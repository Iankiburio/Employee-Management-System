import Header from "./Header";
import EmployeeNavbar from "./EmployeeNavbar";
import React, { useState, useEffect } from "react";
import EmployeeDashboard from "./EmployeeDashboard";
import EmployeeProfile from "./EmployeeProfile";
import EmployeeSalary from "./EmployeeSalary";
import EmployeeCalendar from "./EmployeeCalendar";
import EmployeeCommunication from "./EmployeeCommunication";
import EmployeeLeaveBalances from "./EmployeeLeaveBalances";
import EmployeeLeaveRequests from "./EmployeeLeaveRequests";
import LeaveRequestForm from "./LeaveRequestForm";
import EmployeeNotifications from "./EmployeeNotifications";
import Logout from "./LogOut";
import { Route, Routes } from "react-router-dom";
import Section from "./Section";

function EmployeeApp() {
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
        <EmployeeNavbar />
        <Section>
          <Routes>
            <Route path="dashboard" element={<EmployeeDashboard />} />
            <Route path="my-profile" element={<EmployeeProfile />} />
            <Route path="calendar" element={<EmployeeCalendar />} />
            <Route path="salary" element={<EmployeeSalary />} />
            <Route path="communication" element={<EmployeeCommunication />} />
            <Route path="notifications" element={<EmployeeNotifications />} />
            <Route path="Leave Balances" element={<EmployeeLeaveBalances />} />
            <Route path="leave-requests" element={<EmployeeLeaveRequests />} />
            <Route path="leave-requests/add" element={<LeaveRequestForm />} />
            <Route path="logout" element={Logout} />
          </Routes>
        </Section>
      </div>
    </div>
  );
}

export default EmployeeApp;
