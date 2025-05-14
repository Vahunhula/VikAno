import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';
import kitchenImage from '../../assets/images/Kitchen.jpg';
import closetImage from '../../assets/images/Closet.jpg';
import bedroomImage from '../../assets/images/AnotherBedroom.jpg';

// Ensure ScrollTrigger is registered
gsap.registerPlugin(ScrollTrigger);

// Furniture data with local images
const featuredItems = [
  {
    id: 1,
    title: 'Modern Kitchen Design',
    description: 'Custom cabinetry with premium hardwood and elegant details',
    imageUrl: kitchenImage,
    price: '$8,500'
  },
  {
    id: 2,
    title: 'Luxury Closet Solution',
    description: 'Tailored storage system with integrated lighting and hardware',
    imageUrl: closetImage,
    price: '$5,200'
  },
  {
    id: 3,
    title: 'Bedroom Ensemble',
    description: 'Complete bedroom furniture set with matching finishes',
    imageUrl: bedroomImage,
    price: '$7,800'
  }
];

const FeaturedCollection = () => {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);
  
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
    <section ref={sectionRef} className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container-custom">
        <div className="text-center mb-12" ref={titleRef}>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-accent dark:text-secondary">{t('featured.title')}</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover our most popular handcrafted furniture pieces, made with attention to detail and quality materials
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">          {featuredItems.map((item, index) => (
            <div 
              key={item.id}
              ref={el => cardsRef.current[index] = el}
              className="bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="object-cover w-full h-64 hover:scale-105 transition-transform duration-500"
                />
              </div>              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-100">{t(`featured.items.${item.id === 1 ? 'kitchen' : item.id === 2 ? 'closet' : 'bedroom'}.title`)}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{t(`featured.items.${item.id === 1 ? 'kitchen' : item.id === 2 ? 'closet' : 'bedroom'}.description`)}</p>
                <div className="flex justify-between items-center">
                  <span className="text-primary dark:text-secondary font-bold text-xl">{item.price}</span>
                  <button className="text-accent dark:text-secondary hover:text-primary dark:hover:text-white transition-colors">
                    {t('featured.viewItem')}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
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
