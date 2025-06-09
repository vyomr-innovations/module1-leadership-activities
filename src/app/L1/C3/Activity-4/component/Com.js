"use client";

import React, { useState, useEffect } from "react";

const allTasksData = [
  { id: "task1", text: "Sunglasses", image: "🕶️" },
  { id: "task2", text: "Beach ball", image: "🏐" }, // Beach Ball emoji
  { id: "task3", text: "High heels", image: "👠" }, // High Heels emoji
  { id: "task4", text: "Party dress", image: "👗" }, // Dress emoji
  { id: "task5", text: "Shorts", image: "🩳" }, // Shorts emoji
  { id: "task6", text: "Cap", image: "🧢" }, // Billed Cap emoji
  { id: "task7", text: "Woollen clothes", image: "🧣" }, // Scarf emoji (representing woollen clothes)
  { id: "task8", text: "Beach toys", image: "🏖️" }, // Beach with Umbrella emoji (representing beach toys)
  { id: "task9", text: "Lego pieces", image: "🧱" }, // Brick emoji (representing Lego pieces)
];

// Array of allowed item IDs for the Beach backpack
const beachItemIds = [
  "task1", // Sunglasses
  "task2", // Beach ball
  "task5", // Shorts
  "task6", // Cap
  "task8", // Beach toys
];

const BeachBackpackGame = () => {
  const [items, setItems] = useState([]);
  const [resultMessage, setResultMessage] = useState(
    "Drag and drop each item into the Beach Backpack"
  );
  const [resultColor, setResultColor] = useState("text-gray-700");
  const [isBackpackHovered, setIsBackpackHovered] = useState(false);

  // Initialize items on component mount
  useEffect(() => {
    const initialItems = allTasksData.map((task) => ({
      ...task,
      location: "available",
    }));
    setItems(initialItems);
  }, []);

  // Use useEffect to run checkCompletion whenever 'items' state changes
  useEffect(() => {
    checkCompletion();
  }, [items]); // This dependency array ensures it runs after setItems updates 'items'

  // --- Drag and Drop Handlers ---

  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData("text/plain", taskId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (e.currentTarget.id === "Beach-items") {
      setIsBackpackHovered(true);
    }
  };

  const handleDragLeave = (e) => {
    if (e.currentTarget.id === "Beach-items") {
      setIsBackpackHovered(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsBackpackHovered(false);

    const draggedTaskId = e.dataTransfer.getData("text/plain");
    const targetQuadrantId = e.currentTarget.id;

    setItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.id === draggedTaskId) {
          if (targetQuadrantId === "Beach-items") {
            if (beachItemIds.includes(item.id)) {
              return { ...item, location: "backpack" };
            } else {
              return { ...item, location: "available" };
            }
          } else {
            // Dropped outside the backpack (e.g., back to tasks container)
            // Or if it was already in the backpack and dragged back to available
            return { ...item, location: "available" };
          }
        }
        return item;
      });
    });

    // Removed checkCompletion() from here. It will now be called by the useEffect.
  };

  // Function to check if all correct beach items are in the backpack
  const checkCompletion = () => {
    const itemsInBackpack = items.filter((item) => item.location === "backpack");
    const currentBackpackItemIds = itemsInBackpack.map((item) => item.id);

    // Check 1: Are all required beach items present in the backpack?
    const allRequiredItemsPresent = beachItemIds.every((requiredId) =>
      currentBackpackItemIds.includes(requiredId)
    );

    // Check 2: Are there ONLY correct items in the backpack? (No incorrect items)
    const noIncorrectItems = currentBackpackItemIds.every((idInBackpack) =>
      beachItemIds.includes(idInBackpack)
    );

    // Check 3: Does the backpack contain exactly the number of required items?
    // This handles cases where all correct items are present, but extra incorrect items might also be there.
    const correctCount = currentBackpackItemIds.length === beachItemIds.length;

    if (allRequiredItemsPresent && noIncorrectItems && correctCount) {
      setResultMessage("Great job! All beach items are correctly placed!");
      setResultColor("text-green-600 font-bold");
    } else {
      setResultMessage("Drag and drop each item into the Beach Backpack");
      setResultColor("text-gray-700");
    }
  };

  const availableTasks = items.filter((item) => item.location === "available");
  const backpackItems = items.filter((item) => item.location === "backpack");

  return (
    <div className="container min-h-screen flex flex-col items-center px-[20px] pt-[50px] bg-gradient-to-br from-blue-200 to-teal-300 rounded-lg shadow-2xl">
      <h1 className="text-5xl font-extrabold mb-8 text-white drop-shadow-lg">
        Beach Backpack
      </h1>

      <p className={`text-3xl text-center mb-8 ${resultColor}`}>
        {resultMessage}
      </p>

      <div id="game-container" className="flex flex-col md:flex-row gap-8 w-full items-center justify-center">
        {/* Tasks container (left side) */}
        <div
          id="tasks"
          className="w-full md:w-1/2 bg-white p-6 rounded-xl shadow-lg border-2 border-gray-200 flex flex-wrap justify-center gap-4 min-h-[200px]"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onDragLeave={handleDragLeave}
        >
          {availableTasks.length === 0 && backpackItems.length > 0 && resultColor !== "text-green-600 font-bold" && (
            <p className="text-gray-500 text-lg self-center">
              All items are in the backpack. Check if they are correct!
            </p>
          )}
          {availableTasks.length === 0 && backpackItems.length === 0 && (
            <p className="text-gray-500 text-lg self-center">
              All items are gone!
            </p>
          )}

          {availableTasks.map((task) => (
            <div
              key={task.id}
              id={task.id}
              className="task bg-indigo-100 text-indigo-800 font-semibold py-3 px-5 rounded-full shadow-md cursor-grab transition-all duration-200 ease-in-out hover:bg-indigo-200 hover:shadow-lg flex items-center space-x-2"
              draggable
              onDragStart={(e) => handleDragStart(e, task.id)}
            >
              {/* <img src={task.image} alt={task.text} className="w-8 h-8 rounded-full" /> */}
              <span className="text-[20px]">
                {task.image}
              </span>

              <span>{task.text}</span>
            </div>
          ))}
        </div>

        {/* Backpack Quadrant (right side) */}
        <div
          id="Beach-items"
          className={`quadrant w-full md:w-1/2 bg-white p-6 rounded-xl shadow-lg border-4 border-dashed transition-all duration-300 ease-in-out flex flex-col items-center justify-center min-h-[200px] ${isBackpackHovered ? "border-blue-500 bg-blue-50" : "border-gray-300"
            }`}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onDragLeave={handleDragLeave}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            🏖️ Beach Backpack 🎒
          </h2>
          {backpackItems.length === 0 ? (
            <p className="text-gray-500 text-lg">Drop items here!</p>
          ) : (
            <div className="flex flex-wrap justify-center gap-3">
              {backpackItems.map((task) => (
                <div
                  key={task.id}
                  id={task.id}
                  className="task bg-green-100 text-green-800 font-semibold py-2 px-4 rounded-full shadow-sm cursor-grab flex items-center space-x-2"
                  draggable
                  onDragStart={(e) => handleDragStart(e, task.id)}
                >
                  {/* <img src={task.image} alt={task.text} className="w-7 h-7 rounded-full" /> */}
                  <span className="text-[20px]">
                    {task.image}
                  </span>
                  <span>{task.text}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BeachBackpackGame;