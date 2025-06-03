import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

const AboutPage = () => {
  const { t } = useTranslation();
  const headingRef = useRef(null);
  const contentRef = useRef(null);
  const missionRef = useRef(null);
  const valuesRef = useRef(null);
  
  useEffect(() => {
    // Animate elements on scroll
    const elements = [headingRef.current, contentRef.current, missionRef.current, valuesRef.current];
    
    elements.forEach((element, index) => {
      gsap.fromTo(
        element,
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1,
          delay: index * 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
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
    <div className="py-20 bg-white dark:bg-gray-900">
      {/* Hero section */}      <section className="relative bg-accent dark:bg-gray-800 py-28 mb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-accent/30 dark:from-secondary/30 dark:to-gray-700/30"></div>
        
        {/* Abstract geometric shapes in background */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 dark:bg-secondary/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/10 dark:bg-secondary/10 rounded-full translate-x-1/3 translate-y-1/3"></div>
        <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-primary/5 dark:bg-secondary/5 rounded-xl transform -translate-y-1/2 rotate-12"></div>
        
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-white">{t('about.title')}</h1>
            <div className="w-24 h-1 bg-primary dark:bg-secondary mx-auto mb-8"></div>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-light">
              {t('about.description', 'Our company specializes in the custom manufacturing of furniture, cottages, and kitchen interiors.')}
            </p>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-10"
            >              <div className="flex justify-center items-center space-x-4 text-white/90">
                <div className="text-center px-4 border-r border-white/20">
                  <span className="block text-4xl font-bold">15+</span>
                  <span className="text-sm uppercase tracking-wider">{t('about.hero.years')}</span>
                </div>
                <div className="text-center px-4 border-r border-white/20">
                  <span className="block text-4xl font-bold">500+</span>
                  <span className="text-sm uppercase tracking-wider">{t('about.hero.projects')}</span>
                </div>
                <div className="text-center px-4">
                  <span className="block text-4xl font-bold">100%</span>
                  <span className="text-sm uppercase tracking-wider">{t('about.hero.satisfaction')}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>{/* Company Overview */}
      <div className="container-custom mb-24">        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div ref={contentRef}>
            <h2 className="text-3xl font-serif font-bold mb-6 text-accent dark:text-secondary">{t('about.passionTitle')}</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              {t('about.companyOverview1')}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              {t('about.companyOverview2')}
            </p>
            <div className="mt-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 bg-primary/20 dark:bg-secondary/20 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary dark:text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>                <span className="text-gray-700 dark:text-gray-300">{t('about.features.customDesigns')}</span>
              </div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 bg-primary/20 dark:bg-secondary/20 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary dark:text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700 dark:text-gray-300">{t('about.features.premiumMaterials')}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-primary/20 dark:bg-secondary/20 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary dark:text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700 dark:text-gray-300">{t('about.features.collaborative')}</span>
              </div>
            </div>
          </div>
          
          <motion.div 
            className="rounded-lg overflow-hidden shadow-xl tilt-effect" 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-primary/10 dark:bg-secondary/10 p-12 rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">                  <div className="text-4xl font-bold text-accent dark:text-secondary mb-2">15+</div>
                  <div className="text-gray-600 dark:text-gray-300">{t('about.stats.yearsExperience')}</div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
                  <div className="text-4xl font-bold text-accent dark:text-secondary mb-2">500+</div>
                  <div className="text-gray-600 dark:text-gray-300">{t('about.stats.projectsCompleted')}</div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
                  <div className="text-4xl font-bold text-accent dark:text-secondary mb-2">98%</div>
                  <div className="text-gray-600 dark:text-gray-300">{t('about.stats.clientSatisfaction')}</div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
                  <div className="text-4xl font-bold text-accent dark:text-secondary mb-2">12</div>
                  <div className="text-gray-600 dark:text-gray-300">{t('about.stats.masterCraftsmen')}</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>      {/* Our Mission */}
      <div className="bg-gray-50 dark:bg-gray-800 py-20 mb-24">
        <div className="container-custom">          
          <div ref={missionRef} className="max-w-4xl mx-auto text-center">            <h2 className="text-3xl font-serif font-bold mb-8 text-accent dark:text-secondary">{t('about.mission')}</h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
              {t('about.missionText')} {t('about.missionDescription')}
            </p>
            <div className="flex flex-wrap justify-center gap-8 mt-12">
              <motion.div 
                className="max-w-xs p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="w-14 h-14 bg-primary/20 dark:bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary dark:text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>                <h3 className="text-xl font-bold mb-3 text-center text-gray-900 dark:text-white">{t('about.missionCardTitle')}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-center">
                  {t('about.missionCardDesc')}
                </p>
              </motion.div>
              <motion.div 
                className="max-w-xs p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-14 h-14 bg-primary/20 dark:bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary dark:text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-center text-gray-900 dark:text-white">{t('about.timelyServiceTitle')}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-center">
                  {t('about.timelyServiceDesc')}
                </p>
              </motion.div>
              <motion.div 
                className="max-w-xs p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="w-14 h-14 bg-primary/20 dark:bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary dark:text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-center text-gray-900 dark:text-white">{t('about.clientCollabTitle')}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-center">
                  {t('about.clientCollabDesc')}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div className="container-custom mb-24">        <div ref={valuesRef}>          <h2 className="text-3xl font-serif font-bold mb-12 text-center text-accent dark:text-secondary">{t('about.values')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: t('about.valuesCards.craftsmanshipTitle'),
                description: t('about.valuesCards.craftsmanshipDesc'),
                icon: "M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
              },
              {
                title: t('about.valuesCards.collaborationTitle'),
                description: t('about.valuesCards.collaborationDesc'),
                icon: "M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
              },
              {
                title: t('about.valuesCards.innovationTitle'),
                description: t('about.valuesCards.innovationDesc'),
                icon: "M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"
              },
              {
                title: t('about.valuesCards.excellenceTitle'),
                description: t('about.valuesCards.excellenceDesc'),
                icon: "M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z"
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-14 h-14 bg-primary/10 dark:bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary dark:text-secondary" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d={value.icon} clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-center text-gray-900 dark:text-white">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-center">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>      </div>      {/* Our Specializations */}
      <div className="container-custom mb-24">
        <h2 className="text-3xl font-serif font-bold mb-12 text-center text-accent dark:text-secondary">{t('about.specializations')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="h-48 relative overflow-hidden">
              <img 
                src={require('../../assets/images/NewBigBrownBedroom.jpg')} 
                alt="Elegant brown bedroom furniture"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
              <div className="absolute bottom-0 left-0 p-4 text-white">
                <span className="text-sm font-semibold bg-primary/80 dark:bg-secondary/80 px-2 py-1 rounded">PREMIUM</span>
              </div>
            </div>            <div className="p-6">
              <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">{t('about.furniture')}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {t('about.furnitureDescription')}
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-primary/10 dark:bg-secondary/10 text-primary dark:text-secondary text-sm rounded">{t('about.specialTags.tables')}</span>
                <span className="px-2 py-1 bg-primary/10 dark:bg-secondary/10 text-primary dark:text-secondary text-sm rounded">{t('about.specialTags.cabinets')}</span>
                <span className="px-2 py-1 bg-primary/10 dark:bg-secondary/10 text-primary dark:text-secondary text-sm rounded">{t('about.specialTags.shelving')}</span>
                <span className="px-2 py-1 bg-primary/10 dark:bg-secondary/10 text-primary dark:text-secondary text-sm rounded">{t('about.specialTags.chairs')}</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >            <div className="h-48 relative overflow-hidden">
              <img 
                src={require('../../assets/images/AnotherPictureOfSameCottage.jpg')} 
                alt="Modern cottage with garden view"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
              <div className="absolute bottom-0 left-0 p-4 text-white">
                <span className="text-sm font-semibold bg-primary/80 dark:bg-secondary/80 px-2 py-1 rounded">FEATURED</span>
              </div>
            </div>            <div className="p-6">
              <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">{t('about.cottages')}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {t('about.cottagesDescription')}
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-primary/10 dark:bg-secondary/10 text-primary dark:text-secondary text-sm rounded">{t('about.specialTags.design')}</span>
                <span className="px-2 py-1 bg-primary/10 dark:bg-secondary/10 text-primary dark:text-secondary text-sm rounded">{t('about.specialTags.construction')}</span>
                <span className="px-2 py-1 bg-primary/10 dark:bg-secondary/10 text-primary dark:text-secondary text-sm rounded">{t('about.specialTags.interiors')}</span>
                <span className="px-2 py-1 bg-primary/10 dark:bg-secondary/10 text-primary dark:text-secondary text-sm rounded">{t('about.specialTags.landscaping')}</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="h-48 relative overflow-hidden">
              <img 
                src={require('../../assets/images/Kitchen.jpg')} 
                alt="Modern kitchen design"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
              <div className="absolute bottom-0 left-0 p-4 text-white">
                <span className="text-sm font-semibold bg-primary/80 dark:bg-secondary/80 px-2 py-1 rounded">POPULAR</span>
              </div>
            </div>            <div className="p-6">
              <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">{t('about.kitchens')}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {t('about.kitchensDescription')}
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-primary/10 dark:bg-secondary/10 text-primary dark:text-secondary text-sm rounded">{t('about.specialTags.cabinetry')}</span>
                <span className="px-2 py-1 bg-primary/10 dark:bg-secondary/10 text-primary dark:text-secondary text-sm rounded">{t('about.specialTags.islands')}</span>
                <span className="px-2 py-1 bg-primary/10 dark:bg-secondary/10 text-primary dark:text-secondary text-sm rounded">{t('about.specialTags.storage')}</span>
                <span className="px-2 py-1 bg-primary/10 dark:bg-secondary/10 text-primary dark:text-secondary text-sm rounded">{t('about.specialTags.surfaces')}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Call to Action */}      <motion.div 
        className="bg-accent dark:bg-gray-800 text-white py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">            <div className="text-left">
              <h2 className="text-3xl font-serif font-bold mb-6">{t('about.cta')}</h2>
              <p className="text-xl mb-6 leading-relaxed">
                {t('about.ctaText')}
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="/gallery" className="btn-primary inline-flex items-center">
                  {t('about.exploreButton')}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="/contact" className="bg-white text-accent px-6 py-2 rounded-md hover:bg-gray-100 transition-all duration-300 inline-flex items-center">
                  {t('about.contactButton')}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </a>
              </div>
            </div>            <div className="bg-white/10 p-8 rounded-lg backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-4">{t('about.promise')}</h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/30 dark:bg-secondary/30 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-lg">{t('about.promiseList.timely')}</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/30 dark:bg-secondary/30 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-lg">{t('about.promiseList.quality')}</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/30 dark:bg-secondary/30 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-lg">{t('about.promiseList.closeCollaboration')}</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/30 dark:bg-secondary/30 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-lg">{t('about.promiseList.adapted')}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutPage;
