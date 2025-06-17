"use client";

import { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const predefinedTasks = [
  "Bake or cook something.",
  "Create art or crafts.",
  "Read a book or comic.",
];

const PlusIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
  </svg>
);

const FileIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16V8a2 2 0 012-2h8l4 4v6a2 2 0 01-2 2H6a2 2 0 01-2-2z" />
  </svg>
);

const TrashIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m2 0a2 2 0 00-2-2H9a2 2 0 00-2 2h10z" />
  </svg>
);

export default function TaskTable() {
  const [rows, setRows] = useState(() => {
    return [
      { id: Date.now(), time: "08:00", selectedTask: "", customText: "", isCustom: false },
      { id: Date.now() + 1, time: "09:00", selectedTask: "", customText: "", isCustom: false },
      { id: Date.now() + 2, time: "10:00", selectedTask: "", customText: "", isCustom: false }
    ];
  });

  const addRow = () => {
    setRows((prevRows) => {
      const newRows = [
        ...prevRows,
        { id: Date.now(), time: "08:00", selectedTask: "", customText: "", isCustom: false } // Initialize selectedTask to empty string for dropdown
      ];
      // Sort immediately after adding
      return newRows.sort((a, b) => a.time.localeCompare(b.time));
    });
  };

  const deleteRow = (idToDelete) => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== idToDelete));
  };

  // Generic update function to handle different properties
  const updateRow = (id, key, value) => {
    setRows((prevRows) => {
      const updatedRows = prevRows.map((row) => {
        if (row.id === id) {
          if (key === 'time') {
            // If time is updated, just change the time
            return { ...row, [key]: value };
          } else if (key === 'selectedTask') {
            // When dropdown changes, update selectedTask and set isCustom flag
            return {
              ...row,
              selectedTask: value,
              isCustom: value === "add-text" // Set isCustom true if "add-text" is selected
            };
          } else if (key === 'customText') {
            // Update customText if it's a custom input
            return { ...row, [key]: value };
          }
        }
        return row;
      });

      // Sort if time was updated
      if (key === 'time') {
        return updatedRows.sort((a, b) => a.time.localeCompare(b.time));
      }
      return updatedRows;
    });
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Task Table", 14, 20);

    // Get the actual task content for PDF
    const pdfBody = rows.map((row) => {
      // Logic for PDF should pick the correct task text
      const taskContent = row.isCustom ? row.customText : row.selectedTask;
      return [row.time, taskContent];
    });

    autoTable(doc, {
      head: [["Time", "Task"]],
      body: pdfBody, // Use the prepared pdfBody
      startY: 30,
      theme: "striped"
    });

    doc.save("task-table.pdf");
    window.open(doc.output("bloburl"), "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-purple-100 via-blue-100 to-cyan-100 p-4 sm:p-10 text-gray-800 flex items-center justify-center">
      <div className="max-w-5xl w-full mx-auto bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl p-6 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-6 sm:mb-8 text-center text-indigo-700 tracking-wide">
          Task Table
        </h1>

        <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200">
          <table className="w-full border-collapse text-base text-left text-gray-700">
            <thead className="bg-indigo-200 text-indigo-900 sticky top-0 z-10">
              <tr>
                <th className="px-4 py-3 sm:px-5 sm:py-3 border border-indigo-300">Time</th>
                <th className="px-4 py-3 sm:px-5 sm:py-3 border border-indigo-300">Task</th>
                <th className="px-4 py-3 sm:px-5 sm:py-3 border border-indigo-300 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {/* Sort rows here for consistent display order */}
              {rows.sort((a, b) => a.time.localeCompare(b.time)).map((row) => (
                <tr key={row.id} className="even:bg-indigo-50 hover:bg-indigo-100 transition-colors duration-150">
                  <td className="px-4 py-3 sm:px-5 sm:py-3 border border-gray-200">
                    <input
                      type="time"
                      value={row.time}
                      onChange={(e) => updateRow(row.id, "time", e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
                    />
                  </td>
                  <td className="px-4 py-3 sm:px-5 sm:py-3 border border-gray-200">
                    {/* The select element's value controls which option is displayed.
                        If `isCustom` is true, the value should be "add-text" to highlight that option.
                        Otherwise, it's the actual selectedTask. */}
                    <select
                      value={row.isCustom ? "add-text" : row.selectedTask}
                      onChange={(e) => updateRow(row.id, "selectedTask", e.target.value)}
                      className="block w-full border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 mb-2"
                    >
                      <option value="" disabled>Select Task</option>
                      {predefinedTasks.map((taskOption) => (
                        <option key={taskOption} value={taskOption}>
                          {taskOption}
                        </option>
                      ))}
                      <option value="add-text">Add Custom Text</option>
                    </select>

                    {/* Conditionally render the custom text input */}
                    {row.isCustom && (
                      <input
                        type="text"
                        placeholder="Enter custom task"
                        value={row.customText}
                        onChange={(e) => updateRow(row.id, "customText", e.target.value)}
                        className="block w-full border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 mt-2"
                      />
                    )}
                  </td>
                  <td className="px-4 py-3 sm:px-5 sm:py-3 border border-gray-200 text-center">
                    <button
                      onClick={() => deleteRow(row.id)}
                      className="text-white bg-red-500 hover:bg-red-600 p-2 rounded-full shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center mx-auto"
                      aria-label="Delete Row"
                    >
                      <TrashIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={addRow}
            className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 text-base"
          >
            <PlusIcon /> Add Row
          </button>
          <button
            onClick={generatePDF}
            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 text-base"
          >
            <FileIcon /> Generate PDF
          </button>
        </div>
      </div>
    </div>
  );
}