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
    <div className="w-screen h-screen overflow-hidden">
      {!showFinal ? (
        <div className="flex flex-col h-full">
          <div className="text-center p-4 bg-white shadow-md">
            <h2 className="text-xl md:text-2xl font-medium text-gray-800">
              Identify the correct phrase that shows an apology. Complete the sentence for each phrase.
            </h2>
          </div>
          <div className="flex flex-1">
            {currentPair.map((statement, index) => (
              <div
                key={index}
                className={`w-1/2 h-full flex items-center justify-center p-4 text-center text-2xl font-semibold cursor-pointer transition-transform duration-300 hover:scale-105 ${
                  statement.correct === "apology"
                    ? "bg-blue-200 text-blue-900"
                    : "bg-orange-200 text-orange-900"
                }`}
                onClick={() => handleClick(statement.correct)}
              >
                {statement.text}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 flex flex-col items-center justify-center p-6">
          <h1 className="text-3xl font-bold mb-6 text-purple-700">
            Correct Apology Statements
          </h1>
          <div className="flex flex-wrap gap-4 justify-center">
            {[
              "I am sorry for...",
              "I was wrong when I...",
              "In the future I will...",
              "What can I do to make this better?",
            ].map((statement, idx) => (
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
