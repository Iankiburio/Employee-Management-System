import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
    <div>
      <h2>Admin Dashboard</h2>

      {/* Section for Employee Names with Payroll and Attendance Buttons */}
      <div>
        <h3>Employee Names</h3>
        {employeeNames.length > 0 ? (
          <ol>
            {employeeNames.map((employee) => (
              <li key={employee.employee_id}>
                {employee.employee_name}{' '}
                <Link to={`/admin/payroll/${employee.employee_id}`}>
                  <button>Payroll</button>
                </Link>{' '}
                <Link to={`/admin/attendance/${employee.employee_id}`}>
                  <button>Attendance</button>
                </Link>
              </li>
            ))}
          </ol>
        ) : (
          <p>No employee names available.</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
