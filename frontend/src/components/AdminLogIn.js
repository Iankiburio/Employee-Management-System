import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/login.css';
import Background from './Background';

function AdminLogIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = () => {
        // Handle sign-up logic here, e.g., send data to a server
    };

    return (
      <div className='login'>
        <Background/>
        <div className="signup-container">
            <h2>Log in | Admin</h2>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" value={username} onChange={handleUsernameChange} />
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" value={password} onChange={handlePasswordChange} />
            {/*<button onClick={handleLogin}>Log in</button>*/}
            <Link to="/admin/dashboard">Log In</Link>
            <Link to="/admin-signup">Sign Up</Link>
        </div>
        </div>
    );
}

export default AdminLogIn;