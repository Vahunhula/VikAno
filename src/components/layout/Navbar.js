import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const menuItemsRef = useRef([]);
  const mobileMenuRef = useRef(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  // Helper to determine if a link is active
  const isActive = (path) => {
    return location.pathname === (path === 'Home' ? '/' : `/${path.toLowerCase()}`);
  };

  useEffect(() => {
    // GSAP animation for navbar
    gsap.fromTo(
      logoRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );

    gsap.fromTo(
      menuItemsRef.current,
      { opacity: 0, y: -20 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        stagger: 0.1, 
        ease: 'power3.out',
        delay: 0.3
      }
    );
  }, []);
    // Handle mobile menu toggle
  const toggleMobileMenu = () => {
    if (mobileMenuOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  };
  
  // Function to open mobile menu
  const openMobileMenu = () => {
    // Open menu with animation
    setMobileMenuOpen(true);
    setTimeout(() => {
      if (mobileMenuRef.current) {
        gsap.fromTo(
          mobileMenuRef.current,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
        );
      }
    }, 10); // Small delay to ensure state is updated
  };
  
  // Function to close mobile menu
  const closeMobileMenu = () => {
    // Close menu with animation
    if (mobileMenuRef.current) {
      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.3,
        ease: 'power2.out',
        onComplete: () => setMobileMenuOpen(false)
      });
    } else {
      setMobileMenuOpen(false);
    }
  };
  
  // Close mobile menu when a link is clicked
  const handleMobileLinkClick = (e) => {
    // Prevent default behavior to handle link click ourselves
    // This ensures the click handler runs completely before navigation
    e.preventDefault();
    
    const href = e.currentTarget.getAttribute('href');
    
    // Close menu with animation
    gsap.to(mobileMenuRef.current, {
      opacity: 0,
      y: -10,
      duration: 0.3,
      ease: 'power2.out',
      onComplete: () => {
        setMobileMenuOpen(false);
        // Navigate after animation completes
        window.location.href = href;
      }
    });
  };
    // Handle click outside to close menu
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (mobileMenuOpen && 
          mobileMenuRef.current && 
          !mobileMenuRef.current.contains(e.target) && 
          !e.target.closest('button')) {
        closeMobileMenu();
      }
    };
    
    // Add event listeners
    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }
    
    // Cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [mobileMenuOpen]);
  
  // Close mobile menu when route changes
  useEffect(() => {
    if (mobileMenuOpen) {
      closeMobileMenu();
    }
  }, [location.pathname]);
  return (
    <nav ref={navRef} className="bg-white shadow-md py-4 relative z-50">
      <div className="container-custom flex justify-between items-center">
        <Link to="/" className="flex items-center" ref={logoRef}>
          <div className="text-2xl font-serif font-bold text-primary">
            VikAno <span className="text-accent text-sm">Furniture</span>
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          {['Home', 'Gallery', 'About', 'Contact', 'Calculator'].map((item, index) => (
            <Link
              key={item}
              to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
              className="text-gray-800 hover:text-primary transition-colors duration-300 font-medium relative nav-link"
              ref={el => menuItemsRef.current[index] = el}
              onMouseEnter={(e) => {
                gsap.to(e.target, {
                  scale: 1.05,
                  duration: 0.2,
                  ease: 'power2.out'
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.target, {
                  scale: 1,
                  duration: 0.2,
                  ease: 'power2.out'
                });
              }}
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            className="text-gray-800 focus:outline-none" 
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>
        {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div 
          ref={mobileMenuRef}
          className="absolute top-full left-0 w-full bg-white shadow-md py-4 px-4 z-50 mobile-menu-container"
          style={{ opacity: 0 }} // Initial state for GSAP animation
        >
          <div className="flex flex-col">
            {['Home', 'Gallery', 'About', 'Contact', 'Calculator'].map((item) => (
              <Link
                key={item}
                to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                className={`text-gray-800 hover:text-primary transition-colors duration-300 font-medium py-3 px-4 rounded-md mobile-menu-link ${isActive(item) ? 'active' : ''}`}
                onClick={handleMobileLinkClick}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
