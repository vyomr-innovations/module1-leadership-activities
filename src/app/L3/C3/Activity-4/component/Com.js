"use client";

import Com2 from './Com2';
import React, { useState, useEffect } from "react";


const allTasksData = [
  { id: "task1", text: "Bath" },
  { id: "task2", text: "Play outside" },
  { id: "task3", text: "Pack backpack" },
  { id: "task4", text: "Eat" },
  { id: "task5", text: "Chores" },
  { id: "task6", text: "Study" },
  { id: "task7", text: "Watch favourite Show" },
  { id: "task8", text: "Play Games on mobile or console" },
  { id: "task9", text: "Go to School" },
  { id: "task10", text: "Do Homework" },
];

const correctPlacement = {
  task1: "urgent-important", // Bath
  task2: "important-not-urgent", // Play outside
  task3: "important-not-urgent", // Pack backpack
  task4: "urgent-important", // Eat
  task5: "important-not-urgent", // Chores
  task6: "urgent-important", // Study
  task7: "not-urgent-not-important", // Watch favourite Show
  task8: "not-urgent-not-important", // Play Games on mobile or console
  task9: "urgent-important", // Go to School
  task10: "urgent-not-important", // Do Homework
};

const quadrantsData = [
  { id: "urgent-important", name: "Urgent and Important", bgColor: "bg-red-100", borderColor: "border-red-400" },
  { id: "important-not-urgent", name: "Important - Not Urgent", bgColor: "bg-yellow-100", borderColor: "border-yellow-400" },
  { id: "urgent-not-important", name: "Urgent - Not Important", bgColor: "bg-blue-100", borderColor: "border-blue-400" }, // Note: Corrected order here for clarity, matches original
  { id: "not-urgent-not-important", name: "Not Urgent - Not Important", bgColor: "bg-green-100", borderColor: "border-green-400" },
];

const TaskSortingPuzzle = () => {
  const [tasks, setTasks] = useState([]);
  const [resultMessage, setResultMessage] = useState(
    "Drag and drop each task into the correct box"
  );
  const [resultColor, setResultColor] = useState("text-gray-700");
  const [hoveredQuadrantId, setHoveredQuadrantId] = useState(null);
  const [showCheckSolutionButton, setShowCheckSolutionButton] = useState(true);
  const [showNextPageButton, setShowNextPageButton] = useState(false);


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
    setShowNextPageButton(false);
  };


  const checkSolution = async () => {
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
      setResultMessage("Great job! All tasks are sorted correctly!");
      setResultColor("text-green-600 font-bold");
      setShowCheckSolutionButton(false);
      

    } else if (!allTasksPlaced) {
      setResultMessage("Oops! Not all tasks are placed in the boxes. Drag all tasks into a box first.");
      setResultColor("text-orange-600");
      setShowNextPageButton(false);
    } else {
      setResultMessage(
        "Oops! Some tasks are in the wrong box. Try again by dragging the tasks to the correct box."
      );
      setResultColor("text-red-600");
      setShowNextPageButton(false);
    }
  };

  const availableTasks = tasks.filter((task) => task.location === "available");

  const createSchedule = ()=>{
    setShowNextPageButton(true);
  }

  return (
    <>
      {showNextPageButton ? (
        <Com2 />
      ) : (
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

          {!showCheckSolutionButton && (
            <button
              onClick={createSchedule}
              className="cursor-pointer bg-purple-700 hover:bg-purple-800 text-white font-bold py-3 px-8 rounded-full shadow-lg mb-5 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Let's create a schedule
            </button>
          )}


          <p className={`text-2xl text-center mb-8 font-bold ${resultColor}`}>
            {resultMessage}
          </p>

          <div id="game-container" className="flex flex-col lg:flex-row gap-8 w-full items-start justify-center">
            <div
              id="tasks"
              className="w-full lg:w-1/3 bg-white p-6 rounded-xl shadow-lg border-2 border-gray-200 flex flex-wrap justify-center gap-4 min-h-[200px]"
              onDragOver={(e) => handleDragOver(e, null)}
              onDrop={(e) => handleDrop(e, null)}
              onDragLeave={handleDragLeave}
            >
              <h2 className="text-2xl font-bold text-gray-800 w-full text-center mb-2">
                List of Tasks
              </h2>
              {availableTasks.length === 0 ? (
                <p className="text-gray-500 text-lg self-center">
                  All the tasks are grouped correctly.
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

            {/* Quadrants container */}
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
      )}
    </>
  );
};

export default TaskSortingPuzzle;