import React, { useState } from 'react';
import { Scissors, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="text-white font-bold text-2xl tracking-wider">
              SAJILO
            </div>
            <Scissors className="text-orange-500 w-6 h-6 rotate-45" />
            <div className="text-white font-bold text-2xl tracking-wider">
              SALON
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                className={`text-lg font-medium transition-colors duration-200 ${
                  index === 0
                    ? 'text-orange-500'
                    : 'text-gray-300 hover:text-orange-500'
                }`}
              >
                {item.name}
              </a>
            ))}

            {/* Login Link */}
            <Link
              to="/login"
              className="text-lg font-medium text-gray-300 hover:text-orange-500 transition-colors duration-200"
            >
              Login
            </Link>
          </nav>

          {/* Book Appointment Button - Desktop */}
          <button className="hidden md:block bg-transparent border-2 border-orange-500 text-orange-500 px-6 py-2 rounded hover:bg-orange-500 hover:text-white transition-all duration-300 font-medium">
            Book Appointment
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-gray-800 rounded-lg mt-2 py-4">
            <nav className="flex flex-col space-y-4 px-4">
              {navigation.map((item, index) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`text-lg font-medium transition-colors duration-200 ${
                    index === 0
                      ? 'text-orange-500'
                      : 'text-gray-300 hover:text-orange-500'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              {/* Mobile Login Link */}
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium text-gray-300 hover:text-orange-500 transition-colors duration-200"
              >
                Login
              </Link>

              <button className="bg-transparent border-2 border-orange-500 text-orange-500 px-6 py-2 rounded hover:bg-orange-500 hover:text-white transition-all duration-300 font-medium mt-4">
                Book Appointment
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
