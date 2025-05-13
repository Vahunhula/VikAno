import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';

const PageTransition = ({ children }) => {
  const location = useLocation();
  const pageRef = useRef(null);
  const overlayRef = useRef(null);
  const [displayedChildren, setDisplayedChildren] = useState(children);
  
  useEffect(() => {
    const pageElement = pageRef.current;
    const overlayElement = overlayRef.current;
      // Create a timeline for our animations
    const tl = gsap.timeline();
    
    if (location.pathname !== displayedChildren.props.location?.pathname) {
      // If this is a route change, run exit and enter animations
      
      // First, animate the overlay to cover the screen
      tl.set(overlayElement, { 
        x: '-100%',
        display: 'block',
        backdropFilter: 'blur(0px)'
      })
      .to(overlayElement, {
        x: '0%',
        duration: 0.4,
        ease: 'power2.inOut',
        backdropFilter: 'blur(4px)'
      })
      // Then update the displayed content
      .call(() => {
        setDisplayedChildren(children);
        
        // Initial settings for the new page
        gsap.set(pageElement, { 
          opacity: 0,
          y: 20 
        });
      })      // Then animate the overlay away
      .to(overlayElement, {
        x: '100%',
        backdropFilter: 'blur(0px)', // Explicitly remove blur
        duration: 0.4,
        ease: 'power2.inOut',
        onComplete: () => {
          // Ensure the overlay is hidden after animation completes
          gsap.set(overlayElement, { 
            display: 'none',
            backdropFilter: 'blur(0px)' 
          });
        }
      })
      // And finally show the new page content
      .to(pageElement, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out'
      });
    } else {
      // Initial load, just fade in the content
      gsap.fromTo(pageElement, 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      );
    }
      // Cleanup function
    return () => {
      tl.kill();
      // Ensure overlay is reset on component unmount
      if (overlayElement) {
        gsap.set(overlayElement, { 
          display: 'none', 
          x: '-100%', 
          backdropFilter: 'blur(0px)' 
        });
      }
    };
  }, [children, location.pathname, displayedChildren.props.location?.pathname]);
  
  return (
    <>
      <div className="page-transition" ref={pageRef}>
        {displayedChildren}
      </div>      <div 
        ref={overlayRef} 
        className="fixed top-0 left-0 w-full h-full bg-primary bg-opacity-10 backdrop-blur-sm z-50 pointer-events-none transition-all" 
        style={{ display: 'none', backdropFilter: 'blur(0px)' }}
      />
    </>
  );
};

export default PageTransition;
