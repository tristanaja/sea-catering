import React, { useState } from 'react';

const TestimonialForm = ({ onSubmit }) => {
  const [customerName, setCustomerName] = useState('');
  const [reviewMessage, setReviewMessage] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ customerName, reviewMessage, rating });
    setCustomerName('');
    setReviewMessage('');
    setRating(0);
  };

  return (
    <div className="bg-[#FEE1CD] p-8 rounded-lg shadow-lg mb-12 font-['Lora']">
      <h2 className="text-3xl font-bold text-center mb-6 font-['Montserrat'] text-[#333333]">Submit Your Testimonial</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="customerName" className="block text-[#333333] text-lg font-semibold mb-2">Your Name</label>
          <input
            type="text"
            id="customerName"
            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E85A4F]"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="reviewMessage" className="block text-[#333333] text-lg font-semibold mb-2">Your Review</label>
          <textarea
            id="reviewMessage"
            rows="5"
            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E85A4F]"
            value={reviewMessage}
            onChange={(e) => setReviewMessage(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="rating" className="block text-[#333333] text-lg font-semibold mb-2">Rating (1-5 Stars)</label>
          <input
            type="number"
            id="rating"
            min="1"
            max="5"
            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E85A4F]"
            value={rating}
            onChange={(e) => setRating(parseInt(e.target.value))}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#E85A4F] text-white font-bold py-3 px-4 rounded-full hover:bg-red-700 transition-colors duration-300 font-['Montserrat']"
        >
          Submit Testimonial
        </button>
      </form>
    </div>
  );
};

export default TestimonialForm;
