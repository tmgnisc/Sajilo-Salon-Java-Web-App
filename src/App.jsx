import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Sections
import Header from './sections/Header';
import Hero from './sections/Hero';
import Gallery from './sections/Gallery';
import WhyChoose from './sections/WhyChoose';
import Pricing from './sections/Pricing';
import Testimonial from './sections/Testimonial';
import Services from './sections/Services';
import Contact from './sections/Contact';
import AboutPage from './sections/AboutPage';
import Login from './sections/Login';
import Signup from './sections/SignUp';
import Footer from './components/Footer';

// Home Page combining multiple sections
const Home = () => (
  <>
    <Hero />
    <Gallery />
    <WhyChoose />
    <Pricing />
    <Testimonial />
    <Services />
    <Footer />
  </>
);

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default App;
