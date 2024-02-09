// EmployeeForm.js
import React, { useState, useEffect } from 'react';
import '../css/employeeform.css';

const EmployeeProfileForm = ({user, onModify, onCloseForm }) => {

  const currentUser = user?.[0] || {};

  const [employeeData, setEmployeeData] = useState({
    first_name: currentUser.first_name,
    last_name: currentUser.last_name,
    email: currentUser.email,
    password:currentUser.password,
    department:currentUser.department,
    role:currentUser.role,
    bank_account: currentUser.bank_account,
    gender:currentUser.gender,
    joining_date: currentUser.joining_date,
    birth_date: currentUser.birth_date,
    contact: currentUser.contact,
  });

 let m = String(user.first_name)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({ ...employeeData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onModify(employeeData);
    // Reset the form fields if needed
  };

  return (
    <div className="employee-form-modal">
      <div className="modal-content">
        <h2>Modify Employee</h2>
        <form id='form' onSubmit={handleSubmit}>
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
              placeholder= {m}
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
              placeholder={employeeData.last_name}
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
              placeholder={employeeData.email}
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
              placeholder={employeeData.password}
            />
          </div>

          <div className="form-group">
            <label htmlFor="department">Department:</label>
            <input
              type="text"
              id="department"
              name="department"
              value={employeeData.department}
              onChange={handleChange}
              readOnly
              placeholder={employeeData.department}
            />
          </div>

          <div className="form-group">
            <label htmlFor="role">Role:</label>
            <input
              type="text"
              id="role"
              name="role"
              value={employeeData.role}
              onChange={handleChange}
              readOnly
              placeholder={employeeData.role}
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
              placeholder={employeeData.bank_account}
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
              placeholder={employeeData.gender}
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
              placeholder={employeeData.joining_date}
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
              placeholder={employeeData.birth_date}
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
              placeholder={employeeData.contact}
            />
          </div>

          <button className='button-submit' type="submit">Submit</button>

          </div>
        </form>
        <button className='button-delete' onClick={onCloseForm}>Close</button>
      </div>
    </div>
  );
};

export default EmployeeProfileForm;
