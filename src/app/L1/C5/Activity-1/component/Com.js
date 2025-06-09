"use client";

import React, { useState, useEffect } from "react";

const images = [
  {
    src: "https://res.cloudinary.com/dey9w5okl/image/upload/v1733801917/Ayesha_Jahagirdar_Create_a_colorful__detailed_image_of_a_busy_park_s_a8b8086e-6292-4c1c-a7b2-80dc5935c6d1_eroczy.jpg",
    questions: [
      "I spy with my little eye something red and round. What is it?",
      "Can you find a dog playing in the park? Where is it hiding?",
      "I spy a yellow flower. Where is it growing?",
      "Look carefully! Can you find a green backpack in the scene?",
      "I spy with my little eye something blue and flying in the air. What is it?",
      "Can you spot a pair of sunglasses in the park? Where are they?",
    ],
  },
  {
    src: "https://res.cloudinary.com/dey9w5okl/image/upload/v1733801229/Ayesha_Jahagirdar_Create_a_cozy_living_room_scene_with_various_house_331d9d6f-c2cd-4a5a-9085-62f26e81176e_kqtp37.jpg",
    questions: [
      "I spy with my little eye something soft and blue. What is it?",
      "Can you find a red toy car? Where is it parked?",
      "I spy a green book. Can you see where it's sitting?",
      "Look carefully! Can you find a clock on the wall? What time does it show?",
      "I spy with my little eye something fluffy and white. What is it?",
      "Can you find a cup on the coffee table? What color is it?",
    ],
  },
  {
    src: "https://res.cloudinary.com/dey9w5okl/image/upload/v1733801228/Official_Account_2025_Account_Create_a_vibrant_and_busy_beach_scene_with_a_wide_dc712147-2588-412c-8dda-ab90aa35804d_iecpvp.jpg",
    questions: [
      "I spy with my little eye something colorful and bouncing on the sand. What is it?",
      "Can you find a sandcastle? Where is it on the beach?",
      "I spy a fish swimming in the water. Where can you see it?",
      "Look around! Can you find a pair of flip-flops? Where are they?",
      "I spy with my little eye something yellow and round. What is it?",
      "Can you find a starfish on the beach? Where is it hiding?",
    ],
  },
  {
    src: "https://res.cloudinary.com/dey9w5okl/image/upload/v1733801228/Ayesha_Jahagirdar_Design_a_classroom_scene_with_desks__bookshelves__745c8b59-b867-4829-97db-d77bc1787090_hzkhcc.jpg",
    questions: [
      "I spy with my little eye something that is red and used for writing. What is it?",
      "Can you find a backpack? What color is it?",
      "I spy a lunchbox. Where is it sitting in the classroom?",
      "Look closely! Can you see a paper airplane flying around? Where is it?",
      "I spy with my little eye something blue and square. What is it?",
      "Can you find a teddy bear in the classroom? Where is it?",
    ],
  },
];

export default function Com() {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isGameComplete, setIsGameComplete] = useState(false);

  useEffect(() => {
    if (gameStarted && !isGameComplete) {
      if (currentImageIndex < images.length) {
        setCurrentImageIndex(currentImageIndex);
        setCurrentQuestionIndex(0);
      } else {
        setIsGameComplete(true);
      }
    }
  }, [gameStarted, currentImageIndex, isGameComplete]);

  const startGame = () => {
    setGameStarted(true);
    setCurrentImageIndex(0);
    setCurrentQuestionIndex(0);
    setIsGameComplete(false);
  };

  const showNextQuestion = () => {
    const nextQuestion = currentQuestionIndex + 1;
    if (nextQuestion < images[currentImageIndex].questions.length) {
      setCurrentQuestionIndex(nextQuestion);
    } else {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const loadNextImage = () => {
    const nextImage = currentImageIndex + 1;
    if (nextImage < images.length) {
      setCurrentImageIndex(nextImage);
      setCurrentQuestionIndex(0);
    } else {
      setIsGameComplete(true);
    }
  };

  const resetGame = () => {
    setGameStarted(false);
    setCurrentImageIndex(0);
    setCurrentQuestionIndex(0);
    setIsGameComplete(false);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6 mt-8 text-gray-800">
        Welcome to the I Spy Game!
      </h1>

      {!gameStarted && !isGameComplete && (
        <button
          onClick={startGame}
          className="px-6 py-3 bg-blue-500 text-white rounded-md text-lg hover:bg-blue-600 transition-colors duration-300"
        >
          Start
        </button>
      )}

      {gameStarted && !isGameComplete && (
        <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg flex flex-col items-center mt-5">
          <img
            id="image"
            src={images[currentImageIndex]?.src}
            alt="I Spy Image"
            className="w-4/5 h-auto rounded-md border-2 border-gray-300 mb-4"
          />
          <div id="question" className="text-xl text-gray-800 mb-6 text-center">
            {images[currentImageIndex]?.questions[currentQuestionIndex]}
          </div>

          {currentQuestionIndex < images[currentImageIndex].questions.length - 1 && (
            <button
              onClick={showNextQuestion}
              className="px-6 py-3 bg-green-500 text-white rounded-md text-lg hover:bg-green-600 transition-colors duration-300 mb-4"
            >
              I Spy
            </button>
          )}

          {currentQuestionIndex === images[currentImageIndex].questions.length - 1 && (
            <button
              onClick={loadNextImage}
              className="px-6 py-3 bg-purple-500 text-white rounded-md text-lg hover:bg-purple-600 transition-colors duration-300 mb-4"
            >
              Next Image
            </button>
          )}
        </div>
      )}

      {isGameComplete && (
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg flex flex-col items-center mt-5 text-center">
          <p className="text-2xl font-semibold text-gray-800 mb-6">
            You've completed all the images!
          </p>
          <button
            onClick={resetGame}
            className="px-6 py-3 bg-blue-500 text-white rounded-md text-lg hover:bg-blue-600 transition-colors duration-300"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}