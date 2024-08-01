"use client"
import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import SchoolIcon from "@mui/icons-material/School";
import PeopleIcon from "@mui/icons-material/People";
import LaptopChromebookIcon from "@mui/icons-material/LaptopChromebook";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import HelpIcon from "@mui/icons-material/Help";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SideBar = () => {
    const router = useRouter();

    return (
        <div className="border-r border-gray-200 h-screen bg-gray-50 bg-opacity-5">
            <div className="flex justify-center flex-col p-4 pt-10">
                <Link href="/" passHref>
                        <img src="/college-logo.png" alt="logo" className="h-20 w-40" />
                        <span className="text-sm font-bold text-gray-600">Information Management System</span>
                </Link>
            </div>

            <hr className="h-0 border border-gray-200" />

            <div className="px-4">
                <ul className="list-none mb-0">
                    <p className="text-xs font-bold text-gray-500">MAIN</p>

                    <Link href="/" passHref>
                        <li className="flex items-center py-2 hover:bg-gray-100 rounded-lg">
                            <DashboardIcon className="text-lg text-purple-600" />
                            <span className="text-sm font-bold text-gray-600 ml-2">Dashboard</span>
                        </li>
                    </Link>

                    <Link href="/usermanagement" passHref>
                    <li className="flex items-center py-2 hover:bg-gray-100 rounded-lg">
                        <AccountBoxIcon className="text-lg text-purple-600" /> {/* Use the imported icon */}
                        <span className="text-sm font-bold text-gray-600 ml-2">User Management</span>
                    </li>
                </Link>

                    <Link href="/calender" passHref>
                        <li className="flex items-center py-2 hover:bg-gray-100 rounded-lg">
                            <CalendarMonthIcon className="text-lg text-purple-600" />
                            <span className="text-sm font-bold text-gray-600 ml-2">Calender</span>
                        </li>
                    </Link>

                    <Link href="/appointments" passHref>
                        <li className="flex items-center py-2 hover:bg-gray-100 rounded-lg">
                            <ContentPasteIcon className="text-lg text-purple-600" />
                            <span className="text-sm font-bold text-gray-600 ml-2">Appointments</span>
                        </li>
                    </Link>

                    <li className="flex items-center py-2 hover:bg-gray-100 rounded-lg">
                        <SchoolIcon className="text-lg text-purple-600" />
                        <span className="text-sm font-bold text-gray-600 ml-2">Tutors</span>
                    </li>

                    <li className="flex items-center py-2 hover:bg-gray-100 rounded-lg">
                        <PeopleIcon className="text-lg text-purple-600" />
                        <span className="text-sm font-bold text-gray-600 ml-2">Students</span>
                    </li>

                    <li className="flex items-center py-2 hover:bg-gray-100 rounded-lg">
                        <LaptopChromebookIcon className="text-lg text-purple-600" />
                        <span className="text-sm font-bold text-gray-600 ml-2">Services</span>
                    </li>

                    <li className="flex items-center py-2 hover:bg-gray-100 rounded-lg">
                        <RequestQuoteIcon className="text-lg text-purple-600" />
                        <span className="text-sm font-bold text-gray-600 ml-2">Finance</span>
                    </li>

                    <li className="flex items-center py-2 hover:bg-gray-100 rounded-lg">
                        <SettingsIcon className="text-lg text-purple-600" />
                        <span className="text-sm font-bold text-gray-600 ml-2">Settings</span>
                    </li>
                </ul>
            </div>

            <div className="px-4">
                <ul className="list-none mb-0">
                    <p className="text-xs font-bold text-gray-500">MORE OPTIONS</p>
                    <li className="flex items-center py-2 hover:bg-gray-100 rounded-lg">
                        <LogoutIcon className="text-lg text-purple-600" />
                        <span className="text-sm font-bold text-gray-600 ml-2">Sign Out</span>
                    </li>
                    <li className="flex items-center py-2 hover:bg-gray-100 rounded-lg">
                        <HelpIcon className="text-lg text-purple-600" />
                        <span className="text-sm font-bold text-gray-600 ml-2">Help</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default SideBar;