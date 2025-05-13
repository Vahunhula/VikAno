import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef(null);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    // Hero animation timeline
    const tl = gsap.timeline();
    
    tl.fromTo(
      headingRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    )
    .fromTo(
      subheadingRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
      '-=0.7'
    )
    .fromTo(
      ctaRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.5'
    );

    // Clean up ScrollTrigger when component unmounts
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      ref={heroRef}
      className="bg-cover bg-center h-screen flex items-center"
      style={{ 
        backgroundImage: "linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1556185781-a47769abb7ee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80')"
      }}
    >
      <div className="container-custom text-white">
        <h1 
          ref={headingRef}
          className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 max-w-3xl"
        >
          Handcrafted Furniture with Soul and Character
        </h1>
        
        <p 
          ref={subheadingRef}
          className="text-xl md:text-2xl max-w-2xl mb-8 text-gray-200"
        >
          Each piece tells a story of craftsmanship, tradition, and timeless design
        </p>
        
        <div ref={ctaRef} className="flex flex-wrap gap-4">
          <a href="/gallery" className="btn-primary">
            Explore Collection
          </a>
          <a href="/contact" className="border-2 border-white text-white px-6 py-2 rounded-md hover:bg-white hover:text-accent transition-all duration-300">
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
