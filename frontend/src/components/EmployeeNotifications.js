import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EmployeeNotification() {
  const notification = () => toast("Your leave request has been sent.",{
    position: "bottom-left",
autoClose: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "dark",
  });

  return (
    <div>
      <button onClick={notification}>Notifications</button>
      <ToastContainer
position="bottom-left"
autoClose={false}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>
    </div>
  );
};



export default EmployeeNotification;