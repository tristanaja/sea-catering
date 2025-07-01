import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Subscription = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [planSelection, setPlanSelection] = useState('');
  const [mealTypes, setMealTypes] = useState([]);
  const [deliveryDays, setDeliveryDays] = useState([]);
  const [allergies, setAllergies] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [formErrors, setFormErrors] = useState({});

  const planPrices = {
    'Diet Plan': 30000,
    'Protein Plan': 40000,
    'Royal Plan': 60000,
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [planSelection, mealTypes, deliveryDays]);

  const calculateTotalPrice = () => {
    const planPrice = planPrices[planSelection] || 0;
    const numberOfMealTypes = mealTypes.length;
    const numberOfDeliveryDays = deliveryDays.length;
    const multiplier = 4.3;

    if (planPrice > 0 && numberOfMealTypes > 0 && numberOfDeliveryDays > 0) {
      const calculatedPrice = planPrice * numberOfMealTypes * numberOfDeliveryDays * multiplier;
      setTotalPrice(calculatedPrice);
    } else {
      setTotalPrice(0);
    }
  };

  const handleMealTypeChange = (e) => {
    const { value, checked } = e.target;
    setMealTypes((prev) =>
      checked ? [...prev, value] : prev.filter((type) => type !== value)
    );
  };

  const handleDeliveryDayChange = (e) => {
    const { value, checked } = e.target;
    setDeliveryDays((prev) =>
      checked ? [...prev, value] : prev.filter((day) => day !== value)
    );
  };

  const validateForm = () => {
    const errors = {};
    if (!name) errors.name = 'Full Name is required.';
    if (!phoneNumber) errors.phoneNumber = 'Active Phone Number is required.';
    if (!planSelection) errors.planSelection = 'Plan Selection is required.';
    if (mealTypes.length === 0) errors.mealTypes = 'At least one Meal Type must be selected.';
    if (deliveryDays.length === 0) errors.deliveryDays = 'At least one Delivery Day must be selected.';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const formData = {
        name,
        phoneNumber,
        planSelection,
        mealTypes,
        deliveryDays,
        allergies,
        totalPrice,
      };
      try {
        const response = await fetch('http://localhost:3001/api/subscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
          alert('Subscription successful!');
          console.log('Success:', data);
          // Reset form
          setName('');
          setPhoneNumber('');
          setPlanSelection('');
          setMealTypes([]);
          setDeliveryDays([]);
          setAllergies('');
          setTotalPrice(0);
          setFormErrors({});
        } else {
          alert(`Subscription failed: ${data.message || 'Unknown error'}`);
          console.error('Error:', data);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Subscription failed due to network error.');
      }
      setName('');
      setPhoneNumber('');
      setPlanSelection('');
      setMealTypes([]);
      setDeliveryDays([]);
      setAllergies('');
      setTotalPrice(0);
      setFormErrors({});
    } else {
      alert('Please fill in all required fields and correct errors.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-16 md:py-24 bg-[#FDF8F5] font-['Lora']">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-[#333333] font-['Montserrat']">Subscribe to a Plan</h1>
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-[#FEE1CD] p-8 rounded-lg shadow-xl space-y-6">
          <div className="mb-4">
            <label htmlFor="name" className="block text-[#333333] text-lg font-semibold mb-2">Full Name *</label>
            <input
              type="text"
              id="name"
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E85A4F] transition-all duration-200"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block text-[#333333] text-lg font-semibold mb-2">Active Phone Number *</label>
            <input
              type="tel"
              id="phoneNumber"
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E85A4F] transition-all duration-200"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
            {formErrors.phoneNumber && <p className="text-red-500 text-sm mt-1">{formErrors.phoneNumber}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="planSelection" className="block text-[#333333] text-lg font-semibold mb-2">Plan Selection *</label>
            <select
              id="planSelection"
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E85A4F] transition-all duration-200"
              value={planSelection}
              onChange={(e) => setPlanSelection(e.target.value)}
              required
            >
              <option value="">Select a plan</option>
              <option value="Diet Plan">Diet Plan – Rp30.000,00 per meal</option>
              <option value="Protein Plan">Protein Plan – Rp40.000,00 per meal</option>
              <option value="Royal Plan">Royal Plan – Rp60.000,00 per meal</option>
            </select>
            {formErrors.planSelection && <p className="text-red-500 text-sm mt-1">{formErrors.planSelection}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-[#333333] text-lg font-semibold mb-2">Meal Type *</label>
            <div className="flex flex-wrap gap-4">
              {['Breakfast', 'Lunch', 'Dinner'].map((type) => (
                <label key={type} className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    value={type}
                    checked={mealTypes.includes(type)}
                    onChange={handleMealTypeChange}
                    className="form-checkbox h-5 w-5 text-[#E85A4F] rounded focus:ring-2 focus:ring-[#E85A4F] transition-all duration-200"
                  />
                  <span className="ml-2 text-[#333333]">{type}</span>
                </label>
              ))}
            </div>
            {formErrors.mealTypes && <p className="text-red-500 text-sm mt-1">{formErrors.mealTypes}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-[#333333] text-lg font-semibold mb-2">Delivery Days *</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                <label key={day} className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    value={day}
                    checked={deliveryDays.includes(day)}
                    onChange={handleDeliveryDayChange}
                    className="form-checkbox h-5 w-5 text-[#E85A4F] rounded focus:ring-2 focus:ring-[#E85A4F] transition-all duration-200"
                  />
                  <span className="ml-2 text-[#333333]">{day}</span>
                </label>
              ))}
            </div>
            {formErrors.deliveryDays && <p className="text-red-500 text-sm mt-1">{formErrors.deliveryDays}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="allergies" className="block text-[#333333] text-lg font-semibold mb-2">Allergies / Dietary Restrictions</label>
            <textarea
              id="allergies"
              rows="3"
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E85A4F] transition-all duration-200"
              value={allergies}
              onChange={(e) => setAllergies(e.target.value)}
            ></textarea>
          </div>

          <div className="mb-6 text-center">
            <p className="text-3xl font-bold text-[#E85A4F]">Total Price: Rp{totalPrice.toLocaleString('id-ID')},00</p>
          </div>

          <button
            type="submit"
            className="w-full bg-[#E85A4F] text-white font-bold py-3 px-4 rounded-full hover:bg-red-700 transition-colors duration-300 font-['Montserrat'] shadow-lg transform hover:scale-105"
          >
            Subscribe Now
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Subscription;
