import React, { useState, useEffect, useRef } from 'react';

import { gsap } from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './Gallery.css';

// Import gallery items to get counts
import { galleryItems } from './GalleryGrid';

const categories = [
  { id: 'all', label: 'All', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
  { id: 'bedroom', label: 'Bedroom', icon: 'M3 5a2 2 0 012-2h1a1 1 0 011 1v1h8V4a1 1 0 011-1h1a2 2 0 012 2v3a2 2 0 01-2 2v1a2 2 0 012 2v3a2 2 0 01-2 2h-14a2 2 0 01-2-2v-3a2 2 0 012-2v-1a2 2 0 01-2-2V5zm1 10v3a1 1 0 001 1h14a1 1 0 001-1v-3a1 1 0 00-1-1h-14a1 1 0 00-1 1zm2-2h12v-1H6v1zm1-5V5a1 1 0 00-1 1v3a1 1 0 001 1h12a1 1 0 001-1V6a1 1 0 00-1-1H7z' },
  { id: 'kitchen', label: 'Kitchen', icon: 'M3 1a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1v4a1 1 0 011 1v5a1 1 0 01-1 1h-2a1 1 0 01-1-1v-5a1 1 0 011-1V4a1 1 0 01-1-1V1a1 1 0 00-1-1H6a1 1 0 00-1 1v2a1 1 0 01-1 1v4a1 1 0 011 1v5a1 1 0 01-1 1H2a1 1 0 01-1-1v-5a1 1 0 011-1h2V4H2a1 1 0 01-1-1V1z' },
  { id: 'cottage', label: 'Cottage', icon: 'M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z' },
  { id: 'closet', label: 'Closet', icon: 'M3 3a1 1 0 00-1 1v12a1 1 0 001 1h14a1 1 0 001-1V4a1 1 0 00-1-1H3zm1 2h12v10h-2.5v-1a1 1 0 00-1-1h-5a1 1 0 00-1 1v1H4V5zm8 5a1 1 0 00-1-1h-2a1 1 0 00-1 1v1a1 1 0 001 1h2a1 1 0 001-1V10zm-7-1a1 1 0 011-1h2a1 1 0 011 1v1a1 1 0 01-1 1H6a1 1 0 01-1-1V9z' },
  { id: 'bathroom', label: 'Bathroom', icon: 'M7 1a2 2 0 00-2 2v1h10V3a2 2 0 00-2-2H7zM5 5V4a3 3 0 013-3h4a3 3 0 013 3v1h2a1 1 0 011 1v4a1 1 0 01-1 1h-1v8a1 1 0 01-1 1H5a1 1 0 01-1-1v-8H3a1 1 0 01-1-1V6a1 1 0 011-1h2zm1 5h8V6H6v4zm1 1v7h6v-7H7z' }
];

const FilterCategories = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('all');
  const [isHovered, setIsHovered] = useState(null);
  const [categoryCounts, setCategoryCounts] = useState({});
  const filtersRef = useRef(null);
  
  // Calculate category counts
  useEffect(() => {
    const counts = {};
    categories.forEach(category => {
      // For 'all' category, count all items
      if (category.id === 'all') {
        counts[category.id] = galleryItems.length;
      } else {
        // Count items in this specific category
        counts[category.id] = galleryItems.filter(item => item.category === category.id).length;
      }
    });
    setCategoryCounts(counts);
  }, []);
  
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
              key={category.id}              onClick={() => handleCategoryClick(category.id)}
              onMouseEnter={() => setIsHovered(category.id)}
              onMouseLeave={() => setIsHovered(null)}
              className={`relative flex flex-col items-center px-5 py-3 rounded-lg transition-all duration-300 ${
                activeCategory === category.id 
                  ? 'bg-primary/10 dark:bg-secondary/20 shadow-md' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >              <motion.div 
                className={`w-10 h-10 mb-2 flex items-center justify-center rounded-full ${
                  activeCategory === category.id 
                    ? 'bg-primary dark:bg-secondary text-white dark:text-gray-900' 
                    : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200'
                }`}
                initial={false}
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
              )}              {/* Display actual item count on hover */}
              {isHovered === category.id && (
                <AnimatePresence>                  <motion.span 
                    className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center bg-primary dark:bg-secondary text-white dark:text-gray-900 text-xs font-bold rounded-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    {categoryCounts[category.id] || 0}
                  </motion.span>
                </AnimatePresence>
              )}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default FilterCategories;
