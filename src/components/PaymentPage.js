import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import QRCode from 'qrcode.react';

const PaymentPage = () => {
  const { registrationId } = useParams();
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentMessage, setPaymentMessage] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [qrCodeData, setQRCodeData] = useState('');
  const [registrationDetails, setRegistrationDetails] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchRegistrationDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/registrations/${registrationId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch registration details');
        }
        const data = await response.json();
        setRegistrationDetails(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRegistrationDetails(); // Call the function inside useEffect

    // Disable the eslint warning for missing dependency
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registrationId]);

  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8080/payments/makePayment/${registrationId}?paymentMethod=${paymentMethod}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const data = await response.text(); // Get response as text
        if (data.includes('successful')) {
          setPaymentMessage(data);
          const startIndex = data.indexOf('$') + 1;
          const endIndex = data.indexOf(' successful');
          const amount = data.substring(startIndex, endIndex);
          setPaymentAmount(amount);
          const qrCodeData = data.substring(data.lastIndexOf('QR Code: ') + 9);
          setQRCodeData(qrCodeData);
        } else {
          setPaymentMessage('Payment failed');
        }
      } else {
        setPaymentMessage('Payment failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setPaymentMessage('An error occurred while processing the payment');
    }
  };

  // Function to navigate to the user login page
  const goToUserLogin = () => {
    navigate('/user-login');
  };

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('userSession'); // Remove user session from localStorage
    navigate('/user-login'); // Navigate to user login page
  };

  return (
    <div>
      <h1>Payment Page</h1>
      {registrationDetails && (
        <div>
          <h2>Registration Details</h2>
          <p>Event Name: {registrationDetails.eventName}</p>
          <p>Number of Adults: {registrationDetails.numberOfAdults}</p>
          <p>Number of Children: {registrationDetails.numberOfChildren}</p>
        </div>
      )}
      <form onSubmit={handlePayment}>
        <div>
          <label htmlFor="registrationId">Registration ID:</label>
          <input
            type="text"
            id="registrationId"
            value={registrationId}
            disabled
          />
        </div>
        <div>
          <label htmlFor="paymentMethod">Payment Method:</label>
          <input
            type="text"
            id="paymentMethod"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
        </div>
        <button type="submit">Make Payment</button>
      </form>
      {paymentMessage && <div>{paymentMessage}</div>}
      {paymentAmount && <div>Amount: ${paymentAmount}</div>}
      {qrCodeData && (
        <div>
          <h2>QR Code:</h2>
          <QRCode value={qrCodeData} />
        </div>
      )}
      {/* Button to navigate to user login page */}
      <button onClick={goToUserLogin}>Go to User Login</button>
      {/* Logout button */}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default PaymentPage;
