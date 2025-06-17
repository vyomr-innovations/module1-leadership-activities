"use client";

import React, { useState } from "react";

const images = [
  {
    src: "https://res.cloudinary.com/dey9w5okl/image/upload/v1735275423/DALL_E_2024-12-26_20.01.51_-_A_10-year-old_boy_sitting_at_a_dining_table_asking_politely_for_a_salt_shaker_to_be_passed_to_him_instead_of_leaning_forward_to_reach_it._He_has_a_f_yjdcfu.webp",
    caption:
      "Ron asks salt to be passed to him, instead of leaning on the table to reach out.",
  },
  {
    src: "https://res.cloudinary.com/dey9w5okl/image/upload/v1735275420/0932c2e3-2b53-45f3-a6aa-2099de611c3a_tjbbi1.jpg",
    caption:
      "Sam is done with his food and he gets up while others at the table are still eating.",
  },
  {
    src: "https://res.cloudinary.com/dey9w5okl/image/upload/v1735275419/772bded9-7c73-45c5-92f0-59139706ee58_vor9io.jpg",
    caption: "Ryan licks fingers as he eats his favourite food.",
  },
  {
    src: "https://res.cloudinary.com/dey9w5okl/image/upload/v1735275419/08c52041-ca45-4882-abdd-63d540c9d6a7_mapkbx.jpg",
    caption: "Ben slurps soup making a loud noise.",
  },
  {
    src: "https://res.cloudinary.com/dey9w5okl/image/upload/v1735275418/e4b1c6e3-fa6e-405c-840f-9e8d52afdfa0_bx0cin.jpg",
    caption: "Zain is seated upright on the table.",
  },
  {
    src: "https://res.cloudinary.com/dey9w5okl/image/upload/v1735275417/63c2d758-dac1-4633-91a7-c75f09b8feea_weuoed.jpg",
    caption: "Frank makes a fuss as he does not like the food.",
  },
  {
    src: "https://res.cloudinary.com/dey9w5okl/image/upload/v1735275414/ddda8707-0e51-46a4-8d42-d62eb38d1dfe_vvbofx.jpg",
    caption: "Roma eats with the spoon in the serving dish.",
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
          <li>Sit upright at the dinner table.</li>
          <li>Avoid commenting on the food.</li>
          <li>Request items to be passed to you instead of leaning over the table.</li>
          <li>Do not lick your fingers.</li>
          <li>Avoid making loud noises while chewing or drinking.</li>
          <li>Do not talk with a mouthful.</li>
          <li>Use a separate serving utensil, not the spoon you are eating with, to serve food.</li>
          <li>Do not slurp or make a noise while drinking.</li>
          <li>Wait until everyone has finished eating before getting up from the table.</li>
        </ul>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-5 p-4 max-w-5xl">
      <div className="relative w-full overflow-hidden rounded-lg shadow-xl">
        <div className="relative h-[40rem] flex items-center justify-center bg-gray-100">
          {images.map((image, index) => (
            <div
              key={index}
              className={`
                absolute top-0 left-0 w-full h-full
                transition-opacity duration-700 ease-in-out flex flex-col items-center justify-center
                ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}
              `}
            >
              <img
                src={image.src}
                className="max-h-[32rem] object-contain rounded-md"
                alt={`Image ${index + 1}`}
              />
              <div className="mt-4 px-6 text-center">
                <p className="text-lg text-gray-800 font-medium">
                  {image.caption}
                </p>
                <p className="text-md text-gray-700 mt-2 italic">
                  Is it an example of correct table manners?
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
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
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
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
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
