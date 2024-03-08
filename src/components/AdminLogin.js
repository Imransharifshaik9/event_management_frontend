import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import AddEvent from './AddEvent'; // Import AddEvent component

const AdminLogin = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [authenticated, setAuthenticated] = useState(false); // State to track authentication

  // Check if the admin is already authenticated on component mount
  useEffect(() => {
    const adminSession = localStorage.getItem('adminSession');
    if (adminSession) {
      setAuthenticated(true);
      setName(adminSession);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/admins');
      if (!response.ok) {
        throw new Error('Failed to fetch admin data');
      }
      const adminData = await response.json();
      console.log('adminData:', adminData); // Log adminData for debugging purposes

      // Check if adminData is an array and not empty
      if (Array.isArray(adminData) && adminData.length > 0) {
        // Find admin data by name
        const admin = adminData.find(admin => admin.name === name);

        if (admin) {
          if (admin.password === password) {
            console.log("Login successful");
            setAuthenticated(true); // Set authenticated state to true upon successful login
            localStorage.setItem('adminSession', name); // Store the username in local storage
          } else {
            setError('Invalid name or password');
          }
        } else {
          setError('Admin not found');
        }
      } else {
        setError('No admin data found');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while logging in');
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    localStorage.removeItem('adminSession'); // Remove admin session data from local storage
  };

  return (
    <div>
      <Navbar />
      {authenticated ? (
        <div>
          <h1>Welcome, {name}!</h1>
          <button onClick={handleLogout}>Logout</button>
          <AddEvent />
        </div>
      ) : (
        <div>
          <h1>Admin Login Page</h1>
          <form onSubmit={handleLogin}>
            <div>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <div>{error}</div>}
            <button type="submit">Login</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminLogin;
