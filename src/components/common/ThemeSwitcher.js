import React, { useContext, useState } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { t } = useTranslation();
  const [showTooltip, setShowTooltip] = useState(false);
  
  return (
    <div className="relative">
      <button 
        onClick={toggleTheme}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="theme-switcher flex items-center justify-center p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors dark:text-white"
        aria-label={t('theme.toggle')}
      >
        {theme === 'light' ? (
          // Moon icon for dark mode
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z" clipRule="evenodd" />
          </svg>
        ) : (
          // Sun icon for light mode
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z" />
          </svg>
        )}
      </button>

      {showTooltip && (
        <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 text-xs rounded-md whitespace-nowrap z-50">
          {theme === 'light' ? t('theme.dark') : t('theme.light')}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 rotate-45 bg-gray-800 dark:bg-gray-200"></div>
        </div>
      )}
    </div>
  );
};

export default ThemeSwitcher;
