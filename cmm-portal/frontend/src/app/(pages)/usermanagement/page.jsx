'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import SideBar from "@/app/components/SideBar";

const UserManagement = () => {

        // Step 2: Add state to control the visibility of the search input
        const [showSearchInput, setShowSearchInput] = useState(false);

        // Step 3: Function to toggle the visibility of the search input
        const toggleSearchInput = () => {
            setShowSearchInput(!showSearchInput);
        };
    

    return (
        <div className="usermanagement-container relative">
            <section className="max-w-[1400px] mx-auto min-h-screen">
                <div className="home flex h-full">
                    <SideBar className="w-36 bg-gray-50 border-r border-gray-200 h-screen fixed left-0 top-0 flex-shrink-0" />

                    <div className="content-container pl-7">
                        <div className="titles-container max-w-[1400px] mt-20 mb-5">
                            <input type="text" placeholder="Search..." className="search-input w-full p-2 mb-5" />
                            <h2 className="font-bold text-5xl mb-10">Registration</h2>
                            <h2 className="text-2xl">Client Registration</h2>
                        </div>

                        <div className="main-content mt-34 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-10">
                            <div className="flash-card bg-white shadow-lg rounded-lg p-4">
                            <h3 className="font-bold text-xl mb-2">Register a new Students</h3>
                                <h3 className="text-xl mb-2">Total Students</h3>
                                <h2 className="font-bold text-7xl mb-2 text-blue-500">500</h2>
                                <div className="flex justify-center w-full mt-4 space-x-4">
                                    <button className="mt-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        Register Student
                                    </button>
                                    <button 
                                        className="mt-10 bg-white text-blue-500 py-2 px-4 rounded opacity-50 hover:bg-opacity-30 hover:bg-blue-500"
                                        style={{ transition: 'background-color 0.3s', backgroundColor: 'rgba(255, 255, 255, 0.5)' }} // Adjusted initial opacity to 50%
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                            <div className="flash-card bg-white shadow-lg rounded-lg p-4">
                            <h3 className="font-bold text-xl mb-2">Register a new Parent</h3>

                                <h3 className="text-xl mb-2">Total Parent</h3>
                                <h2 className="font-bold text-7xl mb-2 text-blue-500">500</h2>
                                <div className="flex justify-center w-full mt-4 space-x-4">
                                    <button className="mt-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        Register Parent
                                    </button>
                                    <button 
                                        className="mt-10 bg-white text-blue-500 py-2 px-4 rounded opacity-50 hover:bg-opacity-30 hover:bg-blue-500"
                                        style={{ transition: 'background-color 0.3s', backgroundColor: 'rgba(255, 255, 255, 0.5)' }} // Adjusted initial opacity to 50%
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="content-container pl-[0rem]">
                            <div className="titles-container max-w-[1400px] mt-20 mb-5">
                                
                                <h2 className="text-2xl">Self Registration</h2>
                            </div>
                            <div className="main-content mt-34 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-10">
                                <div className="flash-card bg-white shadow-lg rounded-lg p-4">
                                <h3 className="font-bold text-xl mb-2">Register a new Admin</h3>

                                    <h3 className="text-xl mb-2">Total Admin</h3>
                                    <h2 className="font-bold text-7xl mb-2 text-blue-500">500</h2>
                                    <div className="flex justify-center w-full mt-4 space-x-4">
                                        <button className="mt-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                            Register Admin
                                        </button>
                                        <button 
                                        className="mt-10 bg-white text-blue-500 py-2 px-4 rounded opacity-50 hover:bg-opacity-30 hover:bg-blue-500"
                                        style={{ transition: 'background-color 0.3s', backgroundColor: 'rgba(255, 255, 255, 0.5)' }} // Adjusted initial opacity to 50%
                                    >
                                        Cancel
                                    </button>
                                    </div>
                                </div>
                                <div className="flash-card bg-white shadow-lg rounded-lg p-4">
                                <h3 className="font-bold text-xl mb-2">Register a new Tutor</h3>

                                    <h3 className="text-xl mb-2">Total Tutor</h3>
                                    <h2 className="font-bold text-7xl mb-2 text-blue-500">500</h2>
                                    <div className="flex justify-center w-full mt-4 space-x-4">
                                        <button className="mt-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                            Register Tutor
                                        </button>
                                        <button 
                                        className="mt-10 bg-white text-blue-500 py-2 px-4 rounded opacity-50 hover:bg-opacity-30 hover:bg-blue-500"
                                        style={{ transition: 'background-color 0.3s', backgroundColor: 'rgba(255, 255, 255, 0.5)' }} // Adjusted initial opacity to 50%
                                    >
                                        Cancel
                                    </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    
                </div>
                {/* Full-width Log Section Wrapper */}
                <div className="pl-[17.5rem] pr-5 w-full">
                        {/* Log Section */}
                        <div className="logs-container bg-white shadow-lg rounded-lg pl-4 pr-0 mb-10">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-bold">Logs</h3>
                                <div className="flex items-center space-x-2">
                                    <button className="text-blue-500 hover:text-blue-700">View all logs</button>
                                    <input type="text" placeholder="Search logs..." className="search-input p-2 border rounded"/>
                                    {/* <button onClick={toggleSearchInput} className="text-blue-500 hover:text-blue-700">
                                    🔍
                                    </button>
                                    {showSearchInput && (
                                        <input type="text" placeholder="Search logs..." className="search-input w-full p-2 mb-5" />
                                    )} */}
                                </div>
                            </div>
                            <div className="log-entries overflow-y-auto max-h-96">
                                {Array.from({ length: 15 }).map((_, index) => (
                                    <div key={index} className="log-entry flex justify-between items-center py-2 px-4 border-b">
                                        <p>[Client Name] has scheduled a new [Service Name] appointment with [Tutor Name].</p>
                                        <div className="flex items-center space-x-2">
                                            <span className="w-4 h-4 bg-gray-300 rounded-full"></span>
                                            <span className="w-4 h-4 bg-gray-300 rounded-full"></span>
                                            <span className="w-4 h-4 bg-gray-300 rounded-full"></span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* End Log Section */}
                    </div>
            </section>
        </div>
    );
};

export default UserManagement;
