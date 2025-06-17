"use client";

import React, { useState, useEffect } from "react";

const images = [
  {
    label: "Breakfast",
    url: "https://img.freepik.com/free-vector/realistic-meal-background_52683-2970.jpg",
  },
  {
    label: "Lunch/Dinner",
    url: "https://img.freepik.com/free-vector/top-view-modern-restaurant-table-with-flat-design_23-2147919564.jpg",
  },
  {
    label: "Snacks",
    url: "https://img.freepik.com/free-vector/croissants-comfort-food-illustration_23-2148511766.jpg",
  },
  {
    label: "Picnic Table Setting",
    url: "https://img.freepik.com/free-vector/hamper-with-grape-milk-bottle-with-orange-juice_24640-46513.jpg",
  },
];

const allLabels = Array.from(new Set(images.map((img) => img.label)));

export default function Com() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [dropzoneMessage, setDropzoneMessage] = useState("Drag the correct label here");
  const [dropzoneBgColor, setDropzoneBgColor] = useState("bg-white");
  const [isDragOver, setIsDragOver] = useState(false);
  const [hiddenTiles, setHiddenTiles] = useState(new Set());
  const [gameCompleted, setGameCompleted] = useState(false);

  useEffect(() => {
    if (currentImageIndex >= images.length) {
      setGameCompleted(true);
      setDropzoneMessage("Congratulations! You've completed the game!");
      setDropzoneBgColor("bg-green-200");
    } else {
      setDropzoneMessage("Drag the correct label here");
      setDropzoneBgColor("bg-white");
    }
  }, [currentImageIndex]);

  const handleDragStart = (e, label) => {
    e.dataTransfer.setData("text/plain", label);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);

    const droppedLabel = e.dataTransfer.getData("text/plain");
    const correctLabel = images[currentImageIndex]?.label;

    if (droppedLabel === correctLabel) {
      setDropzoneMessage("Correct! Moving to the next item...");
      setDropzoneBgColor("bg-green-200");
      setHiddenTiles((prev) => new Set(prev).add(droppedLabel));

      setTimeout(() => {
        setCurrentImageIndex((prev) => prev + 1);
      }, 1000);
    } else {
      setDropzoneMessage("Try again!");
      setDropzoneBgColor("bg-red-200");
      setTimeout(() => {
        setDropzoneMessage("Drag the correct label here");
        setDropzoneBgColor("bg-white");
      }, 1000);
    }
  };

  const handlePlayAgain = () => {
    setCurrentImageIndex(0);
    setDropzoneMessage("Drag the correct label here");
    setDropzoneBgColor("bg-white");
    setIsDragOver(false);
    setHiddenTiles(new Set());
    setGameCompleted(false);
  };

  const currentImage = images[currentImageIndex];

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 p-4">
      <h1 className="text-2xl font-bold">Identify the type of meal from table settings</h1>
      <div className="w-full max-w-xl mt-5 text-center">
        {gameCompleted ? (
          <div className="text-2xl font-bold p-8 bg-green-100 rounded-lg shadow-md">
            <p className="mb-4">{dropzoneMessage}</p>
            <button
              onClick={handlePlayAgain}
              className="px-6 py-3 bg-blue-500 text-white rounded-md text-lg hover:bg-blue-600 transition-colors duration-300"
            >
              Play Again
            </button>
          </div>
        ) : (
          <>
            {currentImage && (
              <img
                src={currentImage.url}
                alt="Game Image"
                className="w-3/5 h-auto border-2 border-gray-300 rounded-lg mb-4 mx-auto"
              />
            )}

            <div className="flex justify-center gap-2 mb-5">
              {allLabels.map((label) => (
                <div
                  key={label}
                  draggable="true"
                  onDragStart={(e) => handleDragStart(e, label)}
                  className={`
                    px-4 py-2 bg-orange-200 border border-orange-300 rounded-md
                    cursor-grab text-base
                    hover:bg-orange-300 transition-colors
                    ${hiddenTiles.has(label) ? "hidden" : "block"}
                  `}
                >
                  {label}
                </div>
              ))}
            </div>

            <div
              id="dropzone"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`
                w-full p-5 border-2 border-dashed border-gray-400 rounded-lg
                min-h-10 flex items-center justify-center text-gray-700
                ${dropzoneBgColor}
                ${isDragOver ? "bg-blue-100 border-blue-400" : ""}
              `}
            >
              {dropzoneMessage}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
