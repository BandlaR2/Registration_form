// src/components/RegistrationForm.jsx
import React, { useState } from 'react';

const RegistrationForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

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
        console.log('Registration successful!');
        onSubmit(formData);
      } else {
        console.error('Registration failed:', responseData);
  
        // Check if the error is due to incorrect password
        if (responseData.error === 'IncorrectPassword') {
          alert('Incorrect password. Please check your password and try again.');
        } else {
          // Handle other types of errors or display a generic error message
          alert('Registration failed. Please try again .');
        }
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
      // Handle unexpected errors (e.g., network issues, server not reachable)
      alert('An unexpected error occurred. Please try again later.');
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      {/* Your form fields */}
      <label>
        Username:
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
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
          onChange={handleChange}
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
          onChange={handleChange}
          autoComplete="current-password"
        />
      </label>
      <br />

      {/* Submit button */}
      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;
