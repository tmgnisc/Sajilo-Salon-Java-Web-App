import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-pink-600">
          <Link to="/">SAJILO SEWA</Link>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-700 hover:text-pink-600">Home</Link>
          <Link to="/about" className="text-gray-700 hover:text-pink-600">About Us</Link>
          <Link to="/contact" className="text-gray-700 hover:text-pink-600">Contact Us</Link>
        </nav>

        {/* Language and Auth Buttons */}
        <div className="flex items-center space-x-4">
          {/* Language Selector */}
          <select className="border border-gray-300 rounded px-2 py-1 text-sm">
            <option value="en">EN</option>
            <option value="np">NP</option>
          </select>

          {/* Auth Buttons */}
            <Link to="/login" className="bg-pink-600 text-white px-4 py-1 rounded text-sm hover:bg-pink-700">
        Login
      </Link>
          {/* <button className="bg-pink-600 text-white px-4 py-1 rounded text-sm hover:bg-pink-700">
            Signup
          </button> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
