import React, { useState } from 'react';
import MealPlanModal from '../components/MealPlanModal';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Menu = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const mealPlans = [
    {
      id: 1,
      name: "Basic Healthy Plan",
      price: "Rp 1.500.000 / month",
      description: "A balanced meal plan designed for general well-being, focusing on fresh, whole ingredients. Includes a variety of lean proteins, fresh vegetables, and complex carbohydrates to keep you energized throughout the day.",
      image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      name: "Weight Loss Plan",
      price: "Rp 1.800.000 / month",
      description: "Calorie-controlled meals to help you achieve your weight loss goals without sacrificing flavor. Focuses on portion control, high fiber, and lean protein to promote satiety and healthy fat loss.",
      image: "https://images.unsplash.com/photo-1558584724-0e4d32ca55a4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      name: "Muscle Gain Plan",
      price: "Rp 2.000.000 / month",
      description: "High-protein, nutrient-dense meals to support muscle growth and recovery. Designed with complex carbs and healthy fats to fuel intense workouts and aid in muscle repair.",
      image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
      <div className="container mx-auto px-4 py-16 md:py-24 bg-[#FDF8F5]">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 font-['Montserrat'] text-[#333333]">Our Delicious Meal Plans</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mealPlans.map((plan) => (
            <div
              key={plan.id}
              className="bg-[#FEE1CD] rounded-lg shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300 group border border-[#FEE1CD]"
            >
              {plan.image && (
                <img
                  src={plan.image}
                  alt={plan.name}
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
                />
              )}
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 font-['Montserrat'] text-[#E85A4F] group-hover:text-[#E85A4F] transition-colors duration-300">{plan.name}</h3>
                <p className="text-xl text-[#333333] mb-2 font-['Lora']">{plan.price}</p>
                <p className="text-[#333333] mb-4 font-['Lora'] text-base leading-relaxed">{plan.description}</p>
                <button
                  className="w-full bg-[#E85A4F] text-white font-bold py-3 px-4 rounded-full hover:bg-red-700 transition-colors duration-300 font-['Montserrat'] shadow-lg transform hover:scale-105"
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
      <Footer />
    </>
  );
};

export default Menu;