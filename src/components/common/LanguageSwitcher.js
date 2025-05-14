import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageContext } from '../../contexts/LanguageContext';

const LanguageSwitcher = () => {
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage } = useContext(LanguageContext);

  const handleLanguageChange = (lang) => {
    changeLanguage(lang);
  };

  return (
    <div className="language-switcher flex items-center">
      <button
        onClick={() => handleLanguageChange('en')}
        className={`px-2 py-1 mx-1 text-sm rounded-md ${
          currentLanguage === 'en' 
            ? 'bg-primary text-white' 
            : 'bg-transparent text-gray-600 hover:bg-gray-100'
        }`}
        aria-label={t('language.en')}
      >
        EN
      </button>
      <span className="text-gray-400 mx-1">|</span>
      <button
        onClick={() => handleLanguageChange('ka')}
        className={`px-2 py-1 mx-1 text-sm rounded-md ${
          currentLanguage === 'ka' 
            ? 'bg-primary text-white' 
            : 'bg-transparent text-gray-600 hover:bg-gray-100'
        }`}
        aria-label={t('language.ka')}
      >
        ქართ
      </button>
    </div>
  );
};

export default LanguageSwitcher;
