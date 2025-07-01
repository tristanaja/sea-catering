import React, { useState, useEffect } from 'react';
import TestimonialForm from '../components/TestimonialForm';
import TestimonialSlider from '../components/TestimonialSlider';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [message, setMessage] = useState('');

  const fetchTestimonials = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/testimonials');
      const data = await response.json();
      if (response.ok) {
        setTestimonials(data);
      } else {
        setMessage(data.message || 'Failed to fetch testimonials.');
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      setMessage('Network error while fetching testimonials.');
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleNewTestimonial = () => {
    fetchTestimonials(); // Re-fetch testimonials after a new one is submitted
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-16 md:py-24 bg-[#FDF8F5] font-['Lora']">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 font-['Montserrat'] text-[#333333]">What Our Customers Say</h1>
        {message && <p className="text-center mb-4 text-red-500">{message}</p>}
        {testimonials.length === 0 ? (
          <p className="text-center text-xl text-[#333333] py-8">No testimonials yet. Be the first to share your experience!</p>
        ) : (
          <TestimonialSlider testimonials={testimonials} />
        )}
        <TestimonialForm onSubmit={handleNewTestimonial} />
      </div>
      <Footer />
    </>
  );
};

export default Testimonials;