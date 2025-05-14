import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import beforeImg from '../../assets/images/BeforeUs.jpg';
import afterImg from '../../assets/images/AfterUs.jpg';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const BeforeAfterSlider = () => {
  const containerRef = useRef(null);
  const sliderRef = useRef(null);
  const overlayRef = useRef(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  // Track if we just finished dragging to prevent hover effects
  const justFinishedDragging = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    const slider = sliderRef.current;
    const overlay = overlayRef.current;

    // Initial GSAP animation - opacity only fade without any movement
    const initialAnimation = gsap.fromTo(
      container,
      { opacity: 0 },
      { 
        opacity: 1, 
        duration: 1.2, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );

    // Function to update slider position based on pointer position
    const updateSliderPosition = (clientX) => {
      const rect = container.getBoundingClientRect();
      const x = clientX - rect.left;
      const containerWidth = rect.width;
      
      // Calculate percentage (constrained between 0 and 100)
      let newPosition = (x / containerWidth) * 100;
      newPosition = Math.max(0, Math.min(100, newPosition));
      
      // Directly update DOM without animation during dragging
      overlay.style.width = `${newPosition}%`;
      setSliderPosition(newPosition);
    };

    // Handle mouse events
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      e.preventDefault(); // Prevent selection
      updateSliderPosition(e.clientX);
    };

    // Handle touch events
    const handleTouchMove = (e) => {
      if (!isDragging) return;
      // No preventDefault in passive listeners
      const touch = e.touches[0];
      if (touch) {
        updateSliderPosition(touch.clientX);
      }
    };

    // Start dragging
    const handleDragStart = (e) => {
      e.preventDefault();
      setIsDragging(true);
      justFinishedDragging.current = false;
    };

    // End dragging
    const handleDragEnd = () => {
      if (isDragging) {
        setIsDragging(false);
        
        // Set flag to prevent hover effects immediately after drag
        justFinishedDragging.current = true;
        
        // Get current position from style (more accurate than state during rapid movements)
        const currentWidth = parseFloat(overlay.style.width) || sliderPosition;
        
        // Slightly animate to the exact position to ensure smoothness
        gsap.to(overlay, {
          width: `${currentWidth}%`,
          duration: 0.15,
          ease: "power1.out",
          overwrite: true
        });
        
        // Clear the flag after a delay
        setTimeout(() => {
          justFinishedDragging.current = false;
        }, 750); // Longer delay to prevent hover effects
      }
    };

    // Prevent default behavior that could interfere with dragging
    const preventDragHandler = (e) => e.preventDefault();
    
    // Add hover effects for desktop devices only
    const handleMouseEnter = () => {
      // Skip hover effects during drag or right after drag
      if (isDragging || justFinishedDragging.current) return;
      
      // Only apply on devices with hover capability
      if (window.matchMedia('(hover: hover)').matches) {
        // Very gradually reveal the "after" image
        gsap.to(overlay, { 
          width: '0%', 
          duration: 0.8,  // Slower duration
          ease: 'power1.inOut', // Smoother easing
          overwrite: true
        });
      }
    };
    
    const handleMouseLeave = () => {
      // Skip reset if dragging
      if (isDragging || justFinishedDragging.current) return;
      
      // Only apply on devices with hover capability
      if (window.matchMedia('(hover: hover)').matches) {
        // Return to 50/50 view gradually
        gsap.to(overlay, { 
          width: '50%', 
          duration: 0.8,  // Slower duration
          ease: 'power1.inOut', // Smoother easing
          overwrite: true,
          onComplete: () => {
            // Update state only when animation completes
            if (!isDragging) {
              setSliderPosition(50);
            }
          }
        });
      }
    };
    
    // Setup all event listeners
    slider.addEventListener('mousedown', handleDragStart);
    slider.addEventListener('touchstart', handleDragStart, { passive: false });
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    
    document.addEventListener('mouseup', handleDragEnd);
    document.addEventListener('touchend', handleDragEnd);
    document.addEventListener('mouseleave', handleDragEnd);
    
    container.addEventListener('dragstart', preventDragHandler);
    slider.addEventListener('dragstart', preventDragHandler);
    
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    // Cleanup all event listeners
    return () => {
      slider.removeEventListener('mousedown', handleDragStart);
      slider.removeEventListener('touchstart', handleDragStart, { passive: false });
      
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleTouchMove, { passive: true });
      
      document.removeEventListener('mouseup', handleDragEnd);
      document.removeEventListener('touchend', handleDragEnd);
      document.removeEventListener('mouseleave', handleDragEnd);
      
      container.removeEventListener('dragstart', preventDragHandler);
      slider.removeEventListener('dragstart', preventDragHandler);
      
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
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
          style={{ 
            touchAction: 'none',
            userSelect: 'none',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            msUserSelect: 'none'
          }}
        >
          {/* After image (full width) */}
          <img 
            src={afterImg} 
            alt="After transformation" 
            className="absolute top-0 left-0 w-full h-full object-cover"
            draggable="false"
            style={{ pointerEvents: 'none' }}
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
              style={{ 
                width: `${Math.max(100, 100 / (sliderPosition/100))}%`, 
                maxWidth: 'none',
                pointerEvents: 'none' // Prevents image selection
              }}
              draggable="false"
            />
          </div>
          
          {/* Slider control */}
          <div 
            ref={sliderRef}
            className="absolute top-0 bottom-0 w-1 bg-white cursor-col-resize"
            style={{ 
              left: `${sliderPosition}%`, 
              transform: 'translateX(-50%)',
              touchAction: 'none',
              pointerEvents: 'auto',
              zIndex: 20
            }}
          >
            <div 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg"
              style={{ pointerEvents: 'auto' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
