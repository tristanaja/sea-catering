import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-[#FDF8F5] p-4 flex justify-between items-center sticky top-0 z-10 shadow-md">
      <div className="text-[#E85A4F] font-bold text-2xl font-['Montserrat']">SEA Catering</div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-8">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-[#E85A4F] font-semibold font-['Lora']"
              : "text-[#333333] hover:text-[#E85A4F] font-semibold font-['Lora']"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/menu"
          className={({ isActive }) =>
            isActive
              ? "text-[#E85A4F] font-semibold font-['Lora']"
              : "text-[#333333] hover:text-[#E85A4F] font-semibold font-['Lora']"
          }
        >
          Menu / Meal Plans
        </NavLink>
        <NavLink
          to="/subscription"
          className={({ isActive }) =>
            isActive
              ? "text-[#E85A4F] font-semibold font-['Lora']"
              : "text-[#333333] hover:text-[#E85A4F] font-semibold font-['Lora']"
          }
        >
          Subscription
        </NavLink>
        <HashLink
          to="/#contact"
          scroll={(el) => el.scrollIntoView({ behavior: 'smooth', block: 'start' })}
          className="text-[#333333] hover:text-[#E85A4F] font-semibold font-['Lora']"
        >
          Contact Us
        </HashLink>
        <NavLink
          to="/testimonials"
          className={({ isActive }) =>
            isActive
              ? "text-[#E85A4F] font-semibold font-['Lora']"
              : "text-[#333333] hover:text-[#E85A4F] font-semibold font-['Lora']"
          }
        >
          Testimonials
        </NavLink>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button onClick={toggleMenu} className="text-[#333333] focus:outline-none">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#FDF8F5] shadow-lg py-4 flex flex-col items-center space-y-4">
          <NavLink
            to="/"
            onClick={toggleMenu}
            className={({ isActive }) =>
              isActive
                ? "text-[#E85A4F] font-semibold font-['Lora']"
                : "text-[#333333] hover:text-[#E85A4F] font-semibold font-['Lora']"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/menu"
            onClick={toggleMenu}
            className={({ isActive }) =>
              isActive
                ? "text-[#E85A4F] font-semibold font-['Lora']"
                : "text-[#333333] hover:text-[#E85A4F] font-semibold font-['Lora']"
            }
          >
            Menu / Meal Plans
          </NavLink>
          <NavLink
            to="/subscription"
            onClick={toggleMenu}
            className={({ isActive }) =>
              isActive
                ? "text-[#E85A4F] font-semibold font-['Lora']"
                : "text-[#333333] hover:text-[#E85A4F] font-semibold font-['Lora']"
            }
          >
            Subscription
          </NavLink>
          <HashLink
            to="/#contact"
            onClick={toggleMenu}
            scroll={(el) => el.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            className="text-[#333333] hover:text-[#E85A4F] font-semibold font-['Lora']"
          >
            Contact Us
          </HashLink>
          <NavLink
            to="/testimonials"
            onClick={toggleMenu}
            className={({ isActive }) =>
              isActive
                ? "text-[#E85A4F] font-semibold font-['Lora']"
                : "text-[#333333] hover:text-[#E85A4F] font-semibold font-['Lora']"
            }
          >
            Testimonials
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;