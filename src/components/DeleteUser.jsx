import React, { useState } from 'react';

const DeleteUser = () => {
  const [userIdToDelete] = useState(1); // Replace with the actual ID of the user you want to delete

  const handleDeleteUser = () => {
    fetch(`http://localhost:5003/users/${userIdToDelete}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // You may need to include additional headers such as authentication headers if required by your backend
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('User deleted successfully:', data);
        // You can handle the success response here, such as updating the UI
      })
      .catch(error => {
        console.error('Error deleting user:', error);
        // Handle the error here, such as displaying an error message to the user
      });
  };

  return (
    <div>
      <button onClick={handleDeleteUser}>Delete User</button>
    </div>
  );
};

export default DeleteUser;

