"use client";

import { useEffect, useRef, useState } from "react";

const data = [
  {
    audio:
      "https://res.cloudinary.com/dey9w5okl/video/upload/v1734175848/Ethan_1_mp3cut.net_npjrpv.mp3",
    question: "Why was Ethan not able to find his shoes?",
  },
  {
    audio:
      "https://res.cloudinary.com/dey9w5okl/video/upload/v1734175752/Ethan_2_o7jscs.mp3",
    question: "What does being responsible mean?",
  },
  {
    audio:
      "https://res.cloudinary.com/dey9w5okl/video/upload/v1734176268/Ethan_3_mp3cut.net_wbi75f.mp3",
    question:
      "Why did Ethan’s game improve after he started taking care of his things?",
  },
  {
    audio:
      "https://res.cloudinary.com/dey9w5okl/video/upload/v1734176378/Ethan_4_mp3cut.net_cej7nk.mp3",
    question:
      "What would have happened if Ethan kept leaving his shoes all over the place?",
  },
];
export default function StoryQuestions() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showQuestion, setShowQuestion] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const audioRef = useRef(null); // ✅ CORRECT: initialized as `null`

  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      const handleEnded = () => {
        setShowQuestion(true);
      };

      audio.addEventListener("ended", handleEnded);

      return () => {
        audio.removeEventListener("ended", handleEnded);
      };
    }
  }, [currentIndex]);

  const handleNext = () => {
    if (currentIndex + 1 < data.length) {
      setCurrentIndex(currentIndex + 1);
      setShowQuestion(false);

      const audio = audioRef.current;
      if (audio) {
        audio.load();
        audio.play();
      }
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
              <>
                <p className="text-lg text-purple-700 mb-4">
                  {data[currentIndex].question}
                </p>
                <button
                  onClick={handleNext}
                  className="bg-purple-600 hover:bg-purple-800 text-white px-6 py-2 rounded-lg shadow-md"
                >
                  Next
                </button>
              </>
            )}
          </>
        ) : (
          <p className="text-xl text-purple-700">Thank you for participating!</p>
        )}
      </div>
    </div>
  );
}
