/* eslint-disable react/prop-types */
import { useState } from "react";
import { motion } from "framer-motion";
import Tile from "./Tile";

const GameBoard = ({
  // betAmount,
  onQuitGame,
  onGameOver,
  // setWinnings,
  winnings,
  onCorrectTile,
}) => {
  const gridSize = 5;
  const bombCount = 5;
  const [grid, setGrid] = useState(initializeGrid());
  const [gameOver, setGameOver] = useState(false);
  const [correctTiles, setCorrectTiles] = useState(0);

  function initializeGrid() {
    const grid = Array.from({ length: gridSize }, () =>
      Array.from({ length: gridSize }, () => ({
        hasBomb: false,
        isRevealed: false,
      }))
    );

    let bombsPlaced = 0;
    while (bombsPlaced < bombCount) {
      const row = Math.floor(Math.random() * gridSize);
      const col = Math.floor(Math.random() * gridSize);
      if (!grid[row][col].hasBomb) {
        grid[row][col].hasBomb = true;
        bombsPlaced++;
      }
    }

    return grid;
  }

  const revealTile = (row, col) => {
    if (gameOver || grid[row][col].isRevealed) return;

    const newGrid = grid.map((r) => r.map((cell) => ({ ...cell })));
    newGrid[row][col].isRevealed = true;

    if (newGrid[row][col].hasBomb) {
      setGameOver(true);
      revealAllTiles(newGrid);
      onGameOver(false);
      return;
    }

    setCorrectTiles((prev) => prev + 1);
    onCorrectTile(correctTiles + 1); // Call onCorrectTile with the new number of correct tiles
    setGrid(newGrid);

    if (correctTiles + 1 === gridSize * gridSize - bombCount) {
      setGameOver(true);
      onGameOver(true);
    }
  };

  const revealAllTiles = (grid) => {
    const newGrid = grid.map((row) =>
      row.map((cell) => ({ ...cell, isRevealed: true }))
    );
    setGrid(newGrid);
  };

  const resetGame = () => {
    setGrid(initializeGrid());
    setGameOver(false);
    setCorrectTiles(0);
    onQuitGame();
  };

  return (
    <div className="game-board p-4 flex flex-col items-center">
      <div className="flex justify-between items-center mb-4 w-full">
        <motion.button
          onClick={resetGame}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Quit Game
        </motion.button>
        {gameOver && (
          <motion.div
            className="text-lg font-bold text-center text-red-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {correctTiles === gridSize * gridSize - bombCount
              ? "You Win!"
              : "Game Over!"}
          </motion.div>
        )}
        {winnings > 0 && (
          <motion.h3
            className="text-lg font-bold text-green-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            You won ₹{winnings.toFixed(2)}!
          </motion.h3>
        )}
      </div>
      <div className="grid grid-cols-5 gap-2 md:gap-4">
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <Tile
              key={`${rowIndex}-${colIndex}`}
              hasBomb={cell.hasBomb}
              isRevealed={cell.isRevealed}
              onClick={() => revealTile(rowIndex, colIndex)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default GameBoard;
