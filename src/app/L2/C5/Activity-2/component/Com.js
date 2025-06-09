"use client";
import { useEffect, useRef, useState } from "react";

const data = [
  {
    audio:
      "https://res.cloudinary.com/dey9w5okl/video/upload/v1734175848/Ethan_1_mp3cut.net_npjrpv.mp3"
  }
];

export default function StoryQuestions() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const audioRef = useRef(null);

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
          </>
        ) : (
          <div className="text-xl text-purple-700">Thank you for participating!</div>
        )}
      </div>
    </div>
  );
}
