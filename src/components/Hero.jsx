
import React from "react";
import { NavLink } from "react-router-dom";

const Hero = () => {
  return (
    <div className="bg-[#FDF8F5] text-center py-20 px-4 md:py-32">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-[#333333] mb-6 font-['Montserrat'] leading-tight">
          Healthy Meals, Anytime, Anywhere
        </h1>
        <p className="text-lg md:text-xl text-[#333333] mb-10 font-['Lora'] max-w-3xl mx-auto">
          SEA Catering is your partner in healthy living, offering customizable meal plans delivered right to your doorstep across Indonesia.
        </p>
        <NavLink
          to="/menu"
          className="inline-block bg-[#E85A4F] text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-red-700 transition-all duration-300 ease-in-out transform hover:scale-105 font-['Montserrat'] shadow-lg"
        >
          Explore Our Menu
        </NavLink>
        <div className="mt-16">
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Healthy Food"
            className="w-full max-w-4xl mx-auto rounded-lg shadow-2xl border-4 border-[#FEE1CD]"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
