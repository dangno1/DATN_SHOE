/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import { BsArrowRight } from "react-icons/bs";

function Slider() {
 

  return (
    <div>
      {/* banner men */}
      <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 h-screen text-white overflow-hidden py-6">
        <div className="absolute inset-0">
          <img
            src="https://the-post-assets.sgp1.digitaloceanspaces.com/2021/01/Ultraboost-1896x800.jpg"
            alt="Background Image"
            className="object-cover object-center w-full h-full"
          />
          <div className="absolute inset-0 bg-black opacity-50" />
        </div>
        <div className="relative z-10 flex flex-col justify-center items-center h-full text-center">
          <h1 className="text-5xl font-bold leading-tight mb-4">
            Welcome to Our Awesome Website
          </h1>
          <p className="text-lg text-gray-300 mb-8">
          Here we have great products.
          </p>
          <a
            href="#"
            className="bg-black hover:bg-white hover:text-black py-2 px-6 rounded-full text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
          >
            Get Started
          </a>
        </div>
      </div>
      {/* banner men */}
    </div>
  );
}

export default Slider;
