"use client";

import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";

const allTasksData = [
  { id: "task1", text: "Sunglasses", image: "🕶️" },
  { id: "task2", text: "Beach ball", image: "🏐" },
  { id: "task3", text: "High heels", image: "👠" },
  { id: "task4", text: "Party dress", image: "👗" },
  { id: "task5", text: "Shorts", image: "🩳" },
  { id: "task6", text: "Cap", image: "🧢" },
  { id: "task7", text: "Woollen clothes", image: "🧣" },
  { id: "task8", text: "Beach toys", image: "🏖️" },
  { id: "task9", text: "Lego pieces", image: "🧱" },
];

const beachItemIds = [
  "task1", "task2", "task5", "task6", "task8"
];

const BeachBackpackGame = () => {
  const [items, setItems] = useState([]);
  const [isBackpackHovered, setIsBackpackHovered] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const initialItems = allTasksData.map((task) => ({
      ...task,
      location: "available",
    }));
    setItems(initialItems);
  }, []);

  useEffect(() => {
    checkCompletion();
  }, [items]);

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

    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === draggedTaskId) {
          if (targetQuadrantId === "Beach-items") {
            if (beachItemIds.includes(item.id)) {
              return { ...item, location: "backpack" };
            } else {
              return { ...item, location: "available" };
            }
          } else {
            return { ...item, location: "available" };
          }
        }
        return item;
      })
    );
  };

  const checkCompletion = () => {
    const itemsInBackpack = items.filter((item) => item.location === "backpack");
    const currentBackpackItemIds = itemsInBackpack.map((item) => item.id);

    const allRequiredItemsPresent = beachItemIds.every((requiredId) =>
      currentBackpackItemIds.includes(requiredId)
    );
    const noIncorrectItems = currentBackpackItemIds.every((id) =>
      beachItemIds.includes(id)
    );
    const correctCount = currentBackpackItemIds.length === beachItemIds.length;

    if (allRequiredItemsPresent && noIncorrectItems && correctCount) {
      if (!isCompleted) {
        setIsCompleted(true);
        setShowConfetti(true);

        setTimeout(() => {
          setShowConfetti(false);
        }, 10000); // Hide confetti after 10 seconds
      }
    } else {
      if (isCompleted) {
        setIsCompleted(false);
        setShowConfetti(false);
      }
    }
  };

  const availableTasks = items.filter((item) => item.location === "available");
  const backpackItems = items.filter((item) => item.location === "backpack");

  return (
    <div className="container min-h-screen flex flex-col items-center px-[20px] pt-[50px] bg-gradient-to-br from-blue-200 to-teal-300 rounded-lg shadow-2xl relative">
      {/* 🎊 Confetti & Celebration Message */}
      {showConfetti && (
        <>
          <Confetti
            width={typeof window !== "undefined" ? window.innerWidth : 0}
            height={typeof window !== "undefined" ? window.innerHeight : 0}
            numberOfPieces={1300}
            recycle={false}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
            <div className="bg-white bg-opacity-90 rounded-xl px-8 py-6 shadow-2xl animate-bounce animate-pulse text-center">
              <h2 className="text-5xl font-extrabold text-green-600 mb-2">🎉 You did it!</h2>
              <p className="text-xl text-gray-700">All beach items are packed perfectly!</p>
            </div>
          </div>
        </>
      )}

      <h1 className="text-5xl font-extrabold mb-8 text-white drop-shadow-lg">
        Beach Backpack
      </h1>

      <p className="text-3xl text-center mb-8 text-gray-700">
        Drag and drop each item into the Beach Backpack
      </p>

      <div className="flex flex-col md:flex-row gap-8 w-full items-center justify-center">
        {/* Available Items */}
        <div
          id="tasks"
          className="w-full md:w-1/2 bg-white p-6 rounded-xl shadow-lg border-2 border-gray-200 flex flex-wrap justify-center gap-4 min-h-[200px]"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onDragLeave={handleDragLeave}
        >
          {availableTasks.length === 0 && backpackItems.length > 0 && !isCompleted && (
            <p className="text-gray-500 text-lg self-center">
              All items are in the backpack. Check if they are correct!
            </p>
          )}
          {availableTasks.length === 0 && backpackItems.length === 0 && (
            <p className="text-gray-500 text-lg self-center">All items are gone!</p>
          )}
          {availableTasks.map((task) => (
            <div
              key={task.id}
              id={task.id}
              className="task bg-indigo-100 text-indigo-800 font-semibold py-3 px-5 rounded-full shadow-md cursor-grab hover:bg-indigo-200 hover:shadow-lg flex items-center space-x-2"
              draggable
              onDragStart={(e) => handleDragStart(e, task.id)}
            >
              <span className="text-[20px]">{task.image}</span>
              <span>{task.text}</span>
            </div>
          ))}
        </div>

        {/* Backpack Area */}
        <div
          id="Beach-items"
          className={`quadrant w-full md:w-1/2 bg-white p-6 rounded-xl shadow-lg border-4 border-dashed flex flex-col items-center justify-center min-h-[200px] transition-all duration-300 ${
            isBackpackHovered ? "border-blue-500 bg-blue-50" : "border-gray-300"
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
                  className="task bg-green-100 text-green-800 font-semibold py-2 px-4 rounded-full shadow-sm cursor-grab flex items-center space-x-2"
                  draggable
                  onDragStart={(e) => handleDragStart(e, task.id)}
                >
                  <span className="text-[20px]">{task.image}</span>
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
