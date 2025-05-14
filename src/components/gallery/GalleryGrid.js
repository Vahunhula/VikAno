import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import './Gallery.css';

// Import images
import kitchenImage from '../../assets/images/Kitchen.jpg';
import closetImage from '../../assets/images/Closet.jpg';
import bedroomImage from '../../assets/images/Bedroom.jpg';
import anotherBedroomImage from '../../assets/images/AnotherBedroom.jpg';
import bigBathroomImage from '../../assets/images/BigBathroom.jpg';
import anotherBiggerCloset from '../../assets/images/AnotherBiggerCloset.jpg';
import cottageImage from '../../assets/images/Cottage.jpg';
import anotherCottageImage from '../../assets/images/AnotherPictureOfSameCottage.jpg';
import newBrownBedroomImage from '../../assets/images/NewBigBrownBedroom.jpg';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Gallery data
const galleryItems = [
  {
    id: 1,
    title: 'Modern Kitchen Design',
    category: 'kitchen',
    description: 'Custom cabinetry with premium hardwood and elegant details',
    imageUrl: kitchenImage
  },
  {
    id: 2,
    title: 'Luxury Closet Solution',
    category: 'closet',
    description: 'Tailored storage system with integrated lighting',
    imageUrl: closetImage
  },
  {
    id: 3,
    title: 'Master Bedroom Suite',
    category: 'bedroom',
    description: 'Complete bedroom furniture set with custom headboard',
    imageUrl: bedroomImage
  },
  {
    id: 4,
    title: 'Contemporary Bedroom',
    category: 'bedroom',
    description: 'Modern bedroom design with clean lines',
    imageUrl: anotherBedroomImage
  },
  {
    id: 5,
    title: 'Luxury Bathroom',
    category: 'bathroom',
    description: 'Custom bathroom cabinetry and vanity',
    imageUrl: bigBathroomImage
  },
  {
    id: 6,
    title: 'Walk-in Closet Design',
    category: 'closet',
    description: 'Premium walk-in closet with specialized compartments',
    imageUrl: anotherBiggerCloset
  },
  {
    id: 7,
    title: 'Elegant Brown Bedroom',
    category: 'bedroom',
    featured: true,
    description: 'Luxurious bedroom with rich brown tones and custom woodwork',
    imageUrl: newBrownBedroomImage
  },
  {
    id: 8,
    title: 'Modern Cottage Exterior',
    category: 'cottage',
    featured: true,
    description: 'Contemporary cottage design with natural wood elements',
    imageUrl: cottageImage
  },
  {
    id: 9,
    title: 'Cottage Garden View',
    category: 'cottage',
    featured: true,
    description: 'Charming cottage with landscaped surroundings and patio',
    imageUrl: anotherCottageImage
  }
];

const GalleryGrid = () => {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);
  const [filteredItems, setFilteredItems] = useState(galleryItems);
  const [selectedItem, setSelectedItem] = useState(null);

  // Listen for filter changes
  useEffect(() => {
    const handleFilterChange = (e) => {
      const category = e.detail;
      
      if (category === 'all') {
        setFilteredItems(galleryItems);
      } else {
        setFilteredItems(galleryItems.filter(item => item.category === category));
      }
    };
    
    document.addEventListener('filterGallery', handleFilterChange);
    
    return () => {
      document.removeEventListener('filterGallery', handleFilterChange);
    };
  }, []);

  useEffect(() => {
    // Reset animations when filtered items change
    if (itemsRef.current.length > 0) {
      // Clear any existing animations
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.id && trigger.vars.id.includes('galleryItem')) {
          trigger.kill();
        }
      });

      // Apply new animations
      itemsRef.current.forEach((item, i) => {
        if (!item) return;
        
        gsap.fromTo(
          item,
          { opacity: 0, y: 50 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.7,
            delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 90%',
              id: `galleryItem-${i}`
            }
          }
        );
      });
    }
  }, [filteredItems]);

  const openItemDetail = (item) => {
    setSelectedItem(item);
    document.body.style.overflow = 'hidden';
  };

  const closeItemDetail = () => {
    setSelectedItem(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <section ref={sectionRef} className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container-custom">
        <h2 className="sr-only">Gallery Grid</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              ref={el => itemsRef.current[index] = el}
              className="gallery-item relative group cursor-pointer overflow-hidden rounded-lg shadow-lg perspective-1000 h-[300px] transform-style-3d transition-all duration-1000 hover:rotate-y-180"
              onClick={() => openItemDetail(item)}
              style={{ perspective: "1000px" }}
            >
              {/* Front of card */}
              <div className="absolute inset-0 backface-hidden overflow-hidden rounded-lg">
                <div className="h-full w-full overflow-hidden">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    loading="lazy"
                  />              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                    {item.featured && (
                      <span className="absolute top-4 right-4 bg-primary/90 dark:bg-secondary/90 text-white text-xs font-bold uppercase px-2 py-1 rounded-sm">New</span>
                    )}
                    <h3 className="text-white font-bold text-xl mb-1">
                      {item.title}
                    </h3>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="h-1 w-10 bg-primary dark:bg-secondary"></span>
                      <span className="text-white text-xs uppercase tracking-wider">{item.category}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Back of card */}
              <div className="absolute inset-0 bg-gradient-to-b from-primary/90 dark:from-secondary/90 to-gray-900 dark:to-gray-800 p-6 flex flex-col justify-center items-center text-center rotate-y-180 backface-hidden rounded-lg">
                <div className="mb-4">
                  <svg className="w-12 h-12 mx-auto text-white dark:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2m8-13a4 4 0 100-8 4 4 0 000 8z" />
                  </svg>
                </div>
                <h3 className="text-white dark:text-gray-900 font-bold text-xl mb-3">
                  {item.title}
                </h3>
                <p className="text-white/90 dark:text-gray-900/90 mb-4">
                  {item.description}
                </p>
                <span className="px-4 py-2 bg-white dark:bg-gray-900 text-primary dark:text-secondary rounded-full text-sm font-medium">
                  View Details
                </span>
              </div>
            </div>
          ))}
        </div>
        
        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600 dark:text-gray-300">
              No items found in this category. Please try another filter.
            </p>
          </div>
        )}
      </div>

      {/* Item detail modal */}
      {selectedItem && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
          onClick={closeItemDetail}
        >
          <div 
            className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="relative">
              <img 
                src={selectedItem.imageUrl}
                alt={selectedItem.title}
                className="w-full max-h-[60vh] object-cover"
              />
              <button 
                onClick={closeItemDetail}
                className="absolute top-4 right-4 bg-white/80 dark:bg-gray-800/80 rounded-full p-2 hover:bg-white hover:dark:bg-gray-700 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">{selectedItem.title}</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">{selectedItem.description}</p>
              
              <div className="flex items-center">
                <span className="bg-primary/20 dark:bg-secondary/20 text-primary dark:text-secondary px-3 py-1 rounded-full text-sm">
                  {selectedItem.category.charAt(0).toUpperCase() + selectedItem.category.slice(1)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default GalleryGrid;
