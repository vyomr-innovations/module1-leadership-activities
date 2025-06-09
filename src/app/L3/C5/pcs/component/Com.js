"use client";

import { useState } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export default function ResponsibilityTable() {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const defaultOptions = [
    "Put clothes in the laundry",
    "Pack school bags",
    "Limit screen time",
    "Switch off appliances",
    "Save water",
    "Recycle",
    "Keep trash cans outside",
    "Edit",
  ];

  const [rows, setRows] = useState([
    { responsibility: "Put clothes in the laundry", checkboxes: Array(7).fill(false) },
  ]);

  const handleCheckboxChange = (rowIndex, dayIndex) => {
    const newRows = [...rows];
    newRows[rowIndex].checkboxes[dayIndex] = !newRows[rowIndex].checkboxes[dayIndex];
    setRows(newRows);
  };

  const handleDropdownChange = (value, rowIndex) => {
    const newRows = [...rows];
    newRows[rowIndex].responsibility = value === "Edit" ? "" : value;
    setRows(newRows);
  };

  const handleResponsibilityInput = (e, rowIndex) => {
    const newRows = [...rows];
    newRows[rowIndex].responsibility = e.target.value;
    setRows(newRows);
  };

  const addRow = () => {
    setRows([...rows, { responsibility: defaultOptions[0], checkboxes: Array(7).fill(false) }]);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const tableData = rows.map((row) => [row.responsibility, ...row.checkboxes.map((val) => (val ? "✔" : ""))]);
    autoTable(doc, {
      head: [["My Responsibility", ...days]],
      body: tableData,
    });
    doc.save("ResponsibilityTable.pdf");
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 py-10 px-4">
      <h1 className="text-4xl font-bold text-center text-blue-800 mb-10">Responsibility Table</h1>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white border border-blue-500 rounded-lg">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="px-4 py-3 border border-blue-500 text-left">My Responsibilities</th>
              {days.map((day) => (
                <th key={day} className="px-4 py-3 border border-blue-500 text-center">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="bg-yellow-100 even:bg-yellow-200">
                <td className="px-3 py-2 border border-blue-500">
                  {row.responsibility === "" ? (
                    <input
                      type="text"
                      placeholder="Type your responsibility"
                      className="w-full border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                      onChange={(e) => handleResponsibilityInput(e, rowIndex)}
                    />
                  ) : (
                    <select
                      value={row.responsibility}
                      onChange={(e) => handleDropdownChange(e.target.value, rowIndex)}
                      className="w-full border rounded px-2 py-1 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      {defaultOptions.map((opt) => (
                        <option key={opt}>{opt}</option>
                      ))}
                    </select>
                  )}
                </td>
                {row.checkboxes.map((checked, dayIndex) => (
                  <td key={dayIndex} className="text-center border border-blue-500 px-2 py-2">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => handleCheckboxChange(rowIndex, dayIndex)}
                      className="w-5 h-5 text-orange-500 accent-orange-500 cursor-pointer"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center gap-6 mt-8">
        <button
          onClick={addRow}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded shadow transition duration-300"
        >
        Add Row
        </button>
        <button
          onClick={generatePDF}
          className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-2 rounded shadow transition duration-300"
        >
          Submit
        </button>
      </div>
    </main>
  );
}
