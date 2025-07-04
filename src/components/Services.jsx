
import React from "react";

const Services = () => {
  const services = [
    {
      title: "Meal Customization",
      description: "Tailor your meals to your dietary needs and preferences. Choose from a wide variety of ingredients and recipes.",
      imageUrl: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      title: "Delivery to Major Cities",
      description: "We deliver to major cities across Indonesia, ensuring you get your healthy meals fresh and on time.",
      imageUrl: "https://images.unsplash.com/photo-1558584724-0e4d32ca55a4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      title: "Detailed Nutritional Information",
      description: "Every meal comes with detailed nutritional information, helping you track your macros and achieve your health goals.",
      imageUrl: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
  ];

  return (
    <section id="services" className="py-20 bg-[#FDF8F5]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-[#333333] mb-12 font-['Montserrat']">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-[#FEE1CD] rounded-lg shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300 group">
              <img src={service.imageUrl} alt={service.title} className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"/>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-[#333333] mb-3 font-['Montserrat'] group-hover:text-[#E85A4F] transition-colors duration-300 flex items-center justify-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[#E85A4F]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>{service.title}</span>
                </h3>
                <p className="text-[#333333] font-['Lora'] text-lg">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
