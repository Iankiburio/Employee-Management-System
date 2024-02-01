import Header from "./Header";
import EmployeeNavbar from "./EmployeeNavbar";
import React from "react";
import EmployeeDashboard from "./EmployeeDashboard";
import EmployeeProfile from "./EmployeeProfile";
import EmployeeSalary from "./EmployeeSalary";
import EmployeeCalendar from "./EmployeeCalendar";
import EmployeeCommunication from "./EmployeeCommunication";
import LeaveRequestForm from "./LeaveRequestForm";
import EmployeeNotifications from "./EmployeeNotifications";
import EmployeeLeaveRequests from "./EmployeeLeaveRequests";
import Logout from "./LogOut";
import { Route, Routes } from "react-router-dom";
import Section from "./Section";

function EmployeeApp() {
  return (
    <div className="app">
      <Header currentUser="User" />
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
