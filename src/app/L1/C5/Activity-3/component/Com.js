"use client";
import { useEffect, useRef, useState } from "react";

const data = [
  {
    audio:
      "https://res.cloudinary.com/dey9w5okl/video/upload/v1734167931/Charlie_1_xhn7xw.mp3",
    question: "What should Charlie do next? Why?",
  },
  {
    audio:
      "https://res.cloudinary.com/dey9w5okl/video/upload/v1734167931/Charlie_2_so4d0e.mp3",
    question: "Should Charlie leave the tap running or turn it off while brushing? Why?",
  },
  {
    audio:
      "https://res.cloudinary.com/dey9w5okl/video/upload/v1734167932/Charlie_3_fgnmsb.mp3",
    question: "How can Charlie take better care of his toys?",
  },
  {
    audio:
      "https://res.cloudinary.com/dey9w5okl/video/upload/v1734167931/Charlie_4_tlezwd.mp3",
    question: "What else can Charlie do to help at home?",
  },
];

export default function StoryQuestions() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showQuestion, setShowQuestion] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const handleEnded = () => setShowQuestion(true);
    const audioEl = audioRef.current;
    if (audioEl) {
      audioEl.addEventListener("ended", handleEnded);
      return () => audioEl.removeEventListener("ended", handleEnded);
    }
  }, [currentIndex]);

  const handleNext = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < data.length) {
      setCurrentIndex(nextIndex);
      setShowQuestion(false);
      audioRef.current.load();
      audioRef.current.play();
    } else {
      setIsFinished(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-emerald-50 text-center p-4">
      <div className="max-w-xl w-full bg-blue-100 rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-purple-600 mb-4">Listen to the Story</h1>
        {!isFinished ? (
          <>
            <audio ref={audioRef} controls className="w-full my-4">
              <source src={data[currentIndex].audio} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
            {showQuestion && (
              <div className="text-lg text-purple-700 mb-4">
                {data[currentIndex].question}
              </div>
            )}
            {showQuestion && (
              <button
                onClick={handleNext}
                className="bg-purple-600 hover:bg-purple-800 text-white px-4 py-2 rounded transition"
              >
                Next
              </button>
            )}
          </>
        ) : (
          <div className="text-xl text-purple-700">Thank you for participating!</div>
        )}
      </div>
    </div>
  );
}
