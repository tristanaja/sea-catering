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
          <h2 className="text-2xl font-bold text-[#E85A4F] mb-6 font-['Montserrat'] flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            <span>Filter Metrics by Date Range</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <label className="block text-[#333333]">
              <span className="text-lg font-semibold mb-2 block flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#E85A4F]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Start Date:</span>
              </span>
              <input
                type="date"
                className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E85A4F] transition-all duration-200"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </label>
            <label className="block text-[#333333]">
              <span className="text-lg font-semibold mb-2 block flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#E85A4F]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>End Date:</span>
              </span>
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
            className="w-full bg-[#E85A4F] text-white font-bold py-3 px-4 rounded-full hover:bg-red-700 transition-colors duration-300 font-['Montserrat'] shadow-lg transform hover:scale-105 flex items-center justify-center space-x-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            <span>Apply Filter</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-xl text-center border border-[#FEE1CD]">
            <h3 className="text-xl font-semibold text-[#333333] mb-3 font-['Montserrat'] flex items-center justify-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#E85A4F]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span>New Subscriptions</span>
            </h3>
            <p className="text-4xl font-bold text-[#E85A4F]">{metrics.newSubscriptions}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-xl text-center border border-[#FEE1CD]">
            <h3 className="text-xl font-semibold text-[#333333] mb-3 font-['Montserrat'] flex items-center justify-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#E85A4F]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>Monthly Recurring Revenue (MRR)</span>
            </h3>
            <p className="text-4xl font-bold text-[#E85A4F]">Rp{metrics.mrr.toLocaleString('id-ID')},00</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-xl text-center border border-[#FEE1CD]">
            <h3 className="text-xl font-semibold text-[#333333] mb-3 font-['Montserrat'] flex items-center justify-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#E85A4F]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356-2A8.001 8.001 0 004 12v1a8.001 8.001 0 0015.356 2M6 9H2m3.356 2A8.001 8.001 0 0012 21v-1a8.001 8.001 0 00-7.022-11.588z" />
              </svg>
              <span>Reactivations</span>
            </h3>
            <p className="text-4xl font-bold text-[#E85A4F]">{metrics.reactivations}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-xl text-center border border-[#FEE1CD]">
            <h3 className="text-xl font-semibold text-[#333333] mb-3 font-['Montserrat'] flex items-center justify-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#E85A4F]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <span>Total Active Subscriptions</span>
            </h3>
            <p className="text-4xl font-bold text-[#E85A4F]">{metrics.totalActiveSubscriptions}</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminDashboard;
