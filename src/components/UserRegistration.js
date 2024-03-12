import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Navbar from './Navbar';
import axios from 'axios';
import userRegistrationImage from '../Images/userregistration.png'


const UserRegistration = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newUser = { username, password, email };
      const response = await axios.post('http://localhost:8080/users', newUser);
      console.log(response.data);
      alert('User registered successfully!');
      
      // Redirect to login page after successful registration
      navigate('/user-login');
    } catch (error) {
      console.error('Error registering user:', error);
      // Handle errors here
    }
  };

  return (
    <div className="container"  style={{ backgroundImage: `url(${userRegistrationImage})`, backgroundSize: 'cover', height: '100vh' }}>
      <Navbar />
      <div className="row justify-content-center mt-5">
        <div className="col-lg-6">
          <div className="card shadow-lg">
            <div className="card-header bg-primary text-white">
              <h3 className="card-title mb-0">User Registration</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Username:</label>
                  <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Password:</label>
                  <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Email:</label>
                  <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Register</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegistration;
