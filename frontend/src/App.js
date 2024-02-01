import React from "react";
import "./App.css";
import Home from "./components/Home";
import AdminLogIn from "./components/AdminLogIn";
import AdminSignUp from "./components/AdminSignUp";
import EmployeeLogIn from "./components/EmployeeLogIn";
import AdminApp from "./components/AdminApp";
import EmployeeApp from "./components/EmployeeApp";
import LeaveRequestForm from "./components/LeaveRequestForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/*" element={<AdminApp />} />
        <Route path="/employee/*" element={<EmployeeApp />} />
        <Route path="/admin-login" element={<AdminLogIn />} />
        <Route path="/admin-signup" element={<AdminSignUp />} />
        <Route path="/employee-login" element={<EmployeeLogIn />} />
        <Route path="/leave-requests" element={<LeaveRequestForm />} />
        <Route path="/leave-requests" element={<LeaveRequestForm />} />
      </Routes>
    </Router>
  );
}

export default App;
