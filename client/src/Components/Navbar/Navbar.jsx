import React from 'react';
import { Link } from 'react-router-dom';

import './Navbar.css';
import { useStore } from '../../Pages/Context/Context';

const Navbar = () => {
  const { auth, logout } = useStore();
  const isAuthenticated = !!auth.token; // Check if token exists

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-menu">
          <Link to="/" className="navbar-item">
            Home
          </Link>
          {isAuthenticated ? (
            <Link to="/login" className="navbar-item" onClick={logout}>
              Logout
            </Link>
          ) : (
            <>
              <Link to="/login" className="navbar-item">
                Login
              </Link>
              <Link to="/registration" className="navbar-item">
                Registration
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
