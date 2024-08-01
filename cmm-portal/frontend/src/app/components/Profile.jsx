"use client";

import { useState, useEffect } from "react";
import useStore from "@/store";
import Cookies from 'js-cookie';

export default function Profile({userRole1}) {
  const { userRole, setRole } = useStore();

  useEffect(() => {
    Cookies.set('userRole', userRole1, { path: '/' });
    if (!userRole) {
      setRole(userRole1);
    }
  }, [userRole, userRole1]);

  return (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-4xl font-bold text-center text-gray-800">
        Welcome to Profile Page {userRole}
      </h1>
    </div>
  );
}