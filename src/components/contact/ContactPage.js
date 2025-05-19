import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';
import contactHeroImage from '../../assets/images/BigBathroom.jpg';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const ContactPage = () => {
  const { t } = useTranslation();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState(null);
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const formRef = useRef(null);
  const formContainerRef = useRef(null);
  const infoRef = useRef(null);
  const mapRef = useRef(null);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };
  
  // Handle automatic phone dialing for all users
  const handlePhoneClick = (e) => {
    e.preventDefault();
    window.location.href = `tel:${t('contact.info.phone')}`;
  };  
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    try {
      // Submit the form directly to formsubmit.co
      const form = formRef.current;
      const formData = new FormData(form);
      
      const response = await fetch("https://formsubmit.co/VikAnoBiz@gmail.com", {
        method: "POST",
        body: formData
      });
      
      if (response.ok) {
        // Reset form
        setFormState({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        
        setFormStatus('success');
        
        // Clear success message after 5 seconds
        setTimeout(() => {
          setFormStatus(null);
        }, 5000);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error(error);
      setFormStatus('error');
      
      // Clear error message after 5 seconds
      setTimeout(() => {
        setFormStatus(null);
      }, 5000);
    }
  };

  // GSAP animations
  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(
      heroRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: 'power3.out' }
    );

    // Animate content sections when they come into view
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 80%',
        }
      }
    );    // Animate form and info sections
    gsap.fromTo(
      [formContainerRef.current, infoRef.current],
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: formContainerRef.current,
          start: 'top 80%',
        }
      }
    );

    // Animate map
    gsap.fromTo(
      mapRef.current,
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: mapRef.current,
          start: 'top 80%',
        }
      }
    );

    // Clean up ScrollTrigger instances when component unmounts
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative bg-cover bg-center h-[50vh] flex items-center"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.4)), url(${contactHeroImage})`
        }}
      >
        <div className="container-custom text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
            {t('contact.title')}
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mb-8 text-gray-200">
            {t('contact.description')}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section ref={contentRef} className="py-20 bg-white dark:bg-gray-900">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-accent">
              {t('contact.callToAction')}
            </h2>
            <div className="h-1 w-24 bg-primary dark:bg-secondary mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">            {/* Contact Form */}
            <div ref={formContainerRef} className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
              <h3 className="text-2xl font-serif font-bold mb-6 text-gray-800 dark:text-gray-200">
                {t('contact.form.submit')}
              </h3>

              {formStatus === 'success' && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6"
                >
                  {t('contact.form.success')}
                </motion.div>
              )}

              {formStatus === 'error' && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6"
                >
                  {t('contact.form.error')}
                </motion.div>
              )}              <form ref={formRef} onSubmit={handleSubmit} action="https://formsubmit.co/VikAnoBiz@gmail.com" method="POST">
                <input type="hidden" name="_subject" value="New message from VikAno website" />
                <input type="hidden" name="_next" value={window.location.href} />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_autoresponse" value="Thank you for contacting VikAno Furniture. We have received your message and will get back to you soon." />
                
                <div className="mb-6">
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t('contact.form.name')}
                  </label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formState.name}
                    onChange={(e) => setFormState({...formState, name: e.target.value})}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-secondary bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t('contact.form.email')}
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    value={formState.email}
                    onChange={(e) => setFormState({...formState, email: e.target.value})}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-secondary bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t('contact.form.subject')}
                  </label>
                  <input 
                    type="text" 
                    id="subject" 
                    name="subject"
                    value={formState.subject}
                    onChange={(e) => setFormState({...formState, subject: e.target.value})}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-secondary bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t('contact.form.message')}
                  </label>
                  <textarea 
                    id="message" 
                    name="message"
                    value={formState.message}
                    onChange={(e) => setFormState({...formState, message: e.target.value})}
                    required
                    rows="5"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-secondary bg-white dark:bg-gray-700 text-gray-800 dark:text-white"                  ></textarea>
                </div>
                <input type="hidden" name="_cc" value="VikanoBiz@gmail.com" />                <button 
                  type="submit" 
                  disabled={formStatus === 'submitting'}
                  className="btn-primary w-full py-3 flex items-center justify-center"
                >
                  {formStatus === 'submitting' ? (
                    <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    t('contact.form.submit')
                  )}
                </button>
                
                {/* honeypot to prevent spam */}
                <input type="text" name="_honey" style={{display: 'none'}} />
              </form>
            </div>

            {/* Contact Information */}
            <div ref={infoRef} className="space-y-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
                <h3 className="text-2xl font-serif font-bold mb-6 text-gray-800 dark:text-gray-200">
                  {t('contact.title')}
                </h3>

                <div className="space-y-6">
                  {/* Address */}
                  <div className="flex items-start">
                    <div className="bg-primary dark:bg-secondary p-3 rounded-full text-white mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-1">{t('contact.visitUs')}</h4>
                      <p className="text-gray-600 dark:text-gray-400">{t('contact.info.address')}</p>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">{t('contact.info.hours')}</p>
                    </div>
                  </div>                  {/* Phone */}
                  <div className="flex items-start">
                    <div className="bg-primary dark:bg-secondary p-3 rounded-full text-white mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-1">{t('contact.callUs')}</h4>                      <a 
                        href={`tel:+${t('contact.info.phone')}`} 
                        className="text-primary dark:text-secondary hover:underline"
                        onClick={handlePhoneClick}
                      >
                        +{t('contact.info.phone')}
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start">
                    <div className="bg-primary dark:bg-secondary p-3 rounded-full text-white mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-1">{t('contact.emailUs')}</h4>
                      <a 
                        href={`mailto:${t('contact.info.email')}`} 
                        className="text-primary dark:text-secondary hover:underline"
                      >
                        {t('contact.info.email')}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
                <h3 className="text-xl font-serif font-bold mb-4 text-gray-800 dark:text-gray-200">
                  Connect With Us
                </h3>                <div className="flex space-x-4">                  <a 
                    href="https://www.facebook.com/profile.php?id=61576251717958" 
                    className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-colors duration-300"
                    aria-label="Facebook"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                    </svg>
                  </a>
                  <a 
                    href="#" 
                    className="bg-pink-600 hover:bg-pink-700 text-white p-3 rounded-full transition-colors duration-300"
                    aria-label="Instagram"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  <a 
                    href="#" 
                    className="bg-blue-400 hover:bg-blue-500 text-white p-3 rounded-full transition-colors duration-300"
                    aria-label="Twitter"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div ref={mapRef} className="mt-16">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2978.1251219404237!2d44.78267491542878!3d41.71736487923514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40440cd26993346f%3A0xed846c3a4cb37dd0!2sTbilisi%2C%20Georgia!5e0!3m2!1sen!2sus!4v1620909701457!5m2!1sen!2sus" 
                width="100%" 
                height="450" 
                style={{ border: 0, borderRadius: '0.5rem' }}
                allowFullScreen="" 
                loading="lazy"
                title="VikAno Furniture Location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
