"use client";

import React, { useState, useEffect } from "react";

const images = [
  {
    src: "https://res.cloudinary.com/dey9w5okl/image/upload/v1735400052/9f8ca3b7-fd61-4eaa-9d10-fe25fb40c5f0_vf0dd5.jpg",
    caption: "Ron uses a napkin to wipe mouth after eating spaghetti.",
  },
  {
    src: "https://res.cloudinary.com/dey9w5okl/image/upload/v1735400060/0de3fc7c-31ce-4f4e-80df-f4ad2cb7b36d_wyetqe.jpg",
    caption: "Anna takes big bites from the far end of the plate.",
  },
  {
    src: "https://res.cloudinary.com/dey9w5okl/image/upload/v1735215877/07c54e7d-7723-4212-ae8b-25cc1ff2b9aa_u1aw4a.jpg",
    caption: "Garry talks with food in his mouth.",
  },
  {
    src: "https://res.cloudinary.com/dey9w5okl/image/upload/v1735296847/6954e856-f7b6-43ce-95aa-cc2fe7c8404d_tlirxk.jpg",
    caption:
      "Smith waits for everyone at the table to be served before starting to eat.",
  },
  {
    src: "https://res.cloudinary.com/dey9w5okl/image/upload/v1735215876/06c740bf-76c3-4e89-8075-15af38df4cea_fnscli.jpg",
    caption:
      "Chloe reaches across the table to grab the salt instead of asking for it to be passed.",
  },
  {
    src: "https://res.cloudinary.com/dey9w5okl/image/upload/v1735400298/6606dd38-0c72-4257-98d6-17298b652eb7_uiyo8e.jpg",
    caption: `Debora says "please" and "thank you" when her meal is served.`,
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
    caption: "Hank sits upright at the dining table.",
  },
  {
    src: "https://img.freepik.com/free-photo/little-girl-playing-with-food-while-eating_23-2148281930.jpg?t=st=1735656135~exp=1735659735~hmac=22845deb4655bc4c31c5ff37375f5aaf8895e5306a05e95a2e19967f23f1c1d0&w=900",
    caption:
      "Kiale takes a bite from the fork while holding it like a shovel.",
  },
  {
    src: "https://res.cloudinary.com/dey9w5okl/image/upload/v1735275417/63c2d758-dac1-4633-91a7-c75f09b8feea_weuoed.jpg",
    caption: "Frank makes a fuss as he does not like the food.",
  },
  {
    src: "https://res.cloudinary.com/dey9w5okl/image/upload/v1735275423/DALL_E_2024-12-26_20.01.51_-_A_10-year-old_boy_sitting_at_a_dining_table_asking_politely_for_a_salt_shaker_to_be_passed_to_him_instead_of_leaning_forward_to_reach_it._He_has_a_f_yjdcfu.webp",
    caption: "Sam asks for salt to be passed at the table.",
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
          <li>Sit upright at the dinner table, do not slouch.</li>
          <li>Take small bites of food from the front of the plate.</li>
          <li>Clean your mouth with a napkin.</li>
          <li>Do not talk with food in your mouth.</li>
          <li>Do not comment on the food.</li>
          <li>Wait for others to be served before beginning.</li>
          <li>Do not make loud noises while chewing or drinking.</li>
          <li>Do not lick your fingers.</li>
          <li>Cover your mouth,while burping.</li>
          <li>Do not slurp or make a noise while drinking.</li>
          <li>Request for food to be passed over.</li>
          <li>Be polite and say thank you when food is served.</li>
          <li>Wait until everyone is finished eating before getting up from the table.</li>
        </ul>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-5 p-4 max-w-5xl">
      <div className="relative w-full overflow-hidden rounded-lg shadow-xl">
        <div className="relative h-[40rem] flex items-center justify-center">
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
                <p className="text-lg">{image.caption}</p>
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