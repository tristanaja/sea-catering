import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const Register = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    password2: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const { full_name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setMessage('Passwords do not match');
    } else {
      try {
        const response = await fetch('http://localhost:3001/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ full_name, email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          setMessage('Registration successful! You can now log in.');
          setTimeout(() => navigate('/login'), 2000);
        } else {
          setMessage(data.message || data.errors[0].msg || 'Registration failed');
        }
      } catch (err) {
        console.error(err);
        setMessage('Server error');
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-16 md:py-24 bg-[#FDF8F5] font-['Lora']">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-[#333333] font-['Montserrat']">Register</h1>
        <form onSubmit={onSubmit} className="max-w-md mx-auto bg-[#FEE1CD] p-8 rounded-lg shadow-xl space-y-6">
          {message && <p className="text-center mb-4 text-red-500">{message}</p>}
          <div>
            <label htmlFor="full_name" className="block text-[#333333] text-lg font-semibold mb-2">Full Name</label>
            <input
              type="text"
              id="full_name"
              name="full_name"
              value={full_name}
              onChange={onChange}
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E85A4F] transition-all duration-200"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-[#333333] text-lg font-semibold mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E85A4F] transition-all duration-200"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-[#333333] text-lg font-semibold mb-2">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E85A4F] transition-all duration-200"
              required
            />
          </div>
          <div>
            <label htmlFor="password2" className="block text-[#333333] text-lg font-semibold mb-2">Confirm Password</label>
            <input
              type="password"
              id="password2"
              name="password2"
              value={password2}
              onChange={onChange}
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E85A4F] transition-all duration-200"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#E85A4F] text-white font-bold py-3 px-4 rounded-full hover:bg-red-700 transition-colors duration-300 font-['Montserrat'] shadow-lg transform hover:scale-105"
          >
            Register
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Register;
