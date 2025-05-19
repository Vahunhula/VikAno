import React from 'react';
import Hero from './Hero';
import FeaturedCollection from './FeaturedCollection';
import Craftsmanship from './Craftsmanship';
import BeforeAfterSlider from './BeforeAfterSlider';

const HomePage = () => {
  return (    <div className="dark:bg-gray-900">
      <Hero />
      <FeaturedCollection />
      <BeforeAfterSlider />
      <Craftsmanship />
    </div>
  );
};

export default HomePage;
