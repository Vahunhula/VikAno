import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import beforeImage from '../../assets/images/BeforeUs.jpg';
import afterImage from '../../assets/images/AfterUs.jpg';
import './Gallery.css';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const GalleryProjectSpotlight = () => {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const sliderRef = useRef(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  
  useEffect(() => {
    // Animate title
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
        }
      }
    );
    
    // Animate content
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 85%',
        }
      }
    );
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  const handleSliderChange = (e) => {
    setSliderPosition(e.target.value);
  };

  const handleMouseMove = (e) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const percent = Math.max(0, Math.min(100, (x / bounds.width) * 100));
    setSliderPosition(percent);
  };

  return (
    <section ref={sectionRef} className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container-custom">
        <div className="text-center mb-12" ref={titleRef}>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-accent dark:text-secondary">
            {t('gallery.spotlight.title', 'Project Spotlight')}
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('gallery.spotlight.description', 'See the dramatic transformation in this recent project')}
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto" ref={contentRef}>          {/* Before/After Comparison Slider with enhanced visuals */}
          <motion.div 
            className="relative w-full h-[500px] overflow-hidden rounded-lg shadow-xl mb-12"
            onMouseMove={handleMouseMove}
            ref={sliderRef}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Corner decorations */}
            <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-white/70 z-10"></div>
            <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-white/70 z-10"></div>
            <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-white/70 z-10"></div>
            <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-white/70 z-10"></div>
            
            {/* Before Image (Full width) */}
            <div className="absolute inset-0">
              <img 
                src={beforeImage} 
                alt="Before renovation" 
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <motion.div 
                className="absolute top-8 left-8 bg-black/80 backdrop-blur-sm text-white px-5 py-2 rounded-md flex items-center"
                animate={{ x: -5, opacity: 0.7 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
              >
                <span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span>
                {t('beforeAfter.before', 'Before')}
              </motion.div>
            </div>
            
            {/* After Image (Partial width based on slider) */}
            <motion.div 
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
              animate={{ width: `${sliderPosition}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <img 
                src={afterImage} 
                alt="After renovation" 
                className="absolute top-0 left-0 w-full h-full object-cover"
                loading="lazy"
              />
              <motion.div 
                className="absolute top-8 left-8 bg-primary/90 dark:bg-secondary/90 backdrop-blur-sm text-white dark:text-gray-900 px-5 py-2 rounded-md flex items-center"
                animate={{ x: 5, opacity: 0.7 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
              >
                <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                {t('beforeAfter.after', 'After')}
              </motion.div>
            </motion.div>
            
            {/* Instructions overlay */}
            <motion.div 
              className="absolute inset-0 bg-black/50 backdrop-blur-sm z-20 flex items-center justify-center"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ delay: 2, duration: 1 }}
              style={{ pointerEvents: 'none' }}
            >
              <div className="text-center text-white px-4 py-2 rounded-lg bg-black/50">
                <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12M8 12h12M8 17h12M4 7h.01M4 12h.01M4 17h.01" />
                </svg>
                {t('beforeAfter.dragInstructions', 'Slide or drag to reveal transformation')}
              </div>
            </motion.div>
              {/* Animated Slider Control */}            <motion.div 
              className="absolute inset-y-0 z-10"
              style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
              animate={{ 
                left: `${sliderPosition}%`
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="absolute inset-y-0 w-0.5 bg-white/80"></div>              <motion.div 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-md rounded-full shadow-lg flex items-center justify-center slider-handle-glow"
              >
                <svg className="w-6 h-6 text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5l-7 7 7 7" />
                </svg>
              </motion.div>
            </motion.div>
            
            {/* Range Input for Accessibility with visible track for desktop */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPosition}
              onChange={handleSliderChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-col-resize z-30"
              aria-label={t('beforeAfter.dragInstructions', 'Drag the slider or hover to see the transformation')}
            />
          </motion.div>
            {/* Enhanced Project Description */}
          <motion.div 
            className="bg-white dark:bg-gray-800 p-10 rounded-xl shadow-xl relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 dark:bg-secondary/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-primary/5 dark:bg-secondary/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="relative">
              {/* Badge */}
              <motion.div 
                className="inline-block px-3 py-1 bg-primary/20 dark:bg-secondary/20 text-primary dark:text-secondary text-sm font-medium rounded-full mb-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                {t('gallery.spotlight.badge', 'Featured Project')}
              </motion.div>
              
              <motion.h3 
                className="text-3xl font-bold mb-2 text-gray-900 dark:text-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {t('gallery.spotlight.projectTitle', 'Living Room Renovation')}
              </motion.h3>
              
              <motion.div 
                className="w-20 h-1 bg-primary dark:bg-secondary mb-6"
                initial={{ width: 0 }}
                whileInView={{ width: 80 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              />
              
              <motion.p 
                className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                {t('gallery.spotlight.projectDescription', 'This complete living room transformation included custom built-in shelving, a new entertainment center, and a refreshed color palette. Our client wanted a space that felt both elegant and comfortable for everyday living.')}
              </motion.p>
              
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <motion.div 
                  className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg text-center"
                  whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                >
                  <div className="w-10 h-10 bg-primary/20 dark:bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-5 h-5 text-primary dark:text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{t('gallery.spotlight.timeframe', 'Timeframe')}</p>
                  <p className="font-semibold text-gray-900 dark:text-white">6 {t('gallery.spotlight.weeks', 'weeks')}</p>
                </motion.div>
                
                <motion.div 
                  className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg text-center"
                  whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                >
                  <div className="w-10 h-10 bg-primary/20 dark:bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-5 h-5 text-primary dark:text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>                  <p className="text-sm text-gray-500 dark:text-gray-400">{t('gallery.spotlight.location', 'Location')}</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{t('gallery.spotlight.cityName', 'Tbilisi')}</p>
                </motion.div>
                
                <motion.div 
                  className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg text-center"
                  whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                >
                  <div className="w-10 h-10 bg-primary/20 dark:bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-5 h-5 text-primary dark:text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{t('gallery.spotlight.satisfaction', 'Satisfaction')}</p>
                  <p className="font-semibold text-gray-900 dark:text-white">100%</p>
                </motion.div>
              </motion.div>
              
              <motion.div
                className="flex flex-wrap gap-4 items-center mt-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                viewport={{ once: true }}
              >                <motion.a 
                  href="/contact" 
                  className="inline-block bg-primary dark:bg-secondary text-white dark:text-gray-900 px-8 py-3 rounded-md hover:bg-primary/90 dark:hover:bg-secondary/90 transition-colors"
                >
                  {t('gallery.spotlight.cta', 'Start Your Transformation')}
                </motion.a>
                
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 dark:text-gray-400">{t('gallery.spotlight.share', 'Share:')}</span>
                  {['facebook', 'twitter', 'instagram'].map((platform, i) => (                    <motion.a
                      key={platform}
                      href={`#${platform}`}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 + (i * 0.1) }}
                    >
                      <span className="text-sm">{platform.charAt(0).toUpperCase()}</span>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GalleryProjectSpotlight;
