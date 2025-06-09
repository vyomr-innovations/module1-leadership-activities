"use client"; 

import React, { useState } from "react";

const slideshowData = [
  {
    src: "https://res.cloudinary.com/dey9w5okl/image/upload/v1733826708/58056_pkzvio.jpg",
    text: "Ron forgot to close the refrigerator door.",
  },
  {
    src: "https://res.cloudinary.com/dey9w5okl/image/upload/v1733826707/2148937850_fq2srq.jpg",
    text: "Ben took his skateboard on the road.",
  },
  {
    src: "https://res.cloudinary.com/dey9w5okl/image/upload/v1733826708/2147693708_tqpvon.jpg",
    text: "Tera left her food uncovered on the table.",
  },
  {
    src: "https://img.freepik.com/free-photo/little-boy-bicycle-park_1303-22442.jpg?t=st=1735552364~exp=1735555964~hmac=f4e201fb7a404d998a1bba65cf59bdda457dbeadb93187ad5f6e55fd44d327b3&w=900",
    text: "Gary rides his bike without a helmet.",
  },
  {
    src: "https://res.cloudinary.com/dey9w5okl/image/upload/v1733826713/2148314164_ndwgtw.jpg",
    text: "Jack eats junk food and drinks soda every day.",
  },
  {
    src: "https://img.freepik.com/free-photo/close-up-little-girl-having-fun-home_23-2149117563.jpg?t=st=1735552556~exp=1735556156~hmac=f5f037493380cf51b465fe41b0bd1b6ab811dfeeb592ab858e5c4f8df4d7c46b&w=900",
    text: "Carol watches the screen the whole day on weekends.",
  },
  {
    src: "https://res.cloudinary.com/dey9w5okl/image/upload/v1733826706/a2f2cbbc-8517-458c-993f-3aa1e0fd2400_cigic5.jpg",
    text: "Vivian keeps used tissues in her backpack.",
  },
];

export default function WhatIfSlideshow() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    if (currentImageIndex < slideshowData.length - 1) {
      setCurrentImageIndex((prevIndex) => prevIndex + 1);
    } else {
      // Handle end of slideshow, if needed (e.g., reset, show "End" message)
      // For now, it will just stay on the last slide's content
    }
  };

  const isLastSlide = currentImageIndex === slideshowData.length - 1;
  const currentSlide = slideshowData[currentImageIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 p-4 sm:p-8 flex flex-col items-center justify-center">
      <div className="container bg-white/90 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-xl border border-indigo-200 w-full max-w-2xl text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-8 drop-shadow-sm">
          What will happen if?
        </h1>

        <div className="image-container mb-8">
          <img
            src={currentSlide.src}
            alt="Scenario Image"
            className="w-full max-h-[400px] object-contain rounded-lg shadow-md border border-gray-200 mx-auto transition-opacity duration-500 ease-in-out opacity-100"
          />
          <p className="text-lg sm:text-xl font-semibold text-gray-700 mt-6 leading-relaxed">
            {currentSlide.text}
          </p>
        </div>

        <div className="controls">
          {isLastSlide ? (
            <p className="text-xl sm:text-2xl font-bold text-green-700">
              End of the slideshow!
            </p>
          ) : (
            <button
              onClick={nextImage}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-10 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-400 text-lg"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}