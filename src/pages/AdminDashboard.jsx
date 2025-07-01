import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AdminDashboard = () => {
  const [metrics, setMetrics] = useState({
    newSubscriptions: 0,
    mrr: 0,
    reactivations: 0,
    totalActiveSubscriptions: 0,
  });
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Set default date range for the last 30 days
    const today = new Date();
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(today.getDate() - 30);

    setEndDate(today.toISOString().slice(0, 10));
    setStartDate(thirtyDaysAgo.toISOString().slice(0, 10));
  }, []);

  useEffect(() => {
    if (startDate && endDate) {
      fetchMetrics();
    }
  }, [startDate, endDate]);

  const fetchMetrics = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('Authentication token not found. Please log in as an admin.');
      return;
    }

    setMessage(''); // Clear previous messages

    try {
      const headers = {
        'Authorization': `Bearer ${token}`,
      };

      // Fetch New Subscriptions
      const newSubsRes = await fetch(`http://localhost:3001/api/admin/metrics/new-subscriptions?startDate=${startDate}&endDate=${endDate}`, { headers });
      const newSubsData = await newSubsRes.json();
      if (newSubsRes.ok) {
        setMetrics(prev => ({ ...prev, newSubscriptions: newSubsData.newSubscriptions || 0 }));
      } else {
        setMessage(newSubsData.message || 'Failed to fetch new subscriptions.');
      }

      // Fetch MRR
      const mrrRes = await fetch(`http://localhost:3001/api/admin/metrics/mrr?startDate=${startDate}&endDate=${endDate}`, { headers });
      const mrrData = await mrrRes.json();
      if (mrrRes.ok) {
        setMetrics(prev => ({ ...prev, mrr: mrrData.mrr || 0 }));
      } else {
        setMessage(mrrData.message || 'Failed to fetch MRR.');
      }

      // Fetch Reactivations
      const reactivationsRes = await fetch(`http://localhost:3001/api/admin/metrics/reactivations?startDate=${startDate}&endDate=${endDate}`, { headers });
      const reactivationsData = await reactivationsRes.json();
      if (reactivationsRes.ok) {
        setMetrics(prev => ({ ...prev, reactivations: reactivationsData.reactivations || 0 }));
      } else {
        setMessage(reactivationsData.message || 'Failed to fetch reactivations.');
      }

      // Fetch Subscription Growth (total active subscriptions)
      const growthRes = await fetch(`http://localhost:3001/api/admin/metrics/growth`, { headers });
      const growthData = await growthRes.json();
      if (growthRes.ok) {
        setMetrics(prev => ({ ...prev, totalActiveSubscriptions: growthData.totalActiveSubscriptions || 0 }));
      } else {
        setMessage(growthData.message || 'Failed to fetch subscription growth.');
      }

    } catch (error) {
      console.error('Error fetching admin metrics:', error);
      setMessage('Network error while fetching admin metrics.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-16 md:py-24 bg-[#FDF8F5] font-['Lora']">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-[#333333] font-['Montserrat']">Admin Dashboard</h1>
        {message && <p className="text-center mb-4 text-red-500">{message}</p>}

        <div className="max-w-4xl mx-auto bg-[#FEE1CD] p-8 rounded-lg shadow-xl mb-8 border border-[#FEE1CD]">
          <h2 className="text-2xl font-bold text-[#E85A4F] mb-6 font-['Montserrat']">Filter Metrics by Date Range</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <label className="block text-[#333333]">
              <span className="text-lg font-semibold mb-2 block">Start Date:</span>
              <input
                type="date"
                className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E85A4F] transition-all duration-200"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </label>
            <label className="block text-[#333333]">
              <span className="text-lg font-semibold mb-2 block">End Date:</span>
              <input
                type="date"
                className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E85A4F] transition-all duration-200"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </label>
          </div>
          <button
            onClick={fetchMetrics}
            className="w-full bg-[#E85A4F] text-white font-bold py-3 px-4 rounded-full hover:bg-red-700 transition-colors duration-300 font-['Montserrat'] shadow-lg transform hover:scale-105"
          >
            Apply Filter
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-xl text-center border border-[#FEE1CD]">
            <h3 className="text-xl font-semibold text-[#333333] mb-3 font-['Montserrat']">New Subscriptions</h3>
            <p className="text-4xl font-bold text-[#E85A4F]">{metrics.newSubscriptions}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-xl text-center border border-[#FEE1CD]">
            <h3 className="text-xl font-semibold text-[#333333] mb-3 font-['Montserrat']">Monthly Recurring Revenue (MRR)</h3>
            <p className="text-4xl font-bold text-[#E85A4F]">Rp{metrics.mrr.toLocaleString('id-ID')},00</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-xl text-center border border-[#FEE1CD]">
            <h3 className="text-xl font-semibold text-[#333333] mb-3 font-['Montserrat']">Reactivations</h3>
            <p className="text-4xl font-bold text-[#E85A4F]">{metrics.reactivations}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-xl text-center border border-[#FEE1CD]">
            <h3 className="text-xl font-semibold text-[#333333] mb-3 font-['Montserrat']">Total Active Subscriptions</h3>
            <p className="text-4xl font-bold text-[#E85A4F]">{metrics.totalActiveSubscriptions}</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminDashboard;
