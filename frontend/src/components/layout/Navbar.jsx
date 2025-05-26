import React from 'react';

import {
  FaHome,
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
} from 'react-icons/fa'; // Added FaUser icon
import {
  Link,
  useNavigate,
} from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("accessToken"); // Check if user is logged in

  const handleLogout = () => {
    localStorage.removeItem("accessToken"); // Fix key name
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-blue-900 text-white shadow-md z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo - Left */}
        <Link to="/" className="text-2xl font-bold tracking-wide">
          SecureBank
        </Link>

        {/* Navigation Links - Right */}
        <div className="flex space-x-6">
          <Link to="/" className="flex items-center space-x-2 hover:text-black transition">
            <FaHome /> <span>Home</span>
          </Link>

          {isAuthenticated && (
            <Link to="/account" className="flex items-center space-x-2 hover:text-black transition">
              <FaUser /> <span>Account</span>
            </Link>
          )}

          {!isAuthenticated ? (
            <Link to="/login" className="flex items-center space-x-2 hover:text-black transition">
              <FaSignInAlt /> <span>Login</span>
            </Link>
          ) : (
            <button onClick={handleLogout} className="flex items-center space-x-2 hover:text-black transition">
              <FaSignOutAlt /> <span>Logout</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
