import React, { useState } from 'react';

const MealPlanModal = ({ plan, onClose }) => {
  if (!plan) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-center">
      <div className="relative p-8 bg-white w-full max-w-md mx-auto rounded-lg shadow-lg font-['Lora']">
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-2xl font-bold"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-3xl font-bold mb-4 text-[#E85A4F] font-['Montserrat']">{plan.name}</h2>
        {plan.image && (
          <img src={plan.image} alt={plan.name} className="w-full h-48 object-cover rounded-md mb-4" />
        )}
        <p className="text-xl text-[#333333] mb-2">Price: {plan.price}</p>
        <p className="text-md text-[#333333] mb-4">{plan.description}</p>
        <p className="text-sm text-gray-600">Additional details about {plan.name}...</p>
      </div>
    </div>
  );
};

export default MealPlanModal;
