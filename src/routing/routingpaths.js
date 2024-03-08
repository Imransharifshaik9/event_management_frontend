import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../components/HomePage'; 
import UserLogin from '../components/UserLogin';
import AdminLogin from '../components/AdminLogin';
import Events from '../components/Events';
import UserRegistration from '../components/UserRegistration';
import AddEvent from '../components/AddEvent';
import PaymentPage from '../components/PaymentPage';
import Registration from '../components/Registration';

const RoutingPaths = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/events" element={<Events />} />
        <Route path="/user-registration" element={<UserRegistration />} />
        <Route path="admin-login/add-event" element={<AddEvent/>}/>
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/registration/:eventId" element={Registration} />
      </Routes>
    </Router>
  );
}

export default RoutingPaths;
