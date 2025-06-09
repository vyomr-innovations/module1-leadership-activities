"use client";

import { useState, useEffect } from "react";

const statementsData = [
  {
    pair: [
      { text: "I am sorry for...", correct: "apology" },
      { text: "You were wrong when you...", correct: "non-apology" },
    ],
  },
  {
    pair: [
      { text: "You made me angry, so...", correct: "non-apology" },
      { text: "I was wrong when I...", correct: "apology" },
    ],
  },
  {
    pair: [
      { text: "How can you feel like that?", correct: "non-apology" },
      { text: "In the future I will...", correct: "apology" },
    ],
  },
  {
    pair: [
      { text: "What can I do to make this better?", correct: "apology" },
      { text: "I am unhappy that...", correct: "non-apology" },
    ],
  },
];

export default function ApologyGame() {
  const [currentPairIndex, setCurrentPairIndex] = useState(0);
  const [showFinal, setShowFinal] = useState(false);
  const [clicked, setClicked] = useState(false);

  const currentPair = statementsData[currentPairIndex].pair;

  useEffect(() => {
    setClicked(false);
  }, [currentPairIndex]);

  const handleClick = (correct) => {
    if (clicked) return;
    setClicked(true);
    setTimeout(() => {
      if (currentPairIndex < statementsData.length - 1) {
        setCurrentPairIndex((prev) => prev + 1);
      } else {
        setShowFinal(true);
      }
    }, 700);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 flex flex-col items-center justify-center p-6">
      {!showFinal ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
          {currentPair.map((statement, index) => (
            <div
              key={index}
              className={`p-6 rounded-xl shadow-lg cursor-pointer text-center text-lg font-semibold transition-colors duration-300 border-2 hover:scale-105 ${
                statement.correct === "apology"
                  ? "bg-blue-200 border-blue-600 text-blue-900"
                  : "bg-orange-200 border-orange-600 text-orange-900"
              }`}
              onClick={() => handleClick(statement.correct)}
            >
              {statement.text}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-6 text-purple-700">
            Correct Apology Statements
          </h1>
          <div className="flex flex-wrap gap-4 justify-center">
            {["I am sorry for...", "I was wrong when I...", "In the future I will...", "What can I do to make this better?"].map((statement, idx) => (
              <div
                key={idx}
                className="bg-white text-gray-900 border border-gray-300 rounded-xl shadow-md px-6 py-4 text-lg font-medium"
              >
                {statement}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}