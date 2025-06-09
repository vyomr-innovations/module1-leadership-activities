"use client";

import React, { useState } from "react";

const images = [
  "https://res.cloudinary.com/dey9w5okl/image/upload/v1735644762/case1_pzlh5y.jpg",
  "https://res.cloudinary.com/dey9w5okl/image/upload/v1735644763/case2_rth3x7.jpg",
];

const captions = [
  "Case 1: When students move around to switch seats or line up for activities, it gets chaotic, and people bump into each other. Can you think of a way to solve this problem by learning from how birds move in nature?",
  "Case 2: The classroom floor gets messy after craft time. Can you think of a way to solve this problem by learning from nature?",
];

export default function Com() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const currentCaption = captions && captions.length > currentIndex ? captions?.[currentIndex] : "";

  return (
    <div className="bg-[#C4FFF9] text-[#07BEB8] font-sans p-8 min-h-screen flex items-center justify-center">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-xl">
        <h1 className="text-center text-black mb-6 text-4xl font-extrabold">
          Ideate!!
        </h1>
        <div className="text-center mt-6 text-lg text-black">
          {currentCaption}
        </div>
        <div className="relative w-full mt-8 rounded-lg overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((src, index) => (
              <div key={index} className="w-full flex-shrink-0">
                <img
                  src={src}
                  className="block w-full h-auto rounded-lg shadow-md"
                  alt={`Case ${index + 1}`}
                />
              </div>
            ))}
          </div>

          <button
            style={{ opacity: 0.5 }}
            className="absolute top-1/2 left-4 -translate-y-1/2 bg-[#3DCCC7] text-white p-3 rounded-full cursor-pointer hover:bg-[#07BEB8] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#07BEB8]"
            onClick={goToPrev}
            aria-label="Previous"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            style={{ opacity: 0.5 }}
            className="absolute top-1/2 right-4 -translate-y-1/2 bg-[#3DCCC7] text-white p-3 rounded-full cursor-pointer hover:bg-[#07BEB8] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#07BEB8]"
            onClick={goToNext}
            aria-label="Next"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}