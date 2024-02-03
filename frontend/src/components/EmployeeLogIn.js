import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/login.css";
import Background from "./Background";

function EmployeeLogIn({ onEmployeeLogin }) {
  const [first_name, setFirstname] = useState("");
  const [last_name, setLastname] = useState("");
  const [password, setPassword] = useState("");

  const [status, setStatus] = useState(null);
  const [msg, setMsg] = useState(null);

  const handleFirstnameChange = (e) => {
    setFirstname(e.target.value);
  };

  const handleLastnameChange = (e) => {
    setLastname(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const user = {
      first_name,
      last_name,
      password,
    };

    onEmployeeLogin(user);
  };

  return (
    <div className="login">
      <Background />
      <div className="signup-container">
        <h2>Log in | Employee</h2>
        <label htmlFor="username">First name:</label>
        <input
          type="text"
          id="first_name"
          value={first_name}
          onChange={handleFirstnameChange}
        />
        <label htmlFor="username">Last name:</label>
        <input
          type="text"
          id="second_name"
          value={last_name}
          onChange={handleLastnameChange}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button onClick={handleLogin}>Log in</button>
      </div>
    </div>
  );
}

export default EmployeeLogIn;
