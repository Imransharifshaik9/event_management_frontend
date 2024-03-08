import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/user-login">User Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/user-registration">User Registration</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin-login">Admin Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/events">Events</Link> {/* Add link to Events page */}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
