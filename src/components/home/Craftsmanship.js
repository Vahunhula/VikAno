import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';
import bigBathroomImage from '../../assets/images/BigBathroom.jpg';

gsap.registerPlugin(ScrollTrigger);

const Craftsmanship = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const { t } = useTranslation();
  
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
    <section ref={sectionRef} className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">          <div ref={imageRef} className="rounded-lg overflow-hidden shadow-xl">
            <img
              src={bigBathroomImage}
              alt={t('craftsmanship.imageAlt', 'Luxury bathroom furniture')}
              className="w-full h-auto object-cover"
            />
          </div>
          
          <div ref={contentRef}>            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-accent dark:text-secondary transition-colors duration-300">
              {t('craftsmanship.title')}
            </h2>
            
            <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg transition-colors duration-300">
              {t('craftsmanship.description')}
            </p>
              <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="bg-secondary dark:bg-secondary/70 p-2 rounded-full mr-4 mt-1 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent dark:text-white transition-colors duration-300" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>                  <h3 className="font-bold text-gray-800 dark:text-white mb-1 transition-colors duration-300">{t('craftsmanship.sustainable.title')}</h3>
                  <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300">{t('craftsmanship.sustainable.description')}</p>
                </div>
              </div>
                <div className="flex items-start">
                <div className="bg-secondary dark:bg-secondary/70 p-2 rounded-full mr-4 mt-1 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent dark:text-white transition-colors duration-300" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>                  <h3 className="font-bold text-gray-800 dark:text-white mb-1 transition-colors duration-300">{t('craftsmanship.traditional.title')}</h3>
                  <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300">{t('craftsmanship.traditional.description')}</p>
                </div>
              </div>
                <div className="flex items-start">
                <div className="bg-secondary dark:bg-secondary/70 p-2 rounded-full mr-4 mt-1 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent dark:text-white transition-colors duration-300" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>                  <h3 className="font-bold text-gray-800 dark:text-white mb-1 transition-colors duration-300">{t('craftsmanship.customization.title')}</h3>
                  <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300">{t('craftsmanship.customization.description')}</p>
                </div>
              </div>            </div>
              <a href="/about" className="btn-primary">
              {t('craftsmanship.cta')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Craftsmanship;
