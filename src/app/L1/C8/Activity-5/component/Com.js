"use client";

import React, { useState, useEffect } from "react";

const images = [
  {
    src: "https://res.cloudinary.com/dey9w5okl/image/upload/v1735215877/f7137ab5-5afd-46e5-b647-b1d60735e8a0_kkgjr0.jpg",
    caption: "Wash your hands before eating.",
  },
  {
    src: "https://res.cloudinary.com/dey9w5okl/image/upload/v1735215877/07c54e7d-7723-4212-ae8b-25cc1ff2b9aa_u1aw4a.jpg",
    caption: "Chew with your mouth open.",
  },
  {
    src: "https://res.cloudinary.com/dey9w5okl/image/upload/v1735215877/9417e6c4-b6dd-4ca7-bf58-1afe30e06261_whwuk1.jpg",
    caption: "Take small bites of food.",
  },
  {
    src: "https://res.cloudinary.com/dey9w5okl/image/upload/v1735215877/c18ae6d6-feab-470f-88ab-ae311ea428c2_fyohd7.jpg",
    caption: "Talk with your mouth full.",
  },
  {
    src: "https://res.cloudinary.com/dey9w5okl/image/upload/v1735215876/783036d7-f376-439c-8d97-e7f8f9c21f73_ctnvxa.jpg",
    caption: "Wait until you’re done chewing to sip your drink.",
  },
  {
    src: "https://res.cloudinary.com/dey9w5okl/image/upload/v1735215876/06c740bf-76c3-4e89-8075-15af38df4cea_fnscli.jpg",
    caption: "Reaching across the table to grab the salt.",
  },
  {
    src: "https://res.cloudinary.com/dey9w5okl/image/upload/v1735215880/slurping_yly64p.webp",
    caption: "Slurping as you drink juice.",
  },
  {
    src: "https://res.cloudinary.com/dey9w5okl/image/upload/v1735215876/c225b14a-aba1-42c3-9c38-d358a3d4bbba_zp9yzs.jpg",
    caption: "Keeping all screens away while eating.",
  },
];

export default function Com() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSummary, setShowSummary] = useState(false);

  const handlePrev = () => {
    setShowSummary(false);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    if (currentIndex === images.length - 1) {
      setShowSummary(true);
    } else {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  if (showSummary) {
    return (
      <div className="container mx-auto mt-5 p-4 max-w-2xl bg-white shadow-lg rounded-lg">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">
          Good Table Manners
        </h3>
        <ul className="list-disc list-inside text-lg text-gray-700 space-y-2">
          <li>Wash hands before eating.</li>
          <li>Keep all screens away while eating.</li>
          <li>Chew with your mouth closed.</li>
          <li>Take small bites of food.</li>
          <li>Wait until food in mouth is chewed before taking a sip of water/drink.</li>
          <li>Do not talk with a mouthful.</li>
          <li>Do not reach across the table to grab salt or any other item on the table.</li>
          <li>Do not slurp or make a noise while drinking.</li>
          <li>Place your knife and fork together like number 11 when you’re done eating.</li>
        </ul>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-5 p-4 max-w-5xl">
      <h1 className="text-center text-2xl font-bold mb-[10px]">Is this correct or incorrect? Why?</h1>
      <div className="relative w-full overflow-hidden rounded-lg shadow-xl">
        <div className="relative h-[40rem] flex items-center justify-center"> {/* Height increased to h-[40rem] */}
          {images.map((image, index) => (
            <div
              key={index}
              className={`
                absolute top-0 left-0 w-full h-full
                transition-opacity duration-700 ease-in-out
                ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}
              `}
            >
              <img
                src={image.src}
                className="block w-full h-full object-cover rounded-lg"
                alt={`Image ${index + 1}`}
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50 text-white rounded-b-lg hidden md:block">
                <p className="text-lg text-center">{image.caption}</p>
              </div>
            </div>
          ))}
        </div>

        <button
          className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-3 rounded-full ml-2 z-20 hover:bg-opacity-75 transition-colors"
          type="button"
          onClick={handlePrev}
        >
          <span className="sr-only">Previous</span>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
        </button>
        <button
          className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-3 rounded-full mr-2 z-20 hover:bg-opacity-75 transition-colors"
          type="button"
          onClick={handleNext}
        >
          <span className="sr-only">Next</span>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
}