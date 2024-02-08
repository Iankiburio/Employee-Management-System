import React from 'react';
import '../css/employeecard.css';

const EmployeeCard = ({ employee }) => {
  return (
    <div className="employee-card">
      <img className='employee-icon' src={employee.gender} alt='Profile' />
      <div className="employee-details">
        <p>Name: {employee.first_name} {employee.last_name}</p>
        <p>Department: {employee.department}</p>
        <p>Role: {employee.role}</p>
        <p>Email: {employee.email}</p>
        <p>Password: {employee.password}</p>
        <p>Bank account: {employee.bank_account}</p>
        <p>Birth date: {employee.birth_date}</p>
        <p>Joining date: {employee.joining_date}</p>
        <p>Contact: {employee.contact}</p>
      </div>
    </div>
  );
};

export default EmployeeCard;
