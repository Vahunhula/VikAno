import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './Gallery.css';

const categories = [
  { id: 'all', label: 'All', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
  { id: 'bedroom', label: 'Bedroom', icon: 'M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.027 1.028a4 4 0 00-2.171.102l-.47.156a4 4 0 01-2.53 0l-.563-.187a1.993 1.993 0 00-.114-.035l1.063-1.063A3 3 0 009 8.172z' },
  { id: 'kitchen', label: 'Kitchen', icon: 'M3 1a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1v4a1 1 0 011 1v5a1 1 0 01-1 1h-2a1 1 0 01-1-1v-5a1 1 0 011-1V4a1 1 0 01-1-1V1a1 1 0 00-1-1H6a1 1 0 00-1 1v2a1 1 0 01-1 1v4a1 1 0 011 1v5a1 1 0 01-1 1H2a1 1 0 01-1-1v-5a1 1 0 011-1h2V4H2a1 1 0 01-1-1V1z' },
  { id: 'cottage', label: 'Cottage', icon: 'M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z' },
  { id: 'closet', label: 'Closet', icon: 'M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z' },
  { id: 'bathroom', label: 'Bathroom', icon: 'M5 1a2 2 0 00-2 2v16l7-3 7 3V3a2 2 0 00-2-2H5z' }
];

const FilterCategories = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('all');
  const [isHovered, setIsHovered] = useState(null);
  const filtersRef = useRef(null);
  
  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
    // Dispatch event to filter gallery items
    document.dispatchEvent(new CustomEvent('filterGallery', { detail: categoryId }));
  };

  return (
    <div className="py-12 bg-white dark:bg-gray-800">
      <div className="container-custom">
        <motion.div
          className="mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
            {t('gallery.filter.title', 'Filter Collection')}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-lg mx-auto">
            {t('gallery.filter.description', 'Explore our designs by category or view our complete collection')}
          </p>
        </motion.div>
      
        <motion.div 
          ref={filtersRef}
          className="flex flex-wrap justify-center gap-3 md:gap-6 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {categories.map((category, index) => (
            <motion.button 
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              onMouseEnter={() => setIsHovered(category.id)}
              onMouseLeave={() => setIsHovered(null)}
              className={`relative flex flex-col items-center px-5 py-3 rounded-lg transition-all duration-300 ${
                activeCategory === category.id 
                  ? 'bg-primary/10 dark:bg-secondary/20 shadow-md' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <motion.div 
                className={`w-10 h-10 mb-2 flex items-center justify-center rounded-full ${
                  activeCategory === category.id 
                    ? 'bg-primary dark:bg-secondary text-white dark:text-gray-900' 
                    : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200'
                }`}
                initial={false}                animate={activeCategory === category.id ? { 
                  scale: 1.2, 
                  backgroundColor: activeCategory === category.id ? '#ff6b6b' : '#e2e8f0'
                } : { scale: 1 }}
                transition={{ 
                  duration: 0.4,
                  repeatType: "reverse",
                  repeat: activeCategory === category.id ? 1 : 0
                }}
              >
                <svg 
                  className="w-5 h-5" 
                  fill="currentColor" 
                  viewBox="0 0 20 20" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d={category.icon} />
                </svg>
              </motion.div>

              <span className={`font-medium ${
                activeCategory === category.id 
                  ? 'text-primary dark:text-secondary' 
                  : 'text-gray-700 dark:text-gray-300'
              }`}>
                {t(`gallery.categories.${category.id}`, category.label)}
              </span>
              
              {/* Animated indicator for active category */}
              {activeCategory === category.id && (
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 mx-auto w-12 h-0.5 bg-primary dark:bg-secondary"
                  layoutId="activeIndicator"
                  initial={{ width: 0 }}
                  animate={{ width: '50%' }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
                {/* Badge counter (mockup) */}
              {isHovered === category.id && (category.id === 'cottage' || category.id === 'bedroom') && (
                <motion.span 
                  className="absolute -top-2 -right-2 px-2 flex items-center justify-center bg-primary dark:bg-secondary text-white dark:text-gray-900 text-xs font-bold rounded-full"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  {t('gallery.featured', 'New')}
                </motion.span>
              )}
              {isHovered === category.id && !(category.id === 'cottage' || category.id === 'bedroom') && (
                <motion.span 
                  className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center bg-primary dark:bg-secondary text-white dark:text-gray-900 text-xs font-bold rounded-full"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  {Math.floor(Math.random() * 5) + 1}
                </motion.span>
              )}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default FilterCategories;
