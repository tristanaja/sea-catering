
import React from "react";

const Contact = () => {
  return (
    <section id="contact" className="py-20 md:py-32 bg-[#FEE1CD] text-[#333333] font-['Lora']">
      <div className="container mx-auto px-4 text-center max-w-3xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 font-['Montserrat'] text-[#E85A4F]">Get in Touch</h2>
        <p className="text-lg md:text-xl mb-6">Have questions or ready to start your healthy meal journey? We're here to help!</p>
        <div className="space-y-4 mb-8">
          <p className="text-xl font-semibold flex items-center justify-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#E85A4F]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Manager: Brian</span>
          </p>
          <p className="text-xl font-semibold flex items-center justify-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#E85A4F]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>Phone Number: <a href="tel:+628123456789" className="text-[#E85A4F] hover:underline">08123456789</a></span>
          </p>
        </div>
        <p className="text-lg md:text-xl mb-10">Reach out to us for any inquiries or to start your healthy meal journey!</p>
        <button className="bg-[#E85A4F] text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-red-700 transition-colors duration-300 font-['Montserrat'] shadow-lg transform hover:scale-105 flex items-center justify-center mx-auto space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span>Contact Us Now</span>
        </button>
      </div>
    </section>
  );
};

export default Contact;
