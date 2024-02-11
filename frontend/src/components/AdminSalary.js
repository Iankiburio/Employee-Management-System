
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/AdminSalary.css'; // Import a CSS file for styling

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
      <h2>Employee Salary</h2>

      {/* Section for Employee Names with Payroll and Attendance Buttons */}
      <div>
        {employeeNames.length > 0 ? (
          <table className="employee-table">
            <thead>
              <tr>
                <th>Employee Name</th>
                <th>Payroll</th>
              </tr>
            </thead>
            <tbody>
              {employeeNames.map((employee) => (
                <tr key={employee.employee_id}>
                  <td>{employee.employee_name}</td>
                  <td>
                    <Link to={`/admin/payroll/${employee.employee_id}`}>
                      <button style={{ backgroundColor: '#30797e', color: 'white' }}>Payroll Information</button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No employee names available.</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
