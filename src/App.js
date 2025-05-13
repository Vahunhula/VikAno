import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';

// Layout
import Layout from './components/layout/Layout';
import LoadingScreen from './components/layout/LoadingScreen';

// Pages
import HomePage from './components/home/HomePage';
import Calculator from './components/calculator/Calculator';

// Wrapper to provide location to pages
const LocationProvider = ({ children }) => {
  const location = useLocation();
  
  return React.Children.map(children, child => {
    return React.cloneElement(child, { location });
  });
};

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
  const [loading, setLoading] = useState(true);
  
  // Simulate minimum loading time to show the animation
  useEffect(() => {
    // Ensure the loading screen shows for at least 2.5 seconds for a better effect
    const minLoadTime = setTimeout(() => {
      // This will allow the loading screen to be dismissed if assets are loaded
      // but ensures it shows for at least 2.5s for visual appeal
      window.minLoadTimeElapsed = true;
    }, 2500);
    
    return () => clearTimeout(minLoadTime);
  }, []);
  
  const finishLoading = () => {
    // Check if minimum time has elapsed
    if (window.minLoadTimeElapsed) {
      setLoading(false);
    } else {
      // If not, wait for it to elapse
      const checkInterval = setInterval(() => {
        if (window.minLoadTimeElapsed) {
          setLoading(false);
          clearInterval(checkInterval);
        }
      }, 100);
    }
  };
  
  return (
    <Router>
      {loading ? (
        <LoadingScreen finishLoading={finishLoading} />
      ) : (
        <AppContent />
      )}
    </Router>
  );
}

// Separate component to use hooks inside Router
function AppContent() {
  const location = useLocation();
  
  return (
    <Layout>
      <Routes location={location}>
        <Route path="/" element={<LocationProvider><HomePage /></LocationProvider>} />
        <Route path="/gallery" element={<LocationProvider><Gallery /></LocationProvider>} />
        <Route path="/about" element={<LocationProvider><About /></LocationProvider>} />
        <Route path="/contact" element={<LocationProvider><Contact /></LocationProvider>} />
        <Route path="/calculator" element={<LocationProvider><Calculator /></LocationProvider>} />
      </Routes>
    </Layout>
  );
}

export default App;
