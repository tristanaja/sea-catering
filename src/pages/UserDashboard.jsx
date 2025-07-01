import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const UserDashboard = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [message, setMessage] = useState('');
  const [pauseDates, setPauseDates] = useState({}); // { subscriptionId: { start: '', end: '' } }

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('Please log in to view your subscriptions.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/subscriptions/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setSubscriptions(data);
      } else {
        setMessage(data.message || 'Failed to fetch subscriptions.');
      }
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      setMessage('Network error while fetching subscriptions.');
    }
  };

  const handlePauseChange = (id, field, value) => {
    setPauseDates(prev => ({
      ...prev,
      [id]: { ...prev[id], [field]: value }
    }));
  };

  const pauseSubscription = async (id) => {
    const token = localStorage.getItem('token');
    const dates = pauseDates[id];

    if (!dates || !dates.start || !dates.end) {
      alert('Please select both start and end dates for pausing.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/api/subscriptions/pause/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          pause_start_date: dates.start,
          pause_end_date: dates.end,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('Subscription paused successfully!');
        fetchSubscriptions(); // Refresh list
      } else {
        setMessage(data.message || 'Failed to pause subscription.');
      }
    } catch (error) {
      console.error('Error pausing subscription:', error);
      setMessage('Network error while pausing subscription.');
    }
  };

  const cancelSubscription = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this subscription? This action cannot be undone.')) {
      return;
    }

    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:3001/api/subscriptions/cancel/${id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('Subscription canceled successfully!');
        fetchSubscriptions(); // Refresh list
      } else {
        setMessage(data.message || 'Failed to cancel subscription.');
      }
    } catch (error) {
      console.error('Error canceling subscription:', error);
      setMessage('Network error while canceling subscription.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-16 md:py-24 bg-[#FDF8F5] font-['Lora']">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-[#333333] font-['Montserrat']">Your Subscriptions</h1>
        {message && <p className="text-center mb-4 text-red-500">{message}</p>}

        {subscriptions.length === 0 ? (
          <p className="text-center text-xl text-[#333333] py-8">You have no active subscriptions yet. Explore our <a href="/menu" className="text-[#E85A4F] hover:underline">meal plans</a>!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {subscriptions.map((sub) => (
              <div key={sub.id} className="bg-[#FEE1CD] p-6 rounded-lg shadow-xl border border-[#FEE1CD]">
                <h2 className="text-2xl font-bold text-[#E85A4F] mb-4 font-['Montserrat']">Plan: {sub.plan_selection}</h2>
                <p className="text-[#333333] mb-2 text-lg"><strong>Status:</strong> <span className={`font-semibold ${
                  sub.status === 'active' ? 'text-green-600' :
                  sub.status === 'paused' ? 'text-blue-600' :
                  'text-red-600'
                }`}>{sub.status.toUpperCase()}</span></p>
                <p className="text-[#333333] mb-2 text-lg"><strong>Meal Types:</strong> {
                  (() => {
                    try {
                      return JSON.parse(sub.meal_types).join(', ');
                    } catch (e) {
                      console.error("Error parsing meal_types:", e, sub.meal_types);
                      return sub.meal_types; // Fallback to raw string if parsing fails
                    }
                  })()
                }</p>
                <p className="text-[#333333] mb-2 text-lg"><strong>Delivery Days:</strong> {
                  (() => {
                    try {
                      return JSON.parse(sub.delivery_days).join(', ');
                    } catch (e) {
                      console.error("Error parsing delivery_days:", e, sub.delivery_days);
                      return sub.delivery_days; // Fallback to raw string if parsing fails
                    }
                    
                  })()
                }</p>
                <p className="text-[#333333] mb-2 text-lg"><strong>Total Price:</strong> Rp{sub.total_price.toLocaleString('id-ID')},00</p>
                <p className="text-[#333333] mb-4 text-lg"><strong>Start Date:</strong> {new Date(sub.start_date).toLocaleDateString()}</p>

                {sub.status === 'active' && (
                  <div className="mt-4 pt-4 border-t border-gray-300">
                    <h3 className="text-xl font-semibold mb-3 text-[#333333]">Pause Subscription</h3>
                    <div className="flex flex-col space-y-3 mb-4">
                      <label className="block text-[#333333]">Pause Start Date:
                        <input
                          type="date"
                          className="w-full p-2 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-[#E85A4F] transition-all duration-200"
                          value={pauseDates[sub.id]?.start || ''}
                          onChange={(e) => handlePauseChange(sub.id, 'start', e.target.value)}
                        />
                      </label>
                      <label className="block text-[#333333]">Pause End Date:
                        <input
                          type="date"
                          className="w-full p-2 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-[#E85A4F] transition-all duration-200"
                          value={pauseDates[sub.id]?.end || ''}
                          onChange={(e) => handlePauseChange(sub.id, 'end', e.target.value)}
                        />
                      </label>
                    </div>
                    <button
                      onClick={() => pauseSubscription(sub.id)}
                      className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-700 transition-colors duration-300 mb-3 shadow-md transform hover:scale-105"
                    >
                      Pause Subscription
                    </button>
                    <button
                      onClick={() => cancelSubscription(sub.id)}
                      className="w-full bg-red-500 text-white font-bold py-2 px-4 rounded-full hover:bg-red-700 transition-colors duration-300 shadow-md transform hover:scale-105"
                    >
                      Cancel Subscription
                    </button>
                  </div>
                )}
                {sub.status === 'paused' && (
                  <p className="text-center text-blue-600 font-semibold mt-4 text-lg">Subscription is currently paused.</p>
                )}
                {sub.status === 'canceled' && (
                  <p className="text-center text-red-600 font-semibold mt-4 text-lg">Subscription has been canceled.</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default UserDashboard;
