import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MyRegistrations = () => {
  const [registrations, setRegistrations] = useState([]);
  const { userId } = JSON.parse(localStorage.getItem('userSession')); // Assuming user ID is stored in 'userSession'

  useEffect(() => {
    fetch(`http://localhost:8080/reports/user/${userId}/registrations`)
      .then(response => response.json())
      .then(data => setRegistrations(data))
      .catch(error => console.error('Error fetching registrations:', error));
  }, [userId]);

  return (
    <div>
      <h2>Events Registered by User</h2>
      <ul>
        {registrations.map(registration => (
          <li key={registration.id}>
            <div>Event ID: {registration.event.id}</div>
            <div>Event Name: {registration.event.name}</div>
            {/* Add more event details as needed */}
            <Link to={`/payments/${registration.id}`}>Go to Payment</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyRegistrations;



