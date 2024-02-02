import React from 'react';
import Section from './Section';
import '../css/admindashboard.css'

function AdminDashboard() {
  return (
    <Section>
        {
        <div className="admin-dashboard">
        {/* Top Section */}
        <div className="top-section">
          <div className="card">
            <i className="fas fa-users"></i> {/* Replace with your icon */}
            <div className="card-content">
              <p>Total Employees</p>
              <h2>100</h2>
            </div>
          </div>
          <div className="card">
            <i className="fas fa-building"></i> {/* Replace with your icon */}
            <div className="card-content">
              <p>Listed Departments</p>
              <h2>10</h2>
            </div>
          </div>
          <div className="card">
            <i className="fas fa-calendar-alt"></i> {/* Replace with your icon */}
            <div className="card-content">
              <p>Listed Leave Types</p>
              <h2>5</h2>
            </div>
          </div>
        </div>
  
        {/* Middle Section */}
        <div className="middle-section">
          <h2>LEAVE DETAILS</h2>
          <div className="line"></div>
        </div>
  
        {/* Bottom Section */}
        <div className="bottom-section">
          <div className="card">
            <div className="card-content">
              <p>Leaves Applied</p>
              <h2>50</h2>
            </div>
          </div>
          <div className="card">
            <div className="card-content">
              <p>Rejected Leaves</p>
              <h2>5</h2>
            </div>
          </div>
          <div className="card">
            <div className="card-content">
              <p>New Leave Requests</p>
              <h2>10</h2>
            </div>
          </div>
          <div className="card">
            <div className="card-content">
              <p>Approved Leave</p>
              <h2>35</h2>
            </div>
          </div>
        </div>
      </div> }
    </Section>
  );
}

export default AdminDashboard;