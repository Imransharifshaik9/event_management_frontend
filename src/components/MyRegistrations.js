import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MyRegistrations = () => {
  const [registrations, setRegistrations] = useState([]);
  const { userId } = JSON.parse(localStorage.getItem('userSession')); // Assuming user ID is stored in 'userSession'

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const response = await fetch(`http://localhost:8080/reports/user/${userId}/registrations`);
        const data = await response.json();
        const updatedRegistrations = await Promise.all(data.map(async registration => {
          const paymentResponse = await fetch(`http://localhost:8080/registrations/${registration.id}`);
          const paymentData = await paymentResponse.json();
          return {
            ...registration,
            paymentStatus: paymentData.paymentstatus // Adjusted key to match response
          };
        }));
        setRegistrations(updatedRegistrations);
      } catch (error) {
        console.error('Error fetching registrations:', error);
      }
    };
    fetchRegistrations();
  }, [userId]);

  return (
    <div className="container">
      <h2 className="mt-4 mb-3">Events Registered by User</h2>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {registrations.map(registration => (
          <div key={registration.id} className="col">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Event ID: {registration.event.id}</h5>
                <p className="card-text">Event Name: {registration.event.name}</p>
                <p className="card-text">Event Description: {registration.event.description}</p>
                <p className="card-text">Start Date: {registration.event.startDate}</p>
                <p className="card-text">End Date: {registration.event.endDate}</p>
                <p className="card-text">Entry Fee: ${registration.event.entryFee}</p>
                {registration.paymentStatus ? (
                  <p className="card-text text-success">Payment Done <span role="img" aria-label="Paid">💳</span></p>
                ) : (
                  <div>
                    <Link to={`/payments/${registration.id}`} className="btn btn-primary mr-2">Go to Payment</Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <Link to="/user-login" className="btn btn-secondary">Back to Login</Link>
    </div>
  );
}

export default MyRegistrations;
