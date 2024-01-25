// Signup.js

import React from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const SignUp = () => {
  const { role } = useParams();
  const { login } = useAuth();

  const handleSignup = () => {
    // Simulate signup logic and update context
    login({ role });
  };

  return (
    <div>
      <h2>Sign Up as {role}</h2>
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
};

export default SignUp;
