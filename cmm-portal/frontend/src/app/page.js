'use client';

import React from "react";
import { Doughnut, Bar } from "react-chartjs-2";
import 'chart.js/auto';
import SideBar from "./components/SideBar";

const Dashboard = () => {
  const servicesData = {
    labels: ['IELTS', 'Math', 'SAT'],
    datasets: [{
      data: [56, 16, 28],
      backgroundColor: ['#3B82F6', '#1E40AF', '#6366F1'],
    }]
  };

  const usersData = {
    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    datasets: [{
      label: 'Users',
      data: [100, 200, 150, 300, 250, 400, 350, 450, 500, 550, 600, 650],
      backgroundColor: '#3B82F6',
    }]
  };

  const doughnutOptions = {
    responsive: true,
    aspectRatio: 2, // Adjust this value to change the width-to-height ratio
    plugins: {
      legend: {
        position: 'right',
      }
    }
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      }
    }
  };

  return (
    <div className="flex h-screen">
          <SideBar className="w-36 bg-gray-50 border-r border-gray-200 h-screen fixed left-0 top-0 flex-shrink-0" />

    <div className="bg-gray-100 p-6">
      <div className="container mx-auto">
        
        <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"> */}
  {/* <div className="flex items-center space-x-4 p-4 bg-green-100 rounded-lg shadow sm:p-2 md:p-4 lg:p-6">
   */}
               <div className="flex items-center space-x-4 p-4 bg-green-100 rounded-lg shadow">

    {/* <div className="bg-green-200 p-3 rounded-full">
      <svg className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm0-14c-3.309 0-6 2.691-6 6 0 3.309 2.691 6 6 6 3.309 0 6-2.691 6-6 0-3.309-2.691-6-6-6zm0 10c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4z"/>
                </svg>
              </div> */}
              <div>
              <p className="text-xl font-semibold">5,423</p>
                <p className="text-gray-500">Total Students</p>
                <p className="text-green-600 text-sm">10% this month</p>
    </div>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-green-100 rounded-lg shadow">
              {/* <div className="bg-green-200 p-3 rounded-full">
                <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm0-14c-3.309 0-6 2.691-6 6 0 3.309 2.691 6 6 6 3.309 0 6-2.691 6-6 0-3.309-2.691-6-6-6zm0 10c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4z"/>
                </svg>
              </div> */}
              <div>
                <p className="text-xl font-semibold">18</p>
                <p className="text-gray-500">New Hires</p>
                <p className="text-green-600 text-sm">8% this month</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-green-100 rounded-lg shadow">
              {/* <div className="bg-green-200 p-3 rounded-full">
                <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm0-14c-3.309 0-6 2.691-6 6 0 3.309 2.691 6 6 6 3.309 0 6-2.691 6-6 0-3.309-2.691-6-6-6zm0 10c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4z"/>
                </svg>
              </div> */}
              <div>
                <p className="text-xl font-semibold">1,000</p>
                <p className="text-gray-500">Total Parents</p>
                <p className="text-green-600 text-sm">10% this month</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-green-100 rounded-lg shadow">
              {/* <div className="bg-green-200 p-3 rounded-full">
                <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm0-14c-3.309 0-6 2.691-6 6 0 3.309 2.691 6 6 6 3.309 0 6-2.691 6-6 0-3.309-2.691-6-6-6zm0 10c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4z"/>
                </svg>
              </div> */}
              <div>
                <p className="text-xl font-semibold">5,423</p>
                <p className="text-gray-500">Total Students</p>
                <p className="text-green-600 text-sm">10% this month</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-red-100 rounded-lg shadow">
              {/* <div className="bg-red-200 p-3 rounded-full">
                <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm0-14c-3.309 0-6 2.691-6 6 0 3.309 2.691 6 6 6 3.309 0 6-2.691 6-6 0-3.309-2.691-6-6-6zm0 10c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4z"/>
                </svg>
              </div> */}
              <div>
                <p className="text-xl font-semibold">20</p>
                <p className="text-gray-500">Total Tutors</p>
                <p className="text-red-600 text-sm">-1% this month</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-red-100 rounded-lg shadow">
              {/* <div className="bg-red-200 p-3 rounded-full">
                <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm0-14c-3.309 0-6 2.691-6 6 0 3.309 2.691 6 6 6 3.309 0 6-2.691 6-6 0-3.309-2.691-6-6-6zm0 10c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4z"/>
                </svg>
              </div> */}
              <div>
                <p className="text-xl font-semibold">20</p>
                <p className="text-gray-500">Total Countries</p>
                <p className="text-red-600 text-sm">-1% this month</p>
              </div>
            </div>
          </div>
          {/* <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4"> */}
          <div className="bg-white p-6 rounded-lg shadow-lg mb-7">
            <h2 className="text-2xl font-semibold mb-4">Services</h2>
            <Doughnut data={servicesData} options={doughnutOptions} />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Users</h2>
            <Bar data={usersData} options={barOptions} />
            </div>
          </div>
        </div>
      </div>
    {/* // </div> */}
    </div>
  );
};

export default Dashboard;
