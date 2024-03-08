import React, { useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';

const UserRegistration = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newUser = { username, password, email, role };
      const response = await axios.post('http://localhost:8080/users', newUser);
      console.log(response.data);
      // Optionally, you can redirect the user to another page after successful registration
    } catch (error) {
      console.error('Error registering user:', error);
      // Handle errors here
    }
  };

  return (
    <div>
      <Navbar />
      <h1>User Registration Page</h1>
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <br />
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <br />
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <br />
        <label>Role:</label>
        <input type="text" value={role} onChange={(e) => setRole(e.target.value)} required />
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default UserRegistration;
