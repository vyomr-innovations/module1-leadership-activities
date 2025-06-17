"use client";

import React, { useState, useEffect } from "react";

const allTasksData = [
  { id: "task1", text: "Order a cake " },
  { id: "task2", text: "Choose party hats" },
  { id: "task3", text: "Do all household chores" },
  { id: "task4", text: "Arrange transportation for guests" },
  { id: "task5", text: "Make a birthday card" },
  { id: "task6", text: "Invite friends and family for party" }
];

const correctPlacement = {
  task1: "Low-Eff-High-Imp", //Order a cake 
  task2: "Low-Effort-Low-Imp", //Choose party hats
  task3: "High-Eff-High-Imp",//Do all household chores
  task4: "High-Eff-Low-Imp",//Arrange transportation for guests
  task5: "Low-Eff-High-Imp",//Make a birthday card
  task6: "High-Eff-High-Imp",//Invite friends and family for party
};


const quadrantsData = [
  { id: "Low-Eff-High-Imp", name: "Low Effort-High Impact", bgColor: "bg-red-100", borderColor: "border-red-400" },
  { id: "High-Eff-Low-Imp", name: "High Effort-Low Impact", bgColor: "bg-yellow-100", borderColor: "border-yellow-400" },
  { id: "High-Eff-High-Imp", name: "High Effort-High Impact", bgColor: "bg-blue-100", borderColor: "border-blue-400" },
  { id: "Low-Effort-Low-Imp", name: "Low Effort-Low Impact", bgColor: "bg-green-100", borderColor: "border-green-400" },
];

const TaskSortingPuzzle = () => {
  const [tasks, setTasks] = useState([]);
  const [resultMessage, setResultMessage] = useState(
    "Drag and drop each task into the correct box"
  );
  const [resultColor, setResultColor] = useState("text-gray-700");
  const [hoveredQuadrantId, setHoveredQuadrantId] = useState(null);
  const [showCheckSolutionButton, setShowCheckSolutionButton] = useState(true);

  useEffect(() => {
    const initialTasks = allTasksData.map((task) => ({
      ...task,
      location: "available",
    }));
    setTasks(initialTasks);
  }, []);

  // --- Drag and Drop Handlers ---

  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData("text/plain", taskId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e, quadrantId) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setHoveredQuadrantId(quadrantId);
  };

  const handleDragLeave = (e) => {
    setHoveredQuadrantId(null);
  };

  const handleDrop = (e, targetQuadrantId) => {
    e.preventDefault();
    setHoveredQuadrantId(null);

    const draggedTaskId = e.dataTransfer.getData("text/plain");

    setTasks((prevTasks) => {
      return prevTasks.map((task) => {
        if (task.id === draggedTaskId) {
          if (targetQuadrantId) {
            return { ...task, location: targetQuadrantId };
          } else {
            return { ...task, location: "available" };
          }
        }
        return task;
      });
    });

    setResultMessage("Drag and drop each task into the correct box");
    setResultColor("text-gray-700");
    setShowCheckSolutionButton(true);
  };

  const checkSolution = () => {
    let allCorrect = true;
    let allTasksPlaced = true;

    tasks.forEach((task) => {
      if (task.location === "available") {
        allTasksPlaced = false; // A task is still in the initial pool
      } else if (correctPlacement[task.id] !== task.location) {
        allCorrect = false; // A task is in the wrong quadrant
      }
    });

    if (allCorrect && allTasksPlaced) {
      setResultMessage("Great job! All tasks are sorted correctly!");
      setResultColor("text-green-600 font-bold");
      setShowCheckSolutionButton(false); // Hide button on success
      // No confetti library, so just update text
    } else if (!allTasksPlaced) {
      setResultMessage("Oops! Not all tasks are placed in the boxes. Drag all tasks into a box first.");
      setResultColor("text-orange-600");
    }
    else {
      setResultMessage(
        "Oops! Some tasks are in the wrong box. Try again by dragging the tasks to the correct box."
      );
      setResultColor("text-red-600");
    }
  };

  // Filter tasks for rendering in the 'tasks' area and each quadrant
  const availableTasks = tasks.filter((task) => task.location === "available");

  return (
    <div className="container mx-auto p-4 w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-200 to-pink-300 rounded-lg shadow-2xl">
      <h1 className="text-3xl font-extrabold mb-4 drop-shadow-lg">
        Task Sorting Puzzle
      </h1>

      {showCheckSolutionButton && (
        <button
          onClick={checkSolution}
          className="cursor-pointer bg-purple-700 hover:bg-purple-800 text-white font-bold py-3 px-8 rounded-full shadow-lg mb-5 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Check Solution
        </button>
      )}

      <p className={`text-2xl text-center mb-8 font-medium ${resultColor}`}>
        {resultMessage}
        <br />
        <p className="mt-[6px]">Evaluate the effort required with the impact of an action.</p>
      </p>

      <div id="game-container" className="flex flex-col lg:flex-row gap-8 w-full items-start justify-center">
        <div
          id="tasks"
          className="w-full lg:w-1/3 bg-white p-6 rounded-xl shadow-lg border-2 border-gray-200 flex flex-wrap justify-center gap-4 min-h-[200px]"
          onDragOver={(e) => handleDragOver(e, null)} // null indicates dropping back to available
          onDrop={(e) => handleDrop(e, null)}
          onDragLeave={handleDragLeave}
        >
          <h2 className="text-2xl font-bold text-gray-800 w-full text-center mb-2">
            List of Tasks
          </h2>
          {availableTasks.length === 0 ? (
            <p className="text-gray-500 text-lg self-center">
              All tasks are placed in the quadrants!
            </p>
          ) : (
            availableTasks.map((task) => (
              <div
                key={task.id}
                id={task.id}
                className="task bg-indigo-100 text-indigo-800 font-semibold text-[17px] py-3 px-5 rounded-full shadow-md cursor-grab transition-all duration-200 ease-in-out hover:bg-indigo-200 hover:shadow-lg text-center"
                draggable
                onDragStart={(e) => handleDragStart(e, task.id)}
              >
                {task.text}
              </div>
            ))
          )}
        </div>


        <div
          id="quadrants"
          className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {quadrantsData.map((quadrant) => (
            <div
              key={quadrant.id}
              id={quadrant.id}
              className={`quadrant p-6 rounded-xl shadow-lg border-4 border-dashed flex flex-col items-center justify-center min-h-[200px] text-center transition-all duration-300 ease-in-out
                ${quadrant.bgColor} ${quadrant.borderColor}
                ${hoveredQuadrantId === quadrant.id ? "border-solid scale-105 shadow-xl" : "border-dashed"}
              `}
              onDragOver={(e) => handleDragOver(e, quadrant.id)}
              onDrop={(e) => handleDrop(e, quadrant.id)}
              onDragLeave={handleDragLeave}
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {quadrant.name}
              </h2>
              <div className="flex flex-wrap justify-center gap-3">
                {tasks
                  .filter((task) => task.location === quadrant.id)
                  .map((task) => (
                    <div
                      key={task.id}
                      id={task.id}
                      className="task bg-purple-100 text-[17px] text-purple-800 font-semibold py-2 px-4 rounded-full shadow-sm cursor-grab text-sm"
                      draggable // Allow dragging tasks out of quadrants
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