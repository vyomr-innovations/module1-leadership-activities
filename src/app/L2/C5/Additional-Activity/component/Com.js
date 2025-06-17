"use client";

import React, { useState } from "react";

const carouselItems = [
  {
    src: "https://res.cloudinary.com/dey9w5okl/image/upload/v1734177905/DALL_E_2024-12-14_17.29.18_-_A_realistic_depiction_of_a_12-year-old_boy_washing_dishes_in_a_bright_and_cozy_kitchen._The_boy_has_short_brown_hair_wearing_a_striped_t-shirt_and_je_kgz2tv.webp",
    title: "Washing Dishes",
  },
  {
    src: "https://res.cloudinary.com/dey9w5okl/image/upload/v1734177905/DALL_E_2024-12-14_17.30.38_-_A_realistic_depiction_of_a_12-year-old_boy_feeding_pets_in_a_cozy_home_setting._The_boy_is_wearing_casual_clothing_with_a_cheerful_expression_as_he_gpyikj.webp",
    title: "Feeding the Pets",
  },
  {
    src: "https://res.cloudinary.com/dey9w5okl/image/upload/v1734177904/DALL_E_2024-12-14_17.33.59_-_A_12-year-old_boy_taking_out_the_trash_in_a_suburban_neighborhood._The_boy_is_wearing_a_casual_t-shirt_and_jeans_carrying_a_black_trash_bag_to_the_cu_ugztyx.webp",
    title: "Taking Out the Trash",
  },
  {
    src: "https://res.cloudinary.com/dey9w5okl/image/upload/v1734177905/DALL_E_2024-12-14_17.34.41_-_A_12-year-old_boy_cleaning_his_room._The_boy_is_tidying_up_a_cluttered_bedroom_placing_toys_and_books_onto_a_shelf_while_wearing_a_casual_t-shirt_and_kdv2aw.webp",
    title: "Cleaning Your Room",
  },
];

export default function ImpactCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  const goToPrevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? carouselItems.length - 1 : prev - 1));
  };

  const goToNextSlide = () => {
    setActiveIndex((prev) => (prev === carouselItems.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-teal-200 px-4 flex flex-col items-center justify-center font-sans">
      <div className="container bg-white/90 backdrop-blur-sm p-6 sm:p-4 rounded-2xl shadow-xl border border-indigo-200 w-full text-center">
        <h1 className="text-2xl sm:text-2xl font-extrabold text-gray-800 mb-2 drop-shadow-sm">
          Positive and Negative Impact
        </h1>

        {/* Instructions */}
        <p className="text-gray-700 text-md sm:text-lg mb-4">
          Think of the impact of the actions if done correctly or not. Complete the statements:
        </p>

        <ul className="text-left text-gray-800 font-medium bg-white/80 rounded-lg p-4 mb-3 border border-indigo-100 shadow-sm max-w-2xl mx-auto list-disc pl-6 space-y-2">
          <li>If done well, ___________</li>
          <li>If not done well, ___________</li>
        </ul>

        {/* Carousel */}
        <div className="relative w-full max-w-2xl mx-auto rounded-lg overflow-hidden shadow-lg border border-gray-200">
          <div className="relative h-96 sm:h-[450px] md:h-[500px]">
            {carouselItems.map((item, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  index === activeIndex ? "opacity-100" : "opacity-0"
                }`}
              >
                <img
                  src={item.src}
                  alt={`Image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Carousel Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
            {carouselItems.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "bg-white shadow-md scale-110"
                    : "bg-gray-400 hover:bg-white/70"
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Carousel Controls */}
          <button
            className="shadow-[10px_10px_30px_15px_rgba(255,255,255,0.4)] hover:bg-gray-500 cursor-pointer absolute top-1/2 left-4 -translate-y-1/2 bg-black bg-opacity-40 hover:bg-opacity-60 text-white p-3 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white"
            onClick={goToPrevSlide}
            aria-label="Previous slide"
          >
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
            className="shadow-[10px_10px_30px_15px_rgba(255,255,255,0.4)] hover:bg-gray-500 cursor-pointer absolute top-1/2 right-4 -translate-y-1/2 bg-black bg-opacity-40 hover:bg-opacity-60 text-white p-3 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white"
            onClick={goToNextSlide}
            aria-label="Next slide"
          >
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

        {/* Title Below the Slider */}
        <div className="mt-4 p-4 bg-white rounded-lg shadow-md border border-gray-200">
          <h5 className="text-xl sm:text-2xl font-bold text-gray-800">
            {carouselItems[activeIndex].title}
          </h5>
        </div>
      </div>
    </div>
  );
}
