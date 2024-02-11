import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "../css/salary.css";
import Section from './Section';

const AdminDashboard = () => {
  const [employeeNames, setEmployeeNames] = useState([]);

  useEffect(() => {
    // Fetch employee names
    axios.get('http://localhost:5000/admin/get_all_employees')
      .then(response => {
        const namesArray = Array.isArray(response.data.employee_names) ? response.data.employee_names : [];

        console.log('Employee Names:', namesArray);

        if (namesArray.length === 0) {
          console.warn('No employee names found.');
        }

        setEmployeeNames(namesArray);
      })
      .catch(error => {
        console.error('Error fetching employee names:', error);
      });
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <Section>
    <div className='salary-section'>
      <h2>Employee Salary</h2>

      {/* Section for Employee Names with Payroll and Attendance Buttons */}
      <div className="salary-list">
        {employeeNames.length > 0 ? (
          employeeNames.map((employee) => (
            <div className="salary-card" key={employee.employee_id}>
              <div className="employee-name">{employee.employee_name}</div>
              <Link to={`/admin/payroll/${employee.employee_id}`}>
                <button className="payroll-button">Payroll Information</button>
              </Link>
            </div>
          ))
        ) : (
          <p>No employee names available.</p>
        )}
      </div>
    </div>
    </Section>
  );
};

export default AdminDashboard;
