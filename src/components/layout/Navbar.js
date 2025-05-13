import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const menuItemsRef = useRef([]);

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

  return (
    <nav ref={navRef} className="bg-white shadow-md py-4">
      <div className="container-custom flex justify-between items-center">
        <Link to="/" className="flex items-center" ref={logoRef}>
          <div className="text-2xl font-serif font-bold text-primary">
            VikAno <span className="text-accent text-sm">Furniture</span>
          </div>
        </Link>        <div className="hidden md:flex space-x-8">
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

        <div className="md:hidden">
          <button className="text-gray-800 focus:outline-none">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
