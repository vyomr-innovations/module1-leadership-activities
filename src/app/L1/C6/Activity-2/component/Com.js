"use client"; 
import React, { useState, useEffect } from "react";

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export default function TicTacToeGame() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [gameActive, setGameActive] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [playerSymbol, setPlayerSymbol] = useState(null);
  const [computerSymbol, setComputerSymbol] = useState(null);
  const [status, setStatus] = useState("");
  const [winningTiles, setWinningTiles] = useState([]);

  // Effect hook to handle computer's turn
  useEffect(() => {
    if (gameActive && currentPlayer === computerSymbol && !checkWinner(board) && !board.every(Boolean)) {
      setStatus("Computer's turn...");
      const timer = setTimeout(() => {
        makeComputerMove();
      }, 700); // Delay for computer's move
      return () => clearTimeout(timer);
    }
  }, [currentPlayer, gameActive, board, computerSymbol]); // Depend on these values

  // Function to choose player's symbol and start the game
  const startGame = (symbol) => {
    setPlayerSymbol(symbol);
    setComputerSymbol(symbol === "X" ? "O" : "X");
    setCurrentPlayer(symbol); // Player always goes first
    setGameActive(true);
    setBoard(Array(9).fill(null)); // Reset board
    setWinningTiles([]); // Clear highlights
    setStatus(`Your turn (${symbol})`);
  };

  // Function to handle a square click by the player
  const handleSquareClick = (index) => {
    // If game not active, or square already filled, or it's not player's turn, do nothing
    if (!gameActive || board[index] || currentPlayer !== playerSymbol) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = playerSymbol; // Player makes a move
    setBoard(newBoard); // Update the board state

    // Check for winner or draw after player's move
    const gameResult = checkWinner(newBoard);
    if (gameResult) {
      endGame(gameResult.winner, gameResult.combination);
    } else if (newBoard.every(Boolean)) {
      endGame("draw");
    } else {
      setCurrentPlayer(computerSymbol); // Switch to computer's turn
    }
  };

  // Computer's move logic (simple random move)
  const makeComputerMove = () => {
    const availableMoves = board
      .map((value, index) => (value === null ? index : null))
      .filter((index) => index !== null);

    if (availableMoves.length > 0) {
      // Prioritize winning moves for computer (simple AI)
      let bestMove = null;
      for (let i = 0; i < availableMoves.length; i++) {
        const move = availableMoves[i];
        const tempBoard = [...board];
        tempBoard[move] = computerSymbol;
        if (checkWinner(tempBoard)) {
          bestMove = move;
          break;
        }
      }

      // If no winning move, block player's winning move
      if (bestMove === null) {
        for (let i = 0; i < availableMoves.length; i++) {
          const move = availableMoves[i];
          const tempBoard = [...board];
          tempBoard[move] = playerSymbol;
          if (checkWinner(tempBoard)) {
            bestMove = move;
            break;
          }
        }
      }

      // Otherwise, pick a random move
      if (bestMove === null) {
        bestMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
      }

      const newBoard = [...board];
      newBoard[bestMove] = computerSymbol;
      setBoard(newBoard);

      // Check for winner or draw after computer's move
      const gameResult = checkWinner(newBoard);
      if (gameResult) {
        endGame(gameResult.winner, gameResult.combination);
      } else if (newBoard.every(Boolean)) {
        endGame("draw");
      } else {
        setCurrentPlayer(playerSymbol); // Switch back to player's turn
        setStatus(`Your turn (${playerSymbol})`);
      }
    }
  };

  // Function to check for a winner
  const checkWinner = (currentBoard) => {
    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        return { winner: currentBoard[a], combination: combination };
      }
    }
    return null; // No winner yet
  };

  // Function to end the game (winner or draw)
  const endGame = (result, combination = []) => {
    setGameActive(false);
    if (result === "draw") {
      setStatus("It's a draw!");
    } else {
      setStatus(`Winner: ${result}`);
      setWinningTiles(combination); // Set tiles to highlight
    }
  };

  // Function to reset the game state
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setGameActive(false);
    setPlayerSymbol(null);
    setComputerSymbol(null);
    setCurrentPlayer(null);
    setStatus("");
    setWinningTiles([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 p-4 sm:p-8 flex flex-col items-center justify-center font-sans text-gray-800">
      <div className="game-container max-w-sm w-full mx-auto p-6 sm:p-8 bg-white/90 backdrop-blur-sm rounded-xl shadow-xl border border-blue-200 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-8 drop-shadow-sm">
          Tic Tac Toe
        </h1>

        {/* Symbol Choice */}
        {!gameActive && !playerSymbol && (
          <div className="symbol-choice mb-6">
            <p className="text-lg mb-4">Select your symbol:</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => startGame("X")}
                className="symbol-button bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-300 text-xl"
              >
                X
              </button>
              <button
                onClick={() => startGame("O")}
                className="symbol-button bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-300 text-xl"
              >
                O
              </button>
            </div>
          </div>
        )}

        {/* Game Status */}
        <p className="status text-xl font-semibold mb-6 min-h-[28px]">
          {status}
        </p>

        {/* Game Board */}
        <div className="board grid grid-cols-3 gap-2 w-full max-w-[300px] mx-auto border border-blue-300 rounded-lg overflow-hidden shadow-lg">
          {board.map((value, index) => (
            <button
              key={index}
              onClick={() => handleSquareClick(index)}
              className={`
                square
                w-[98px] h-[98px] sm:w-[98px] sm:h-[98px] // Fixed size for squares
                bg-blue-50 text-3xl font-extrabold flex items-center justify-center
                border border-blue-200
                hover:bg-blue-100 transition-colors duration-200
                ${winningTiles.includes(index) ? "bg-green-400 !important text-white" : ""}
                ${value === "X" ? "text-red-600" : value === "O" ? "text-blue-600" : ""}
              `}
              disabled={!gameActive || value !== null || currentPlayer !== playerSymbol}
            >
              {value}
            </button>
          ))}
        </div>

        {/* Reset Button */}
        {gameActive || playerSymbol ? ( // Show reset button once game starts or ends
          <button
            onClick={resetGame}
            className="reset-button mt-6 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-400 text-lg"
          >
            Reset Game
          </button>
        ) : null}
      </div>
    </div>
  );
}