"use client";

import Image from "next/image";
import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";

const ChooseUser = ({ setChoose }) => {
  const [selected, setSelected] = useState(0);
  return (
    <div className="flex justify-center w-full mx-auto pt-24 items-center h-screen max-w-[1400px]">
      <div className="bg-white flex flex-col rounded-md h-[630px] p-6 w-3/4">
        <h1 className="text-6xl text-gray-500 font-semibold tracking-widest text-center mb-10">
          Who are you?
        </h1>
        <div className="flex gap-10 h-4/6 w-full py-6 px-6">
          <div className="w-1/2">
            <button
              onClick={() => setSelected(1)}
              className={`w-full h-80 border-gray-200 rounded-xl relative overflow-hidden ${
                selected === 1 &&
                "border-4 border-separate p-1 border-lime-600 shadow-[0_3px_10px_rgb(0,0,0,0.2)] shadow-lime-300"
              }`}
            >
              <Image
                src="https://cdn.dribbble.com/users/8087897/screenshots/16751566/media/8cacb4fe9c01e74b88afbde3a85f8708.png"
                alt="Student"
                width={947}
                height={710}
                className="h-full w-full object-cover rounded-lg hover:scale-110 transition-transform ease-in-out duration-500 "
              />
              {selected === 1 && (
                <FaCheckCircle className="text-lime-600 absolute top-6 left-7 border-2 border-white bg-white rounded-full" />
              )}
            </button>
            <p className="text-center font-semibold my-2">I am a Student</p>
          </div>
          <div className="w-1/2">
            <button
              onClick={() => setSelected(2)}
              className={`w-full h-80 relative border-gray-200 rounded-lg overflow-hidden ${
                selected === 2 && "border-4 p-1 border-lime-600 shadow-[0_3px_10px_rgb(0,0,0,0.2)] shadow-lime-300"
              }`}
            >
              <Image
                src="https://cdn.dribbble.com/users/7915374/screenshots/17189730/media/9c264d62ef957b1da997206217df2b5e.jpg"
                alt="Student"
                width={947}
                height={710}
                className="h-full w-full object-cover rounded-lg hover:scale-110 transition-transform ease-in-out duration-500"
              />
              {selected === 2 && (
                <FaCheckCircle className="text-lime-600 border-2 border-white absolute top-6 left-7 bg-white rounded-full" />
              )}
            </button>
            <p className="text-center font-semibold my-2">I am a Parent</p>
          </div>
        </div>
        <div className="text-center w-full my-6">
          <button
            onClick={() => setChoose(selected)}
            className="px-12 w-1/3 py-6 bg-gradient-to-r from-indigo-400 to-cyan-400 hover:bg-gradient-to-l rounded-full font-semibold tracking-wide"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChooseUser;
