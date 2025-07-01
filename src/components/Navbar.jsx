import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
import { AuthContext } from '../App'; // Import AuthContext

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, isAdmin, logout } = useContext(AuthContext); // Use AuthContext

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-[#FDF8F5] p-4 flex justify-between items-center sticky top-0 z-10 shadow-lg font-['Lora']">
      <div className="text-[#E85A4F] font-bold text-2xl md:text-3xl font-['Montserrat']">SEA Catering</div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-[#E85A4F] font-semibold transition-colors duration-200 border-b-2 border-[#E85A4F] pb-1"
              : "text-[#333333] hover:text-[#E85A4F] font-semibold transition-colors duration-200"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/menu"
          className={({ isActive }) =>
            isActive
              ? "text-[#E85A4F] font-semibold transition-colors duration-200 border-b-2 border-[#E85A4F] pb-1"
              : "text-[#333333] hover:text-[#E85A4F] font-semibold transition-colors duration-200"
          }
        >
          Menu / Meal Plans
        </NavLink>
        <NavLink
          to="/subscription"
          className={({ isActive }) =>
            isActive
              ? "text-[#E85A4F] font-semibold transition-colors duration-200 border-b-2 border-[#E85A4F] pb-1"
              : "text-[#333333] hover:text-[#E85A4F] font-semibold transition-colors duration-200"
          }
        >
          Subscription
        </NavLink>
        <HashLink
          to="/#contact"
          scroll={(el) => el.scrollIntoView({ behavior: 'smooth', block: 'start' })}
          className="text-[#333333] hover:text-[#E85A4F] font-semibold transition-colors duration-200"
        >
          Contact Us
        </HashLink>
        <NavLink
          to="/testimonials"
          className={({ isActive }) =>
            isActive
              ? "text-[#E85A4F] font-semibold transition-colors duration-200 border-b-2 border-[#E85A4F] pb-1"
              : "text-[#333333] hover:text-[#E85A4F] font-semibold transition-colors duration-200"
          }
        >
          Testimonials
        </NavLink>
        {isAuthenticated && (
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? "text-[#E85A4F] font-semibold transition-colors duration-200 border-b-2 border-[#E85A4F] pb-1"
                : "text-[#333333] hover:text-[#E85A4F] font-semibold transition-colors duration-200"
            }
          >
            Dashboard
          </NavLink>
        )}
        {isAuthenticated && isAdmin && (
          <NavLink
            to="/admin-dashboard"
            className={({ isActive }) =>
              isActive
                ? "text-[#E85A4F] font-semibold transition-colors duration-200 border-b-2 border-[#E85A4F] pb-1"
                : "text-[#333333] hover:text-[#E85A4F] font-semibold transition-colors duration-200"
            }
          >
            Admin Dashboard
          </NavLink>
        )}
        {!isAuthenticated ? (
          <>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                isActive
                  ? "text-[#E85A4F] font-semibold transition-colors duration-200 border-b-2 border-[#E85A4F] pb-1"
                  : "text-[#333333] hover:text-[#E85A4F] font-semibold transition-colors duration-200"
              }
            >
              Register
            </NavLink>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "text-[#E85A4F] font-semibold transition-colors duration-200 border-b-2 border-[#E85A4F] pb-1"
                  : "text-[#333333] hover:text-[#E85A4F] font-semibold transition-colors duration-200"
              }
            >
              Login
            </NavLink>
          </>
        ) : (
          <button
            onClick={logout}
            className="text-[#333333] hover:text-[#E85A4F] font-semibold transition-colors duration-200"
          >
            Logout
          </button>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button onClick={toggleMenu} className="text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#E85A4F] rounded-md p-1" aria-label="Toggle menu">
          <svg
            className="w-8 h-8"
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
        <div className="md:hidden absolute top-full left-0 w-full bg-[#FDF8F5] shadow-lg py-4 flex flex-col items-center space-y-4 animate-slide-down">
          <NavLink
            to="/"
            onClick={toggleMenu}
            className={({ isActive }) =>
              isActive
                ? "text-[#E85A4F] font-semibold border-b-2 border-[#E85A4F] pb-1"
                : "text-[#333333] hover:text-[#E85A4F] font-semibold"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/menu"
            onClick={toggleMenu}
            className={({ isActive }) =>
              isActive
                ? "text-[#E85A4F] font-semibold border-b-2 border-[#E85A4F] pb-1"
                : "text-[#333333] hover:text-[#E85A4F] font-semibold"
            }
          >
            Menu / Meal Plans
          </NavLink>
          <NavLink
            to="/subscription"
            onClick={toggleMenu}
            className={({ isActive }) =>
              isActive
                ? "text-[#E85A4F] font-semibold border-b-2 border-[#E85A4F] pb-1"
                : "text-[#333333] hover:text-[#E85A4F] font-semibold"
            }
          >
            Subscription
          </NavLink>
          <HashLink
            to="/#contact"
            onClick={toggleMenu}
            scroll={(el) => el.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            className="text-[#333333] hover:text-[#E85A4F] font-semibold"
          >
            Contact Us
          </HashLink>
          <NavLink
            to="/testimonials"
            onClick={toggleMenu}
            className={({ isActive }) =>
              isActive
                ? "text-[#E85A4F] font-semibold border-b-2 border-[#E85A4F] pb-1"
                : "text-[#333333] hover:text-[#E85A4F] font-semibold"
            }
          >
            Testimonials
          </NavLink>
          {isAuthenticated && (
            <NavLink
              to="/dashboard"
              onClick={toggleMenu}
              className={({ isActive }) =>
                isActive
                  ? "text-[#E85A4F] font-semibold border-b-2 border-[#E85A4F] pb-1"
                  : "text-[#333333] hover:text-[#E85A4F] font-semibold"
              }
            >
              Dashboard
            </NavLink>
          )}
          {isAuthenticated && isAdmin && (
            <NavLink
              to="/admin-dashboard"
              onClick={toggleMenu}
              className={({ isActive }) =>
                isActive
                  ? "text-[#E85A4F] font-semibold border-b-2 border-[#E85A4F] pb-1"
                  : "text-[#333333] hover:text-[#E85A4F] font-semibold"
              }
            >
              Admin Dashboard
            </NavLink>
          )}
          {!isAuthenticated ? (
            <>
              <NavLink
                to="/register"
                onClick={toggleMenu}
                className={({ isActive }) =>
                  isActive
                    ? "text-[#E85A4F] font-semibold border-b-2 border-[#E85A4F] pb-1"
                    : "text-[#333333] hover:text-[#E85A4F] font-semibold"
                }
              >
                Register
              </NavLink>
              <NavLink
                to="/login"
                onClick={toggleMenu}
                className={({ isActive }) =>
                  isActive
                    ? "text-[#E85A4F] font-semibold border-b-2 border-[#E85A4F] pb-1"
                    : "text-[#333333] hover:text-[#E85A4F] font-semibold"
                }
              >
                Login
              </NavLink>
            </>
          ) : (
            <button
              onClick={() => { logout(); toggleMenu(); }}
              className="text-[#333333] hover:text-[#E85A4F] font-semibold"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
