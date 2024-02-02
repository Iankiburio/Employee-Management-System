import React, {useState} from 'react';
import Section from './Section';
import EmployeeForm from './EmployeeForm';
import EmployeeCard from './EmployeeCard';

function Employees() {

  const [employees, setEmployees] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const createEmployee = (newEmployee) => {
    setEmployees([...employees, newEmployee]);
  };

  const openForm = () => {
    setIsFormVisible(true);
  };

  const closeForm = () => {
    setIsFormVisible(false);
  };


  return (
    <Section>
        {
          <div>
      <h1>Employee Dashboard</h1>
      <button onClick={openForm}>Create Employee</button>
      <div className="employee-list">
        {employees.map((employee, index) => (
          <EmployeeCard key={index} employee={employee} />
        ))}
      </div>
      {isFormVisible && (
        <EmployeeForm onCreateEmployee={createEmployee} onCloseForm={closeForm} />
      )}
    </div> }
    </Section>
  );
}

export default Employees;