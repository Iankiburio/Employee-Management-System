import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/login.css';
import Background from './Background';

function AdminSignUp() {
    const [username, setUsername] = useState('');
    const [firstname, setfirstname] = useState('');
    const [lastname, setlastname] = useState('');
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleFirstnameChange = (e) => {
        setfirstname(e.target.value);
    };

    const handleLastnameChange = (e) => {
        setlastname(e.target.value);
    };

    const handleemailChange = (e) => {
        setemail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSignUp = () => {
        // Handle sign-up logic here, e.g., send data to a server
    };

    return (
      <div className='login'>
        <Background/>
        <div className="signup-container">
            <h2>Sign up | Admin</h2>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" value={username} onChange={handleUsernameChange} />
            <label htmlFor="username">First Name:</label>
            <input type="text" id="firstname" value={firstname} onChange={handleFirstnameChange} />
            <label htmlFor="username">Last Name:</label>
            <input type="text" id="email" value={email} onChange={handleemailChange} />
            <label htmlFor="password">Email:</label>
            <input type="text" id="lastname" value={lastname} onChange={handleLastnameChange} />
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" value={password} onChange={handlePasswordChange} />
            <button onClick={handleSignUp}>Sign up</button>
        </div>
        </div>
    );
}

export default AdminSignUp;