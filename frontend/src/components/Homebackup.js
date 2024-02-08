import React from 'react'
import '../css/home.css'
import { Link } from 'react-router-dom';


function Home(){

    return(
        <div className='home'>
            <div className='items'>
            <img src="https://thumbs.dreamstime.com/b/rainbow-paper-human-figures-white-table-lgbt-concept-rainbow-paper-human-figures-white-table-lgbt-concept-151328020.jpg" />
            <h1 className='title' style={{ color: 'black' }}>Employee Management System</h1>
            <div className='buttons'>
                <Link to="/admin-login" className='admin-button'>Admin</Link>
                <Link to="/employee-login" className='employee-button'>Employee</Link>
                </div>
                </div>
        </div>
    );
}

export default Home;