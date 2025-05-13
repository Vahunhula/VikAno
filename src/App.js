import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Layout
import Layout from './components/layout/Layout';

// Pages
import HomePage from './components/home/HomePage';

// Placeholder components for other pages
const Gallery = () => (
  <div className="py-20 px-4">
    <div className="container-custom">
      <h1 className="text-3xl font-serif font-bold mb-6">Our Furniture Gallery</h1>
      <p>This page will showcase all of our handcrafted furniture pieces.</p>
    </div>
  </div>
);

const About = () => (
  <div className="py-20 px-4">
    <div className="container-custom">
      <h1 className="text-3xl font-serif font-bold mb-6">About VikAno</h1>
      <p>This page will tell the story of our company and craftspeople.</p>
    </div>
  </div>
);

const Contact = () => (
  <div className="py-20 px-4">
    <div className="container-custom">
      <h1 className="text-3xl font-serif font-bold mb-6">Contact Us</h1>
      <p>This page will provide contact information and a form to get in touch with us.</p>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
