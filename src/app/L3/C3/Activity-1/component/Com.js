"use client";

import { useState, useEffect, useRef } from "react";

export default function Com() {
  const [mode, setMode] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [categoryItems, setCategoryItems] = useState([]);
  const [alphabeticalItems, setAlphabeticalItems] = useState([]);
  const [selectedListItem, setSelectedListItem] = useState(null);
  const [message, setMessage] = useState(""); // <-- New message state
  const gameAreaRef = useRef(null);
  const instTextRef = useRef(null);
  const modeSelectionRef = useRef(null);

  const items = [
    "Carrom",
    "Cricket",
    "Football",
    "Baseball",
    "Soccer",
    "Drum",
    "Violin",
    "Chimes",
    "Guitar",
    "Chocolate",
    "Pizza",
    "Pasta",
    "Icecream",
    "Burger",
  ];

  function getCategory(item) {
    if (["Carrom", "Cricket", "Football", "Baseball", "Soccer"].includes(item))
      return "Games";
    if (["Drum", "Violin", "Chimes", "Guitar"].includes(item)) return "Music";
    return "Food";
  }

  function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function startGame() {
    if (!mode) {
      setMessage("Please select a sorting mode!");
      return;
    }
    setGameStarted(true);
    setMessage(""); // Clear message when game starts
    if (mode === "category") {
      setCategoryItems(shuffleArray(items));
    } else {
      setAlphabeticalItems(shuffleArray(items));
    }
  }

  // Drag and drop handlers for category sorting
  function onDragStart(e, item) {
    e.dataTransfer.setData("text/plain", item);
  }

  function onDragOver(e) {
    e.preventDefault();
  }

  function onDrop(e, zoneId) {
    e.preventDefault();
    const draggedItem = e.dataTransfer.getData("text/plain");
    const draggedCategory = getCategory(draggedItem);

    if (draggedCategory === zoneId) {
      setCategoryItems((prev) => prev.filter((i) => i !== draggedItem));
      setDroppedItems((prev) => ({
        ...prev,
        [zoneId]: [...prev[zoneId], draggedItem],
      }));
      setMessage(""); // Clear message on successful drop
    } else {
      setMessage(`Oops! "${draggedItem}" doesn't belong in ${zoneId}. Try again.`);
    }
  }

  // State to track dropped items per category
  const [droppedItems, setDroppedItems] = useState({
    Games: [],
    Food: [],
    Music: [],
  });

  // Reset dropped items and message when game restarts or mode changes
  useEffect(() => {
    if (!gameStarted) {
      setDroppedItems({
        Games: [],
        Food: [],
        Music: [],
      });
      setMessage(""); // Clear message on reset
    }
  }, [gameStarted]);

  // Alphabetical sorting handlers
  function moveUp() {
    if (!selectedListItem) return;
    const index = alphabeticalItems.indexOf(selectedListItem);
    if (index > 0) {
      const newArr = [...alphabeticalItems];
      [newArr[index - 1], newArr[index]] = [newArr[index], newArr[index - 1]];
      setAlphabeticalItems(newArr);
      setMessage(""); // Clear message on move
    }
  }

  function moveDown() {
    if (!selectedListItem) return;
    const index = alphabeticalItems.indexOf(selectedListItem);
    if (index < alphabeticalItems.length - 1) {
      const newArr = [...alphabeticalItems];
      [newArr[index + 1], newArr[index]] = [newArr[index], newArr[index + 1]];
      setAlphabeticalItems(newArr);
      setMessage(""); // Clear message on move
    }
  }

  function checkOrder() {
    const currentOrder = alphabeticalItems
      .map((item) => item.toLowerCase())
      .join(",");
    const sortedOrder = [...items]
      .map((item) => item.toLowerCase())
      .sort()
      .join(",");
      // debugger
    if (currentOrder === sortedOrder) {
      instTextRef.current.textContent = "You did it!!!";
      setMessage("");
      if (gameAreaRef.current) {
        gameAreaRef.current.style.backgroundImage =
          'url("https://res.cloudinary.com/dey9w5okl/image/upload/v1732820743/W9k1_ue7srf.gif")';
        gameAreaRef.current.style.backgroundSize = "cover";
        gameAreaRef.current.style.backgroundPosition = "center";
        gameAreaRef.current.style.backgroundRepeat = "no-repeat";
      }
    } else {
      setMessage("Not sorted correctly. Try again!");
    }
  }

  function backToModeSelection() {
    setGameStarted(false);
    setMode("");
    setSelectedListItem(null);
    instTextRef.current.textContent = "Select a sorting mode";
    if (gameAreaRef.current) {
      gameAreaRef.current.style.backgroundImage = "";
    }
    setMessage("");
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex flex-col items-center p-6 font-sans text-gray-800">
      <h1 className="text-4xl font-bold mb-4">Sorting Game</h1>
      <p ref={instTextRef} className="mb-2 text-center text-lg font-semibold">
        Select a sorting mode
      </p>

      {message && (
        <div className="mb-6 text-center text-red-600 font-semibold">{message}</div>
      )}

      {!gameStarted && (
        <section
          ref={modeSelectionRef}
          className="flex flex-col items-center space-y-4 bg-white p-6 rounded-lg shadow-md w-full max-w-md"
        >
          <label className="inline-flex items-center space-x-2 text-lg cursor-pointer">
            <input
              type="radio"
              name="mode"
              value="category"
              checked={mode === "category"}
              onChange={(e) => setMode(e.target.value)}
              className="accent-indigo-600"
            />
            <span>Sort by Category</span>
          </label>
          <label className="inline-flex items-center space-x-2 text-lg cursor-pointer">
            <input
              type="radio"
              name="mode"
              value="alphabetical"
              checked={mode === "alphabetical"}
              onChange={(e) => setMode(e.target.value)}
              className="accent-indigo-600"
            />
            <span>Sort Alphabetically</span>
          </label>
          <button
            onClick={startGame}
            className="mt-4 px-8 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
          >
            Start
          </button>
        </section>
      )}

      {gameStarted && mode === "category" && (
        <section
          ref={gameAreaRef}
          className="relative w-full max-w-6xl bg-white rounded-lg shadow-lg flex flex-col space-y-6 pt-[70px] px-[20px] pb-[20px]"
        >
          <button
            onClick={backToModeSelection}
            className="absolute top-4 left-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
          >
            Back
          </button>

          <div className="flex space-x-12">
            <div
              id="items"
              className="w-72 min-h-[360px] overflow-y-auto border border-indigo-300 rounded-md p-3 bg-indigo-50"
            >
              {categoryItems.length === 0 && (
                <p className="text-center text-gray-400">No items here</p>
              )}
              {categoryItems.map((item) => (
                <div
                  key={item}
                  draggable
                  onDragStart={(e) => onDragStart(e, item)}
                  className="cursor-grab select-none mb-2 rounded-md bg-indigo-300 text-indigo-900 px-3 py-2 shadow-md hover:bg-indigo-400"
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="flex flex-1 space-x-8">
              {["Games", "Food", "Music"].map((zone) => (
                <div
                  key={zone}
                  id={zone}
                  onDragOver={onDragOver}
                  onDrop={(e) => onDrop(e, zone)}
                  className="flex flex-col items-center flex-1 min-h-[360px] border-2 border-dashed border-indigo-400 rounded-md p-4 bg-indigo-100"
                >
                  <h2 className="mb-4 text-xl font-semibold text-indigo-700">
                    {zone}
                  </h2>
                  <div className="w-full flex flex-col space-y-2">
                    {droppedItems[zone].map((item) => (
                      <div
                        key={item}
                        className="bg-indigo-300 text-indigo-900 px-3 py-2 rounded-md shadow-md"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {gameStarted && mode === "alphabetical" && (
        <section
          ref={gameAreaRef}
          className="relative w-full max-w-3xl bg-white rounded-lg shadow-lg p-6 flex flex-col space-y-4"
        >
          <button
            onClick={backToModeSelection}
            className="absolute top-4 left-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
          >
            Back
          </button>

          <div className="flex space-x-4 justify-center mb-2">
            <button
              onClick={moveUp}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
            >
              Move Up
            </button>
            <button
              onClick={moveDown}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
            >
              Move Down
            </button>
            <button
              onClick={checkOrder}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            >
              Check Order
            </button>
          </div>

          <ul className="border border-indigo-300 rounded-md max-h-[600px] overflow-y-auto">
            {alphabeticalItems.map((item) => (
              <li
                key={item}
                onClick={() => setSelectedListItem(item)}
                className={`cursor-pointer px-4 py-2 border-b last:border-b-0 ${
                  selectedListItem === item
                    ? "bg-indigo-600 text-white"
                    : "bg-indigo-100 text-indigo-900 hover:bg-indigo-200"
                }`}
              >
                {item}
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
