import React, {useState, useEffect} from 'react';
import Section from './Section';
import EmployeeProfileForm from './EmployeeProfileForm';
import EmployeeCard from './EmployeeCard';

function EmployeeProfile({currentUser}) {

  const [isFormVisible, setIsFormVisible] = useState(false);

  const [employees, setEmployees] = useState([]);

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
  
  let user = employees.filter(employees => employees.first_name===currentUser);


  const modifyEmployee = (newEmployee) => {
    fetch(`http://127.0.0.1:5000/employees/${user[0].id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEmployee),
    })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          // Handle successful creation
          window.location.href = '/employee/my-profile';
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

  const openForm = () => {
    setIsFormVisible(true);
  };

  const closeForm = () => {
    setIsFormVisible(false);
  };

  console.log(user)

  return (
    <Section>
        {
            <div className='profile'>
        <p style={{ textAlign: 'center', fontSize: '30px', margin: '0 auto' }}> Employee profile</p>
        <button className='button' onClick={openForm}>Modify Employee</button>
        <div className="employee-list">
        {user.map((employee, index) => (
          <EmployeeCard key={index} employee={employee} />
        ))}
      </div>
      {isFormVisible && (
        <EmployeeProfileForm onModify={modifyEmployee} user={user} onCloseForm={closeForm}/>
      )}
        </div> 
        }
    </Section>
  );
}

export default EmployeeProfile;