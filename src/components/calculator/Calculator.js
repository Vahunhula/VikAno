import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const Calculator = () => {
  const { t } = useTranslation();
  
  // Form state
  const [furnitureType, setFurnitureType] = useState('kitchen');
  const [size, setSize] = useState(1);
  const [material, setMaterial] = useState('turkish');
  const [totalPrice, setTotalPrice] = useState(0);
  const [isCalculated, setIsCalculated] = useState(false);
  // Furniture types
  const furnitureTypes = [
    { id: 'kitchen', label: t('calculator.types.kitchen') },
    { id: 'bedroom', label: t('calculator.types.bedroom') },
    { id: 'cottage', label: t('calculator.types.cottage') },
    { id: 'closet', label: t('calculator.types.closet') },
    { id: 'bathroom', label: t('calculator.types.bathroom') }
  ];

  // Materials with their price ranges
  const materials = [
    { id: 'turkish', label: t('calculator.materials.turkish'), priceRange: { kitchen: [350, 400], bedroom: [300, 350], cottage: [350, 400], closet: [300, 350], bathroom: [350, 400] } },
    { id: 'austrianBelarusian', label: t('calculator.materials.austrianBelarusian'), priceRange: { kitchen: [450, 500], bedroom: [450, 500], cottage: [450, 500], closet: [450, 500], bathroom: [450, 500] } },
    { id: 'italianSpanish', label: t('calculator.materials.italianSpanish'), priceRange: { kitchen: [600, 700], bedroom: [600, 700], cottage: [600, 700], closet: [600, 700], bathroom: [600, 700] } }
  ];

  // Calculate price
  const calculatePrice = () => {
    // Find the selected material
    const selectedMaterial = materials.find(m => m.id === material);
    
    // Get price range for the selected furniture type
    const priceRange = selectedMaterial.priceRange[furnitureType];
    
    // Calculate base price based on size and price range
    // For simplicity, we're using the average of min and max price
    const basePrice = ((priceRange[0] + priceRange[1]) / 2) * size;
    
    // Apply complexity factor (random between 1.0 and 1.15)
    // This simulates "depending on complexity" factor
    const complexityFactor = 1 + (Math.random() * 0.15);
    
    // Calculate final price with complexity
    const finalPrice = Math.round(basePrice * complexityFactor);
    
    setTotalPrice(finalPrice);
    setIsCalculated(true);
  };

  // Reset the form
  const resetCalculator = () => {
    setIsCalculated(false);
    setSize(1);
  };

  return (
    <div className="py-20 px-4">
      <div className="container-custom">        <h1 className="text-3xl font-serif font-bold mb-6">{t('calculator.title')}</h1>
        <p className="mb-4">{t('calculator.description')}</p>
          {/* Disclaimer */}
        <div className="bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-400 p-4 mb-8 rounded-r-md shadow-sm">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-800 dark:text-yellow-200 font-medium">
                {t('calculator.disclaimer')}
              </p>
            </div>
          </div>
        </div>          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90">
          {!isCalculated ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  calculatePrice();
                }}
                className="space-y-6"
              >
                {/* Furniture Type Selection */}                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                    {t('calculator.furnitureType')}
                  </label>                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {furnitureTypes.map((type) => (
                      <div 
                        key={type.id}
                        onClick={() => setFurnitureType(type.id)}
                        className={`cursor-pointer border-2 rounded-lg p-4 text-center transition-all shadow-sm hover:shadow-md ${
                          furnitureType === type.id 
                            ? 'border-primary bg-primary bg-opacity-10 dark:bg-primary/20 text-primary dark:text-primary-light font-medium transform scale-[1.02]' 
                            : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                        }`}
                      >
                        {type.label}
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Size Input */}                <div>
                  <label htmlFor="size" className="block text-gray-700 dark:text-gray-300 font-medium mb-3">
                    {t('calculator.size')}
                  </label>
                  <div className="flex items-center justify-center md:justify-start">
                    <div className="flex items-stretch shadow-md rounded-lg overflow-hidden">
                      <button 
                        type="button"
                        onClick={() => setSize(Math.max(1, size - 1))}
                        className="px-4 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-bold transition-colors flex items-center justify-center"
                        aria-label="Decrease size"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                      <input
                        id="size"
                        type="number"
                        min="1"
                        value={size}
                        onChange={(e) => setSize(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-20 text-center py-3 border-x border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-1 focus:ring-primary dark:focus:ring-primary-light bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-medium [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <button 
                        type="button"
                        onClick={() => setSize(size + 1)}
                        className="px-4 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-bold transition-colors flex items-center justify-center"
                        aria-label="Increase size"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                    <span className="ml-4 text-gray-600 dark:text-gray-400 text-lg font-medium">m²</span>
                  </div>
                </div>
                
                {/* Material Selection */}                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-medium mb-3">
                    {t('calculator.material')}
                  </label>
                  <div className="space-y-4">
                    {materials.map((mat) => (
                      <div 
                        key={mat.id} 
                        className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
                          material === mat.id 
                            ? 'border-primary dark:border-primary-light bg-primary/5 dark:bg-primary/10' 
                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                        }`}
                        onClick={() => setMaterial(mat.id)}
                      >
                        <input
                          id={mat.id}
                          type="radio"
                          name="material"
                          value={mat.id}
                          checked={material === mat.id}
                          onChange={() => {}}
                          className="h-5 w-5 text-primary focus:ring-primary dark:focus:ring-primary-light"
                        />
                        <label htmlFor={mat.id} className="ml-3 flex flex-col cursor-pointer">
                          <span className="font-medium text-gray-800 dark:text-gray-200">{mat.label}</span>
                          <span className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {mat.priceRange[furnitureType][0]}-{mat.priceRange[furnitureType][1]} {t('calculator.perSquareMeter')}
                          </span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Submit Button */}                <div className="pt-4">
                  <button
                    type="submit"
                    className="btn-primary w-full py-4 flex items-center justify-center text-lg font-medium rounded-lg shadow-md hover:shadow-lg transition-all transform hover:scale-[1.01]"
                  >
                    {t('calculator.calculate')}
                  </button>
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >              <div className="bg-gradient-to-br from-white to-primary/5 dark:from-gray-800 dark:to-primary/20 p-8 rounded-xl mb-8 border border-gray-100 dark:border-gray-700 shadow-lg">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">{t('calculator.result.estimatedPrice')}</h3>
                <div className="flex items-center justify-center py-6">
                  <div className="relative">
                    <span className="text-6xl font-bold text-gray-800 dark:text-gray-100">{totalPrice.toLocaleString()}</span>
                    <span className="absolute -top-3 -right-12 text-lg font-medium bg-primary text-white dark:bg-primary-light dark:text-gray-900 px-2 py-1 rounded-lg shadow-sm">GEL</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                  <p className="text-gray-700 dark:text-gray-300">
                    {t('calculator.result.for')} <span className="font-medium">{size} m²</span> {furnitureTypes.find(t => t.id === furnitureType).label.toLowerCase()} {t('calculator.result.with')} <span className="font-medium">{materials.find(m => m.id === material).label}</span>
                  </p>
                </div>
              </div>
                <div className="mb-6 py-3 px-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 rounded-r">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>{t('calculator.result.note')}:</strong> {t('calculator.result.approximatePrice')}
                </p>
              </div>
                <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={resetCalculator}
                  className="flex-1 py-3 px-6 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-base font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-gray-400"
                >
                  {t('calculator.calculateAgain')}
                </button>
                <a
                  href="/contact"
                  className="flex-1 py-3 px-6 border border-transparent rounded-lg shadow-md text-base font-medium text-white bg-primary hover:bg-primary-dark dark:bg-primary-light dark:text-gray-900 dark:hover:bg-primary-light/90 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  {t('calculator.contactQuote')}
                </a>
              </div>
            </motion.div>
          )}
        </div>
          {/* Additional Information */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700">
            <h3 className="text-xl font-serif font-bold mb-4 text-primary dark:text-primary-light">{t('calculator.included.title')}</h3>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400">
              <li className="flex items-start bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                <svg className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">{t('calculator.included.materials')}</span>
              </li>
              <li className="flex items-start bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                <svg className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">{t('calculator.included.mechanisms')}</span>
              </li>
              <li className="flex items-start bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                <svg className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">{t('calculator.included.installation')}</span>
              </li>
              <li className="flex items-start bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                <svg className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">{t('calculator.included.customization')}</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-serif font-bold mb-4">{t('calculator.materialsInfo.title')}</h3>
            <div className="space-y-3 text-gray-600 dark:text-gray-400">
              <p>{t('calculator.materialsInfo.turkish')}</p>
              <p>{t('calculator.materialsInfo.austrianBelarusian')}</p>
              <p>{t('calculator.materialsInfo.italianSpanish')}</p>
              <p className="text-sm italic mt-4">{t('calculator.materialsInfo.note')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
