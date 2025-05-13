import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const testimonials = [
  {
    id: 1,
    text: "The dining table we ordered from VikAno completely transformed our home. The quality and craftsmanship are exceptional, and it's become the centerpiece of our gatherings.",
    name: "Emily Thompson",
    title: "Homeowner",
    image: "https://randomuser.me/api/portraits/women/12.jpg"
  },
  {
    id: 2,
    text: "As an interior designer, I've worked with many furniture makers, but VikAno stands out for their attention to detail and willingness to bring custom designs to life.",
    name: "Michael Rodriguez",
    title: "Interior Designer",
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 3,
    text: "The bespoke bookshelf that VikAno created for our library is not just functional—it's a work of art. We couldn't be happier with the result.",
    name: "Sarah Johnson",
    title: "Book Collector",
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  }
];

const Testimonial = () => {
  const [active, setActive] = useState(0);
  const testimonialRefs = useRef([]);
  const sectionRef = useRef(null);
  
  useEffect(() => {
    // Create animation for section entry
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      { 
        opacity: 1, 
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      }
    );
  }, []);
  
  useEffect(() => {
    // Create animation for testimonial change
    gsap.fromTo(
      testimonialRefs.current[active],
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.7, ease: "power3.out" }
    );
  }, [active]);

  const nextTestimonial = () => {
    setActive(prev => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActive(prev => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-primary bg-opacity-5"
    >
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-accent">What Our Clients Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from our satisfied customers about their experience with VikAno handcrafted furniture
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative bg-white rounded-xl shadow-lg p-8 md:p-12">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id}
                ref={el => testimonialRefs.current[index] = el}
                className={`transition-opacity duration-500 ${active === index ? 'block' : 'hidden'}`}
              >
                <svg className="text-secondary h-12 w-12 mb-6 opacity-70" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>

                <blockquote className="text-xl font-medium text-gray-800 mb-8">
                  "{testimonial.text}"
                </blockquote>

                <div className="flex items-center">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <p className="font-medium text-gray-900">{testimonial.name}</p>
                    <p className="text-gray-600">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            ))}

            <div className="absolute top-1/2 transform -translate-y-1/2 left-4 md:-left-6">
              <button 
                onClick={prevTestimonial}
                className="bg-white rounded-full shadow-lg p-3 hover:bg-gray-100 focus:outline-none transition-colors"
                aria-label="Previous testimonial"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            <div className="absolute top-1/2 transform -translate-y-1/2 right-4 md:-right-6">
              <button 
                onClick={nextTestimonial}
                className="bg-white rounded-full shadow-lg p-3 hover:bg-gray-100 focus:outline-none transition-colors"
                aria-label="Next testimonial"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex justify-center mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActive(index)}
                className={`h-3 w-3 mx-1 rounded-full ${
                  active === index ? 'bg-primary' : 'bg-gray-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
