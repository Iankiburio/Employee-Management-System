import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function AdminNotification() {
  const notification = () => toast("A new leave request has been received from Lucy.");

  return (
    <div>
      <button onClick={notification}>Notifications</button>
      <ToastContainer />
    </div>
  );
};

export default AdminNotification;