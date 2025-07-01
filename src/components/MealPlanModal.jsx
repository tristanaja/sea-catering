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
        <p className="text-2xl text-[#333333] mb-2 font-semibold">Price: {plan.price}</p>
        <p className="text-md text-[#333333] mb-4 leading-relaxed">{plan.description}</p>
        <p className="text-sm text-gray-600">Additional details about {plan.name} and its benefits.</p>
      </div>
    </div>
  );
};

export default MealPlanModal;
