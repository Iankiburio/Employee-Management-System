import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../css/navbar.css';

function EmployeeNavbar() {
  return (
    <nav className="navbar">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/employee/dashboard" className="nav-link active">Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link to="/employee/my-profile" className="nav-link active">My profile</Link>
            </li>
            <li className="nav-item">
              <Link to="/employee/leave-requests" className="nav-link active">Leave requests</Link>
            </li>
            <li className="nav-item">
              <Link to="/employee/calendar" className="nav-link active">Calendar</Link>
            </li>
            <li className="nav-item">
              <Link to="/employee/salary" className="nav-link active">Salary</Link>
            </li>
            <li className="nav-item">
              <Link to="/employee/communication" className="nav-link active">HR communication</Link>
            </li>
            <li className="nav-item">
              <Link to="/employee/notifications" className="nav-link active">Notifications</Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/logout" className="nav-link active">Log out</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default EmployeeNavbar;

