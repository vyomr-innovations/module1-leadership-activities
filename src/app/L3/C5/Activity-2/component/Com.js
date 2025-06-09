
"use client";
import React, { useState } from "react";

const scenes = [
  {
    id: "scene1",
    src: "https://res.cloudinary.com/dey9w5okl/image/upload/v1734180918/Official_Account_2025_Account_Generate_an_image_of_a_13_year_old_girl_in_a__scie_0a661597-397c-4c93-9296-06671b018ef1_gkxtjx.jpg",
    title: "Scene 1",
    description: "Fiona has delayed working on a science project. She rushes to complete it in one night and feels stressed.",
  },
  {
    id: "scene2",
    src: "https://res.cloudinary.com/dey9w5okl/image/upload/v1734180763/Official_Account_2025_Account_Generate_an_image_of_a_13_year_old_boy_completing_39dfff39-692c-46cd-b1ba-d575b865df97_ewbgfw.jpg",
    title: "Scene 2",
    description: "Hank works on the project since it was announced. He finishes it on time and feels proud of his work.",
  },
  {
    id: "scene3",
    src: "https://res.cloudinary.com/dey9w5okl/image/upload/v1734181475/2759f1e2-a90b-4a42-b7e9-04bbbdf57d2d_dkrqxj.jpg",
    title: "Scene 3",
    description: "Rossa gets a birthday gift a day before the party.",
  },
  {
    id: "scene4",
    src: "https://res.cloudinary.com/dey9w5okl/image/upload/v1734181473/a3b2c9e2-8853-4bc9-b003-0e8045bf3658_j2avvy.jpg",
    title: "Scene 4",
    description: "Raymond rushed to get it just before the party. Now, he's worried that he didn't put enough thought into buying it.",
  },
];

export default function SceneSwitcher() {
  const [showFirstSet, setShowFirstSet] = useState(true);

  const handleNextClick = () => {
    setShowFirstSet(false); // When "Next" is clicked, show the second set
  };

  const currentScenes = showFirstSet ? [scenes[0], scenes[1]] : [scenes[2], scenes[3]];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 p-4 sm:p-8 flex flex-col items-center justify-center font-sans">
      <div className="container bg-white/90 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-xl border border-purple-200 w-full max-w-4xl text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-8 drop-shadow-sm">
          Positive and Negative Impact
        </h1>

        <div className="scene-container flex flex-col md:flex-row justify-around items-start md:items-center gap-6 mb-4 mt-2">
          {currentScenes.map((scene) => (
            <div key={scene.id} className="scene-item w-full md:w-5/12 flex flex-col items-center">
              <img
                src={scene.src}
                alt={scene.title}
                className="w-full h-auto object-cover rounded-lg shadow-md border border-gray-200 mb-2"
              />
              <div className="scene-caption w-full text-center mt-2">
                <h5 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">{scene.title}</h5>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed">{scene.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="button-container text-center mt-0">
          {showFirstSet && ( // Only show "Next" button if the first set is active
            <button
              onClick={handleNextClick}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-10 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-400 text-lg"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}