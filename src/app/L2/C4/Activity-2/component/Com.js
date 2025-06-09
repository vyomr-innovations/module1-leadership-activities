"use client";

import React, { useState, useEffect, useRef } from "react";

const audioSource = "https://res.cloudinary.com/dey9w5okl/video/upload/v1732693103/Sound_of_Life__L3C4-_AudioTrimmer.com_hiru63.mp3";


const quizQuestions = [
  {
    id: 1,
    questionText: "1. How many seasons are there in a year?",
    options: [
      { text: "a) Three", value: "a" },
      { text: "b) Four", value: "b" },
      { text: "c) Five", value: "c" },
    ],
    correctAnswer: "b",
  },
  {
    id: 2,
    questionText: "2. What do people enjoy doing in winter?",
    options: [
      { text: "a) Swimming", value: "a" },
      { text: "b) Building snowmen", value: "b" },
      { text: "c) Picking flowers", value: "c" },
    ],
    correctAnswer: "b",
  },
  {
    id: 3,
    questionText: "3. Which season is known for its colorful flowers blooming?",
    options: [
      { text: "a) Summer", value: "a" },
      { text: "b) Spring", value: "b" },
      { text: "c) Fall", value: "c" },
    ],
    correctAnswer: "b",
  },
  {
    id: 4,
    questionText: "4. What is a common summer activity mentioned in the audio?",
    options: [
      { text: "a) Wearing warm clothes", value: "a" },
      { text: "b) Flying kites", value: "b" },
      { text: "c) Having picnics", value: "c" },
    ],
    correctAnswer: "c",
  },
  {
    id: 5,
    questionText: "5. What happens to the leaves during fall?",
    options: [
      { text: "a) They bloom", value: "a" },
      { text: "b) They turn red, orange, and yellow", value: "b" },
      { text: "c) They grow bigger", value: "c" },
    ],
    correctAnswer: "b",
  },
  {
    id: 6,
    questionText: "6. Which season might you enjoy collecting colorful leaves?",
    options: [
      { text: "a) Fall", value: "a" },
      { text: "b) Winter", value: "b" },
      { text: "c) Spring", value: "c" },
    ],
    correctAnswer: "a",
  },
  {
    id: 7,
    questionText: "7. What is a fun activity to do in spring?",
    options: [
      { text: "a) Ice skating", value: "a" },
      { text: "b) Going on nature walks", value: "b" },
      { text: "c) Making hot chocolate", value: "c" },
    ],
    correctAnswer: "b",
  },
  {
    id: 8,
    questionText: "8. What do people wear during summer to stay comfortable?",
    options: [
      { text: "a) Heavy coats", value: "a" },
      { text: "b) Light clothes", value: "b" },
      { text: "c) Boots", value: "c" },
    ],
    correctAnswer: "b",
  },
  {
    id: 9,
    questionText: "9. Which season is perfect for snowball fights?",
    options: [
      { text: "a) Fall", value: "a" },
      { text: "b) Winter", value: "b" },
      { text: "c) Spring", value: "c" },
    ],
    correctAnswer: "b",
  },
  {
    id: 10,
    questionText: "10. Why do people like seasons?",
    options: [
      {
        text: "a) They bring fun activities and changes in nature.",
        value: "a",
      },
      {
        text: "b) They are always the same.",
        value: "b",
      },
      {
        text: "c) They make it hot all the time.",
        value: "c",
      },
    ],
    correctAnswer: "a",
  },
];


export default function AudioQuiz() {
  const audioPlayerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    audioPlayerRef.current = new Audio(audioSource);

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    const audio = audioPlayerRef.current;
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);

    return () => {
      if (audio) {
        audio.pause();
        audio.removeEventListener("play", handlePlay);
        audio.removeEventListener("pause", handlePause);
        audio.removeEventListener("ended", handleEnded);
      }
    };
  }, []);

  const handlePlayPause = () => {
    if (audioPlayerRef.current) {
      if (isPlaying) {
        audioPlayerRef.current.pause();
      } else {
        audioPlayerRef.current.play();
      }
    }
  };

  const handleOptionClick = (questionId, selectedValue) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedValue,
    }));
    if (submitted) {
      setSubmitted(false);
      setScore(null);
    }
  };

  const handleSubmit = () => {
    let currentScore = 0;
    quizQuestions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        currentScore++;
      }
    });
    setScore(currentScore);
    setSubmitted(true);
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
    }
  };

  const getOptionButtonClass = (questionId, optionValue) => {
    const isSelected = selectedAnswers[questionId] === optionValue;
    const question = quizQuestions.find(q => q.id === questionId);
    const isCorrectAnswer = question && question.correctAnswer === optionValue;

    let baseClasses = "option px-3 py-2 rounded-lg font-medium text-base sm:text-lg transition-colors duration-200 ease-in-out border-2";

    if (!submitted) {
      if (isSelected) {
        return `${baseClasses} bg-indigo-500 text-white border-indigo-600 shadow-md`;
      }
      return `${baseClasses} bg-gray-100 text-gray-800 hover:bg-gray-200 border-gray-300`;
    } else {
      if (isSelected) {
        if (isCorrectAnswer) {
          return `${baseClasses} bg-green-500 text-white border-green-600 shadow-md`;
        } else {
          return `${baseClasses} bg-red-500 text-white border-red-600 shadow-md`;
        }
      }
      return `${baseClasses} bg-gray-100 text-gray-800 border-gray-300 opacity-70`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 p-4 sm:p-8 flex flex-col items-center justify-center">
      <div className="container bg-white/90 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-xl border border-blue-200 w-full max-w-3xl text-center">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-6 drop-shadow-sm">
          Listen to the Audio and Answer the Questions
        </h1>

        <div className="mb-6 p-3 bg-gray-50 rounded-xl shadow-inner border border-gray-200">
          <audio controls className="w-full mb-3">
            <source src={audioSource} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
          <div className="flex justify-center gap-3">
            <button
              onClick={handlePlayPause}
              disabled={isPlaying}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1.5 px-5 rounded-full shadow-md transition duration-200 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
            >
              ▶️ Play
            </button>
            <button
              onClick={handlePlayPause}
              disabled={!isPlaying}
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-1.5 px-5 rounded-full shadow-md transition duration-200 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-gray-400 text-sm sm:text-base"
            >
              ⏸️ Pause
            </button>
          </div>
        </div>

        <div className="questions space-y-6 mb-6">
          {quizQuestions.map((q) => (
            <div key={q.id} className="question p-4 bg-gray-50 rounded-xl shadow-md border border-gray-200">
              <p className="text-lg font-semibold text-gray-700 mb-3 text-left">
                {q.questionText}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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

        <button
          onClick={handleSubmit}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2.5 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-purple-400 text-base sm:text-lg"
        >
          Submit
        </button>

        {score !== null && (
          <div className="results mt-6 p-5 bg-blue-50 rounded-xl shadow-inner border border-blue-200">
            <p className="text-xl font-bold text-blue-800">
              You scored {score} out of {quizQuestions.length}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}