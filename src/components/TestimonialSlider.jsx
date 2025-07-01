import React, { useState } from 'react';

const TestimonialSlider = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  if (!testimonials || testimonials.length === 0) {
    return <p className="text-center text-[#333333] text-xl font-['Lora'] py-8">No testimonials yet. Be the first to share your experience!</p>;
  }

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="relative bg-[#FDF8F5] p-8 md:p-12 rounded-lg shadow-2xl font-['Lora'] border border-[#FEE1CD]">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 font-['Montserrat'] text-[#E85A4F]">What Our Customers Say</h2>
      <div className="text-center min-h-[150px] flex flex-col justify-center items-center">
        <p className="text-xl md:text-2xl italic text-[#333333] mb-4 leading-relaxed">"{currentTestimonial.reviewMessage}"</p>
        <p className="text-lg md:text-xl font-semibold text-[#333333] mt-4">- {currentTestimonial.customerName}</p>
        <div className="text-yellow-500 text-2xl mt-3">
          {'★'.repeat(currentTestimonial.rating)}{'☆'.repeat(5 - currentTestimonial.rating)}
        </div>
      </div>
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-[#E85A4F] text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#E85A4F] focus:ring-opacity-75"
        aria-label="Previous Testimonial"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#E85A4F] text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#E85A4F] focus:ring-opacity-75"
        aria-label="Next Testimonial"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default TestimonialSlider;