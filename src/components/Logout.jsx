// Logout.jsx

import React from 'react';

const Logout = ({ onLogout }) => {
  const handleLogout = async () => {
    try {
      // Perform any necessary logout logic here

      // For simplicity, just call the onLogout callback
      onLogout();

      // Redirect to the register page after logout
      window.location.href = '/register';
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;


