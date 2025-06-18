"use client"; 
import React, { useState, useEffect } from "react";
import AlarmClock from '../assets/alarmClock.png'
import BathTub from '../assets/bathTub.png'
import BrushTeeth from '../assets/brushTeeth.png'
import Pajamas from '../assets/pajamas.png'
import ReadStories from '../assets/readStories.png'
import Sleep from '../assets/sleep.png'
import Image from 'next/image';

const tasks = [
  {
    text: "Wakeup",
    image: "https://img.icons8.com/ios/50/000000/alarm-clock.png",
  },
  {
    text: "Brush Teeth",
    image: "https://img.icons8.com/ios/50/000000/toothbrush.png",
  },
  {
    text: "Eat Breakfast",
    image: "https://img.icons8.com/ios/50/000000/meal.png",
  },
  {
    text: "Get Dressed",
    image: "https://img.icons8.com/ios/50/000000/clothes.png",
  },
  {
    text: "Put on Shoes",
    image: "https://img.icons8.com/ios/50/000000/sneakers.png",
  },
  {
    text: "Check Backpack",
    image: "https://img.icons8.com/ios/50/000000/backpack.png",
  },
  {
    text: "Go to School",
    image: "https://img.icons8.com/ios/50/000000/school.png",
  },
];

const correctOrder = [
  "Wakeup",
  "Brush Teeth",
  "Eat Breakfast",
  "Get Dressed",
  "Put on Shoes",
  "Check Backpack",
  "Go to School",
];

const Com = () => {
  const [currentTasks, setCurrentTasks] = useState([]);
  const [result, setResult] = useState("");
  const [resultColor, setResultColor] = useState("");
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [err, setErr] = useState("")
  // State to manage drag and drop
  const [draggingItemIndex, setDraggingItemIndex] = useState(null);

  // Shuffle tasks on component mount
  useEffect(() => {
    shuffleTasks();
  }, []);

  const shuffleTasks = () => {
    const shuffled = [...tasks].sort(() => Math.random() - 0.5);
    setCurrentTasks(shuffled);
    setSelectedRowIndex(null); // Reset selection on shuffle
    setResult(""); // Clear result
  };

  const selectRow = (index) => {
    setErr("")
    setSelectedRowIndex(index);
  };

  const moveRow = (direction) => {
    setErr("")
    if (selectedRowIndex === null) {
      setErr("Please select a row first!");
      return;
    }

    const newTasks = [...currentTasks];
    let newIndex = selectedRowIndex;

    if (direction === "up" && selectedRowIndex > 0) {
      newIndex = selectedRowIndex - 1;
    } else if (direction === "down" && selectedRowIndex < newTasks.length - 1) {
      newIndex = selectedRowIndex + 1;
    } else {
      return; // No move needed
    }

    const [movedItem] = newTasks.splice(selectedRowIndex, 1);
    newTasks.splice(newIndex, 0, movedItem);
    setCurrentTasks(newTasks);
    setSelectedRowIndex(newIndex);
  };

  const checkResult = () => {
    setErr("")
    const orderedTaskNames = currentTasks.map((task) => task.text);
    if (JSON.stringify(orderedTaskNames) === JSON.stringify(correctOrder)) {
      setResult("Great job! You got the right order!");
      setResultColor("text-green-600");
    } else {
      setResult("Oops! The order is wrong. Try again!");
      setResultColor("text-red-600");
    }
  };

  // --- Drag and Drop Handlers ---

  const handleDragStart = (e, index) => {
    setDraggingItemIndex(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", index.toString());
    e.currentTarget.classList.add("opacity-50"); 
  };

  const handleDragOver = (e) => {
    e.preventDefault(); 
    e.dataTransfer.dropEffect = "move";
  };

  const handleDragEnter = (e, index) => {
    e.preventDefault();
    if (draggingItemIndex !== null && draggingItemIndex !== index) {
      const newTasks = [...currentTasks];
      const draggedItem = newTasks[draggingItemIndex];
      newTasks.splice(draggingItemIndex, 1);
      newTasks.splice(index, 0, draggedItem);
      setCurrentTasks(newTasks);
      setDraggingItemIndex(index); 
    }
  };

  const handleDragLeave = (e) => {
    // Optional: Add/remove classes when dragging leaves an element
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDraggingItemIndex(null); 
    setSelectedRowIndex(null); 
  };

  const handleDragEnd = (e) => {
    e.currentTarget.classList.remove("opacity-50"); 
    setDraggingItemIndex(null); 
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
        Bedtime Routine
      </h1>

      <div className="controls flex justify-center space-x-4 mb-6">
        <button
          onClick={() => moveRow("up")}
          className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
        >
          ⬆️ Move Up
        </button>
        <button
          onClick={() => moveRow("down")}
          className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
        >
          ⬇️ Move Down
        </button>
      </div>

      <button
        onClick={checkResult}
        className="cursor-pointer w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg mb-6 transition duration-300 ease-in-out"
      >
        Check Result
      </button>

      {result && (
        <p className={`text-center text-lg font-semibold mb-6 ${resultColor}`}>
          {result}
        </p>
      )}

      {err && (
        <p className={`text-center text-lg font-semibold mb-6 text-red-600`}>
          {err}
        </p>
      )}

      <div
        id="game-container"
        className="game-container bg-white p-4 rounded-lg shadow-xl border border-gray-200"
      >
        {currentTasks.map((task, index) => (
          <div
            key={task.text} 
            className={`row flex items-center justify-between py-2 px-4 mb-3 border border-gray-300 rounded-md cursor-grab transition duration-200 ease-in-out ${selectedRowIndex === index ? "bg-blue-100 border-blue-500" : ""
              } ${draggingItemIndex === index ? "opacity-50" : ""} hover:bg-blue-200`}
            draggable 
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={handleDragOver}
            onDragEnter={(e) => handleDragEnter(e, index)}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onDragEnd={handleDragEnd}
            onClick={() => selectRow(index)}
          >
            <p className="text-lg font-medium text-gray-700">{task.text}</p>
              <img src={task.image} alt={task.text}  className="w-10 h-10" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Com;