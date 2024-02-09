// EmployeeForm.js
import React, { useState } from 'react';
import '../css/employeeform.css';

const EmployeeProfileForm2 = ({ user, onModify, onCloseForm2 }) => {
    const [employeeData, setEmployeeData] = useState({
      first_name: user?.first_name || '',
      last_name: user?.last_name || '',
      email: user?.email || '',
      password: user?.password || '',
      department: user?.department || '',
      role: user?.role || '',
      bank_account: user?.bank_account || '',
      gender: user?.gender || '',
      joining_date: user?.joining_date || '',
      birth_date: user?.birth_date || '',
      contact: user?.contact || '',
      id: user?.id || '',
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setEmployeeData({ ...employeeData, [name]: value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(employeeData.id)
      onModify(employeeData); // Pass the updated employee data array to onModify
      // Reset the form fields if needed
      
    };

  return (
    <div className="employee-form-modal">
      <div className="modal-content">
        <h2>Modify Employee</h2>
        <form id="form" onSubmit={handleSubmit}>
          <div className="left">
            <div className="form-group">
              <label htmlFor="first_name">First Name:</label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={employeeData.first_name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="last_name">Last Name:</label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={employeeData.last_name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={employeeData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="text"
                id="password"
                name="password"
                value={employeeData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="department">Department:</label>
              <input
                type="text"
                id="admin-department"
                name="department"
                value={employeeData.department}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="role">Role:</label>
              <input
                type="text"
                id="admin-role"
                name="role"
                value={employeeData.role}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="right">
            <div className="form-group">
              <label htmlFor="bank_account">Bank Account:</label>
              <input
                type="text"
                id="bank_account"
                name="bank_account"
                value={employeeData.bank_account}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="gender">Picture url:</label>
              <input
                type="text"
                id="gender"
                name="gender"
                value={employeeData.gender}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="joining_date">Joining Date:</label>
              <input
                type="date"
                id="joining_date"
                name="joining_date"
                value={employeeData.joining_date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="birth_date">Birth Date:</label>
              <input
                type="date"
                id="birth_date"
                name="birth_date"
                value={employeeData.birth_date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact">Contact:</label>
              <input
                type="text"
                id="contact"
                name="contact"
                value={employeeData.contact}
                onChange={handleChange}
                required
              />
            </div>

            <button className="button-submit" onClick={handleSubmit} type="submit">
              Submit
            </button>
          </div>
        </form>
        <button className="button-delete" onClick={onCloseForm2}>
          Close
        </button>
      </div>
    </div>
  );
};

export default EmployeeProfileForm2;
