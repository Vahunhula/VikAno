import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  
  return (
    <footer className="bg-accent dark:bg-gray-800 text-white py-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">          <div>            <h3 className="text-xl font-serif mb-4 transition-colors duration-300">{t('app.title')}</h3>
            <p className="text-gray-300 dark:text-gray-300 mb-4 transition-colors duration-300">
              {t('footer.description')}
            </p>
          </div>
            <div>
            <h3 className="text-xl font-serif mb-4 transition-colors duration-300">{t('footer.quickLinks')}</h3><ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 dark:text-gray-300 hover:text-white dark:hover:text-white transition-colors">{t('navbar.home', 'Home')}</Link></li>
              <li><Link to="/gallery" className="text-gray-300 dark:text-gray-300 hover:text-white dark:hover:text-white transition-colors">{t('navbar.gallery', 'Gallery')}</Link></li>
              <li><Link to="/about" className="text-gray-300 dark:text-gray-300 hover:text-white dark:hover:text-white transition-colors">{t('navbar.about', 'About Us')}</Link></li>
              <li><Link to="/contact" className="text-gray-300 dark:text-gray-300 hover:text-white dark:hover:text-white transition-colors">{t('navbar.contact', 'Contact')}</Link></li>
            </ul>
          </div>
            <div>            <h3 className="text-xl font-serif mb-4 transition-colors duration-300">{t('contact.title', 'Contact Us')}</h3>            <address className="not-italic text-gray-300 dark:text-gray-300 space-y-2 transition-colors duration-300">              <p>{t('contact.info.location')}</p>
              <p className="flex items-center">
                <span className="inline-flex items-center justify-center bg-accent/20 dark:bg-gray-700 rounded-full p-1 mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </span>
                {t('contact.info.phoneLabel')}: {t('contact.info.phoneNumber')}
              </p>
              <p className="flex items-center">
                <span className="inline-flex items-center justify-center bg-accent/20 dark:bg-gray-700 rounded-full p-1 mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                {t('contact.info.emailLabel')}: {t('contact.info.email')}
              </p><p>
                <a 
                  href="https://www.facebook.com/profile.php?id=61576251717958" 
                  className="inline-flex items-center text-gray-300 dark:text-gray-300 hover:text-white dark:hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="bg-blue-600 hover:bg-blue-700 p-2 rounded-full text-white mr-2 flex items-center justify-center" style={{width: '28px', height: '28px'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                    </svg>
                  </span>
                  <span>{t('footer.facebook', 'Find us on Facebook')}</span>
                </a>
              </p>
            </address>
          </div>        </div>        <div className="border-t border-gray-700 dark:border-gray-600 mt-8 pt-6 text-center text-gray-400 dark:text-gray-300 transition-colors duration-300">
          <p>&copy; {new Date().getFullYear()} <a href="https://vikano.ge" className="hover:text-white transition-colors">vikano.ge</a>. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
