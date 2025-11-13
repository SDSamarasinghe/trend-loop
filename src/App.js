import React from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
// import ExpertsSection from './components/ExpertsSection';
import Features from './components/Features';
import ProcessSection from './components/ProcessSection';
import Testimonials from './components/Testimonials';
import ReelsPortfolio from './components/ReelsPortfolio';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      {/* <ExpertsSection /> */}
      <Features />
      <ProcessSection />
      <ReelsPortfolio />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default App;
