"use client"; 

import React, { useState, useEffect, useRef } from "react";


const audioSource = "https://res.cloudinary.com/dey9w5okl/video/upload/v1732876768/School_Of_Life_Title__The-_AudioTrimmer.com_ofjd6d.mp3";

// Quiz questions data
const quizQuestions = [
  {
    id: 1,
    questionText: "1. What is the name of the bee in the story?",
    options: [
      { text: "a) Buzzy", value: "a" },
      { text: "b) Buzz", value: "b" },
      { text: "c) Beezy", value: "c" },
    ],
    correctAnswer: "b",
  },
  {
    id: 2,
    questionText: "2. What color was the first flower Buzz visited?",
    options: [
      { text: "a) Red", value: "a" },
      { text: "b) Yellow", value: "b" },
      { text: "c) Blue", value: "c" },
    ],
    correctAnswer: "a",
  },
  {
    id: 3,
    questionText: "3. Why did Buzz collect nectar?",
    options: [
      { text: "a) To make honey", value: "a" },
      { text: "b) To eat it himself", value: "b" },
      { text: "c) To decorate his hive", value: "c" },
    ],
    correctAnswer: "a",
  },
  {
    id: 4,
    questionText: "4. What season was Buzz preparing for?",
    options: [
      { text: "a) Summer", value: "a" },
      { text: "b) Winter", value: "b" },
      { text: "c) Spring", value: "c" },
    ],
    correctAnswer: "b",
  },
  {
    id: 5,
    questionText: "5. How did Buzz feel while working?",
    options: [
      { text: "a) Sad", value: "a" },
      { text: "b) Angry", value: "b" },
      { text: "c) Happy", value: "c" },
    ],
    correctAnswer: "c",
  },
];

export default function Com() {
  const audioPlayerRef = useRef(null); // Ref to hold the HTMLAudioElement
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // Stores answers: { questionId: selectedValue }
  const [score, setScore] = useState(null); // Null before submission, number after
  const [submitted, setSubmitted] = useState(false); // True after submit button is clicked

  // Initialize audio player on component mount
  useEffect(() => {
    audioPlayerRef.current = new Audio(audioSource);

    // Event listeners for audio player state
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    const audio = audioPlayerRef.current;
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);

    // Cleanup function: pause audio and remove listeners when component unmounts
    return () => {
      if (audio) {
        audio.pause();
        audio.removeEventListener("play", handlePlay);
        audio.removeEventListener("pause", handlePause);
        audio.removeEventListener("ended", handleEnded);
      }
    };
  }, []); // Empty dependency array means this runs once on mount

  // Handle play/pause button clicks
  const handlePlayPause = () => {
    if (audioPlayerRef.current) {
      if (isPlaying) {
        audioPlayerRef.current.pause();
      } else {
        audioPlayerRef.current.play();
      }
    }
  };

  // Handle option selection
  const handleOptionClick = (questionId, selectedValue) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedValue,
    }));
    // **Allow re-trying:** If user changes an answer, reset submission state
    if (submitted) {
      setSubmitted(false);
      setScore(null); // Clear score if they're re-attempting
    }
  };

  // Handle quiz submission
  const handleSubmit = () => {
    let currentScore = 0;
    quizQuestions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        currentScore++;
      }
    });
    setScore(currentScore);
    setSubmitted(true); // Mark quiz as submitted
    // Stop audio on submission
    if (audioPlayerRef.current) {
        audioPlayerRef.current.pause();
    }
  };

  // Helper function to get option button class based on state
  const getOptionButtonClass = (questionId, optionValue) => {
    const isSelected = selectedAnswers[questionId] === optionValue;
    const question = quizQuestions.find(q => q.id === questionId);
    const isCorrectAnswer = question && question.correctAnswer === optionValue;

    let baseClasses = "option px-3 py-2 rounded-lg font-medium text-base sm:text-lg transition-colors duration-200 ease-in-out border-2"; // Adjusted text sizes

    if (!submitted) {
      // Before submission: highlight selected
      if (isSelected) {
        return `${baseClasses} bg-indigo-500 text-white border-indigo-600 shadow-md`;
      }
      return `${baseClasses} bg-gray-100 text-gray-800 hover:bg-gray-200 border-gray-300`;
    } else {
      // After submission: show correct/incorrect for the *selected* answer only
      if (isSelected) {
        if (isCorrectAnswer) {
          return `${baseClasses} bg-green-500 text-white border-green-600 shadow-md`;
        } else {
          return `${baseClasses} bg-red-500 text-white border-red-600 shadow-md`;
        }
      }
      // Default for unselected answers after submission
      return `${baseClasses} bg-gray-100 text-gray-800 border-gray-300 opacity-70`;
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 p-4 sm:p-8 flex flex-col items-center justify-center">
      <div className="container bg-white/90 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-xl border border-blue-200 w-full max-w-3xl text-center"> {/* Adjusted padding */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-6 drop-shadow-sm"> {/* Adjusted text size */}
          Listen to the Audio and Answer the Questions
        </h1>

        {/* Audio Player Section */}
        <div className="mb-6 p-3 bg-gray-50 rounded-xl shadow-inner border border-gray-200"> {/* Adjusted padding/margin */}
          <audio controls className="w-full mb-3"> {/* Adjusted margin */}
            <source src={audioSource} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
          <div className="flex justify-center gap-3"> {/* Adjusted gap */}
            <button
              onClick={handlePlayPause}
              disabled={isPlaying}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1.5 px-5 rounded-full shadow-md transition duration-200 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base" /* Adjusted text/padding */
            >
              ▶️ Play
            </button>
            <button
              onClick={handlePlayPause}
              disabled={!isPlaying}
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-1.5 px-5 rounded-full shadow-md transition duration-200 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-gray-400 text-sm sm:text-base" /* Adjusted text/padding */
            >
              ⏸️ Pause
            </button>
          </div>
        </div>

        {/* Questions Section */}
        <div className="questions space-y-6 mb-6"> {/* Adjusted spacing/margin */}
          {quizQuestions.map((q) => (
            <div key={q.id} className="question p-4 bg-gray-50 rounded-xl shadow-md border border-gray-200"> {/* Adjusted padding */}
              <p className="text-lg font-semibold text-gray-700 mb-3 text-left"> {/* Adjusted text size */}
                {q.questionText}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2"> {/* Adjusted gap */}
                {q.options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleOptionClick(q.id, option.value)}
                    className={getOptionButtonClass(q.id, option.value)}
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2.5 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-purple-400 text-base sm:text-lg" /* Adjusted text/padding */
        >
          Submit
        </button>

        {/* Result Section */}
        {score !== null && (
          <div className="results mt-6 p-5 bg-blue-50 rounded-xl shadow-inner border border-blue-200"> {/* Adjusted spacing/padding */}
            <p className="text-xl font-bold text-blue-800"> {/* Adjusted text size */}
              You scored {score} out of {quizQuestions.length}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}