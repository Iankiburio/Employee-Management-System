import React from 'react'
import '../css/navbar.css'

function NavBar(){

    return (
        <nav className="navbar">
            <div className="container-fluid">
                <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="admin/dashboard">Dashboard</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="admin/departments">Departments</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="admin/leave-type">Leave type</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="/employees">Employees</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="/salary">Salary</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="/leave-requests">Leave Requests</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="/report">Report</a>
                    </li>

                    <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="/"> Log out</a>
                    </li>  
                </ul>
                </div>
            </div>
            </nav>
    )
}

export default NavBar