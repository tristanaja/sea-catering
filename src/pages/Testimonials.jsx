import React, { useState } from 'react';
import TestimonialForm from '../components/TestimonialForm';
import TestimonialSlider from '../components/TestimonialSlider';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

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
      <div className="container mx-auto px-4 py-16 md:py-24 bg-[#FDF8F5] font-['Lora']">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 font-['Montserrat'] text-[#333333]">What Our Customers Say</h1>
        <TestimonialSlider testimonials={testimonials} />
        <TestimonialForm onSubmit={handleNewTestimonial} />
      </div>
      <Footer />
    </>
  );
};

export default Testimonials;