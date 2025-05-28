import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';
import kitchenImage from '../../assets/images/Kitchen.jpg';
import closetImage from '../../assets/images/Closet.jpg';
import bedroomImage from '../../assets/images/AnotherBedroom.jpg';

// Ensure ScrollTrigger is registered
gsap.registerPlugin(ScrollTrigger);

// Furniture data with local images (IDs match translation keys)
const featuredItems = [  {
    id: 1,
    key: 'kitchen',
    imageUrl: kitchenImage,
    size: '12 მ²',
    price: '6,500'
  },  {
    id: 2,
    key: 'closet',
    imageUrl: closetImage,
    size: '300×260 სმ',
    price: '2,000'
  },{
    id: 3,
    key: 'bedroom',
    imageUrl: bedroomImage,
    size: '200×180 სმ',
    price: '1,300'
  }
];

const FeaturedCollection = () => {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);
  const closeButtonRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);    const handleViewItem = (item) => {
    // Store current scroll position before showing modal
    const currentScrollPos = window.pageYOffset || document.documentElement.scrollTop;
    setScrollPosition(currentScrollPos);
    
    // Immediately show the modal without trying to adjust scroll position
    setSelectedItem(item);
    setShowPopup(true);
    
    // Prevent body scrolling while modal is open
    document.body.style.overflow = 'hidden';
  };    const closePopup = () => {
    if (showPopup) {
      // Detect iOS device
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
      
      // Use simpler animation for iOS
      if (isIOS) {
        gsap.to(popupRef.current, {
          opacity: 0,
          duration: 0.15,
          ease: 'power1.in',
          onComplete: () => {
            setShowPopup(false);
            setSelectedItem(null);
            
            // Restore scrolling
            document.body.style.overflow = '';
            
            // Restore scroll position on non-iOS devices
            window.scrollTo({
              top: scrollPosition,
              behavior: 'auto'
            });
          }
        });
      } else {
        gsap.to(popupRef.current, {
          opacity: 0,
          y: 20,
          scale: 0.95,
          duration: 0.2,
          ease: 'power2.in',
          onComplete: () => {
            setShowPopup(false);
            setSelectedItem(null);
            
            // Restore scrolling
            document.body.style.overflow = '';
            
            // Restore scroll position
            window.scrollTo({
              top: scrollPosition,
              behavior: 'auto'
            });
          }
        });
      }
    }
  };
    // Handle popup keyboard interactions and animations
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        closePopup();
      }
    };

    if (showPopup) {
      closeButtonRef.current?.focus();
      
      // Detect iOS device
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
      
      // Use simpler animation for iOS to improve performance
      if (isIOS) {
        gsap.fromTo(
          popupRef.current,
          { 
            opacity: 0
          },
          { 
            opacity: 1,
            duration: 0.2,
            ease: 'power1.out'
          }
        );
      } else {
        gsap.fromTo(
          popupRef.current,
          { 
            opacity: 0,
            y: 20,
            scale: 0.95
          },
          { 
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
          }
        );
      }
      
      window.addEventListener('keydown', handleEscKey);
    }
    
    return () => {
      window.removeEventListener('keydown', handleEscKey);
    };
  }, [showPopup]);
  
  useEffect(() => {
    // Animation for title
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );
    
    // Animation for cards
    cardsRef.current.forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2 * index,
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  return (
    <section ref={sectionRef} className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="container-custom">
        <div className="text-center mb-12" ref={titleRef}>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-accent dark:text-secondary">{t('featured.title')}</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors duration-300">
            {t('featured.description')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredItems.map((item, index) => (
            <div 
              key={item.id}
              ref={el => cardsRef.current[index] = el}
              className="bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                <img 
                  src={item.imageUrl} 
                  alt={t(`featured.items.${item.key}.title`)}
                  className="object-cover w-full h-64 hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-100">
                  {t(`featured.items.${item.key}.title`)}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {t(`featured.items.${item.key}.description`)}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-primary dark:text-secondary font-bold text-xl">
                    <span className="font-normal text-sm mr-1">₾</span>
                    {item.price}
                  </span>
                  <button 
                    onClick={() => handleViewItem(item)}
                    className="text-accent dark:text-secondary hover:text-primary dark:hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-secondary rounded-md px-3 py-1"
                  >
                    {t('featured.viewItem')}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>            {/* Popup Modal */}        {showPopup && selectedItem && (          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 overflow-y-auto overflow-x-hidden"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                closePopup();
              }
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="dialog-title"
            style={{ WebkitOverflowScrolling: 'touch' }} /* Improve iOS scrolling */
          >            <div className="min-h-screen px-4 flex items-center justify-center py-6 sm:py-8">
              <div 
                ref={popupRef}
                className="relative bg-white dark:bg-gray-800 rounded-lg w-full max-w-3xl mx-auto shadow-2xl overflow-hidden transition-colors duration-300 flex flex-col md:flex-row"
                style={{ maxHeight: 'calc(100vh - 40px)' }} /* Prevent modal from extending beyond viewport */
              >
                {/* Close button */}
                <button
                  ref={closeButtonRef}
                  onClick={closePopup}
                  className="absolute top-4 right-4 z-10 text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-secondary rounded-full p-1 bg-gray-800/50"
                  aria-label={t('featured.close')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>                {/* Image Section - Left Side */}                <div className="relative md:w-2/5 h-56 md:h-auto">
                  <img 
                    src={selectedItem.imageUrl}
                    alt={t(`featured.items.${selectedItem.key}.title`)}
                    className="w-full h-full object-cover md:h-full md:rounded-l-lg"
                    style={{ maxHeight: '350px' }} /* Control image height on mobile */
                  />
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/60 to-transparent md:rounded-l-lg"></div>
                  <h3 
                    id="dialog-title" 
                    className="absolute bottom-4 left-6 md:bottom-6 md:left-6 text-2xl font-bold text-white"
                  >
                    {t(`featured.items.${selectedItem.key}.title`)}
                  </h3>
                </div>                {/* Content Section - Right Side */}
                <div className="p-6 md:p-8 space-y-4 md:w-3/5 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 40px)', WebkitOverflowScrolling: 'touch' }}><div className="flex items-center justify-between mb-6">
                    <div className="text-gray-600 dark:text-gray-300">
                      <span className="font-semibold">{t('calculator.size')}:</span> {selectedItem.size}
                    </div>
                    <div className="text-primary dark:text-secondary font-bold text-2xl">
                      <span className="font-normal text-base mr-1">₾</span>
                      {selectedItem.price}
                    </div>
                  </div>                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                      {t('featured.materials')}:
                    </h4>
                    <ul className="grid gap-2 text-gray-600 dark:text-gray-300">
                      {t(`featured.items.${selectedItem.key}.materials`, { returnObjects: true }).map((material, index) => (
                        <li key={index} className="flex items-center">
                          <svg className="h-5 w-5 text-primary dark:text-secondary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {material}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-end space-x-4 pt-4 mt-auto">
                    <button
                      onClick={closePopup}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                    >
                      {t('featured.close')}
                    </button>
                    <a 
                      href="/contact" 
                      className="btn-primary"
                      onClick={(e) => {
                        e.preventDefault();
                        closePopup();
                        window.location.href = '/contact';
                      }}
                    >
                      {t('calculator.contactQuote')}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="text-center mt-12">
          <a href="/gallery" className="btn-primary">
            {t('navbar.gallery')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollection;
