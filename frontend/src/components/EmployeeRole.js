import React from 'react';
import { Link } from 'react-router-dom';

const EmployeeRole = () => {
  return (
    <div>
      <h2>Login</h2>
      <Link to="/login/employee">Login as Employee</Link>
    </div>
  );
};

export default EmployeeRole;