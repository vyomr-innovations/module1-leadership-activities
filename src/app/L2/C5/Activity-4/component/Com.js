"use client";

import React, { useState } from "react";

const carouselItems = [
  {
    src: "https://res.cloudinary.com/dey9w5okl/image/upload/v1733900350/DALL_E_2024-12-11_12.20.25_-_A_river_with_plastic_bags_bottles_and_wrappers_floating_in_the_water._The_water_appears_murky_with_visible_pollution_in_the_form_of_scattered_plast_npbld1.webp",
    title: "Pollution in the River",
  },
  {
    src: "https://res.cloudinary.com/dey9w5okl/image/upload/v1733900350/DALL_E_2024-12-11_12.20.59_-_A_large_tree_with_its_thick_trunk_and_lush_green_foliage_standing_tall_in_the_center_of_the_image._At_its_base_there_are_piles_of_plastic_bottles_c_vgizfs.webp",
    title: "Litter Around the Tree",
  },
  {
    src: "https://res.cloudinary.com/dey9w5okl/image/upload/v1733900350/openart-image_swdJ3vuP_1733899905491_raw_jmcsja.jpg",
    title: "Trash on the Streets",
  },
  {
    src: "https://res.cloudinary.com/dey9w5okl/image/upload/v1733900350/openart-image_95IEXuPH_1733900119166_raw_h5pmkf.jpg",
    title: "Animals Getting Hurt",
  },
  {
    src: "https://res.cloudinary.com/dey9w5okl/image/upload/v1733900354/DALL_E_2024-12-11_12.19.49_-_A_park_with_a_scene_showing_litter_and_neglect._The_ground_is_scattered_with_trash_such_as_plastic_wrappers_cans_and_food_containers._A_plastic_bott_ujqxlq.webp",
    title: "Litter in Park",
  },
];

const questionsMap = {
  0: [
    "What do we see?",
    "How does the trash in the river affect marine life?",
    "What can we do to keep rivers clean and fresh?",
  ],
  1: [
    "What do we see?",
    "How does the trash affect the tree, the soil, and the species around the tree?",
    "What can we do to help protect trees?",
  ],
  2: [
    "What do we see?",
    "How can we sort trash?",
    "What do we do when a bin is full?",
  ],
  3: ["What is happening to the creature in the image?"],
  4: [
    "How does plastic negatively impact nature?",
    "What can we do to prevent inappropriate behavior towards the natural environment?",
  ],
};

export default function EnvironmentalAwarenessCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const goToSlide = (index) => setActiveIndex(index);

  const goToPrevSlide = () =>
    setActiveIndex((prev) =>
      prev === 0 ? carouselItems.length - 1 : prev - 1
    );

  const goToNextSlide = () =>
    setActiveIndex((prev) =>
      prev === carouselItems.length - 1 ? 0 : prev + 1
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-200 flex flex-col items-center justify-center font-sans">
      <div className="container bg-white/90 backdrop-blur-sm p-6 sm:p-2 rounded-2xl shadow-xl border border-blue-200 w-full text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-4 drop-shadow-sm">
          Environmental Impact
        </h1>

        <div className="relative w-full rounded-lg overflow-hidden shadow-lg border border-gray-200">
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
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
            {carouselItems.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === activeIndex ? "bg-white" : "bg-gray-400"
                } focus:outline-none focus:ring-2 focus:ring-white`}
                onClick={() => goToSlide(index)}
              ></button>
            ))}
          </div>

          <button
            className="absolute top-1/2 left-4 -translate-y-1/2 bg-black hover:bg-gray-700 cursor-pointer border-5 border-white bg-opacity-40 hover:bg-opacity-60 text-white p-3 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white"
            onClick={goToPrevSlide}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            className="absolute top-1/2 right-4 -translate-y-1/2 bg-black hover:bg-gray-700 cursor-pointer border-5 border-white bg-opacity-40 hover:bg-opacity-60 text-white p-3 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white"
            onClick={goToNextSlide}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Title and Questions */}
        <div className="mt-4 p-4 bg-white rounded-lg shadow-md border border-gray-200 text-left">
          <h5 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
            {carouselItems[activeIndex].title}
          </h5>
          <ul className="list-disc list-inside space-y-1 text-gray-700 text-base sm:text-lg">
            {questionsMap[activeIndex].map((q, i) => (
              <li key={i}>{q}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
