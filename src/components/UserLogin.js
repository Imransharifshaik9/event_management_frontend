import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import MyEvents from './MyEvents'; // Import MyEvents component

const UserLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [authenticated, setAuthenticated] = useState(false); // State to track authentication

  // Check if the user is already authenticated on component mount
  useEffect(() => {
    const userSession = localStorage.getItem('userSession');
    if (userSession) {
      setAuthenticated(true);
      setUsername(userSession);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/users');
      const userData = await response.json();

      // Find user data by username
      const user = userData.find(user => user.username === username);

      if (user && user.password === password) {
        console.log("Login successful");
        setAuthenticated(true); // Set authenticated state to true upon successful login
        localStorage.setItem('userSession', username); // Store the username in local storage
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while logging in');
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    localStorage.removeItem('userSession'); // Remove user session data from local storage
  };

  return (
    <div>
      <Navbar />
      {authenticated ? ( // Render MyEvents component if authenticated
        <div>
          <h1>Welcome, {username}!</h1>
          <button onClick={handleLogout}>Logout</button>
          <MyEvents username={username} />
        </div>
      ) : (
        <div>
          <h1>User Login Page</h1>
          <form onSubmit={handleLogin}>
            <div>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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

export default UserLogin;
