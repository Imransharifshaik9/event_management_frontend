import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const Registration = () => {
  const { eventId } = useParams();
  const { userId } = JSON.parse(localStorage.getItem('userSession'));
  const [registrationData, setRegistrationData] = useState({
    numberOfAdults: 1,
    numberOfChildren: 0,
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setRegistrationData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleRegister = () => {
    fetch(`http://localhost:8080/registrations/create/${eventId}/${userId}?numberOfAdults=${registrationData.numberOfAdults}&numberOfChildren=${registrationData.numberOfChildren}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to register');
        }
        return response.json();
      })
      .then(data => {
        console.log('Registration successful', data);
        // Redirect to myregistrations page after successful registration
        return <Link to={`/myregistrations`} />;
      })
      .catch(error => {
        console.error('Error registering:', error.message);
        alert('Error registering: ' + error.message);
      });
  };

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('userSession'); // Remove user session from localStorage
  };

  return (
    <div className="container mt-3">
      <h1 className="text-center mb-4">Registration Page</h1>
      <p>User ID: {userId}</p>
      <p>Event ID: {eventId}</p>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form>
            <div className="form-group">
              <label htmlFor="numberOfAdults">Number of Adults:</label>
              <input  
                type="number"
                name="numberOfAdults"
                value={registrationData.numberOfAdults}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="numberOfChildren">Number of Children:</label>
              <input
                type="number"
                name="numberOfChildren"
                value={registrationData.numberOfChildren}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <Link to={`/myregistrations`}>
              <button onClick={handleRegister} className="btn btn-primary">Register</button>
            </Link>
          </form>
        </div>
      </div>
      {/* Logout button */}
      <Link to="/user-login">
        <button onClick={handleLogout} className="btn btn-danger mt-3">Logout</button>
      </Link>
    </div>
  );
};

export default Registration;
