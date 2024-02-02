import React from 'react';

const EmployeeCard = ({ employee }) => {
  return (
    <div className="employee-card">
      <div className="employee-icon">Employee Icon</div>
      <div className="employee-details">
        <p>Name: {employee.firstName} {employee.lastName}</p>
        <p>Department: {employee.department}</p>
      </div>
    </div>
  );
};

export default EmployeeCard;
