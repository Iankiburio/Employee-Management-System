import React, {useEffect, useState} from 'react';
import Section from './Section';
import EmployeeForm from './EmployeeForm';
import EmployeeCard from './EmployeeCard';
import '../css/employeeform.css';

function Employees() {

  const [employees, setEmployees] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const createEmployee = (newEmployee) => {
    fetch('http://127.0.0.1:5000/employeesignup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEmployee),
    })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          // Handle successful creation
          window.location.href = '/admin/employees';
        } else {
          // Handle login error here, e.g., show an error message
        }
        return res.json();
      })
      .then(() => {

      })
      .catch((error) => {
        console.error('Error adding new employee:', error);
      });
  };

  const fetchEmployees = () => {
    fetch('http://127.0.0.1:5000/employees')
      .then((response) => response.json())
      .then((data) => {
        console.log('API Response:', data);
        setEmployees(data.employees); // Update the employees state with fetched data
      })
      .catch((error) => {
        console.error('Error fetching employees:', error);
      });
  };
  
  useEffect(()=>{
    fetchEmployees()
  },[]);

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
      <h1>Employees</h1>
      <div className='center-button'>
      <button className='button' onClick={openForm}>Create Employee</button></div>
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