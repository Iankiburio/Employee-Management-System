import React, {useEffect, useState} from 'react';
import Section from './Section';
import '../css/admindashboard.css'

function AdminDashboard() {

  const [employees, setEmployees] = useState([]);
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]);

  const fetchEmployees = () => {
    fetch('http://127.0.0.1:5000/employees')
      .then((response) => response.json())
      .then((data) => {
        console.log('API Response:', data);
        setEmployees(data.employees); // Update the employees state with fetched data
      })
      .catch((error) => {
        console.error('Error fetching employees:', error);
      });
  };

  const fetchLeaveTypes = () => {
    fetch('http://127.0.0.1:5000/leave-types')
      .then((response) => response.json())
      .then((data) => {
        console.log('API Response:', data);
        setLeaveTypes(data.leave_types);
      })
      .catch((error) => {
        console.error('Error fetching employees:', error);
      });
  };

  const fetchLeaveRequests = () => {
    fetch('http://127.0.0.1:5000/leave-requests')
      .then((response) => response.json())
      .then((data) => {
        console.log('API Response:', data);
        setLeaveRequests(data.leave_requests);
      })
      .catch((error) => {
        console.error('Error fetching employees:', error);
      });
  };
  
  useEffect(()=>{
    fetchEmployees()
    fetchLeaveTypes()
    fetchLeaveRequests()
  },[]);

  let number = employees.length;
  let leaves = leaveTypes.length;
  let leaves_requests = leaveRequests.length;

  let approved = (leaveRequests.filter(approved => approved.action==='approve')).length;  
  let rejected = (leaveRequests.filter(rejected => rejected.action==='reject')).length; 
  let open = (leaveRequests.filter(rejected => rejected.status==='open')).length; 

  function countUniqueValuesByKey(employees, key) {
    const uniqueValues = new Set();
  
    employees.forEach(employee => {
      if (employee[key]) {
        uniqueValues.add(employee[key]);
      }
    });
  
    return uniqueValues.size;
  }
  
  // Example usage to get the count of unique departments
  const uniqueDepartmentsCount = countUniqueValuesByKey(employees, 'department');

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
              <h2>{number}</h2>
            </div>
          </div>
          <div className="card">
            <i className="fas fa-building"></i> {/* Replace with your icon */}
            <div className="card-content">
              <p>Listed Departments</p>
              <h2>{uniqueDepartmentsCount}</h2>
            </div>
          </div>
          <div className="card">
            <i className="fas fa-calendar-alt"></i> {/* Replace with your icon */}
            <div className="card-content">
              <p>Listed Leave Types</p>
              <h2>{leaves}</h2>
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
              <h2>{leaves_requests}</h2>
            </div>
          </div>
          <div className="card">
            <div className="card-content">
              <p>Rejected Leaves</p>
              <h2>{rejected}</h2>
            </div>
          </div>
          <div className="card">
            <div className="card-content">
              <p>New Leave Requests</p>
              <h2>{open}</h2>
            </div>
          </div>
          <div className="card">
            <div className="card-content">
              <p>Approved Leave</p>
              <h2>{approved}</h2>
            </div>
          </div>
        </div>
      </div> }
    </Section>
  );
}

export default AdminDashboard;