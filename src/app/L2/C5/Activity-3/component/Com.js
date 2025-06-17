"use client";

import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";

const allItems = [
  "Clean up the dinner table.",
  "Tidy your room.",
  "Keep crayons in a box.",
  "Turn off the lights.",
  "Apologize for mistakes.",
  "Following instructions.",
  "Delay work and rush through it.",
  "Left the fridge door open.",
  "Lost pencils, erasers often.",
  "Break toy.",
  "Forget to complete work.",
  "Do not tidy up the mess.",
];

const correctResponsible = [
  "Clean up the dinner table.",
  "Tidy your room.",
  "Keep crayons in a box.",
  "Turn off the lights.",
  "Apologize for mistakes.",
  "Following instructions.",
].map((text) => text.trim().toLowerCase().replace(/[^\w\s]/g, ""));

const correctNeedsEffort = [
  "Delay work and rush through it.",
  "Left the fridge door open.",
  "Lost pencils, erasers often.",
  "Break toy.",
  "Forget to complete work.",
  "Do not tidy up the mess.",
].map((text) => text.trim().toLowerCase().replace(/[^\w\s]/g, ""));

function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export default function ClassifyTilesGame() {
  const [tiles, setTiles] = useState([]);
  const [responsibleTiles, setResponsibleTiles] = useState([]);
  const [needsEffortTiles, setNeedsEffortTiles] = useState([]);
  const [showSubmit, setShowSubmit] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [err, setErr] = useState(false)

  useEffect(() => {
    const shuffledItems = shuffleArray(allItems);
    setTiles(shuffledItems.map((item, index) => ({ id: `tile-${index}`, text: item })));
  }, []);

  useEffect(() => {
    const totalTilesInCategories = responsibleTiles.length + needsEffortTiles.length;
    setShowSubmit(totalTilesInCategories === allItems.length);
  }, [responsibleTiles, needsEffortTiles]);

  const handleDragStart = (e, tileId) => {
    e.dataTransfer.setData("text/plain", tileId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, category) => {
    e.preventDefault();
    const tileId = e.dataTransfer.getData("text/plain");
    const draggedTile = tiles.find((t) => t.id === tileId) || responsibleTiles.find((t) => t.id === tileId) || needsEffortTiles.find((t) => t.id === tileId);

    if (!draggedTile) return;

    setErr(false)
    setTiles((prev) => prev.filter((t) => t.id !== tileId));
    setResponsibleTiles((prev) => prev.filter((t) => t.id !== tileId));
    setNeedsEffortTiles((prev) => prev.filter((t) => t.id !== tileId));

    if (category === "responsible") {
      setResponsibleTiles((prev) => [...prev, draggedTile]);
    } else if (category === "needsEffort") {
      setNeedsEffortTiles((prev) => [...prev, draggedTile]);
    } else if (category === "tilesContainer") {
      setTiles((prev) => [...prev, draggedTile]);
    }
  };

  const normalizeText = (text) => text.trim().toLowerCase().replace(/[^\w\s]/g, "");

  const arraysMatch = (arr1, arr2) => {
    const set1 = new Set(arr1.map(normalizeText));
    const set2 = new Set(arr2);
    return set1.size === set2.size && [...set1].every((value) => set2.has(value));
  };

  const validate = () => {
    const currentResponsibleTexts = responsibleTiles.map((tile) => tile.text);
    const currentNeedsEffortTexts = needsEffortTiles.map((tile) => tile.text);

    const isResponsibleCorrect = arraysMatch(currentResponsibleTexts, correctResponsible);
    const isNeedsEffortCorrect = arraysMatch(currentNeedsEffortTexts, correctNeedsEffort);

    if (isResponsibleCorrect && isNeedsEffortCorrect) {
      setModalMessage("Congratulations! You classified all tiles correctly!");
      setShowModal(true);
      // On correct answer, keep the state, but allow them to click OK
    } else {
      setModalMessage("Try Again! Some tiles are incorrectly classified.");
      setErr(true)
      // On incorrect answer, close modal and keep current state
    }
    
  };

  const closeModal = () => {
    setShowModal(false);
    // Only reset the game if the answer was correct.
    // If incorrect, the tiles remain in their current positions.
    if (modalMessage === "Congratulations! You classified all tiles correctly!") {
      setResponsibleTiles([]);
      setNeedsEffortTiles([]);
      const shuffledItems = shuffleArray(allItems);
      setTiles(shuffledItems.map((item, index) => ({ id: `tile-${index}`, text: item })));
      setShowSubmit(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 to-green-200 p-4 flex flex-col items-center justify-center font-sans">
      <div className="container bg-white/90 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-xl border border-teal-200 w-full text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-6 drop-shadow-sm">
          Classify the actions
        </h1>
        <p className="text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Drag and drop the actions into the appropriate category! Once all actions are placed, click <span className="font-bold">Submit</span>.
        </p>


        {err &&
          <p className="text-red-600 mb-[20px] text-xl">Try Again! Some actions are incorrectly classified.</p>
        }


        <div className="board grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            className="tiles flex flex-col items-center p-4 bg-gray-50 rounded-xl shadow-md border border-gray-200"
            onDrop={(e) => handleDrop(e, "tilesContainer")}
            onDragOver={handleDragOver}
          >
            <h2 className="text-xl font-bold text-gray-700 mb-4">Actions</h2>
            <div id="tilesContainer" className="tile-list flex flex-wrap gap-3 justify-center min-h-[150px] w-full">
              {tiles.map((tile) => (
                <div
                  key={tile.id}
                  id={tile.id}
                  className="tile bg-blue-500 text-white text-sm sm:text-base p-3 rounded-lg shadow-md cursor-grab active:cursor-grabbing hover:bg-blue-600 transition-colors duration-200"
                  draggable
                  onDragStart={(e) => handleDragStart(e, tile.id)}
                >
                  {tile.text}
                </div>
              ))}
            </div>
          </div>

          <div className="categories col-span-1 md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div
              className="category flex flex-col items-center p-4 bg-lime-100 rounded-xl shadow-md border-2 border-lime-300 min-h-[250px]"
              id="responsible"
              onDrop={(e) => handleDrop(e, "responsible")}
              onDragOver={handleDragOver}
            >
              <h2 className="text-xl font-bold text-green-800 mb-4">Completed with Responsibility</h2>
              <div className="flex flex-wrap gap-3 justify-center w-full">
                {responsibleTiles.map((tile) => (
                  <div
                    key={tile.id}
                    id={tile.id}
                    className="tile bg-blue-500 text-white text-sm sm:text-base p-3 rounded-lg shadow-md cursor-grab active:cursor-grabbing hover:bg-blue-600 transition-colors duration-200"
                    draggable
                    onDragStart={(e) => handleDragStart(e, tile.id)}
                  >
                    {tile.text}
                  </div>
                ))}
              </div>
            </div>
            <div
              className="category flex flex-col items-center p-4 bg-orange-100 rounded-xl shadow-md border-2 border-orange-300 min-h-[250px]"
              id="needsEffort"
              onDrop={(e) => handleDrop(e, "needsEffort")}
              onDragOver={handleDragOver}
            >
              <h2 className="text-xl font-bold text-red-800 mb-4">Need More Efforts</h2>
              <div className="flex flex-wrap gap-3 justify-center w-full">
                {needsEffortTiles.map((tile) => (
                  <div
                    key={tile.id}
                    id={tile.id}
                    className="tile bg-blue-500 text-white text-sm sm:text-base p-3 rounded-lg shadow-md cursor-grab active:cursor-grabbing hover:bg-blue-600 transition-colors duration-200"
                    draggable
                    onDragStart={(e) => handleDragStart(e, tile.id)}
                  >
                    {tile.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {showSubmit && (
          <button
            id="submitButton"
            onClick={validate}
            className="mt-8 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-10 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-400 text-lg"
          >
            Submit
          </button>
        )}
      </div>

      {showModal && (
        <>
          <Confetti
            width={typeof window !== "undefined" ? window.innerWidth : 0}
            height={typeof window !== "undefined" ? window.innerHeight : 0}
            numberOfPieces={5000}
            recycle={false}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
            <div className="bg-white bg-opacity-90 rounded-xl px-8 py-6 shadow-2xl animate-bounce animate-pulse text-center">
              <h2 className="text-5xl font-extrabold text-green-600 mb-2">🎉 Great Job!</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
}