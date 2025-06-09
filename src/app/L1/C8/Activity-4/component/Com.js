"use client";

import React, { useState, useEffect } from "react";

const sets = [
  {
    images: [
      {
        src: "https://img.freepik.com/free-photo/front-view-golden-fork-white-background_179666-17255.jpg",
        odd: false,
      },
      {
        src: "https://img.freepik.com/free-photo/top-view-empty-plate-pinked-brown-rustic-wooden-wood-plate_140725-34254.jpg",
        odd: false,
      },
      {
        src: "https://img.freepik.com/free-photo/front-view-golden-spoon-white-background_179666-17260.jpg",
        odd: false,
      },
      {
        src: "https://img.freepik.com/free-photo/green-easter-car-with-red-egg_23-2149301295.jpg",
        odd: true,
      },
    ],
  },
  {
    images: [
      {
        src: "https://img.freepik.com/free-photo/front-view-golden-fork-white-background_179666-17255.jpg",
        odd: false,
      },
      {
        src: "https://img.freepik.com/free-photo/detailed-soccer-ball-football-icon-isolated_268835-1351.jpg",
        odd: true,
      },
      {
        src: "https://img.freepik.com/free-photo/white-cup-saucer-isolated-white-background_169016-26889.jpg",
        odd: false,
      },
      {
        src: "https://img.freepik.com/free-photo/kitchen-cloth-wood-table_74190-7686.jpg",
        odd: false,
      },
    ],
  },
  {
    images: [
      {
        src: "https://img.freepik.com/free-photo/top-view-empty-plate-pinked-brown-rustic-wooden-wood-plate_140725-34254.jpg",
        odd: false,
      },
      {
        src: "https://img.freepik.com/free-photo/white-cup-saucer-isolated-white-background_169016-26889.jpg",
        odd: false,
      },
      {
        src: "https://img.freepik.com/free-photo/close-up-sustainable-straw-alternatives_23-2149165699.jpg",
        odd: false,
      },
      {
        src: "https://img.freepik.com/free-photo/technology-hologram-illustrated_23-2151877749.jpg?t=st=1735403869~exp=1735407469~hmac=4dbcfbd819589d54955ce39531325a7fdd75c0e9565efb810a2584922abcc78a&w=996",
        odd: true,
      },
    ],
  },
  {
    images: [
      {
        src: "https://img.freepik.com/free-photo/front-view-golden-spoon-white-background_179666-17260.jpg",
        odd: false,
      },
      {
        src: "https://img.freepik.com/free-photo/front-view-golden-knife-white-background_179666-17258.jpg",
        odd: false,
      },
      {
        src: "https://img.freepik.com/free-photo/empty-wooden-bowl-isolated-white-background_123827-19393.jpg",
        odd: false,
      },
      {
        src: "https://img.freepik.com/free-photo/straw-hat-man_1203-7257.jpg",
        odd: true,
      },
    ],
  },
  {
    images: [
      {
        src: "https://img.freepik.com/free-photo/baby-shoes_1203-6997.jpg",
        odd: true,
      },
      {
        src: "https://img.freepik.com/free-photo/front-view-golden-fork-white-background_179666-17255.jpg",
        odd: false,
      },
      {
        src: "https://img.freepik.com/free-photo/front-view-golden-spoon-white-background_179666-17260.jpg",
        odd: false,
      },
      {
        src: "https://img.freepik.com/free-photo/kitchen-cloth-wood-table_74190-7686.jpg",
        odd: false,
      },
    ],
  },
  {
    images: [
      {
        src: "https://img.freepik.com/free-photo/white-cup-saucer-isolated-white-background_169016-26889.jpg",
        odd: false,
      },
      {
        src: "https://img.freepik.com/free-photo/top-view-empty-plate-pinked-brown-rustic-wooden-wood-plate_140725-34254.jpg",
        odd: false,
      },
      {
        src: "https://img.freepik.com/free-photo/blank-phone-screen-purple-background_53876-143196.jpg",
        odd: true,
      },
      {
        src: "https://img.freepik.com/free-photo/front-view-golden-spoon-white-background_179666-17260.jpg",
        odd: false,
      },
    ],
  },
];

export default function Com() {
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [showNextButton, setShowNextButton] = useState(false);
  const [shakeCardIndex, setShakeCardIndex] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const handleCardClick = (isOdd, index) => {
    if (isOdd) {
      setShowNextButton(true);
    } else {
      setShakeCardIndex(index);
      setTimeout(() => setShakeCardIndex(null), 300);
    }
  };

  const handleNextButtonClick = () => {
    if (currentSetIndex < sets.length - 1) {
      setCurrentSetIndex(currentSetIndex + 1);
      setShowNextButton(false);
    } else {
      setGameOver(true);
    }
  };

  const handlePlayAgain = () => {
    setCurrentSetIndex(0);
    setShowNextButton(false);
    setShakeCardIndex(null);
    setGameOver(false);
  };

  if (gameOver) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-blue-50 font-sans p-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Game Over</h1>
        <p className="text-2xl text-gray-700 mb-8">Activity Ended...</p>
        <button
          onClick={handlePlayAgain}
          className="px-6 py-3 text-lg bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-700 transition-colors duration-200"
        >
          Play Again
        </button>
      </div>
    );
  }

  const currentImages = sets[currentSetIndex].images;

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-blue-50 font-sans p-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Odd One Out</h1>
      <div className="flex justify-center items-center gap-4 mt-5">
        {currentImages.map((image, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(image.odd, index)}
            className={`
              w-48 h-48 bg-white border-2 border-gray-300 rounded-lg flex
              justify-center items-center cursor-pointer transition-transform duration-200
              hover:scale-105
              ${shakeCardIndex === index ? 'shake' : ''}
            `}
          >
            <img src={image.src} alt={`Item ${index}`} className="w-44 h-44 object-cover" />
          </div>
        ))}
      </div>
      {showNextButton && (
        <button
          onClick={handleNextButtonClick}
          className="mt-6 px-6 py-3 text-lg bg-green-500 text-white border-none rounded-md cursor-pointer hover:bg-green-600 transition-colors duration-200"
        >
          Next
        </button>
      )}

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          50% { transform: translateX(5px); }
          75% { transform: translateX(-5px); }
        }
        .shake {
          animation: shake 0.3s;
        }
      `}</style>
    </div>
  );
}