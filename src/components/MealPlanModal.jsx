import React, { useState } from 'react';

const MealPlanModal = ({ plan, onClose }) => {
  if (!plan) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 backdrop-blur-sm overflow-y-auto h-full w-full z-50 flex justify-center items-center p-4 animate-fade-in">
      <div className="relative p-6 md:p-8 bg-white w-full max-w-md mx-auto rounded-xl shadow-2xl font-['Lora'] transform scale-95 animate-scale-in">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-[#E85A4F] text-3xl font-bold transition-colors duration-200 focus:outline-none"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#E85A4F] font-['Montserrat'] leading-tight">{plan.name}</h2>
        {plan.image && (
          <img src={plan.image} alt={plan.name} className="w-full h-56 object-cover rounded-lg mb-4 border-2 border-[#FEE1CD] shadow-sm" />
        )}
        <p className="text-2xl text-[#333333] mb-2 font-semibold flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#E85A4F]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span>Price: {plan.price}</span>
        </p>
        <p className="text-md text-[#333333] mb-4 leading-relaxed flex items-start space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#E85A4F] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
          <span>{plan.description}</span>
        </p>
        <p className="text-sm text-gray-600 flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#E85A4F]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Additional details about {plan.name} and its benefits.</span>
        </p>
      </div>
    </div>
  );
};

export default MealPlanModal;
