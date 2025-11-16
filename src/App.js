import React from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
// import ExpertsSection from './components/ExpertsSection';
import Features from './components/Features';
import ServicesSection from './components/ServicesSection';
import ServicesSlider from './components/ServicesSlider';
import ProcessSection from './components/ProcessSection';
import Testimonials from './components/Testimonials';
import ReelsPortfolio from './components/ReelsPortfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <AboutUs />
      {/* <ExpertsSection /> */}
      {/* <Features /> */}
      <ServicesSlider />
      {/* <ServicesSection /> */}
      <ProcessSection />
      <ReelsPortfolio />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
