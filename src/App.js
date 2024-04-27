import React, { useState } from 'react';
import RegistrationForm from './components/RegistrationForm';
import Login from './components/Login';
import HomePage from './components/HomePage';
import Logout from './components/Logout';

import './App.css'; // Import the CSS file

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLogin = (user) => {
    console.log('User from handleLogin:', user); 
    setLoggedInUser(user);
  };

  const handleRegistration = (user) => {
    // Handle registration logic if needed
    console.log('Registration successful:', user);
  };

  const handleLogout = () => {
    // Clear the logged-in user state
    setLoggedInUser(null);

    // Additional logic for logout if needed
    console.log('Logout successful');
  };

  return (
    <div className="container">
      {loggedInUser ? (
        <div>
          {/* Home Component */}
          <HomePage user={loggedInUser.user} onLogout={handleLogout} />
          <Logout onLogout={handleLogout} />
        </div>
      ) : (
        <div className="form-wrapper">
          <div className="form-container">
            <h1>User Authentication</h1>
            <h2>Login</h2>
            <Login onLogin={handleLogin} />
          </div>
          <div className="form-container">
            <h2>Register</h2>
            <RegistrationForm onSubmit={handleRegistration} />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;










