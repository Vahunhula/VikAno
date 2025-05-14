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
          className="fixed top-16 left-0 right-0 bottom-0 bg-white dark:bg-gray-900 z-50 flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col items-center">
            <div className="grid grid-cols-3 gap-2">
              {[...Array(9)].map((_, i) => (                <motion.div
                  key={i}
                  className="w-5 h-5 bg-primary dark:bg-secondary rounded-full"
                  initial={{ scale: 1, opacity: 1 }}
                  animate={{
                    scale: 1.5,
                    opacity: 0.7,
                  }}
                  transition={{
                    duration: 0.75,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: i * 0.1,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>            <motion.p 
              className="mt-6 text-lg text-gray-800 dark:text-gray-200"
              initial={{ opacity: 0.5 }}
              animate={{ 
                opacity: 1,
              }}
              transition={{
                duration: 0.75,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            >
              Loading Gallery...
            </motion.p>
          </div>
        </motion.div>
      ) : (
        <motion.div 
          key="content"
          className="dark:bg-gray-900 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
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
