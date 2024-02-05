import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EmployeeNotification() {
  const notification = () => toast("Your leave request has been sent.");

  return (
    <div>
      <button onClick={notification}>Notifications</button>
      <ToastContainer />
    </div>
  );
};



export default EmployeeNotification;