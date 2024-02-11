import React from 'react';
import '../css/employeecard.css';

const AdminEmployeeCard = ({ employee, onDelete, onUpdate }) => {
  // Function to handle update button click
  const handleUpdateClick = () => {
    // Call the onUpdate callback function and pass the employee_id
    onUpdate(employee.id);
  };

  const handleDeleteClick = () => {
    // Call the onUpdate callback function and pass the employee_id
    console.log(employee.id);
    onDelete(employee.id);
  };

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
        <p>ID: {employee.id}</p>
      </div>
      <div className="employee-actions">
        <button className="update-button" onClick={handleUpdateClick}>Update</button>
        <button className="delete-button" onClick={handleDeleteClick}>Delete</button>
      </div>
    </div>
  );
};

export default AdminEmployeeCard;
