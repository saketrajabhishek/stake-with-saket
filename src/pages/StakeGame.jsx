import { useState, useEffect } from "react";
import GameBoard from "../components/GameBoard";
import { FaBomb, FaGem, FaInfoCircle } from "react-icons/fa";

const StakeGame = () => {
  const [totalAmount, setTotalAmount] = useState(() => {
    const savedTotalAmount = sessionStorage.getItem("totalAmount");
    return savedTotalAmount ? Math.round(Number(savedTotalAmount)) : 11111;
  });
  const [betAmount, setBetAmount] = useState(() => {
    const savedBetAmount = sessionStorage.getItem("betAmount");
    return savedBetAmount ? Math.round(Number(savedBetAmount)) : 100;
  });
  const [winnings, setWinnings] = useState(() => {
    const savedWinnings = sessionStorage.getItem("winnings");
    return savedWinnings ? Math.round(Number(savedWinnings)) : 0;
  });
  const [error, setError] = useState("");
  const [increaseMessage, setIncreaseMessage] = useState("");
  const [showRules, setShowRules] = useState(false);

  useEffect(() => {
    sessionStorage.setItem("totalAmount", totalAmount);
    sessionStorage.setItem("betAmount", betAmount);
    sessionStorage.setItem("winnings", winnings);
  }, [totalAmount, betAmount, winnings]);

  const handleBetChange = (e) => {
    const value = Math.round(Number(e.target.value));
    if (value < 1) {
      setError("Bet amount must be at least 1 rupee.");
    } else if (value > totalAmount) {
      setError("Bet amount cannot exceed total amount.");
    } else {
      setError("");
      setBetAmount(value);
    }
  };

  const handleQuitGame = () => {
    if (winnings > 0) {
      setTotalAmount(totalAmount + winnings);
    } else {
      setTotalAmount(totalAmount - betAmount);
    }
    setBetAmount(100); // Reset to default value
    setWinnings(0);
    setError("");
    setIncreaseMessage("");
  };

  const handleGameOver = (isWin) => {
    if (isWin) {
      setTotalAmount(totalAmount + winnings);
    } else {
      setTotalAmount(totalAmount - betAmount);
    }
    setWinnings(0);
    setIncreaseMessage("");
  };

  const handleCorrectTile = (correctTiles) => {
    const increaseFactor = Math.pow(1.1, correctTiles); // Exponential increase
    const newWinnings = Math.round(betAmount * increaseFactor);
    setWinnings(newWinnings);
    setIncreaseMessage(`Winnings increased by ${increaseFactor.toFixed(2)}x!`);
  };

  return (
    <div className="app-container p-4 flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <h1 className="title text-2xl font-bold mb-4">Stake Game</h1>
      <button
        onClick={() => setShowRules(!showRules)}
        className="mb-4 flex items-center text-blue-500 hover:text-blue-600"
      >
        <FaInfoCircle className="mr-2" />
        {showRules ? "Hide Game Rules" : "Show Game Rules"}
      </button>
      {showRules && (
        <div className="game-rules bg-white dark:bg-gray-800 p-4 rounded-md shadow-md mb-4">
          <h2 className="text-xl font-bold mb-2">Game Rules</h2>
          <ul className="list-disc list-inside">
            <li className="mb-2">
              <FaGem className="inline text-green-500 mr-2" />
              Reveal a tile to find a gem and increase your winnings.
            </li>
            <li className="mb-2">
              <FaBomb className="inline text-red-500 mr-2" />
              Avoid the bombs! Revealing a bomb will end the game.
            </li>
            <li className="mb-2">
              The more tiles you reveal without hitting a bomb, the higher your
              winnings will grow exponentially.
            </li>
            <li className="mb-2">
              You can quit the game at any time to secure your current winnings.
            </li>
            <li className="mb-2">
              If you hit a bomb, you lose your bet amount.
            </li>
          </ul>
        </div>
      )}
      <div className="financial-info mb-4 flex flex-col md:flex-row items-center justify-between">
        <p className="text-lg">Total Wallet Amount: ₹{totalAmount}</p>
        <div className="flex items-center">
          <span className="ml-2">Bet Amount: ₹</span>
          <input
            type="number"
            value={betAmount}
            onChange={handleBetChange}
            min="1"
            max={totalAmount}
            placeholder="Enter bet amount"
            className="border p-2 rounded-md ml-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 appearance-none"
          />
        </div>
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {increaseMessage && (
        <p className="text-green-500 mb-4">{increaseMessage}</p>
      )}
      <GameBoard
        // totalAmount={totalAmount}
        // setTotalAmount={setTotalAmount}
        // betAmount={betAmount}
        onQuitGame={handleQuitGame}
        onGameOver={handleGameOver}
        // setWinnings={setWinnings}
        winnings={winnings} // Pass winnings as a prop
        onCorrectTile={handleCorrectTile} // Pass the handleCorrectTile function
      />
    </div>
  );
};

export default StakeGame;
