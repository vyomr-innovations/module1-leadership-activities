"use client";

import React, { useState, useEffect } from "react";

const items = [
  {
    label: "Fork",
    url: "https://img.freepik.com/free-vector/realistic-steel-fork-isolated_1284-41736.jpg",
  },
  {
    label: "Spoon",
    url: "https://img.freepik.com/free-vector/realistic-steel-spoons-isolated_1284-41752.jpg",
  },
  {
    label: "Knives",
    url: "https://img.freepik.com/free-vector/steel-knives-isolated_1284-41797.jpg",
  },
  {
    label: "Table and Chairs",
    url: "https://img.freepik.com/free-vector/desk-with-four-chairs-isolated-white_1308-52194.jpg",
  },
  {
    label: "Plate",
    url: "https://img.freepik.com/free-vector/realistic-white-plate-isolated_1284-41743.jpg",
  },
  {
    label: "Glass",
    url: "https://img.freepik.com/free-photo/empty-drinking-glass-macro-shot_53876-33861.jpg?t=st=1735403669~exp=1735407269~hmac=0219a4741933b557ea8043c0a4f04513facfb463314a83dbe33b1155aa54ca60&w=360",
  },
  {
    label: "Napkin",
    url: "https://img.freepik.com/free-vector/white-kitchen-towel-fabric-napkin-tablecloth_107791-20028.jpg",
  },
  {
    label: "Mug",
    url: "https://img.freepik.com/free-vector/cup-mockup_1053-247.jpg",
  },
  {
    label: "Bowl",
    url: "https://img.freepik.com/free-vector/colorful-decorated-ceramic-bowl-illustration_1308-167233.jpg",
  },
];

const allPossibleLabels = items.map(item => item.label);

const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export default function Com() {
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [hiddenTiles, setHiddenTiles] = useState({});
  const [gameCompleted, setGameCompleted] = useState(false);
  const [shakeTile, setShakeTile] = useState(null);
  const [shuffledOptions, setShuffledOptions] = useState([]);

  useEffect(() => {
    if (currentItemIndex >= items.length) {
      setGameCompleted(true);
    } else {
      setShuffledOptions(shuffleArray(allPossibleLabels));
    }
  }, [currentItemIndex]);

  const handleTileClick = (clickedLabel) => {
    const correctLabel = items[currentItemIndex].label;

    if (clickedLabel === correctLabel) {
      setHiddenTiles((prev) => ({ ...prev, [correctLabel]: true }));
      setTimeout(() => {
        setCurrentItemIndex((prevIndex) => prevIndex + 1);
      }, 500);
    } else {
      setShakeTile(clickedLabel);
      setTimeout(() => setShakeTile(null), 500);
    }
  };

  const handleRestartGame = () => {
    setCurrentItemIndex(0);
    setHiddenTiles({});
    setGameCompleted(false);
    setShakeTile(null);
    setShuffledOptions(shuffleArray(allPossibleLabels));
  };

  // Guard against invalid index
  const currentImage = items[currentItemIndex];
  if (gameCompleted || !currentImage) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 text-center">
        <h2 className="text-3xl font-bold text-green-700 mb-4">
          Congratulations!
        </h2>
        <p className="text-2xl text-gray-800 mb-6">Activity Ended...</p>
        <button
          onClick={handleRestartGame}
          className="px-6 py-3 bg-blue-500 text-white rounded-md text-lg hover:bg-blue-600 transition-colors duration-300"
        >
          Play Again
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 p-4">
      <h1 className="text-2xl font-bold">What is this item called?</h1>
      <div className="w-full max-w-xl mt-5 text-center">
        <img
          src={currentImage.url}
          alt="Game Image"
          className="w-full h-auto max-h-80 object-contain border-2 border-gray-300 rounded-lg mb-4"
        />
        <div className="flex flex-wrap justify-center gap-2 mb-5">
          {shuffledOptions.map((label) => (
            <div
              key={label}
              onClick={() => handleTileClick(label)}
              className={`
                px-4 py-2 bg-orange-500 text-white rounded-md cursor-pointer text-xl
                transition-all duration-300 ease-in-out select-none
                ${hiddenTiles[label] ? "hidden" : "block"}
                ${shakeTile === label ? "bg-red-600 animate-shake" : ""}
              `}
              style={{
                animation: shakeTile === label ? "shake 0.5s" : "none",
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes shake {
          0% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          50% { transform: translateX(5px); }
          75% { transform: translateX(-5px); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
