import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import bigBathroomImage from '../../assets/images/BigBathroom.jpg';

gsap.registerPlugin(ScrollTrigger);

const Craftsmanship = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  
  useEffect(() => {
    // Parallel animation of image and content from opposite sides
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        end: 'bottom 70%',
        toggleActions: 'play none none none'
      }
    });
    
    tl.fromTo(
      imageRef.current,
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    )
    .fromTo(
      contentRef.current.querySelectorAll('*'),
      { x: 100, opacity: 0 },
      { 
        x: 0, 
        opacity: 1, 
        duration: 0.8, 
        stagger: 0.15,
        ease: 'power3.out' 
      },
      '-=0.8'
    );
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">          <div ref={imageRef} className="rounded-lg overflow-hidden shadow-xl">
            <img
              src={bigBathroomImage}
              alt="Luxury bathroom furniture"
              className="w-full h-auto object-cover"
            />
          </div>
          
          <div ref={contentRef}>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-accent">
              Craftsmanship That Stands the Test of Time
            </h2>
            
            <p className="text-gray-700 mb-6 text-lg">
              At VikAno Furniture, we believe that true craftsmanship lies in the details. Each piece of furniture is handcrafted by skilled artisans who have honed their craft over decades.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="bg-secondary p-2 rounded-full mr-4 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">Sustainable Materials</h3>
                  <p className="text-gray-600">We source our wood from sustainable forests and reclaimed sources.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-secondary p-2 rounded-full mr-4 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">Traditional Techniques</h3>
                  <p className="text-gray-600">We employ time-honored woodworking techniques that ensure durability.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-secondary p-2 rounded-full mr-4 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">Customization</h3>
                  <p className="text-gray-600">Each piece can be customized to suit your specific needs and preferences.</p>
                </div>
              </div>
            </div>
            
            <a href="/about" className="btn-primary">
              Learn Our Story
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Craftsmanship;
