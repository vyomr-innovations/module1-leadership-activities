"use client"; 
import React, { useState, useEffect } from "react";

const initialTasksData = [
  { time: "06:30", task: "Wake up and get ready" },
  { time: "07:30", task: "Breakfast" },
  { time: "08:00", task: "Study/school time" },
  { time: "13:30", task: "Lunch" },
  { time: "14:30", task: "Finish Homework" },
  { time: "16:00", task: "Creative time/Play outside" },
  { time: "18:00", task: "Daily Chores" },
  { time: "18:30", task: "Take a short stretch or walk break" },
  { time: "19:30", task: "Dinner" },
  { time: "20:00", task: "Prepare for next day" },
  { time: "20:20", task: "Screen time" },
  { time: "20:30", task: "Bedtime" },
];

const TaskList = () => {
  // State to hold the table rows
  const [tasks, setTasks] = useState([]);

  // Initialize tasks on component mount
  useEffect(() => {
    // Add a unique ID to each initial task for React's key prop
    const tasksWithIds = initialTasksData.map((task, index) => ({
      ...task,
      id: Date.now() + index, // Use Date.now() + index for unique IDs
    }));
    setTasks(tasksWithIds);
  }, []);

  // Function to add a new row
  const addRow = () => {
    setTasks((prevTasks) => {
      const newTasks = [
        ...prevTasks,
        {
          id: Date.now(), // Unique ID for React key prop
          time: "08:00",
          task: "New Task",
        },
      ];
      // Sort immediately after adding to maintain order
      return newTasks.sort((a, b) => a.time.localeCompare(b.time));
    });
  };

  // Function to delete a row
  const deleteRow = (idToDelete) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== idToDelete));
  };

  // Function to handle time input changes and sort rows
  const handleTimeChange = (id, newTime) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task.id === id ? { ...task, time: newTime } : task
      );
      // Sort the tasks after updating time
      return updatedTasks.sort((a, b) => a.time.localeCompare(b.time));
    });
  };

  // Function to handle task content changes (contenteditable)
  const handleTaskChange = (id, newTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, task: newTask } : task))
    );
  };

  return (
    <div className="container mx-auto p-4 md:p-8 w-full min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-purple-50 to-pink-100 shadow-xl rounded-lg">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-8 text-purple-800 drop-shadow-md">
        Daily Routine
      </h1>

      <button
        onClick={addRow}
        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-md shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 mb-8"
      >
        ➕ Add New Task
      </button>

      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider"
              >
                Time
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider"
              >
                Task
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {tasks.length === 0 ? (
              <tr>
                <td colSpan="3" className="px-6 py-8 text-center text-gray-500 italic">
                  No tasks in your schedule. Click "Add New Task" to begin!
                </td>
              </tr>
            ) : (
              tasks.map((task) => (
                <tr key={task.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="time"
                      value={task.time}
                      onChange={(e) => handleTimeChange(task.id, e.target.value)}
                      className="form-input block w-full border-gray-300 rounded-md shadow-sm focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50 text-sm sm:text-base"
                    />
                  </td>
                  <td
                    contentEditable="true"
                    onBlur={(e) => handleTaskChange(task.id, e.target.innerText)}
                    className="px-6 py-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-md transition-all duration-200"
                    suppressContentEditableWarning={true} // Suppress React warning for contenteditable
                  >
                    {task.task}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => deleteRow(task.id)}
                      className="text-red-600 hover:text-red-800 bg-red-100 hover:bg-red-200 px-3 py-1 rounded-md transition-colors duration-200"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskList;