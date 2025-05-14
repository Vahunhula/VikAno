import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { useTranslation } from 'react-i18next';
import logo from '../../assets/images/Logo.jpg';
// Import critical hero images to preload
import heroImage1 from '../../assets/images/BeforeUs.jpg';
import heroImage2 from '../../assets/images/AfterUs.jpg';

const LoadingScreen = ({ finishLoading }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const { t } = useTranslation();

  // Preload critical images
  useEffect(() => {
    const preloadImages = [heroImage1, heroImage2];
    let loadedCount = 0;

    const loadImage = (src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = reject;
      });
    };

    Promise.all(preloadImages.map(img => loadImage(img)))
      .then(() => {
        setAssetsLoaded(true);
      })
      .catch(err => {
        console.warn('Error preloading images', err);
        // Continue anyway if images fail to load
        setAssetsLoaded(true);
      });
  }, []);
  useEffect(() => {
    // Timeline for loading animations
    const tl = gsap.timeline();
    
    // If logo and critical assets are loaded, animate the loading screen
    if (imageLoaded && assetsLoaded) {
      // Initial pulse animation for logo
      tl.to('.loading-logo', {
        scale: 1.05, 
        duration: 0.8, 
        ease: 'power1.inOut',
        repeat: 1, 
        yoyo: true
      })
      .to('.loading-text', {
        opacity: 0,
        duration: 0.3
      }, "-=0.3")
      .to('.loading-logo', {
        scale: 1, 
        opacity: 0,
        duration: 0.5,
        delay: 0.2
      })
      .to('.loading-screen', {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          // Let the parent component know loading is complete
          finishLoading();
        }
      });
    }
  }, [imageLoaded, assetsLoaded, finishLoading]);

  const handleImageLoaded = () => {
    setImageLoaded(true);
  };
  return (
    <div className="loading-screen fixed inset-0 bg-white flex items-center justify-center z-[9999]">
      <div className="flex flex-col items-center">
        <div className={`loading-logo w-40 h-40 relative flex items-center justify-center ${!assetsLoaded ? 'pulse-animation' : ''}`}>
          <img 
            src={logo} 
            alt="VikAno Furniture Logo" 
            className="w-full h-full object-contain rounded-md shadow-md"
            onLoad={handleImageLoaded}
          />
          <div className="absolute -bottom-8">
            <div className="loading-dots flex space-x-2">
              <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
              <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
              <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
            </div>
          </div>
        </div>        <div className="loading-text mt-12 text-center">
          <p className="text-gray-600 font-serif text-lg">{t('app.title')}</p>
          <p className="text-sm text-gray-400 mt-2">{assetsLoaded ? t('app.ready', "Ready") : t('app.loading')}</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
