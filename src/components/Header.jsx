import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import menuIcon from '../assets/menu.png'; // Assuming the menu icon is located in the 'assets' folder

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check for user in localStorage
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  // Function to toggle the mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <header className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-4">
            <div>
              <Link to="/" className="flex items-center py-5 px-2 text-gray-700">
                <span className="font-bold text-xl">NextBuy</span>
              </Link>
            </div>
            {/* Primary Nav for larger screens */}
          </div>

          {/* Secondary Nav for larger screens */}
          <div className="hidden md:flex items-center space-x-1">
            <Link to="/" className="text-lg py-5 px-3 text-black font-semibold hover:text-red-700">
              Home
            </Link>
            <Link to="/categories" className="text-lg py-5 px-3 text-black font-semibold hover:text-red-700">
              Categories
            </Link>
            <Link to="/aboutus" className="text-lg py-5 px-3 text-black font-semibold hover:text-red-700">
              About
            </Link>
            <Link to="/contactus" className="text-lg py-5 px-3 text-black font-semibold hover:text-red-700">
              Contact
            </Link>
            <Link to="/cart" className="text-lg py-5 px-3 text-black font-semibold hover:text-red-700">
              Cart
            </Link>

            {/* Conditional Rendering for Login/Logout */}
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="py-2 px-3 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Logout
              </button>
            ) : (
              <Link to="/login" className="py-2 px-3 bg-blue-500 text-white rounded hover:bg-blue-600">
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button for small screens */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu}>
              <img src={menuIcon} alt="Menu" className="w-8 h-8" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Slide-in from left) */}
      <div
        className={`fixed top-18 left-0 h-full w-64 bg-gray-800 text-white z-50 transition-transform duration-300 ease-in-out transform ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleMenu} className="text-white">
            X {/* Close button */}
          </button>
        </div>
        <nav className="flex flex-col space-y-4 p-4">
          <Link to="/" className="text-white py-2 px-3 hover:bg-gray-700" onClick={toggleMenu}>
            Home
          </Link>
          <Link to="/categories" className="text-white py-2 px-3 hover:bg-gray-700" onClick={toggleMenu}>
            Category
          </Link>
          <Link to="/about" className="text-white py-2 px-3 hover:bg-gray-700" onClick={toggleMenu}>
            About
          </Link>
          <Link to="/contact" className="text-white py-2 px-3 hover:bg-gray-700" onClick={toggleMenu}>
            Contact
          </Link>
          <Link to="/cart" className="text-white py-2 px-3 hover:bg-gray-700" onClick={toggleMenu}>
            Cart
          </Link>

          {/* Conditional Rendering for Mobile Menu */}
          {isLoggedIn ? (
            <button
              onClick={() => {
                handleLogout();
                toggleMenu();
              }}
              className="text-white py-2 px-3 hover:bg-gray-700"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="text-white py-2 px-3 hover:bg-gray-700" onClick={toggleMenu}>
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
