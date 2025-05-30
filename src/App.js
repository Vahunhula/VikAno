import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './App.css';
import './components/common/iOSFixes.css';
import './components/common/IOSModalStyles.css';
import './components/common/IOSScrollFix.css';
import { setupIOSViewport } from './utils/iosDetection';
import { applyIOSFixes } from './utils/iosFixes';

// Layout
import Layout from './components/layout/Layout';
import LoadingScreen from './components/layout/LoadingScreen';

// Pages
import HomePage from './components/home/HomePage';
import Calculator from './components/calculator/Calculator';
import GalleryPage from './components/gallery/GalleryPage';
import AboutPage from './components/about/AboutPage';
import ContactPage from './components/contact/ContactPage';

// Wrapper to provide location to pages
const LocationProvider = ({ children }) => {
  const location = useLocation();
  
  return React.Children.map(children, child => {
    return React.cloneElement(child, { location });
  });
};

// All page components are now properly imported

function App() {
  const [loading, setLoading] = useState(true);
  
  // Simulate minimum loading time to show the animation
  useEffect(() => {
    // Set up iOS-specific viewport settings
    setupIOSViewport();
    
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
  const { t } = useTranslation();
  
  // Setup iOS-specific viewport meta and fixes
  useEffect(() => {
    setupIOSViewport();
    applyIOSFixes();
  }, []);
  
  // Update the document title when language changes or location changes
  useEffect(() => {
    const path = location.pathname;
    
    // Set different titles based on current route
    switch(path) {
      case '/':
        document.title = t('app.title') + ' | ' + t('home.title');
        break;
      case '/gallery':
        document.title = t('app.title') + ' | ' + t('gallery.title');
        break;
      case '/calculator':
        document.title = t('app.title') + ' | ' + t('calculator.title');
        break;
      case '/about':
        document.title = t('app.title') + ' | ' + t('about.title');
        break;
      case '/contact':
        document.title = t('app.title') + ' | ' + t('contact.title');
        break;
      default:
        document.title = t('app.title');
    }
  }, [t, location.pathname]);
  
  return (
    <Layout>
      <Routes location={location}>
        <Route path="/" element={<LocationProvider><HomePage /></LocationProvider>} />
        <Route path="/gallery" element={<LocationProvider><GalleryPage /></LocationProvider>} />
        <Route path="/calculator" element={<LocationProvider><Calculator /></LocationProvider>} />
        <Route path="/about" element={<LocationProvider><AboutPage /></LocationProvider>} />
        <Route path="/contact" element={<LocationProvider><ContactPage /></LocationProvider>} />
      </Routes>
    </Layout>
  );
}

export default App;
