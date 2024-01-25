import React from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { useState } from 'react';
import user_icon from '../images/person.png';
import email_icon from '../images/email.png'; 
import password_icon from '../images/password.png'; 
import Notification from './Notification';
import '../css/loginsignup.css';


const LogIn = () => {
  const { role } = useParams();
  const { login } = useAuth();


    const [status, setStatus] = useState(null);
    const [msg, setMsg] = useState(null);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const handleLogin = (e) => {

      login({ role });
      e.preventDefault();

      console.log(username, password);
      fetch('', {
        method: 'POST',
        crossDomain: true,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      }).then((res) => {
        
        if (res.status === 200 || res.status === 201) {
          setStatus('success');
          window.location.href = '/';
        } else {
          setStatus('error');
        }
        return res.json();
    }).then((data) => {
      setMsg(data.msg);
    })

    fetch(``, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: username }),
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error updating adopted status:', error));
  };

  return (
    <div className='login'>
          <div className='container'>
      <div className="header">
        <div className="text">Login</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        
      <div className="input">
          <img src="{email_icon}" alt="" />
           <input type="username" placeholder="username" onChange={(e) => setUsername(e.target.value)}/>       
      </div>
      <div className="input">
          <img src="{password_icon}" alt="" />
           <input type="password" placeholder="Password"  onChange={(e) => setPassword(e.target.value)}/>       
      </div>
      </div>
      <div></div>:<div className="forgot-password">Lost Password? <span>Click Here!</span></div>
       

      <div className="submit-container">
        <div className="submit gray" onClick={handleLogin}>Login as {role}</div>

      </div>
      {status && <Notification status={status} msg={msg} />}
    </div>
    </div>
  );
};

export default LogIn;
