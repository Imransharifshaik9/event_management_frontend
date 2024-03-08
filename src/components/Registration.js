import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Registration = () => {
  const { eventId } = useParams();
  const [registrationData, setRegistrationData] = useState({
    numberOfAdults: 1,
    numberOfChildren: 0,
    userId: '',
    eventId: eventId
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setRegistrationData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleRegistration = () => {
    // Send registrationData to the backend
    // You can use fetch or any other method to send data to the backend
    console.log('Registration Data:', registrationData);
    // Redirect to Events page after registration
    // In this case, you'll navigate by Link
  };

  return (
    <div className="container mt-3">
      <h1 className="text-center mb-4">Registration Page</h1>
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
            <Link to="/events" className="btn btn-primary" onClick={handleRegistration}>Register</Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Registration;
