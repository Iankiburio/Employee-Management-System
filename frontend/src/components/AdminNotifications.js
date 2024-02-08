import React, { useState } from 'react';

function AdminNotification() {
  const [notifications, setNotifications] = useState([]);

  function addNotification (message){
    setNotifications(prevNotifications => [
      ...prevNotifications,
      {
        message,
        onClose: (index) => {
          const newNotifications = [...prevNotifications];
          newNotifications.splice(index, 1); // function to delete notifications from the app and also add new ones
          setNotifications(newNotifications);
        }
      }
    ]);
  };

  function Notification({ message, onClose }) {
    return (
      <div className="notification">
        <span>{message}</span>
        <button onClick={onClose}>x</button>
      </div>
    );
  }
  
  function NotificationContainer({ notifications }) {
    return (
      <div className="notification-container">
        {notifications.map((notification, index) => (
          <Notification
            key={index}
            message={notification.message}
            onClose={() => notification.onClose(index)}
            
          />
        ))}
      </div>
    );
  }

  return (
    <div className="App">
      <button onClick={() => addNotification("No notfication at the moment")}>
        Notifs
      </button>
      <NotificationContainer notifications={notifications} />
    </div>
  );
}

export default AdminNotification;