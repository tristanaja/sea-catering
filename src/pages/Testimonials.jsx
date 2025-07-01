import React, { useState } from 'react';
import TestimonialForm from '../components/TestimonialForm';
import TestimonialSlider from '../components/TestimonialSlider';
import Navbar from '../components/Navbar';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([
    {
      customerName: "Alice Smith",
      reviewMessage: "SEA Catering has transformed my eating habits! The meals are delicious and healthy.",
      rating: 5,
    },
    {
      customerName: "Bob Johnson",
      reviewMessage: "Convenient and tasty. Highly recommend for anyone looking for healthy meal options.",
      rating: 4,
    },
    {
      customerName: "Charlie Brown",
      reviewMessage: "Great variety and excellent service. My energy levels have never been better!",
      rating: 5,
    },
  ]);

  const handleNewTestimonial = (newTestimonial) => {
    setTestimonials((prevTestimonials) => [...prevTestimonials, newTestimonial]);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold text-center mb-12 font-['Montserrat'] text-[#333333]">Customer Testimonials</h1>
        <TestimonialForm onSubmit={handleNewTestimonial} />
        <TestimonialSlider testimonials={testimonials} />
      </div>
    </>
  );
};

export default Testimonials;