import React, { useState } from 'react';
import MealPlanModal from '../components/MealPlanModal';
import Navbar from '../components/Navbar';

const Menu = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const mealPlans = [
    {
      id: 1,
      name: "Basic Healthy Plan",
      price: "Rp 1.500.000 / month",
      description: "A balanced meal plan designed for general well-being, focusing on fresh, whole ingredients.",
      image: "https://picsum.photos/seed/basic/600/400",
    },
    {
      id: 2,
      name: "Weight Loss Plan",
      price: "Rp 1.800.000 / month",
      description: "Calorie-controlled meals to help you achieve your weight loss goals without sacrificing flavor.",
      image: "https://picsum.photos/seed/weightloss/600/400",
    },
    {
      id: 3,
      name: "Muscle Gain Plan",
      price: "Rp 2.000.000 / month",
      description: "High-protein, nutrient-dense meals to support muscle growth and recovery.",
      image: "https://picsum.photos/seed/musclegain/600/400",
    },
  ];

  const openModal = (plan) => {
    setSelectedPlan(plan);
  };

  const closeModal = () => {
    setSelectedPlan(null);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold text-center mb-12 font-['Montserrat'] text-[#333333]">Our Meal Plans</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mealPlans.map((plan) => (
            <div
              key={plan.id}
              className="bg-[#FEE1CD] rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
            >
              {plan.image && (
                <img
                  src={plan.image}
                  alt={plan.name}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 font-['Montserrat'] text-[#E85A4F]">{plan.name}</h3>
                <p className="text-xl text-[#333333] mb-2 font-['Lora']">{plan.price}</p>
                <p className="text-[#333333] mb-4 font-['Lora']">{plan.description}</p>
                <button
                  className="bg-[#E85A4F] text-white font-bold py-2 px-4 rounded-full hover:bg-red-700 transition-colors duration-300 font-['Montserrat']"
                  onClick={() => openModal(plan)}
                >
                  See More Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <MealPlanModal plan={selectedPlan} onClose={closeModal} />
    </>
  );
};

export default Menu;