import React from 'react';
import Hero from './Hero';
import FeaturedCollection from './FeaturedCollection';
import Craftsmanship from './Craftsmanship';
import Testimonial from './Testimonial';

const HomePage = () => {
  return (
    <div>
      <Hero />
      <FeaturedCollection />
      <Craftsmanship />
      <Testimonial />
    </div>
  );
};

export default HomePage;
