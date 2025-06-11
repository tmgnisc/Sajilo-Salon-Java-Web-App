import React from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import Hero from './components/Hero';
import Package from './components/Package';
import Service from './components/Service';
import Trim from './components/Trim';
import Header from './components/Header';
import Booking from './components/Booking';
import About from './components/About';
import InstagramFeed from './components/InstagramFeed';
import Footer from './components/Footer';
import SignupModal from './components/SignupModal';
import LoginModal from './components/LoginModal';

const HomePage = () => (
  <>
    <Hero />
    <Service />
    <Package />
    <Trim />
    <Booking />
    <InstagramFeed />
    <About />
  </>
);

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isLoginOpen = location.pathname === '/login';
  const isSignupOpen = location.pathname === '/signup';

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<Service />} />
          <Route path="/packages" element={<Package />} />
          <Route path="/about" element={<About />} />
          <Route path="/booking" element={<Booking />} />
        </Routes>
      </main>

      <Footer />

      {/* Modal Routes */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => navigate('/')}
        onSwitchToSignup={() => navigate('/signup')}
      />
      <SignupModal
        isOpen={isSignupOpen}
        onClose={() => navigate('/')}
        onSwitchToLogin={() => navigate('/login')}
      />
    </div>
  );
};

export default App;
