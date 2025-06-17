'use client';

import { useEffect, useRef, useState } from "react";

const coreEmotions = [
  { name: "Anger", style: "top-[45%] left-[70%]" },
  { name: "Fear", style: "top-[65%] left-[55%]" },
  { name: "Joy", style: "top-[65%] left-[35%]" },
  { name: "Sadness", style: "top-[45%] left-[15%]" },
  { name: "Love", style: "top-[20%] left-[30%]" },
  { name: "Surprise", style: "top-[20%] left-[64%]" },
];

export default function FeelingsWheel() {
  const wheelRef = useRef(null);
  const coreRefs = useRef({});
  const [dragged, setDragged] = useState(null);
  const usedPositions = useRef({});
  const coreAngles = useRef({});
  const [placedFeelingsCount, setPlacedFeelingsCount] = useState({});
  const [showCelebration, setShowCelebration] = useState(false);

  const [feelingsDataState, setFeelingsDataState] = useState(() => ({
    Anger: [
      { name: "Mad", intensity: "high" },
      { name: "Jealous", intensity: "medium" },
      { name: "Annoyed", intensity: "low" },
      { name: "Frustrated", intensity: "medium" },
      { name: "Irritated", intensity: "high" },
      { name: "Upset", intensity: "low" },
    ],
    Fear: [
      { name: "Terrified", intensity: "high" },
      { name: "Anxious", intensity: "medium" },
      { name: "Worried", intensity: "low" },
      { name: "Nervous", intensity: "high" },
      { name: "Apprehensive", intensity: "medium" },
      { name: "Panicked", intensity: "low" },
    ],
    Joy: [
      { name: "Content", intensity: "low" },
      { name: "Excited", intensity: "medium" },
      { name: "Elated", intensity: "high" },
      { name: "Proud", intensity: "medium" },
      { name: "Satisfied", intensity: "low" },
      { name: "Ecstatic", intensity: "high" },
    ],
    Sadness: [
      { name: "Heartbroken", intensity: "high" },
      { name: "Disappointed", intensity: "medium" },
      { name: "Down", intensity: "low" },
      { name: "Lonely", intensity: "medium" },
      { name: "Grieving", intensity: "high" },
      { name: "Blue", intensity: "low" },
    ],
    Love: [
      { name: "Cherished", intensity: "high" },
      { name: "Affectionate", intensity: "medium" },
      { name: "Liked", intensity: "low" },
      { name: "Adored", intensity: "medium" },
      { name: "Passionate", intensity: "high" },
      { name: "Caring", intensity: "low" },
    ],
    Surprise: [
      { name: "Amazed", intensity: "high" },
      { name: "Startled", intensity: "medium" },
      { name: "Curious", intensity: "low" },
      { name: "Intrigued", intensity: "medium" },
      { name: "Shocked", intensity: "high" },
      { name: "Puzzled", intensity: "low" },
    ],
  }));

  useEffect(() => {
    // Initialize placedFeelingsCount for each core emotion
    const initialCounts = {};
    coreEmotions.forEach(emotion => {
      initialCounts[emotion.name] = 0;
    });
    setPlacedFeelingsCount(initialCounts);
  }, []);


  const handleDragStart = (e, feeling) => {
    setDragged(feeling);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const targetCore = dragged.core;
    const wheel = wheelRef.current;
    const core = coreRefs.current[targetCore];
    if (!wheel || !core) return;

    const coreRect = core.getBoundingClientRect();
    const wheelRect = wheel.getBoundingClientRect();
    const coreX = coreRect.left + coreRect.width / 2 - wheelRect.left;
    const coreY = coreRect.top + coreRect.height / 2 - wheelRect.top;

    if (!coreAngles.current[targetCore]) coreAngles.current[targetCore] = 0;
    if (!usedPositions.current[targetCore]) usedPositions.current[targetCore] = [];

    const radius = 35;
    let angle, x, y;
    let attempts = 0;
    do {
      angle = coreAngles.current[targetCore];
      coreAngles.current[targetCore] += (Math.PI * 2) / 8;
      x = coreX + radius * Math.cos(angle);
      y = coreY + radius * Math.sin(angle);
      attempts++;
    } while (
      attempts < 8 &&
      usedPositions.current[targetCore].some(
        ([px, py]) => Math.abs(px - x) < 30 && Math.abs(py - y) < 30
      )
    );

    if (attempts === 8) return;

    usedPositions.current[targetCore].push([x, y]);
    const newElem = document.createElement("div");
    newElem.innerText = dragged.name;
    newElem.className =
      "absolute px-2 py-1 text-md font-bold border border-solid border-white rounded shadow-md";
    newElem.style.background = `#${getColor(dragged.core, dragged.intensity)}`;
    newElem.style.left = `${x - 25}px`;
    newElem.style.top = `${y - 10}px`;
    wheel.appendChild(newElem);

    setFeelingsDataState((prev) => ({
      ...prev,
      [dragged.core]: prev[dragged.core].filter((f) => f.name !== dragged.name),
    }));

    setPlacedFeelingsCount((prev) => {
      const newCount = {
        ...prev,
        [targetCore]: (prev[targetCore] || 0) + 1,
      };
      if (newCount[targetCore] === 4) {
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 3000); // Hide celebration after 3 seconds
      }
      return newCount;
    });
  };

  const getColor = (core, intensity) => {
    const map = {
      Love: { low: "f5a3f5", medium: "ff66ff", high: "d800d8" },
      Anger: { low: "f58a8a", medium: "e30e0e", high: "b00909" },
      Sadness: { low: "a8b7e6", medium: "4c70cf", high: "2b4f9f" },
      Joy: { low: "ffff99", medium: "fff833", high: "d6c400" },
      Fear: { low: "cfcfcf", medium: "8a8888", high: "5f5f5f" },
      Surprise: { low: "ffd6e6", medium: "ff99cc", high: "ff5e99" },
    };
    return map[core][intensity] || "cccccc";
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-4 text-gray-800 drop-shadow">
        The Feelings Wheel
      </h1>
      <p className="text-lg text-center mb-8 text-gray-600">
        Think about the various feelings you experience. Fill the empty wheel by
        dragging and dropping four feeling words for each core emotion.
      </p>

      <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
        {/* Wheel */}
        <div
          ref={wheelRef}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="relative w-[550px] h-[550px] rounded-full shadow-md"
          style={{
            background:
              "conic-gradient(#ff00ff 0 60deg, #e30e0e 60deg 120deg, #8a8888 120deg 180deg, #fff833 180deg 240deg, #4c70cf 240deg 300deg, #ff99cc 300deg 360deg)",
          }}
        >
          {coreEmotions.map(({ name, style }) => (
            <div
              key={name}
              ref={(el) => (coreRefs.current[name] = el)}
              className={`absolute font-bold text-2xl drop-shadow ${style}`}
              style={{ transform: "translate(-50%, -50%)" }}
            >
              {name}
            </div>
          ))}
          {showCelebration && (
            <div className="absolute inset-0 flex items-center justify-center bg-green-500 bg-opacity-75 text-white text-4xl font-bold rounded-full animate-pulse">
              Great Job!
            </div>
          )}
        </div>

        {/* Feelings List */}
        <div className="flex flex-wrap justify-center gap-3 max-w-lg">
          {Object.entries(feelingsDataState).flatMap(([core, feelings]) =>
            feelings.map((feeling) => (
              <div
                key={feeling.name}
                draggable
                onDragStart={(e) =>
                  handleDragStart(e, { name: feeling.name, core: core, intensity: feeling.intensity })
                }
                className={`cursor-grab px-[20px] py-[5px] text-lg font-medium rounded shadow-md transition-transform hover:scale-105`}
                style={{ backgroundColor: `#${getColor(core, feeling.intensity)}` }}
              >
                {feeling.name}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}