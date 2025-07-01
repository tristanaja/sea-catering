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
            `flex items-center space-x-1 ${
              isActive
                ? "text-[#E85A4F] font-semibold transition-colors duration-200 border-b-2 border-[#E85A4F] pb-1"
                : "text-[#333333] hover:text-[#E85A4F] font-semibold transition-colors duration-200"
            }`
          }
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2 2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span>Home</span>
        </NavLink>
        <NavLink
          to="/menu"
          className={({ isActive }) =>
            `flex items-center space-x-1 ${
              isActive
                ? "text-[#E85A4F] font-semibold transition-colors duration-200 border-b-2 border-[#E85A4F] pb-1"
                : "text-[#333333] hover:text-[#E85A4F] font-semibold transition-colors duration-200"
            }`
          }
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2m7 0V5a2 2 0 012-2h2a2 2 0 012 2v6m-7 0h7" />
          </svg>
          <span>Menu / Meal Plans</span>
        </NavLink>
        <NavLink
          to="/subscription"
          className={({ isActive }) =>
            `flex items-center space-x-1 ${
              isActive
                ? "text-[#E85A4F] font-semibold transition-colors duration-200 border-b-2 border-[#E85A4F] pb-1"
                : "text-[#333333] hover:text-[#E85A4F] font-semibold transition-colors duration-200"
            }`
          }
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <span>Subscription</span>
        </NavLink>
        <HashLink
          to="/#contact"
          scroll={(el) => el.scrollIntoView({ behavior: 'smooth', block: 'start' })}
          className="flex items-center space-x-1 text-[#333333] hover:text-[#E85A4F] font-semibold transition-colors duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <span>Contact Us</span>
        </HashLink>
        <NavLink
          to="/testimonials"
          className={({ isActive }) =>
            `flex items-center space-x-1 ${
              isActive
                ? "text-[#E85A4F] font-semibold transition-colors duration-200 border-b-2 border-[#E85A4F] pb-1"
                : "text-[#333333] hover:text-[#E85A4F] font-semibold transition-colors duration-200"
            }`
          }
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span>Testimonials</span>
        </NavLink>
        {isAuthenticated && (
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center space-x-1 ${
                isActive
                  ? "text-[#E85A4F] font-semibold transition-colors duration-200 border-b-2 border-[#E85A4F] pb-1"
                  : "text-[#333333] hover:text-[#E85A4F] font-semibold transition-colors duration-200"
              }`
            }
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 10v11h18V10M3 10l9-9 9 9M3 10h18" />
            </svg>
            <span>Dashboard</span>
          </NavLink>
        )}
        {isAuthenticated && isAdmin && (
          <NavLink
            to="/admin-dashboard"
            className={({ isActive }) =>
              `flex items-center space-x-1 ${
                isActive
                  ? "text-[#E85A4F] font-semibold transition-colors duration-200 border-b-2 border-[#E85A4F] pb-1"
                  : "text-[#333333] hover:text-[#E85A4F] font-semibold transition-colors duration-200"
              }`
            }
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10h2m2 0h2a2 2 0 002-2V7a2 2 0 00-2-2h-2m-4 10v-2m0-4h.01M17 16l4-4m0 0l-4-4m4 4H7" />
            </svg>
            <span>Admin Dashboard</span>
          </NavLink>
        )}
        {!isAuthenticated ? (
          <>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                `flex items-center space-x-1 ${
                  isActive
                    ? "text-[#E85A4F] font-semibold transition-colors duration-200 border-b-2 border-[#E85A4F] pb-1"
                    : "text-[#333333] hover:text-[#E85A4F] font-semibold transition-colors duration-200"
                }`
              }
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Register</span>
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
            className="flex items-center space-x-1 text-[#333333] hover:text-[#E85A4F] font-semibold transition-colors duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Logout</span>
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
                  `flex items-center space-x-1 ${
                    isActive
                      ? "text-[#E85A4F] font-semibold border-b-2 border-[#E85A4F] pb-1"
                      : "text-[#333333] hover:text-[#E85A4F] font-semibold"
                  }`
                }
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Register</span>
              </NavLink>
              <NavLink
                to="/login"
                onClick={toggleMenu}
                className={({ isActive }) =>
                  `flex items-center space-x-1 ${
                    isActive
                      ? "text-[#E85A4F] font-semibold border-b-2 border-[#E85A4F] pb-1"
                      : "text-[#333333] hover:text-[#E85A4F] font-semibold"
                  }`
                }
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                <span>Login</span>
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
