import React, { useState } from 'react';

const TestimonialForm = ({ onSubmit }) => {
  const [customerName, setCustomerName] = useState('');
  const [reviewMessage, setReviewMessage] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in to submit a testimonial.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/testimonials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ customerName, reviewMessage, rating }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Testimonial submitted successfully!');
        setCustomerName('');
        setReviewMessage('');
        setRating(0);
        onSubmit(); // Trigger re-fetch in parent component
      } else {
        alert(`Failed to submit testimonial: ${data.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error submitting testimonial:', error);
      alert('Network error while submitting testimonial.');
    }
  };

  return (
    <div className="bg-[#FEE1CD] p-8 rounded-lg shadow-xl mb-12 font-['Lora']">
      <h2 className="text-3xl font-bold text-center mb-8 font-['Montserrat'] text-[#E85A4F]">Share Your Experience</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="customerName" className="block text-[#333333] text-lg font-semibold mb-2 flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#E85A4F]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>Your Name</span>
          </label>
          <input
            type="text"
            id="customerName"
            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E85A4F] transition-all duration-200"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="reviewMessage" className="block text-[#333333] text-lg font-semibold mb-2 flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#E85A4F]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h10M7 16h10M4 20h16a2 2 0 002-2V6a2 2 0 00-2-2H4a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>Your Review</span>
          </label>
          <textarea
            id="reviewMessage"
            rows="5"
            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E85A4F] transition-all duration-200"
            value={reviewMessage}
            onChange={(e) => setReviewMessage(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="rating" className="block text-[#333333] text-lg font-semibold mb-2 flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#E85A4F]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.329 1.176l1.519 4.674c.3.921-.755 1.688-1.539 1.175l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.784.513-1.838-.254-1.539-1.175l1.519-4.674a1 1 0 00-.329-1.176l-3.976-2.888c-.784-.57-.381-1.81.588-1.81h4.915a1 1 0 00.95-.69l1.519-4.674z" />
            </svg>
            <span>Rating (1-5 Stars)</span>
          </label>
          <input
            type="number"
            id="rating"
            min="1"
            max="5"
            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E85A4F] transition-all duration-200"
            value={rating}
            onChange={(e) => setRating(parseInt(e.target.value))}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#E85A4F] text-white font-bold py-3 px-4 rounded-full hover:bg-red-700 transition-colors duration-300 font-['Montserrat'] shadow-lg transform hover:scale-105 flex items-center justify-center space-x-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Submit Testimonial</span>
        </button>
      </form>
    </div>
  );
};

export default TestimonialForm;
