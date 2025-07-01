
import React from "react";

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-[#FEE1CD] text-[#333333]">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-8 font-['Montserrat']">Contact Us</h2>
        <p className="text-xl mb-4 font-['Lora']">Manager: Brian</p>
        <p className="text-xl mb-4 font-['Lora']">Phone Number: 08123456789</p>
        <p className="text-lg font-['Lora']">Reach out to us for any inquiries or to start your healthy meal journey!</p>
        <button className="bg-[#E85A4F] text-white font-bold py-2 px-4 rounded-full mt-8 hover:bg-red-700 transition-colors duration-300 font-['Montserrat']">Contact Us</button>
      </div>
    </section>
  );
};

export default Contact;
