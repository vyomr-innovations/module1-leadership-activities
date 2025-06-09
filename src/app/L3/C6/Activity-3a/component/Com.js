'use client';

import React, { useState, useEffect } from 'react';

const Com = () => {
  const initialRows = Array.from({ length: 5 }).map(() => ({
    criteria: '',
    weight: 1,
    scores: [0, 0, 0, 0, 0],
  }));

  const [rows, setRows] = useState(initialRows);
  const [optionNames, setOptionNames] = useState(['', '', '', '', '']);
  const [totals, setTotals] = useState([0, 0, 0, 0, 0]);

  const handleCriteriaChange = (e, index) => {
    const newRows = [...rows];
    newRows[index].criteria = e.target.textContent;
    setRows(newRows);
  };

  const handleWeightChange = (e, index) => {
    const newRows = [...rows];
    newRows[index].weight = parseFloat(e.target.value);
    setRows(newRows);
  };

  const handleScoreChange = (e, rowIndex, scoreIndex) => {
    const newRows = [...rows];
    newRows[rowIndex].scores[scoreIndex] = parseFloat(e.target.value);
    setRows(newRows);
  };

  const handleOptionNameChange = (e, index) => {
    const newOptionNames = [...optionNames];
    newOptionNames[index] = e.target.value;
    setOptionNames(newOptionNames);
  };

  const calculateMatrix = () => {
    const newTotals = [0, 0, 0, 0, 0];
    rows.forEach((row) => {
      row.scores.forEach((score, index) => {
        newTotals[index] += score * row.weight;
      });
    });
    setTotals(newTotals);
  };

  useEffect(() => {
    calculateMatrix();
  }, [rows]);

  return (
    <div className="min-h-screen bg-white text-gray-800 p-5 font-sans">
      <h1 className="text-center text-4xl mb-4 text-blue-700">Pugh Matrix Tool</h1>
      <h4 className="text-center text-lg mb-8 text-blue-600">(Fill in at least two options for comparison)</h4>

      <table className="w-full border-collapse mb-5 bg-white text-gray-800 shadow-lg rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-blue-200 text-gray-800">
            <th className="border border-blue-300 p-3 text-sm">
              Step 1: ENTER YOUR<br />EVALUATION CRITERIA<br />(up to 5, one per line):
            </th>
            <th className="border border-blue-300 p-3 text-sm">Step 2: CHOOSE IMPORTANCE MULTIPLIER<br />FOR EACH CRITERION</th>
            {[1, 2, 3, 4, 5].map((num) => (
              <th key={num} className="border border-blue-300 p-3 text-sm">
                Step {num + 2}: Enter and evaluate<br />OPTION {num}:
              </th>
            ))}
          </tr>
          <tr>
            <td className="border border-blue-300 p-3"></td>
            <td className="border border-blue-300 p-3"></td>
            {[0, 1, 2, 3, 4].map((index) => (
              <td key={index} className="border border-blue-300 p-3">
                <textarea
                  rows="2"
                  cols="15"
                  placeholder={`Enter text for Option ${index + 1}`}
                  className="w-full p-2 bg-blue-50 text-gray-900 rounded border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={optionNames[index]}
                  onChange={(e) => handleOptionNameChange(e, index)}
                ></textarea>
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td className="border border-blue-300 p-3">
                <input
                  type="text"
                  className="w-full p-2 bg-blue-50 text-gray-900 rounded border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter criteria"
                  value={row.criteria}
                  onChange={(e) => {
                    const newRows = [...rows];
                    newRows[rowIndex].criteria = e.target.value;
                    setRows(newRows);
                  }}
                />
              </td>
              <td className="border border-blue-300 p-3">
                <select
                  className="w-full p-2 bg-blue-50 text-gray-900 rounded border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={row.weight}
                  onChange={(e) => handleWeightChange(e, rowIndex)}
                >
                  <option value="1">1 (normal)</option>
                  <option value="2">2 (very important)</option>
                  <option value="3">3 (extremely important)</option>
                </select>
              </td>
              {row.scores.map((score, scoreIndex) => (
                <td key={scoreIndex} className="border border-blue-300 p-3">
                  <select
                    className="w-full p-2 bg-blue-50 text-gray-900 rounded border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={score}
                    onChange={(e) => handleScoreChange(e, rowIndex, scoreIndex)}
                  >
                    <option value="0">0 (average)</option>
                    <option value="1">1 (better than average)</option>
                    <option value="-1">-1 (worse than average)</option>
                  </select>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-blue-300 text-gray-800 font-bold">
            <td colSpan="2" className="border border-blue-300 p-3 text-center">Total</td>
            {totals.map((total, index) => (
              <td key={index} className="border border-blue-300 p-3 text-center">
                {total}
              </td>
            ))}
          </tr>
        </tfoot>
      </table>

      <div className="text-center">
        <button
          className="inline-block mt-4 px-6 py-3 text-lg text-white bg-blue-600 rounded-md cursor-pointer hover:bg-blue-700 transition duration-300 ease-in-out shadow-lg"
          onClick={calculateMatrix}
        >
          Calculate
        </button>
      </div>

      <div className="results text-center text-xl mt-8 text-blue-700">
        {/* You can display overall results here if needed based on the totals */}
      </div>
    </div>
  );
};

export default Com;