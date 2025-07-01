
import React from "react";

const Contact = () => {
  return (
    <section id="contact" className="py-20 md:py-32 bg-[#FEE1CD] text-[#333333] font-['Lora']">
      <div className="container mx-auto px-4 text-center max-w-3xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 font-['Montserrat'] text-[#E85A4F]">Get in Touch</h2>
        <p className="text-lg md:text-xl mb-6">Have questions or ready to start your healthy meal journey? We're here to help!</p>
        <div className="space-y-4 mb-8">
          <p className="text-xl font-semibold">Manager: Brian</p>
          <p className="text-xl font-semibold">Phone Number: <a href="tel:+628123456789" className="text-[#E85A4F] hover:underline">08123456789</a></p>
        </div>
        <p className="text-lg md:text-xl mb-10">Reach out to us for any inquiries or to start your healthy meal journey!</p>
        <button className="bg-[#E85A4F] text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-red-700 transition-colors duration-300 font-['Montserrat'] shadow-lg transform hover:scale-105">
          Contact Us Now
        </button>
      </div>
    </section>
  );
};

export default Contact;
