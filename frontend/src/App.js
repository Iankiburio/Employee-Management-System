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
  // Function to handle employee login
  const handleEmployeeLogin = (user) => {
    fetch("http://127.0.0.1:5000/employeelogin", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        first_name: user.first_name,
        last_name: user.last_name,
        password: user.password,
      }),
    })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          // Handle successful login here, e.g., update state, redirect, etc.

          window.location.href = "/employee/dashboard";
        } else {
          // Handle login error here, e.g., show an error message
        }
        return res.json();
      })
      .then((data) => {
        // Handle data or error message from the server response
      })
      .catch((error) => {
        // Handle any network or fetch errors
        console.error("Login error:", error);
      });

    // posting for new user
    fetch("http://127.0.0.1:5000/users/1", {
      method: "PATCH",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        user: user.first_name,
        password: user.password,
      }),
    })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          // Handle successful login here, e.g., update state, redirect, etc.
          // It cant work.
          // Store the employee in state variable.
          window.location.href = "/employee/dashboard";
        } else {
          // Handle login error here, e.g., show an error message
        }
        return res.json();
      })
      .then((data) => {
        // Handle data or error message from the server response
      })
      .catch((error) => {
        // Handle any network or fetch errors
        console.error("User update:", error);
      });
  };

  // Function to handle admin login
  const handleAdminLogin = (user) => {
    fetch("http://127.0.0.1:5000/adminlogin", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        first_name: user.first_name,
        last_name: user.last_name,
        password: user.password,
      }),
    })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          // Handle successful login here, e.g., update state, redirect, etc.
          window.location.href = "/admin/dashboard";
        } else {
          // Handle login error here, e.g., show an error message
        }
        return res.json();
      })
      .then((data) => {
        // Handle data or error message from the server response
      })
      .catch((error) => {
        // Handle any network or fetch errors
        console.error("Login error:", error);
      });

    // posting for new user
    fetch("http://127.0.0.1:5000/users/1", {
      method: "PATCH",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        user: user.first_name,
        password: user.password,
      }),
    })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          // Handle successful login here, e.g., update state, redirect, etc.
          // window.location.href = '/employee/dashboard';
        } else {
          // Handle login error here, e.g., show an error message
        }
        return res.json();
      })
      .then((data) => {
        // Handle data or error message from the server response
      })
      .catch((error) => {
        // Handle any network or fetch errors
        console.error("User update:", error);
      });
  };

  // Function to handle admin signup
  const handleAdminSignup = (user) => {
    fetch("http://127.0.0.1:5000/adminsignup", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        username: user.username,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        password: user.password,
      }),
    })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          // Handle successful login here, e.g., update state, redirect, etc.
          window.location.href = "/admin/dashboard";
        } else {
          // Handle login error here, e.g., show an error message
        }
        return res.json();
      })
      .then((data) => {
        // Handle data or error message from the server response
      })
      .catch((error) => {
        // Handle any network or fetch errors
        console.error("Login error:", error);
      });

    // posting for new user
    fetch("http://127.0.0.1:5000/users/1", {
      method: "PATCH",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        user: user.first_name,
        password: user.id,
      }),
    })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          // Handle successful login here, e.g., update state, redirect, etc.
          // window.location.href = '/employee/dashboard';
        } else {
          // Handle login error here, e.g., show an error message
        }
        return res.json();
      })
      .then((data) => {
        // Handle data or error message from the server response
      })
      .catch((error) => {
        // Handle any network or fetch errors
        console.error("User update:", error);
      });
  };

  // Function to handle user logout
  const handleLogout = () => {
    // Perform logout logic and reset the currentUser state
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/*" element={<AdminApp />} />
        <Route path="/employee/*" element={<EmployeeApp />} />
        {/* <Route
          path="/admin-login"
          element={<AdminLogIn onAdminLogin={handleAdminLogin} />}
        /> */}
        {/* <Route path="/admin-signup" element={<AdminSignUp />} /> */}
        {/* <Route
          path="/employee-login"
          element={<EmployeeLogIn onEmployeeLogin={handleEmployeeLogin} />}
        /> */}
        <Route path="/leave-requests" element={<LeaveRequestForm />} />
        <Route
          path="/admin-login"
          element={<AdminLogIn onAdminLogin={handleAdminLogin} />}
        />
        <Route
          path="/admin-signup"
          element={<AdminSignUp onAdminSignup={handleAdminSignup} />}
        />
        <Route
  path="/employee-login"
  element={<EmployeeLogIn onEmployeeLogin={handleEmployeeLogin} />}
/>
      </Routes>
    </Router>
  );
}

export default App;
