"use client";

import React, { useState } from "react";

const images = [
  "https://res.cloudinary.com/dey9w5okl/image/upload/v1734027307/Untitled_design_chwxoc.png",
  "https://res.cloudinary.com/dey9w5okl/image/upload/v1734064897/2872062_7110_v7wkhk.jpg",
  "https://res.cloudinary.com/dey9w5okl/image/upload/v1734064903/3783955_2001671_mayiav.jpg",
  "https://res.cloudinary.com/dey9w5okl/image/upload/v1734064896/23908326_6785156_m2ze1s.jpg",
  "https://res.cloudinary.com/dey9w5okl/image/upload/v1734027307/Untitled_design_chwxoc.png",
];

const story = {
  start: {
    text: `You’re an adventurous young explorer named Alex. One sunny afternoon, you’re walking through Maplewood Forest when you stumble upon an old, dusty map sticking out from beneath a pile of leaves. The map looks ancient, and it shows a path leading to a hidden treasure deep inside the forest!<br><br>Do you go:<br>Left, where the path is dark and mysterious, with vines hanging from the trees?<br>Right, where the path is sunny and you can see a sparkling stream nearby?`,
    choices: {
      left: "darkPath",
      right: "sunnyPath",
    },
  },
  darkPath: {
    text: `You step cautiously down the dark path. The air gets cooler, and the trees loom overhead like giants. After a short walk, you find a strange glowing rock in the middle of the path. It looks magical. Do you touch it or walk past it?`,
    choices: {
      touch: "glowingRock",
      walk: "walkPastRock",
    },
  },
  glowingRock: {
    text: `The moment your fingers make contact, the ground begins to rumble! Suddenly, a secret door opens in the ground, and a staircase leads down into a hidden underground cave. At the bottom of the stairs, you see two large doors: one made of shining gold and the other covered in ancient symbols.`,
    choices: {
      gold: "goldDoor",
      symbols: "symbolsDoor",
    },
  },
  goldDoor: {
    text: `You step into a grand chamber filled with glittering gold, jewels, and treasures. As you approach the largest chest, you hear a faint whisper warning, *"Choose wisely, for greed ends poorly."* Do you open the chest or leave the treasure behind?`,
    choices: {
      open: "openChest",
      leave: "leaveTreasure",
    },
  },
  openChest: {
    text: `The treasure transforms into a cloud of dust, revealing a guardian spirit who declares, *"Only the humble may receive true rewards."* You’re transported back to the forest, empty-handed but with a valuable lesson.`,
    choices: {},
  },
  leaveTreasure: {
    text: `The spirit appears and rewards you with a single, magical artifact—a map to greater adventures.`,
    choices: {},
  },
  symbolsDoor: {
    text: `You enter a mystical library with ancient books and artifacts. A glowing book floats toward you, showing visions of untold adventures and secrets. Do you read the book or leave it untouched?`,
    choices: {
      read: "readBook",
      close: "closeBook",
    },
  },
  readBook: {
    text: `You gain ancient wisdom and the ability to navigate to treasures anywhere. However, you must now protect the library for future explorers.`,
    choices: {},
  },
  closeBook: {
    text: `The library vanishes, and you find a glowing compass outside the cave—a tool to guide you to hidden wonders.`,
    choices: {},
  },
  walkPastRock: {
    text: `You decide it might be too dangerous to touch the rock and continue down the path. Unfortunately, the path ends abruptly at a cliff, and you have no choice but to turn back.`,
    choices: {},
  },
  sunnyPath: {
    text: `You follow the sunny path until you reach a peaceful, sparkling stream. As you walk alongside it, you hear soft footsteps behind you. Turning around, you see an old woman with a kind smile. She holds out a small, wooden box.`,
    choices: {
      take: "takeBox",
      refuse: "refuseBox",
    },
  },
  takeBox: {
    text: `The old woman smiles and says, “This box will help you on your journey, but you must use it wisely.” When you open the box, you find a glowing key. She tells you the key will open a door to the treasure but only if you follow your heart.`,
    choices: {
      key: "treasureDoor",
      back: "turnBack",
    },
  },
  treasureDoor: {
    text: `You find a large, mysterious door hidden among the trees. Using the glowing key, the door creaks open to reveal a lush, enchanted garden filled with rare flowers and an ethereal glow. A fountain at the center holds a sparkling chalice. Do you drink from the chalice or leave the garden untouched?`,
    choices: {
      drink: "drinkChalice",
      leave: "leaveGarden",
    },
  },
  drinkChalice: {
    text: `You gain the gift of understanding nature's secrets but can never leave the garden.`,
    choices: {},
  },
  leaveGarden: {
    text: `The chalice transforms into a golden bird that guides you to a treasure-filled glade beyond the forest.`,
    choices: {},
  },
  refuseBox: {
    text: `You politely refuse the box and continue on your way. However, you can’t help but wonder what might have been inside.`,
    choices: {},
  },
  turnBack: {
    text: `You decide the door might be locked for a reason and turn back. Perhaps the treasure wasn’t meant to be found.`,
    choices: {},
  },
};

export default function Com() {
  const [currentSceneKey, setCurrentSceneKey] = useState("start");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const scene = story[currentSceneKey];

  const handleChoice = (nextSceneKey) => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    setCurrentSceneKey(nextSceneKey);
  };

  const handleRestart = () => {
    setCurrentSceneKey("start");
    setCurrentImageIndex(0);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#f8f4e3] font-sans">
      <div className="story-container flex-2 p-5 bg-amber-50 shadow-md overflow-y-auto text-gray-800 text-shadow-sm">
        <p className="text-lg leading-relaxed mb-5" dangerouslySetInnerHTML={{ __html: scene.text }}></p>
        <div>
          <img
            id="storyimage"
            src={images[currentImageIndex]}
            alt="Story Image"
            className="block mx-auto w-[450px] object-cover rounded-3xl border-2 border-green-600 shadow-md"
          />
        </div>
      </div>
      <div className="choices-container flex-1 p-5 bg-green-100 flex flex-col items-center gap-4">
        {Object.keys(scene.choices).length === 0 ? (
          <button
            onClick={handleRestart}
            className="bg-green-600 text-white border-none py-4 px-5 text-base cursor-pointer rounded-md transition-all duration-300 ease-in-out shadow-md hover:bg-green-700 hover:scale-105"
          >
            Restart
          </button>
        ) : (
          Object.entries(scene.choices).map(([choiceText, nextSceneKey]) => (
            <button
              key={choiceText}
              onClick={() => handleChoice(nextSceneKey)}
              className="bg-green-600 text-white border-none py-4 px-5 text-base cursor-pointer rounded-md transition-all duration-300 ease-in-out shadow-md hover:bg-green-700 hover:scale-105"
            >
              Choose to {choiceText}
            </button>
          ))
        )}
      </div>
    </div>
  );
}