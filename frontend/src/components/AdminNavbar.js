import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "../css/navbar.css";

function AdminNavbar() {
  return (
    <nav className="navbar">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/admin/dashboard" className="nav-link active">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/leave-type" className="nav-link active">
                Leave Type
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/leave-requests" className="nav-link active">
                Leave Requests
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/employees" className="nav-link active">
                Employees
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/salary" className="nav-link active">
                Salary
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/admin/report" className="nav-link active">
                Report
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/notifications" className="nav-link active">
                Notifications
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/communication" className="nav-link active">HR communication</Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/logout" className="nav-link active">
                Log out
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default AdminNavbar;
