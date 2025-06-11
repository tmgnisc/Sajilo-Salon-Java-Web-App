import React from 'react';
import Hero from './components/Hero';
import Package from './components/Package';
import Service from './components/Service';
import Trim from './components/Trim';
import Header from './components/Header';
import Booking from './components/Booking';
import About from './components/About';
import InstagramFeed from './components/InstagramFeed';
import Footer from './components/Footer';


const App = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Header />
      <Hero />
      <Service />
      <Package />
      <Trim />
      <Booking />
      <InstagramFeed />
      <About />
      <Footer />
      
    </div>
  );
};

export default App;
