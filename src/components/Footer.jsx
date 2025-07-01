import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#333333] text-white py-8 font-['Lora']">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-4">
          <h3 className="text-2xl font-bold text-[#E85A4F] font-['Montserrat'] mb-2">SEA Catering</h3>
          <p className="text-sm">&copy; {new Date().getFullYear()} All rights reserved.</p>
        </div>
        <div className="flex justify-center space-x-6 mb-4">
          <a href="#" className="hover:text-[#E85A4F] transition-colors duration-200">Privacy Policy</a>
          <a href="#" className="hover:text-[#E85A4F] transition-colors duration-200">Terms of Service</a>
        </div>
        <p className="text-sm">Designed with <span className="text-red-500">&hearts;</span> by SEA Catering Team</p>
      </div>
    </footer>
  );
};

export default Footer;
