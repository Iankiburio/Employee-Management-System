import React from 'react'
import '../css/loginsection.css'
import photo from './photo.png'
import { Link } from 'react-router-dom';

function LoginSection(){

    return(
<section id="login" className="login-section"> 
            <div className="login-details">
            <h1 className='title' style={{ color: 'black' }}>Please pick a role</h1>
            <div className='buttons'>
                <Link to="/admin-login" className='admin-button'>Admin</Link>
                <Link to="/employee-login" className='employee-button'>Employee</Link>
                </div>
            </div>
            <div className="login-image">
              <img src={photo} alt="Placecard" />
            </div>
          </section>
    );
}

export default LoginSection;