import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import bedroomImage from '../../assets/images/Bedroom.jpg';
import kitchenImage from '../../assets/images/Kitchen.jpg';
import closetImage from '../../assets/images/Closet.jpg';
import './Gallery.css';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const GalleryHero = () => {
  const { t } = useTranslation();
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const overlayRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  
  // Array of hero images to create a slideshow effect
  const heroImages = [
    { image: bedroomImage, title: t('gallery.hero.bedroom', 'Bedroom Collections') },
    { image: kitchenImage, title: t('gallery.hero.kitchen', 'Kitchen Designs') },
    { image: closetImage, title: t('gallery.hero.closet', 'Custom Closets') }
  ];

  useEffect(() => {
    // Auto-rotate through hero images
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    // Parallax effect for the hero image
    gsap.fromTo(
      heroRef.current,
      { backgroundPositionY: '0%' },
      {
        backgroundPositionY: '30%',
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      }
    );

    // Text reveal animation
    gsap.fromTo(
      textRef.current,
      { y: 100, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1.2, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 80%'
        }
      }
    );

    return () => {
      clearInterval(interval);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [heroImages.length]);

  // Handle manual navigation
  const goToSlide = (index) => {
    setActiveSlide(index);
  };

  return (
    <section 
      ref={heroRef}
      className="h-[70vh] relative flex items-center justify-center overflow-hidden"
    >
      {/* Animated background slideshow */}
      {heroImages.map((heroImage, index) => (        <motion.div
          key={index}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage.image})` }}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: activeSlide === index ? 1 : 0
          }}
          transition={{ 
            opacity: { duration: 1.2 }
          }}
        />
      ))}
      
      {/* Overlay with animated gradient */}
      <motion.div 
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"
        initial={{ opacity: 0.7 }}
        animate={{ opacity: 0.6 }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          repeatType: 'reverse' 
        }}
      />
      
      {/* Decorative animated elements */}
      <div className="absolute inset-0 overflow-hidden">        <motion.div          className="absolute top-[10%] left-[15%] w-24 h-24 rounded-full border-2 border-primary/30 dark:border-secondary/30"
          animate={{ 
            opacity: 0.5,
            rotate: 360
          }}
          initial={{ opacity: 0.3, rotate: 0 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />        <motion.div          className="absolute top-[60%] right-[10%] w-40 h-40 rounded-full border border-primary/20 dark:border-secondary/20"
          animate={{ 
            opacity: 0.4,
            rotate: -360
          }}
          initial={{ opacity: 0.2, rotate: 0 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
      </div>
      
      <div className="container-custom z-10 text-center" ref={textRef}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <span className="inline-block px-4 py-2 border border-primary dark:border-secondary text-primary dark:text-secondary mb-6 text-sm uppercase tracking-wider">
            {t('gallery.subheader', 'Premium Furniture')}
          </span>
        </motion.div>
        
        <motion.h1 
          className="text-4xl md:text-6xl font-serif font-bold mb-6 text-white"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {t('gallery.title', 'Our Furniture Gallery')}
        </motion.h1>
          <motion.div
          className="overflow-hidden h-16 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          {heroImages.map((heroImage, index) => (
            <motion.h2
              key={index}
              className="text-2xl text-primary dark:text-secondary font-medium"
              initial={{ y: 40, opacity: 0 }}
              animate={{ 
                y: activeSlide === index ? 0 : 40,
                opacity: activeSlide === index ? 1 : 0
              }}
              transition={{ duration: 0.6 }}
            >
              {heroImage.title}
            </motion.h2>
          ))}
        </motion.div>
        
        <motion.p 
          className="text-xl text-gray-200 max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          {t('gallery.description', 'Explore our collection of handcrafted furniture pieces made with precision and passion')}
        </motion.p>
        
        {/* Slide indicators */}
        <motion.div 
          className="flex justify-center space-x-3 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                activeSlide === index ? 'bg-primary dark:bg-secondary w-8' : 'bg-white/50 dark:bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default GalleryHero;
