import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "../css/login.css";
import Background from "./Background";

import useaxios from "../hooks/useaxios";

import AppContext from "../Provider/AppContext";

import { useNavigate } from "react-router-dom";

function AdminLogIn() {
  const [first_name, setFirstname] = useState("");
  const [last_name, setLastname] = useState("");
  const [password, setPassword] = useState("");

  const [status, setStatus] = useState(null);
  const [msg, setMsg] = useState(null);

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

  const handleLogin = (e) => {
    e.preventDefault();

    const user = {
      first_name,
      last_name,
      password,
    };

    userLogin(user);
  };

  async function userLogin(data) {
    let res = await request({
      method: "POST",
      url: "adminlogin",
      body: data,
    });

    if (res === "error") {
      return;
    }

    setUser(res);
    navigate("/admin/dashboard");
  }

  return (
    <div className="login">
      <Background />
      <div className="signup-container">
        <h2>Log in | Admin</h2>
        <label htmlFor="username">First name:</label>
        <input
          type="text"
          id="username"
          value={first_name}
          onChange={handleFirstnameChange}
        />
        <label htmlFor="username">Last name:</label>
        <input
          type="text"
          id="username"
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
        <div>
        <button onClick={handleLogin}>Log in</button>
        <Link to="/admin-signup">Sign Up</Link>
      </div>
      </div>
    </div>
  );
}

export default AdminLogIn;
