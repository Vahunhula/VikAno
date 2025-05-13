import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import beforeImg from '../../assets/images/BeforeUs.jpg';
import afterImg from '../../assets/images/AfterUs.jpg';

const BeforeAfterSlider = () => {
  const containerRef = useRef(null);
  const sliderRef = useRef(null);
  const overlayRef = useRef(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const slider = sliderRef.current;
    const overlay = overlayRef.current;

    // Initial GSAP animation
    gsap.fromTo(
      container,
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1.2, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );

    const handleMouseMove = (e) => {
      if (!isDragging) return;
      
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const containerWidth = rect.width;
      
      // Calculate percentage (constrained between 0 and 100)
      let newPosition = (x / containerWidth) * 100;
      newPosition = Math.max(0, Math.min(100, newPosition));
      
      setSliderPosition(newPosition);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    const handleMouseDown = () => {
      setIsDragging(true);
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    };

    // Add event listeners
    slider.addEventListener('mousedown', handleMouseDown);
    
    // Hover effects
    container.addEventListener('mouseenter', () => {
      // Animate to reveal before image on hover
      gsap.to(overlay, { width: '0%', duration: 0.8, ease: 'power2.out' });
    });
    
    container.addEventListener('mouseleave', () => {
      // Animate back to initial state (50/50) when mouse leaves
      gsap.to(overlay, { width: '50%', duration: 0.8, ease: 'power2.out' });
      setSliderPosition(50);
    });

    return () => {
      // Clean up
      slider.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('mouseenter', () => {});
      container.removeEventListener('mouseleave', () => {});
    };
  }, [isDragging]);

  return (
    <div className="py-20 bg-gray-50">
      <div className="container-custom">
        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-center text-accent">
          Our Transformation Projects
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-center mb-12">
          See the difference our craftsmanship makes in real spaces
        </p>

        <div 
          ref={containerRef} 
          className="relative w-full max-w-4xl h-[500px] mx-auto overflow-hidden rounded-lg shadow-xl cursor-pointer"
          style={{ touchAction: 'none' }}
        >
          {/* After image (full width) */}
          <img 
            src={afterImg} 
            alt="After transformation" 
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
          
          {/* Before image (overlay that gets resized) */}
          <div 
            ref={overlayRef}
            className="absolute top-0 left-0 h-full overflow-hidden"
            style={{ width: `${sliderPosition}%` }}
          >
            <img 
              src={beforeImg} 
              alt="Before transformation" 
              className="absolute top-0 left-0 w-full h-full object-cover"
              style={{ width: `${100 / (sliderPosition/100)}%`, maxWidth: 'none' }}
            />
          </div>
          
          {/* Slider control */}
          <div 
            ref={sliderRef}
            className="absolute top-0 bottom-0 w-1 bg-white cursor-col-resize"
            style={{ 
              left: `${sliderPosition}%`, 
              transform: 'translateX(-50%)',
              touchAction: 'none'
            }}
          >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
              </svg>
            </div>
          </div>
        </div>
        
        <p className="text-center text-gray-500 mt-4">
          Drag the slider or hover to see the transformation
        </p>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
