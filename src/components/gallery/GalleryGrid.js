import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';
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
export const galleryItems = [
  {
    id: 1,
    titleKey: 'gallery.items.1.title',
    descriptionKey: 'gallery.items.1.description',
    category: 'kitchen',
    imageUrl: kitchenImage
  },
  {
    id: 2,
    titleKey: 'gallery.items.2.title',
    descriptionKey: 'gallery.items.2.description',
    category: 'closet',
    imageUrl: closetImage
  },
  {
    id: 3,
    titleKey: 'gallery.items.3.title',
    descriptionKey: 'gallery.items.3.description',
    category: 'bedroom',
    imageUrl: bedroomImage
  },
  {
    id: 4,
    titleKey: 'gallery.items.4.title',
    descriptionKey: 'gallery.items.4.description',
    category: 'bedroom',
    imageUrl: anotherBedroomImage
  },
  {
    id: 5,
    titleKey: 'gallery.items.5.title',
    descriptionKey: 'gallery.items.5.description',
    category: 'bathroom',
    imageUrl: bigBathroomImage
  },
  {
    id: 6,
    titleKey: 'gallery.items.6.title',
    descriptionKey: 'gallery.items.6.description',
    category: 'closet',
    imageUrl: anotherBiggerCloset
  },
  {
    id: 7,
    titleKey: 'gallery.items.7.title',
    descriptionKey: 'gallery.items.7.description',
    category: 'bedroom',
    featured: true,
    imageUrl: newBrownBedroomImage
  },
  {
    id: 8,
    titleKey: 'gallery.items.8.title',
    descriptionKey: 'gallery.items.8.description',
    category: 'cottage',
    featured: true,
    imageUrl: cottageImage
  },
  {
    id: 9,
    titleKey: 'gallery.items.9.title',
    descriptionKey: 'gallery.items.9.description',
    category: 'cottage',
    featured: true,
    imageUrl: anotherCottageImage
  }
];

const GalleryGrid = () => {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);  const [filteredItems, setFilteredItems] = useState(galleryItems);

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
      });    }
  }, [filteredItems]);

  return (
    <section ref={sectionRef} className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container-custom">
        <h2 className="sr-only">Gallery Grid</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              ref={el => itemsRef.current[index] = el}
              className="gallery-item relative group overflow-hidden rounded-lg shadow-lg h-[300px]"
            >              {/* Front of card */}
              <div className="absolute inset-0 overflow-hidden rounded-lg">
                <div className="h-full w-full overflow-hidden">
                  <img 
                    src={item.imageUrl} 
                    alt={t(item.titleKey)}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                    {item.featured && (
                      <span className="absolute top-4 right-4 bg-primary/90 dark:bg-secondary/90 text-white text-xs font-bold uppercase px-2 py-1 rounded-sm">
                        {t('gallery.featured', 'New')}
                      </span>
                    )}
                    <h3 className="text-white font-bold text-xl mb-1">
                      {t(item.titleKey)}
                    </h3>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="h-1 w-10 bg-primary dark:bg-secondary"></span>
                      <span className="text-white text-xs uppercase tracking-wider">{item.category}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredItems.length === 0 && (
          <div className="text-center py-20">            <p className="text-xl text-gray-600 dark:text-gray-300">
              {t('gallery.noItems', 'No items found in this category. Please try another filter.')}
            </p>
          </div>        )}
      </div>
    </section>
  );
};

export default GalleryGrid;
