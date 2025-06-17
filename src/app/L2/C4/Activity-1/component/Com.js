"use client";

import React, { useState, useEffect, useRef } from "react";

const quizSounds = [
  {
    audio: "https://res.cloudinary.com/dey9w5okl/video/upload/v1750182858/audios/lion.mp3",
    question: "What sound is this",
    options: ["Elephant", "Lion"],
    correct: "Lion"
  },
  {
    audio: "https://res.cloudinary.com/dey9w5okl/video/upload/v1750182967/audios/guitar.mp3",
    question: "What sound is this",
    options: ["Guitar", "Violin"],
    correct: "Guitar"
  },
  {
    audio: "https://res.cloudinary.com/dey9w5okl/video/upload/v1750182895/audios/ocean.mp3",
    question: "What sound is this",
    options: ["Rain", "Ocean"],
    correct: "Ocean"
  },
  {
    audio: "https://res.cloudinary.com/dey9w5okl/video/upload/v1750182931/audios/train.mp3",
    question: "What sound is this",
    options: ["Train", "Car"],
    correct: "Train"
  },
  {
    audio: "https://res.cloudinary.com/dey9w5okl/video/upload/v1750183007/audios/nightingale.mp3",
    question: "What sound is this",
    options: ["Crow", "Nightingale"],
    correct: "Nightingale"
  },
  {
    audio: "https://res.cloudinary.com/dey9w5okl/video/upload/v1750182684/audios/drums.mp3",
    question: "What sound is this?",
    options: ["Drum", "guiter"],
    correct: "Drum",
  },
  {
    audio:
      "https://res.cloudinary.com/dey9w5okl/video/upload/v1732604365/rooster_tw38jb.mp3",
    question: "What sound is this?",
    options: ["Rooster", "Pigeon"],
    correct: "Rooster",
  },
  {
    audio:
      "https://res.cloudinary.com/dey9w5okl/video/upload/v1732604396/Sheep_oqlior.mp3",
    question: "What sound is this?",
    options: ["Sheep", "Horse"],
    correct: "Sheep",
  },
  {
    audio:
      "https://res.cloudinary.com/dey9w5okl/video/upload/v1732604914/Ambulance_krgf0n.mp3",
    question: "Guess the sound",
    options: ["Icecream Truck", "Ambulance"],
    correct: "Ambulance",
  },
  {
    audio:
      "https://res.cloudinary.com/dey9w5okl/video/upload/v1732690236/Rain_kptzpy.mp3",
    question: "Guess the sound",
    options: ["Rain", "Earthquake"],
    correct: "Rain",
  },
  {
    audio:
      "https://res.cloudinary.com/dey9w5okl/video/upload/v1732690300/22606_aeroplane_close_flyby-full_yrdial.mp3",
    question: "Guess the sound",
    options: ["Rocket", "Aeroplane"],
    correct: "Aeroplane",
  },
  {
    audio:
      "https://res.cloudinary.com/dey9w5okl/video/upload/v1732690367/Mixer_bfcmju.mp3",
    question: "Guess the sound",
    options: ["Mixer grinder", "Washing machine"],
    correct: "Mixer grinder",
  },
  {
    audio:
      "https://res.cloudinary.com/dey9w5okl/video/upload/v1732690471/LDj_Audio_-_Thunder_Strike_Mp3_unineo.mp3",
    question: "Guess the sound",
    options: ["Train", "Thunder"],
    correct: "Thunder",
  },
];

