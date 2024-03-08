import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation from react-router-dom

const PaymentPage = () => {
  const location = useLocation(); // Use useLocation hook to get location data
  const [registrationId, setRegistrationId] = useState(location.state?.registrationId || '');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentMessage, setPaymentMessage] = useState('');
  const [qrCode, setQRCode] = useState('');

  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8080/payments/makepayment?registrationId=${registrationId}`);
      const data = await response.json();
      
      // Check if payment was successful
      if (data.success) {
        setPaymentMessage(data.message);
        setQRCode(data.qrCode);
      } else {
        setPaymentMessage('Payment failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setPaymentMessage('An error occurred while processing the payment');
    }
  };

  return (
    <div>
      <h1>Payment Page</h1>
      <form onSubmit={handlePayment}>
        <div>
          <label htmlFor="registrationId">Registration ID:</label>
          <input
            type="text"
            id="registrationId"
            value={registrationId}
            onChange={(e) => setRegistrationId(e.target.value)}
            disabled // Disable editing of registrationId field
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
      {qrCode && (
        <div>
          <h2>QR Code:</h2>
          <img src={`data:image/png;base64,${qrCode}`} alt="QR Code" />
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
