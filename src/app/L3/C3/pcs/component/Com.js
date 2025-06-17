"use client";

import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";

const allTasksData = [
  { id: "task1", text: "Water bottle" },
  { id: "task2", text: "Snacks" },
  { id: "task3", text: "First-aid kit" },
  { id: "task4", text: "Beach towel" },
  { id: "task5", text: "Hat and sunglasses" },
  { id: "task6", text: "Sunscreen" },
  { id: "task7", text: "Swimsuit" },
  { id: "task8", text: "Sketchbook and pencil" },
  { id: "task9", text: "Flip-flops or sandals" },
  { id: "task10", text: "Travel game or book" },
  { id: "task11", text: "Mobile phone" },
  { id: "task12", text: "Bug spray" },
  { id: "task13", text: "Beach umbrella" },
  { id: "task14", text: "Volleyball" },
];

const correctPlacement = {
  task1: 'urgent-important', // Water bottle
  task2: 'urgent-important', // "Snacks
  task3: 'urgent-important', // First-aid kit
  task4: 'urgent-important', // Beach towel
  task5: 'important-not-urgent', // Hat and sunglasses
  task6: 'urgent-important', // "Sunscreen
  task7: 'urgent-important', // "Swimsuit
  task8: 'not-urgent-not-important', // Sketchbook and pencil
  task9: 'important-not-urgent', // Flip-flops or sandals
  task10: 'not-urgent-not-important', // Travel game or book
  task11: 'urgent-important', // Mobile phone
  task12: 'important-not-urgent', // Bug spray
  task13: 'not-urgent-not-important', // Beach umbrella
  task14: 'not-urgent-not-important', // Volleyball
};

const quadrantsData = [
  { id: "urgent-important", name: "Important-Urgent", bgColor: "bg-red-100", borderColor: "border-red-400" },
  { id: "important-not-urgent", name: "Important-Not-Urgent", bgColor: "bg-yellow-100", borderColor: "border-yellow-400" },
  { id: "not-urgent-not-important", name: "Not-Important-Not-Urgent", bgColor: "bg-green-100", borderColor: "border-green-400" },
];

const TaskSortingPuzzle = () => {
  const [tasks, setTasks] = useState([]);
  const [resultMessage, setResultMessage] = useState("Group the items you would carry with you for a picnic to the beach");
  const [resultColor, setResultColor] = useState("text-gray-700");
  const [hoveredQuadrantId, setHoveredQuadrantId] = useState(null);
  const [showCheckSolutionButton, setShowCheckSolutionButton] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const initialTasks = allTasksData.map((task) => ({
      ...task,
      location: "available",
    }));
    setTasks(initialTasks);
  }, []);

  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData("text/plain", taskId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e, quadrantId) => {
    e.preventDefault();
    setHoveredQuadrantId(quadrantId);
  };

  const handleDragLeave = () => {
    setHoveredQuadrantId(null);
  };

  const handleDrop = (e, targetQuadrantId) => {
    e.preventDefault();
    setHoveredQuadrantId(null);
    const draggedTaskId = e.dataTransfer.getData("text/plain");

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === draggedTaskId ? { ...task, location: targetQuadrantId || "available" } : task
      )
    );
    setResultMessage("Group the items you would carry with you for a picnic to the beach");
    setResultColor("text-gray-700");
    setShowCheckSolutionButton(true);
  };

  const checkSolution = () => {
    let allCorrect = true;
    let allTasksPlaced = true;

    tasks.forEach((task) => {
      if (task.location === "available") {
        allTasksPlaced = false;
      } else if (correctPlacement[task.id] !== task.location) {
        allCorrect = false;
      }
    });

    if (allCorrect && allTasksPlaced) {
      setResultMessage("🎉 Great job! All items are sorted correctly!");
      setResultColor("text-green-600 font-bold");
      setShowCheckSolutionButton(false);
      setShowConfetti(true);
    } else if (!allTasksPlaced) {
      setResultMessage("Oops! Not all tasks are placed. Drag all tasks into a box first.");
      setResultColor("text-orange-600");
    } else {
      setResultMessage("Oops! Some tasks are in the wrong box. Try again!");
      setResultColor("text-red-600");
    }
  };

  const availableTasks = tasks.filter((task) => task.location === "available");

  return (
    <div className="relative container mx-auto p-4 w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-200 to-pink-300 rounded-lg shadow-2xl">
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={400}
          recycle={false}
        />
      )}

      <h1 className="text-3xl font-extrabold mb-4 drop-shadow-lg">Task Sorting Puzzle</h1>

      {showCheckSolutionButton && (
        <button
          onClick={checkSolution}
          className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-3 px-8 rounded-full shadow-lg mb-5 transition duration-300 transform hover:scale-105"
        >
          Check Solution
        </button>
      )}

      <p className={`text-2xl text-center mb-8 font-bold ${resultColor}`}>{resultMessage}</p>

      <div className="flex flex-col lg:flex-row gap-8 w-full items-start justify-center">
        <div
          className="w-full lg:w-1/3 bg-white p-6 rounded-xl shadow-lg border-2 border-gray-200 flex flex-wrap justify-center gap-4 min-h-[200px]"
          onDragOver={(e) => handleDragOver(e, null)}
          onDrop={(e) => handleDrop(e, null)}
          onDragLeave={handleDragLeave}
        >
          <h2 className="text-2xl font-bold text-gray-800 w-full text-center mb-2">List of items</h2>
          {availableTasks.length === 0 ? (
            <p className="text-gray-500 text-lg self-center">All tasks are placed!</p>
          ) : (
            availableTasks.map((task) => (
              <div
                key={task.id}
                className="bg-indigo-100 text-indigo-800 font-semibold text-[17px] py-3 px-5 rounded-full shadow-md cursor-grab hover:bg-indigo-200 transition"
                draggable
                onDragStart={(e) => handleDragStart(e, task.id)}
              >
                {task.text}
              </div>
            ))
          )}
        </div>

        <div className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
          {quadrantsData.map((quadrant) => (
            <div
              key={quadrant.id}
              className={`p-6 rounded-xl shadow-lg border-4 flex flex-col items-center min-h-[200px] text-center transition
                ${quadrant.bgColor} ${quadrant.borderColor}
                ${hoveredQuadrantId === quadrant.id ? "border-solid scale-105 shadow-xl" : "border-dashed"}
              `}
              onDragOver={(e) => handleDragOver(e, quadrant.id)}
              onDrop={(e) => handleDrop(e, quadrant.id)}
              onDragLeave={handleDragLeave}
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{quadrant.name}</h2>
              <div className="flex flex-wrap justify-center gap-3">
                {tasks
                  .filter((task) => task.location === quadrant.id)
                  .map((task) => (
                    <div
                      key={task.id}
                      className="bg-purple-100 text-purple-800 font-semibold py-2 px-4 rounded-full shadow-sm cursor-grab text-sm"
                      draggable
                      onDragStart={(e) => handleDragStart(e, task.id)}
                    >
                      {task.text}
                    </div>
                  ))}
              </div>
              {tasks.filter((task) => task.location === quadrant.id).length === 0 && (
                <p className="text-gray-500 text-lg">Drop tasks here!</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskSortingPuzzle;
