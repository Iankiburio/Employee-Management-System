import React, {useEffect, useState} from 'react';
import Section from './Section';
import EmployeeForm from './EmployeeForm';
import AdminEmployeeCard from './AdminEmployeeCard';
import '../css/employeeform.css';
import EmployeeProfileForm from './EmployeeProfileForm';

function Employees() {

  const [employees, setEmployees] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isFormVisible2, setIsFormVisible2] = useState(false);

  // Callback function for deleting an employee
const handleDeleteEmployee = (id) => {
  // Send a DELETE request to the server to delete the employee with the given ID
  fetch(`http://127.0.0.1:5000/employees/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      // Add any other headers as needed
    },
  })
  .then(response => {
    if (response.ok) {
      console.log(`Employee with ID ${id} deleted successfully`);
      // If deletion was successful, update the state to reflect the change
      setEmployees(prevEmployees => prevEmployees.filter(employee => employee.id !== id));
    } else {
      console.error(`Failed to delete employee with ID ${id}`);
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
};


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
  

  const modifyEmployee = (employee) => {
    fetch(`http://127.0.0.1:5000/employees/${employee.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employee),
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

  const [employee_id, setId] = useState("");

  const updateEmployeeUnderModification = (employee) => {
    fetch("http://127.0.0.1:5000/users/1", {
    method: "PATCH",
    crossDomain: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      password: employee.id,
    }),
  })
    .then((res) => {
      if (res.status === 200 || res.status === 201) {
        // Handle successful login here, e.g., update state, redirect, etc.
        window.location.href = '/admin/employees';
        setId(employee.id)
        console.log(employee.id)
      } else {
        // Handle login error here, e.g., show an error message
      }
      return res.json();
    })
    .then((data) => {
      // Handle data or error message from the server response
    })
    .catch((error) => {
      // Handle any network or fetch errors
      console.error("User update:", error);
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

  const openForm2 = (employee) => {
    setIsFormVisible2(true);
    updateEmployeeUnderModification(employee);

  };

  const closeForm2 = () => {
    setIsFormVisible2(false);
  };

  let user = employees.filter(employees => employees.id===employee_id);

  return (
    <Section>
        {
          <div>
      <h1>Employees</h1>
      <div className='center-button'>
      <button className='button-employee' onClick={openForm}>Create Employee</button></div>
      <div className="employee-list">
        {employees.map((employee, index) => (
          <AdminEmployeeCard 
          key={index} 
          employee={employee}           
          onDelete={handleDeleteEmployee} 
          onUpdate={openForm2}/>
        ))}
      </div>
      {isFormVisible && (
        <EmployeeForm onCreateEmployee={createEmployee} onCloseForm={closeForm} />
      )}
      {isFormVisible2 && (
        <EmployeeProfileForm onModify={modifyEmployee} user={user} onCloseForm2={closeForm2}/>
      )}
    </div> }
    </Section>
  );
}

export default Employees;