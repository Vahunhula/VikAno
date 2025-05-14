import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import './Gallery.css';

// Import images
import closetImageWithoutMirrors from '../../assets/images/AnotherClosetWithotMirrors.jpg';
import evenBiggerClosetImage from '../../assets/images/AnotherEvenBiggerCloset.jpg';
import futuristicClosetImage from '../../assets/images/AnotherMoreFuturisticCloset.jpg';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const GalleryMasonry = () => {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const imageRefs = useRef([]);
  
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
    
    // Animate images staggered
    imageRefs.current.forEach((img, index) => {
      gsap.fromTo(
        img,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          delay: index * 0.2,
          scrollTrigger: {
            trigger: img,
            start: 'top 85%',
          }
        }
      );
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-white dark:bg-gray-800">
      <div className="container-custom">
        <div className="text-center mb-12" ref={titleRef}>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-accent dark:text-secondary">
            {t('gallery.special.title', 'Designer Spotlight')}
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('gallery.special.description', 'Exclusive custom closet designs featuring our most innovative solutions')}
          </p>
        </div>        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Large image spanning two rows with parallax effect */}
          <motion.div 
            className="lg:row-span-2 overflow-hidden rounded-lg shadow-lg"
            ref={el => imageRefs.current[0] = el}
            whileHover={{ scale: 1.03, transition: { duration: 0.5 } }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative h-full zoom-effect glow-on-hover">
              <img 
                src={evenBiggerClosetImage} 
                alt="Large custom closet with island"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <motion.h3 
                  className="text-white font-bold text-xl mb-2"
                  initial={{ y: 20, opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  Executive Walk-in Closet
                </motion.h3>
                <motion.div 
                  className="h-0.5 w-16 bg-primary dark:bg-secondary mb-3"
                  initial={{ width: 0 }}
                  whileHover={{ width: 64 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                />
                <motion.p 
                  className="text-gray-200 text-sm"
                  initial={{ y: 20, opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  Premium custom solution with central island
                </motion.p>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Interactive image with hover effects */}
          <motion.div 
            className="overflow-hidden rounded-lg shadow-lg"
            ref={el => imageRefs.current[1] = el}
            whileHover={{ scale: 1.05, y: -5, transition: { duration: 0.4 } }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative zoom-effect">
              <img 
                src={closetImageWithoutMirrors} 
                alt="Simple elegant closet design"
                className="w-full h-64 object-cover"
                loading="lazy"
              />
              <motion.span 
                className="absolute top-4 right-4 bg-white dark:bg-gray-900 text-primary dark:text-secondary px-3 py-1 rounded-full text-xs font-semibold"
                initial={{ opacity: 0, x: 20 }}
                whileHover={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                NEW DESIGN
              </motion.span>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <motion.h3 
                  className="text-white font-bold text-xl"
                  initial={{ y: 20, opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  Minimalist Closet Design
                </motion.h3>
                <motion.p 
                  className="text-gray-200 text-sm mt-2"
                  initial={{ y: 20, opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  Clean lines with optimal storage capacity
                </motion.p>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Image with interactive floating elements */}
          <motion.div 
            className="overflow-hidden rounded-lg shadow-lg"
            ref={el => imageRefs.current[2] = el}
            whileHover={{ scale: 1.05, rotate: 1, transition: { duration: 0.4 } }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative zoom-effect">
              <img 
                src={futuristicClosetImage}
                alt="Futuristic closet design with lighting"
                className="w-full h-64 object-cover"
                loading="lazy"
              />              <motion.div 
                className="absolute top-4 left-4 w-6 h-6 rounded-full bg-primary dark:bg-secondary opacity-80"
                initial={{ scale: 1, opacity: 0.7 }}
                animate={{ 
                  scale: 1.5,
                  opacity: 0.4,
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 1, 
                  repeatType: "reverse",
                  ease: "easeInOut" 
                }}
              />              <motion.div 
                className="absolute bottom-16 right-8 w-4 h-4 rounded-full bg-primary dark:bg-secondary opacity-80"
                initial={{ scale: 1, opacity: 0.7 }}
                animate={{ 
                  scale: 1.5,
                  opacity: 0.4,
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 1, 
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: 0.5 
                }}
              />
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <motion.h3 
                  className="text-white font-bold text-xl"
                  initial={{ y: 20, opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  Modern Illuminated Closet
                </motion.h3>
                <motion.p 
                  className="text-gray-200 text-sm mt-2"
                  initial={{ y: 20, opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  Integrated lighting highlights each section
                </motion.p>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Animated text information card */}
          <motion.div 
            className="bg-gradient-to-br from-primary/10 to-primary/5 dark:from-secondary/20 dark:to-secondary/10 p-8 rounded-lg flex flex-col justify-center shadow-lg"
            ref={el => imageRefs.current[3] = el}
            whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="text-2xl font-serif font-bold text-accent dark:text-secondary mb-4">
                {t('gallery.special.card.title', 'Custom Solutions')}
              </h3>
              <div className="w-16 h-1 bg-primary dark:bg-secondary mb-6"></div>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                {t('gallery.special.card.description', 'Our custom closet solutions are designed to maximize space while providing elegant organization for your wardrobe. Each closet is tailored to your specific needs and style preferences.')}
              </p>
              <motion.a 
                href="/contact" 
                className="inline-block bg-primary dark:bg-secondary text-white dark:text-gray-900 px-6 py-2 rounded-md hover:bg-primary/90 dark:hover:bg-secondary/90 transition-colors mt-auto self-start"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('gallery.special.card.cta', 'Request a Design')}
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GalleryMasonry;
