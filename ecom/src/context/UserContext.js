import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {

  const [useriD, setUseriD] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const updateData = (udata) => {
    setUseriD(udata.id);
  };

  const newUser = (ndata) => {
    const jsonData = JSON.stringify(ndata);

    fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonData,
    })
      .then((response) => {
        if (response.ok) {
          
          return response.json(); // Parse the response JSON if needed
        }
        throw new Error('Network response was not ok.');
      })
      .then((data) => {
        // Handle success (e.g., display a success message)
        console.log('User added successfully:', data);
      })
      .catch((error) => {
        // Handle errors (e.g., display an error message)
        console.error('Error adding user:', error);
      });
  };

  const updates = (udata) => {
    const jsonData = JSON.stringify(udata);
    console.log(udata);
    // Make an HTTP PUT request to update the user data
    fetch(`/api/users/${useriD}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonData,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then((data) => {
        setSuccessMessage('User data updated successfully');
      })
      .catch((error) => {
        setErrorMessage('Error updating user data');
        console.error('Error updating user data:', error);
      });
  };

  return (
    <UserContext.Provider value={{ updateData, newUser, updates, successMessage, errorMessage }}>
      {children}
    </UserContext.Provider>
  );
}