export default function SoundQuizNoLibs() {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("text-gray-700");
  const [showConfetti, setShowConfetti] = useState(false);
  const [gameFinished, setGameFinished] = useState(false); // New state to track if game finished

  const audioRef = useRef(null);
  const soundTimeoutRef = useRef(null);

  // Effect to handle audio playback and cleanup
  useEffect(() => {
    const cleanupAudio = () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
      if (soundTimeoutRef.current) {
        clearTimeout(soundTimeoutRef.current);
      }
    };

    if (gameStarted && currentSlideIndex < quizSounds.length) {
      const sound = quizSounds[currentSlideIndex];
      audioRef.current = new Audio(sound.audio);
      setMessage("Listen carefully to the sound.");
      setMessageColor("text-gray-700");
    } else if (!gameStarted && gameFinished) {
      cleanupAudio();
    }

    return cleanupAudio;
  }, [gameStarted, currentSlideIndex, gameFinished]);

  // Effect to manage confetti visibility
  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  const handlePlaySound = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setMessage("");
      setMessageColor("text-gray-700");

      soundTimeoutRef.current = setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.pause();
        }
        setMessage("⏹️ The sound has stopped after 30 seconds.");
        setMessageColor("text-orange-500");
      }, 30000);
    }
  };

  const handleStopSound = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    if (soundTimeoutRef.current) {
      clearTimeout(soundTimeoutRef.current);
    }
    setMessage("⏸️ Sound stopped.");
    setMessageColor("text-blue-500");
  };

  const handleOptionClick = (isCorrect) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    if (soundTimeoutRef.current) {
      clearTimeout(soundTimeoutRef.current);
    }

    if (isCorrect) {
      setMessage("🎉 Correct! Moving to the next sound...");
      setMessageColor("text-green-600 font-bold");
      setShowConfetti(true);

      setTimeout(() => {
        if (currentSlideIndex < quizSounds.length - 1) {
          setCurrentSlideIndex((prevIndex) => prevIndex + 1);
        } else {
          setGameStarted(false);
          setGameFinished(true);
          setMessage("🎉 You finished the game! 🎉");
          setMessageColor("text-purple-700 text-3xl font-extrabold");
        }
      }, 1500);
    } else {
      setMessage("❌ Wrong! Try again.");
      setMessageColor("text-red-600 font-bold");
    }
  };

  // Render content based on game state
  if (!gameStarted) {
    return (
      <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-300 p-4 overflow-hidden">
        {showConfetti && <ConfettiOverlay />}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white drop-shadow-lg mb-8 text-center animate-pulse">
          Sound Quiz Game
        </h1>

        {/* Conditionally render the Play Game button or the "Game Finished" message */}
        {gameFinished ? (
          <p className={`${messageColor} mt-8 text-center`}>
            {message}
          </p>
        ) : (
          <button
            onClick={() => {
              setGameStarted(true);
              setCurrentSlideIndex(0);
              setMessage("");
              setMessageColor("text-gray-700");
              setGameFinished(false);
              setShowConfetti(false);
            }}
            className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-4 px-10 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-400 text-xl flex items-center gap-3"
          >
            <span role="img" aria-label="Play Game">
              🎵
            </span>{" "}
            Play Game
          </button>
        )}
      </div>
    );
  }

  // If game is started and not finished
  const currentSound = quizSounds[currentSlideIndex];

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-300 p-4 overflow-hidden">
      {showConfetti && <ConfettiOverlay />}
      <div className="bg-white/90 backdrop-blur-sm p-6 sm:p-10 rounded-2xl shadow-xl border border-blue-100 w-full max-w-md text-center">
        <p className={`text-xl sm:text-2xl font-semibold mb-6 ${messageColor}`}>
          {message}
        </p>

        <div className="controls flex justify-center gap-4 mb-6">
          <button
            onClick={handlePlaySound}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full shadow-md transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg flex items-center gap-2"
          >
            ▶️ Play
          </button>
          <button
            onClick={handleStopSound}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-full shadow-md transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 text-lg flex items-center gap-2"
          >
            ⏸️ Stop
          </button>
        </div>

        <p className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8">
          {currentSound.question}
        </p>

        <div className="options grid grid-cols-1 sm:grid-cols-2 gap-4">
          {currentSound.options.map((option) => (
            <button
              key={option}
              onClick={() => handleOptionClick(option === currentSound.correct)}
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-4 px-6 rounded-xl shadow-md transition duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-lg"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- Confetti Component (Pure CSS Animation) ---
const ConfettiOverlay = () => {
  const confettiColors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500'];
  const animationVariants = ['animate-confetti', 'animate-confetti-fast', 'animate-confetti-slow', 'animate-confetti-delay-1', 'animate-confetti-delay-2'];

  const getRandomColor = () => confettiColors[Math.floor(Math.random() * confettiColors.length)];
  const getRandomAnimation = () => animationVariants[Math.floor(Math.random() * animationVariants.length)];

  const confettiPieces = Array.from({ length: 50 }).map((_, i) => (
    <div
      key={i}
      className={`absolute w-3 h-3 rounded-full opacity-0 ${getRandomColor()} ${getRandomAnimation()}`}
      style={{ left: `${Math.random() * 100}%`, top: '-10%' }}
    />
  ));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-50">
      {confettiPieces}
    </div>
  );
};