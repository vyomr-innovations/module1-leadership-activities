"use client"
import React, { useState, useEffect, useCallback } from 'react';

const emotions = [
  { name: "Angry", type: "high-unpleasant" },
  { name: "Mad", type: "high-unpleasant" },
  { name: "Happy", type: "high-pleasant" },
  { name: "Excited", type: "high-pleasant" },
  { name: "Sad", type: "low-unpleasant" },
  { name: "Worrying", type: "low-unpleasant" },
  { name: "Disgust", type: "low-unpleasant" },
  { name: "Calm", type: "low-pleasant" },
  { name: "Good", type: "low-pleasant" },
  { name: "Relaxed", type: "low-pleasant" }
];

export default function Com() {
  const [currentEmotion, setCurrentEmotion] = useState(null);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [incorrectQuadrantType, setIncorrectQuadrantType] = useState(null);

  const getRandomEmotion = useCallback(() => {
    return emotions[Math.floor(Math.random() * emotions.length)];
  }, []);

  const nextRound = useCallback(() => {
    setCurrentEmotion(getRandomEmotion());
    setFeedbackMessage('');
  }, [getRandomEmotion]);

  const startGame = () => {
    setIsGameStarted(true);
    nextRound();
  };

  const handleQuadrantClick = (selectedType) => {
    if (!currentEmotion) return;

    if (selectedType === currentEmotion.type) {
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
      }, 2000);
      nextRound();
    } else {
      setFeedbackMessage("Incorrect! Try again.");
      setIncorrectQuadrantType(selectedType);
      setTimeout(() => {
        setFeedbackMessage('');
        setIncorrectQuadrantType(null);
      }, 1000);
    }
  };

  useEffect(() => {
    if (!isGameStarted) {
      setCurrentEmotion(null);
      setFeedbackMessage('');
    }
  }, [isGameStarted]);

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 font-inter transition-all duration-500 ease-in-out
        ${showConfetti
          ? 'bg-[url("https://media.giphy.com/media/ePaw7nwYmSI1t389Sy/giphy.gif")] bg-cover bg-center'
          : 'bg-gradient-to-br from-blue-50 to-indigo-100'
        }`}
    >
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl max-w-lg w-full text-center border-t-4 border-red-500">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6 tracking-tight">
          Mood Meter Game
        </h1>

        {!isGameStarted && (
          <>
            <p className="instructions text-gray-600 text-sm sm:text-base mb-4">
              Click the box that matches the emotion
            </p>
            <button
              id="start-button"
              onClick={startGame}
              className="py-3 px-8 rounded-lg font-semibold text-lg bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 mb-8"
            >
              Start Game
            </button>
          </>
        )}

        {isGameStarted && (
          <div className="mb-4 p-4 bg-gray-50 rounded-lg shadow-inner">
            <span id="emotion" className="text-6xl font-bold text-purple-700">
              {currentEmotion ? currentEmotion.name : ''}
            </span>
          </div>
        )}

        {feedbackMessage && (
          <p className="text-red-500 font-semibold text-lg mb-4 animate-fade-in-out">
            {feedbackMessage}
          </p>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div
            className={`quadrant high-unpleasant bg-red-400 hover:bg-red-500 text-white p-6 rounded-lg shadow-md flex items-center justify-center text-center font-bold text-lg cursor-pointer transition-all duration-200 ease-in-out transform hover:scale-105
              ${incorrectQuadrantType === 'high-unpleasant' ? 'animate-flash-red' : ''}`}
            data-type="high-unpleasant"
            onClick={() => handleQuadrantClick("high-unpleasant")}
          >
            HIGH ENERGY<br />UNPLEASANT
          </div>
          <div
            className={`quadrant high-pleasant bg-green-400 hover:bg-green-500 text-white p-6 rounded-lg shadow-md flex items-center justify-center text-center font-bold text-lg cursor-pointer transition-all duration-200 ease-in-out transform hover:scale-105
              ${incorrectQuadrantType === 'high-pleasant' ? 'animate-flash-red' : ''}`}
            data-type="high-pleasant"
            onClick={() => handleQuadrantClick("high-pleasant")}
          >
            HIGH ENERGY<br />PLEASANT
          </div>
          <div
            className={`quadrant low-unpleasant bg-yellow-400 hover:bg-yellow-500 text-white p-6 rounded-lg shadow-md flex items-center justify-center text-center font-bold text-lg cursor-pointer transition-all duration-200 ease-in-out transform hover:scale-105
              ${incorrectQuadrantType === 'low-unpleasant' ? 'animate-flash-red' : ''}`}
            data-type="low-unpleasant"
            onClick={() => handleQuadrantClick("low-unpleasant")}
          >
            LOW ENERGY<br />UNPLEASANT
          </div>
          <div
            className={`quadrant low-pleasant bg-blue-400 hover:bg-blue-500 text-white p-6 rounded-lg shadow-md flex items-center justify-center text-center font-bold text-lg cursor-pointer transition-all duration-200 ease-in-out transform hover:scale-105
              ${incorrectQuadrantType === 'low-pleasant' ? 'animate-flash-red' : ''}`}
            data-type="low-pleasant"
            onClick={() => handleQuadrantClick("low-pleasant")}
          >
            LOW ENERGY<br />PLEASANT
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes flash-red {
          0% { background-color: var(--tw-bg-opacity, 1) var(--tw-red-400); }
          50% { background-color: var(--tw-bg-opacity, 1) var(--tw-red-600); }
          100% { background-color: var(--tw-bg-opacity, 1) var(--tw-red-400); }
        }
        .animate-flash-red {
          animation: flash-red 0.5s ease-in-out;
        }

        @keyframes fade-in-out {
          0% { opacity: 0; transform: translateY(10px); }
          20% { opacity: 1; transform: translateY(0); }
          80% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-10px); }
        }
        .animate-fade-in-out {
          animation: fade-in-out 1s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
}
