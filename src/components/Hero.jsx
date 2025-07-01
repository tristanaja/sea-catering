
import React from "react";

const Hero = () => {
  return (
    <div className="bg-[#FDF8F5] text-center py-20 px-4">
      <h1 className="text-5xl font-bold text-[#333333] mb-4 font-['Montserrat']">Healthy Meals, Anytime, Anywhere</h1>
      <p className="text-xl text-[#333333] mb-8 font-['Lora']">SEA Catering is your partner in healthy living, offering customizable meal plans delivered right to your doorstep across Indonesia.</p>
      <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Healthy Food" className="w-full max-w-4xl mx-auto rounded-lg shadow-2xl"/>
    </div>
  );
};

export default Hero;
