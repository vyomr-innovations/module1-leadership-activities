"use client";

import React, { useState } from "react";

const steps = [
  {
    title: "C.",
    content:
      "<strong style='color:white; font-size:32px; '>Consider your options.</strong><br><p style='font-size:22px;'>Look at the choices you have: chocolate cake, fruit salad, or ice cream. What do you think about each one? What stands out to you?</p>",
  },
  {
    title: "C.A.",
    content:
      "<strong style='color:white; font-size:32px; '>Analyze the outcomes.</strong><br><p style='font-size:22px;'>Think about what will happen with each choice. How do you think you’ll feel after having chocolate cake? Or maybe fruit salad? What about the ice cream?</p>",
  },
  {
    title: "C.A.R.",
    content:
      "<strong style='color:white; font-size:32px; '>Reflect on your values.</strong><br><p style='font-size:22px;'>This step is about thinking about what's most important to you. Do you care more about taste, health, or maybe how much it costs? This helps you figure out what matters most in your decision.</p>",
  },
  {
    title: "C.A.R.E",
    content:
      "<strong style='color:white; font-size:32px; '>Execute the best choice.</strong><br><p style='font-size:22px; margin-top:20px'>Finally, you make your decision! Based on your evaluation, what do you feel is the best choice for you right now?</p>",
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
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#F0F3BD] text-[#05668D]">
      <div className="container text-center max-w-2xl">
        {/* Main Title */}
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-10 text-[#023047]">
          C.A.R.E Framework
        </h1>

        {/* Step Title */}
        <div className="text-5xl sm:text-6xl font-bold text-[#05668D] mb-4">
          {currentStep.title}
        </div>

        {/* Intro Sentence */}
        <div className="text-2xl font-medium mb-6 text-[#028090]">
          For example, you have to decide on a snack to eat. What would you pick?
        </div>

        {/* Step Content */}
        <div className="p-6 bg-[#036d62] border border-[#028090] rounded-lg shadow-md mb-8 text-white text-left">
          <div
            className="text-lg leading-relaxed"
            dangerouslySetInnerHTML={{ __html: currentStep.content }}
          ></div>
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className={`py-3 px-7 text-lg font-semibold bg-[#036d62] text-white rounded-md transition-all duration-300 ${
            isLastStep
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-[#028090] hover:shadow-lg"
          }`}
          disabled={isLastStep}
        >
          {isLastStep ? "Finished" : "Next"}
        </button>
      </div>
    </div>
  );
}
