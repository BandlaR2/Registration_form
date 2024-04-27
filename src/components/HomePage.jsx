// src/components/HomePage.jsx

import React from 'react';


const HomePage = ({ username, onLogout }) => {
  console.log('username in HomePage:', username);
  return (
    <div className="container"> {/* Apply the 'container' class */}
      <h2>Welcome, {username}!</h2>
      
    </div>
  );
};

export default HomePage;
