import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useTranslation } from 'react-i18next';

/**
 * IOSModal component - A specialized modal component for iOS devices
 * Designed to work around iOS Safari's quirks with position:fixed and scrolling
 */
const IOSModal = ({ item, onClose, isOpen }) => {
  const { t } = useTranslation();
  const modalRef = useRef(null);
  const contentRef = useRef(null);
    // Handle animations and keyboard events
  useEffect(() => {
    if (isOpen) {
      // Simple fade in for iOS
      gsap.to(modalRef.current, {
        opacity: 1,
        duration: 0.2,
        ease: 'power1.out'
      });
      
      // Prevent background scrolling
      document.body.classList.add('ios-modal-open');

      // Disable touchmove on body
      const preventScroll = (e) => {
        if (e.target === modalRef.current) {
          e.preventDefault();
        }
      };
      document.addEventListener('touchmove', preventScroll, { passive: false });
      
      // Handle escape key
      const handleEsc = (e) => {
        if (e.key === 'Escape') onClose();
      };
      
      window.addEventListener('keydown', handleEsc);
      return () => {
        window.removeEventListener('keydown', handleEsc);
        document.removeEventListener('touchmove', preventScroll);
        document.body.classList.remove('ios-modal-open');
        
        // Add a small delay to allow the fade out animation to complete
        setTimeout(() => {
          // This is the critical fix: we need to force a repaint
          window.scrollTo(0, window.pageYOffset);
        }, 50);
      };
    }
  }, [isOpen, onClose]);
  
  if (!isOpen || !item) return null;
    return (
    <div
      ref={modalRef}
      className="ios-modal-wrapper"
      style={{
        opacity: 0,        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: 'calc(var(--vh, 1vh) * 100)',
        zIndex: 9999,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        paddingTop: 'env(safe-area-inset-top)',
        paddingBottom: 'env(safe-area-inset-bottom)',
        paddingLeft: 'env(safe-area-inset-left)',
        paddingRight: 'env(safe-area-inset-right)',
      }}
      onClick={(e) => {
        if (e.target === modalRef.current) onClose();
      }}
    >      <div 
        className="ios-modal-container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',          minHeight: '100%',
          width: '100%',
          padding: '20px',
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0
        }}
      >
        <div          ref={contentRef}
          className="ios-modal-content"
          style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            width: '90%',
            maxWidth: '360px',
            overflow: 'hidden',
            boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
          }}
        >
          {/* Close Button */}
          <button
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              zIndex: 2,
              background: 'rgba(0,0,0,0.5)',
              border: 'none',
              borderRadius: '50%',
              width: '30px',
              height: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '20px'
            }}
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
          
          {/* Image Header */}
          <div style={{ position: 'relative', height: '160px' }}>
            <img
              src={item.imageUrl}
              alt={t(`featured.items.${item.key}.title`)}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                padding: '20px 15px 15px 15px'
              }}
            >
              <h3 style={{ margin: 0, color: 'white', fontSize: '18px', fontWeight: 'bold' }}>
                {t(`featured.items.${item.key}.title`)}
              </h3>
            </div>
          </div>
          
          {/* Content */}
          <div style={{ padding: '15px', overflow: 'auto' }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginBottom: '15px' 
            }}>
              <div style={{ color: '#666' }}>
                <span style={{ fontWeight: 'bold' }}>{t('calculator.size')}:</span> {item.size}
              </div>
              <div style={{ color: '#007bff', fontWeight: 'bold', fontSize: '18px' }}>
                <span style={{ fontWeight: 'normal', fontSize: '14px' }}>₾</span>
                {item.price}
              </div>
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <h4 style={{ margin: '0 0 10px 0', color: '#333' }}>
                {t('featured.materials')}:
              </h4>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                {t(`featured.items.${item.key}.materials`, { returnObjects: true }).map((material, index) => (
                  <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                    <svg style={{ width: '16px', height: '16px', marginRight: '8px', color: '#007bff' }} viewBox="0 0 24 24">
                      <path fill="currentColor" d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z" />
                    </svg>
                    {material}
                  </li>
                ))}
              </ul>
            </div>
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'flex-end', 
              gap: '10px', 
              marginTop: '20px' 
            }}>
              <button
                onClick={onClose}
                style={{
                  padding: '8px 16px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  background: 'transparent',
                  color: '#333'
                }}
              >
                {t('featured.close')}
              </button>
              
              <a
                href="/contact"
                onClick={(e) => {
                  e.preventDefault();
                  onClose();
                  window.location.href = '/contact';
                }}
                style={{
                  padding: '8px 16px',
                  background: '#007bff',
                  color: 'white',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  display: 'inline-block'
                }}
              >
                {t('calculator.contactQuote')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IOSModal;
