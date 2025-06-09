"use client";

import React, { useState } from "react";

const steps = [
  {
    title: "C.",
    content:
      "Consider your options.<br>Look at the choices you have: chocolate cake, fruit salad, or ice cream. What do you think about each one? What stands out to you?",
  },
  {
    title: "C.A.",
    content:
      "Analyze the outcomes.<br>Think about what will happen with each choice. How do you think you’ll feel after having chocolate cake? Or maybe fruit salad? What about the ice cream?",
  },
  {
    title: "C.A.R.",
    content:
      "Reflect on your values.<br>This step is about thinking about what's most important to you. Do you care more about taste, health, or maybe how much it costs? This helps you figure out what matters most in your decision.",
  },
  {
    title: "C.A.R.E",
    content:
      "Execute the best choice.<br>Finally, you make your decision! Based on your evaluation, what do you feel is the best choice for you right now?",
  },
];

export default function Com() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const currentStep = steps[currentIndex];
  const isLastStep = currentIndex === steps.length - 1;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#F0F3BD] text-[#05668D]">
      <div className="container text-center max-w-2xl">
        <h1 className="text-4xl font-bold mb-5 text-[#05668D]">C.A.R.E Framework</h1>
        <div className="text-6xl font-bold mb-5 text-[#05668D]">
          {currentStep.title}
        </div>
        <div className="text-lg mb-5 text-[#028090]">
          For example, you have to decide on a snack to eat. What would you
          pick?
        </div>
        <div className="p-5 bg-[#00A896] border border-[#028090] rounded-lg shadow-md mb-5 text-white">
          <p
            className="text-lg m-0"
            dangerouslySetInnerHTML={{ __html: currentStep.content }}
          ></p>
        </div>
        <button
          onClick={handleNext}
          className={`py-3 px-6 text-lg bg-[#02C39A] text-white border-none rounded-md cursor-pointer transition-colors duration-300 ${
            isLastStep ? "opacity-50 cursor-not-allowed" : "hover:bg-[#028090]"
          }`}
          disabled={isLastStep}
        >
          {isLastStep ? "Finished" : "Next"}
        </button>
      </div>
    </div>
  );
}