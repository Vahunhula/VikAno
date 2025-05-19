import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  
  return (
    <footer className="bg-accent dark:bg-gray-800 text-white py-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-serif mb-4">VikAno Furniture</h3>
            <p className="text-gray-300 mb-4">
              Handcrafted furniture made with passion and dedication. 
              Every piece tells a story of craftsmanship and quality.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-serif mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/gallery" className="text-gray-300 hover:text-white transition-colors">Gallery</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
            <div>
            <h3 className="text-xl font-serif mb-4">Contact Us</h3>
            <address className="not-italic text-gray-300 space-y-2">
              <p>Tbilisi, Georgia</p>
              <p>Phone: +995598314522</p>
              <p>Email: {t('contact.info.email')}</p>              <p>
                <a 
                  href="https://www.facebook.com/profile.php?id=61576251717958" 
                  className="inline-flex items-center text-gray-300 hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="bg-blue-600 hover:bg-blue-700 p-2 rounded-full text-white mr-2 flex items-center justify-center" style={{width: '28px', height: '28px'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                    </svg>
                  </span>
                  <span>Find us on Facebook</span>
                </a>
              </p>
            </address>
          </div>
        </div>
          <div className="border-t border-gray-700 dark:border-gray-600 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} VikAno Furniture. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
