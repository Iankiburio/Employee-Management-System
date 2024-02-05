import '../css/header.css';
import React from 'react';

function Header({ currentUser }) {
  return (
    <header className="header">
      <div className="logo">
        <p>EMS</p>
      </div>
      <div className="user-info">
        <p>Welcome, {currentUser}</p>
      </div>
    </header>
  );
}

export default Header;