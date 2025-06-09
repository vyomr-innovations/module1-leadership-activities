"use client";

import React, { useState } from "react";

const images = [
  "https://res.cloudinary.com/dey9w5okl/image/upload/v1735650851/Decision_Clothes.drawio_vrrd5d.png",
  "https://res.cloudinary.com/dey9w5okl/image/upload/v1735639240/unnamed_3_rcy96c.png",
  "https://res.cloudinary.com/dey9w5okl/image/upload/v1735640007/FoodChoices_clgkgi.jpg",
];

export default function Com() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="container flex flex-col justify-between items-center w-full h-full max-w-3xl">
        <h1 className="text-3xl mb-4">Flow Chart</h1>
        <img
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          className="max-w-full max-h-full border-2 border-gray-300 rounded-lg shadow-md"
        />
        <button
          onClick={handleNextClick}
          className="mt-6 px-6 py-3 text-lg bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300 shadow-md"
        >
          Next
        </button>
      </div>
    </div>
  );
}