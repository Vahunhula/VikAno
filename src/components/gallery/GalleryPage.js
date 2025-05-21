import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GalleryHero from './GalleryHero';
import GalleryGrid from './GalleryGrid';
import FilterCategories from './FilterCategories';
import GalleryMasonry from './GalleryMasonry';
import GalleryProjectSpotlight from './GalleryProjectSpotlight';
import './Gallery.css';

const GalleryPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading time for animation purposes
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <AnimatePresence mode="wait">
      {isLoading ? (        <motion.div 
          key="loader"
          className="fixed inset-0 bg-white dark:bg-gray-900 z-50 flex flex-col justify-center"
          style={{ paddingTop: '8rem' }}
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            y: -30,
            transition: { duration: 0.7, ease: "easeInOut" }
          }}
          transition={{ duration: 0.5 }}
        ><div className="flex flex-col items-center">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 dark:bg-secondary/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-primary/5 dark:bg-secondary/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
            
            {/* Enhanced loading animation */}
            <div className="relative">
              <motion.div 
                className="grid grid-cols-3 gap-3 p-4 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm rounded-xl shadow-lg"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
              >
                {[...Array(9)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-6 h-6 bg-primary dark:bg-secondary rounded-md shadow-md"
                    initial={{ scale: 1, opacity: 0.6, rotate: 0 }}
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.6, 1, 0.6],
                      rotate: i % 2 === 0 ? [0, 90, 0] : [0, -90, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.1,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </motion.div>
            </div>
            
            <motion.div 
              className="mt-8 relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <motion.p 
                className="text-xl font-serif text-gray-800 dark:text-gray-200 relative z-10"
                initial={{ opacity: 0.5, y: 5 }}
                animate={{ 
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
              >
                Loading Gallery<motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    repeatType: "loop",
                    repeatDelay: 0.5,
                    ease: "easeInOut"
                  }}
                >...</motion.span>
              </motion.p>
              <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-primary/40 dark:via-secondary/40 to-transparent mt-2"></div>
            </motion.div>
          </div>
        </motion.div>
      ) : (        <motion.div 
          key="content"
          className="dark:bg-gray-900 overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <GalleryHero />
          <FilterCategories />
          <GalleryGrid />
          <GalleryMasonry />
          <GalleryProjectSpotlight />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GalleryPage;
