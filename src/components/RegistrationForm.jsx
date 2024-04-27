// RegistrationForm.js
import React, { useState } from 'react';

const RegistrationForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
   
  });

  const [registrationStatus, setRegistrationStatus] = useState({
    success: false,
    error: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5003/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      if (response.ok) {
        setRegistrationStatus({ success: true, error: null });
        console.log('Registration successful!');
        onSubmit(formData);
        // Display success message to the user
        alert('Registration successful! Please proceed to login.');
      } else {
        setRegistrationStatus({ success: false, error: responseData.error || 'Unknown error' });
        console.error('Registration failed:', responseData);

        // Check if the error is due to incorrect password
        if (responseData.error === 'IncorrectPassword') {
          alert('Incorrect password. Please check your password and try again.');
        } else {
          // Handle other types of errors or display a generic error message
          alert('Registration failed. Please try again.');
        }
      }
    } catch (error) {
      setRegistrationStatus({ success: false, error: 'Unexpected error' });
      console.error('An unexpected error occurred:', error);
      // Handle unexpected errors (e.g., network issues, server not reachable)
      alert('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <div className="registration-form-container">
      <h1>Register</h1>
      {registrationStatus.success && <p className="success-message">Registration successful! Please proceed to login.</p>}
      
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            autoComplete="username"
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            autoComplete="email"
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            autoComplete="current-password"
          />
        </label>
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;





