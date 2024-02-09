import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "../css/login.css";
import Background from "./Background";

import AppContext from "../Provider/AppContext";
import useaxios from "../hooks/useaxios";
import { useNavigate } from "react-router-dom";

function EmployeeLogIn({ onEmployeeLogin }) {
  const [first_name, setFirstname] = useState("");
  const [last_name, setLastname] = useState("");
  const [password, setPassword] = useState("");

  const { setUser } = useContext(AppContext);
  const navigate = useNavigate();
  const request = useaxios();

  const handleFirstnameChange = (e) => {
    setFirstname(e.target.value);
  };

  const handleLastnameChange = (e) => {
    setLastname(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const user = {
      first_name,
      last_name,
      password,
    };

    const res = await userLogin(user);

    if (res && res !== "error") {
      onEmployeeLogin(user); // Calling the callback function
      navigate("/employee/dashboard");
    }
  };

  async function userLogin(data) {
    let res = await request({
      method: "POST",
      url: "employeelogin",
      body: data,
    });

    if (res === "error") {
      return;
    }

    setUser(res);
    return res;
  }

  return (
    <div className="login">
      <Background />
      <div className="signup-container">
        <h2>Log in | Employee</h2>
        <div>
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
        </div>
        <button onClick={handleLogin}>Log in</button>
      </div>
    </div>
  );
}

export default EmployeeLogIn;
