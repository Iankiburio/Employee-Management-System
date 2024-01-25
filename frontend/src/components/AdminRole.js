import React from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import '../css/loginsignup.css';
import user_icon from '../images/person.png';
import email_icon from '../images/email.png'; 
import password_icon from '../images/password.png'; 
import Notification from './Notification';

const AdminRole = () => {

  const { role } = useParams();
  const { login } = useAuth();

const [age, setAge] = useState('');
  const [imageurl, setImageUrl] = useState('');
  const [pets, setPets] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  
  const [status, setStatus] = useState(null);
  const [msg, setMsg] = useState(null);

  const handleSubmit = (e) => {
    login({ role });
    e.preventDefault();
    console.log(email,email, password);
    fetch('', {
      method: 'POST',
      crossDomain: true,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({

      }),
    }).then((res) => {
      
      if (res.status === 200 || res.status === 201) {
        setStatus('success');
        window.location.href = '/LogIn';
      } else {
        setStatus('error');
      }

      return res.json();
    }).then((data) => {
      setMsg(data.msg);
    })
  }


  return (
    <div className='login'>
    <div className='container'>
      <div className="header">
        <div className="text">Signup</div>
        <div className="underline"></div>
      </div>
       <div className="inputs">
        <div className="input">
          <img src="" alt="" />
           <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
        </div>
      </div>
      
      <div className="input">
          <img src="" alt="" />
           <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>       
      </div>
      <div className="input">
          <img src="" alt="" />
           <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>       
      </div>
      <div className="input">
          <img src={""} alt="" />
           <input type="text" placeholder="Link to profile picture" onChange={(e) => setImageUrl(e.target.value)}/>       
      </div>
    
      <div className="forgot-password">Lost Password? <span>Click Here!</span></div>
       

      <div className="submit-container">
        <div className="submit gray" onClick={handleSubmit} >Sign up as {role}</div>
      </div>
      {status && <Notification status={status} msg={msg} />}

      </div>
    </div>
  );
};

export default AdminRole;
